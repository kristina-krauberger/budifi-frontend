import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { generateOpenAiResponse } from "../../api/openai_response-api.js";

export default function Chatbot() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi, ich bin Clara! Wie kann ich dir heute bei Buddy.Fi helfen?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);
  const messagesEndRef = useRef(null);

  const claraImageUrl = "https://randomuser.me/api/portraits/women/44.jpg";

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Adjust bottom offset dynamically on scroll to avoid overlapping the footer
  useEffect(() => {
    if (location.pathname !== "/dashboard") return;

    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const footerHeight = footer ? footer.offsetHeight : 110;
      
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPos = window.scrollY || window.pageYOffset;
      const distanceToBottom = docHeight - (scrollPos + windowHeight);

      const defaultMargin = window.innerWidth < 768 ? 16 : 24;

      if (distanceToBottom < footerHeight) {
        setBottomOffset(footerHeight - distanceToBottom + defaultMargin);
      } else {
        setBottomOffset(defaultMargin);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    handleScroll();

    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [location.pathname, isOpen]);

  // Show chatbot ONLY on the dashboard page
  if (location.pathname !== "/dashboard") {
    return null;
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await generateOpenAiResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: typeof aiResponse === "string" ? aiResponse : JSON.stringify(aiResponse) },
      ]);
    } catch (error) {
      console.error("Fehler beim Abrufen der Chat-Antwort:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Entschuldigung, es gab ein Problem bei der Verbindung. Bitte versuche es gleich noch einmal.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed right-4 md:right-6 xl:right-[calc(50%-576px)] z-50 font-sans"
      style={{ bottom: `${bottomOffset}px` }}
    >
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 md:w-18 md:h-18 rounded-full p-[2px] md:p-[3px] bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-gray-100 flex items-center justify-center animate-fade-in"
          aria-label="Chat mit Clara öffnen"
        >
          <img
            src={claraImageUrl}
            alt="Clara"
            className="w-full h-full rounded-full object-cover"
          />
          <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 flex h-4 w-4 md:h-5 md:w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0EB689] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 bg-[#0EB689] border-2 border-white"></span>
          </span>
        </button>
      )}

      {/* Chat Window (Direct Chat Mode) */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[360px] md:w-[380px] h-[450px] md:h-[480px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right animate-scale-up">
          {/* Header */}
          <div className="bg-white p-3.5 md:p-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={claraImageUrl}
                  alt="Clara"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-gray-100"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#0EB689] border-2 border-white"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800 leading-tight">Clara</h4>
                <p className="text-[10px] md:text-[11px] text-[#0EB689] font-medium">Fragen? Beratung mit Clara</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-full transition-colors cursor-pointer"
              aria-label="Chat schließen"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#F8F9FA] scrollbar-thin">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src={claraImageUrl}
                    alt="Clara"
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-gray-100"
                  />
                )}
                
                <div
                  className={`max-w-[75%] md:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#0EB689] text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Loading state indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <img
                  src={claraImageUrl}
                  alt="Clara"
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-gray-150"
                />
                <div className="bg-white text-gray-850 px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#0EB689] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#0EB689] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#0EB689] rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Frag Clara etwas..."
              disabled={isLoading}
              className="flex-grow px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0EB689]/20 focus:border-[#0EB689] text-sm transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-[#0EB689] hover:bg-[#0c9d76] disabled:bg-gray-100 text-white disabled:text-gray-400 rounded-full flex items-center justify-center transition-colors shadow-sm disabled:shadow-none cursor-pointer flex-shrink-0"
              aria-label="Nachricht senden"
            >
              <svg
                className="w-5 h-5 transform rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
