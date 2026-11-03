import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function About3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group for all floating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // COLORFUL FLOATING 3D DECORATIVE OBJECTS
    // Purple (#8B5CF6), Pink (#EC4899), Blue (#3B82F6), Red (#EF4444)
    // ==========================================

    // 1. Accent Purple Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(0.7, 0.22, 120, 24);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x3b0764,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.75,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(-0.9, 0.4, 0.5);
    mainGroup.add(knotMesh);

    // 2. Accent Pink Octahedron / Crystal
    const octaGeo = new THREE.OctahedronGeometry(0.65, 0);
    const octaMat = new THREE.MeshPhysicalMaterial({
      color: 0xec4899,
      emissive: 0x831843,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    octaMesh.position.set(1.1, 0.8, -0.2);
    mainGroup.add(octaMesh);

    // 3. Accent Blue Glass Icosahedron with Wireframe Core
    const icoGroup = new THREE.Group();
    icoGroup.position.set(1.0, -0.9, 0.3);

    const icoGeo = new THREE.IcosahedronGeometry(0.55, 0);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoGroup.add(icoMesh);

    const icoWireGeo = new THREE.IcosahedronGeometry(0.68, 0);
    const icoWireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const icoWire = new THREE.Mesh(icoWireGeo, icoWireMat);
    icoGroup.add(icoWire);
    mainGroup.add(icoGroup);

    // 4. Accent Red Glossy Sphere
    const sphereGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xef4444,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.9,
      roughness: 0.22,
      metalness: 0.8,
      clearcoat: 0.8,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(-1.2, -0.8, -0.4);
    mainGroup.add(sphereMesh);

    // 5. Orbiting Accent Ring
    const ringGeo = new THREE.TorusGeometry(1.5, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0xc084fc,
      emissiveIntensity: 1.5,
      roughness: 0.1,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    // ==========================================
    // LIGHTS
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const lightPurple = new THREE.PointLight(0x8b5cf6, 4, 10);
    lightPurple.position.set(-3, 3, 3);
    scene.add(lightPurple);

    const lightPink = new THREE.PointLight(0xec4899, 4, 10);
    lightPink.position.set(3, 2, 2);
    scene.add(lightPink);

    const lightBlue = new THREE.PointLight(0x3b82f6, 3, 10);
    lightBlue.position.set(2, -3, 3);
    scene.add(lightBlue);

    const lightRed = new THREE.PointLight(0xef4444, 3, 10);
    lightRed.position.set(-2, -3, 2);
    scene.add(lightRed);

    // ==========================================
    // INTERACTIVITY & RENDER LOOP
    // ==========================================
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

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Group subtle tilt
      mainGroup.rotation.y = mouse.x * 0.4 + elapsed * 0.1;
      mainGroup.rotation.x = -mouse.y * 0.3;

      // Knot animation
      knotMesh.rotation.x = elapsed * 0.45;
      knotMesh.rotation.y = elapsed * 0.55;
      knotMesh.position.y = 0.4 + Math.sin(elapsed * 1.5) * 0.12;

      // Octahedron animation
      octaMesh.rotation.y = elapsed * 0.6;
      octaMesh.rotation.z = elapsed * 0.3;
      octaMesh.position.y = 0.8 + Math.cos(elapsed * 1.8) * 0.1;

      // Icosahedron animation
      icoGroup.rotation.x = elapsed * 0.5;
      icoGroup.rotation.y = -elapsed * 0.4;
      icoGroup.position.y = -0.9 + Math.sin(elapsed * 2 + 1) * 0.1;

      // Red Sphere animation
      sphereMesh.position.y = -0.8 + Math.cos(elapsed * 1.4 + 2) * 0.12;
      sphereMesh.rotation.y = elapsed * 0.3;

      // Ring animation
      ringMesh.rotation.z = elapsed * 0.25;
      ringMesh.rotation.y = Math.sin(elapsed * 0.5) * 0.2;

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

      // Dispose
      knotGeo.dispose();
      knotMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      icoWireGeo.dispose();
      icoWireMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="about-3d-canvas-wrapper" 
      aria-label="Floating 3D Decorative Artifacts"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '380px',
        position: 'relative',
      }}
    />
  );
}

