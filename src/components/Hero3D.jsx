import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Master Character Group
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // ==========================================
    // 3D CYBER CHARACTER / CREATIVE 3D OBJECT
    // ==========================================

    // 1. Head / Helmet Core (Dark Obsidian Chrome)
    const headGeo = new THREE.SphereGeometry(1.4, 64, 64);
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0d14,
      metalness: 0.88,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    characterGroup.add(headMesh);

    // 2. Futuristic Curved Visor
    const visorGeo = new THREE.SphereGeometry(1.42, 48, 48, 0, Math.PI * 2, Math.PI * 0.32, Math.PI * 0.38);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x050608,
      metalness: 0.95,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    characterGroup.add(visorMesh);

    // 3. Glowing Cyber Visor HUD / Eyes (Expressive Digital Face)
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(0, 0.1, 1.38);

    const leftEyeGeo = new THREE.CapsuleGeometry(0.09, 0.35, 16, 16);
    leftEyeGeo.rotateZ(Math.PI / 2);
    const rightEyeGeo = leftEyeGeo.clone();

    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    const leftEye = new THREE.Mesh(leftEyeGeo, eyeMat);
    leftEye.position.set(-0.45, 0, 0);
    const rightEye = new THREE.Mesh(rightEyeGeo, eyeMat);
    rightEye.position.set(0.45, 0, 0);

    // Visor Accent Line (Cyan Neon Slit)
    const visorStripGeo = new THREE.BoxGeometry(1.6, 0.04, 0.06);
    const visorStripMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 4.0,
      roughness: 0.2,
    });
    const visorStrip = new THREE.Mesh(visorStripGeo, visorStripMat);
    visorStrip.position.set(0, -0.28, 0);

    eyeGroup.add(leftEye, rightEye, visorStrip);
    characterGroup.add(eyeGroup);

    // 4. Cyber Audio Ear Modules (Left & Right)
    const earGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.28, 32);
    earGeo.rotateZ(Math.PI / 2);
    const earMat = new THREE.MeshStandardMaterial({
      color: 0x181a24,
      metalness: 0.85,
      roughness: 0.25,
    });

    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.position.set(-1.42, 0, 0);
    const rightEar = leftEar.clone();
    rightEar.position.set(1.42, 0, 0);

    // Glowing Neon Rings on Ears
    const ringGeo = new THREE.TorusGeometry(0.36, 0.04, 16, 48);
    ringGeo.rotateY(Math.PI / 2);

    const purpleRingMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 3.5,
    });
    const pinkRingMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 3.5,
    });

    const leftEarRing = new THREE.Mesh(ringGeo, purpleRingMat);
    leftEarRing.position.set(-1.54, 0, 0);
    const rightEarRing = new THREE.Mesh(ringGeo, pinkRingMat);
    rightEarRing.position.set(1.54, 0, 0);

    characterGroup.add(leftEar, rightEar, leftEarRing, rightEarRing);

    // 5. Crown / Antenna Top Sensor
    const sensorGeo = new THREE.ConeGeometry(0.12, 0.4, 24);
    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x222634,
      metalness: 0.9,
      roughness: 0.2,
    });
    const sensor = new THREE.Mesh(sensorGeo, sensorMat);
    sensor.position.set(0, 1.55, 0);

    const sensorLightGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const sensorLightMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 4.0,
    });
    const sensorLight = new THREE.Mesh(sensorLightGeo, sensorLightMat);
    sensorLight.position.set(0, 1.78, 0);

    characterGroup.add(sensor, sensorLight);

    // 6. Orbiting Kinetic Gyroscope Halo Rings
    const orbitRingGroup1 = new THREE.Group();
    const haloGeo1 = new THREE.TorusGeometry(2.1, 0.035, 16, 100);
    const haloMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 1.2,
      metalness: 0.8,
      roughness: 0.1,
      clearcoat: 1.0,
    });
    const halo1 = new THREE.Mesh(haloGeo1, haloMat1);
    orbitRingGroup1.add(halo1);
    orbitRingGroup1.rotation.x = Math.PI * 0.35;
    orbitRingGroup1.rotation.y = Math.PI * 0.15;
    scene.add(orbitRingGroup1);

    const orbitRingGroup2 = new THREE.Group();
    const haloGeo2 = new THREE.TorusGeometry(2.35, 0.025, 16, 100);
    const haloMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 1.0,
      metalness: 0.7,
      roughness: 0.15,
    });
    const halo2 = new THREE.Mesh(haloGeo2, haloMat2);
    orbitRingGroup2.add(halo2);
    orbitRingGroup2.rotation.x = -Math.PI * 0.25;
    orbitRingGroup2.rotation.z = Math.PI * 0.3;
    scene.add(orbitRingGroup2);

    // 7. Companion Floating Satellite Orbs
    const orb1Geo = new THREE.SphereGeometry(0.2, 32, 32);
    const orb1Mat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 2.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    const orb1 = new THREE.Mesh(orb1Geo, orb1Mat);
    scene.add(orb1);

    const orb2Geo = new THREE.IcosahedronGeometry(0.22, 1);
    const orb2Mat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 2.0,
      roughness: 0.15,
      metalness: 0.8,
      wireframe: false,
    });
    const orb2 = new THREE.Mesh(orb2Geo, orb2Mat);
    scene.add(orb2);

    // 8. 3D Floating Particle Sparkles / Stardust
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0xec4899),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // CINEMATIC LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x18102b, 1.8);
    scene.add(ambientLight);

    // Front-Right White/Cyan Key Light
    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Rear-Left Pink Rim Light (Silhouetting)
    const rimLightPink = new THREE.DirectionalLight(0xec4899, 5.0);
    rimLightPink.position.set(-6, 2, -4);
    scene.add(rimLightPink);

    // Bottom-Right Purple Rim Light
    const rimLightPurple = new THREE.DirectionalLight(0x8b5cf6, 4.0);
    rimLightPurple.position.set(5, -4, -3);
    scene.add(rimLightPurple);

    // Dynamic Cursor Tracking Point Light
    const cursorLight = new THREE.PointLight(0x38bdf8, 2.5, 8);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // ==========================================
    // INTERACTION & ANIMATION
    // ==========================================
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let dragRotationX = 0;
    let dragRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      dragRotationY += deltaX * 0.008;
      dragRotationX += deltaY * 0.008;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Mouse Follow Interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Damp drag rotation back slowly
      if (!isDragging) {
        dragRotationX *= 0.95;
        dragRotationY *= 0.95;
      }

      // Character Head Look-At & Hover
      characterGroup.rotation.y = mouse.x * 0.55 + dragRotationY;
      characterGroup.rotation.x = -mouse.y * 0.45 + dragRotationX;
      characterGroup.rotation.z = mouse.x * 0.08;

      // Sinusoidal floating hover motion
      const hoverY = Math.sin(elapsed * 1.6) * 0.16;
      characterGroup.position.y = hoverY;

      // Eye blink / pulse effect
      const blinkCycle = Math.sin(elapsed * 0.8);
      if (blinkCycle > 0.96) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
      } else {
        leftEye.scale.y = 1.0;
        rightEye.scale.y = 1.0;
      }

      // Orbiting Gyroscope Rings
      orbitRingGroup1.rotation.z = elapsed * 0.35;
      orbitRingGroup1.rotation.y = elapsed * 0.2 + mouse.x * 0.2;
      orbitRingGroup1.position.y = hoverY * 0.6;

      orbitRingGroup2.rotation.z = -elapsed * 0.28;
      orbitRingGroup2.rotation.x = elapsed * 0.18 + mouse.y * 0.2;
      orbitRingGroup2.position.y = hoverY * 0.6;

      // Orbiting Companion Orbs
      const orb1Angle = elapsed * 0.9;
      orb1.position.set(
        Math.cos(orb1Angle) * 2.8,
        Math.sin(elapsed * 1.5) * 0.6 + hoverY,
        Math.sin(orb1Angle) * 2.2
      );
      orb1.rotation.y = elapsed * 2;

      const orb2Angle = -elapsed * 0.7 + Math.PI;
      orb2.position.set(
        Math.cos(orb2Angle) * 3.1,
        Math.sin(elapsed * 1.2 + 1) * 0.7 + hoverY,
        Math.sin(orb2Angle) * 2.5
      );
      orb2.rotation.x = elapsed * 1.5;
      orb2.rotation.y = elapsed * 1.8;

      // Dynamic cursor point light
      cursorLight.position.x = mouse.x * 4;
      cursorLight.position.y = mouse.y * 3;

      // Slow particle rotation
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      headGeo.dispose();
      headMat.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      leftEyeGeo.dispose();
      rightEyeGeo.dispose();
      eyeMat.dispose();
      visorStripGeo.dispose();
      visorStripMat.dispose();
      earGeo.dispose();
      earMat.dispose();
      ringGeo.dispose();
      purpleRingMat.dispose();
      pinkRingMat.dispose();
      sensorGeo.dispose();
      sensorMat.dispose();
      sensorLightGeo.dispose();
      sensorLightMat.dispose();
      haloGeo1.dispose();
      haloMat1.dispose();
      haloGeo2.dispose();
      haloMat2.dispose();
      orb1Geo.dispose();
      orb1Mat.dispose();
      orb2Geo.dispose();
      orb2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="hero-3d-canvas-wrapper" 
      aria-label="Interactive 3D Character"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'grab',
      }}
    />
  );
}

