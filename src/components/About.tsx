import { useEffect, useRef, useState } from 'react';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
            About MoveFit
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
            At MoveFit Physiotherapy Centre, we focus on restoring mobility, reducing pain, and enhancing long-term wellness through personalized, evidence-based physiotherapy.
          </p>

          <div className="mt-12 p-8 bg-gray-50 rounded-3xl max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 font-medium mb-2">
              R Dharanika B.P.T, M.IA.P
            </p>
            <p className="text-gray-600">
              Registration No: L - 6208
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
