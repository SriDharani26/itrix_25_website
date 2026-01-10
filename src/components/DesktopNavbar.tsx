import { Link, useLocation } from "react-router";
import { PageLinks } from "../utils/navBarUtils";

const DesktopNavbar = () => {

    const location = useLocation()

    const getName = (path : string) : string =>  {
        return path.toLowerCase()
    }

    return (
        <div className="fixed z-50 w-full h-16 flex justify-center py-1 px-3">

            <div className="w-[95%] h-full rounded-2xl flex items-center px-2 backdrop-blur-[90px] 
                            bg-gradient-to-r from-[#d9ffea]/20 via-[#d9ffea]/10 to-[#d9ffea]/20">
                <div className="w-[30%] ml-4 globe">
                    ITRIX <span className="numfont">26</span>
                </div>

                <div className="w-[70%] flex gap-4 justify-center text-lg globe">
                    {PageLinks.map((page, idx) => (
                        <Link
                            key={idx} 
                            to={page.path}
                            className={getName(page.path) === location.pathname ? 'underline' : ''}
                        >
                            {page.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DesktopNavbar;
