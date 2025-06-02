import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ExperienceTimeline3DProps {
  className?: string;
}

export default function ExperienceTimeline3D({ className = '' }: ExperienceTimeline3DProps) {
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
    camera.position.set(0, 0, 10);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create timeline elements
    const timelineGroup = new THREE.Group();
    
    // Main timeline line
    const lineGeometry = new THREE.CylinderGeometry(0.05, 0.05, 12, 8);
    const lineMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2563eb,
      transparent: true,
      opacity: 0.8 
    });
    const timelineLine = new THREE.Mesh(lineGeometry, lineMaterial);
    timelineLine.rotation.z = Math.PI / 2;
    timelineGroup.add(timelineLine);

    // Experience nodes
    const nodePositions = [-4, -1, 2, 5];
    const nodes: THREE.Mesh[] = [];

    nodePositions.forEach((x, index) => {
      // Create node sphere
      const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: index === 0 ? 0x10b981 : 0x0ea5e9, // Green for current, blue for others
        emissive: index === 0 ? 0x064e3b : 0x0c4a6e,
        emissiveIntensity: 0.2,
      });
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, 0, 0);
      
      // Add pulsing ring around current position
      if (index === 0) {
        const ringGeometry = new THREE.RingGeometry(0.4, 0.6, 16);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(node.position);
        ring.userData.isPulsing = true;
        timelineGroup.add(ring);
      }
      
      nodes.push(node);
      timelineGroup.add(node);
    });

    // Add floating particles around timeline
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    scene.add(timelineGroup);

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

      const time = Date.now() * 0.001;

      // Rotate timeline group slightly based on mouse
      timelineGroup.rotation.y = mouseX * 0.2;
      timelineGroup.rotation.x = mouseY * 0.1;

      // Animate nodes
      nodes.forEach((node, index) => {
        node.rotation.y += 0.02;
        node.position.y = Math.sin(time + index) * 0.1;
      });

      // Animate pulsing rings
      timelineGroup.children.forEach(child => {
        if (child.userData.isPulsing && child instanceof THREE.Mesh) {
          const scale = 1 + Math.sin(time * 3) * 0.2;
          child.scale.setScalar(scale);
          (child.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(time * 3) * 0.2;
        }
      });

      // Animate particles
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

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
      
      // Dispose of all geometries and materials
      timelineGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}