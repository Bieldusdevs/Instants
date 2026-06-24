# Instants ✨ - Rede Social PWA 3D de Escala Global

O **Instants** evoluiu para sua versão final de produção corporativa na nuvem, configurado para receber milhares de acessos simultâneos na Vercel.

---

## 🛡️ Regras de Banco de Dados & Criptografia (Vercel Postgres SQL)

1. **Integridade Única (UNIQUE CONSTRAINT)**:
   - Estruturado com o SDK oficial `@vercel/postgres`. O sistema garante estritamente **apenas 1 conta por Número de Celular (`phone` UNIQUE)** e **apenas 1 Apelido por usuário (`handle` UNIQUE)**.

2. **Mascote Nascendo Apenas no Chat 🐾💌**:
   - Na criação de conta, o usuário entra de mãos vazias. **O Mascote Virtual 3D NÃO nasce no cadastro!** Ele só é gerado quando um usuário entra no chat privado com um amigo e envia o convite *"Chocar Ovo Tamagotchi em Dupla 🥚💌"*. Ao aceitar, o bichinho realista nasce para ambos cuidarem em cooperação!

3. **Jogo Exclusivo: Descubra Quem Tirou a Foto 🕵️‍♂️📸**:
   - A lista de jogos do chat foi limpa para manter foco total no maior engajador social: a foto misteriosa do squad. A imagem aparece 100% nítida e os amigos abrem votação ao vivo na conversa.

4. **12 Variedades de Escultura 3D Realista PBR Nível GTA 5**:
   - Esculpidos proceduralmente com sombreamento físico de estúdio no Three.js. Inclui Dragão, Tigre Cibernético, Lobo Ártico, Pantera Negra, Panda Espacial e Coruja de Neon.

---

## 🚀 Como Subir Para Produção no Vercel (Passo a Passo)

1. Baixe o arquivo definitivo `instants-pwa-github.zip` e extraia.
2. Crie um repositório vazio no GitHub e arraste o conteúdo extraído.
3. No painel do [Vercel](https://vercel.com/), clique em **Add New Project** e importe o repositório.
4. *(Opcional, para ativar o banco SQL definitivo)*: No menu do projeto no Vercel, vá na aba **Storage** -> **Connect Store** -> **Vercel Postgres** (Neon). Dê um nome e clique em **Create**. Ele injetará automaticamente a variável `POSTGRES_URL` nas configurações!
5. Clique em **Deploy**! Em 35 segundos seu PWA de nível mundial estará online! 🔥📱🪐
