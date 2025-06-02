import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface InteractiveSkillSphereProps {
  skills: Skill[];
  className?: string;
}

export default function InteractiveSkillSphere({ skills, className = '' }: InteractiveSkillSphereProps) {
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
    camera.position.z = 15;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create skill spheres
    const skillSpheres: THREE.Mesh[] = [];
    const sphereGroup = new THREE.Group();

    skills.forEach((skill, index) => {
      const radius = 0.5 + (skill.level / 100) * 0.8;
      const geometry = new THREE.SphereGeometry(radius, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(skill.color),
        transparent: true,
        opacity: 0.7,
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: 0.2,
      });

      const sphere = new THREE.Mesh(geometry, material);
      
      // Position spheres in a 3D pattern
      const angle = (index / skills.length) * Math.PI * 2;
      const radius3d = 8;
      const height = (Math.random() - 0.5) * 6;
      
      sphere.position.set(
        Math.cos(angle) * radius3d,
        height,
        Math.sin(angle) * radius3d
      );

      sphere.userData = { skill, originalPosition: sphere.position.clone() };
      skillSpheres.push(sphere);
      sphereGroup.add(sphere);
    });

    scene.add(sphereGroup);

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const positions = [];
    
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        if (Math.random() > 0.7) { // Only show some connections
          const sphere1 = skillSpheres[i];
          const sphere2 = skillSpheres[j];
          
          positions.push(
            sphere1.position.x, sphere1.position.y, sphere1.position.z,
            sphere2.position.x, sphere2.position.y, sphere2.position.z
          );
        }
      }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x3b82f6, 
      transparent: true, 
      opacity: 0.3 
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

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

      // Rotate the entire group
      sphereGroup.rotation.y += 0.005;
      sphereGroup.rotation.x += 0.002;

      // Individual sphere animations
      skillSpheres.forEach((sphere, index) => {
        const originalPos = sphere.userData.originalPosition;
        
        // Floating motion
        sphere.position.y = originalPos.y + Math.sin(time + index) * 0.5;
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.015;

        // Mouse interaction
        const targetX = originalPos.x + mouseX * 2;
        const targetZ = originalPos.z + mouseY * 2;
        
        sphere.position.x += (targetX - sphere.position.x) * 0.05;
        sphere.position.z += (targetZ - sphere.position.z) * 0.05;
      });

      // Animate lines
      lines.rotation.y += 0.001;
      lines.material.opacity = 0.2 + Math.sin(time) * 0.1;

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
      
      skillSpheres.forEach(sphere => {
        if (sphere.geometry) sphere.geometry.dispose();
        if (Array.isArray(sphere.material)) {
          sphere.material.forEach(mat => mat.dispose());
        } else {
          sphere.material.dispose();
        }
      });
      
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [skills]);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}