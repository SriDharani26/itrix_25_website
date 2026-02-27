'use client'
import React from 'react';
import { domains } from '@/utils/NavbarUtils';
import Link from 'next/link';

interface propsType {
    setShowExplorer ?: React.Dispatch<React.SetStateAction<boolean>>
}

const GitGraph = ({
    setShowExplorer
}:propsType) => {
    return (
        <div className='flex flex-col p-2'>
            
            <p className="text-[11px] uppercase tracking-wide text-[#8f8f8f] px-2 pb-2">Team</p>

            {domains.map((domain, idx) => (
                <div 
                    key={idx}
                    className='flex gap-4 min-h-16 items-start '
                >
                    <div className='flex flex-col items-center self-stretch w-4'>
                        <Link
                            href={`${domain.path === '#coordinators' ? `/team/deputies/${domain.path}`: `/team/${domain.path}`}`}
                            className='w-4 h-4 rounded-2xl border-4 bg-black cursor-pointer'
                            onClick={() => { if(setShowExplorer) setShowExplorer(false) }}
                        />
                        {idx !== domains.length  &&  <div className='flex-1 border w-0'/> }
                    </div>
                    <div className='underline flex flex-col gap-2'>
                        <p className='text-md'>
                            {domain.name}
                        </p>
                        
                        {idx > 2 && 
                            <div className='flex items-center relative -left-6'>
                                <div className='w-8 border h-0'/> 
                                {['heads', 'associates', 'deputies'].map((role, idx) => (
                                    <div key={idx} className='flex items-center'>
                                        <Link
                                            href={`/team/${role}/${domain.path}`}
                                            className='w-4 h-4 rounded-2xl border-4 bg-black cursor-pointer'
                                            onClick={() => { if(setShowExplorer) setShowExplorer(false) }}
                                        />
                                        {idx !== 2 && <div className='w-6 border h-0'/> }
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            ))} 
        </div>
    );
}

export default GitGraph;
