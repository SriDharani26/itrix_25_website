import TeamPageHelper from '@/components/TeamPage';
import React from 'react';

type sectionType = {
    id : string,
    title : string,
    profiles : Array<peopleType>
}

type peopleType = {
    name: string;
    profile: string | undefined | null;
    image: string | undefined | null;
    domain : string;
    position ?: string
};

const sections : Array<sectionType>= [
    {
        id: "staff",
        title: "Staff Coordinators",
        profiles: []
    },
    {
        id: "core",
        title: "Core",
        profiles: []
    },
];

const Page = async () => {
    const res = await fetch("http://localhost:3000/api/forms?position=heads", {
        cache: "no-store",
    })

    const data = await res.json()
    const updatedSections = sections.map((sec) => ({
        ...sec,
        profiles : data.filter((d : peopleType) => d.domain.toLowerCase() === sec.title.toLowerCase())
    }))

    updatedSections[0].profiles = [
            {name : "Dr. M. Vijayalakshmi", image : 'https://lh3.googleusercontent.com/d/1L7zUH-YCWf8QIanFEGeAGB_BEvWqCAS6', profile : null, domain : '', position : "President"},
            {name : "Dr. K. Vidya", image : 'https://lh3.googleusercontent.com/d/1FLKWVAhD1kU3jwtICKn24vRMnbb3T9U4', profile : null, domain : '', position : "Staff Treasurer"}
    ]
    updatedSections[1].profiles[0].position = "Chair Person"
    updatedSections[1].profiles[1].position = "Overall Coordinator"
    return (
        <TeamPageHelper sections={updatedSections} path='Heads'/>        
    );
}

export default Page;