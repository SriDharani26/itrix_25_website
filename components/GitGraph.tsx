'use client'
import React from 'react';
import { domains } from '@/utils/NavbarUtils';
import Link from 'next/link';

const GitGraph = () => {
    return (
        <div className='flex flex-col p-2'>
            
            <p className="text-[11px] uppercase tracking-wide text-[#8f8f8f] px-2 pb-2">Team</p>

            {domains.map((domain, idx) => (
                <div 
                    key={idx}
                    className='flex gap-4 h-18 items-start '
                >
                    <div className='flex flex-col items-center w-4'>
                        <Link
                            href={`/team/${domain.path}`}
                            className='w-4 h-4 rounded-2xl border-4 bg-black cursor-pointer'/>
                        {idx !== domains.length  &&  <div className='h-14 border w-0'/> }
                    </div>
                    <div className='underline flex flex-col gap-2'>
                        <p className='max-w-32 truncate text-xs'>
                            {domain.name}
                        </p>
                        
                        {idx > 2 && 
                            <div className='flex items-center relative -left-6'>
                                <div className='w-8 border h-0'/> 
                                {['heads', 'associates', 'deputies'].map((role, idx) => (
                                    <div key={idx} className='flex items-center'>
                                        <Link
                                            href={`/team/${domain.path}-${role}`}
                                            className='w-4 h-4 rounded-2xl border-4 bg-black cursor-pointer'/>
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
