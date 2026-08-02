import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Basic WebGL Setup
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    
    // Orthographic camera is perfect for 2D full-screen shaders
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      powerPreference: "high-performance",
      alpha: false 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    container.appendChild(renderer.domElement);

    // 2. Custom GLSL Shader Definitions
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll;
      varying vec2 vUv;

      void main() {
        // Normalize screen coordinates
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Normalize mouse coordinates (0 to 1)
        vec2 mouse = u_mouse / u_resolution.xy;
        if(u_mouse.x == 0.0 && u_mouse.y == 0.0) {
          mouse = vec2(0.5); // Default center
        }

        // Adjust coordinates for liquid computation
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv * 5.0 - vec2(2.5);
        p.x *= aspect;
        
        // Fluid simulation using overlapping waves distorted by time
        float t = u_time * 0.12;
        
        // Mouse displacement effect
        float distToMouse = distance(uv, mouse);
        float mouseInfluence = smoothstep(0.35, 0.0, distToMouse);
        p += (uv - mouse) * mouseInfluence * 1.5;

        // Wave loop to create organic distortion
        for(int i = 1; i < 4; i++) {
          float fi = float(i);
          p.x += sin(p.y + t + fi * 0.6 + u_scroll * 0.3) * 0.45 / fi;
          p.y += cos(p.x - t + fi * 0.8 + u_scroll * 0.2) * 0.35 / fi;
        }

        // Color definitions (Obsidian Black, Neon Green, Emerald, Forest Green)
        vec3 colorBg = vec3(0.0, 0.0, 0.0);          // Pure Black
        vec3 colorGreen1 = vec3(0.0, 1.0, 0.4);      // Neon Light Green
        vec3 colorGreen2 = vec3(0.05, 0.65, 0.25);   // Emerald Green
        vec3 colorGreen3 = vec3(0.02, 0.35, 0.12);   // Forest Green

        // Dynamic interpolation value
        float mixVal = sin(p.x + p.y) * 0.5 + 0.5;
        
        // Base liquid colors blending neon green and emerald
        vec3 liquidColor = mix(colorGreen1, colorGreen2, mixVal);
        
        // Add deep forest green accent based on scroll position
        liquidColor = mix(liquidColor, colorGreen3, sin(u_scroll * 2.0) * 0.5 + 0.5);
        
        // Blend liquid simulation with pure black background
        vec3 finalColor = mix(colorBg, liquidColor, 0.16);
        
        // Localized interactive glow on mouse displacement (green glow)
        finalColor += vec3(mouseInfluence * 0.01, mouseInfluence * 0.12, mouseInfluence * 0.04);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // 3. Create Shader Material and Mesh
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_scroll: { value: 0 }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Interaction Events (Mouse & Scroll)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      // Invert Y coordinate for WebGL standard coordinates
      targetMouseX = e.clientX;
      targetMouseY = window.innerHeight - e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = window.innerHeight - e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      uniforms.u_resolution.value.set(newWidth, newHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // 5. Animation Render Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse interpolation (LERP) for liquid fluid viscosity
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;
      uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

      // Update time & scroll value
      uniforms.u_time.value = clock.getElapsedTime();
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      uniforms.u_scroll.value = scrollFraction;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup WebGL Memory & Events on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      
      // Cleanup WebGL buffers
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="webgl-canvas" />;
}
