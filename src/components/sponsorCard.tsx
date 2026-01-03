import React from 'react';

interface sponsorProps{
    img : string,
    name : string,
    type : string
}

const SponsorCard : React.FC<sponsorProps> = (props) => {
    return (
        <div className='flex flex-col w-[250px] h-[250px] border border-white/10 bg-white/5 backdrop-blur-2xl
                        shadow-2xl items-center justify-center rounded-xl'>
            <img 
                src={props.img}
                className='w-[95%] h-[70%]' 
                alt="sponsor-image" 
            />
            <p className='text-xl font-bold'>{props.name}</p>
            <p className='text-sm font-light'>{props.type}</p>
        </div>
    );
}

export default SponsorCard;
