import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: '4/13, 2nd Street, P&T Colony Extn, Ganapathy Nagar, Ganapathy, Coimbatore – 641006',
      link: 'https://maps.google.com/?q=4/13,2nd Street,P&T Colony Extn,Ganapathy Nagar,Ganapathy,Coimbatore-641006',
      linkText: 'View on Maps'
    },
    {
      icon: Phone,
      label: 'Call',
      value: '+91 98947 43636',
      link: 'tel:+919894743636',
      linkText: 'Call Now'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with us',
      link: 'https://wa.me/919894743636',
      linkText: 'Open WhatsApp'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@movefitphysio.com',
      link: 'mailto:contact@movefitphysio.com',
      linkText: 'Send Email'
    }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 font-light">
            We're here to help you move better every day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <info.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {info.label}
                    </h3>
                    <p className="text-gray-600 mb-2">{info.value}</p>
                    <a
                      href={info.link}
                      target={info.label === 'Address' || info.label === 'WhatsApp' ? '_blank' : undefined}
                      rel={info.label === 'Address' || info.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-900 font-medium hover:underline"
                    >
                      {info.linkText} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-3xl">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-center text-green-600 font-medium">
                    Message sent successfully!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
