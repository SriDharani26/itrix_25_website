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
                <div key={section.id} className="flex gap-6 ">

                    <div className="flex flex-col items-center w-6">

                        <div className="w-4 h-4 rounded-full border-4 bg-black z-10 border-six" />

                        {idx !== props.sections.length && (
                            <div className="flex-1 w-px border-2 rounded-2xl bg-transparent backdrop-blur-2xl border-twelve" />
                        )}

                    </div>

                    <div
                        id={section.id}
                        className="flex flex-col pb-12"
                    >
                        <p className="text-xl font-semibold mb-4 text-ten">
                            {section.title}
                        </p>

                        <div className='border-2 rounded-r-2xl relative -left-8.5 border-twelve'/>
                        
                        <div className="flex flex-wrap">
                            {section.profiles.map((_, i) => (
                                <ProfileCard
                                    key={i}
                                    name="Gogul"
                                    profile="hello"
                                    position="President"
                                />
                            ))}
                        </div>

                    </div>
                </div>
            ))}

            {props.path && <Link 
                className='text-3xl font-bold italic mt-2 text-ten'
                href={`/team/${props.path.toLowerCase()}`}
            >{props.path}</Link>}
        </div>
    );
}

export default TeamPageHelper;