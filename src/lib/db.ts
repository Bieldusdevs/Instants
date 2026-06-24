import { sql } from "@vercel/postgres";

(global as any)._db_users = (global as any)._db_users || new Map();

export async function initDb() {
  if (!process.env.POSTGRES_URL) return false;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        handle VARCHAR(64) UNIQUE NOT NULL,
        phone VARCHAR(32) UNIQUE NOT NULL,
        password_hash VARCHAR(128) NOT NULL,
        bio VARCHAR(255) DEFAULT 'Explorador no Instants ✨',
        followers_count INTEGER DEFAULT 100,
        following_count INTEGER DEFAULT 100,
        streak INTEGER DEFAULT 1,
        instants_count INTEGER DEFAULT 0,
        pet_id VARCHAR(64),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return true;
  } catch (err) {
    console.error("Falha ao inicializar tabela SQL:", err);
    return false;
  }
}

export async function findUserByHandleOrPhone(handle: string, phone: string) {
  if (process.env.POSTGRES_URL) {
    try {
      const res = await sql`
        SELECT * FROM users WHERE handle = ${handle} OR phone = ${phone} LIMIT 1;
      `;
      if (res.rows.length > 0) return res.rows[0];
    } catch (e) {}
  }
  const mem = (global as any)._db_users as Map<string, any>;
  return mem.get(handle) || mem.get(phone);
}

export async function insertUserDb(user: any) {
  if (process.env.POSTGRES_URL) {
    try {
      await sql`
        INSERT INTO users (id, name, handle, phone, password_hash, streak, instants_count)
        VALUES (${user.id}, ${user.name}, ${user.handle}, ${user.phone}, ${user.passwordHash}, ${user.streak}, ${user.instantsCount});
      `;
      return true;
    } catch (e) {
      throw e;
    }
  }
  const mem = (global as any)._db_users as Map<string, any>;
  if (mem.has(user.handle) || mem.has(user.phone)) {
    const err = new Error("Unique constraint");
    (err as any).code = "23505";
    throw err;
  }
  mem.set(user.handle, user);
  mem.set(user.phone, user);
  return true;
}
