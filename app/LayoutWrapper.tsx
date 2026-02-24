'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

const LayoutWrapper = ({
    children
}:{
    children : React.ReactNode
}) => {
    const [width, setWidth] = useState<number>(0)

	useEffect(() => {
        setWidth(window.innerWidth)

		const handleResize = () => {
			setWidth(window.innerWidth)
		}

		window.addEventListener("resize", handleResize)

		return () => window.addEventListener("resize", handleResize)
	}, [])
    
    return (
        <div className='h-screen w-full flex'>
            <div className="w-[30%] h-full">
                <Navbar/>
            </div>
            <div className="w-[70%] overflow-y-scroll">
                {children}
            </div>
        
        </div>
    );
}

export default LayoutWrapper;
