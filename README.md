# Instants ✨ - A Rede Social Gamificada PWA de Escala Global

O **Instants** atingiu sua arquitetura corporativa definitiva na Vercel com banco de dados real sério e mecânicas sociais orgánicas.

---

## 🏛️ Banco de Dados Sério & Integridade Única (Vercel Postgres SQL)

1. **Cadastro Real 100% Zerado & Limpo**:
   - Retirados todos os modos demo ou seguidores pré-populados ao cadastrar! Novas contas entram estritamente zeradas (0 Seguidores, 0 Seguindo).
   - Validação com regra **UNIQUE CONSTRAINT** no SDK `@vercel/postgres`: **Apenas 1 conta por Telefone Celular** (`phone` UNIQUE) e **Apenas 1 @handle único** por usuário.

2. **Mascote Nascendo Exclusivamente Por Convite no Chat 🥚💌**:
   - O Mascote 3D NÃO nasce na criação de conta! O usuário entra de mãos vazias.
   - Para chocar um bichinho, o usuário entra no chat privado com um bestie e clica em *"Criar Pet Dupla 🥚"*. Assim que o amigo clica em **ACEITAR CONVITE**, a escultura 3D racha do ovo e nasce para ambos cuidarem todos os dias!

3. **Jogo Único no Chat: Descubra Quem Tirou a Foto 🕵️‍♂️📸**:
   - Removidos todos os outros mini-jogos. O balão da conversa exibe a foto do squad **100% nítida e visível**, abrindo votação interativa em tempo real entre os amigos.

---

## 🎨 Os 8 Mascotes Elementais Chibi 3D (Design Exato da Foto)

Esculpidos declarativamente com shaders PBR e expressões vivas no Three.js (`Pet3D.tsx`):
1. **FOGUINHO 🔥**: Energético, brincalhão e leal. Ama aventuras e desafios. *(Chama sorridente sobre lenha)*.
2. **GOTINHO 💧**: Calmo, inteligente e curioso. Adora aprender coisas novas. *(Gota safira translúcida com orvalhos orbitando)*.
3. **FOLHINHA 🌿**: Dócil, amoroso e protetor. Ama a natureza e seus amigos. *(Espírito verde com folha na cabeça e flor roxa)*.
4. **NUVLINHA ☁️**: Sonhador, gentil e criativo. Vive nas nuvens e adora estrelas. *(Esferas fofas com lua crescente roxa)*.
5. **PEDRINHO 🪨**: Forte, determinado e confiável. Sempre luta por seus amigos. *(Golem basáltico com fendas de magma ardente)*.
6. **VENTINHO 🌪️**: Livre, veloz e divertido. Ama explorar lugares novos. *(Espírito celeste rodopiante)*.
7. **SPARKY ⚡️**: Elétrico, esperto e leal. Adora desafios e competição. *(Raposinha dourada com cauda em raio)*.
8. **CRISTALINO 💎**: Elegante, misterioso e sábio. Guarda segredos antigos. *(Lobo azul místico com cristais safira brotando nas costas)*.

---

## 🚀 Publicação Definitiva no Vercel

1. Baixe o arquivo `instants-pwa-github.zip` e extraia.
2. Suba o conteúdo para um repositório vazio no GitHub.
3. Importe no **Vercel**.
4. *(Para ativar o banco SQL oficial na Vercel em 5 seg)*: Na aba do projeto no Vercel -> **Storage** -> **Connect Store** -> **Vercel Postgres (Neon)** -> **Create**. Ele injetará a URL de conexão automaticamente!
5. Clique em **Deploy**. Sua rede social PWA de classe mundial estará pronta para receber milhares de pessoas! 🔥📱🪐
