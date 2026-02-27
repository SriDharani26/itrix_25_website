import ProfileCard from '@/components/ProfileCard';
import React from 'react';

const sections = [
    {
        id: "Coordinators",
        title: "Coordinators",
        profiles: [1, 2, 3]
    },
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
        <div className="flex flex-col p-6">

            {sections.map((section, idx) => (
                
                <div key={section.id} className="flex gap-6">

                    <div className="flex flex-col items-center w-6">

                        <div className="w-4 h-4 rounded-full border-4 border-[#4EC9B0] bg-black z-10" />

                        {idx !== sections.length - 1 && (
                            <div className="flex-1 w-px bg-[#8f8f8f]" />
                        )}

                    </div>

                    <div
                        id={section.id}
                        className="flex flex-col gap-4 pb-12 flex-1"
                    >
                        <p className="text-xl font-semibold">
                            {section.title}
                        </p>

                        <div className="flex flex-wrap gap-6">
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
        </div>
    );
}

export default Page;