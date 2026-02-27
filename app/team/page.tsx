import TeamPageHelper from '@/components/TeamPage';
import React from 'react';

type sectionType = {
    id : string,
    title : string,
    profiles : Array<number>
}

const sections : Array<sectionType>= [
    {
        id: "staff",
        title: "Staff Coordinators",
        profiles: [1, 2]
    },
    {
        id: "core",
        title: "Core",
        profiles: [1, 2, 3]
    },
];

const Page = () => {
    return (
        <TeamPageHelper sections={sections} path='Heads'/>        
    );
}

export default Page;