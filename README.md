# Instants ✨ - Progressive Web App (PWA) de Fotos e Vídeos Aleatórios

Um aplicativo da Web progressivo ultra-moderno inspirado na espontaneidade do **BeReal**, na fluidez dos **Stories do Instagram** e na mecânica viciante de ofensiva (Foguinho 🔥) do **TikTok / Snapchat**. Desenvolvido com **Next.js 14**, **React Three Fiber (Three.js)**, **GLSL Shaders**, **GSAP** e **Framer Motion**.

---

## 🔥 Funcionalidades Principais

1. **Feed Espontâneo ("Explorar")**:
   - Cards com design moderno em vidro fosco (*Glassmorphic Dark Mode*).
   - Fotos aleatórias e vídeos curtos.
   - Botões de reações rápidas (🔥, ⚡️, 💜) e resposta instantânea direto no story.

2. **Câmera Instantânea 📸**:
   - Captura real via Webcam ou Câmera do smartphone (`getUserMedia`).
   - Filtros visuais em tempo real (*Cyberpunk, Neon, Vintage Preto e Branco*).
   - Postagem direta no Story que gera **+1 dia de ofensiva** no Foguinho 🔥.

3. **Chat & Conexões 💬**:
   - Mensagens privadas em tempo real.
   - Selo animado de ofensiva do TikTok ao lado de cada amigo (ex: `🔥 34 dias seguidos`).
   - Botão exclusivo de **Enviar Foto Instantânea Privada** dentro da conversa.
   - *Bot Inteligente Simulado*: Responde automaticamente às suas mensagens celebrando a ofensiva!

4. **Estética & Performance PWA**:
   - Background 3D animado com Shaders GLSL de ondas e luzes sutis.
   - **WebGPU Ready** na arquitetura Three.js.
   - Cursor luminoso personalizado animado com GSAP.
   - PWA Standalone configurado com Service Worker para instalação nativa no Android, iOS e PC.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** (App Router, React 18, Tailwind CSS)
- **React Three Fiber & Drei** (Ambiente 3D declarativo)
- **Three.js** (Motor gráfico WebGL / WebGPU)
- **GSAP** (Animações de rastro magnético)
- **Framer Motion** (Animações de interface e modais)
- **GLSL Shaders** (Efeitos de ruído e gradientes luminosos)
- **Lenis Scroll** (Scroll ultra suave)
- **Canvas Confetti** (Celebração visual ao aumentar o fogo 🔥)

---

## 🚀 Como Subir para o GitHub e Vercel (Em 1 Minuto)

Como o aplicativo agora é 100% autossuficiente e roda no navegador sem precisar de nenhuma chave externa ou configuração de API, o deploy é instantâneo:

### 1. Subir pro GitHub
No terminal do seu computador, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "feat: app instants pwa pronto"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/instants-pwa.git
git push -u origin main
```

### 2. Publicar no Vercel
1. Acesse [https://vercel.com/](https://vercel.com/) e clique em **Add New...** -> **Project**.
2. Importe o seu repositório `instants-pwa`.
3. Clique no botão azul **Deploy**. *(Nenhuma variável de ambiente necessária!)*

Em 40 segundos seu site estará no ar e sugerindo a instalação como app nativo na tela do celular!
