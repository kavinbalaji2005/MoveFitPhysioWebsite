import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-scroll carousel
  useEffect(() => {
    if (isAutoPlay && isVisible) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, isVisible]);

  const images = [
    { id: 1, src: "/assets/1.jpg", alt: "MoveFit Physio Gallery 1" },
    { id: 2, src: "/assets/2.jpg", alt: "MoveFit Physio Gallery 2" },
    { id: 3, src: "/assets/3.jpg", alt: "MoveFit Physio Gallery 3" },
    { id: 4, src: "/assets/4.jpg", alt: "MoveFit Physio Gallery 4" },
    { id: 5, src: "/assets/5.jpg", alt: "MoveFit Physio Gallery 5" },
    { id: 6, src: "/assets/6.jpg", alt: "MoveFit Physio Gallery 6" },
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlay(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle background gradient matching other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/10 to-transparent dark:from-transparent dark:via-teal-900/5 dark:to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight px-2 sm:px-4">
            Our{" "}
            <span className="text-teal-600 dark:text-teal-400">Gallery</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 mx-auto rounded-full mb-4 sm:mb-6 animate-pulse"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto px-4">
            Explore our facilities and the care we provide to our patients
          </p>
        </div>

        {/* Carousel Section */}
        <div
          className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="relative w-full touch-pan-y"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="min-w-full flex-shrink-0 relative cursor-pointer group touch-manipulation"
                    onClick={() => openModal(index)}
                  >
                    {/* Image Container with proper aspect ratio - 3:4 on mobile, 16:9 on desktop */}
                    <div className="relative w-full aspect-[3/4] md:aspect-video">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-contain bg-gray-900 dark:bg-gray-950 transform md:group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* Gradient Overlay - Hidden on mobile, visible on hover for desktop */}
                      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                          <div className="flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 lg:p-4">
                              <ZoomIn className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile tap indicator */}
                      <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 opacity-50">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Animated Border - Desktop only */}
                      <div className="hidden md:block absolute inset-0 border-4 border-transparent group-hover:border-teal-500 transition-all duration-500 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Smaller on mobile */}
            <button
              onClick={prevSlide}
              className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 md:p-3 rounded-full glass-premium dark:glass-dark hover:bg-white/30 dark:hover:bg-white/20 text-gray-900 dark:text-white transition-all duration-300 border border-white/30 shadow-lg md:shadow-xl active:scale-95 md:hover:scale-110 z-10 touch-manipulation"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 md:p-3 rounded-full glass-premium dark:glass-dark hover:bg-white/30 dark:hover:bg-white/20 text-gray-900 dark:text-white transition-all duration-300 border border-white/30 shadow-lg md:shadow-xl active:scale-95 md:hover:scale-110 z-10 touch-manipulation"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Dots Indicator - Optimized for mobile */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10 px-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full touch-manipulation ${
                    currentSlide === index
                      ? "w-5 sm:w-6 md:w-8 h-2 sm:h-2.5 md:h-3 bg-teal-500"
                      : "w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-white/50 active:bg-white/80 md:hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal - Optimized for mobile */}
      {isModalOpen && selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button - Better positioned on mobile */}
          <button
            onClick={closeModal}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 rounded-full glass-premium dark:glass-dark hover:bg-white/20 dark:hover:bg-white/10 text-white transition-all duration-200 z-10 border border-white/20 touch-manipulation active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Previous Button - Optimized for mobile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full glass-premium dark:glass-dark hover:bg-white/20 dark:hover:bg-white/10 text-white transition-all duration-200 z-10 border border-white/20 touch-manipulation active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image Container - Better mobile spacing */}
          <div
            className="max-w-7xl max-h-[90vh] mx-2 sm:mx-4 animate-scaleIn flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] w-auto h-auto object-contain rounded-lg sm:rounded-2xl shadow-2xl transition-all duration-300"
              key={selectedImage}
            />

            {/* Image Counter - Better mobile positioning */}
            <div className="absolute bottom-16 sm:bottom-4 left-1/2 -translate-x-1/2">
              <span className="inline-block glass-premium dark:glass-dark px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm font-medium border border-white/20 animate-slideUp">
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Next Button - Optimized for mobile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full glass-premium dark:glass-dark hover:bg-white/20 dark:hover:bg-white/10 text-white transition-all duration-200 z-10 border border-white/20 touch-manipulation active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Thumbnail Navigation - Hidden on small mobile */}
          <div className="hidden sm:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 gap-2 overflow-x-auto max-w-[90vw] px-4 pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 touch-manipulation ${
                  selectedImage === index
                    ? "border-teal-500 scale-110 shadow-lg shadow-teal-500/50"
                    : "border-white/30 hover:border-white/60 active:scale-95 md:hover:scale-105"
                }`}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${image.id}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
