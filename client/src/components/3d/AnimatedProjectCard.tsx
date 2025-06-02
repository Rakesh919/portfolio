import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnimatedProjectCardProps {
  className?: string;
  color?: string;
  index?: number;
}

export default function AnimatedProjectCard({ className = '', color = '#2563eb', index = 0 }: AnimatedProjectCardProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color(color), 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.TetrahedronGeometry(1),
      new THREE.OctahedronGeometry(1),
      new THREE.DodecahedronGeometry(1),
    ];

    for (let i = 0; i < 5; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.6,
        wireframe: Math.random() > 0.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Random positioning
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );
      
      // Random scale
      const scale = Math.random() * 0.5 + 0.3;
      mesh.scale.setScalar(scale);
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001 + index;

      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.01 + i * 0.002;
        shape.rotation.y += 0.015 + i * 0.001;
        shape.rotation.z += 0.008 + i * 0.003;
        
        // Floating motion
        shape.position.y += Math.sin(time + i) * 0.005;
        shape.position.x += Math.cos(time * 0.5 + i) * 0.003;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      shapes.forEach(shape => {
        if (shape.geometry) shape.geometry.dispose();
        if (Array.isArray(shape.material)) {
          shape.material.forEach(mat => mat.dispose());
        } else {
          shape.material.dispose();
        }
      });
      geometries.forEach(geo => geo.dispose());
      renderer.dispose();
    };
  }, [color, index]);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}