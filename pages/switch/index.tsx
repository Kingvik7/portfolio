import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import Image from "next/image";
import nissan from "../../images/nissanLogo.png";
import FlakesTexture from "three/examples/jsm/textures/FlakesTexture"
import Link from "next/link";


export default function ThreeScene() {
  const containerRef = useRef(null);
  const fadeRef = useRef(null);
  const [cameraPositionIndex, setCameraPositionIndex] = useState(0);
  const requestRef = useRef(null);
  const animationProgress = useRef(0);
  const cameraPositions = [
    {
      startPosition: new THREE.Vector3(5, 2, 12),
      endPosition: new THREE.Vector3(6, 1, 12),
      lookAt: new THREE.Vector3(0, 0, 0),
      startFov: 25,
      endFov: 15,
      startRotation: new THREE.Euler(-0, 0.5, 0.1),
      endRotation: new THREE.Euler(-0, 0.5, 0.1),
    },
    {
      startPosition: new THREE.Vector3(5, 1, 1),
      endPosition: new THREE.Vector3(3, 1, -5),
      lookAt: new THREE.Vector3(0, 0, 0),
      startFov: 40,
      endFov: 40,
      startRotation: new THREE.Euler(0, 2, 0.1),
      endRotation: new THREE.Euler(0, 2.4, 0.1),
    },
    {
      startPosition: new THREE.Vector3(-3, 1.5, -5),
      endPosition: new THREE.Vector3(-5, 1.3, -7),
      lookAt: new THREE.Vector3(0, 0, 0),
      startFov: 40,
      endFov: 30,
      startRotation: new THREE.Euler(-0, 3.7, 0.1),
      endRotation: new THREE.Euler(-0, 3.8, 0.1),
    },
    {
      startPosition: new THREE.Vector3(0, 10, 0),
      endPosition: new THREE.Vector3(0, 4, 15),
      lookAt: new THREE.Vector3(0, 0, 0),
      startFov: 40,
      endFov: 10,
      startRotation: new THREE.Euler(-1.5, 0, 0),
      endRotation: new THREE.Euler(-0.2, 0, 0),
    },
  ];

  const handleButtonClick = () => {
    const nextIndex = (cameraPositionIndex + 1) % cameraPositions.length;
    setTimeout(() => {
      animateToIndex(nextIndex);
    }, 500);
  };

  const animateToIndex = (index) => {
    setCameraPositionIndex(index);
    animationProgress.current = 0;
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 10, 100 );
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    containerRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const normalMap = textureLoader.load("/normalMap.jpg");

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
				hemiLight.position.set( 0, 100, 0 );
				scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffefbd, 4 );
				dirLight.position.set( 10, 40, 50 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.top = 50;
				dirLight.shadow.camera.bottom = - 25;
				dirLight.shadow.camera.left = - 25;
				dirLight.shadow.camera.right = 25;
				dirLight.shadow.camera.near = 0.1;
				dirLight.shadow.camera.far = 200;
				dirLight.shadow.mapSize.set( 1024, 1024 );
				scene.add( dirLight );

    const shadow = new THREE.TextureLoader().load( '/shadow.jpeg' );
    const loader = new GLTFLoader();

    const ground = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000 ), new THREE.MeshPhysicalMaterial( { 
      color: 0xcbcbcb, depthWrite: false, reflectivity:1, normalMap:normalMap, roughness: 1, specular:0xf1f1f1, shininess:100 } ) );
				ground.rotation.x = - Math.PI / 2;
				ground.receiveShadow = true;
				scene.add( ground );

    loader.load('/switch.glb', (gltf) => {
      gltf.scene.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.castShadow = true;

        }
      } );
      scene.add(gltf.scene);
    });

    const material = new THREE.MeshPhysicalMaterial({ 
      color: 0x666666 ,
      roughness: 0,
      metalsness: 0.0,
      clearcoat: 1.0,
      reflectivity: 1.0,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.1,0.1)
    
    });
   
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry( 7.9, 7.9 ),
      new THREE.MeshBasicMaterial( {
        map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
      } )
    );
    mesh.rotation.x = - Math.PI / 2;
    mesh.position.set(0,0.01,0);
    mesh.renderOrder = 2;
    scene.add(mesh)


    const animate = () => {
      const positionData = cameraPositions[cameraPositionIndex];
      if (animationProgress.current < 1) {
        animationProgress.current += 0.001;
      } 
      else {
        animationProgress.current = 0;
        const nextIndex = (cameraPositionIndex + 1) % cameraPositions.length;
        animateToIndex(nextIndex);
      }

      if (animationProgress.current > 0.98 || animationProgress.current < 0.01 ) {
        console.log("slow")
        fadeRef.current.classList.remove("fade-out");
      }

      if (animationProgress.current > 0.02 && animationProgress.current < 0.9) {
        fadeRef.current.classList.add("fade-out")
      }

      camera.position.lerpVectors(positionData.startPosition, positionData.endPosition, animationProgress.current);
      camera.lookAt(positionData.lookAt);

      camera.fov = positionData.startFov + (positionData.endFov - positionData.startFov) * animationProgress.current;

      camera.rotation.x = positionData.startRotation.x + (positionData.endRotation.x - positionData.startRotation.x) * animationProgress.current;
      camera.rotation.y = positionData.startRotation.y + (positionData.endRotation.y - positionData.startRotation.y) * animationProgress.current;
      camera.rotation.z = positionData.startRotation.z + (positionData.endRotation.z - positionData.startRotation.z) * animationProgress.current;

      camera.updateProjectionMatrix();
      renderer.render(scene, camera);

      requestRef.current = requestAnimationFrame(animate);
    };

    
    // Add post-processing effects
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);

    const ssaoPass = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
    ssaoPass.kernelRadius = 16;
    ssaoPass.minDistance = 0.005;
    ssaoPass.maxDistance = 0.1;
    composer.addPass(ssaoPass);

    animate();

    return () => {
      cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [cameraPositionIndex, cameraPositions]);

  return ( 
    <div className="bg-white applecontainer">
      <div className=" w-full relative">
        <div className="fade-overlay" ref={fadeRef}></div>
        <div className="innerShadow2 w-full h-full"></div>
        <div className="w-full h-full" ref={containerRef}></div>
      </div>
      <div className="flex flex-col  fixed bottom-10 left-28">
        <div className="flex flex-row  justify-center">
        <Image className="w-20 p-2 " src={nissan}/>
        <div className="flex flex-col justify-center text-sm">
          <h3 className="text-gray-600 font-['Sfpro']">Nissan</h3>
          <h3 className="text-gray-600 font-['Sfpro']">Skyline R33</h3>
        </div>
        </div>
        <div className="flex flex-row m-auto">
        <button className="m-auto  text-gray-600 p-1 rounded-full border-2 border-transparent font-['Sfpro']  hover:border-gray-100 transition-all duration-300" >
          <div className="bg-gray-200 text-gray-600 text-sm rounded-full px-4 py-1">
            <Link href="../anim2">Change Car</Link>
          </div>
        </button>
      </div>
      </div>  
    
    </div>
  );
}
