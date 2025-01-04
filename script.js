const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv; // Pass UV coordinates to the fragment shader
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    void main() {
        vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), vUv.y); // Red to Blue gradient
        gl_FragColor = vec4(color, 1.0);
    }
`;

const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });

// const cube = new THREE.Mesh(geometry, material);
// cube.scale.x = 2.5;
// cube.scale.y = 2.5;
// cube.scale.z = 2.5;
// scene.add(cube);

camera.position.z = 4;

const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  torus.rotation.x += 0.0001;
  torus.rotation.y += 0.0001;
}
animate();
