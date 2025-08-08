"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/hooks/use-theme-context";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { toggleTheme } = useThemeContext(); 

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="
        rounded-full p-2 relative overflow-hidden
        
        // Light Mode styles (default)
        bg-[#EAEAE8] text-black
        hover:bg-zinc-300 

        // Dark Mode styles
        dark:bg-black dark:text-[#EAEAE8]
        dark:hover:bg-zinc-900 
        
        // General styles
        transition-colors duration-300
      "
      aria-label="Toggle theme" 
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}