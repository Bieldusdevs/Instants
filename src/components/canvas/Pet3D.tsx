"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Pet } from "@/types";

interface Pet3DProps {
  pet: Pet;
}

function PetMeshReal({ pet }: Pet3DProps) {
  const headRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 2.5) * 0.08;
      bodyRef.current.rotation.z = Math.sin(t * 1.5) * 0.03;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.2;
      headRef.current.rotation.x = Math.sin(t * 1.2) * 0.08;
    }
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 4) * 0.35 + 0.2;
    }
  });

  const furPalette: Record<string, { main: string; belly: string; dark: string; eye: string }> = {
    dragon: { main: "#c1121f", belly: "#ffb703", dark: "#590d22", eye: "#00f0ff" },
    cat: { main: "#fb8500", belly: "#ffedea", dark: "#d4a373", eye: "#38b000" },
    dog: { main: "#8d6e63", belly: "#fefae0", dark: "#4e342e", eye: "#219ebc" },
    fox: { main: "#e63946", belly: "#ffffff", dark: "#1d3557", eye: "#ffd166" },
    tiger: { main: "#f77f00", belly: "#ffffff", dark: "#000000", eye: "#00ff88" },
    wolf: { main: "#adb5bd", belly: "#ffffff", dark: "#343a40", eye: "#00d4ff" },
    panther: { main: "#1b263b", belly: "#2b2d42", dark: "#0d1b2a", eye: "#ff007f" },
    owl: { main: "#6f4e37", belly: "#faedcd", dark: "#3e2723", eye: "#ffaa00" },
    panda: { main: "#ffffff", belly: "#ffffff", dark: "#111111", eye: "#00f0ff" },
  };

  const p = furPalette[pet.type] || furPalette.dragon;

  return (
    <group ref={bodyRef}>
      {/* CORPO ESCULPIDO REALISTA PBR */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow rotation={[0.2, 0, 0]}>
        <capsuleGeometry args={[0.85, 0.95, 16, 32]} />
        <meshStandardMaterial color={p.main} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* PEITO / BARRIGA */}
      <mesh position={[0, -0.25, 0.55]} scale={[0.8, 1.1, 0.6]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color={p.belly} roughness={0.6} />
      </mesh>

      {/* PATAS DIANTEIRAS */}
      <group position={[-0.45, -1.2, 0.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.8, 16]} />
          <meshStandardMaterial color={p.main} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.4, 0.1]}>
          <sphereGeometry args={[0.24, 16, 16]} />
          <meshStandardMaterial color={p.dark} roughness={0.7} />
        </mesh>
      </group>

      <group position={[0.45, -1.2, 0.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.8, 16]} />
          <meshStandardMaterial color={p.main} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.4, 0.1]}>
          <sphereGeometry args={[0.24, 16, 16]} />
          <meshStandardMaterial color={p.dark} roughness={0.7} />
        </mesh>
      </group>

      {/* CABEÇA ARTICULADA */}
      <group ref={headRef} position={[0, 0.7, 0.3]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color={p.main} roughness={0.3} metalness={0.15} />
        </mesh>

        <group position={[0, -0.15, 0.65]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.5, 0.6]} />
            <meshStandardMaterial color={p.belly} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.15, 0.32]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
          </mesh>
        </group>

        {pet.type === "panda" && (
          <>
            <mesh position={[-0.32, 0.15, 0.68]} scale={[1.4, 1.2, 0.5]} rotation={[0, 0, -0.3]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#111111" />
            </mesh>
            <mesh position={[0.32, 0.15, 0.68]} scale={[1.4, 1.2, 0.5]} rotation={[0, 0, 0.3]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#111111" />
            </mesh>
          </>
        )}

        <mesh position={[-0.32, 0.15, 0.73]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color={p.eye} />
        </mesh>
        <mesh position={[0.32, 0.15, 0.73]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color={p.eye} />
        </mesh>

        {pet.type === "dragon" ? (
          <>
            <mesh position={[-0.45, 0.75, -0.1]} rotation={[-0.4, 0, 0.3]} castShadow>
              <coneGeometry args={[0.18, 0.9, 16]} />
              <meshStandardMaterial color={p.dark} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh position={[0.45, 0.75, -0.1]} rotation={[-0.4, 0, -0.3]} castShadow>
              <coneGeometry args={[0.18, 0.9, 16]} />
              <meshStandardMaterial color={p.dark} roughness={0.3} metalness={0.5} />
            </mesh>
          </>
        ) : (
          <>
            <group position={[-0.45, 0.7, 0]} rotation={[0, 0, 0.35]}>
              <mesh castShadow>
                <coneGeometry args={[0.28, 0.65, 4]} />
                <meshStandardMaterial color={p.dark} roughness={0.5} />
              </mesh>
              <mesh position={[0, -0.05, 0.08]} scale={[0.7, 0.8, 0.5]}>
                <coneGeometry args={[0.25, 0.6, 4]} />
                <meshStandardMaterial color="#ffccd5" roughness={0.8} />
              </mesh>
            </group>
            <group position={[0.45, 0.7, 0]} rotation={[0, 0, -0.35]}>
              <mesh castShadow>
                <coneGeometry args={[0.28, 0.65, 4]} />
                <meshStandardMaterial color={p.dark} roughness={0.5} />
              </mesh>
              <mesh position={[0, -0.05, 0.08]} scale={[0.7, 0.8, 0.5]}>
                <coneGeometry args={[0.25, 0.6, 4]} />
                <meshStandardMaterial color="#ffccd5" roughness={0.8} />
              </mesh>
            </group>
          </>
        )}

        {pet.hat === "crown" && (
          <group position={[0, 0.85, 0]} rotation={[0.1, 0, 0]}>
            <mesh castShadow>
              <torusGeometry args={[0.45, 0.08, 16, 32]} />
              <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.05} />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <coneGeometry args={[0.48, 0.35, 5]} />
              <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.05} />
            </mesh>
          </group>
        )}

        {pet.hat === "wizard" && (
          <mesh position={[0, 1.1, -0.1]} rotation={[-0.15, 0, 0.1]}>
            <coneGeometry args={[0.65, 1.3, 32]} />
            <meshStandardMaterial color="#480ca8" roughness={0.3} metalness={0.3} />
          </mesh>
        )}

        {pet.glasses === "cyber" && (
          <mesh position={[0, 0.15, 0.8]}>
            <boxGeometry args={[0.95, 0.22, 0.15]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.85} />
          </mesh>
        )}

        {pet.glasses === "thug" && (
          <mesh position={[0, 0.15, 0.8]}>
            <boxGeometry args={[0.85, 0.18, 0.15]} />
            <meshBasicMaterial color="#050505" />
          </mesh>
        )}
      </group>

      {pet.type === "dragon" || pet.type === "owl" ? (
        <group position={[0, 0.2, -0.4]}>
          <mesh position={[-1.1, 0.4, 0]} rotation={[0.2, -0.4, 0.6]} castShadow>
            <boxGeometry args={[1.4, 0.05, 0.8]} />
            <meshStandardMaterial color={p.dark} roughness={0.4} />
          </mesh>
          <mesh position={[1.1, 0.4, 0]} rotation={[0.2, 0.4, -0.6]} castShadow>
            <boxGeometry args={[1.4, 0.05, 0.8]} />
            <meshStandardMaterial color={p.dark} roughness={0.4} />
          </mesh>
        </group>
      ) : (
        <group ref={tailRef} position={[0, -0.6, -0.7]}>
          <mesh position={[0, 0.3, -0.4]} rotation={[0.6, 0, 0]} castShadow>
            <capsuleGeometry args={[0.2, 0.8, 16, 16]} />
            <meshStandardMaterial color={p.dark} roughness={0.5} />
          </mesh>
        </group>
      )}

      {pet.accessory === "chain" && (
        <mesh position={[0, 0.2, 0.4]} rotation={[1.5, 0, 0]}>
          <torusGeometry args={[0.75, 0.07, 16, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.05} />
        </mesh>
      )}
    </group>
  );
}

export function Pet3D({ pet }: Pet3DProps) {
  return (
    <div className="relative h-full w-full select-none cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0.2, 4.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 10, 6]} intensity={2.0} castShadow shadow-mapSize={2048} />
        <pointLight position={[-6, -4, -4]} color="#8a2be2" intensity={1.5} />
        <pointLight position={[6, -4, 6]} color="#00f0ff" intensity={1.2} />
        <spotLight position={[0, 8, -5]} color="#ffffff" intensity={1.0} angle={0.6} penumbra={1} />

        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
          <PetMeshReal pet={pet} />
        </Float>

        <ContactShadows position={[0, -1.75, 0]} opacity={0.75} scale={7} blur={2.0} far={4} color="#000000" />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI / 2 + 0.05} />
      </Canvas>
    </div>
  );
}
