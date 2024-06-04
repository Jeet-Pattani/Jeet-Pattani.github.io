import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

//Material and Geometry for Sphere
const sphereGeometry = new THREE.SphereGeometry(3, 128, 128);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: "#ff5300",
    roughness: 0.3
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

//Sizes
const sizes = {
    width: document.querySelector('.canvasContainer').clientWidth,
    height: document.querySelector('.canvasContainer').clientHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.intensity = 1.25;
light.position.set(0, 10, 10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//Setting Renderer and Rendering
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

window.addEventListener("resize", () => {
    //Update sizes
    sizes.width = document.querySelector('.canvasContainer').clientWidth;
    sizes.height = document.querySelector('.canvasContainer').clientHeight;
    //Update Camera
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
    window.requestAnimationFrame(loop);
}

loop();
