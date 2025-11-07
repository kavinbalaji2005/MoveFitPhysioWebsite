import { MapPin, Phone, Mail, Clock } from "lucide-react";

function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black text-white py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 md:mb-12">
          {/* About */}
          <div className="xs:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <img
                src="/assets/logo.jpeg"
                alt="MoveFit"
                className="h-10 sm:h-12 w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              MoveFit Physiotherapy Centre
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm leading-relaxed">
              Personalized physiotherapy and rehabilitation care in Coimbatore.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-teal-400">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-gray-400 hover:text-teal-400 transition-colors text-xs sm:text-sm flex items-center group touch-manipulation"
                >
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-teal-400 transition-colors text-xs sm:text-sm flex items-center group touch-manipulation"
                >
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-400 hover:text-teal-400 transition-colors text-xs sm:text-sm flex items-center group touch-manipulation"
                >
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-teal-400 transition-colors text-xs sm:text-sm flex items-center group touch-manipulation"
                >
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-teal-400">
              Contact Info
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start space-x-2 sm:space-x-3 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/30 transition-colors">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                </div>
                <a
                  href="tel:+919894743636"
                  className="text-gray-400 hover:text-teal-400 transition-colors text-xs sm:text-sm touch-manipulation"
                >
                  +91 98947 43636
                </a>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/30 transition-colors">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                </div>
                <a
                  href="mailto:dharanikas77@gmail.com"
                  className="text-gray-400 hover:text-teal-400 transition-colors text-xs sm:text-sm break-all touch-manipulation"
                >
                  dharanikas77@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/30 transition-colors">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                </div>
                <a
                  href="https://maps.app.goo.gl/xPdtmSy6WqMTunfY9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors text-xs sm:text-sm touch-manipulation"
                >
                  Ganapathy, Coimbatore
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-teal-400">
              Business Hours
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                </div>
                <div className="text-xs sm:text-sm">
                  <p className="text-gray-400 mb-1 sm:mb-2">
                    Monday - Saturday
                  </p>
                  <p className="text-white font-semibold text-xs sm:text-sm">
                    10:00 AM - 1:00 PM
                  </p>
                  <p className="text-white font-semibold text-xs sm:text-sm">
                    5:30 PM - 7:30 PM
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm pl-9 sm:pl-11">
                <p className="text-gray-400">Sunday</p>
                <p className="text-white font-semibold mt-1">Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
              © 2025 MoveFit Physiotherapy Centre. All Rights Reserved.
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 text-center md:text-right">
              R Dharanika B.P.T, M.IA.P | Registration No: L - 6208
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
