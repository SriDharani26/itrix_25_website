"use client";

import { type MouseEvent, useState } from "react";
import { Phone, User, Briefcase, ArrowBigUpDash } from "lucide-react";

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
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("dark");
  const [previewReloadKey, setPreviewReloadKey] = useState(0);
  const [isPreviewReloading, setIsPreviewReloading] = useState(false);
  const [menu, setMenu] = useState({ open: false, x: 0, y: 0 });
  const [isMobileScriptVisible, setIsMobileScriptVisible] = useState(false);

  const openContextMenu = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenu({ open: true, x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    if (menu.open) setMenu({ open: false, x: 0, y: 0 });
  };

  const runPreviewReload = () => {
    if (isPreviewReloading) return;
    setIsPreviewReloading(true);
    window.setTimeout(() => {
      setPreviewReloadKey((prev) => prev + 1);
      setIsPreviewReloading(false);
    }, 1000);
  };

  return (
    <div
      className=" min-h-screen bg-[#1e1e1e] text-[#d4d4d4] px-2 sm:px-2 md:px-3 py-1.5"
      onClick={closeContextMenu}
    >
      <div className="h-[calc(100vh-1.5rem)] border border-[#2d2d2d] rounded-md overflow-hidden grid grid-cols-1 xl:grid-cols-2 w-full min-h-0">
        <section
          className="hidden xl:flex order-2 xl:order-1 h-[42vh] xl:h-full bg-[#1e1e1e] xl:border-r border-[#2d2d2d] border-t xl:border-t-0 flex-col min-w-0 min-h-0"
          onContextMenu={openContextMenu}
        >
          <div className="grow overflow-y-scroll [scrollbar-gutter:stable] font-mono text-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#161616] [&::-webkit-scrollbar-thumb]:bg-[#3b3b3b]">
            <div className="grid grid-cols-[48px_1fr] leading-7 min-w-[720px] xl:min-w-0">
              <span className="text-[#858585] px-3">1</span>
              <div>
                <span className="text-[#c586c0]">import</span>{" "}
                <span className="text-[#9cdcfe]">React</span>{" "}
                <span className="text-[#c586c0]">from</span>{" "}
                <span className="text-[#ce9178]">&quot;react&quot;</span>;
              </div>
              <span className="text-[#858585] px-3">2</span>
              <div>
                <span className="text-[#c586c0]">const</span>{" "}
                <span className="text-[#4fc1ff]">CONTACTS</span> = [
              </div>
              <span className="text-[#858585] px-3">3</span>
              <div className="text-[#ce9178]">
                {"  { name: \"Arun Karthick S\", role: \"Chair Person\", phone: \"+91 63831 18124\" },"}
              </div>
              <span className="text-[#858585] px-3">4</span>
              <div className="text-[#ce9178]">
                {"  { name: \"Ajay Kumar R\", role: \"Overall Coordinator\", phone: \"+91 95002 02444\" },"}
              </div>
              <span className="text-[#858585] px-3">5</span>
              <div className="text-[#ce9178]">
                {"  { name: \"Joe\", role: \"Events head\", phone: \"+91 73959 16834\" },"}
              </div>
              <span className="text-[#858585] px-3">6</span>
              <div className="text-[#ce9178]">
                {"  { name: \"Abinaya SM\", role: \"Events head\", phone: \"+91 81484 35684\" },"}
              </div>
              <span className="text-[#858585] px-3">7</span>
              <div className="text-[#ce9178]">
                {"  { name: \"Razeen N\", role: \"Events head\", phone: \"+91 81484 75033\" },"}
              </div>
              <span className="text-[#858585] px-3">8</span>
              <div className="text-[#ce9178]">
                {"  { name: \"Harish M\", role: \"Events head\", phone: \"+91 63693 29560\" },"}
              </div>
              <span className="text-[#858585] px-3">9</span>
              <div className="text-[#ce9178]">
                {"  { name: \"Hemachandar K\", role: \"Marketing head\", phone: \"+91 87786 24248\" }"}
              </div>
              <span className="text-[#858585] px-3">10</span>
              <div>];</div>
              <span className="text-[#858585] px-3">11</span>
              <div>
                <span className="text-[#c586c0]">export default function</span>{" "}
                <span className="text-[#dcdcaa]">ContactPage</span>() {"{"}
              </div>
              <span className="text-[#858585] px-3">12</span>
              <div>
                <span className="text-[#c586c0]">return</span> (
              </div>
              <span className="text-[#858585] px-3">13</span>
              <div>
                <span className="text-[#569cd6]">&lt;main</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;min-h-screen p-6 bg-[#f5f7fb]&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
              </div>
              <span className="text-[#858585] px-3">14</span>
              <div>
                <span className="text-[#569cd6]">&lt;section</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;max-w-5xl mx-auto rounded-xl border bg-white p-8 space-y-6&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
              </div>
              <span className="text-[#858585] px-3">15</span>
              <div>
                <span className="text-[#569cd6]">&lt;header</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;space-y-2 text-center&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
              </div>
              <span className="text-[#858585] px-3">16</span>
              <div>
                <span className="text-[#569cd6]">&lt;h1</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;text-4xl font-bold&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
                <span className="text-[#d4d4d4]">Contact Details</span>
                <span className="text-[#569cd6]">&lt;/h1&gt;</span>
              </div>
              <span className="text-[#858585] px-3">17</span>
              <div className="text-[#569cd6]">&lt;/header&gt;</div>
              <span className="text-[#858585] px-3">18</span>
              <div>
                <span className="text-[#569cd6]">&lt;div</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;grid grid-cols-1 sm:grid-cols-2 gap-4&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
              </div>
              <span className="text-[#858585] px-3">19</span>
              <div>
                <span className="text-[#d4d4d4]">{"{"}</span>
                <span className="text-[#9cdcfe]">CONTACTS</span>
                <span className="text-[#d4d4d4]">.map((</span>
                <span className="text-[#9cdcfe]">contact</span>
                <span className="text-[#d4d4d4]">) =&gt; ({"{"}</span>
              </div>
              <span className="text-[#858585] px-3">20</span>
              <div>
                <span className="text-[#569cd6]">&lt;article</span>{" "}
                <span className="text-[#9cdcfe]">key</span>
                <span className="text-[#d4d4d4]">={"{"}</span>
                <span className="text-[#9cdcfe]">contact</span>
                <span className="text-[#d4d4d4]">.name{"}"}</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;rounded-lg border p-4 space-y-3&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
              </div>
              <span className="text-[#858585] px-3">21</span>
              <div>
                <span className="text-[#569cd6]">&lt;p</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;font-semibold text-blue-700&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
                <span className="text-[#d4d4d4]">{"{"}</span>
                <span className="text-[#9cdcfe]">contact</span>
                <span className="text-[#d4d4d4]">.name{"}"}</span>
                <span className="text-[#569cd6]">&lt;/p&gt;</span>
              </div>
              <span className="text-[#858585] px-3">22</span>
              <div>
                <span className="text-[#569cd6]">&lt;p</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;text-sm text-gray-700&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
                <span className="text-[#d4d4d4]">{"{"}</span>
                <span className="text-[#9cdcfe]">contact</span>
                <span className="text-[#d4d4d4]">.role{"}"}</span>
                <span className="text-[#569cd6]">&lt;/p&gt;</span>
              </div>
              <span className="text-[#858585] px-3">23</span>
              <div>
                <span className="text-[#569cd6]">&lt;p</span>{" "}
                <span className="text-[#9cdcfe]">className</span>
                <span className="text-[#d4d4d4]">=</span>
                <span className="text-[#ce9178]">&quot;text-sm text-gray-700&quot;</span>
                <span className="text-[#569cd6]">&gt;</span>
                <span className="text-[#d4d4d4]">{"{"}</span>
                <span className="text-[#9cdcfe]">contact</span>
                <span className="text-[#d4d4d4]">.phone{"}"}</span>
                <span className="text-[#569cd6]">&lt;/p&gt;</span>
              </div>
              <span className="text-[#858585] px-3">24</span>
              <div className="text-[#569cd6]">&lt;/article&gt;</div>
              <span className="text-[#858585] px-3">25</span>
              <div className="text-[#d4d4d4]">)){"}"}</div>
              <span className="text-[#858585] px-3">26</span>
              <div className="text-[#569cd6]">&lt;/div&gt;</div>
              <span className="text-[#858585] px-3">27</span>
              <div className="text-[#569cd6]">&lt;/section&gt;</div>
              <span className="text-[#858585] px-3">28</span>
              <div className="text-[#569cd6]">&lt;/main&gt;</div>
              <span className="text-[#858585] px-3">29</span>
              <div />
              <span className="text-[#858585] px-3">30</span>
              <div>  );</div>
              <span className="text-[#858585] px-3">31</span>
              <div>{"}"}</div>
            </div>
          </div>
        </section>

        <section className="order-1 xl:order-2 h-full bg-[#1f1f1f] min-w-0 min-h-0 flex flex-col">
          <div className="min-h-10 px-3 py-1.5 bg-[#2d2d2d] border-b border-[#3b3b3b] flex items-center gap-2 text-[#c5c5c5]">
            <span className="text-[11px] sm:text-xs text-[#8b949e] hidden sm:inline">Document</span>
            <span className="text-[#8b949e] hidden sm:inline">|</span>
            <span className="text-[11px] sm:text-xs font-medium tracking-wide">Live Preview</span>
            <button
              type="button"
              onClick={() =>
                setPreviewTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
              className="ml-auto px-2 py-1 rounded bg-[#3c3c3c] hover:bg-[#505050] text-[11px] sm:text-xs text-white"
            >
              {previewTheme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
          <div className="min-h-10 bg-[#252526] border-b border-[#3b3b3b] px-2.5 py-1.5 flex items-center gap-1.5">
            <span className="text-[#8b949e] text-xs sm:text-sm px-1">&lt;</span>
            <span className="text-[#8b949e] text-xs sm:text-sm px-1">&gt;</span>
            <span className="text-[#8b949e] text-xs sm:text-sm px-1">R</span>
            <div className="ml-1 rounded bg-[#1e1e1e] border border-[#3b3b3b] h-7 px-2.5 flex items-center text-[11px] sm:text-xs text-[#bbbbbb] min-w-0 flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              http://127.0.0.1:3001/itrix-26-contact-page
            </div>
          </div>

          <div
            className={`grow overflow-y-scroll [scrollbar-gutter:stable] p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:rounded-full ${
              previewTheme === "light"
                ? "bg-[#f5f7fb] [&::-webkit-scrollbar-track]:bg-[#dfe5ef] [&::-webkit-scrollbar-thumb]:bg-[#93a1b5]"
                : "bg-[#0d1117] [&::-webkit-scrollbar-track]:bg-[#161b22] [&::-webkit-scrollbar-thumb]:bg-[#30363d]"
            }`}
          >
            {isPreviewReloading ? (
              <div
                className={`max-w-5xl mx-auto rounded-xl p-6 md:p-8 space-y-6 border animate-pulse ${
                  previewTheme === "light"
                    ? "bg-white border-gray-300"
                    : "bg-[#010409] border-[#30363d]"
                }`}
              >
                <div className="h-10 w-64 mx-auto rounded bg-gray-300/60 dark:bg-gray-700/60" />
                <div className="h-7 w-44 rounded bg-gray-300/60 dark:bg-gray-700/60" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`sk-${i}`}
                      className={`rounded-lg border p-4 space-y-3 ${
                        previewTheme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-[#30363d] bg-[#0d1117]"
                      }`}
                    >
                      <div className="h-5 w-40 rounded bg-gray-300/60 dark:bg-gray-700/60" />
                      <div className="h-4 w-32 rounded bg-gray-300/60 dark:bg-gray-700/60" />
                      <div className="h-4 w-36 rounded bg-gray-300/60 dark:bg-gray-700/60" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                key={previewReloadKey}
                className={`max-w-5xl mx-auto rounded-xl p-6 md:p-8 space-y-6 border ${
                  previewTheme === "light"
                    ? "bg-white border-gray-300 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                    : "bg-[#010409] border-[#30363d] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                }`}
              >
                <header className="space-y-2">
                <h1
                  className={`text-3xl md:text-5xl font-bold text-center ${
                    previewTheme === "light" ? "text-black" : "text-[#f0f6fc]"
                  }`}
                >
                    Contact Details
                </h1>
              </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CONTACTS.map((contact) => (
                    <article
                      key={contact.id}
                      className={`rounded-lg p-4 space-y-3 border ${
                        previewTheme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-[#30363d] bg-[#0d1117]"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-3 min-w-0 ${
                          previewTheme === "light" ? "text-black" : "text-[#f0f6fc]"
                        }`}
                      >
                        <User
                          size={16}
                          className={`mt-0.5 shrink-0 ${
                            previewTheme === "light" ? "text-blue-600" : "text-[#58a6ff]"
                          }`}
                        />
                        <span
                          className={`font-semibold break-words ${
                            previewTheme === "light" ? "text-black" : "text-[#58a6ff]"
                          }`}
                        >
                          {contact.name}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-3 min-w-0 text-sm ${
                          previewTheme === "light" ? "text-gray-700" : "text-[#8b949e]"
                        }`}
                      >
                        <Briefcase size={14} className="shrink-0" />
                        <span className="break-words">{contact.role}</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 min-w-0 text-sm ${
                          previewTheme === "light" ? "text-gray-700" : "text-[#8b949e]"
                        }`}
                      >
                        <Phone size={14} className="shrink-0" />
                        <a
                          href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                          className="break-words hover:underline underline-offset-2"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <button
          type="button"
          onClick={() => setIsMobileScriptVisible((prev) => !prev)}
          className={`xl:hidden fixed right-3 ${
            isMobileScriptVisible ? "bottom-[calc(38vh+4rem)]" : "bottom-16"
          } z-50 h-11 w-11 rounded-full border border-[#2d2d2d] bg-[#1e1e1e]/95 text-[#d4d4d4] shadow-lg backdrop-blur flex items-center justify-center`}
          aria-label="Script viewer"
          title="Script viewer"
        >
          <ArrowBigUpDash
            size={18}
            className={`${isMobileScriptVisible ? "rotate-180" : ""} transition-transform duration-150`}
          />
        </button>

        {isMobileScriptVisible && (
          <section
            className="xl:hidden fixed inset-x-2 bottom-14 z-40 h-[38vh] bg-[#1e1e1e] border border-[#2d2d2d] rounded-md overflow-hidden flex flex-col min-w-0 min-h-0"
            onContextMenu={openContextMenu}
          >
            <div className="grow overflow-y-scroll no-scrollbar [scrollbar-gutter:stable] font-mono text-sm">
              <div className="grid grid-cols-[48px_1fr] leading-7 min-w-[720px]">
                <span className="text-[#858585] px-3">1</span>
                <div>
                  <span className="text-[#c586c0]">import</span>{" "}
                  <span className="text-[#9cdcfe]">React</span>{" "}
                  <span className="text-[#c586c0]">from</span>{" "}
                  <span className="text-[#ce9178]">&quot;react&quot;</span>;
                </div>
                <span className="text-[#858585] px-3">2</span>
                <div>
                  <span className="text-[#c586c0]">const</span>{" "}
                  <span className="text-[#4fc1ff]">CONTACTS</span> = [
                </div>
                <span className="text-[#858585] px-3">3</span>
                <div className="text-[#ce9178]">
                  {"  { name: \"Arun Karthick S\", role: \"Chair Person\", phone: \"+91 63831 18124\" },"}
                </div>
                <span className="text-[#858585] px-3">4</span>
                <div className="text-[#ce9178]">
                  {"  { name: \"Ajay Kumar R\", role: \"Overall Coordinator\", phone: \"+91 95002 02444\" },"}
                </div>
                <span className="text-[#858585] px-3">5</span>
                <div className="text-[#ce9178]">
                  {"  { name: \"Joe\", role: \"Events head\", phone: \"+91 73959 16834\" },"}
                </div>
                <span className="text-[#858585] px-3">6</span>
                <div className="text-[#ce9178]">
                  {"  { name: \"Abinaya SM\", role: \"Events head\", phone: \"+91 81484 35684\" },"}
                </div>
                <span className="text-[#858585] px-3">7</span>
                <div className="text-[#ce9178]">
                  {"  { name: \"Razeen N\", role: \"Events head\", phone: \"+91 81484 75033\" },"}
                </div>
                <span className="text-[#858585] px-3">8</span>
                <div className="text-[#ce9178]">
                  {"  { name: \"Harish M\", role: \"Events head\", phone: \"+91 63693 29560\" },"}
                </div>
                <span className="text-[#858585] px-3">9</span>
                <div className="text-[#ce9178]">
                  {"  { name: \"Hemachandar K\", role: \"Marketing head\", phone: \"+91 87786 24248\" }"}
                </div>
                <span className="text-[#858585] px-3">10</span>
                <div>];</div>
                <span className="text-[#858585] px-3">11</span>
                <div>
                  <span className="text-[#c586c0]">export default function</span>{" "}
                  <span className="text-[#dcdcaa]">ContactPage</span>() {"{"}
                </div>
                <span className="text-[#858585] px-3">12</span>
                <div>
                  <span className="text-[#c586c0]">return</span> (
                </div>
                <span className="text-[#858585] px-3">13</span>
                <div>
                  <span className="text-[#569cd6]">&lt;main</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;min-h-screen p-6 bg-[#f5f7fb]&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                </div>
                <span className="text-[#858585] px-3">14</span>
                <div>
                  <span className="text-[#569cd6]">&lt;section</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;max-w-5xl mx-auto rounded-xl border bg-white p-8 space-y-6&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                </div>
                <span className="text-[#858585] px-3">15</span>
                <div>
                  <span className="text-[#569cd6]">&lt;header</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;space-y-2 text-center&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                </div>
                <span className="text-[#858585] px-3">16</span>
                <div>
                  <span className="text-[#569cd6]">&lt;h1</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;text-4xl font-bold&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                  <span className="text-[#d4d4d4]">Contact Details</span>
                  <span className="text-[#569cd6]">&lt;/h1&gt;</span>
                </div>
                <span className="text-[#858585] px-3">17</span>
                <div className="text-[#569cd6]">&lt;/header&gt;</div>
                <span className="text-[#858585] px-3">18</span>
                <div>
                  <span className="text-[#569cd6]">&lt;div</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;grid grid-cols-1 sm:grid-cols-2 gap-4&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                </div>
                <span className="text-[#858585] px-3">19</span>
                <div>
                  <span className="text-[#d4d4d4]">{"{"}</span>
                  <span className="text-[#9cdcfe]">CONTACTS</span>
                  <span className="text-[#d4d4d4]">.map((</span>
                  <span className="text-[#9cdcfe]">contact</span>
                  <span className="text-[#d4d4d4]">) =&gt; ({"{"}</span>
                </div>
                <span className="text-[#858585] px-3">20</span>
                <div>
                  <span className="text-[#569cd6]">&lt;article</span>{" "}
                  <span className="text-[#9cdcfe]">key</span>
                  <span className="text-[#d4d4d4]">={"{"}</span>
                  <span className="text-[#9cdcfe]">contact</span>
                  <span className="text-[#d4d4d4]">.name{"}"}</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;rounded-lg border p-4 space-y-3&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                </div>
                <span className="text-[#858585] px-3">21</span>
                <div>
                  <span className="text-[#569cd6]">&lt;p</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;font-semibold text-blue-700&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                  <span className="text-[#d4d4d4]">{"{"}</span>
                  <span className="text-[#9cdcfe]">contact</span>
                  <span className="text-[#d4d4d4]">.name{"}"}</span>
                  <span className="text-[#569cd6]">&lt;/p&gt;</span>
                </div>
                <span className="text-[#858585] px-3">22</span>
                <div>
                  <span className="text-[#569cd6]">&lt;p</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;text-sm text-gray-700&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                  <span className="text-[#d4d4d4]">{"{"}</span>
                  <span className="text-[#9cdcfe]">contact</span>
                  <span className="text-[#d4d4d4]">.role{"}"}</span>
                  <span className="text-[#569cd6]">&lt;/p&gt;</span>
                </div>
                <span className="text-[#858585] px-3">23</span>
                <div>
                  <span className="text-[#569cd6]">&lt;p</span>{" "}
                  <span className="text-[#9cdcfe]">className</span>
                  <span className="text-[#d4d4d4]">=</span>
                  <span className="text-[#ce9178]">&quot;text-sm text-gray-700&quot;</span>
                  <span className="text-[#569cd6]">&gt;</span>
                  <span className="text-[#d4d4d4]">{"{"}</span>
                  <span className="text-[#9cdcfe]">contact</span>
                  <span className="text-[#d4d4d4]">.phone{"}"}</span>
                  <span className="text-[#569cd6]">&lt;/p&gt;</span>
                </div>
                <span className="text-[#858585] px-3">24</span>
                <div className="text-[#569cd6]">&lt;/article&gt;</div>
                <span className="text-[#858585] px-3">25</span>
                <div className="text-[#d4d4d4]">)){"}"}</div>
                <span className="text-[#858585] px-3">26</span>
                <div className="text-[#569cd6]">&lt;/div&gt;</div>
                <span className="text-[#858585] px-3">27</span>
                <div className="text-[#569cd6]">&lt;/section&gt;</div>
                <span className="text-[#858585] px-3">28</span>
                <div className="text-[#569cd6]">&lt;/main&gt;</div>
                <span className="text-[#858585] px-3">29</span>
                <div />
                <span className="text-[#858585] px-3">30</span>
                <div>  );</div>
                <span className="text-[#858585] px-3">31</span>
                <div>{"}"}</div>
              </div>
            </div>
          </section>
        )}
      </div>

      {menu.open && (
        <div
          className="fixed z-50 min-w-44 rounded-md border border-[#3b3b3b] bg-[#252526] py-1 shadow-xl"
          style={{ left: menu.x, top: menu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="w-full px-3 py-2 text-left text-sm text-[#d4d4d4] hover:bg-[#094771]"
            onClick={() => {
              runPreviewReload();
              closeContextMenu();
            }}
          >
            Show Preview
          </button>
        </div>
      )}
    </div>
  );
}
