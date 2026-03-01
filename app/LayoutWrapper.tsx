'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import MobileNavbar from '@/components/MobileNavbar';
import Topbar from '@/components/Topbar';
import Menubar from '@/components/Menubar';

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
        <div className='h-screen w-full flex min-[800px]:pt-14'>
            {width < 800 ?
                <div className='fixed bottom-0 w-full z-50'>
                    <MobileNavbar/>
                </div>
                :
                <div className="w-[30%] h-full min-[1024px]:w-[25%]">
                    <Menubar></Menubar>
                    <Navbar/>
                </div>
            }
            <div className="overflow-y-scroll min-[800px]:w-[70%] min-[1024px]:w-[75%] w-full  max-[800px]:pb-20">
                <Topbar/>
                {children}
            </div>
        
        </div>
    );
}

export default LayoutWrapper;
