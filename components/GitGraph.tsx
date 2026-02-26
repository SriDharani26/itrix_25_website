import React from 'react';
import { domains } from '@/utils/NavbarUtils';

const GitGraph = () => {
    return (
        <div className='flex flex-col p-2'>
            
            <p className="text-[11px] uppercase tracking-wide text-[#8f8f8f] px-2 pb-2">Team</p>

            {domains.map((domain, idx) => (
                <div 
                    key={idx}
                    className='flex gap-4 h-18 items-start cursor-pointer'
                >
                    <div className='flex flex-col items-center w-4'>
                        <div className='w-4 h-4 rounded-2xl border-4'/>
                        {idx !== domains.length - 1 &&  <div className='h-14 border w-0'/> }
                    </div>
                    <div className='underline'>
                        {domain}
                    </div>
                </div>
            ))} 
        </div>
    );
}

export default GitGraph;
