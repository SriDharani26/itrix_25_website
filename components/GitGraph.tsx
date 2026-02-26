import React from 'react';
import { domains } from '@/utils/NavbarUtils';

const GitGraph = () => {
    return (
        <div className='flex flex-col gap'>
            {domains.map((domain, idx) => (
                <div 
                    key={idx}
                    className='flex gap-4 turncate'
                >
                    <div className='flex flex-col items-center w-4'>
                        <div className='w-4 h-4 rounded-2xl border-4'/>
                        <div className='h-5 border w-0'/>
                    </div>
                    {domain}
                </div>
            ))}
        </div>
    );
}

export default GitGraph;
