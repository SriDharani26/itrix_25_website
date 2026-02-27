import ProfileCard from '@/components/ProfileCard';
import Link from 'next/link';
import React from 'react';


type sectionType = {
    id : string,
    title : string,
    profiles : Array<number>
}

interface propsType {
    sections : Array<sectionType>,
    path ?: string
}

const TeamPageHelper = (props : propsType) => {
    return (
        <div className="flex flex-col py-6 px-3">

            {props.sections.map((section, idx) => (
                <div key={section.id} className="flex gap-6 overflow-auto no-scrollbar">

                    <div className="flex flex-col items-center w-6">

                        <div className="w-4 h-4 rounded-full border-4 border-[#4EC9B0] bg-black z-10" />

                        {idx !== props.sections.length && (
                            <div className="flex-1 w-px border-2 rounded-2xl border-white/30" />
                        )}

                    </div>

                    <div
                        id={section.id}
                        className="flex flex-col pb-12"
                    >
                        <p className="text-xl font-semibold mb-4">
                            {section.title}
                        </p>

                        
                        <div className="flex gap-6 overflow-auto no-scrollbar">
                            {section.profiles.map((_, i) => (
                                <ProfileCard
                                    key={i}
                                    name="Gogul"
                                    profile="hello"
                                    position="President"
                                />
                            ))}
                        </div>

                        <div className='border-2 rounded-r-2xl flex-1 self-stretch border-white/30 relative -left-8.5'/>
                    </div>
                </div>
            ))}

            {props.path && <Link 
                className='text-3xl font-bold italic mt-2'
                href={`/team/${props.path.toLowerCase()}`}
            >{props.path}</Link>}
        </div>
    );
}

export default TeamPageHelper;