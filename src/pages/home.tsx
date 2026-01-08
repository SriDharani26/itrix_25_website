import SponsorCard from "../components/sponsorCard";
import Animation from "../components/Animation";
import Countdown from "../components/countdown";
const Home = () => {
    return (
        <div
            className="h-screen"
        >
            {/* Title */}

            <div className="relative flex flex-col h-full">
                <div className="h-full">
                    <Animation />
                </div>
                <div className="absolute z-20 inset-0 flex flex-col gap-16 justify-center items-center ">
                    <div className="text-black/70 flex flex-col gap-16 justify-center items-center p-6 bg-transparent backdrop-blur-[1px] h-full max-md:w-full">

                        <p className="max-[350px]:text-3xl text-6xl md:text-7xl lg:text-8xl">ITRIX'26</p>
                        <p className="max-[350px]:text-2xl text-4xl lg:text-5xl">February 22-24</p>
                        <Countdown targetDate="2026-02-10T00:00:00" />
                    </div>

                </div>
            </div>
               
            {/* About  */}
            <div className="my-10 flex flex-col gap-8 justify-center items-center">
                <p
                    className="text-center text-3xl font-bold text3 underline"
                >ABOUT</p>
                <div
                    className="p-4 md:p-6 flex flex-col gap-4 items-center md:flex-row md:w-[90%] lg:w-[75%]
                                bg-gradient-to-tr from-[#d9ffea]/30 via-[#d9ffea]/20 to-[#d9ffea]/30 
                                rounded-2xl backdrop-blur-2xl shadow-2xl"
                >
                    <img 
                        src="/itrix-about.png" alt="ITRIX-IMAGE" 
                        className="w-[350px] h-87.5"
                    />
                    <p className="text-lg p-2">
                        <span className="font-bold text3 text-2xl">ITRIX</span> stands as Anna University's Department of Information Science and Technology's flagship 
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
            <div className="my-10 flex flex-col gap-8 justify-center items-center">
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
