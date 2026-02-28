import React, {useState} from 'react';
import { ChevronDown, ChevronRight, House } from "lucide-react";
import Link from 'next/link';
import { Page } from '@/utils/NavbarUtils';
import usePageStore from '@/stores/pageStore';

const pages: Page[] = [
    { name: "Home", path: "/", icon : <House/> },
    { name: "About us", path: "/#about", icon : <House/> },
    { name: "Sponsors", path: "/#sponsor", icon : <House/> },
    { name: "Accommodation", path: "/#accomodation", icon : <House/> },
];

interface propsType {
    setShowExplorer ?: React.Dispatch<React.SetStateAction<boolean>>
}

const Explorer = ({
    setShowExplorer
} : propsType ) => {
    
    const [showPages, setShowPages] = useState<boolean>(true);
    const updatePageStore = usePageStore((state) => state.update)

    return (
        <div className='p-2 flex flex-col'>
             <p className="text-[11px] uppercase tracking-wide px-2 pb-2 text-ten">Explorer</p>

            {/* // Pages  */}
            <button
                type="button"
                className="w-full cursor-pointer px-2 py-1.5 flex items-center gap-1 rounded text-left mb-2 text-six"
                onClick={() => setShowPages((prev) => !prev)}
            >
                {showPages ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="text-md font-semibold uppercase tracking-wide ">Pages</span>
            </button>
            <div className={`${showPages ? "flex" : "hidden"} flex-col gap-1`}>
                {pages.map((page) => (
                    <Link
                        key={page.name}
                        href={page.path}
                        className="block ml-5 px-2 py-1.5 text-md rounded transition-colors border-transparent text-five"
                        onClick={() => { 
                                if(setShowExplorer) {
                                    setShowExplorer(false) 
                                }
                                updatePageStore(page.name, page.path)
                            }}
                    >
                        <span className="flex gap-2 items-center">
                            {page.icon}{page.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Explorer;
