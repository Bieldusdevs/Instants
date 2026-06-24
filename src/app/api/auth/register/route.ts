import { NextResponse } from "next/server";
import { sanitizeSqlAndXss, isValidPhoneNumber, hashPasswordSec, moderateMessage } from "@/lib/security";

(global as any)._instants_users_db = (global as any)._instants_users_db || new Map();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, handle, phone, password, petName, petType } = body;

    if (!phone || !isValidPhoneNumber(phone)) {
      return NextResponse.json({ error: "Número de telefone obrigatório ou em formato inválido. Use DDD + Telefone (Ex: +55 11 99999-9999)." }, { status: 400 });
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
      return NextResponse.json({ error: "O nome ou apelido contém termos impróprios barrados pela moderação." }, { status: 403 });
    }

    const db = (global as any)._instants_users_db as Map<string, any>;
    if (db.has(`@${safeHandle}`) || db.has(cleanPhone)) {
      return NextResponse.json({ error: "Este @handle ou número de telefone já está cadastrado no sistema." }, { status: 409 });
    }

    const passwordHash = hashPasswordSec(password);

    const newUserRecord = {
      id: `usr-${Date.now()}`,
      name: safeName,
      handle: `@${safeHandle}`,
      phone: cleanPhone,
      passwordHash,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      streak: 1,
      instantsCount: 0,
      createdAt: new Date().toISOString()
    };

    db.set(`@${safeHandle}`, newUserRecord);
    db.set(cleanPhone, newUserRecord);

    return NextResponse.json({
      success: true,
      message: "Usuário cadastrado com segurança de nível bancário!",
      user: {
        id: newUserRecord.id,
        name: newUserRecord.name,
        handle: newUserRecord.handle,
        phone: newUserRecord.phone,
        image: newUserRecord.image,
        streak: newUserRecord.streak
      }
    });
  } catch (err) {
    return NextResponse.json({ error: "Erro interno no servidor de banco de dados." }, { status: 500 });
  }
}
