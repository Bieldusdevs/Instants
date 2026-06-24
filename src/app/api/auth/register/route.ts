import { NextResponse } from "next/server";
import { sanitizeSqlAndXss, isValidPhoneNumber, hashPasswordSec, moderateMessage } from "@/lib/security";
import { initDb, findUserByHandleOrPhone, insertUserDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await initDb();
    const body = await req.json();
    const { name, handle, phone, password } = body;

    if (!phone || !isValidPhoneNumber(phone)) {
      return NextResponse.json({ error: "Telefone celular obrigatório ou em formato inválido. Use DDD + Telefone (Ex: +55 11 99999-9999)." }, { status: 400 });
    }

    const safeName = sanitizeSqlAndXss(name);
    const safeHandle = sanitizeSqlAndXss(handle).toLowerCase().replace("@", "");
    const cleanPhone = phone.replace(/[\s()-]/g, "");

    if (!safeName || !safeHandle || !password) {
      return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    const modName = moderateMessage(safeName);
    const modHandle = moderateMessage(safeHandle);
    if (!modName.isSafe || !modHandle.isSafe) {
      return NextResponse.json({ error: "Termo barrado pela moderação anti-toxicidade." }, { status: 403 });
    }

    const existing = await findUserByHandleOrPhone(`@${safeHandle}`, cleanPhone);
    if (existing) {
      return NextResponse.json({ error: "Regra UNIQUE: Este @handle ou telefone celular já possui cadastro único no banco de dados." }, { status: 409 });
    }

    const passwordHash = hashPasswordSec(password);

    // CONTA REAL RETIRANDO MODO DEMO: 100% ZERADA E LIMPA
    const newUserRecord = {
      id: `usr-${Date.now()}`,
      name: safeName,
      handle: `@${safeHandle}`,
      phone: cleanPhone,
      passwordHash,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      streak: 1, // Começa no dia 1
      instantsCount: 0,
      petId: null, // Mascote nasce no chat
      followersCount: 0, // 0 seguidores iniciais!
      followingCount: 0,
      bio: "Novo no Instants ✨"
    };

    try {
      await insertUserDb(newUserRecord);
    } catch (dbErr: any) {
      if (dbErr.code === "23505" || dbErr.message?.includes("Unique")) {
        return NextResponse.json({ error: "Violação UNIQUE constraint no banco de dados." }, { status: 409 });
      }
      throw dbErr;
    }

    return NextResponse.json({
      success: true,
      message: "Conta real criada com sucesso! 0 Seguidores iniciais.",
      user: {
        id: newUserRecord.id,
        name: newUserRecord.name,
        handle: newUserRecord.handle,
        phone: newUserRecord.phone,
        image: newUserRecord.image,
        streak: 1,
        instantsCount: 0,
        followersCount: 0,
        followingCount: 0,
        bio: newUserRecord.bio,
        petId: null
      }
    });
  } catch (err) {
    return NextResponse.json({ error: "Erro interno no servidor SQL." }, { status: 500 });
  }
}
