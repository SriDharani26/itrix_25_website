'use client'
import Countdown from "@/components/Countdown";
import { Eye } from 'lucide-react';
import SponsorCard from "@/components/SponsorCard";
import { sponsorData } from "@/utils/sponsorDetails";

export default function Home() {

	
	return (
		<div className="p-4 min-h-screen w-full gap-10 pb-20 flex flex-col">

			{/* Home */}
			<div className="w-full min-h-screen flex flex-col gap-8 items-center justify-center">
				<pre className="text-seven font-mono leading-tight drop-shadow-[0_0_6px_#7DCFFF] 
								text-[8px] min-[375px]:text-[9px] min-[450px]:text-xs
								min-[600px]:text-[15px] min-lg:text-lg">
{
`██╗ ████████╗ ██████╗  ██╗ ██╗  ██╗    ██████╗  ██████╗
██║ ╚══██╔══╝ ██╔══██╗ ██║ ╚██╗██╔╝    ╚═══██╗  ██╔═══╝
██║    ██║    ██████╔╝ ██║  ╚███╔╝     █████╔╝  ███████╗
██║    ██║    ██╔══██╗ ██║  ██╔██╗     ██╔═══╝  ██╚══██║
██║    ██║    ██║  ██║ ██║ ██╔╝ ██╗    ███████╗ ███████║
╚═╝    ╚═╝    ╚═╝  ╚═╝ ╚═╝ ╚═╝  ╚═╝    ╚══════╝ ╚══════╝`}
				</pre>
				<p className="text-nine font-bold text-4xl">March 26-28</p>   
				<Countdown targetDate="2026-03-26T00:00:00" />
			</div>


			{/* About us  */}
			<div id="about" className="flex gap-5 max-w-5xl mx-auto items-center flex-col" >
				<p className="text-3xl text-six font-bold">About Us</p>
	
				<p className="text-lg">
					<span className="text-base sm:text-xl text-ten font-bold">ITRIX </span> stands as Anna University&apos;s Department of Information Science and 
					Technology&apos;s flagship inter-college symposium, held annually in March at the College of Engineering, Guindy. 
					With a robust turnout of nearly 4000 participants, ITRIX serves as a melting pot of talent and ideas, 
					offering a diverse array of technical and non-technical events, workshops, and competitions. 
					Our mission is to inspire, challenge, and empower the brightest minds from across the country, 
					testing the limits of knowledge, creativity, and 
					innovation in the ever-evolving landscape of Information Science and Technology.
				</p>
				<a 
					href="/Itrix_26_brochure.pdf"
					className="bg-twelve p-2 rounded-sm cursor-pointer text-two flex items-center gap-2"
				>
					<Eye />
					<span>Download Brouchure</span>
				</a>
			</div>

			{/* Sponsors  */} 
			<div id="sponsor" className="flex gap-10 items-center flex-col overflow-hidden mt-15" >
				<p className="text-3xl text-six font-bold">Our Sponsors</p>
				<div className="w-full flex overflow-hidden animate-scroll-left">
					{[...sponsorData, ...sponsorData, ...sponsorData].map((s, idx) => (
						<div key={idx} className="mx-4">
							<SponsorCard name={s.name} imgPath={s.imgPath} title={s.title}/>
						</div>
					))}
				</div>

			</div>

			{/* Accomadation  */}
			<div id="accomodation" className="flex gap-5 max-w-5xl mx-auto items-center flex-col mt-15" >
				<p className="text-3xl text-six font-bold">Accomadation</p>
				<p>Details we will be announced soon</p>
			</div>
		</div>
	);
}
