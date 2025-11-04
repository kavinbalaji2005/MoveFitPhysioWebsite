import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { useEffect, useState } from "react";

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactLinks = [
    {
      icon: MapPin,
      label: "Location",
      href: "https://maps.app.goo.gl/xPdtmSy6WqMTunfY9",
      external: true,
    },
    {
      icon: Phone,
      label: "Call",
      href: "tel:+919894743636",
      external: false,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/919894743636",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:contact@movefitphysio.in",
      external: false,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-200/30 dark:bg-teal-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-100/20 dark:bg-teal-800/10 rounded-full blur-2xl animate-pulse"></div>

        {/* Add floating particles */}
        <div
          className="absolute top-1/3 right-1/3 w-4 h-4 bg-teal-400/20 dark:bg-teal-500/30 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400/20 dark:bg-blue-500/30 rounded-full animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/2 w-2 h-2 bg-teal-300/30 dark:bg-teal-400/30 rounded-full animate-float"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main headline with gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 sm:mb-6 leading-tight animate-fade-in-up px-4">
            Move Freely.
            <br />
            <span className="text-gradient-animate">Live Fully.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up stagger-2 px-4">
            Personalized physiotherapy and rehabilitation care in Coimbatore.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full text-base sm:text-lg font-semibold hover:from-teal-700 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-teal-500/50"
            >
              Book an Appointment
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <a
              href="tel:+919894743636"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 border-2 border-teal-600 dark:border-teal-400 rounded-full text-base sm:text-lg font-semibold hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Call Now
            </a>
          </div>

          {/* Contact links - More compact */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 group-hover:scale-110 transition-all shadow-sm">
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
