import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mountNode = mountRef.current;


    if (!mountNode) return;
    // Setup scene, camera, renderer, etc.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);

    const arenaRadius = 10;
    const portraitPositions = [
      { x: arenaRadius * Math.sin(0), z: arenaRadius * Math.cos(0), url: '/dashboard', image: 'src/assets/image-1.jpg' },
      { x: arenaRadius * Math.sin(2 * Math.PI / 3), z: arenaRadius * Math.cos(2 * Math.PI / 3), url: '/login', image: 'src/assets/image-1.jpg' },
      { x: arenaRadius * Math.sin(4 * Math.PI / 3), z: arenaRadius * Math.cos(4 * Math.PI / 3), url: '/signup', image: 'src/assets/image-1.jpg' },
    ];

    portraitPositions.forEach((position) => {
      const geometry = new THREE.PlaneGeometry(3, 3);
      const texture = new THREE.TextureLoader().load(position.image);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(geometry, material);

      plane.position.set(position.x, 0, position.z);
      plane.lookAt(new THREE.Vector3(0, 0, 0));
      plane.userData = { url: position.url };
      scene.add(plane);
    });

    camera.position.y = 5;
    camera.position.z = 20;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        const url = intersects[0].object.userData.url;
        if (url) {
          navigate(url); // Navigate to the corresponding page
        }
      }
    };

    window.addEventListener('click', onMouseClick);

    return () => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
      window.removeEventListener('click', onMouseClick);
    };
  }, [navigate]);

  return <div ref={mountRef} className="home-scene" />;
};

export default Home;
