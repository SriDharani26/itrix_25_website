import Link from 'next/link';
import React from 'react';

const Menubar = () => {
    return (
        <div className='w-full h-8 fixed inset-0 z-50
                        bg-one border-b border-two py-0.5 px-2
                        flex flex-row gap-4 items-center'>
            <p>Itrix 26 - logo</p>
            <p className='text-sm text-ten cursor-pointer'>File</p>
            <p className='text-sm text-ten cursor-pointer'>Edit</p>
            <p className='text-sm text-ten cursor-pointer'>Help</p>
            <Link
                href='https://istaceg.in/'
                target='__blank' 
                className='text-sm text-ten cursor-pointer'>Ista</Link>
        </div>
    );
}

export default Menubar;
