import Image from 'next/image';
import React from 'react';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

interface propsType {
    path ?: string | null | undefined,
    name : string,
    profile : string | null | undefined,
    position ?: string
}

const ProfileCard = (props : propsType) => {
    return (
        <div className='flex flex-col items-center mx-2'>
            
            <div className='h-6 border-2 w-px border-twelve'/>

            <div
                className='w-68 rounded-2xl bg-2-cp
                        flex flex-col items-center gap-3 p-4 border-2 border-three bg-two/50'
            >
                <Image 
                    src={props.path ?? '/vercel.svg'}
                    alt="Profile"
                    width={250}
                    height={250}
                    className=' border rounded-2xl'
                />

                <p className='text-xl font-semibold text-five'>{props.name}</p>
                {props.position && <p className='text-lg font-bold color-3-cp'>{props.position}</p> }
                
                {props.profile && 
                    <Link href={props.profile}>
                        <Linkedin className='text-eleven'/>
                    </Link>
                }
            </div>
        </div>
    );
}

export default ProfileCard;