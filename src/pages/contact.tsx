import { useState } from "react";
import { contacts } from "../utils/contact";

const Contact = () => {

	const [clicked, setClicked] = useState<number>(-1);

  	return (
		<div className="min-h-screen px-8 md:py-16 ani">
			<div className="max-w-2xl mx-auto grid grid-cols-1 gap-16 md:mt-10">
				<div>
					<h2 className="text-4xl text-center mb-10 
									text-[#65eea3] underline monday">
						CONTACTS
					</h2>

					<div className="space-y-6">
						{contacts.map((person, i) => (
							<div
								key={i}
								className="group relative overflow-hidden
											bg-gradient-to-tr from-[#d9ffea]/30 via-[#d9ffea]/20 to-[#d9ffea]/30 
											border border-[#d9ffea]/10
											rounded-xl px-6 py-6 hover:cursor-pointer
											transition-all duration-300"
								onClick={() => setClicked(clicked === i ? -1 : i)}
							>
								<div
									className={`flex items-center justify-between
												text-3xl text1 neo
												transition-all duration-300
												${clicked === i ? "opacity-0" : "opacity-100"}
											`}
								>
									<span>{person.tag || "Contact"}</span>

									<img
										src="/avenger.png"
										alt="tag-icon"
										className="w-10 h-10 object-contain"
									/>
								</div>

								
								<div
									className={`absolute inset-0
												flex justify-between items-center
												px-6
												opacity-0
												transition-all duration-300
												${clicked === i ? "opacity-100" : "opacity-0"}
											`}
								>
									<div>
										<p className="text-lg font-semibold text1 monday">
											{person.name}
										</p>
										<p className="text-md mt-1 text2 numfont1">
											{person.phone}
										</p>
									</div>

									{/* CALL ICON */}
									<a
										href={`tel:${person.phone.replace(/\s/g, "")}`}
										className="w-12 h-12 flex items-center justify-center
												rounded-full
												border border-[#cafae0]
												text1
												hover:bg-[#cafae0]/10
												transition"
									>
										<img src="/phone/phone.png" className="w-7" />
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
  );
};

export default Contact;

