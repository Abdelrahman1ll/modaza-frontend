import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  PointsMaterial,
  Points,
  BufferAttribute,
} from "three";

export default function BackgroundEffect() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
      });
    } catch (e) {
      console.warn("WebGL not supported or disabled:", e);
      return;
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new BufferGeometry();
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute("position", new BufferAttribute(positions, 3));

    const material = new PointsMaterial({
      color: 0x2d6136,
      size: 0.01,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new Points(geometry, material);
    scene.add(particles);

    camera.position.z = 3;

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += mouse.y * 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10"></div>;
}
