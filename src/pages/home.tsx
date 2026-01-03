import SponsorCard from "../components/sponsorCard";
import Animation from "../components/Animation";
const Home = () => {
    return (
        <div
            className="h-screen"
        >
            {/* Title */}

            <div className="relative flex flex-col min-h-screen">
                <div className="h-screen">
                    <Animation />
                </div>
                <div className="absolute z-50 inset-0 bg-white/10 ">
                    <p className="text-6xl">ITRIX</p>
                    <p className="text-6xl">ITRIX</p>
                    <p className="text-6xl">ITRIX</p>
                    <p className="text-6xl">ITRIX</p>

                </div>
            </div>
               
            {/* About  */}
            <div className="mt-4 flex flex-col justify-center items-center">
                <p
                    className="text-center text-3xl font-bold"
                >ABOUT</p>
                <div
                    className="p-4 flex flex-col gap-4 items-center md:flex-row md:w-[90%] lg:w-[75%]"
                >
                    <img 
                        src="/itrix-about.png" alt="ITRIX-IMAGE" 
                        className="w-[350px] h-87.5"
                    />
                    <p className="text-lg p-2">
                        <span className="font-bold text-xl">ITRIX</span> stands as Anna University's Department of Information Science and Technology's flagship 
                        inter-college symposium, held annually in March at the College of Engineering, Guindy. 
                        With a robust turnout of nearly 4000 participants, ITRIX serves as a melting pot of talent and ideas, 
                        offering a diverse array of technical and non-technical events, workshops, and competitions. 
                        Our mission is to inspire, challenge, and empower the brightest minds from across the country, 
                        testing the limits of knowledge, creativity, and innovation in the ever-evolving landscape of 
                        Information Science and Technology.
                    </p>
                   
                </div>
            </div>
            {/* Sponsors */}
            <div className="mt-4 flex flex-col justify-center items-center">
                <p
                    className="text-center text-3xl font-bold"
                >SPONSORS</p>

                <div className="w-full md:w-[70%] lg:w-[80%]
                                flex flex-wrap p-4 justify-center gap-4">
                    <SponsorCard img='/sponsor/unstop.png' name="Unstop" type="platform-sponsor"/>
                    <SponsorCard img='/sponsor/unstop.png' name="Unstop" type="platform-sponsor"/>
                    <SponsorCard img='/sponsor/unstop.png' name="Unstop" type="platform-sponsor"/>
                </div>
            </div>
        </div>
    );
}

export default Home;
