import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Function to check if the device width is smaller than 426px
const isMobile = () => window.innerWidth < 426;

// Scene
const scene = new THREE.Scene();

// Material and Geometry for Sphere
const sphereGeometry = new THREE.SphereGeometry(isMobile() ? 1.5 : 3, 128, 128); // Adjust the sphere size
const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('../images/chip2_metalness.webp');
// const normalMap = textureLoader.load('../images/chip2_normal.webp');
// const bumpMap = textureLoader.load('../images/chip2_displacement.webp');
const texture = textureLoader.load('../images/marble_roughness.webp');
const normalMap = textureLoader.load('../images/marble_normal.webp');
const bumpMap = textureLoader.load('../images/marble_displacement.webp');

const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    normalMap: normalMap,
    bumpMap: bumpMap,
    roughness: 0.2
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);


// Lights
const light = new THREE.PointLight(new THREE.Color(1, 0.9, 0.6), 50, 30); // Increase the intensity and distance of the point light
light.position.set(5, 10, 5);
scene.add(light);

const spotLight = new THREE.SpotLight(new THREE.Color(1, 0.7, 0.2), 30, 30, Math.PI / 6, 0.5, 2); // Increase the intensity and distance of the spot light
spotLight.position.set(0, 0, 20);
scene.add(spotLight);

// Shadows
light.castShadow = spotLight.castShadow = sphereMesh.castShadow = true;

// Ambient light
const ambientLight = new THREE.AmbientLight(new THREE.Color(0.2, 0.4, 0.6), 1.5); // Increase the intensity of the ambient light
scene.add(ambientLight);
// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const colors = [
    { r: 1, g: 0.5, b: 0 },    // Orange
    { r: 1, g: 0, b: 0 },      // Red
    { r: 0.7, g: 0.3, b: 0 },  // Brown
    { r: 1, g: 1, b: 1 },      // White
  ];

  // Animation to change the color automatically using Anime.js
  let colorIndex = 0;
  const animateColor = () => {
    const currentColor = colors[colorIndex];
    const nextColorIndex = (colorIndex + 1) % colors.length;
    const nextColor = colors[nextColorIndex];

    anime({
      targets: sphereMesh.material.color,
      r: nextColor.r,
      g: nextColor.g,
      b: nextColor.b,
      duration: 2000,
      easing: 'easeInOutQuad',
      complete: () => {
        colorIndex = nextColorIndex;
        animateColor();
      },
    });
  };

  // Start the initial color animation
  animateColor();

  // Use performance.now() for smoother animation
  let lastTime = performance.now();
  const loop = () => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };

  // Call the loop for the first time
  loop();

// Resize Event Listener
const onWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    // Adjust the sphere size based on device width
    const newSphereSize = isMobile() ? 2.3 : 3;
    sphereMesh.geometry = new THREE.SphereGeometry(newSphereSize, 128, 128);
};

// Call the resize function for the first time
onWindowResize();

// Add Resize Event Listener
window.addEventListener('resize', onWindowResize);
