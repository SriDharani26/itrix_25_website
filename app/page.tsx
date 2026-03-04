'use client'
import Countdown from "@/components/Countdown";
import Image from "next/image";

export default function Home() {

	
	return (
		<div className="p-4 min-h-screen w-full gap-4 pb-20 flex flex-col">

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
				<Image
					src='/itrix-about-us.png'
					height={350}
					width={350}
					alt="Itrix About Us Image"
				/>
				<p className="text-lg">
					<span className="text-base sm:text-xl text-ten font-bold">ITRIX </span> stands as Anna University's Department of Information Science and 
					Technology's flagship inter-college symposium, held annually in March at the College of Engineering, Guindy. 
					With a robust turnout of nearly 4000 participants, ITRIX serves as a melting pot of talent and ideas, 
					offering a diverse array of technical and non-technical events, workshops, and competitions. 
					Our mission is to inspire, challenge, and empower the brightest minds from across the country, 
					testing the limits of knowledge, creativity, and 
					innovation in the ever-evolving landscape of Information Science and Technology.
				</p>
			</div>

			{/* Sponsors  */} 
			<div id="sponsor" className="flex gap-5 max-w-5xl mx-auto items-center flex-col" >
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ut aliquid saepe, quae hic vero soluta non cupiditate error nobis cum maiores quaerat consequuntur repellendus voluptatibus officiis corrupti aliquam autem!
			</div>

			{/* Accomadation  */}
			{/* <div id="accomodation" className="border">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ut aliquid saepe, quae hic vero soluta non cupiditate error nobis cum maiores quaerat consequuntur repellendus voluptatibus officiis corrupti aliquam autem!
			</div> */}
		</div>
	);
}
