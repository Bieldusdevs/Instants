"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Vertex Shader GLSL
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment Shader GLSL moderno com ondas de luz e estética Dark Elegante
const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  // Função clássica de ruído (noise) para fluidez orgánica
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Movimento suave baseado no tempo (leve para processamento / WebGPU ready)
    float time = u_time * 0.15;
    
    // Duas camadas de noise sutil
    float n1 = snoise(st * 1.5 + vec2(time * 0.5, time * 0.2));
    float n2 = snoise(st * 3.0 - vec2(time * 0.3, time * 0.4));
    float finalNoise = (n1 + n2 * 0.5) * 0.5;

    // Paleta Dark Elegante
    vec3 deepBg = vec3(0.039, 0.039, 0.047);       // #0a0a0c
    vec3 charcoal = vec3(0.07, 0.07, 0.09);        // #121216
    vec3 neonPurple = vec3(0.35, 0.1, 0.6);        // #591999 sutíl
    vec3 fireOrange = vec3(0.8, 0.25, 0.0);        // #cc4000 sutíl

    vec3 color = mix(deepBg, charcoal, finalNoise + 0.5);
    
    // Adiciona brilhos sutis nas bordas das ondas
    float glow1 = smoothstep(0.2, 0.8, finalNoise);
    float glow2 = smoothstep(0.6, 0.95, finalNoise);
    
    color = mix(color, neonPurple * 0.3, glow1 * 0.4);
    color = mix(color, fireOrange * 0.25, glow2 * 0.5);

    // Vignette sutil para foco no app
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float dist = distance(uv, vec2(0.5));
    color *= smoothstep(1.2, 0.3, dist);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(
          typeof window !== "undefined" ? window.innerWidth : 1000,
          typeof window !== "undefined" ? window.innerHeight : 1000
        ),
      },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.u_time.value = state.clock.getElapsedTime();
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-dark-bg">
      {/* 
        Arquitetura pronta para WebGPU e WebGL.
        Em Three.js v166+, o WebGPURenderer pode ser importado de 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js'.
        O Canvas do R3F gerencia automaticamente o contexto WebGL e fallback de alta performance.
      */}
      <Canvas
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
        className="w-full h-full"
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
