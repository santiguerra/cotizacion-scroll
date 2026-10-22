import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Html,
  Float,
  RoundedBox,
  Torus,
  Sparkles,
  QuadraticBezierLine,
  PerspectiveCamera,
} from '@react-three/drei';
import { scrollState } from '../store/scrollStore';
import {
  ScrollLogo3D,
  MetaLevelLogo3D,
  MarketingAgencyProps3D,
} from './models/BrandLogos3D';

/**
 * Projects a DOM element's bounding rect center (#stage-...) directly into 3D world space
 * relative to the active camera so 3D rigs are 100% locked to their visual stage at any scroll position.
 */
function syncRigToDOMStage(groupRef, domId, state, zOffset = 0) {
  if (!groupRef.current) return false;
  const el = document.getElementById(domId);
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 900;
  const vw = window.innerWidth || 1440;

  if (rect.bottom < -350 || rect.top > vh + 350) {
    groupRef.current.visible = false;
    return false;
  }

  groupRef.current.visible = true;
  const ndcX = (rect.left + rect.width / 2) / vw - 0.5;
  const ndcY = 0.5 - (rect.top + rect.height / 2) / vh;

  const camZ = state.camera.position.z;
  const dist = Math.max(1.2, camZ - zOffset);
  const vFov = (state.camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFov / 2) * dist;
  const visibleWidth = visibleHeight * (vw / vh);

  groupRef.current.position.x = ndcX * visibleWidth + state.camera.position.x;
  groupRef.current.position.y = ndcY * visibleHeight + state.camera.position.y;
  groupRef.current.position.z = zOffset;
  return true;
}

/**
 * SECTION 1 (3D): Hero Smartphone + Z-Axis Immersion + Detaching 3D Scroll Arrow
 */
function HeroSmartphoneRig() {
  const rootRef = useRef();
  const phoneGroupRef = useRef();
  const ringWave1Ref = useRef();
  const ringWave2Ref = useRef();
  const logoWrapperRef = useRef();
  const screenMaterialRef = useRef();
  const [heroProgress, setHeroProgress] = React.useState(0);

  useFrame((state) => {
    const p = scrollState.sections.hero;
    const t = state.clock.getElapsedTime();

    if (rootRef.current) {
      const heroEl = document.getElementById('sec-hero');
      const rect = heroEl ? heroEl.getBoundingClientRect() : null;
      rootRef.current.visible = p < 0.95 && Boolean(rect && rect.bottom > 40);
    }

    if (Math.abs(p - heroProgress) > 0.05) {
      setHeroProgress(p);
    }

    if (screenMaterialRef.current) {
      screenMaterialRef.current.emissiveIntensity = 0.75 + p * 1.4;
    }

    if (phoneGroupRef.current) {
      const isRinging = p < 0.04 && !scrollState.callAnswered;
      const ringShakeZ = isRinging ? Math.sin(t * 28) * 0.035 * Math.max(0, Math.sin(t * 3)) : 0;
      const ringBobY = isRinging ? Math.sin(t * 2.5) * 0.08 : 0;

      const landscapeProgress = THREE.MathUtils.smoothstep(p, 0.02, 0.52);
      phoneGroupRef.current.rotation.z =
        THREE.MathUtils.lerp(0, -Math.PI / 2, landscapeProgress) + ringShakeZ;
      phoneGroupRef.current.rotation.y =
        Math.sin(p * Math.PI) * 0.22 + scrollState.mouse.x * 0.12;
      phoneGroupRef.current.rotation.x =
        Math.cos(p * Math.PI * 0.5) * 0.08 - scrollState.mouse.y * 0.1;

      phoneGroupRef.current.position.y = ringBobY;
    }

    if (ringWave1Ref.current && ringWave2Ref.current) {
      const wave1 = (t * 0.7) % 1;
      const wave2 = ((t * 0.7) + 0.5) % 1;
      const fadeOut = 1 - THREE.MathUtils.smoothstep(p, 0, 0.25);
      ringWave1Ref.current.scale.setScalar(1 + wave1 * 1.4);
      ringWave1Ref.current.material.opacity = (1 - wave1) * 0.45 * fadeOut;
      ringWave2Ref.current.scale.setScalar(1 + wave2 * 1.4);
      ringWave2Ref.current.material.opacity = (1 - wave2) * 0.45 * fadeOut;
    }

    const outCurve = Math.sin(p * Math.PI);
    const sepZ = outCurve * 2.15;
    const angle = p * Math.PI * 2;
    const ox = Math.sin(angle) * outCurve * 0.75;
    const oy = Math.cos(angle) * outCurve * 0.42;

    if (logoWrapperRef.current) {
      logoWrapperRef.current.position.set(ox, 0.08 + oy, 0.15 + sepZ);
      logoWrapperRef.current.rotation.set(
        Math.sin(p * Math.PI) * 0.35,
        Math.sin(p * Math.PI * 2) * 0.55,
        p * Math.PI * 0.25
      );
    }
  });

  return (
    <group ref={rootRef} position={[0, 0, 0]}>
      <mesh ref={ringWave1Ref} position={[0, 0, -0.15]}>
        <ringGeometry args={[1.45, 1.52, 48]} />
        <meshBasicMaterial color="#02E7C1" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringWave2Ref} position={[0, 0, -0.15]}>
        <ringGeometry args={[1.45, 1.52, 48]} />
        <meshBasicMaterial color="#AEF905" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      <group ref={phoneGroupRef}>
        <RoundedBox args={[2.15, 4.25, 0.22]} radius={0.26} smoothness={6} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#0b192c"
            metalness={0.88}
            roughness={0.18}
            clearcoat={1}
          />
        </RoundedBox>

        <RoundedBox args={[2.19, 4.29, 0.16]} radius={0.27} smoothness={4}>
          <meshStandardMaterial
            color="#02CCB5"
            emissive="#02CCB5"
            emissiveIntensity={0.45}
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>

        <RoundedBox
          args={[1.96, 4.04, 0.04]}
          radius={0.2}
          smoothness={4}
          position={[0, 0, 0.11]}
        >
          <meshPhysicalMaterial
            ref={screenMaterialRef}
            color="#021836"
            emissive="#033369"
            emissiveIntensity={0.75}
            roughness={0.1}
            metalness={0.1}
            clearcoat={1}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.135]}>
          <ringGeometry args={[0.92, 0.96, 48]} />
          <meshBasicMaterial color="#02E7C1" transparent opacity={0.55} />
        </mesh>
        <mesh position={[0, 0, 0.14]}>
          <ringGeometry args={[1.15, 1.17, 48]} />
          <meshBasicMaterial color="#AEF905" transparent opacity={0.35} />
        </mesh>

        <RoundedBox args={[0.58, 0.14, 0.02]} radius={0.07} position={[0, 1.82, 0.135]}>
          <meshBasicMaterial color="#000000" />
        </RoundedBox>

        <group ref={logoWrapperRef} position={[0, 0.08, 0.15]}>
          <ScrollLogo3D
            separationZ={0}
            orbitOffset={[0, 0, 0]}
            orbitRotation={[0, 0, 0]}
            showPlinth={true}
            scale={0.78}
            glowIntensity={0.75}
          />
        </group>
      </group>

      <MarketingAgencyProps3D progress={heroProgress} />
    </group>
  );
}

/**
 * SECTION 2 (3D): El Iceberg de Scroll (Locked to #stage-iceberg)
 */
function IcebergSectionRig() {
  const stageGroupRef = useRef();
  const icebergGroupRef = useRef();
  const waterSurfaceRef = useRef();
  const [icebergProg, setIcebergProg] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  useFrame((state) => {
    const vis = syncRigToDOMStage(stageGroupRef, 'stage-iceberg', state, 0);
    if (vis !== isVisible) setIsVisible(vis);
    if (!vis) return;

    const p = scrollState.sections.iceberg;
    if (Math.abs(p - icebergProg) > 0.01) {
      setIcebergProg(p);
    }
    const t = state.clock.getElapsedTime();
    if (icebergGroupRef.current) {
      icebergGroupRef.current.rotation.y = Math.sin(t * 0.35) * 0.18 + p * 0.85;
      // Move iceberg vertically slightly as user descends from tip to underwater core
      icebergGroupRef.current.position.y = THREE.MathUtils.lerp(-0.35, 0.85, p);
    }
    if (waterSurfaceRef.current) {
      waterSurfaceRef.current.position.y = 0.65 + Math.sin(t * 1.5) * 0.04;
    }
  });

  return (
    <group ref={stageGroupRef} visible={false}>
      <group ref={icebergGroupRef} scale={0.85}>
        <mesh ref={waterSurfaceRef} position={[0, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 12, 16, 16]} />
          <meshPhysicalMaterial
            color="#02CCB5"
            emissive="#033369"
            emissiveIntensity={0.4}
            transparent
            opacity={0.24}
            roughness={0.15}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.85, 2.0, 48]} />
          <meshBasicMaterial color="#02E7C1" transparent opacity={0.75} side={THREE.DoubleSide} />
        </mesh>

        {/* 1. LA PUNTA DEL ICEBERG (Above Water) */}
        <mesh position={[0, 1.75, 0]} castShadow>
          <coneGeometry args={[1.55, 2.2, 7]} />
          <meshPhysicalMaterial
            color="#e0f7fa"
            emissive="#02CCB5"
            emissiveIntensity={0.22}
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.9}
            flatShading
          />
        </mesh>
        <mesh position={[0, 1.75, 0]} scale={1.02}>
          <coneGeometry args={[1.55, 2.2, 7]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.28} />
        </mesh>

        {/* 2. LA PROFUNDIDAD DEL ICEBERG (Underwater) */}
        <mesh position={[0, -1.95, 0]} rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[2.8, 5.0, 8]} />
          <meshPhysicalMaterial
            color="#033369"
            emissive="#022751"
            emissiveIntensity={0.65}
            roughness={0.18}
            metalness={0.35}
            transparent
            opacity={0.92}
            flatShading
          />
        </mesh>
        <mesh position={[0, -1.95, 0]} rotation={[Math.PI, 0, 0]} scale={1.015}>
          <coneGeometry args={[2.8, 5.0, 8]} />
          <meshBasicMaterial
            color="#02E7C1"
            wireframe
            transparent
            opacity={0.4 + icebergProg * 0.45}
          />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <octahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#AEF905"
            emissive="#AEF905"
            emissiveIntensity={0.85}
            wireframe
          />
        </mesh>

        {/* DREI <Html> SLEEK FLOATING PILLS EMERGING FROM THE ICEBERG */}
        {isVisible && (
          <>
            <Html position={[0, 2.2, 0.6]} center distanceFactor={8} zIndexRange={[20, 0]}>
              <div className="w-48 rounded-full bg-[#01122a]/95 backdrop-blur-md border border-[#02E7C1]/50 px-4 py-2 shadow-xl flex items-center justify-between pointer-events-none select-none">
                <span className="text-[11px] font-display font-bold text-white">
                  🎬 Pautas &amp; Reels
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#02E7C1] text-[#01122a] text-[10px] font-extrabold">
                  15%
                </span>
              </div>
            </Html>

            <Html position={[1.8, -0.9, 0.8]} center distanceFactor={8} zIndexRange={[20, 0]}>
              <div
                className="w-52 rounded-full bg-[#AEF905] text-[#01122a] px-4 py-2 shadow-[0_10px_25px_rgba(174,249,5,0.4)] flex items-center justify-between pointer-events-none select-none transition-all duration-500"
                style={{
                  opacity: THREE.MathUtils.smoothstep(icebergProg, 0.08, 0.38),
                }}
              >
                <span className="text-[11px] font-display font-black">
                  ⚡ IA Responde
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#01122a] text-[#AEF905] text-[10px] font-mono font-bold">
                  &lt; 10s
                </span>
              </div>
            </Html>

            <Html position={[-1.8, -2.1, 0.8]} center distanceFactor={8} zIndexRange={[20, 0]}>
              <div
                className="w-52 rounded-full bg-[#01122a]/95 border border-[#AEF905]/60 px-4 py-2 shadow-xl flex items-center justify-between pointer-events-none select-none transition-all duration-500"
                style={{
                  opacity: THREE.MathUtils.smoothstep(icebergProg, 0.22, 0.55),
                }}
              >
                <span className="text-[11px] font-display font-bold text-white">
                  🎯 Filtro Leads
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#AEF905]/20 text-[#AEF905] text-[10px] font-mono font-bold">
                  24/7
                </span>
              </div>
            </Html>
          </>
        )}
      </group>
    </group>
  );
}

/**
 * SECTION 3 (3D): Tu Propio Software SaaS (Scroll-linked 3D Node Ring behind the Scroll Device)
 */
function SaaSClusterRig() {
  const stageGroupRef = useRef();
  const clusterRef = useRef();

  const nodePositions = useMemo(
    () => [
      [3.3, 1.4, -0.4],
      [-3.3, 1.4, -0.4],
      [3.6, -0.1, -0.6],
      [-3.6, -0.1, -0.6],
      [2.8, -1.5, -0.3],
      [-2.8, -1.5, -0.3],
    ],
    []
  );

  useFrame((state, delta) => {
    const vis = syncRigToDOMStage(stageGroupRef, 'stage-saas', state, -0.5);
    if (!vis || !clusterRef.current) return;

    const p = scrollState.sections.saas;
    const activeIdx = Math.min(5, Math.floor(p * 6));
    scrollState.activeSaasPillar = activeIdx;

    // Strictly linked to scroll position
    const targetRotY = Math.sin(p * Math.PI * 2) * 0.45 + scrollState.mouse.x * 0.2;
    const targetRotX = Math.cos(p * Math.PI) * 0.15 - scrollState.mouse.y * 0.12;

    clusterRef.current.rotation.y = THREE.MathUtils.lerp(
      clusterRef.current.rotation.y,
      targetRotY,
      delta * 5
    );
    clusterRef.current.rotation.x = THREE.MathUtils.lerp(
      clusterRef.current.rotation.x,
      targetRotX,
      delta * 5
    );
  });

  return (
    <group ref={stageGroupRef} visible={false}>
      <group ref={clusterRef}>
        <Torus args={[3.1, 0.02, 16, 72]} rotation={[Math.PI / 2.3, 0, 0]}>
          <meshBasicMaterial color="#02E7C1" transparent opacity={0.35} />
        </Torus>

        {nodePositions.map((pos, idx) => {
          const isSelected = scrollState.activeSaasPillar === idx;
          const nodeColor = isSelected ? '#AEF905' : '#02E7C1';
          return (
            <group key={idx}>
              <QuadraticBezierLine
                start={[0, 0, -0.6]}
                mid={[pos[0] * 0.55, pos[1] * 0.85, pos[2] + 0.4]}
                end={pos}
                color={nodeColor}
                lineWidth={isSelected ? 3.0 : 1.2}
              />

              <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.4}>
                <group position={pos} scale={isSelected ? 1.22 : 0.85}>
                  <RoundedBox args={[0.58, 0.58, 0.58]} radius={0.14}>
                    <meshPhysicalMaterial
                      color={isSelected ? '#AEF905' : '#033369'}
                      emissive={nodeColor}
                      emissiveIntensity={isSelected ? 0.95 : 0.35}
                      metalness={0.6}
                      roughness={0.15}
                      clearcoat={1}
                    />
                  </RoundedBox>
                  <Torus args={[0.48, 0.025, 12, 32]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <meshBasicMaterial color={nodeColor} />
                  </Torus>
                </group>
              </Float>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/**
 * SECTION 5 (3D): Casos de Éxito & El Crossover MetaLevelCode (Locked to #stage-crossover)
 * Renders the 3D Scroll Logo (left) and the True 3D Extruded MetaLevelCode "M" Logo (right).
 * With scroll, they approach each other, meet, MetaLevelCode absorbs Scroll's color palette,
 * and triggers the 3D shockwave ring!
 */
function CrossoverEncounterRig() {
  const stageGroupRef = useRef();
  const scrollLogoWrapRef = useRef();
  const metaLogoWrapRef = useRef();
  const shockwaveRef = useRef();
  const energyBridgeRef = useRef();

  const [absorption, setAbsorption] = React.useState(0);

  useFrame((state) => {
    const vis = syncRigToDOMStage(stageGroupRef, 'stage-crossover', state, 0);
    if (!vis) return;

    const p = scrollState.sections.crossover;
    const t = state.clock.getElapsedTime();

    // 0.0 -> 0.55: Logos approach each other from X = ±1.75 to X = ±0.72
    const approach = THREE.MathUtils.smoothstep(p, 0.05, 0.52);
    // 0.45 -> 0.72: MetaLevelCode 3D "M" Logo absorbs Scroll's Turquoise & Lime palette
    const absorb = THREE.MathUtils.smoothstep(p, 0.45, 0.72);
    if (Math.abs(absorb - absorption) > 0.01) {
      setAbsorption(absorb);
    }

    const dist = THREE.MathUtils.lerp(1.75, 0.72, approach);

    if (scrollLogoWrapRef.current) {
      scrollLogoWrapRef.current.position.x = -dist;
      scrollLogoWrapRef.current.position.y = Math.sin(t * 2.2) * 0.06;
      scrollLogoWrapRef.current.rotation.y =
        THREE.MathUtils.lerp(0.28, 0.12, approach) + Math.sin(t * 1.2) * 0.08;
    }

    if (metaLogoWrapRef.current) {
      metaLogoWrapRef.current.position.x = dist;
      metaLogoWrapRef.current.position.y = Math.cos(t * 2.2) * 0.06;
      metaLogoWrapRef.current.rotation.y =
        THREE.MathUtils.lerp(-0.28, -0.12, approach) - Math.sin(t * 1.2) * 0.08;
    }

    if (energyBridgeRef.current) {
      const bridgeActive = THREE.MathUtils.smoothstep(p, 0.35, 0.58);
      energyBridgeRef.current.scale.x = dist * 1.65;
      energyBridgeRef.current.material.opacity = bridgeActive * 0.9;
    }

    if (shockwaveRef.current) {
      const waveProg = THREE.MathUtils.smoothstep(p, 0.52, 0.88);
      const waveScale = 0.15 + waveProg * 12.0;
      shockwaveRef.current.scale.setScalar(waveScale);
      shockwaveRef.current.material.opacity =
        waveProg > 0.01 && waveProg < 0.98 ? Math.sin(waveProg * Math.PI) * 0.85 : 0;
    }
  });

  return (
    <group ref={stageGroupRef} visible={false}>
      {/* Left: 3D Scroll Logo */}
      <group ref={scrollLogoWrapRef} position={[-1.75, 0, 0]}>
        <ScrollLogo3D showPlinth={true} scale={0.68} glowIntensity={0.85} />
      </group>

      {/* Right: True 3D Extruded MetaLevelCode "M" Logo (absorbs Scroll palette!) */}
      <group ref={metaLogoWrapRef} position={[1.75, 0, 0]}>
        <MetaLevelLogo3D absorption={absorption} scale={0.68} />
      </group>

      {/* Glowing Synaptic Energy Bridge when the two 3D logos meet */}
      <mesh ref={energyBridgeRef} position={[0, 0, -0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1, 16]} />
        <meshBasicMaterial color="#AEF905" transparent opacity={0} />
      </mesh>

      {/* Expanding 3D Shockwave Ring restoring the Scroll Palette */}
      <mesh ref={shockwaveRef} position={[0, 0, 0.15]}>
        <ringGeometry args={[0.85, 1.05, 64]} />
        <meshBasicMaterial
          color="#AEF905"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * SECTION 7 (3D): Trabajemos Juntos — Floating Dynamic 3D QR Monolith (Locked to #stage-qr)
 * Never occluded by opaque HTML cards!
 */
function ClimaxQRRig() {
  const stageGroupRef = useRef();
  const qrGroupRef = useRef();
  
  const qrTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#01122a';
    ctx.fillRect(20, 20, 80, 80);
    ctx.fillRect(156, 20, 80, 80);
    ctx.fillRect(20, 156, 80, 80);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(36, 36, 48, 48);
    ctx.fillRect(172, 36, 48, 48);
    ctx.fillRect(36, 172, 48, 48);
    ctx.fillStyle = '#AEF905';
    ctx.fillRect(48, 48, 24, 24);
    ctx.fillRect(184, 48, 24, 24);
    ctx.fillRect(48, 184, 24, 24);
    ctx.fillStyle = '#01122a';
    ctx.fillRect(116, 116, 24, 24);
    ctx.fillRect(116, 40, 24, 24);
    ctx.fillRect(40, 116, 24, 24);

    const tex = new THREE.CanvasTexture(canvas);
    
    try {
      const basePath = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
      const loader = new THREE.TextureLoader();
      loader.load(
        `${basePath}qr_metalevel.png`,
        (loaded) => {
          tex.image = loaded.image;
          tex.needsUpdate = true;
        },
        undefined,
        (err) => {
          console.warn('QR texture fallback active:', err);
        }
      );
    } catch (e) {
      console.warn('Texture loader init error:', e);
    }
    return tex;
  }, []);

  useFrame((state) => {
    const vis = syncRigToDOMStage(stageGroupRef, 'stage-qr', state, 0);
    if (!vis || !qrGroupRef.current) return;

    const t = state.clock.getElapsedTime();
    qrGroupRef.current.rotation.y =
      Math.sin(t * 0.9) * 0.22 + scrollState.mouse.x * 0.28;
    qrGroupRef.current.rotation.x =
      Math.cos(t * 0.7) * 0.1 - scrollState.mouse.y * 0.18;
  });

  return (
    <group ref={stageGroupRef} visible={false}>
      <Float speed={2.4} rotationIntensity={0.18} floatIntensity={0.35}>
        <group ref={qrGroupRef} scale={0.72}>
          {/* 3D Titanium & Obsidian Pedestal Frame */}
          <RoundedBox args={[2.35, 2.35, 0.24]} radius={0.24} smoothness={6} castShadow>
            <meshPhysicalMaterial
              color="#031b3d"
              emissive="#02CCB5"
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.18}
              clearcoat={1}
            />
          </RoundedBox>

          {/* Neon Lime Rim */}
          <RoundedBox args={[2.42, 2.42, 0.14]} radius={0.26} smoothness={4}>
            <meshStandardMaterial
              color="#AEF905"
              emissive="#AEF905"
              emissiveIntensity={0.85}
            />
          </RoundedBox>

          {/* Crisp White Plinth + Mapped QR Code Texture */}
          <RoundedBox args={[1.96, 1.96, 0.06]} radius={0.14} position={[0, 0, 0.12]}>
            <meshBasicMaterial color="#ffffff" />
          </RoundedBox>
          <mesh position={[0, 0, 0.155]}>
            <planeGeometry args={[1.76, 1.76]} />
            <meshBasicMaterial map={qrTexture} toneMapped={false} />
          </mesh>

          {/* 3D Extruded Corner Finder Cubes */}
          {[
            [-0.82, 0.82],
            [0.82, 0.82],
            [-0.82, -0.82],
          ].map(([cx, cy], i) => (
            <RoundedBox
              key={i}
              args={[0.24, 0.24, 0.09]}
              radius={0.04}
              position={[cx, cy, 0.17]}
            >
              <meshStandardMaterial
                color="#02CCB5"
                emissive="#02E7C1"
                emissiveIntensity={0.85}
              />
            </RoundedBox>
          ))}

          {/* Orbiting Holographic Ring */}
          <Torus args={[1.65, 0.022, 16, 64]} rotation={[Math.PI / 3, 0.3, 0]}>
            <meshBasicMaterial color="#02E7C1" transparent opacity={0.65} />
          </Torus>
        </group>
      </Float>
    </group>
  );
}

/**
 * MASTER CAMERA & LIGHTING DIRECTOR
 */
function SceneCameraDirector() {
  const camRef = useRef();
  const keyLightRef = useRef();
  const rimLightRef = useRef();

  useFrame((_, delta) => {
    if (!camRef.current) return;

    const s = scrollState.sections;
    const active = scrollState.activeSection;

    let targetZ = 6.2;
    let targetFov = 54;

    if (active === 'hero') {
      const p = s.hero;
      targetZ = THREE.MathUtils.lerp(6.2, -1.35, Math.pow(p, 1.35));
      targetFov = THREE.MathUtils.lerp(62, 42, Math.sin(p * Math.PI * 0.5));
    } else {
      targetZ = 6.2;
      targetFov = 52;
    }

    const damp = Math.min(1, delta * 6.5);
    camRef.current.position.z = THREE.MathUtils.lerp(camRef.current.position.z, targetZ, damp);
    camRef.current.position.x = THREE.MathUtils.lerp(
      camRef.current.position.x,
      scrollState.mouse.x * 0.18,
      damp
    );
    camRef.current.position.y = THREE.MathUtils.lerp(
      camRef.current.position.y,
      -scrollState.mouse.y * 0.12,
      damp
    );

    if (Math.abs(camRef.current.fov - targetFov) > 0.05) {
      camRef.current.fov = THREE.MathUtils.lerp(camRef.current.fov, targetFov, damp);
      camRef.current.updateProjectionMatrix();
    }

    if (keyLightRef.current && rimLightRef.current) {
      const isMetaTheme = scrollState.themeMode === 'metalevel';
      const targetKeyColor = new THREE.Color(isMetaTheme ? '#7c3aed' : '#02CCB5');
      const targetRimColor = new THREE.Color(isMetaTheme ? '#00f0ff' : '#AEF905');
      keyLightRef.current.color.lerp(targetKeyColor, damp);
      rimLightRef.current.color.lerp(targetRimColor, damp);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={camRef} makeDefault position={[0, 0, 6.2]} fov={62} near={0.1} far={120} />
      <ambientLight intensity={0.95} />
      <directionalLight
        ref={keyLightRef}
        position={[5, 8, 6]}
        intensity={2.4}
        color="#02CCB5"
        castShadow
      />
      <pointLight
        ref={rimLightRef}
        position={[-5, -4, 5]}
        intensity={2.0}
        distance={35}
        color="#AEF905"
      />
    </>
  );
}

class R3FErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("3D Rig caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback !== undefined ? this.props.fallback : null;
    }
    return this.props.children;
  }
}

export default function Canvas3D() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <R3FErrorBoundary>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6.2], fov: 62, near: 0.1, far: 120 }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
          }}
        >
          <SceneCameraDirector />

          <Sparkles
            count={140}
            scale={[16, 14, 10]}
            position={[0, 0, -2]}
            size={2.0}
            speed={0.35}
            color="#02E7C1"
            opacity={0.4}
          />

          {/* 1. Hero Smartphone + Detaching 3D Scroll Logo + Marketing Props */}
          <R3FErrorBoundary>
            <HeroSmartphoneRig />
          </R3FErrorBoundary>

          {/* 2. El Iceberg 3D + Drei <Html> Floating Pills (Locked to #stage-iceberg) */}
          <R3FErrorBoundary>
            <IcebergSectionRig />
          </R3FErrorBoundary>

          {/* 3. Tu Propio Software SaaS 3D Node Cluster (Locked to #stage-saas) */}
          <R3FErrorBoundary>
            <SaaSClusterRig />
          </R3FErrorBoundary>

          {/* 5. Casos de Éxito & Crossover MetaLevelCode 3D Logos + Shockwave (Locked to #stage-crossover) */}
          <R3FErrorBoundary>
            <CrossoverEncounterRig />
          </R3FErrorBoundary>

          {/* 7. Trabajemos Juntos 3D Floating QR Monolith (Locked to #stage-qr) */}
          <R3FErrorBoundary>
            <ClimaxQRRig />
          </R3FErrorBoundary>
        </Canvas>
      </R3FErrorBoundary>
    </div>
  );
}
