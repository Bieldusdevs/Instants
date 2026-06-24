"use client";

import React, { useRef, useState, useEffect } from "react";
import { useApp } from "../providers/Providers";
import { Camera as CameraIcon, RefreshCw, Upload, Sparkles, Send, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function CameraTab() {
  const { addInstant, setActiveTab } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [filter, setFilter] = useState<string>("none");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(false);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1080 }, height: { ideal: 1350 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.log("Câmera indisponível ou permissão negada:", err);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleTakeSnapshot = () => {
    if (cameraError || !videoRef.current) {
      // Fallback: Gera um Instant aleatório espetacular
      const randomCyberPhotos = [
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
      ];
      const randomPic = randomCyberPhotos[Math.floor(Math.random() * randomCyberPhotos.length)];
      setCapturedImage(randomPic);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = video.videoWidth || 600;
    canvas.height = video.videoHeight || 800;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Aplica filtro visual no canvas caso selecionado
      if (filter === "cyber") {
        ctx.filter = "saturate(200%) contrast(120%) hue-rotate(20deg)";
      } else if (filter === "bw") {
        ctx.filter = "grayscale(100%) contrast(130%)";
      } else if (filter === "neon") {
        ctx.filter = "contrast(140%) brightness(110%) drop-shadow(0 0 10px #ff007f)";
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCapturedImage(url);
    stopCamera();
  };

  const handlePublish = () => {
    if (!capturedImage) return;

    // Celebração do Foguinho Supremo 🔥
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff5500", "#ff8800", "#8a2be2", "#00f0ff"],
    });

    addInstant(capturedImage, caption || "Mais um Instant partilhado! ✨🔥");
    setActiveTab("feed");
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const filterStyles: Record<string, string> = {
    none: "",
    cyber: "saturate-200 contrast-125 hue-rotate-15",
    bw: "grayscale contrast-125",
    neon: "contrast-150 brightness-110 sepia-50 hue-rotate-290",
  };

  return (
    <div className="mx-auto max-w-md pb-24 pt-4 px-3 space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-black tracking-tight text-white flex items-center justify-center space-x-1.5">
          <Zap className="h-5 w-5 text-fire fill-fire animate-bounce" />
          <span>Capturar Instant 📸</span>
        </h2>
        <p className="text-xs text-neutral-400">Poste agora e mantenha sua ofensiva diária no topo!</p>
      </div>

      {/* Frame Principal da Câmera / Captura */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-dark-card border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col justify-between p-4">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured Instant"
            className={`absolute inset-0 h-full w-full object-cover transition-all ${filterStyles[filter]}`}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 h-full w-full object-cover transition-all ${filterStyles[filter]} ${facingMode === "user" ? "-scale-x-100" : ""}`}
            />
            {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-dark-card/95">
                <CameraIcon className="h-12 w-12 text-fire animate-pulse mb-3" />
                <p className="text-sm font-bold text-white">Modo Simulador Instantâneo ✨</p>
                <p className="text-xs text-neutral-400 mt-1">
                  Seu dispositivo ou navegador está em modo de teste local sem permissão de webcam. Clique no botão de capturar abaixo para gerar uma foto aleatória cyberpunk!
                </p>
              </div>
            )}
          </>
        )}

        {/* Top bar com botões de inversão */}
        <div className="relative z-10 flex items-center justify-between">
          {!capturedImage && (
            <button
              onClick={() => setFacingMode((prev) => (prev === "user" ? "environment" : "user"))}
              className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur-md hover:bg-black/70 transition-colors border border-white/10"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <label className="cursor-pointer ml-auto rounded-full bg-black/50 p-2.5 text-white backdrop-blur-md hover:bg-black/70 transition-colors border border-white/10 flex items-center space-x-1.5 px-3">
            <Upload className="h-4 w-4 text-neon-cyan" />
            <span className="text-xs font-bold">Galeria</span>
            <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Bottom bar com seletores de filtro */}
        <div className="relative z-10 space-y-3">
          {/* Seletor de filtro */}
          <div className="flex justify-center space-x-2 overflow-x-auto py-1">
            {[
              { id: "none", label: "Normal" },
              { id: "cyber", label: "Cyber" },
              { id: "neon", label: "Neon" },
              { id: "bw", label: "Vintage" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-3 py-1 text-[11px] font-extrabold backdrop-blur-md transition-all ${
                  filter === f.id
                    ? "bg-fire text-white shadow-[0_0_10px_#ff5500]"
                    : "bg-black/60 text-neutral-300 hover:bg-black/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Botão de Disparo vs Envio */}
          <div className="flex items-center justify-center pb-2">
            {!capturedImage ? (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleTakeSnapshot}
                className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-transparent p-1.5 shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                <div className="h-full w-full rounded-full bg-white transition-transform active:scale-90" />
              </motion.button>
            ) : (
              <div className="flex w-full items-center space-x-3">
                <button
                  onClick={handleRetake}
                  className="rounded-2xl bg-dark-elevated border border-white/15 px-4 py-3 text-xs font-bold text-neutral-300 hover:bg-white/10 transition-colors"
                >
                  Repetir
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePublish}
                  className="flex-1 flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-fire via-fire-glow to-neon-purple py-3 text-xs font-black text-white shadow-[0_0_20px_rgba(255,85,0,0.6)]"
                >
                  <Send className="h-4 w-4 fill-white" />
                  <span>Partilhar no Story (+1🔥)</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Campo de legenda */}
      {capturedImage && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
          <input
            type="text"
            placeholder="Adicionar legenda rápida ao seu Instant..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-2xl bg-dark-card border border-white/10 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden"
          />
        </motion.div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
