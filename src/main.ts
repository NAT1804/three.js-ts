import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "dat.gui";

const sceneA = new THREE.Scene();
sceneA.background = new THREE.Color(0x123456);

const sceneB = new THREE.Scene();
sceneB.background = new THREE.TextureLoader().load(
  "https://sbcode.net/img/grid.png"
);

const sceneC = new THREE.Scene();
sceneC.background = new THREE.CubeTextureLoader()
  .setPath("https://sbcode.net/img/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(geometry, material);
sceneA.add(cube);

const stats = new Stats();
document.body.appendChild(stats.dom);

let activeScene = sceneA;
const setScene = {
  sceneA: () => {
    activeScene = sceneA;
  },
  sceneB: () => {
    activeScene = sceneB;
  },
  sceneC: () => {
    activeScene = sceneC;
  },
};

const gui = new GUI();
const sceneFolder = gui.addFolder("Scene");
sceneFolder.add(setScene, "sceneA").name("Scene A");
sceneFolder.add(setScene, "sceneB").name("Scene B");
sceneFolder.add(setScene, "sceneC").name("Scene C");

const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 20);
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(activeScene, camera);
}

animate();
