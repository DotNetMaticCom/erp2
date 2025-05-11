
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { themeVariant, setThemeVariant } = useTheme();

  const toggleThemeVariant = () => {
    const newVariant = themeVariant === "light" ? "dark" : "light";
    console.log("[ThemeSwitcher] toggleThemeVariant called. Current themeVariant:", themeVariant, "Attempting to set to:", newVariant);
    setThemeVariant(newVariant);
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleThemeVariant}
      className="relative overflow-hidden transition-all duration-300 hover:bg-primary/10"
      aria-label={themeVariant === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun 
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-out ${
            themeVariant === "light" 
              ? "rotate-0 scale-100 opacity-100" 
              : "rotate-90 scale-0 opacity-0"
          }`} 
        />
        <Moon 
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-out ${
            themeVariant === "dark" 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          }`} 
        />
      </div>
      <span className="sr-only">Toggle theme variant</span>
    </Button>
  );
}
