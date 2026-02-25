'use client'
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Home() {

	
	return (
		<div className="p-4 h-full w-full 
						gap-4">

			{/* Home */}
			<div className="border h-full w-full flex items-centeraap">
				<div className="border">
					hi
				</div>
			</div>


			{/* About us  */}
			<div id="about" className="border bg-green-400 h-full " >
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ut aliquid saepe, quae hic vero soluta non cupiditate error nobis cum maiores quaerat consequuntur repellendus voluptatibus officiis corrupti aliquam autem!
			</div>

			{/* Sponsors  */}
			<div id="sponsor" className="border" >
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ut aliquid saepe, quae hic vero soluta non cupiditate error nobis cum maiores quaerat consequuntur repellendus voluptatibus officiis corrupti aliquam autem!
			</div>

			{/* Accomadation  */}
			<div id="accomodation" className="border">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ut aliquid saepe, quae hic vero soluta non cupiditate error nobis cum maiores quaerat consequuntur repellendus voluptatibus officiis corrupti aliquam autem!
			</div>
		</div>
	);
}
