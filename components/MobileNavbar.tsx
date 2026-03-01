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
import usePageStore from "@/stores/pageStore";

const MobileNavbar = () => {
    const [openEventsExplorer ,setOpenEventsExplorer] = useState<boolean>(false);
    const [showExplorer, setShowExplorer] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<ActiveTabType[]>(defaultActiveTab)
    const updatePageStore = usePageStore((state) => state.update)
    
    
    return (
        <div className="h-full w-full flex flex-col-reverse backdrop-blur-3xl 
                        border-t border-three">
            <div className="w-full h-14 bg-one border-r border-three flex items-center gap-8 px-4 max-[320px]:gap-4">
                <Link type="button" className="text-seven" 
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setOpenEventsExplorer(false);
                            setActiveTab(prev => changeActiveTab(prev, 'Explorer', setShowExplorer))
                            updatePageStore('Home', '/')
                        }}
                        href="/">
                    <Files size={24} />
                </Link>
                <Link href='/contact' className="text-seven"
                    onClick={() => {
                        setShowExplorer(false)
                        updatePageStore('Contact', '/contact')
                    }}
                >
                    <Search size={24}/>
                </Link>
                <Link className="text-seven" 
                        href="/team"
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setActiveTab(prev => changeActiveTab(prev, 'Team', setShowExplorer))
                            updatePageStore('Team', '/team')
                        }}
                >
                    <GitBranch size={24}/>
                </Link>
                <Link href='/events' className=" text-seven" 
                        onClick={() => {
                            setShowExplorer(prev => !prev)
                            setActiveTab(prev => changeActiveTab(prev, 'Events', setShowExplorer))
                            updatePageStore('Events', '/events')
                        }}
                >
                    <MdOutlineEmojiEvents size={24} />
                </Link>
                <Link href='/chatbot' className=" text-seven"
                    onClick={() => {
                        setShowExplorer(false)
                        updatePageStore('Chatbot', '/chatbot')
                    }}
                >
                    <BsRobot size={24}/>
                </Link>
                <button type="button" className="ml-auto text-seven">
                    <Settings size={24} />
                </button>
            </div>

            
            {showExplorer && (
                <div className="flex flex-col bg-one/10 overflow-y-scroll max-h-[500px] backdrop-blur-xl p-2">
                    {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Explorer' &&
                        <Explorer setShowExplorer={setShowExplorer} />
                    }

                    {activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Team' &&
                        <GitGraph setShowExplorer={setShowExplorer} />
                    }
                </div>
            )}

            {showExplorer &&
    activeTab[activeTab.findIndex(obj => obj.isActive === true)].page === 'Events' && (
        <div className="flex flex-col bg-one/10 overflow-y-scroll max-h-[500px] backdrop-blur-xl p-2">

            <div
                onClick={() => setOpenEventsExplorer(prev => !prev)}
                className="cursor-pointer p-4 bg-one/20 hover:bg-one/30 
                           rounded-md border border-three transition-all 
                           flex items-center justify-between"
            >
                <h2 className="text-seven font-semibold text-lg">
                    Events Explorer
                </h2>
                <span
                    className={`text-six text-sm transition-transform duration-200 ${
                        openEventsExplorer ? "rotate-90" : ""
                    }`}
                >
                    ▶
                </span>
            </div>

            {openEventsExplorer && (
                <div className="mt-2">
                    <EventsTab setShowExplorer={setShowExplorer} />
                </div>
            )}

        </div>
    )
}

        </div>
    );
}

export default MobileNavbar;

