import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { PageLinks } from "../utils/navBarUtils";
import { Link, useLocation } from "react-router";



const MobileNavbar = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const location = useLocation()

    const getName = (path : string) : string =>  {
        return path.toLowerCase()
    }

    return (
        <div className="w-full h-12 flex items-center px-3 ">
            <div>
                <Menu
                    className='cursor-pointer'
                    onClick={() => setMenuOpen(prev => !prev)}
                />
            </div>

            {menuOpen && 
                <div 
                    className='fixed inset-0 z-50 bg-black/30 flex flex-col gap-4 backdrop-blur-2xl globe'
                >
                    <X 
                        onClick={() => setMenuOpen(prev => !prev)}
                        className='cursor-pointer absolute right-4 top-4'
                    />

                    <div
                        className='w-full h-full flex flex-col gap-4 justify-center items-center text-2xl'
                    >
                        {PageLinks.map((page, idx) => (
                            <Link
                                key={idx} 
                                to={page.path}
                                onClick={() => setMenuOpen(prev => !prev)}
                                className={getName(page.path) === location.pathname ? 'underline' : ''}
                            >
                                {page.name}
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default MobileNavbar;
