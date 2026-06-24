import { NextResponse } from "next/server";
import { checkRateLimit, resetRateLimit, hashPasswordSec, sanitizeSqlAndXss } from "@/lib/security";

(global as any)._instants_users_db = (global as any)._instants_users_db || new Map();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json({ error: "Informe o @handle/telefone e a senha." }, { status: 400 });
    }

    const cleanId = sanitizeSqlAndXss(identifier).toLowerCase();
    const cleanPhone = identifier.replace(/[\s()-]/g, "");
    const searchKey = cleanId.startsWith("@") ? cleanId : `@${cleanId}`;

    const rateLimit = checkRateLimit(searchKey, 5, 15);
    if (!rateLimit.allowed) {
      return NextResponse.json({
        error: `🚫 BLOQUEIO DE SEGURANÇA: Muitas tentativas erradas. Sua conta/IP foi temporariamente suspensa contra ataques de Força Bruta. Aguarde ${rateLimit.waitMin} minutos.`
      }, { status: 429 });
    }

    const db = (global as any)._instants_users_db as Map<string, any>;
    const userRecord = db.get(searchKey) || db.get(cleanPhone);

    if (!userRecord) {
      if (password.length >= 6) {
        resetRateLimit(searchKey);
        const demoUser = {
          id: `usr-${Date.now()}`,
          name: searchKey.replace("@", "").toUpperCase(),
          handle: searchKey,
          phone: cleanPhone || "+5511999999999",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
          streak: 28,
          instantsCount: 142
        };
        db.set(searchKey, demoUser);
        return NextResponse.json({ success: true, user: demoUser });
      }

      return NextResponse.json({ error: "Usuário não encontrado ou senha incorreta." }, { status: 401 });
    }

    const passwordHash = hashPasswordSec(password);
    if (userRecord.passwordHash && userRecord.passwordHash !== passwordHash) {
      return NextResponse.json({ error: "Senha incorreta. Atenção: restam poucas tentativas antes do bloqueio por Força Bruta." }, { status: 401 });
    }

    resetRateLimit(searchKey);

    return NextResponse.json({
      success: true,
      user: {
        id: userRecord.id,
        name: userRecord.name,
        handle: userRecord.handle,
        phone: userRecord.phone,
        image: userRecord.image,
        streak: userRecord.streak
      }
    });
  } catch (err) {
    return NextResponse.json({ error: "Falha na validação de login do servidor." }, { status: 500 });
  }
}
