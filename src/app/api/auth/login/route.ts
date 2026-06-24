import { NextResponse } from "next/server";
import { checkRateLimit, resetRateLimit, hashPasswordSec, sanitizeSqlAndXss } from "@/lib/security";
import { initDb, findUserByHandleOrPhone } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await initDb();
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
        error: `🚫 BLOQUEIO ANTI-FORÇA BRUTA: Muitas tentativas erradas. Sua conta/IP foi temporariamente suspensa por segurança. Aguarde ${rateLimit.waitMin} minutos.`
      }, { status: 429 });
    }

    const userRecord = await findUserByHandleOrPhone(searchKey, cleanPhone);

    if (!userRecord) {
      // Demo rápido opcional se digitar senha de teste válida
      if (password === "123456" || password === "admin123") {
        resetRateLimit(searchKey);
        const demoUser = {
          id: `usr-${Date.now()}`,
          name: searchKey.replace("@", "").toUpperCase(),
          handle: searchKey,
          phone: cleanPhone || "+5511999999999",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
          streak: 28,
          instantsCount: 142,
          petId: null
        };
        return NextResponse.json({ success: true, user: demoUser });
      }

      return NextResponse.json({ error: "Usuário não encontrado ou senha incorreta." }, { status: 401 });
    }

    const passwordHash = hashPasswordSec(password);
    const dbHash = userRecord.password_hash || userRecord.passwordHash;
    if (dbHash && dbHash !== passwordHash) {
      return NextResponse.json({ error: "Senha incorreta. Atenção: restam poucas tentativas antes do bloqueio por Força Bruta." }, { status: 401 });
    }

    resetRateLimit(searchKey);

    return NextResponse.json({
      success: true,
      user: {
        id: userRecord.id,
        name: userRecord.name,
        handle: userRecord.handle,
        phone: userRecord.phone || cleanPhone,
        image: userRecord.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        streak: userRecord.streak || 28,
        petId: userRecord.pet_id || userRecord.petId || null
      }
    });
  } catch (err) {
    return NextResponse.json({ error: "Falha no servidor de login." }, { status: 500 });
  }
}
