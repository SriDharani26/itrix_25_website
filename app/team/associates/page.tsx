import React from 'react';
import TeamPageHelper from '@/components/TeamPage';

type sectionType = {
    id : string,
    title : string,
    profiles : Array<number>
}

const sections : Array<sectionType> = [
    {
        id: "events",
        title: "Events",
        profiles: [1, 2, 3]
    },
    {
        id: "marketin-and-media",
        title: "Marketing & Media",
        profiles: [1, 2, 3, 4]
    },
    {
        id: "web-development",
        title: "Web Development",
        profiles: [1, 2, 3, 4]
    },
    {
        id: "design",
        title: "Design",
        profiles: [1, 2, 3, 4]
    },
    {
        id: "external-relations",
        title: "External Relations",
        profiles: [1, 2]
    },
    {
        id: "courses",
        title: "Courses",
        profiles: [1, 2, 3]
    },
    {
        id: "contents",
        title: "Contents",
        profiles: [1, 2]
    },
    {
        id: "placement-training-coordinators",
        title: "Placement Training Coordinators",
        profiles: [1, 2]
    },
    {
        id: "internship-training-coordinators",
        title: "Internship Training Coordinators",
        profiles: [1, 2]
    },
    {
        id: "logistics",
        title: "Logistics",
        profiles: [1, 2]
    },
];

const Page = () => {
    return (
        <TeamPageHelper sections={sections} path='Deputies' />
    );
}

export default Page;