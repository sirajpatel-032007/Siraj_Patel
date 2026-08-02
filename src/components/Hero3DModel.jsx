import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DModel() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Cyberpunk Lighting Setup (Neon Green and Purple combination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55); // Increased to brighten shadows
    scene.add(ambientLight);

    // Front-facing Headlight shining directly on the robot
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.8);
    frontLight.position.set(0, 1.2, 5);
    scene.add(frontLight);

    // Strong Key Light (Neon Green from top right)
    const keyLight = new THREE.DirectionalLight(0x00ff66, 1.5);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    // Fill Light (Neon Purple/Violet from bottom left as in screenshot)
    const fillLight = new THREE.DirectionalLight(0x7166ee, 1.2);
    fillLight.position.set(-5, 2, 2);
    scene.add(fillLight);

    // Rim Light (Highlight from behind)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    // 3. Interactive 3D Robot Whobee Assembly
    const robotGroup = new THREE.Group();
    robotGroup.position.y = -0.5;
    scene.add(robotGroup);

    // --- MATERIALS ---
    const materialRobotBody = new THREE.MeshStandardMaterial({ 
      color: 0x4f3bb9,      // Lighter, vibrant violet body
      roughness: 0.35,      // Higher roughness to scatter diffuse light
      metalness: 0.5       // Moderate metalness to show color details
    });

    const materialChrome = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc,      // Shiny chrome metal
      roughness: 0.1,
      metalness: 0.95
    });

    const materialScreen = new THREE.MeshStandardMaterial({ 
      color: 0x050212,      // Glossy deep dark face screen
      roughness: 0.05,
      metalness: 0.9
    });

    const materialEyes = new THREE.MeshBasicMaterial({ 
      color: 0xffffff       // Glowing white eyes
    });

    // A. Base / Torso (Rounded Cube)
    const baseGeom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const robotBase = new THREE.Mesh(baseGeom, materialRobotBody);
    robotBase.position.y = -0.9;
    robotGroup.add(robotBase);

    // B. Neck Supports & Connector
    const supportGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16);
    
    const supportLeft = new THREE.Mesh(supportGeom, materialChrome);
    supportLeft.position.set(-0.18, -0.05, 0);
    robotGroup.add(supportLeft);

    const supportRight = new THREE.Mesh(supportGeom, materialChrome);
    supportRight.position.set(0.18, -0.05, 0);
    robotGroup.add(supportRight);

    // Tapered Neck Cone
    const neckGeom = new THREE.CylinderGeometry(0.2, 0.35, 0.6, 24);
    const neck = new THREE.Mesh(neckGeom, materialChrome);
    neck.position.y = 0.28;
    robotGroup.add(neck);

    // C. Head Group (allows rotation)
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.85; // Pivot around the top of the neck
    robotGroup.add(headGroup);

    // Outer Head (Rounded Box shape)
    const headGeom = new THREE.BoxGeometry(1.8, 1.15, 0.7);
    const robotHead = new THREE.Mesh(headGeom, materialRobotBody);
    robotHead.position.y = 0.45;
    headGroup.add(robotHead);

    // Face Plate / Screen
    const screenGeom = new THREE.BoxGeometry(1.65, 1.0, 0.05);
    const screen = new THREE.Mesh(screenGeom, materialScreen);
    screen.position.set(0, 0.45, 0.34);
    headGroup.add(screen);

    // Glowing White Eyes
    const eyeGeom = new THREE.SphereGeometry(0.14, 32, 32);
    
    const leftEye = new THREE.Mesh(eyeGeom, materialEyes);
    leftEye.position.set(-0.35, 0.45, 0.38);
    leftEye.scale.set(1, 1, 0.5); // Flatten slightly
    headGroup.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.x = 0.35;
    headGroup.add(rightEye);

    // 4. Mouse Interactive Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetX = (x / width) * 2 - 1;
      targetY = -(y / height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Render & Animation Loop (with Blinking Eye logic)
    let animationFrameId;
    const clock = new THREE.Clock();

    // Blinking state variables
    let isBlinking = false;
    let blinkTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation
      robotGroup.position.y = -0.5 + Math.sin(elapsedTime * 1.5) * 0.15;
      
      // Neck slight sway
      neck.rotation.z = Math.sin(elapsedTime * 1.5) * 0.02;

      // Mouse tracking interpolation (LERP) for head tracking
      mouseX += (targetX - mouseX) * 0.07;
      mouseY += (targetY - mouseY) * 0.07;

      headGroup.rotation.y = mouseX * 0.5; // Turn head left/right
      headGroup.rotation.x = -mouseY * 0.3; // Look head up/down

      // Eye blink animation logic
      if (!isBlinking && Math.random() < 0.008) {
        isBlinking = true;
        blinkTimer = 0;
      }

      if (isBlinking) {
        blinkTimer += 0.15;
        // Cosine wave for smooth close/open scale
        const scaleY = Math.max(0.01, Math.abs(Math.cos(blinkTimer)));
        leftEye.scale.y = scaleY;
        rightEye.scale.y = scaleY;

        if (blinkTimer >= Math.PI) {
          isBlinking = false;
          leftEye.scale.y = 1;
          rightEye.scale.y = 1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 7. Component Garbage Collection on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries
      baseGeom.dispose();
      supportGeom.dispose();
      neckGeom.dispose();
      headGeom.dispose();
      screenGeom.dispose();
      eyeGeom.dispose();

      // Dispose Materials
      materialRobotBody.dispose();
      materialChrome.dispose();
      materialScreen.dispose();
      materialEyes.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
  );
}
