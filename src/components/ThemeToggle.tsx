import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 bg-gray-300 dark:bg-teal-600"
      aria-label="Toggle theme"
    >
      {/* Slider circle */}
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 flex items-center justify-center ${
          theme === "dark" ? "translate-x-9" : "translate-x-1"
        }`}
      >
        {theme === "light" ? (
          <Sun className="w-4 h-4 text-yellow-500" />
        ) : (
          <Moon className="w-4 h-4 text-blue-600" />
        )}
      </span>

      {/* Background icons */}
      <span className="absolute left-2 flex items-center pointer-events-none">
        <Sun
          className={`w-4 h-4 transition-opacity duration-300 ${
            theme === "light" ? "opacity-0" : "opacity-70 text-yellow-300"
          }`}
        />
      </span>
      <span className="absolute right-2 flex items-center pointer-events-none">
        <Moon
          className={`w-4 h-4 transition-opacity duration-300 ${
            theme === "dark" ? "opacity-0" : "opacity-70 text-gray-600"
          }`}
        />
      </span>
    </button>
  );
}

export default ThemeToggle;
