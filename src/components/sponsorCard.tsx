import React from 'react';

interface sponsorProps{
    img : string,
    name : string,
    type : string
}

const SponsorCard : React.FC<sponsorProps> = (props) => {
    return (
        <div className='p-2 flex flex-col w-[250px] h-[250px] border border-[#d9ffea]/10 backdrop-blur-2xl
                        shadow-2xl items-center justify-center rounded-xl
                        bg-gradient-to-tr from-[#d9ffea]/30 via-[#d9ffea]/20 to-[#d9ffea]/30
                        '>
            <img 
                src={props.img}
                className='w-[95%] h-[70%]' 
                alt="sponsor-image" 
            />
            <p className='text-xl font-bold text3 monday'>{props.name}</p>
            <p className='text-md text2'>{props.type}</p>
        </div>
    );
}

export default SponsorCard;
