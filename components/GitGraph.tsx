'use client'
import React, { useState } from 'react';
import { domains } from '@/utils/NavbarUtils';
import Link from 'next/link';
import { domainDetails } from '@/utils/NavbarUtils';

interface propsType {
    setShowExplorer ?: React.Dispatch<React.SetStateAction<boolean>>
}

interface showCardType {
    isActive : boolean,
    idx : number
}

const GitGraph = ({
    setShowExplorer
}:propsType) => {

    const[showCard, setShowCard] = useState<showCardType>({isActive : false, idx : 0})

    return (
        <div className='flex flex-col p-2'>
            
            <p className="text-[11px] uppercase tracking-wide px-2 pb-2 text-ten">Team</p>
            {/* {showCard.isActive && 
                <div className='flex flex-col justify-center border rounded-md py-4 px-2 bg-black/20 my-4 border-white/20 transition-all'>
                    <p>{domainDetails[showCard.idx].domainName}</p>
                    <hr className='my-1 text-white/20'/>
                    <p className='text-sm text-white/70'>{domainDetails[showCard.idx].totalCount} Total</p>
                    {domainDetails[showCard.idx].head !== 0 && <p className='text-sm text-white/70' >{domainDetails[showCard.idx].head} Heads</p>} 
                    {domainDetails[showCard.idx].associates !== 0 && <p className='text-sm text-white/70' >{domainDetails[showCard.idx].associates} Associates</p>}
                    {domainDetails[showCard.idx].deputies !== 0 && <p className='text-sm text-white/70' >{domainDetails[showCard.idx].deputies} Deputies</p> }
                </div>
            } */}

            {domains.map((domain, idx) => (
                <div 
                    key={idx}
                    className='flex gap-4 min-h-20 items-start'
                    onMouseEnter={() => setShowCard({isActive : true, idx : idx})}
                    onMouseLeave={() => setShowCard({isActive : false, idx : 0})}
                >
                    <div className='flex flex-col items-center self-stretch w-4'>
                        <Link
                            href={`${idx <= 2 ? domain.path === '#coordinators' ? `/team/deputies/${domain.path}`: `/team/${domain.path}` : '/team'}`}
                            className='w-4 h-4 rounded-2xl border-3  cursor-pointer border-six'
                            onClick={() => { if(setShowExplorer) setShowExplorer(false) }}
                        />
                        {idx !== domains.length  &&  <div className='flex-1 border w-0 border-twelve'/> }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-md text-five'>
                            {domain.name}
                        </p>
                        
                        {idx > 2 && 
                            <div className='flex items-center relative -left-6'>
                                <div className='w-8 border h-0 border-twelve'/> 
                                {['heads', 'associates', 'deputies'].map((role, idx) => (
                                    <div key={idx} className='flex items-center'>
                                        <Link
                                            href={`/team/${role}/${domain.path}`}
                                            className='w-4 h-4 rounded-2xl border-4 bg-black cursor-pointer border-seven'
                                            onClick={() => { if(setShowExplorer) setShowExplorer(false) }}
                                        />
                                        {idx !== 2 && <div className='w-6 border h-0 border-twelve'/> }
                                    </div>
                                ))}
                            </div>
                        }

                         {idx > 2 && 
                            <div className='flex items-center relative gap-8 left-2'>
                                {['H', 'A', 'D'].map((role, idx) => (                                   
                                    <div key={idx} className='flex items-center text-four'>
                                            <p>{role}</p>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            ))} 
            <p className='text-3xl font-semibold italic mt-1 color-1-cp'>{new Date().getFullYear() + 1}</p>
        </div>
    );
}

export default GitGraph;
