'use client'
import { ChevronDown, ChevronRight, Files, Search, GitBranch, Settings, House, Balloon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Page = {
    name: string;
    path: string;
    icon : React.ReactNode
};

const Navbar = () => {
    
    const pages: Page[] = [
        { name: "Home", path: "/", icon : <House/> },
        { name: "About us", path: "/", icon : <House/> },
        { name: "Sponsors", path: "/", icon : <House/> },
        { name: "Acommdation", path: "/", icon : <House/> },
    ];

    const [showPages, setShowPages] = useState<boolean>(true);
    const [showContents, setShowContents] = useState<boolean>(true);

    

    return (
        <aside className="h-full w-full flex bg-black/30 backdrop-blur-3xl text-[#cccccc] border-r border-white/10">
            <div className="w-16 bg-black/50 border-r border-[#2f2f2f] flex flex-col items-center py-3 gap-4">
                <button type="button" className="text-[#c5c5c5]">
                    <Files size={20} />
                </button>
                <button type="button" className="text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    Contact
                </button>
                <button type="button" className="text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    Teams
                </button>
                <button type="button" className=" text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    Events
                </button>
                <button type="button" className=" text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    Chatbot
                </button>
                <button type="button" className="mt-auto text-[#858585] hover:text-[#c5c5c5] transition-colors">
                    <Settings size={20} />
                </button>
            </div>

            <div className="flex-1 p-2">
                {/* <p className="text-[11px] uppercase tracking-wide text-[#8f8f8f] px-2 pb-2">Explorer</p> */}

                 <button
                    type="button"
                    className="w-full cursor-pointer px-2 py-1.5 flex items-center gap-1 hover:bg-white/10 rounded text-left mb-2"
                    onClick={() => setShowContents((prev) => !prev)}
                >
                    {showContents ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span className="text-md font-semibold uppercase tracking-wide">ITRIX 26</span>
                </button>

                {/* All sidebar contents */}
                <div className={`${showContents ? 'flex' : 'hidden'} flex-col pl-2`}>

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
                                className="block ml-5 px-2 py-1.5 text-md rounded transition-colors border-transparent hover:bg-white/20"
                            >
                                <span className="flex gap-2 items-center">
                                    {page.icon}{page.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Navbar;
