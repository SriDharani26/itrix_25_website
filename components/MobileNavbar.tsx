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
        <div className="h-full w-full flex flex-col-reverse bg-black/30 backdrop-blur-3xl text-[#cccccc] 
                        border-t border-white/50">
            <div className="w-full h-14 bg-black/50 border-r border-[#2f2f2f] flex items-center gap-8 px-4 max-[320px]:gap-4">
                <Link type="button" className="text-[#c5c5c5]" 
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setActiveTab(prev => changeActiveTab(prev, 'Explorer', setShowExplorer))
                        }}
                        href="/">
                    <Files size={24} />
                </Link>
                <Link href='/contact' className="text-[#858585] hover:text-[#c5c5c5] transition-colors"
                    onClick={() => setShowExplorer(false)}
                >
                    <Search size={24}/>
                </Link>
                <Link className="text-[#858585] hover:text-[#c5c5c5] transition-colors" 
                        href="/team"
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setActiveTab(prev => changeActiveTab(prev, 'Team', setShowExplorer))
                        }}
                >
                    <GitBranch size={24}/>
                </Link>
                <Link href='/events' className=" text-[#858585] hover:text-[#c5c5c5] transition-colors" 
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setActiveTab(prev => changeActiveTab(prev, 'Events', setShowExplorer))
                        }}
                >
                    <MdOutlineEmojiEvents size={24} />
                </Link>
                <Link href='/chatbot' className=" text-[#858585] hover:text-[#c5c5c5] transition-colors"
                    onClick={() => setShowExplorer(false)}
                >
                    <BsRobot size={24}/>
                </Link>
                <button type="button" className="ml-auto text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    <Settings size={24} />
                </button>
            </div>

            {showExplorer && 
                <div className="flex flex-col bg-black/10 overflow-y-scroll max-h-[700px] backdrop-blur-xl p-2">

                    {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Explorer' && <Explorer setShowExplorer={setShowExplorer}/> }

                    {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Team' && <GitGraph/> }

                    {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Events' && <EventsTab/> }
                </div>
            } 

        </div>
    );
}

export default MobileNavbar;
