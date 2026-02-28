'use client'
import { Files, Search, GitBranch, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import GitGraph from "./GitGraph";
import { ActiveTabType, changeActiveTab, defaultActiveTab } from "@/utils/NavbarUtils";
import Explorer from "./Explorer";
import EventsTab from "./EventsTab";

const Navbar = () => {

    const [activeTab, setActiveTab] = useState<ActiveTabType[]>(defaultActiveTab)

    return (
        <aside className="h-full w-full flex backdrop-blur-3xl border-r border-three">
            <div className="w-16 border-r flex flex-col items-center py-3 gap-8 bg-one border-three">
                <Link className="text-seven"
                        href='/'
                        onClick={() => setActiveTab(prev => changeActiveTab(prev, 'Explorer'))}
                >
                    <Files size={24} />
                </Link>
                <Link className="text-seven"
                        href='/contact'
                >
                    <Search size={24}/>
                </Link>
                <Link className="text-seven" 
                        href='/team'
                        onClick={() => setActiveTab(prev => changeActiveTab(prev, 'Team'))}
                >
                    <GitBranch size={24}/>
                </Link>
                <Link href='/events' className="text-seven"
                        onClick={() => setActiveTab(prev => changeActiveTab(prev, 'Events'))}
                >
                    <MdOutlineEmojiEvents size={24} />
                </Link>
                <Link className="text-seven"
                        href='/chatbot'
                >
                    <BsRobot size={24}/>
                </Link>
                <button type="button" className="mt-auto text-seven ransition-colors">
                    <Settings size={24} />
                </button>
            </div>

            <div className="flex-1 p-2 overflow-y-scroll  no-scrollbar">
                

                {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Explorer' && <Explorer/> }

                {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Team' && <GitGraph/>}

                {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Events' && <EventsTab/> }
            </div>
        </aside>
    );
};

export default Navbar;
