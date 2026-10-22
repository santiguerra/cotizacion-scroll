import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Torus, Float } from '@react-three/drei';

/**
 * Helper to create a 2D capsule/stroke THREE.Shape between two 2D points (x1,y1) and (x2,y2)
 * so we can extrude crisp 3D geometric bars with bevels.
 */
function createRoundedStrokeShape(x1, y1, x2, y2, radius = 0.055) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  const nx = -Math.sin(angle) * radius;
  const ny = Math.cos(angle) * radius;

  const shape = new THREE.Shape();
  shape.moveTo(x1 + nx, y1 + ny);
  shape.lineTo(x2 + nx, y2 + ny);
  shape.absarc(x2, y2, radius, angle + Math.PI / 2, angle - Math.PI / 2, true);
  shape.lineTo(x1 - nx, y1 - ny);
  shape.absarc(x1, y1, radius, angle - Math.PI / 2, angle + Math.PI / 2, true);
  shape.closePath();
  return shape;
}

/**
 * Complete 3D Scroll Logo:
 * - Curved Blue/Turquoise Chat-Bubble Body ("la curvita azul dentro del círculo blanco")
 * - Lime Arrow Head (#AEF905) ("la cabeza de la flecha")
 * Together they form the complete Scroll arrow that separates on the Z-axis from the white plinth/phone screen.
 */
export function ScrollLogo3D({
  separationZ = 0,
  orbitOffset = [0, 0, 0],
  orbitRotation = [0, 0, 0],
  showPlinth = true,
  scale = 1,
  glowIntensity = 0.45,
}) {
  const arrowGroupRef = useRef();

  // Construct exact 3D extruded shapes from normalized SVG coordinates (viewBox 0..150 centered at 75,75)
  const { bodyGeometry, headGeometry } = useMemo(() => {
    const to3D = (x, y) => [(x - 75) * 0.018, (75 - y) * 0.018];

    // 1. Curved Blue/Turquoise Chat-Bubble Body Shape
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(...to3D(57, 40.5));
    bodyShape.bezierCurveTo(...to3D(63, 40.5), ...to3D(67.5, 44.5), ...to3D(67.5, 50));
    bodyShape.bezierCurveTo(...to3D(67.5, 55), ...to3D(63, 60), ...to3D(58.5, 64));
    bodyShape.bezierCurveTo(...to3D(55.5, 67), ...to3D(54.5, 73), ...to3D(56.5, 79));
    bodyShape.bezierCurveTo(...to3D(57.5, 82), ...to3D(61, 85), ...to3D(64.5, 88.5));
    bodyShape.lineTo(...to3D(64, 96.5));
    bodyShape.lineTo(...to3D(73, 92));
    bodyShape.bezierCurveTo(...to3D(79, 91.5), ...to3D(86, 88), ...to3D(90.5, 84.5));
    bodyShape.lineTo(...to3D(106, 94));
    bodyShape.bezierCurveTo(...to3D(97.5, 103), ...to3D(85, 108.5), ...to3D(72.5, 108.5));
    bodyShape.bezierCurveTo(...to3D(53.5, 108.5), ...to3D(38, 93.5), ...to3D(38, 74.5));
    bodyShape.bezierCurveTo(...to3D(38, 56), ...to3D(46.5, 43.5), ...to3D(57, 40.5));
    bodyShape.closePath();

    // 2. Lime Arrow Head (#AEF905) Shape
    const headShape = new THREE.Shape();
    headShape.moveTo(...to3D(86, 61));
    headShape.lineTo(...to3D(109, 61));
    headShape.bezierCurveTo(...to3D(112.5, 61), ...to3D(113.5, 62.5), ...to3D(113.5, 66));
    headShape.lineTo(...to3D(113.5, 86));
    headShape.bezierCurveTo(...to3D(113.5, 89), ...to3D(110, 90), ...to3D(107, 87));
    headShape.lineTo(...to3D(84.5, 64.5));
    headShape.bezierCurveTo(...to3D(82, 62), ...to3D(83, 61), ...to3D(86, 61));
    headShape.closePath();

    const extrudeSettings = {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    };

    const bGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    const hGeo = new THREE.ExtrudeGeometry(headShape, {
      ...extrudeSettings,
      depth: 0.19,
    });

    return { bodyGeometry: bGeo, headGeometry: hGeo };
  }, []);

  return (
    <group scale={scale}>
      {/* Optional White Circular Plinth */}
      {showPlinth && (
        <group position={[0, 0, -0.04]}>
          <mesh receiveShadow castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.88, 0.92, 0.09, 48]} />
            <meshPhysicalMaterial
              color="#F5F4F3"
              roughness={0.18}
              metalness={0.08}
              clearcoat={0.8}
            />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <ringGeometry args={[0.84, 0.9, 48]} />
            <meshBasicMaterial color="#02CCB5" transparent opacity={0.55} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Complete 3D Scroll Arrow (Curved Blue/Turquoise Body + Lime Arrow Head) */}
      <group
        ref={arrowGroupRef}
        position={[
          orbitOffset[0],
          orbitOffset[1],
          0.06 + separationZ + orbitOffset[2],
        ]}
        rotation={orbitRotation}
      >
        <mesh geometry={bodyGeometry} castShadow receiveShadow position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#02CCB5"
            emissive="#033369"
            emissiveIntensity={glowIntensity}
            roughness={0.18}
            metalness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        <mesh geometry={bodyGeometry} position={[0, 0, -0.03]} scale={[0.98, 0.98, 0.6]}>
          <meshStandardMaterial
            color="#033369"
            emissive="#022751"
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>

        <mesh geometry={headGeometry} castShadow receiveShadow position={[0.02, 0.02, 0.02]}>
          <meshPhysicalMaterial
            color="#AEF905"
            emissive="#AEF905"
            emissiveIntensity={glowIntensity * 1.15}
            roughness={0.15}
            metalness={0.15}
            clearcoat={1}
          />
        </mesh>

        {separationZ > 0.05 && (
          <pointLight
            position={[0.2, 0.2, 0.35]}
            intensity={Math.min(2.5, separationZ * 1.4)}
            distance={4.5}
            color="#02E7C1"
          />
        )}
      </group>
    </group>
  );
}

/**
 * True 3D Extruded MetaLevelCode Logo (Modeled directly from /public/logo_metalevel.png):
 * - Dark Obsidian Circular Medallion Plinth with glowing rim
 * - The 3 signature geometric strokes of the "M" (Left Hook, Center Long Diagonal, Right Hook)
 *   extruded in 3D with rounded caps and bevels!
 * - Dynamically absorbs Scroll's Turquoise (#02CCB5) & Lime (#AEF905) palette when absorption (0 -> 1) increases!
 */
export function MetaLevelLogo3D({ absorption = 0, scale = 1 }) {
  const emblemRef = useRef();
  const ringRef = useRef();

  // Construct the exact 5 stroke segments of the MetaLevelCode "M" logo in 3D
  const { leftStrokesGeo, centerDiagonalGeo, rightStrokesGeo } = useMemo(() => {
    const r = 0.048;
    // 1. Left Hook: Vertical (-0.52, -0.50) -> (-0.52, 0.16) + Diagonal (-0.52, 0.16) -> (-0.16, -0.20)
    const leftVert = createRoundedStrokeShape(-0.52, -0.50, -0.52, 0.16, r);
    const leftDiag = createRoundedStrokeShape(-0.52, 0.16, -0.16, -0.20, r);

    // 2. Center Long Diagonal: Top-Left (-0.52, 0.52) -> Bottom-Right (0.52, -0.50)
    const centerDiag = createRoundedStrokeShape(-0.52, 0.52, 0.52, -0.50, r);

    // 3. Right Hook: Diagonal (0.14, 0.14) -> (0.52, 0.52) + Vertical (0.52, 0.52) -> (0.52, -0.16)
    const rightDiag = createRoundedStrokeShape(0.14, 0.14, 0.52, 0.52, r);
    const rightVert = createRoundedStrokeShape(0.52, 0.52, 0.52, -0.16, r);

    const extrudeOpts = {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    };

    return {
      leftStrokesGeo: [
        new THREE.ExtrudeGeometry(leftVert, extrudeOpts),
        new THREE.ExtrudeGeometry(leftDiag, extrudeOpts),
      ],
      centerDiagonalGeo: new THREE.ExtrudeGeometry(centerDiag, {
        ...extrudeOpts,
        depth: 0.22,
      }),
      rightStrokesGeo: [
        new THREE.ExtrudeGeometry(rightDiag, extrudeOpts),
        new THREE.ExtrudeGeometry(rightVert, extrudeOpts),
      ],
    };
  }, []);

  // Color interpolation:
  // Before absorption (0): Crisp White + Cyber Violet/Cyan glow (MetaLevelCode identity)
  // After absorption (1): Scroll Turquoise (#02E7C1) + Scroll Lime (#AEF905)
  const mainStrokeColor = useMemo(() => {
    return new THREE.Color('#ffffff').lerp(new THREE.Color('#02E7C1'), absorption);
  }, [absorption]);

  const highlightStrokeColor = useMemo(() => {
    return new THREE.Color('#ffffff').lerp(new THREE.Color('#AEF905'), absorption);
  }, [absorption]);

  const glowColor = useMemo(() => {
    return new THREE.Color('#8b5cf6').lerp(new THREE.Color('#AEF905'), absorption);
  }, [absorption]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (emblemRef.current) {
      // Subtle 3D float & breathing on Z-axis
      emblemRef.current.position.z = 0.08 + Math.sin(t * 2.4) * 0.04 + absorption * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (0.7 + absorption * 1.5);
    }
  });

  return (
    <group scale={scale}>
      {/* Obsidian Circular Plinth (matching the scale of Scroll's white plinth) */}
      <group position={[0, 0, -0.04]}>
        <mesh receiveShadow castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.92, 0.96, 0.1, 48]} />
          <meshPhysicalMaterial
            color="#05050a"
            roughness={0.18}
            metalness={0.5}
            clearcoat={1}
          />
        </mesh>

        {/* Glowing Outer Rim Ring that shifts from Cyber Violet to Scroll Lime */}
        <mesh ref={ringRef} position={[0, 0, 0.055]}>
          <ringGeometry args={[0.85, 0.93, 48]} />
          <meshBasicMaterial color={glowColor} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Extruded 3D "M" Emblem of MetaLevelCode */}
      <group ref={emblemRef} position={[0, 0.04, 0.08]}>
        {/* Left Hook (| + \) */}
        {leftStrokesGeo.map((geo, idx) => (
          <mesh key={`l-${idx}`} geometry={geo} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={mainStrokeColor}
              emissive={mainStrokeColor}
              emissiveIntensity={0.45 + absorption * 0.45}
              roughness={0.15}
              metalness={0.2}
              clearcoat={1}
            />
          </mesh>
        ))}

        {/* Center Long Diagonal (\) — absorbs Scroll's signature Lime #AEF905 */}
        <mesh geometry={centerDiagonalGeo} position={[0, 0, 0.02]} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={highlightStrokeColor}
            emissive={highlightStrokeColor}
            emissiveIntensity={0.6 + absorption * 0.6}
            roughness={0.12}
            metalness={0.15}
            clearcoat={1}
          />
        </mesh>

        {/* Right Hook (/ + |) */}
        {rightStrokesGeo.map((geo, idx) => (
          <mesh key={`r-${idx}`} geometry={geo} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={mainStrokeColor}
              emissive={mainStrokeColor}
              emissiveIntensity={0.45 + absorption * 0.45}
              roughness={0.15}
              metalness={0.2}
              clearcoat={1}
            />
          </mesh>
        ))}

        {/* Subtle 3D Bar under the M representing "METALEVEL CODE" wordmark */}
        <RoundedBox args={[0.88, 0.07, 0.12]} radius={0.03} position={[0, -0.66, 0.04]}>
          <meshStandardMaterial
            color={highlightStrokeColor}
            emissive={glowColor}
            emissiveIntensity={0.7}
          />
        </RoundedBox>
      </group>
    </group>
  );
}

/**
 * 3D Marketing Agency Instruments (4K Camera, Studio Microphone, Wireless Mouse, Meta Ads Clapperboard)
 * that surround the smartphone and rush into the screen with the user during the Z-axis immersion.
 */
export function MarketingAgencyProps3D({ progress = 0 }) {
  const groupRef = useRef();
  const visibilityScale = THREE.MathUtils.smoothstep(progress, 0.03, 0.25);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = progress * Math.PI * 0.45 + Math.sin(t * 0.5) * 0.06;
  });

  if (progress <= 0.01) return null;

  const tunnelZ = THREE.MathUtils.lerp(1.8, -1.6, progress);
  const spread = THREE.MathUtils.lerp(2.4, 0.65, Math.min(1, progress * 1.15));

  return (
    <group ref={groupRef} scale={visibilityScale}>
      {/* 1. 3D 4K Cinema Camera (Top-Left) */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.6}>
        <group position={[-spread, spread * 0.65, tunnelZ]} rotation={[0.3, 0.6, -0.2]} scale={0.42}>
          <RoundedBox args={[1.1, 0.85, 1.3]} radius={0.12} smoothness={4}>
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.25} />
          </RoundedBox>
          <mesh position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.36, 0.4, 0.65, 28]} />
            <meshPhysicalMaterial color="#02CCB5" metalness={0.7} roughness={0.15} clearcoat={1} />
          </mesh>
          <mesh position={[0, 0, 1.19]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.05, 24]} />
            <meshBasicMaterial color="#02E7C1" />
          </mesh>
          <RoundedBox args={[0.3, 0.25, 0.8]} position={[0, 0.52, 0]} radius={0.05}>
            <meshStandardMaterial color="#AEF905" emissive="#AEF905" emissiveIntensity={0.5} />
          </RoundedBox>
        </group>
      </Float>

      {/* 2. 3D Studio Condenser Microphone (Bottom-Left) */}
      <Float speed={3} rotationIntensity={0.9} floatIntensity={0.7}>
        <group position={[-spread * 1.05, -spread * 0.6, tunnelZ + 0.35]} rotation={[-0.4, 0.5, 0.4]} scale={0.42}>
          <mesh>
            <cylinderGeometry args={[0.24, 0.2, 1.1, 24]} />
            <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <sphereGeometry args={[0.36, 24, 24]} />
            <meshStandardMaterial color="#02E7C1" emissive="#02CCB5" emissiveIntensity={0.45} wireframe />
          </mesh>
          <Torus args={[0.42, 0.04, 12, 28]} position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#AEF905" emissive="#AEF905" emissiveIntensity={0.6} />
          </Torus>
        </group>
      </Float>

      {/* 3. 3D Ergonomic Wireless Mouse (Top-Right) */}
      <Float speed={2.8} rotationIntensity={0.7} floatIntensity={0.65}>
        <group position={[spread * 1.05, spread * 0.58, tunnelZ + 0.2]} rotation={[0.5, -0.5, 0.3]} scale={0.45}>
          <RoundedBox args={[0.8, 0.42, 1.25]} radius={0.2} smoothness={6}>
            <meshPhysicalMaterial color="#F5F4F3" roughness={0.15} metalness={0.1} clearcoat={1} />
          </RoundedBox>
          <mesh position={[0, 0.22, -0.28]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 20]} />
            <meshStandardMaterial color="#AEF905" emissive="#AEF905" emissiveIntensity={0.9} />
          </mesh>
        </group>
      </Float>

      {/* 4. 3D Meta Ads / Viral Reels Ring & Clapper (Bottom-Right) */}
      <Float speed={2.6} rotationIntensity={0.85} floatIntensity={0.7}>
        <group position={[spread, -spread * 0.65, tunnelZ - 0.15]} rotation={[-0.3, -0.6, -0.3]} scale={0.44}>
          <Torus args={[0.68, 0.08, 16, 36]}>
            <meshStandardMaterial color="#02E7C1" emissive="#02E7C1" emissiveIntensity={0.8} />
          </Torus>
          <RoundedBox args={[0.75, 0.55, 0.14]} radius={0.06}>
            <meshStandardMaterial color="#033369" metalness={0.5} roughness={0.2} />
          </RoundedBox>
        </group>
      </Float>
    </group>
  );
}
