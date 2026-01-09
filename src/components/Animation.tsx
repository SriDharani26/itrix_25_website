import { useEffect, useRef } from 'react';
import * as THREE from 'three'
// import getStarfield from './stars';
import { degToRad } from 'three/src/math/MathUtils.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'


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

        const composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, camera))

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            1,   // strength
            0.1,   // radius (blur)
            0.1   // threshold,
            
        )

        composer.addPass(bloomPass)

        //1 0x00ffff
        //2 0x3399ff
        //3 0xcc66ff

        //4 0xf0ffe6
        //5 0xe6fff2
        //6 0xeaffea
        
        //7 0xf0f7ff

        //8 0xd9ffea -- fixed

        let sphereRadius = 1.6
        let circleRadius = 2.3

        if(width < 475){
            console.log('hi')
            sphereRadius = 1.1
            circleRadius = 1.6
            
        }
        else if(width < 670){
            sphereRadius = 1.3
            circleRadius = 1.8
        }
        const sphereGeometry = new THREE.SphereGeometry(sphereRadius)
        const material = new THREE.MeshBasicMaterial({
            color :  0xd9ffea,
            transparent: true,
            opacity : 1,
            blending: THREE.AdditiveBlending
        })
        const sphere = new THREE.Mesh(sphereGeometry, material)
        scene.add(sphere)
        
        const lineMaterial = new THREE.LineBasicMaterial({
            color :  0xd9ffea,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending
        })
        
        
        const wing1 = new THREE.CircleGeometry(circleRadius)

        const edge1 = new THREE.EdgesGeometry(wing1, 1)
        const line1 = new THREE.LineSegments(edge1, lineMaterial)
        line1.rotation.y = degToRad(60)
        scene.add(line1)

        const wing2 = new THREE.CircleGeometry(circleRadius)

        const edge2 = new THREE.EdgesGeometry(wing2, 1)
        const line2 = new THREE.LineSegments(edge2, lineMaterial)
        line2.rotation.y = degToRad(120)
        scene.add(line2)


        const wing3 = new THREE.CircleGeometry(circleRadius)

        const edge3 = new THREE.EdgesGeometry(wing3, 1)
        const line3 = new THREE.LineSegments(edge3, lineMaterial)
        line3.rotation.y = degToRad(180)
        scene.add(line3)

        scene.background = new THREE.Color('#161616');

        // const stars = getStarfield()
        // scene.add(stars)
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, -1, 1);
        scene.add(directionalLight);


        const clock = new THREE.Clock();

        
        const animate = () => {
            const t = clock.getElapsedTime();

            sphere.scale.z = Math.sin(t) * 1.5
            
            const pulse = 1 + Math.sin(t * 2) * 0.5
            bloomPass.strength = pulse
      
            line1.rotation.x += 0.01
            line1.rotation.y += 0.01

            line2.rotation.x += 0.012
            line2.rotation.y += 0.012

            line3.rotation.x += 0.014
            line3.rotation.y += 0.014
         
            composer.render()

        };

        renderer.setAnimationLoop(animate)

        const handleResize = () => {
            if (!doc.current) return

            const newWidth = doc.current.clientWidth
            const newHeight = doc.current.clientHeight

            camera.aspect = newWidth / newHeight
            camera.updateProjectionMatrix()

            renderer.setSize(newWidth, newHeight)
            composer.setSize(newWidth, newHeight)
        }

        window.addEventListener('resize', handleResize)


        return () => {
            renderer.setAnimationLoop(null)
            renderer.dispose()
            lineMaterial.dispose()
            sphereGeometry.dispose()
            material.dispose()
            edge1.dispose()
            line1.remove()
            edge2.dispose()
            line2.remove() 
            edge3.dispose()
            line3.remove()
            doc.current?.removeChild(renderer.domElement)

            window.removeEventListener('resize', handleResize)

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
