import Image from 'next/image';
import React from 'react';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

interface propsType {
    path ?: string,
    name : string,
    profile : string,
    position : string
}

const ProfileCard = (props : propsType) => {
    return (
        <div className='flex flex-col items-center mx-2'>
            
            <div className='h-6 border-2 w-px border-twelve'/>

            <div
                className='w-68 rounded-2xl bg-2-cp
                        flex flex-col items-center gap-3 p-4'
            >
                <Image 
                    src={props.path ?? '/vercel.svg'}
                    alt="Profile"
                    width={150}
                    height={150}
                    className=' border'
                />

                <p className='text-xl font-semibold text-five'>{props.name}</p>
                {/* <p className='text-lg font-bold color-3-cp'>{props.position}</p> */}
                
                <Link href={props.profile}>
                    <Linkedin className='text-eleven'/>
                </Link>
            </div>
        </div>
    );
}

export default ProfileCard;