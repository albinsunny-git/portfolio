import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Contact3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 350;
    const height = container.clientHeight || 350;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Colorful 3D elements for Contact Section
    // 1. Center Floating Torus with Purple to Pink Sheen
    const torusGeo = new THREE.TorusGeometry(1.2, 0.35, 32, 64);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x2e1065,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    group.add(torus);

    // 2. Bright Pink Sphere
    const pinkGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const pinkMat = new THREE.MeshPhysicalMaterial({
      color: 0xec4899,
      emissive: 0x500724,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
    });
    const pinkSphere = new THREE.Mesh(pinkGeo, pinkMat);
    pinkSphere.position.set(1.4, -0.6, 0.6);
    group.add(pinkSphere);

    // 3. Electric Blue Sphere
    const blueGeo = new THREE.SphereGeometry(0.45, 32, 32);
    const blueMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x172554,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
    });
    const blueSphere = new THREE.Mesh(blueGeo, blueMat);
    blueSphere.position.set(-1.3, 0.7, 0.4);
    group.add(blueSphere);

    // 4. Accent Red Floating Mini Orb
    const redGeo = new THREE.SphereGeometry(0.3, 32, 32);
    const redMat = new THREE.MeshPhysicalMaterial({
      color: 0xef4444,
      emissive: 0x450a0a,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
    });
    const redSphere = new THREE.Mesh(redGeo, redMat);
    redSphere.position.set(0.6, 1.2, -0.5);
    group.add(redSphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(3, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 3.0);
    dirLight2.position.set(-4, -2, 2);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xec4899, 3.0);
    dirLight3.position.set(2, -4, -2);
    scene.add(dirLight3);

    // Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.targetX = (x / rect.width) * 2 - 1;
      mouse.targetY = -(y / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      group.rotation.x = elapsed * 0.25 + mouse.y * 0.3;
      group.rotation.y = elapsed * 0.35 + mouse.x * 0.4;

      torus.rotation.z = elapsed * 0.4;
      pinkSphere.position.y = -0.6 + Math.sin(elapsed * 1.8) * 0.15;
      blueSphere.position.y = 0.7 + Math.cos(elapsed * 1.6) * 0.15;
      redSphere.position.y = 1.2 + Math.sin(elapsed * 2.1) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      torusGeo.dispose();
      torusMat.dispose();
      pinkGeo.dispose();
      pinkMat.dispose();
      blueGeo.dispose();
      blueMat.dispose();
      redGeo.dispose();
      redMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="contact-3d-canvas-wrapper" 
      aria-label="3D Floating Shapes"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '320px',
        position: 'relative',
      }}
    />
  );
}

