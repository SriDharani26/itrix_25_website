import React from 'react';
import Image from 'next/image';
import { type sponsorType } from '@/utils/sponsorDetails';


const SponsorCard = (props : sponsorType) => {
    return (
        <div className='relative w-64 h-80'>
            <div className='border-twelve/20 flex flex-col items-center border p-4 gap-4 rounded-2xl w-64 h-80 justify-center
                            bg-white/5 backdrop-blur-2xl absolute z-10'>
                <Image 
                    src={props.imgPath}
                    width={130}
                    height={130}
                    alt={props.name + ' image'}
                />
                <p className='text-2xl text-ten font-bold text-center'>{props.name}</p>
                <p className='text-lg text-nine font-semibold'>{props.title}</p>
            </div>
            <div className="absolute top-1/2 left-[33%] -translate-x-1/2  w-40 h-35 rounded-t-[50%] bg-twelve/50 z-0 animate-pulse" />
        </div>
    );
}

export default SponsorCard;
