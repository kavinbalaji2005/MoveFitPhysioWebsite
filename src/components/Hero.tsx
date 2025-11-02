import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactLinks = [
    {
      icon: MapPin,
      label: 'Location',
      href: 'https://maps.google.com/?q=4/13,2nd Street,P&T Colony Extn,Ganapathy Nagar,Ganapathy,Coimbatore-641006',
      external: true
    },
    {
      icon: Phone,
      label: 'Call',
      href: 'tel:+919894743636',
      external: false
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/919894743636',
      external: true
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:contact@movefitphysio.com',
      external: false
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">
            Move Freely.
            <br />
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Live Fully.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
            Personalized physiotherapy and rehabilitation care in Coimbatore.
          </p>

          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl mb-12"
          >
            Book an Appointment
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110 group"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div
          className={`mt-20 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative w-full max-w-4xl mx-auto h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full animate-pulse delay-150"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-white to-gray-100 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
