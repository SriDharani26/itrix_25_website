import { Tag } from "lucide-react"

const Contact = () => {
  return (
    <div className="min-h-screen px-10 py-16">
      <div className="max-w-2xl mx-auto grid grid-cols-1 gap-16 mt-10">
        <div>
          <h2 className="text-4xl text-center mb-10 
                         text-[#65eea3] underline monday">
            CONTACTS
          </h2>

          <div className="space-y-6">
            {[
              { name: "ABC", phone: "+91 1234567890", tag: "President" },
              { name: "ABC", phone: "+91 1234567890", tag: "Vice President" },
              { name: "ABC", phone: "+91 1234567890", tag: "Event Coordinator" },
              { name: "ABC", phone: "+91 1234567890", tag: "Treasurer" },
              { name: "ABC", phone: "+91 1234567890", tag: "Coordinator" },
            ].map((person, i) => (
              <div
                key={i}
                className="group relative overflow-hidden
                           bg-[#0a1e16]/70
                           border border-[#65eea3]/20
                           rounded-xl px-6 py-6
                           transition-all duration-300
                           hover:scale-[1.03]
                           hover:shadow-[0_0_25px_rgba(0,255,140,0.25)]"
              >
                {/* TAG (VISIBLE INITIALLY) */}
                <div
                className="flex items-center justify-between
                            text-3xl text-[#65eea3]
                            transition-all duration-300
                            group-hover:opacity-0
                            group-hover:-translate-y-4 neo"
                >
                <span>{person.tag || "Contact"}</span>

                <img
                    src="/avenger.png"
                    alt="tag-icon"
                    className="w-10 h-10 object-contain"
                />
                </div>

                {/* DETAILS (VISIBLE ON HOVER) */}
                <div
                  className="absolute inset-0
                             flex justify-between items-center
                             px-6
                             opacity-0
                             translate-y-4
                             transition-all duration-300
                             group-hover:opacity-100
                             group-hover:translate-y-0"
                >
                  <div>
                    <p className="text-lg font-semibold text-[#e6fff2]">
                      {person.name}
                    </p>
                    <p className="text-sm text-[#9eeec8] mt-1">
                      {person.phone}
                    </p>
                  </div>

                  {/* CALL ICON */}
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="w-12 h-12 flex items-center justify-center
                               rounded-full
                               border border-[#65eea3]
                               text-[#3dff9e]
                               hover:bg-[#65eea3]/10
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

