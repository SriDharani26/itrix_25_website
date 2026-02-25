'use client'
import { ChevronDown, ChevronRight, Files, Search, GitBranch, Settings, House} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { BsRobot } from "react-icons/bs";

type Page = {
    name: string;
    path: string;
    icon : React.ReactNode
};

const MobileNavbar = () => {
      const pages: Page[] = [
        { name: "Home", path: "/", icon : <House/> },
        { name: "About us", path: "/#about", icon : <House/> },
        { name: "Sponsors", path: "/#sponsor", icon : <House/> },
        { name: "Accommodation", path: "/#accomodation", icon : <House/> },
    ];

    const [showPages, setShowPages] = useState<boolean>(true);
    const [showExplorer, setShowExplorer] = useState<boolean>(false)
    
    return (
        <div className="h-full w-full flex flex-col-reverse bg-black/30 backdrop-blur-3xl text-[#cccccc] 
                        border-t border-white/50">
            <div className="w-full h-14 bg-black/50 border-r border-[#2f2f2f] flex items-center gap-8 px-4 max-[320px]:gap-4">
                <Link type="button" className="text-[#c5c5c5]" 
                        onClick={() => setShowExplorer(prev => !prev)}
                        href="/">
                    <Files size={24} />
                </Link>
                <button type="button" className="text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    <Search size={24}/>
                </button>
                <Link type="button" className="text-[#858585] hover:text-[#c5c5c5] transition-colors" href="/team">
                    <GitBranch size={24}/>
                </Link>
                <button type="button" className=" text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    <MdOutlineEmojiEvents size={24} />
                </button>
                <button type="button" className=" text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    <BsRobot size={24}/>
                </button>
                <button type="button" className="ml-auto text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    <Settings size={24} />
                </button>
            </div>

            {showExplorer && 
                <div className="flex flex-col bg-black/10 overflow-y-scroll max-h-[700px] backdrop-blur-xl p-2">
                    <p className="text-[11px] uppercase tracking-wide text-[#8f8f8f] px-2 pb-2">Explorer</p>

                    {/* Pages  */}
                    <button
                        type="button"
                        className="w-full cursor-pointer px-2 py-1.5 flex items-center gap-1 hover:bg-white/10 rounded text-left mb-2"
                        onClick={() => setShowPages((prev) => !prev)}
                    >
                        {showPages ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        <span className="text-md font-semibold uppercase tracking-wide">Pages</span>
                    </button>
                    <div className={`${showPages ? "flex" : "hidden"} flex-col gap-1`}>
                        {pages.map((page) => (
                            <Link
                                key={page.name}
                                href={page.path}
                                className="block ml-5 px-2 py-1.5 text-md rounded transition-colors border-transparent hover:bg-white/2"
                                onClick={() => setShowExplorer(false)}
                            >
                                <span className="flex gap-2 items-center">
                                    {page.icon}{page.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            } 

        </div>
    );
}

export default MobileNavbar;
