"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "@/hooks/use-theme-context";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeController>{children}</ThemeController>
    </NextThemesProvider>
  );
}

function ThemeController({ children }: { children: React.ReactNode }) {
  const { setTheme, theme } = useTheme();
  const [targetTheme, setTargetTheme] = React.useState<"light" | "dark" | null>(null);
  
  const themeColors = {
    light: "oklch(1 0 0)",
    dark: "#1E1E20", 
  };

  const toggleTheme = () => {
    setTargetTheme(theme === "light" ? "dark" : "light");
  };

  const handleAnimationComplete = () => {
    if (targetTheme) {
      setTheme(targetTheme);
      setTargetTheme(null);
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
      <AnimatePresence>
        {targetTheme && (
          <motion.div
            style={{
              backgroundColor: themeColors[targetTheme],
              top: 'calc(50px - 100vmax)',
              right: 'calc(50px - 100vmax)',
            }}
            className="fixed h-0 w-0 rounded-full z-[9999]"
            initial={{ width: 0, height: 0 }}
            animate={{
              width: "200vmax",
              height: "200vmax",
            }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}