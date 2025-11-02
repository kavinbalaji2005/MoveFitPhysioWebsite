import { useEffect, useRef, useState } from 'react';
import { Activity, Heart, User, Zap } from 'lucide-react';

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
      title: 'Manual Therapy',
      description: 'Hands-on techniques to improve mobility and reduce pain through targeted manipulation and mobilization.'
    },
    {
      icon: Zap,
      title: 'Sports Injury Rehabilitation',
      description: 'Specialized recovery programs designed to get athletes back to peak performance safely and efficiently.'
    },
    {
      icon: User,
      title: 'Postural Correction',
      description: 'Comprehensive assessment and treatment to improve alignment, balance, and prevent long-term issues.'
    },
    {
      icon: Heart,
      title: 'Pain Management',
      description: 'Evidence-based approaches to reduce chronic and acute pain, restoring quality of life and function.'
    }
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                <service.icon className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
