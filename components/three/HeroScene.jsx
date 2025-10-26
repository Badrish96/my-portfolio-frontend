"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 0, 10);

    const themeColors = {
      dark: 0x12F7D6,
      light: 0x0ea5a1
    };

    const currentColor = isDark ? themeColors.dark : themeColors.light;

    const ambientLight = new THREE.AmbientLight(currentColor, isDark ? 0.6 : 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(currentColor, isDark ? 1 : 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(currentColor, isDark ? 1.5 : 1.8, 100);
    pointLight.position.set(-3, 2, 5);
    scene.add(pointLight);

    const floatingObjects = [];

    function createCodeSymbol(symbol, position) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = isDark ? '#12F7D6' : '#0ea5a1';
      ctx.font = 'bold 180px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol, 128, 128);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        opacity: isDark ? 0.8 : 0.6
      });
      
      const sprite = new THREE.Sprite(material);
      sprite.position.set(position.x, position.y, position.z);
      sprite.scale.set(2, 2, 1);
      
      scene.add(sprite);
      return sprite;
    }

    function createTerminalWindow(position) {
      const group = new THREE.Group();
      
      const windowGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
      const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: currentColor,
        transparent: true,
        opacity: isDark ? 0.3 : 0.2,
        metalness: 0.8,
        roughness: 0.2
      });
      
      const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
      group.add(windowMesh);
      
      const edges = new THREE.EdgesGeometry(windowGeometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: currentColor,
        linewidth: 2
      });
      const wireframe = new THREE.LineSegments(edges, lineMaterial);
      group.add(wireframe);
      
      const headerGeometry = new THREE.BoxGeometry(2, 0.15, 0.11);
      const headerMaterial = new THREE.MeshStandardMaterial({ 
        color: currentColor,
        emissive: currentColor,
        emissiveIntensity: isDark ? 0.3 : 0.2
      });
      const header = new THREE.Mesh(headerGeometry, headerMaterial);
      header.position.y = 0.525;
      group.add(header);
      
      for (let i = 0; i < 3; i++) {
        const dotGeometry = new THREE.SphereGeometry(0.04, 8, 8);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: currentColor });
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(-0.85 + i * 0.12, 0.525, 0.06);
        group.add(dot);
      }
      
      group.position.set(position.x, position.y, position.z);
      scene.add(group);
      return group;
    }

    function createBracePair(position) {
      const group = new THREE.Group();
      
      const shape1 = new THREE.Shape();
      shape1.moveTo(-0.2, 0.5);
      shape1.quadraticCurveTo(-0.35, 0.25, -0.35, 0);
      shape1.quadraticCurveTo(-0.35, -0.25, -0.2, -0.5);
      
      const shape2 = new THREE.Shape();
      shape2.moveTo(0.2, 0.5);
      shape2.quadraticCurveTo(0.35, 0.25, 0.35, 0);
      shape2.quadraticCurveTo(0.35, -0.25, 0.2, -0.5);
      
      const extrudeSettings = {
        depth: 0.05,
        bevelEnabled: false
      };
      
      const geometry1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings);
      const geometry2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings);
      
      const material = new THREE.MeshStandardMaterial({ 
        color: currentColor,
        emissive: currentColor,
        emissiveIntensity: isDark ? 0.2 : 0.15,
        metalness: 0.5,
        roughness: 0.3
      });
      
      const brace1 = new THREE.Mesh(geometry1, material);
      const brace2 = new THREE.Mesh(geometry2, material);
      
      group.add(brace1);
      group.add(brace2);
      
      group.position.set(position.x, position.y, position.z);
      scene.add(group);
      return group;
    }

    function createGitBranch(position) {
      const group = new THREE.Group();
      
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: currentColor,
        linewidth: 3
      });
      
      const points1 = [];
      points1.push(new THREE.Vector3(-0.3, -0.4, 0));
      points1.push(new THREE.Vector3(-0.3, 0, 0));
      points1.push(new THREE.Vector3(0, 0.3, 0));
      points1.push(new THREE.Vector3(0.3, 0.4, 0));
      
      const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
      const line1 = new THREE.Line(geometry1, lineMaterial);
      group.add(line1);
      
      const points2 = [];
      points2.push(new THREE.Vector3(-0.3, 0, 0));
      points2.push(new THREE.Vector3(-0.3, 0.4, 0));
      
      const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
      const line2 = new THREE.Line(geometry2, lineMaterial);
      group.add(line2);
      
      const dotGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const dotMaterial = new THREE.MeshStandardMaterial({ 
        color: currentColor,
        emissive: currentColor,
        emissiveIntensity: isDark ? 0.5 : 0.3
      });
      
      const positions = [
        [-0.3, -0.4, 0],
        [-0.3, 0.4, 0],
        [0.3, 0.4, 0]
      ];
      
      positions.forEach(pos => {
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(...pos);
        group.add(dot);
      });
      
      group.position.set(position.x, position.y, position.z);
      scene.add(group);
      return group;
    }

    function createParticles() {
      const geometry = new THREE.BufferGeometry();
      const particlesCount = 1500;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const material = new THREE.PointsMaterial({
        size: 0.02,
        color: currentColor,
        transparent: true,
        opacity: isDark ? 0.5 : 0.3,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      return particles;
    }

    const codeSymbols = ['</', '/>', '{', '}', '()', '=>', '[]', '{}', '<>', '//'];
    const symbolPositions = [
      { x: -7, y: 4, z: -3 },
      { x: 7, y: 3.5, z: -2 },
      { x: -6.5, y: -3, z: -4 },
      { x: 6.5, y: -3.5, z: -3 },
      { x: -8, y: 0, z: -5 },
      { x: 8, y: 0.5, z: -4 },
      { x: -5, y: 5, z: -6 },
      { x: 5, y: -5, z: -5 },
      { x: 0, y: 5.5, z: -7 },
      { x: 0, y: -5.5, z: -6 }
    ];

    symbolPositions.forEach((pos, index) => {
      if (index < codeSymbols.length) {
        const symbol = createCodeSymbol(codeSymbols[index], pos);
        floatingObjects.push({ mesh: symbol, speed: 0.3 + Math.random() * 0.4, axis: 'both', type: 'sprite' });
      }
    });

    const terminal1 = createTerminalWindow({ x: -6, y: 2, z: -2 });
    floatingObjects.push({ mesh: terminal1, speed: 0.4, axis: 'y', type: 'group' });

    const terminal2 = createTerminalWindow({ x: 6, y: -2, z: -3 });
    floatingObjects.push({ mesh: terminal2, speed: 0.5, axis: 'x', type: 'group' });

    const terminal3 = createTerminalWindow({ x: 0, y: 4.5, z: -5 });
    floatingObjects.push({ mesh: terminal3, speed: 0.45, axis: 'both', type: 'group' });

    const braces1 = createBracePair({ x: -7, y: -1, z: -3 });
    floatingObjects.push({ mesh: braces1, speed: 0.6, axis: 'both', type: 'group' });

    const braces2 = createBracePair({ x: 7, y: 1.5, z: -2.5 });
    floatingObjects.push({ mesh: braces2, speed: 0.5, axis: 'y', type: 'group' });

    const git1 = createGitBranch({ x: -5.5, y: -4, z: -4 });
    floatingObjects.push({ mesh: git1, speed: 0.4, axis: 'x', type: 'group' });

    const git2 = createGitBranch({ x: 5.5, y: 4, z: -3.5 });
    floatingObjects.push({ mesh: git2, speed: 0.45, axis: 'y', type: 'group' });

    const particles = createParticles();

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      floatingObjects.forEach((obj, index) => {
        if (obj.type === 'group') {
          obj.mesh.rotation.x += 0.003 * obj.speed;
          obj.mesh.rotation.y += 0.005 * obj.speed;
        } else if (obj.type === 'sprite') {
          obj.mesh.material.rotation += 0.002 * obj.speed;
        }
        
        if (obj.axis === 'y' || obj.axis === 'both') {
          obj.mesh.position.y += Math.sin(elapsedTime * obj.speed + index) * 0.003;
        }
        if (obj.axis === 'x' || obj.axis === 'both') {
          obj.mesh.position.x += Math.cos(elapsedTime * obj.speed + index) * 0.003;
        }
      });

      particles.rotation.y += 0.0002;
      particles.rotation.x = elapsedTime * 0.0001;

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      pointLight.position.x = Math.sin(elapsedTime * 0.5) * 5;
      pointLight.position.z = Math.cos(elapsedTime * 0.5) * 5;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[500px] bg-[var(--bg)] transition-colors duration-200"
    />
  );
}