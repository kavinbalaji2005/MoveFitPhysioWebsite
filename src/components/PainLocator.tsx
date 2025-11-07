import { useEffect, useRef, useState } from "react";
import { X, ChevronRight } from "lucide-react";

interface PainPoint {
  id: string;
  area: string;
  x: number;
  y: number;
}

interface BodyPart {
  id: string;
  name: string;
  area: string;
}

function PainLocator() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedParts, setSelectedParts] = useState<PainPoint[]>([]);
  const [currentView, setCurrentView] = useState<"front" | "back">("front");
  const [showResults, setShowResults] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
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

  const bodyParts: BodyPart[] = [
    {
      id: "head-front",
      name: "Head & Neck",
      area: "Headaches, neck pain, stiffness",
    },
    {
      id: "shoulder-left-front",
      name: "Left Shoulder",
      area: "Shoulder pain, stiffness, rotator cuff",
    },
    {
      id: "shoulder-right-front",
      name: "Right Shoulder",
      area: "Shoulder pain, frozen shoulder",
    },
    {
      id: "arm-left-front",
      name: "Left Arm",
      area: "Arm pain, elbow pain",
    },
    {
      id: "arm-right-front",
      name: "Right Arm",
      area: "Arm pain, tennis elbow",
    },
    {
      id: "hip-left-front",
      name: "Left Hip",
      area: "Hip pain, difficulty moving",
    },
    {
      id: "hip-right-front",
      name: "Right Hip",
      area: "Hip pain, arthritis",
    },
    {
      id: "knee-left-front",
      name: "Left Knee",
      area: "Knee pain, swelling",
    },
    {
      id: "knee-right-front",
      name: "Right Knee",
      area: "Knee pain, arthritis",
    },
    {
      id: "ankle-left-front",
      name: "Left Ankle/Foot",
      area: "Ankle sprains, foot pain",
    },
    {
      id: "ankle-right-front",
      name: "Right Ankle/Foot",
      area: "Ankle pain, heel pain",
    },
    // Back view parts
    {
      id: "neck-back",
      name: "Neck & Upper Back",
      area: "Neck stiffness, upper back pain",
    },
    {
      id: "shoulder-left-back",
      name: "Left Shoulder Blade",
      area: "Shoulder blade pain, muscle tension",
    },
    {
      id: "shoulder-right-back",
      name: "Right Shoulder Blade",
      area: "Shoulder blade pain, poor posture",
    },
    {
      id: "mid-back",
      name: "Middle Back",
      area: "Mid back pain, stiffness",
    },
    {
      id: "lower-back",
      name: "Lower Back",
      area: "Lower back pain, sciatica",
    },
    {
      id: "hamstring-left-back",
      name: "Left Thigh (Back)",
      area: "Thigh strain, tightness",
    },
    {
      id: "hamstring-right-back",
      name: "Right Thigh (Back)",
      area: "Thigh injury, pain",
    },
    {
      id: "calf-left-back",
      name: "Left Calf",
      area: "Calf pain, muscle cramps",
    },
    {
      id: "calf-right-back",
      name: "Right Calf",
      area: "Calf cramps, Achilles pain",
    },
  ];

  const handleBodyPartClick = (part: BodyPart) => {
    const existingIndex = selectedParts.findIndex((p) => p.id === part.id);

    if (existingIndex >= 0) {
      // Remove if already selected
      setSelectedParts(selectedParts.filter((p) => p.id !== part.id));
    } else {
      // Add new pain point
      const newPoint: PainPoint = {
        id: part.id,
        area: part.name,
        x: 0,
        y: 0,
      };
      setSelectedParts([...selectedParts, newPoint]);
    }
  };

  const handleViewResults = () => {
    if (selectedParts.length > 0) {
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setSelectedParts([]);
    setShowResults(false);
    setCurrentView("front");
  };

  const isPartSelected = (partId: string) => {
    return selectedParts.some((p) => p.id === partId);
  };

  return (
    <section
      id="pain-locator"
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight px-4">
            Find Your{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Pain Location
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto px-4">
            Click on the body areas where you experience pain. We'll recommend
            the best treatment for you.
          </p>
        </div>

        {!showResults ? (
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
              {/* Body Model */}
              <div className="glass-premium dark:glass-dark p-8 rounded-3xl">
                {/* View Toggle */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                    <button
                      onClick={() => setCurrentView("front")}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        currentView === "front"
                          ? "bg-teal-600 text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      Front View
                    </button>
                    <button
                      onClick={() => setCurrentView("back")}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        currentView === "back"
                          ? "bg-teal-600 text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      Back View
                    </button>
                  </div>
                </div>

                {/* Enhanced 3D Body Diagram */}
                <div className="relative mx-auto" style={{ maxWidth: "350px" }}>
                  <svg
                    viewBox="0 -10 200 430"
                    className="w-full h-auto drop-shadow-xl"
                    style={{ minHeight: "550px" }}
                  >
                    {/* Background gradient for depth */}
                    <defs>
                      <linearGradient
                        id="bodyGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#e2e8f0", stopOpacity: 0.3 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#cbd5e1", stopOpacity: 0.1 }}
                        />
                      </linearGradient>
                      <filter id="shadow">
                        <feDropShadow
                          dx="0"
                          dy="2"
                          stdDeviation="3"
                          floodOpacity="0.3"
                        />
                      </filter>
                      <radialGradient id="muscleGradient">
                        <stop
                          offset="0%"
                          style={{ stopColor: "#14b8a6", stopOpacity: 0.6 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#0d9488", stopOpacity: 0.3 }}
                        />
                      </radialGradient>
                    </defs>
                    {currentView === "front" ? (
                      <>
                        {/* Head with more detail */}
                        <ellipse
                          cx="100"
                          cy="25"
                          rx="22"
                          ry="28"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("head-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "head-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "head-front")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("head-front")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Facial features for realism */}
                        <circle
                          cx="92"
                          cy="22"
                          r="2"
                          fill="#374151"
                          opacity="0.4"
                        />
                        <circle
                          cx="108"
                          cy="22"
                          r="2"
                          fill="#374151"
                          opacity="0.4"
                        />

                        {/* Neck with better shape */}
                        <path
                          d="M 88 50 L 85 65 L 90 70 L 110 70 L 115 65 L 112 50 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("head-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-1"
                              : hoveredPart === "head-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-1"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "head-front")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("head-front")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Shoulders with anatomical curves */}
                        <ellipse
                          cx="60"
                          cy="85"
                          rx="22"
                          ry="18"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("shoulder-left-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "shoulder-left-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "shoulder-left-front"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("shoulder-left-front")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        <ellipse
                          cx="140"
                          cy="85"
                          rx="22"
                          ry="18"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("shoulder-right-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "shoulder-right-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "shoulder-right-front"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("shoulder-right-front")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Torso (non-clickable, for visual structure) */}
                        <path
                          d="M 75 75 Q 70 85 70 95 L 70 145 Q 75 165 78 170 L 122 170 Q 125 165 130 145 L 130 95 Q 130 85 125 75 Z"
                          fill="#e5e7eb"
                          opacity="0.2"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          filter="url(#shadow)"
                        />
                        {/* Center line for visual reference */}
                        <line
                          x1="100"
                          y1="75"
                          x2="100"
                          y2="170"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          opacity="0.2"
                        />

                        {/* Arms with bicep/tricep curves */}
                        <path
                          d="M 42 100 Q 38 120 40 145 Q 42 165 45 180 L 52 180 Q 54 165 52 145 Q 50 120 48 100 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("arm-left-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "arm-left-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "arm-left-front")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("arm-left-front")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        <path
                          d="M 158 100 Q 162 120 160 145 Q 158 165 155 180 L 148 180 Q 146 165 148 145 Q 150 120 152 100 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("arm-right-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "arm-right-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "arm-right-front")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("arm-right-front")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Hips with better anatomy */}
                        <ellipse
                          cx="82"
                          cy="185"
                          rx="20"
                          ry="22"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("hip-left-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "hip-left-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "hip-left-front")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("hip-left-front")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        <ellipse
                          cx="118"
                          cy="185"
                          rx="20"
                          ry="22"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("hip-right-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "hip-right-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "hip-right-front")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("hip-right-front")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Thighs/Knees with quadriceps shape */}
                        <path
                          d="M 72 210 Q 68 240 70 265 Q 72 280 75 285 L 88 285 Q 90 280 88 265 Q 86 240 84 210 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("knee-left-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "knee-left-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "knee-left-front")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("knee-left-front")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Knee cap */}
                        <ellipse
                          cx="80"
                          cy="285"
                          rx="6"
                          ry="8"
                          fill="#9ca3af"
                          opacity="0.4"
                        />

                        <path
                          d="M 128 210 Q 132 240 130 265 Q 128 280 125 285 L 112 285 Q 110 280 112 265 Q 114 240 116 210 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("knee-right-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "knee-right-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "knee-right-front"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("knee-right-front")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Knee cap */}
                        <ellipse
                          cx="120"
                          cy="285"
                          rx="6"
                          ry="8"
                          fill="#9ca3af"
                          opacity="0.4"
                        />

                        {/* Lower legs (Shins/Calves) */}
                        <path
                          d="M 76 290 Q 74 320 76 350 Q 78 375 80 390 L 86 390 Q 88 375 86 350 Q 84 320 82 290 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("ankle-left-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "ankle-left-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "ankle-left-front"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("ankle-left-front")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        <path
                          d="M 124 290 Q 126 320 124 350 Q 122 375 120 390 L 114 390 Q 112 375 114 350 Q 116 320 118 290 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("ankle-right-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "ankle-right-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "ankle-right-front"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("ankle-right-front")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Feet with better shape */}
                        <ellipse
                          cx="83"
                          cy="403"
                          rx="10"
                          ry="15"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("ankle-left-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "ankle-left-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "ankle-left-front"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("ankle-left-front")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        <ellipse
                          cx="117"
                          cy="403"
                          rx="10"
                          ry="15"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("ankle-right-front")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "ankle-right-front"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "ankle-right-front"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("ankle-right-front")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                      </>
                    ) : (
                      <>
                        {/* Back View - Enhanced */}
                        {/* Head (back) */}
                        <ellipse
                          cx="100"
                          cy="25"
                          rx="22"
                          ry="28"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("neck-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "neck-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "neck-back")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("neck-back")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Neck (back) */}
                        <path
                          d="M 88 50 L 85 65 L 90 70 L 110 70 L 115 65 L 112 50 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("neck-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-1"
                              : hoveredPart === "neck-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-1"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "neck-back")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("neck-back")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Spine line for neck */}
                        <line
                          x1="100"
                          y1="50"
                          x2="100"
                          y2="70"
                          stroke="#9ca3af"
                          strokeWidth="2"
                          opacity="0.4"
                        />

                        {/* Upper Back/Trapezius */}
                        <path
                          d="M 75 72 Q 65 75 60 85 L 70 105 Q 80 108 100 108 Q 120 108 130 105 L 140 85 Q 135 75 125 72 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("mid-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "mid-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "mid-back")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("mid-back")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Shoulder blades definition */}
                        <path
                          d="M 80 80 Q 85 90 82 100"
                          stroke="#9ca3af"
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.4"
                        />
                        <path
                          d="M 120 80 Q 115 90 118 100"
                          stroke="#9ca3af"
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.4"
                        />
                        {/* Spine line for upper back */}
                        <line
                          x1="100"
                          y1="72"
                          x2="100"
                          y2="108"
                          stroke="#9ca3af"
                          strokeWidth="2"
                          opacity="0.4"
                        />

                        {/* Lower Back/Lumbar */}
                        <path
                          d="M 78 110 Q 70 125 70 145 Q 70 160 75 168 L 125 168 Q 130 160 130 145 Q 130 125 122 110 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("lower-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "lower-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "lower-back")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("lower-back")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Spine line for lower back */}
                        <line
                          x1="100"
                          y1="110"
                          x2="100"
                          y2="168"
                          stroke="#9ca3af"
                          strokeWidth="2"
                          opacity="0.4"
                        />
                        {/* Erector spinae muscles */}
                        <line
                          x1="92"
                          y1="115"
                          x2="90"
                          y2="163"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        <line
                          x1="108"
                          y1="115"
                          x2="110"
                          y2="163"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          opacity="0.3"
                        />

                        {/* Lower torso (non-clickable, for visual structure) */}
                        <path
                          d="M 78 170 Q 72 180 72 195 Q 75 205 85 205 L 100 205 L 115 205 Q 125 205 128 195 Q 128 180 122 170 Z"
                          fill="#e5e7eb"
                          opacity="0.2"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          filter="url(#shadow)"
                        />

                        {/* Thighs (Back) */}
                        <path
                          d="M 72 210 Q 68 235 70 260 Q 72 278 76 285 L 88 285 Q 90 278 88 260 Q 86 235 82 210 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("hamstring-left-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "hamstring-left-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "hamstring-left-back"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("hamstring-left-back")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Hamstring muscle definition */}
                        <path
                          d="M 76 220 Q 74 245 76 270"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          fill="none"
                          opacity="0.3"
                        />
                        <path
                          d="M 84 220 Q 82 245 84 270"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          fill="none"
                          opacity="0.3"
                        />

                        <path
                          d="M 128 210 Q 132 235 130 260 Q 128 278 124 285 L 112 285 Q 110 278 112 260 Q 114 235 118 210 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("hamstring-right-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "hamstring-right-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find(
                                (p) => p.id === "hamstring-right-back"
                              )!
                            )
                          }
                          onMouseEnter={() =>
                            setHoveredPart("hamstring-right-back")
                          }
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Hamstring muscle definition */}
                        <path
                          d="M 124 220 Q 126 245 124 270"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          fill="none"
                          opacity="0.3"
                        />
                        <path
                          d="M 116 220 Q 118 245 116 270"
                          stroke="#9ca3af"
                          strokeWidth="1"
                          fill="none"
                          opacity="0.3"
                        />

                        {/* Calves */}
                        <path
                          d="M 76 290 Q 74 315 78 340 Q 80 365 82 390 L 86 390 Q 88 365 86 340 Q 84 315 82 290 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("calf-left-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "calf-left-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "calf-left-back")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("calf-left-back")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Calf muscle bulge */}
                        <ellipse
                          cx="81"
                          cy="320"
                          rx="4"
                          ry="15"
                          fill="#9ca3af"
                          opacity="0.3"
                        />
                        {/* Achilles tendon */}
                        <line
                          x1="83"
                          y1="380"
                          x2="83"
                          y2="390"
                          stroke="#9ca3af"
                          strokeWidth="2"
                          opacity="0.4"
                        />

                        <path
                          d="M 124 290 Q 126 315 122 340 Q 120 365 118 390 L 114 390 Q 112 365 114 340 Q 116 315 118 290 Z"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("calf-right-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "calf-right-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "calf-right-back")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("calf-right-back")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        {/* Calf muscle bulge */}
                        <ellipse
                          cx="119"
                          cy="320"
                          rx="4"
                          ry="15"
                          fill="#9ca3af"
                          opacity="0.3"
                        />
                        {/* Achilles tendon */}
                        <line
                          x1="117"
                          y1="380"
                          x2="117"
                          y2="390"
                          stroke="#9ca3af"
                          strokeWidth="2"
                          opacity="0.4"
                        />

                        {/* Heels */}
                        <ellipse
                          cx="83"
                          cy="403"
                          rx="10"
                          ry="15"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("calf-left-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "calf-left-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "calf-left-back")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("calf-left-back")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                        <ellipse
                          cx="117"
                          cy="403"
                          rx="10"
                          ry="15"
                          className={`cursor-pointer transition-all duration-300 ${
                            isPartSelected("calf-right-back")
                              ? "fill-red-500 opacity-80 stroke-red-600 stroke-2"
                              : hoveredPart === "calf-right-back"
                              ? "fill-teal-400 opacity-60 stroke-teal-500 stroke-2"
                              : "fill-gray-300 dark:fill-gray-600 opacity-40 stroke-gray-400 dark:stroke-gray-500"
                          }`}
                          filter="url(#shadow)"
                          onClick={() =>
                            handleBodyPartClick(
                              bodyParts.find((p) => p.id === "calf-right-back")!
                            )
                          }
                          onMouseEnter={() => setHoveredPart("calf-right-back")}
                          onMouseLeave={() => setHoveredPart(null)}
                        />
                      </>
                    )}
                  </svg>

                  {/* Hover Tooltip */}
                  {hoveredPart && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-10 whitespace-nowrap">
                      {bodyParts.find((p) => p.id === hoveredPart)?.name}
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  Click on body parts where you feel pain
                </div>
              </div>

              {/* Selected Parts & Controls */}
              <div className="space-y-6">
                <div className="glass-premium dark:glass-dark p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Selected Pain Areas ({selectedParts.length})
                  </h3>

                  {selectedParts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>No areas selected yet.</p>
                      <p className="text-sm mt-2">
                        Click on the body diagram to add pain areas.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedParts.map((point) => {
                        const part = bodyParts.find((p) => p.id === point.id);
                        return (
                          <div
                            key={point.id}
                            className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {part?.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {part?.area}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  setSelectedParts(
                                    selectedParts.filter(
                                      (p) => p.id !== point.id
                                    )
                                  )
                                }
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {selectedParts.length > 0 && (
                  <button
                    onClick={handleViewResults}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    View Summary
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Results View
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="glass-premium dark:glass-dark p-8 sm:p-12 rounded-3xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Your Pain Assessment Summary
              </h3>

              <div className="space-y-6 mb-8">
                <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border-2 border-teal-200 dark:border-teal-800">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                    Identified Pain Areas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedParts.map((point) => (
                      <span
                        key={point.id}
                        className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-900 dark:text-white border border-teal-300 dark:border-teal-700"
                      >
                        {bodyParts.find((p) => p.id === point.id)?.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 p-6 rounded-2xl">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Thank you for completing the pain assessment. We recommend
                    scheduling a consultation with our experienced
                    physiotherapists. They will provide a detailed evaluation
                    and create a personalized treatment plan for your recovery.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book Appointment Now
                </button>
                <button
                  onClick={resetAssessment}
                  className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Start New Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PainLocator;
