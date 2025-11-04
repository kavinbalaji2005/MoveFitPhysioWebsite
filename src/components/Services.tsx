import { useEffect, useRef, useState } from "react";
import { Activity, Heart, User, Zap, LucideIcon } from "lucide-react";
import { useMouseTilt } from "../hooks/useMouseTilt";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
}

function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  const { ref, tiltStyle, handleMouseMove, handleMouseLeave } = useMouseTilt(8);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative glass-premium dark:glass-dark p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-teal-500 dark:hover:border-teal-400 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transformStyle: "preserve-3d",
        ...tiltStyle,
      }}
    >
      {/* Number Badge */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
        <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">
          {service.number}
        </span>
      </div>

      {/* Icon with gradient background */}
      <div className="relative mb-6" style={{ transform: "translateZ(50px)" }}>
        <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300">
          <service.icon className="w-10 h-10 text-white" />
        </div>
      </div>

      <h3
        className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
        style={{ transform: "translateZ(40px)" }}
      >
        {service.title}
      </h3>

      <p
        className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6"
        style={{ transform: "translateZ(30px)" }}
      >
        {service.description}
      </p>

      {/* Learn More Link */}
      <button
        onClick={() => {
          const element = document.getElementById("contact");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold group-hover:gap-2 transition-all"
        style={{ transform: "translateZ(30px)" }}
      >
        Learn More
        <svg
          className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
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
    </div>
  );
}

function Services() {
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

  const services = [
    {
      icon: Activity,
      title: "Manual Therapy & Pain Management",
      description:
        "Expert manual therapy for back pain treatment, neck pain, shoulder pain, and chronic pain physiotherapy in Coimbatore. Hands-on techniques for effective pain relief.",
      number: "01",
    },
    {
      icon: Zap,
      title: "Women's Health Physiotherapy",
      description:
        "Specialized women's health physiotherapy in Coimbatore. Expert prenatal and postnatal care, pelvic floor therapy, pregnancy-related pain management, and postpartum recovery programs.",
      number: "02",
    },
    {
      icon: User,
      title: "Postural Correction & Arthritis Care",
      description:
        "Comprehensive postural correction and physiotherapy for arthritis in Coimbatore. Improve alignment, balance, and prevent long-term musculoskeletal issues.",
      number: "03",
    },
    {
      icon: Heart,
      title: "Geriatric Care & Mobility",
      description:
        "Specialized geriatric physiotherapy in Coimbatore. Senior care programs focusing on fall prevention, balance improvement, mobility enhancement, and age-related pain management.",
      number: "04",
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight px-4">
            Our{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Physiotherapy Services
            </span>{" "}
            in Coimbatore
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto px-4">
            Comprehensive rehabilitation services in Coimbatore tailored to your
            needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
