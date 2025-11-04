import { MessageCircle } from "lucide-react";
import { useState } from "react";

function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://wa.me/919894743636"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Tooltip */}
        <div
          className={`absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Chat with us on WhatsApp
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-800"></div>
        </div>

        {/* Button */}
        <div className="relative">
          {/* Pulse animation rings */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-30"></div>

          {/* Main button */}
          <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>
    </a>
  );
}

export default FloatingWhatsApp;
