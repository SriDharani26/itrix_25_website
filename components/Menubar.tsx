import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
const Menubar = () => {
    return (
        <div className='w-full h-14 fixed inset-0 z-50
                        bg-one border-b border-two py-0.5 px-2
                        flex flex-row gap-4 items-center justify-between'>
            <div className='flex gap-4 items-center'>
                
                 <Image
                    src="/itrix'26-logo.png"
                    width={100}
                    height={100}
                    alt='Itrix-Logo'
                />
                <p className='text-sm text-ten cursor-pointer'>File</p>
                <p className='text-sm text-ten cursor-pointer'>Edit</p>
                <p className='text-sm text-ten cursor-pointer'>Selection</p>
                <p className='text-sm text-ten cursor-pointer'>View</p>
                <p className='text-sm text-ten cursor-pointer'>Help</p>

            </div>
            <div>

                <Link
                    href='https://istaceg.in/'
                    target='__blank' 
                >
                    <Image
                        src='/ista-logo.png'
                        alt='Ista-Logo'
                        width={40}
                        height={40}
                    />
                </Link>
            </div>
        </div>
    );
}

export default Menubar;
