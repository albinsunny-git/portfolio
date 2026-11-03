import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D({ shadingMode = 'rendered' }) {
  const containerRef = useRef(null);
  const materialsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 7.2);

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

    // Master Character & Studio Group
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    materialsRef.current = [];

    // ==========================================
    // STYLIZED 3D CARTOON AVATAR (ALBIN SUNNY)
    // Pixar / Blender 3D Character Aesthetic
    // ==========================================

    // 1. Head & Face (Warm Subsurface Skin Tone)
    const headGeo = new THREE.SphereGeometry(1.25, 64, 64);
    headGeo.scale(1.0, 1.15, 1.05);

    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0xdfa07a, // Warm South Asian complexion
      roughness: 0.38,
      metalness: 0.04,
      clearcoat: 0.2,
      clearcoatRoughness: 0.25,
      reflectivity: 0.4,
    });
    materialsRef.current.push({ mat: skinMat, originalColor: 0xdfa07a, isSkin: true });

    const headMesh = new THREE.Mesh(headGeo, skinMat);
    characterGroup.add(headMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.7, 32);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.set(0, -1.2, -0.05);
    characterGroup.add(neckMesh);

    // Cheeks (Soft Cartoon Rosiness)
    const cheekGeo = new THREE.SphereGeometry(0.28, 24, 24);
    cheekGeo.scale(1.1, 0.7, 0.4);
    const blushMat = new THREE.MeshBasicMaterial({
      color: 0xe07b67,
      transparent: true,
      opacity: 0.22,
    });
    const leftCheek = new THREE.Mesh(cheekGeo, blushMat);
    leftCheek.position.set(-0.68, -0.15, 1.02);
    const rightCheek = leftCheek.clone();
    rightCheek.position.set(0.68, -0.15, 1.02);
    characterGroup.add(leftCheek, rightCheek);

    // 2. Volumetric Stylized Dark Hair (Pompadour & Side Waves)
    const hairGroup = new THREE.Group();
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x141217,
      roughness: 0.55,
      metalness: 0.25,
    });
    materialsRef.current.push({ mat: hairMat, originalColor: 0x141217, isHair: true });

    // Main Hair Cap
    const hairCapGeo = new THREE.SphereGeometry(1.3, 48, 48);
    hairCapGeo.scale(1.04, 1.08, 1.08);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
    hairCap.position.set(0, 0.22, -0.08);
    hairGroup.add(hairCap);

    // Front Volumetric Quiff Waves
    const quiff1Geo = new THREE.SphereGeometry(0.55, 32, 32);
    quiff1Geo.scale(1.2, 0.8, 1.1);
    const quiff1 = new THREE.Mesh(quiff1Geo, hairMat);
    quiff1.position.set(0, 1.25, 0.5);
    quiff1.rotation.x = 0.2;

    const quiff2Geo = new THREE.SphereGeometry(0.48, 32, 32);
    quiff2Geo.scale(1.0, 0.7, 0.9);
    const quiff2 = new THREE.Mesh(quiff2Geo, hairMat);
    quiff2.position.set(-0.45, 1.15, 0.45);
    quiff2.rotation.z = 0.25;

    const quiff3Geo = new THREE.SphereGeometry(0.48, 32, 32);
    quiff3Geo.scale(1.0, 0.7, 0.9);
    const quiff3 = new THREE.Mesh(quiff3Geo, hairMat);
    quiff3.position.set(0.45, 1.15, 0.45);
    quiff3.rotation.z = -0.25;

    hairGroup.add(quiff1, quiff2, quiff3);
    characterGroup.add(hairGroup);

    // 3. Expressive Pixar-Style Eyes & Eyelids
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(0, 0.12, 1.15);

    const scleraGeo = new THREE.SphereGeometry(0.24, 32, 32);
    const scleraMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.0,
    });
    materialsRef.current.push({ mat: scleraMat, originalColor: 0xffffff });

    const irisGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.06, 32);
    irisGeo.rotateX(Math.PI / 2);
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x3d2112, // Rich dark brown iris
      roughness: 0.2,
    });
    materialsRef.current.push({ mat: irisMat, originalColor: 0x3d2112 });

    const pupilGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 32);
    pupilGeo.rotateX(Math.PI / 2);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x050505 });

    // Catchlight (Sparkle in eye)
    const catchlightGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Build Left & Right Eye Units
    const createEye = (xPos) => {
      const eyeUnit = new THREE.Group();
      eyeUnit.position.set(xPos, 0, 0);

      const sclera = new THREE.Mesh(scleraGeo, scleraMat);
      const iris = new THREE.Mesh(irisGeo, irisMat);
      iris.position.set(0, 0, 0.21);

      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.position.set(0, 0, 0.22);

      const sparkle = new THREE.Mesh(catchlightGeo, catchlightMat);
      sparkle.position.set(0.045, 0.045, 0.25);

      eyeUnit.add(sclera, iris, pupil, sparkle);
      return eyeUnit;
    };

    const leftEye = createEye(-0.42);
    const rightEye = createEye(0.42);
    eyeGroup.add(leftEye, rightEye);

    // Eyelids (for natural blinking animation)
    const eyelidGeo = new THREE.SphereGeometry(0.26, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const leftEyelid = new THREE.Mesh(eyelidGeo, skinMat);
    leftEyelid.position.set(-0.42, 0, 0);
    leftEyelid.rotation.x = -Math.PI * 0.5; // Open by default

    const rightEyelid = new THREE.Mesh(eyelidGeo, skinMat);
    rightEyelid.position.set(0.42, 0, 0);
    rightEyelid.rotation.x = -Math.PI * 0.5;

    eyeGroup.add(leftEyelid, rightEyelid);
    characterGroup.add(eyeGroup);

    // 4. Stylized Eyebrows
    const browGeo = new THREE.BoxGeometry(0.38, 0.07, 0.09);
    const browMat = new THREE.MeshStandardMaterial({ color: 0x141217, roughness: 0.8 });
    materialsRef.current.push({ mat: browMat, originalColor: 0x141217 });

    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set(-0.45, 0.44, 1.18);
    leftBrow.rotation.z = 0.12;
    leftBrow.rotation.x = 0.15;

    const rightBrow = new THREE.Mesh(browGeo, browMat);
    rightBrow.position.set(0.45, 0.44, 1.18);
    rightBrow.rotation.z = -0.12;
    rightBrow.rotation.x = 0.15;

    characterGroup.add(leftBrow, rightBrow);

    // 5. Stylized Sculpted Mustache & Beard (Matching Photo Likeness!)
    const mustacheGroup = new THREE.Group();
    const mustacheGeo = new THREE.CylinderGeometry(0.08, 0.05, 0.42, 24);
    mustacheGeo.rotateZ(Math.PI / 2);
    const facialHairMat = new THREE.MeshStandardMaterial({
      color: 0x18161b,
      roughness: 0.7,
    });
    materialsRef.current.push({ mat: facialHairMat, originalColor: 0x18161b });

    const leftStache = new THREE.Mesh(mustacheGeo, facialHairMat);
    leftStache.position.set(-0.21, -0.38, 1.25);
    leftStache.rotation.z = -0.15;

    const rightStache = new THREE.Mesh(mustacheGeo, facialHairMat);
    rightStache.position.set(0.21, -0.38, 1.25);
    rightStache.rotation.z = 0.15;

    // Beard / Chin Stubble Contour
    const chinBeardGeo = new THREE.SphereGeometry(0.24, 24, 16);
    chinBeardGeo.scale(1.2, 0.6, 0.5);
    const chinBeard = new THREE.Mesh(chinBeardGeo, facialHairMat);
    chinBeard.position.set(0, -0.85, 1.05);

    mustacheGroup.add(leftStache, rightStache, chinBeard);
    characterGroup.add(mustacheGroup);

    // 6. Modern Dark Navy Suit Jacket & White Dress Shirt
    const suitGroup = new THREE.Group();
    suitGroup.position.set(0, -1.9, 0);

    // Navy Blazer Jacket Torso
    const jacketGeo = new THREE.CylinderGeometry(1.25, 1.45, 1.2, 32);
    jacketGeo.scale(1.2, 1.0, 0.85);
    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Deep navy blue matching suit in photo
      roughness: 0.65,
      metalness: 0.1,
    });
    materialsRef.current.push({ mat: jacketMat, originalColor: 0x0f172a });
    const jacketMesh = new THREE.Mesh(jacketGeo, jacketMat);
    suitGroup.add(jacketMesh);

    // White Shirt V-Neck Collar
    const shirtGeo = new THREE.ConeGeometry(0.45, 0.75, 4);
    shirtGeo.rotateY(Math.PI / 4);
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Crisp white shirt
      roughness: 0.35,
    });
    materialsRef.current.push({ mat: shirtMat, originalColor: 0xf8fafc });
    const shirtMesh = new THREE.Mesh(shirtGeo, shirtMat);
    shirtMesh.position.set(0, 0.32, 0.68);
    shirtMesh.scale.set(1.1, 1.0, 0.25);
    suitGroup.add(shirtMesh);

    // Blazer Lapels (Left and Right)
    const lapelGeo = new THREE.BoxGeometry(0.28, 0.85, 0.08);
    const leftLapel = new THREE.Mesh(lapelGeo, jacketMat);
    leftLapel.position.set(-0.45, 0.22, 0.82);
    leftLapel.rotation.z = -0.35;

    const rightLapel = new THREE.Mesh(lapelGeo, jacketMat);
    rightLapel.position.set(0.45, 0.22, 0.82);
    rightLapel.rotation.z = 0.35;

    suitGroup.add(leftLapel, rightLapel);
    characterGroup.add(suitGroup);

    // ==========================================
    // BLENDER STUDIO LIGHTING GIZMO & TECH PROPS
    // ==========================================

    // Orbiting 3D Blender Transform Gizmo Rings (RGB Axes)
    const gizmoGroup = new THREE.Group();

    const ringRedGeo = new THREE.TorusGeometry(2.35, 0.02, 16, 90);
    const ringRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.45 });
    const ringRed = new THREE.Mesh(ringRedGeo, ringRedMat);
    ringRed.rotation.x = Math.PI / 2;

    const ringGreenGeo = new THREE.TorusGeometry(2.45, 0.02, 16, 90);
    const ringGreenMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.45 });
    const ringGreen = new THREE.Mesh(ringGreenGeo, ringGreenMat);

    const ringBlueGeo = new THREE.TorusGeometry(2.55, 0.02, 16, 90);
    const ringBlueMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.45 });
    const ringBlue = new THREE.Mesh(ringBlueGeo, ringBlueMat);
    ringBlue.rotation.y = Math.PI / 2;

    gizmoGroup.add(ringRed, ringGreen, ringBlue);
    scene.add(gizmoGroup);

    // Orbiting Floating Tech Props
    // 1. React Atom Nucleus & Orbit Rings
    const reactAtomGroup = new THREE.Group();
    const reactCoreGeo = new THREE.SphereGeometry(0.14, 24, 24);
    const reactCoreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.5,
    });
    const reactCore = new THREE.Mesh(reactCoreGeo, reactCoreMat);
    reactAtomGroup.add(reactCore);

    const atomRingGeo = new THREE.TorusGeometry(0.38, 0.02, 16, 48);
    const atomRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    for (let r = 0; r < 3; r++) {
      const atomRing = new THREE.Mesh(atomRingGeo, atomRingMat);
      atomRing.rotation.x = (Math.PI / 3) * r;
      atomRing.rotation.y = (Math.PI / 4) * r;
      reactAtomGroup.add(atomRing);
    }
    scene.add(reactAtomGroup);

    // 2. Glowing Code Diamond / Octahedron
    const diamondGeo = new THREE.OctahedronGeometry(0.24, 0);
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xec4899,
      emissive: 0x831843,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
    });
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    scene.add(diamond);

    // 3. Stardust Particle Cloud
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 10;
      particlePos[i + 1] = (Math.random() - 0.5) * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xc084fc,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // BLENDER CYCLES 3-POINT STUDIO LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x231a38, 2.2);
    scene.add(ambientLight);

    // Warm Key Light (Upper Front Right)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Cyan Fill Light (Front Left)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // Neon Pink Rim Light (Back Left - Silhouetting hair & shoulders)
    const rimLightPink = new THREE.DirectionalLight(0xec4899, 5.0);
    rimLightPink.position.set(-5, 3, -4);
    scene.add(rimLightPink);

    // Electric Purple Rim Light (Back Right)
    const rimLightPurple = new THREE.DirectionalLight(0x8b5cf6, 4.2);
    rimLightPurple.position.set(5, -2, -3);
    scene.add(rimLightPurple);

    // Cursor Follow Point Light
    const cursorLight = new THREE.PointLight(0x38bdf8, 2.0, 8);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // ==========================================
    // MOUSE INTERACTION & ANIMATION LOOP
    // ==========================================
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let dragRotX = 0;
    let dragRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.targetX = (x / rect.width) * 2 - 1;
      mouse.targetY = -(y / rect.height) * 2 + 1;
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      dragRotY += deltaX * 0.008;
      dragRotX += deltaY * 0.008;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

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

      // Damped smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      if (!isDragging) {
        dragRotX *= 0.94;
        dragRotY *= 0.94;
      }

      // 3D Avatar Head & Body Turn to Face Mouse
      characterGroup.rotation.y = mouse.x * 0.45 + dragRotY;
      characterGroup.rotation.x = -mouse.y * 0.35 + dragRotX;
      characterGroup.rotation.z = mouse.x * 0.06;

      // Sinusoidal floating / breathing
      const hoverY = Math.sin(elapsed * 1.5) * 0.12;
      characterGroup.position.y = hoverY;

      // Natural Eye Tracking (Eyes move slightly ahead of head)
      leftEye.position.x = -0.42 + mouse.x * 0.04;
      leftEye.position.y = mouse.y * 0.03;
      rightEye.position.x = 0.42 + mouse.x * 0.04;
      rightEye.position.y = mouse.y * 0.03;

      // Natural Periodic Blinking Animation (quick 150ms blink every ~3.5s)
      const blinkCycle = Math.sin(elapsed * 0.9);
      if (blinkCycle > 0.96) {
        leftEyelid.rotation.x = 0; // closed
        rightEyelid.rotation.x = 0;
      } else {
        leftEyelid.rotation.x = -Math.PI * 0.5; // open
        rightEyelid.rotation.x = -Math.PI * 0.5;
      }

      // Gizmo Slow Rotation
      gizmoGroup.rotation.y = elapsed * 0.15;
      gizmoGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.1;

      // Orbiting React Atom Prop
      const atomAngle = elapsed * 0.75;
      reactAtomGroup.position.set(
        Math.cos(atomAngle) * 2.8,
        Math.sin(elapsed * 1.6) * 0.5 + hoverY + 0.3,
        Math.sin(atomAngle) * 2.2
      );
      reactAtomGroup.rotation.y = elapsed * 2;
      reactAtomGroup.rotation.x = elapsed * 1.2;

      // Orbiting Code Diamond Prop
      const diamondAngle = -elapsed * 0.65 + Math.PI;
      diamond.position.set(
        Math.cos(diamondAngle) * 3.0,
        Math.sin(elapsed * 1.3 + 1) * 0.6 + hoverY - 0.2,
        Math.sin(diamondAngle) * 2.4
      );
      diamond.rotation.x = elapsed * 1.5;
      diamond.rotation.y = elapsed * 1.8;

      // Particles gentle drift
      particles.rotation.y = elapsed * 0.03;

      // Dynamic cursor light
      cursorLight.position.x = mouse.x * 4;
      cursorLight.position.y = mouse.y * 3;

      renderer.render(scene, camera);
    };

    animate();

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

      // Dispose
      headGeo.dispose();
      neckGeo.dispose();
      cheekGeo.dispose();
      hairCapGeo.dispose();
      quiff1Geo.dispose();
      quiff2Geo.dispose();
      quiff3Geo.dispose();
      scleraGeo.dispose();
      irisGeo.dispose();
      pupilGeo.dispose();
      catchlightGeo.dispose();
      eyelidGeo.dispose();
      browGeo.dispose();
      mustacheGeo.dispose();
      chinBeardGeo.dispose();
      jacketGeo.dispose();
      shirtGeo.dispose();
      lapelGeo.dispose();
      ringRedGeo.dispose();
      ringGreenGeo.dispose();
      ringBlueGeo.dispose();
      reactCoreGeo.dispose();
      atomRingGeo.dispose();
      diamondGeo.dispose();
      particleGeo.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Materials when Shading Mode changes (Rendered / Clay / Wireframe)
  useEffect(() => {
    materialsRef.current.forEach(({ mat, originalColor }) => {
      if (shadingMode === 'clay') {
        mat.wireframe = false;
        mat.color.setHex(0xc8b6a6); // Sculptor clay matte
        mat.roughness = 0.85;
        mat.metalness = 0.0;
      } else if (shadingMode === 'wireframe') {
        mat.wireframe = true;
        mat.color.setHex(0x38bdf8); // Holographic wireframe cyan
      } else {
        mat.wireframe = false;
        mat.color.setHex(originalColor);
        mat.roughness = 0.38;
      }
    });
  }, [shadingMode]);

  return (
    <div 
      ref={containerRef} 
      className="hero-3d-canvas-wrapper" 
      aria-label="3D Cartoon Avatar of Albin Sunny"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'grab',
      }}
    />
  );
}
