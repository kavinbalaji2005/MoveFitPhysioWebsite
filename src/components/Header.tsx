import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  scrolled: boolean;
}

function Header({ scrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "gallery", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-effect shadow-lg dark:bg-gray-900/80 dark:backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <img
            src="/assets/logo.jpeg"
            alt="MoveFit Physiotherapy Centre"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain rounded-lg shadow-sm flex-shrink-0"
          />
          <span className="font-bold text-sm xs:text-base sm:text-lg md:text-xl tracking-tight text-gray-900 dark:text-white truncate">
            <span className="text-teal-600 dark:text-teal-400 hidden md:inline">
              MoveFit Physiotherapy Centre
            </span>
            <span className="text-teal-600 dark:text-teal-400 hidden sm:inline md:hidden">
              MoveFit Physiotherapy Centre
            </span>
            <span className="text-teal-600 dark:text-teal-400 sm:hidden">
              MoveFit Physiotherapy
            </span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                activeSection === item.id
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full"></span>
              )}
            </button>
          ))}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 space-y-2 glass-effect dark:bg-gray-900/90 dark:backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                activeSection === item.id
                  ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Quick action buttons */}
          <div className="pt-3 space-y-2 border-t border-gray-100 dark:border-gray-800">
            <a
              href="tel:+919894743636"
              className="block w-full text-center px-4 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/919894743636"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
