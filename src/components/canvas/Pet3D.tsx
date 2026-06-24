"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Pet } from "@/types";
import { ELEMENTAL_PETS } from "@/data/elementalPets";

interface Pet3DProps {
  pet: Pet;
}

function ElementalMesh({ pet }: Pet3DProps) {
  const mainRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Group>(null);

  // Animação elemental 3D de respiração e vida
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mainRef.current) {
      mainRef.current.position.y = Math.sin(t * 3) * 0.08;
      mainRef.current.rotation.y = Math.sin(t * 0.8) * 0.15;
    }
    if (orbRef.current) {
      orbRef.current.rotation.y = t * 1.5;
    }
  });

  const info = ELEMENTAL_PETS.find((e) => e.id === pet.type) || ELEMENTAL_PETS[0];

  return (
    <group ref={mainRef}>
      {/* 1. FOGUINHO 🔥 */}
      {pet.type === "foguinho" && (
        <group>
          {/* Base de Lenha / Troncos na fogueira */}
          <group position={[0, -0.9, 0]}>
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
              <meshStandardMaterial color="#3e2723" roughness={0.9} />
            </mesh>
            <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
              <meshStandardMaterial color="#3e2723" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.1, -0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
              <meshStandardMaterial color="#2d1d17" roughness={0.9} />
            </mesh>
          </group>

          {/* Chama Corporal Central */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <sphereGeometry args={[0.95, 32, 32]} />
            <meshStandardMaterial color="#ff4d00" emissive="#ff2a00" emissiveIntensity={0.6} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.9, -0.1]} scale={[0.8, 1.3, 0.7]} rotation={[-0.2, 0, 0]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#ffaa00" emissive="#ff7700" emissiveIntensity={0.8} />
          </mesh>

          {/* Olhos fofos Chibi pretos */}
          <mesh position={[-0.32, 0.25, 0.88]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#111111" roughness={0.1} />
          </mesh>
          <mesh position={[0.32, 0.25, 0.88]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#111111" roughness={0.1} />
          </mesh>

          {/* Bochechas Sorridentes */}
          <mesh position={[-0.55, 0.05, 0.82]} scale={[1, 0.6, 0.5]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshBasicMaterial color="#ff0055" />
          </mesh>
          <mesh position={[0.55, 0.05, 0.82]} scale={[1, 0.6, 0.5]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshBasicMaterial color="#ff0055" />
          </mesh>
        </group>
      )}

      {/* 2. GOTINHO 💧 */}
      {pet.type === "gotinho" && (
        <group>
          {/* Gota Principal */}
          <mesh position={[0, 0, 0]} scale={[1, 1.15, 1]} castShadow>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial color="#00b4d8" roughness={0.1} metalness={0.2} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0.8, 0]} scale={[0.6, 1.2, 0.6]}>
            <coneGeometry args={[0.8, 1.1, 32]} />
            <meshStandardMaterial color="#48cae4" roughness={0.1} metalness={0.2} transparent opacity={0.9} />
          </mesh>

          {/* Olhos expressivos */}
          <mesh position={[-0.3, 0.1, 0.83]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshBasicMaterial color="#03045e" />
          </mesh>
          <mesh position={[0.3, 0.1, 0.83]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshBasicMaterial color="#03045e" />
          </mesh>

          {/* Bolinhas de água orbitando */}
          <group ref={orbRef}>
            <mesh position={[1.3, 0.3, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#90e0ef" transparent opacity={0.8} />
            </mesh>
            <mesh position={[-1.2, 0.7, 0.4]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#90e0ef" transparent opacity={0.8} />
            </mesh>
          </group>
        </group>
      )}

      {/* 3. FOLHINHA 🌿 */}
      {pet.type === "folhinha" && (
        <group>
          {/* Corpo verde dócil */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <sphereGeometry args={[0.95, 32, 32]} />
            <meshStandardMaterial color="#588157" roughness={0.6} />
          </mesh>
          {/* Barriga clara */}
          <mesh position={[0, -0.3, 0.6]} scale={[0.75, 0.85, 0.5]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#a3b18a" roughness={0.8} />
          </mesh>

          {/* Folha na Cabeça */}
          <mesh position={[0, 0.85, 0]} rotation={[0.2, 0, Math.PI / 4]} castShadow>
            <boxGeometry args={[0.9, 0.06, 0.5]} />
            <meshStandardMaterial color="#3a5a40" roughness={0.4} />
          </mesh>
          {/* Florzinha roxa */}
          <mesh position={[0.35, 0.8, 0.2]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#e0aaff" />
          </mesh>

          {/* Olhos fofos */}
          <mesh position={[-0.32, 0.1, 0.85]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color="#111111" />
          </mesh>
          <mesh position={[0.32, 0.1, 0.85]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color="#111111" />
          </mesh>
        </group>
      )}

      {/* 4. NUVLINHA ☁️ */}
      {pet.type === "nuvlinha" && (
        <group>
          {/* Aglomerado de nuvens */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#cdb4db" roughness={0.9} />
          </mesh>
          <mesh position={[-0.55, -0.1, 0]}>
            <sphereGeometry args={[0.65, 32, 32]} />
            <meshStandardMaterial color="#ffc6ff" roughness={0.9} />
          </mesh>
          <mesh position={[0.55, -0.1, 0]}>
            <sphereGeometry args={[0.65, 32, 32]} />
            <meshStandardMaterial color="#bde0fe" roughness={0.9} />
          </mesh>

          {/* Lua Crescente Roxa ao fundo */}
          <mesh position={[0.8, 0.8, -0.5]} rotation={[0, 0, -0.5]}>
            <torusGeometry args={[0.4, 0.12, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#7209b7" emissive="#560bad" />
          </mesh>

          {/* Olhos sonhadores fechiados/felizes */}
          <mesh position={[-0.28, 0.1, 0.78]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#3c096c" />
          </mesh>
          <mesh position={[0.28, 0.1, 0.78]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#3c096c" />
          </mesh>
        </group>
      )}

      {/* 5. PEDRINHO 🪨 */}
      {pet.type === "pedrinho" && (
        <group>
          {/* Corpo Golem basáltico */}
          <mesh position={[0, -0.1, 0]} castShadow>
            <dodecahedronGeometry args={[1.0, 1]} />
            <meshStandardMaterial color="#212529" roughness={0.8} />
          </mesh>

          {/* Fendas de Magma Emissivas */}
          <mesh position={[0, 0, 0.2]} scale={[0.92, 0.92, 0.92]}>
            <sphereGeometry args={[1.0, 16, 16]} />
            <meshStandardMaterial color="#ff3300" emissive="#ff1100" emissiveIntensity={1.5} />
          </mesh>

          {/* Olhos determinados de fogo */}
          <mesh position={[-0.32, 0.2, 0.88]}>
            <boxGeometry args={[0.25, 0.15, 0.1]} />
            <meshBasicMaterial color="#ffaa00" />
          </mesh>
          <mesh position={[0.32, 0.2, 0.88]}>
            <boxGeometry args={[0.25, 0.15, 0.1]} />
            <meshBasicMaterial color="#ffaa00" />
          </mesh>
        </group>
      )}

      {/* 6. VENTINHO 🌪️ */}
      {pet.type === "ventinho" && (
        <group>
          <mesh position={[0, 0.2, 0]} scale={[1, 1.2, 0.9]}>
            <sphereGeometry args={[0.85, 32, 32]} />
            <meshStandardMaterial color="#48cae4" roughness={0.2} transparent opacity={0.85} />
          </mesh>
          {/* Cauda de vento espiral */}
          <mesh position={[0, -0.8, -0.3]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.6, 1.2, 16]} />
            <meshStandardMaterial color="#90e0ef" transparent opacity={0.7} />
          </mesh>
          {/* Mecha esvoaçante no topo */}
          <mesh position={[0.2, 1.0, -0.2]} rotation={[0, 0, -0.6]}>
            <coneGeometry args={[0.3, 0.8, 16]} />
            <meshStandardMaterial color="#00f0ff" />
          </mesh>

          <mesh position={[-0.28, 0.2, 0.78]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color="#023e8a" />
          </mesh>
          <mesh position={[0.28, 0.2, 0.78]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color="#023e8a" />
          </mesh>
        </group>
      )}

      {/* 7. SPARKY ⚡️ */}
      {pet.type === "sparky" && (
        <group>
          {/* Corpo Raposinha Elétrica */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial color="#ffb703" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.2, 0.6]} scale={[0.7, 0.9, 0.5]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#fffefe" roughness={0.6} />
          </mesh>

          {/* Orelhas empinadas */}
          <mesh position={[-0.45, 0.8, 0]} rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.25, 0.7, 4]} />
            <meshStandardMaterial color="#fb8500" />
          </mesh>
          <mesh position={[0.45, 0.8, 0]} rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.25, 0.7, 4]} />
            <meshStandardMaterial color="#fb8500" />
          </mesh>

          {/* Cauda em Raio */}
          <mesh position={[0.8, 0.2, -0.5]} rotation={[0, 0, -0.8]}>
            <boxGeometry args={[0.3, 1.1, 0.15]} />
            <meshStandardMaterial color="#ffd166" emissive="#ffb703" />
          </mesh>

          <mesh position={[-0.3, 0.15, 0.8]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh position={[0.3, 0.15, 0.8]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      )}

      {/* 8. CRISTALINO 💎 */}
      {pet.type === "cristalino" && (
        <group>
          <mesh position={[0, -0.2, 0]} castShadow>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial color="#03045e" roughness={0.3} metalness={0.2} />
          </mesh>

          {/* Cristais de Safira brotando nas costas */}
          <mesh position={[0, 0.6, -0.4]} rotation={[-0.4, 0, 0]}>
            <coneGeometry args={[0.25, 0.9, 5]} />
            <meshStandardMaterial color="#00f0ff" roughness={0.1} metalness={0.8} />
          </mesh>
          <mesh position={[-0.4, 0.4, -0.4]} rotation={[-0.4, 0, 0.4]}>
            <coneGeometry args={[0.2, 0.7, 5]} />
            <meshStandardMaterial color="#48cae4" roughness={0.1} metalness={0.8} />
          </mesh>
          <mesh position={[0.4, 0.4, -0.4]} rotation={[-0.4, 0, -0.4]}>
            <coneGeometry args={[0.2, 0.7, 5]} />
            <meshStandardMaterial color="#48cae4" roughness={0.1} metalness={0.8} />
          </mesh>

          {/* Orelhas de lobo */}
          <mesh position={[-0.45, 0.75, 0.1]} rotation={[0, 0, 0.25]}>
            <coneGeometry args={[0.22, 0.6, 4]} />
            <meshStandardMaterial color="#023e8a" />
          </mesh>
          <mesh position={[0.45, 0.75, 0.1]} rotation={[0, 0, -0.25]}>
            <coneGeometry args={[0.22, 0.6, 4]} />
            <meshStandardMaterial color="#023e8a" />
          </mesh>

          <mesh position={[-0.3, 0.15, 0.82]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
          <mesh position={[0.3, 0.15, 0.82]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        </group>
      )}

      {/* ROUPINHAS COSMÉTICAS ADICIONAIS EQUIPADAS */}
      {pet.hat === "crown" && (
        <mesh position={[0, 1.15, 0]} rotation={[0.1, 0, 0]}>
          <torusGeometry args={[0.4, 0.08, 16, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.05} />
        </mesh>
      )}

      {pet.glasses === "cyber" && (
        <mesh position={[0, 0.2, 0.95]}>
          <boxGeometry args={[0.9, 0.2, 0.1]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.85} />
        </mesh>
      )}
    </group>
  );
}

export function Pet3D({ pet }: Pet3DProps) {
  return (
    <div className="relative h-full w-full select-none cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0.2, 4.2], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 10, 6]} intensity={2.2} castShadow shadow-mapSize={2048} />
        <pointLight position={[-6, -4, -4]} color="#ff007f" intensity={1.5} />
        <pointLight position={[6, -4, 6]} color="#00f0ff" intensity={1.5} />
        <spotLight position={[0, 8, -5]} color="#ffffff" intensity={1.2} angle={0.6} penumbra={1} />

        <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
          <ElementalMesh pet={pet} />
        </Float>

        <ContactShadows position={[0, -1.6, 0]} opacity={0.8} scale={7} blur={2.0} far={4} color="#000000" />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI / 2 + 0.05} />
      </Canvas>
    </div>
  );
}
