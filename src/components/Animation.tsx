import { useEffect, useRef } from 'react';
import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import getStarfield from './stars';

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

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true;
        controls.enableZoom = false
  
        const sphereGeometry = new THREE.SphereGeometry(2)
        const lineMaterial = new THREE.LineBasicMaterial({
            color : '#fff'
        })
        const edges = new THREE.EdgesGeometry(sphereGeometry, 10)
        const lines = new THREE.LineSegments(edges, lineMaterial)
        scene.add(lines)
        scene.background = new THREE.Color('#000');

        const stars = getStarfield()
        scene.add(stars)
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, -1, 1);
        scene.add(directionalLight);


        console.log(width, height)
        // const clock = new THREE.Clock();

        
        const animate = () => {
            // const t = clock.getElapsedTime();

            // directionalLight.position.x = Math.sin(t) * 5;
            // directionalLight.position.z = Math.cos(t) * 5;

            lines.rotation.z += 0.01
            lines.rotation.y += 0.01
            
            renderer.render(scene, camera);
        };

        renderer.setAnimationLoop(animate)

        return () => {
            renderer.setAnimationLoop(null)
            renderer.dispose()
            lineMaterial.dispose()
            sphereGeometry.dispose()
            edges.dispose()
            lines.remove()
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
