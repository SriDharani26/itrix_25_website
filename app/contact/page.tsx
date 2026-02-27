"use client";

import { useState } from "react";
import { Phone, User, Briefcase, Users } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  role: string;
  phone: string;
};

const CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Arun Karthick S",
    role: "Chair Person",
    phone: "+91 63831 18124",
  },
  {
    id: "2",
    name: "Ajay Kumar R",
    role: "Overall Coordinator",
    phone: "+91 95002 02444",
  },
  {
    id: "3",
    name: "Joe",
    role: "Events head",
    phone: "+91 73959 16834",
  },
  {
    id: "4",
    name: "Abinaya SM",
    role: "Events head",
    phone: "+91 81484 35684",
  },
  {
    id: "5",
    name: "Razeen N",
    role: "Events head",
    phone: "+91 81484 75033",
  },
  {
    id: "6",
    name: "Harish M",
    role: "Events head",
    phone: "+91 63693 29560",
  },
  {
    id: "7",
    name: "Hemachandar K",
    role: "Marketing head",
    phone: "+91 87786 24248",
  },
];

export default function ContactPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Contact | null>(null);

  const filtered = CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-full min-h-screen w-full bg-[#1e1e1e] text-gray-100 flex flex-col">

      <div className="h-14 flex items-center gap-3 px-4 border-b border-[#3c3c3c] bg-[#252526]">
        <span className="text-sm text-gray-400">
          <span className="text-cyan-400">Contact</span> palette
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center pt-20 px-4">

        <div className="w-full max-w-xl rounded-md border border-[#3c3c3c] bg-[#252526] shadow-lg">

          <div className="relative border-b border-[#3c3c3c] px-4 py-2">
            {!query && (
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm">
                <span className="text-gray-400">Search </span>
                <span className="text-cyan-400 mx-1">contacts</span>
                <span className="text-gray-400"> by name or role</span>
                </div>
            )}

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-200 outline-none"
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-sm text-gray-400">
                No matching contacts
              </p>
            )}

            {filtered.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActive(contact)}
                className={`relative w-full px-4 py-2 text-left flex items-center gap-3 text-sm transition
                  ${
                    active?.id === contact.id
                      ? "bg-[#094771]"
                      : "hover:bg-[#2a2d2e]"
                  }
                `}
              >
                {active?.id === contact.id && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400" />
                )}

                <User size={16} className="text-cyan-400" />
                <div className="flex flex-col">
                  <span className="font-medium">{contact.name}</span>
                  <span className="text-xs text-gray-400">
                    {contact.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {active && (
          <div className="mt-6 w-full max-w-xl rounded-md border border-[#3c3c3c] bg-[#252526] px-5 py-4 space-y-4">

            <div className="text-xs text-gray-400 uppercase tracking-wide">
              Contact Details
            </div>

            <div className="flex items-center gap-3">
              <User size={16} className="text-cyan-400" />
              <span className="text-sm font-medium">{active.name}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Briefcase size={14} />
              <span>{active.role}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Phone size={14} />
              <span>{active.phone}</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}