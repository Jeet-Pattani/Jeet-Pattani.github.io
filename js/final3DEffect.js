import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

// Material and Geometry for Sphere
const sphereGeometry = new THREE.SphereGeometry(3, 128, 128);
// Load a texture image
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('../images/metal_metalness.png');
// Load the Normal Map
const normalMap = textureLoader.load('../images/metal_normal.png');
// Load the Bump Map
const bumpMap = textureLoader.load('../images/metal_displacement.png');

const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texture, // Apply the texture to the sphere
    normalMap: normalMap, // Apply the Normal Map to the sphere
    bumpMap: bumpMap, // Apply the Bump Map to the sphere
    roughness: 0.2
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

// Sizes
const sizes = {
    width: document.querySelector('.canvasContainer').clientWidth,
    height: document.querySelector('.canvasContainer').clientHeight,
}

// Light
const lightColor = new THREE.Color(1, 0.9, 0.6); // Warm yellowish color
const lightIntensity = 5; // Increase the light intensity to 5 (adjust as needed)

const light = new THREE.PointLight(lightColor, lightIntensity, 20);
light.position.set(5, 10, 10);
scene.add(light);

// Spotlight to create a focused light on the front side of the sphere
const spotLightColor = new THREE.Color(1, 0.7, 0.2); // Warm yellowish color for spotlight
const spotLightIntensity = 3; // Increase the spotlight intensity to 3 (adjust as needed)

const spotLight = new THREE.SpotLight(spotLightColor, spotLightIntensity, 20, Math.PI / 6, 0.5, 2);
spotLight.position.set(0, 0, 20);
scene.add(spotLight);

// Add shadows
light.castShadow = true;
spotLight.castShadow = true;
sphereMesh.castShadow = true;

// Ambient light to provide some overall illumination
const ambientLightColor = new THREE.Color(0.1, 0.2, 0.3); // Dark blueish color for ambient light
const ambientLightIntensity = 0.5; // Increase the ambient light intensity to 0.5 (adjust as needed)

const ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Setting Renderer and Rendering
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);

// Enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = document.querySelector('.canvasContainer').clientWidth;
    sizes.height = document.querySelector('.canvasContainer').clientHeight;
    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

// Animation to change the color automatically
const animateColor = () => {
    // Generate a random color
    const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());

    // Animate the color change
    gsap.to(sphereMesh.material.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
        duration: 1, // Duration of the animation
        onComplete: animateColor // Call the function again after the animation is complete
    });
};

// Start the initial color animation
animateColor();

// Add rotation animation to the sphere
gsap.to(sphereMesh.rotation, {
    y: Math.PI * 2,
    repeat: -1,
    duration: 10,
    ease: 'linear'
});

// Add light intensity animation
gsap.to(light, {
    intensity: 2,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: 'power1.inOut'
});

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

loop();
