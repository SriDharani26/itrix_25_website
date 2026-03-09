import React from 'react';
import TeamPageHelper from '@/components/TeamPage';

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
    position?:string

};

const sections : Array<sectionType> = [
    {
        id: "Coordinators",
        title: "Deputy Coordinators",
        profiles: []
    },
    {
        id: "events",
        title: "Events",
        profiles: []
    },
    {
        id: "marketin-and-media",
        title: "Marketing and Media",
        profiles: []
    },
    {
        id: "web-development",
        title: "Web Development",
        profiles: []
    },
    {
        id: "design",
        title: "Design",
        profiles: []
    },
    {
        id: "external-relations",
        title: "External Relations",
        profiles: []
    },
    {
        id: "courses",
        title: "Courses",
        profiles: []
    },
    {
        id: "contents",
        title: "Contents",
        profiles: []
    },
    {
        id: "placement-training-coordinators",
        title: "Placement Training Coordinators",
        profiles: []
    },
    {
        id: "internship-training-coordinators",
        title: "Internship Training Coordinators",
        profiles: []
    },
    {
        id: "logistics",
        title: "Logistics",
        profiles: []
    },
];

const Page = async() => {

    const res = await fetch("http://localhost:3000/api/forms?position=deputies", {
        cache: "no-store",
    })

    const data = await res.json()
    const updatedSections = sections.map((sec) => ({
        ...sec,
        profiles : data.filter((d : peopleType) => d.domain.toLowerCase() === sec.title.toLowerCase())
    }))

    return (
        <TeamPageHelper sections={updatedSections} />
    );
}

export default Page;