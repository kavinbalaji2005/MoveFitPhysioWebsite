import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, MessageCircle, Mail, LucideIcon } from "lucide-react";
import { useMouseTilt } from "../hooks/useMouseTilt";

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  link: string;
  linkText: string;
}

interface ContactCardProps {
  info: ContactInfo;
  index: number;
  isVisible: boolean;
}

function ContactCard({ info, index, isVisible }: ContactCardProps) {
  const { ref, tiltStyle, handleMouseMove, handleMouseLeave } =
    useMouseTilt<HTMLAnchorElement>(8);

  return (
    <a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={info.link}
      target={
        info.label === "Address" || info.label === "WhatsApp"
          ? "_blank"
          : undefined
      }
      rel={
        info.label === "Address" || info.label === "WhatsApp"
          ? "noopener noreferrer"
          : undefined
      }
      className={`group relative glass-premium dark:glass-dark p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl hover:shadow-2xl border-2 border-transparent hover:border-teal-500 dark:hover:border-teal-400 shadow-lg transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transformStyle: "preserve-3d",
        ...tiltStyle,
      }}
    >
      <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5">
        {/* Icon with gradient background */}
        <div
          className="relative flex-shrink-0"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300">
            <info.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          {/* Decorative dot */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-teal-100 dark:bg-teal-900/30 rounded-full opacity-50"></div>
        </div>

        <div
          className="flex-1 min-w-0"
          style={{ transform: "translateZ(40px)" }}
        >
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {info.label}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 leading-relaxed break-words">
            {info.value}
          </p>
          <span className="inline-flex items-center text-sm sm:text-base text-teal-600 dark:text-teal-400 font-semibold group-hover:gap-2 transition-all">
            {info.linkText}
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform"
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
          </span>
        </div>
      </div>
    </a>
  );
}

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value:
        "4/13, 2nd Street, P&T Colony Extn, Ganapathy Nagar, Ganapathy, Coimbatore – 641006",
      link: "https://maps.app.goo.gl/xPdtmSy6WqMTunfY9",
      linkText: "View on Maps",
    },
    {
      icon: Phone,
      label: "Call",
      value: "+91 98947 43636",
      link: "tel:+919894743636",
      linkText: "Call Now",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      link: "https://wa.me/919894743636",
      linkText: "Open WhatsApp",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@movefitphysio.in",
      link: "mailto:contact@movefitphysio.in",
      linkText: "Send Email",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight px-2 sm:px-4">
            Get in{" "}
            <span className="text-teal-600 dark:text-teal-400">Touch</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto px-3 sm:px-4">
            We're here to help you move better every day. Reach out to us
            through any of these channels.
          </p>
        </div>

        <div
          className={`grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16 max-w-5xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {contactInfo.map((info, index) => (
            <ContactCard
              key={index}
              info={info}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Google Maps with modern styling */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            <div className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl h-[300px] sm:h-[400px] md:h-[500px] border-2 sm:border-3 md:border-4 border-white dark:border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0637206064052!2d76.98047157536179!3d11.033846154392146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859f21b5b3481%3A0x4dae5bce27c54629!2sMoveFit%20Physiotherapy%20Centre!5e0!3m2!1sen!2sin!4v1762095530642!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MoveFit Physiotherapy Centre Location"
              ></iframe>
            </div>

            {/* Floating info card on map */}
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 right-3 sm:left-4 sm:right-4 md:left-6 md:right-auto md:max-w-sm glass-card dark:bg-gray-800/90 dark:backdrop-blur-xl p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl sm:shadow-2xl">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                Visit Our Clinic
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                4/13, 2nd Street, P&T Colony Extn, Ganapathy, Coimbatore
              </p>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Business Hours
                  </p>
                  <p className="text-teal-600 dark:text-teal-400 font-semibold text-xs sm:text-sm">
                    10 AM - 1 PM, 5:30 PM - 7:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
