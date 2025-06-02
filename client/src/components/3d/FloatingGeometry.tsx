import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingGeometryProps {
  className?: string;
}

export default function FloatingGeometry({ className = '' }: FloatingGeometryProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Renderer setup
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
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create floating geometries
    const geometries: THREE.Mesh[] = [];
    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x2563eb, transparent: true, opacity: 0.8 }),
      new THREE.MeshLambertMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.8 }),
      new THREE.MeshLambertMaterial({ color: 0x1e293b, transparent: true, opacity: 0.8 }),
    ];

    // Create different shapes
    const shapes = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.ConeGeometry(0.8, 1.5, 32),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100),
    ];

    for (let i = 0; i < 8; i++) {
      const geometry = shapes[Math.floor(Math.random() * shapes.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      // Random position
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );

      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Random scale
      const scale = Math.random() * 0.5 + 0.3;
      mesh.scale.set(scale, scale, scale);

      geometries.push(mesh);
      scene.add(mesh);
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate all geometries
      geometries.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001;
        mesh.rotation.y += 0.008 + index * 0.001;
        
        // Float animation
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        
        // Mouse interaction
        mesh.position.x += (mouseX * 2 - mesh.position.x) * 0.02;
        mesh.position.y += (mouseY * 2 - mesh.position.y) * 0.02;
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of materials and geometries
      geometries.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      materials.forEach(material => material.dispose());
      shapes.forEach(shape => shape.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}