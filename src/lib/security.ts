import crypto from "crypto";

// 1. BANCO DE MEMÓRIA ANTI-FORÇA BRUTA (Rate Limiting)
const loginAttempts = new Map<string, { count: number; firstTry: number }>();

export function checkRateLimit(key: string, maxAttempts = 5, windowMin = 15): { allowed: boolean; waitMin?: number } {
  const now = Date.now();
  const windowMs = windowMin * 60 * 1000;
  const record = loginAttempts.get(key);

  if (!record) {
    loginAttempts.set(key, { count: 1, firstTry: now });
    return { allowed: true };
  }

  if (now - record.firstTry > windowMs) {
    // Reset após o tempo
    loginAttempts.set(key, { count: 1, firstTry: now });
    return { allowed: true };
  }

  if (record.count >= maxAttempts) {
    const timeLeftMs = windowMs - (now - record.firstTry);
    const waitMin = Math.ceil(timeLeftMs / 60000);
    return { allowed: false, waitMin };
  }

  record.count += 1;
  return { allowed: true };
}

export function resetRateLimit(key: string) {
  loginAttempts.delete(key);
}

// 2. HASH DE SENHA COM SALT SHA-256 (Nível Bancário)
export function hashPasswordSec(password: string): string {
  const salt = "instants_sec_salt_2026_pwa";
  return crypto.createHash("sha256").update(password + salt).digest("hex");
}

// 3. SANITIZAÇÃO ANTI-SQL INJECTION E ANTI-XSS
export function sanitizeSqlAndXss(input: string): string {
  if (!input) return "";
  return input
    .replace(/'/g, "&#39;")
    .replace(/"/g, "&quot;")
    .replace(/;/g, "&#59;")
    .replace(/--/g, "&#45;&#45;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// 4. VALIDAÇÃO RIGOROSA DE NÚMERO DE TELEFONE (Obrigatório)
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const cleanNum = phone.replace(/[\s()-]/g, "");
  // Aceita +5511999999999 ou 11999999999 ou +351912345678 (mínimo 9 dígitos, máximo 15)
  return /^\+?[1-9]\d{8,14}$/.test(cleanNum);
}

// 5. MODERAÇÃO ANTI-TOXICIDADE / PALAVRÕES (Filtro Inteligente)
const BAD_WORDS = [
  "merda", "porra", "caralho", "foder", "puta", "viado", "arrombado", "filho da puta",
  "idiota", "imbecil", "estupido", "corno", "bitch", "fuck", "shit", "asshole", "kill yourself", "morra", "lixo"
];

export function moderateMessage(text: string): { isSafe: boolean; censoredText: string } {
  if (!text) return { isSafe: true, censoredText: "" };
  
  let lower = text.toLowerCase();
  let foundToxic = false;
  let censored = text;

  BAD_WORDS.forEach((bw) => {
    const regex = new RegExp(`\\b${bw}\\b`, "gi");
    if (regex.test(lower)) {
      foundToxic = true;
      censored = censored.replace(regex, "🛡️[BLOQUEADO]");
    }
  });

  return { isSafe: !foundToxic, censoredText: censored };
}
