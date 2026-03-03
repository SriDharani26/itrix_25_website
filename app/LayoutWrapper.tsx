'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import MobileNavbar from '@/components/MobileNavbar';
import Topbar from '@/components/Topbar';
import Menubar from '@/components/Menubar';
import IntroOverlay from '@/components/IntroOverlay';
import SkeletonLoader from '@/components/SkeletonLoader';

const LayoutWrapper = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [width, setWidth] = useState<number>(0);
    const [introComplete, setIntroComplete] = useState(false);
    const [contentReady, setContentReady] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);
        updateWidth();

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setContentReady(true);
        }, 1400);

        return () => window.clearTimeout(timer);
    }, []);

    const renderDesktopSkeleton = () => (
        <>
            <div className="w-[30%] h-full min-[1024px]:w-[25%] border-r border-[#2d3347] bg-[#171d2b] p-3">
                <SkeletonLoader className="h-8 w-2/3" />
                <div className="mt-4 space-y-3">
                    <SkeletonLoader className="h-10 w-full" />
                    <SkeletonLoader className="h-10 w-full" />
                    <SkeletonLoader className="h-10 w-5/6" />
                    <SkeletonLoader className="h-10 w-11/12" />
                    <SkeletonLoader className="h-10 w-4/5" />
                </div>
            </div>

            <div className="overflow-y-scroll min-[800px]:w-[70%] min-[1024px]:w-[75%] w-full max-[800px]:pb-20 p-4">
                <SkeletonLoader className="h-12 w-full" />
                <div className="mt-5 space-y-4">
                    <SkeletonLoader className="h-40 w-full" />
                    <SkeletonLoader className="h-28 w-3/4" />
                    <SkeletonLoader className="h-24 w-full" />
                    <SkeletonLoader className="h-24 w-5/6" />
                </div>
            </div>
        </>
    );

    const renderMobileSkeleton = () => (
        <>
            <div className={`overflow-y-scroll w-full ${pathname === '/contact' ? 'max-[800px]:pb-0' : 'max-[800px]:pb-20'} p-4`}>
                <SkeletonLoader className="h-12 w-full" />
                <div className="mt-5 space-y-4">
                    <SkeletonLoader className="h-36 w-full" />
                    <SkeletonLoader className="h-24 w-full" />
                    <SkeletonLoader className="h-24 w-11/12" />
                    <SkeletonLoader className="h-24 w-10/12" />
                </div>
            </div>

            <div className="fixed bottom-0 w-full z-50 px-3 pb-3">
                <SkeletonLoader className="h-14 w-full rounded-xl" />
            </div>
        </>
    );

    return (
        <>
            {!introComplete && <IntroOverlay onComplete={() => setIntroComplete(true)} />}

            <div className='h-screen w-full flex min-[800px]:pt-14'>
                {!contentReady ? (
                    width < 800 ? renderMobileSkeleton() : renderDesktopSkeleton()
                ) : (
                    <>
                        {width < 800 ?
                            <div className='fixed bottom-0 w-full z-50'>
                                <MobileNavbar />
                            </div>
                            :
                            <div className="w-[30%] h-full min-[1024px]:w-[25%]">
                                <Menubar></Menubar>
                                <Navbar />
                            </div>
                        }
                        <div className={`overflow-y-scroll min-[800px]:w-[70%] min-[1024px]:w-[75%] w-full ${pathname === '/contact' ? 'max-[800px]:pb-0' : 'max-[800px]:pb-20'}`}>
                            <Topbar />
                            {children}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default LayoutWrapper;

