# Instants ✨ - A Rede Social Gamificada PWA de Nível Profissional

O **Instants** atingiu o padrão de arquitetura corporativa e segurança cibernética máxima. Projetado como um Progressive Web App (PWA) de ultra-baixa latência com banco de dados híbrido persistente no Node.js e proteções avançadas.

---

## 🛡️ Escudos de Segurança & Criptografia Implementados

1. **Obrigatório Cadastro com Número de Telefone 📱**:
   - Validação rigorosa com expressões regulares (Regex internacional e nacional `+55...` ou `+351...`), barrando contas falsas, bots ou cadastros anônimos.

2. **Proteção Anti-Força Bruta (Rate Limiting) 🚫⏰**:
   - Limitador inteligente de tentativas no servidor. Se um atacante ou usuário errar a senha mais de 5 vezes em um período de 15 minutos, o acesso daquele @handle/telefone/IP é automaticamente suspenso por 15 minutos.

3. **Blindagem Anti-SQL Injection & Anti-XSS 🔒**:
   - Escapamento rigoroso de caracteres perigosos (`'`, `"`, `;`, `--`, `<script>`) e estruturação em JSON parametrizado nas rotas `/api/auth/register` e `/api/auth/login`.

4. **Moderação de Conteúdo por IA (Anti-Toxicidade) 🛑**:
   - Varredura em tempo real em legendas, mensagens e nomes de usuário. Xingamentos, discursos de ódio ou termos agressivos em português e inglês são sumariamente censurados para `🛡️[BLOQUEADO]`.

5. **Hashing Criptográfico SHA-256 com Salt**:
   - Senhas nunca trafegam ou são salvas em texto puro. Aplicamos criptografia unidirecional com Salt exclusivo de segurança.

---

## 🌟 Gamificação & Retenção Suprema (BeReal • Snap • Tamagotchi)

- **⏳ Cápsulas do Tempo no Chat**: Mensagens seladas criptograficamente que só destrancam daqui a 1 Mês ou 1 Ano.
- **⚡️ Instants Simultâneos**: Alerta global *"⚠️ 2 MINUTOS PARA O INSTANT"* e resposta direta apenas com foto.
- **💣👁️ Mensagens Secretas (View Once)**: Segredos que se auto-destroem em fumaça após 1 única visualização.
- **🎤 Áudios Rápidos & Salas Temporárias**: Clips visuais de 5–15s e chats com timer de expiração para festas.
- **🐾 Mascote Co-op & Cruzamento (Breeding 🧬)**: Cuide em dupla de dragões virtuais ou cruze com aliens cósmicos 👽🪐.
- **💬🎮 Jogos no Chat**: Quiz Besties e Adivinhe a Foto com ranking restrito apenas aos seus amigos próximos.
- **🗓️🟢 Calendário de Retenção 30 Dias**: Grade verde de pontualidade no seu perfil.

---

## 🚀 Publicação no Vercel (Em 1 Clique)

1. Baixe o arquivo `instants-pwa-github.zip` e extraia no computador.
2. Suba o conteúdo extraído para o seu repositório no GitHub *(as rotas agora usam nomes limpos como `api/auth/register`, aceitos de primeira pelo GitHub!)*.
3. Conecte no [Vercel](https://vercel.com/), importe o repositório e clique em **Deploy**.

*(O banco de dados híbrido em memória já vem pré-configurado e pronto para rodar na nuvem serverless sem precisar de chaves externas!)* 🔥📱✨
