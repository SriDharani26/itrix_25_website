import { useEffect, useRef } from 'react';
import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const Animation = () => {

    const doc = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (!doc.current) return

        const width = doc.current.clientWidth
        const height = doc.current.clientHeight

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        doc.current.appendChild(renderer.domElement)

  
//   const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//         const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
//         const cube = new THREE.Mesh( geometry, material );
//         scene.add( cube );
        const geometry = new THREE.SphereGeometry(2, 48, 48);

        const material = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.1,
            roughness: 0.3,
            emissive: 0x00ffff,
            emissiveIntensity: 0.4,
        });

        

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);


        camera.position.z = 5;

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, -1, 1);
        scene.add(directionalLight);


        console.log(width, height)
        const clock = new THREE.Clock();

        
        const animate = () => {
            const t = clock.getElapsedTime();

            directionalLight.position.x = Math.sin(t) * 5;
            directionalLight.position.z = Math.cos(t) * 5;
            const s = 1 + Math.sin(t) * 0.1;
            sphere.scale.set(s, s, s);


            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        renderer.setAnimationLoop(animate)

        return () => {
            renderer.setAnimationLoop(null)
            renderer.dispose()
            geometry.dispose()
            material.dispose()
            doc.current?.removeChild(renderer.domElement)
        }
    }, [])

   return (
        <div
            ref={doc}
            className='h-full w-full'
        />
    )

}

export default Animation;
