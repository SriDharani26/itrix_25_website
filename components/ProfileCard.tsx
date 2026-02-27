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
        <div
            className='bg-white/10 w-68 rounded-2xl
                       flex flex-col items-center gap-3 p-4'
        >
            <Image 
                src={props.path ?? '/vercel.svg'}
                alt="Profile"
                width={150}
                height={150}
                className=' border'
            />

            <p className='text-lg font-semibold'>{props.name}</p>
            <p className='text-lg font-bold'>{props.profile}</p>
            
            <Link href={props.profile}>
                <Linkedin />
            </Link>
        </div>
    );
}

export default ProfileCard;