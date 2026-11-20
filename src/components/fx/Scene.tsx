import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 5000;

/** Three target shapes the particle cloud morphs between as you scroll. */
function buildShapes() {
  const sphere = new Float32Array(COUNT * 3);
  const torus = new Float32Array(COUNT * 3);
  const wave = new Float32Array(COUNT * 3);
  const helix = new Float32Array(COUNT * 3);
  const side = Math.ceil(Math.sqrt(COUNT));
  for (let i = 0; i < COUNT; i++) {
    const k = i * 3;
    // fibonacci sphere
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * Math.PI * (3 - Math.sqrt(5));
    sphere[k] = Math.cos(th) * r * 2.2; sphere[k + 1] = y * 2.2; sphere[k + 2] = Math.sin(th) * r * 2.2;
    // torus knot-ish ring
    const u = (i / COUNT) * Math.PI * 2 * 3;
    const v = (i * 0.618) % (Math.PI * 2);
    const R = 2 + 0.6 * Math.cos(v);
    torus[k] = R * Math.cos(u / 3); torus[k + 1] = 0.6 * Math.sin(v) + Math.sin(u) * 0.3; torus[k + 2] = R * Math.sin(u / 3);
    // wave plane
    const gx = (i % side) / side - 0.5, gz = Math.floor(i / side) / side - 0.5;
    wave[k] = gx * 9; wave[k + 1] = 0; wave[k + 2] = gz * 9;
    // double helix
    const t = (i / COUNT) * Math.PI * 10;
    const s = i % 2 ? 1 : -1;
    helix[k] = Math.cos(t) * 1.4 * s; helix[k + 1] = (i / COUNT - 0.5) * 7; helix[k + 2] = Math.sin(t) * 1.4 * s;
  }
  return [sphere, torus, wave, helix, sphere];
}

const ease = (x: number) => x * x * (3 - 2 * x);

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const shapes = useMemo(buildShapes, []);
  const positions = useMemo(() => new Float32Array(shapes[0]), [shapes]);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef(0);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useFrame(({ clock, camera }) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const target = max > 0 ? window.scrollY / max : 0;
    smooth.current += (target - smooth.current) * 0.06;
    const p = smooth.current * (shapes.length - 1);
    const seg = Math.min(Math.floor(p), shapes.length - 2);
    const f = ease(Math.min(Math.max(p - seg, 0), 1));
    const a = shapes[seg], b = shapes[seg + 1];
    const time = clock.elapsedTime;
    for (let i = 0; i < COUNT * 3; i += 3) {
      const wob = Math.sin(time * 0.8 + i * 0.002) * 0.04;
      positions[i] = a[i] + (b[i] - a[i]) * f;
      positions[i + 1] = a[i + 1] + (b[i + 1] - a[i + 1]) * f + wob
        + (seg === 1 || seg === 2 ? Math.sin(positions[i] * 0.9 + time) * 0.35 * (seg === 1 ? f : 1 - f) : 0);
      positions[i + 2] = a[i + 2] + (b[i + 2] - a[i + 2]) * f;
    }
    const pts = ref.current!;
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y = time * 0.06 + smooth.current * Math.PI * 2;
    pts.rotation.x = 0.35 + Math.sin(smooth.current * Math.PI) * 0.4;
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.current.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#c8ff4d" transparent opacity={0.75} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function Scene() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}>
        <Particles />
      </Canvas>
    </div>
  );
}
