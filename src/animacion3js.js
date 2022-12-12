import * as THREE from "three"
import { GLTFLoader } from 'loader'
import { OrbitControls } from 'orbiter'
import { Clock } from "three";
const scene = new THREE.Scene();
const canvaso = document.getElementById('canvas3js');

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true}); 
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;


camera.position.set(0,1.5,1.5);
camera.lookAt(0,-100,10);


const luz = new THREE.AmbientLight(0xa6e2ed, 4);
scene.add(luz);

const luz2 = new THREE.SpotLight(0x404040, 300);
luz2.castShadow = true;
luz2.position.set(5,5,5);

scene.add(luz2);

renderer.shadowMap.enabled = true;


 
/* Geometría de prueba 
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add( cube );
const spot = new THREE.SpotLightHelper(luz2);
scene.add(spot);
 */

const controls = new OrbitControls( camera, canvaso);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.target.set(0,0,0);



let rendertarget;
let textureLoader = new THREE.TextureLoader();

let texture = textureLoader.load('/assets/img/bg_room.jpg', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;
    const pmRemGenerator = new THREE.PMREMGenerator(renderer);
    pmRemGenerator.compileEquirectangularShader();

    rendertarget = pmRemGenerator.fromEquirectangular( texture);

});

let normalLoader = new THREE.TextureLoader();
let normalPizza = normalLoader.load('/assets/img/normal_masa.png');
normalPizza.mapping = THREE.UVMapping;

let model;
let mixer;
const loader = new GLTFLoader();
loader.load('/assets/3d/pizza_3.glb', function ( gltf ) {
    model = gltf.scene;
    

    model.traverse ( (o) => {
        if (o.animations.length){
            console.log(o.name);
        }
        if ( o.isMesh ) {
            o.material.envMap = rendertarget.texture;
            o.material.envMapIntensity = 1;
            /* o.material.bumpMap = texture;
            o.material.bumpScale = 0.01; */
            o.material.needsUpdate = true;
            if (o.name.includes('pizza')){
                o.material.normalMap = normalPizza;
                o.material.normalScale = new THREE.Vector2(2,2);
                
            }
        }
    })

    const loader_anim = new GLTFLoader();
    loader_anim.load('/assets/3d/pizza_3.glb', gltf => {
        mixer = new THREE.AnimationMixer(model);
        const animacion_caida = mixer.clipAction(gltf.animations[0]);
        animacion_caida.setLoop(THREE.LoopOnce);

        const animacion_rotacion = mixer.clipAction(gltf.animations[1]);
        animacion_rotacion.fadeIn(2);
        mixer.timeScale = 0.8;
        animacion_caida.play();
        animacion_rotacion.play(); 
        animar();
    })
    scene.add(model);
}, undefined, function (error) {
    console.error( error );
})

function medidas_canvas() {
    const canvas = renderer.domElement;
    const ancho = canvas.clientWidth;
    const alto = canvas.clientHeight;
    
    
    if (canvaso.clientWidth !== ancho || canvaso.clientHeight !== alto) {  
        renderer.setSize(canvaso.clientWidth,canvaso.clientHeight);
        camera.aspect = canvaso.clientWidth / canvaso.clientHeight;
        camera.updateProjectionMatrix();
    }
}
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
canvaso.append(renderer.domElement);


const clk = new Clock();

function animar(){
    requestAnimationFrame( animar);
    controls.update();
    mixer.update(clk.getDelta());
    medidas_canvas();
    renderer.render(scene, camera);

    
}



