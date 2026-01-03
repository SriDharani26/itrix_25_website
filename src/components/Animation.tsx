import { useEffect, useRef } from 'react';
import * as THREE from 'three'

const Animation = () => {

    const doc = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(!doc.current) return

        const width = doc.current.clientWidth
        const height = doc.current.clientHeight

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
                            75, 
                            width / height,
                            0.1,
                            1000
                        )
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        doc.current.appendChild(renderer.domElement)

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        console.log(width, height)

        const animate = () => {
            renderer.render(scene, camera)
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        renderer.setAnimationLoop(animate)

        return () => {
            renderer.setAnimationLoop(null)
            renderer.dispose()
            geometry.dispose()
            material.dispose()
            doc.current?.removeChild(renderer.domElement)
        }
    })
   return (
        <div
            ref={doc}
            className='h-full w-full'
        />
    )

}

export default Animation;
