import { ElementalPetType } from "@/types";

export interface ElementalPetInfo {
  id: ElementalPetType;
  name: string;
  badge: string;
  personality: string;
  desc: string;
  color: string;
  glow: string;
}

export const ELEMENTAL_PETS: ElementalPetInfo[] = [
  {
    id: "foguinho",
    name: "FOGUINHO 🔥",
    badge: "Chama Viva",
    personality: "Energético, brincalhão e leal.",
    desc: "Ama aventuras e desafios. Aquece o coração do esquadrão com sua chama perpétua.",
    color: "#ff4d00",
    glow: "#ffaa00"
  },
  {
    id: "gotinho",
    name: "GOTINHO 💧",
    badge: "Espírito Marinho",
    personality: "Calmo, inteligente e curioso.",
    desc: "Adora aprender coisas novas. Flutua serenamente rodeado por esferas de orvalho.",
    color: "#00b4d8",
    glow: "#90e0ef"
  },
  {
    id: "folhinha",
    name: "FOLHINHA 🌿",
    badge: "Guardião Florestal",
    personality: "Dócil, amoroso e protetor.",
    desc: "Ama a natureza e seus amigos. Traz flores púrpuras e paz para as conversas do dia a dia.",
    color: "#588157",
    glow: "#a3b18a"
  },
  {
    id: "nuvlinha",
    name: "NUVLINHA ☁️",
    badge: "Sonhador Estelar",
    personality: "Sonhador, gentil e criativo.",
    desc: "Vive nas nuvens e adora estrelas. Carrega consigo uma lua mística púrpuras.",
    color: "#b5838d",
    glow: "#ffc6ff"
  },
  {
    id: "pedrinho",
    name: "PEDRINHO 🪨",
    badge: "Golem Vulcânico",
    personality: "Forte, determinado e confiável.",
    desc: "Sempre luta por seus amigos. Forjado em rocha basáltica com fendas de magma brilhante.",
    color: "#343a40",
    glow: "#e63946"
  },
  {
    id: "ventinho",
    name: "VENTINHO 🌪️",
    badge: "Espírito Celeste",
    personality: "Livre, veloz e divertido.",
    desc: "Ama explorar lugares novos. Rodopia esvoaçante deixando um rastro de energia ciber.",
    color: "#48cae4",
    glow: "#ade8f4"
  },
  {
    id: "sparky",
    name: "SPARKY ⚡️",
    badge: "Raposa Trovão",
    personality: "Elétrico, esperto e leal.",
    desc: "Adora desafios e competição. Sua cauda em formato de raio crepita em alta voltagem.",
    color: "#ffb703",
    glow: "#ffe5ec"
  },
  {
    id: "cristalino",
    name: "CRISTALINO 💎",
    badge: "Lobo Glacial",
    personality: "Elegante, misterioso e sábio.",
    desc: "Guarda segredos antigos. Suas costas ostentam cristais de safira eternamente congelados.",
    color: "#03045e",
    glow: "#00f0ff"
  }
];
