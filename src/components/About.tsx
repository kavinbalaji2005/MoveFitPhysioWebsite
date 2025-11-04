import { useEffect, useRef, useState } from "react";
import { useMouseTilt } from "../hooks/useMouseTilt";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const {
    ref: cardRef,
    tiltStyle,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseTilt(8);

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
      className="py-24 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/10 to-transparent dark:from-transparent dark:via-teal-900/5 dark:to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            About{" "}
            <span className="text-teal-600 dark:text-teal-400">MoveFit</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image with decorative elements */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 rounded-3xl"></div>

              {/* Image placeholder with professional styling */}
              <div className="relative bg-gradient-to-br from-teal-200 to-blue-200 dark:from-teal-900/50 dark:to-blue-900/50 rounded-3xl overflow-hidden shadow-2xl aspect-square flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-teal-600 dark:text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    Professional Physiotherapist
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-premium dark:glass-dark px-6 py-4 rounded-2xl shadow-lg">
                <p className="text-teal-600 dark:text-teal-400 font-bold text-2xl">
                  10+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Years Experience
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-light">
              At MoveFit Physiotherapy Centre Coimbatore, we focus on{" "}
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                restoring mobility
              </span>
              ,{" "}
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                reducing pain
              </span>
              , and enhancing{" "}
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                long-term wellness
              </span>{" "}
              through personalized, evidence-based physiotherapy. As the best
              physiotherapist in Coimbatore, we provide expert treatment for
              back pain, knee injuries, sports rehabilitation, and chronic pain
              management.
            </p>

            {/* Credentials Card */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glass-premium dark:glass-dark p-8 rounded-3xl border-2 border-teal-100 dark:border-teal-800 shadow-lg hover:shadow-2xl transition-all duration-500"
              style={{
                transformStyle: "preserve-3d",
                ...tiltStyle,
              }}
            >
              <div className="flex items-start space-x-4">
                <div
                  className="w-16 h-16 bg-teal-600 dark:bg-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div style={{ transform: "translateZ(40px)" }}>
                  <p className="text-xl text-gray-900 dark:text-white font-bold mb-2">
                    R Dharanika B.P.T, M.IA.P
                  </p>
                  <p className="text-teal-600 dark:text-teal-400 font-semibold text-lg">
                    Registration No: L - 6208
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Certified & Experienced Physiotherapist
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

export default About;
