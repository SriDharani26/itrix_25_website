'use client'
import { Files, Search, GitBranch, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { ActiveTabType, changeActiveTab, defaultActiveTab, Page } from "@/utils/NavbarUtils";
import GitGraph from "./GitGraph";
import Explorer from "./Explorer";
import EventsTab from "./EventsTab";

const MobileNavbar = () => {
    
    const [showExplorer, setShowExplorer] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<ActiveTabType[]>(defaultActiveTab)
    
    
    return (
        <div className="h-full w-full flex flex-col-reverse backdrop-blur-3xl 
                        border-t border-three">
            <div className="w-full h-14 bg-one border-r border-three flex items-center gap-8 px-4 max-[320px]:gap-4">
                <Link type="button" className="text-seven" 
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setActiveTab(prev => changeActiveTab(prev, 'Explorer', setShowExplorer))
                        }}
                        href="/">
                    <Files size={24} />
                </Link>
                <Link href='/contact' className="text-seven"
                    onClick={() => setShowExplorer(false)}
                >
                    <Search size={24}/>
                </Link>
                <Link className="text-seven" 
                        href="/team"
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setActiveTab(prev => changeActiveTab(prev, 'Team', setShowExplorer))
                        }}
                >
                    <GitBranch size={24}/>
                </Link>
                <Link href='/events' className=" text-seven" 
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setActiveTab(prev => changeActiveTab(prev, 'Events', setShowExplorer))
                        }}
                >
                    <MdOutlineEmojiEvents size={24} />
                </Link>
                <Link href='/chatbot' className=" text-seven"
                    onClick={() => setShowExplorer(false)}
                >
                    <BsRobot size={24}/>
                </Link>
                <button type="button" className="ml-auto text-seven">
                    <Settings size={24} />
                </button>
            </div>

            {showExplorer && 
                <div className="flex flex-col bg-one/10 overflow-y-scroll max-h-[500px] backdrop-blur-xl p-2">

                    {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Explorer' && <Explorer setShowExplorer={setShowExplorer}/> }

                    {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Team' && <GitGraph setShowExplorer={setShowExplorer}/> }

                    {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Events' && <EventsTab/> }
                </div>
            } 

        </div>
    );
}

export default MobileNavbar;
