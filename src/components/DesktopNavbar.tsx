import { Link, useLocation } from "react-router";
import { PageLinks } from "../utils/navBarUtils";

const DesktopNavbar = () => {

    const location = useLocation()

    const getName = (path : string) : string =>  {
        return path.toLowerCase()
    }

    return (
        <div className="w-full h-16 flex justify-center py-1 px-3 border">

            <div className="w-full h-full bg-black/30 rounded-2xl flex items-center px-2">
                <div className="w-[30%] ml-4">
                    ITRIX 26
                </div>

                <div className="w-[70%] flex gap-4 justify-center">
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
