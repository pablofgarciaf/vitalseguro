"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const hasDark = document.documentElement.classList.contains("dark");
    setIsDark(hasDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("gj-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("gj-theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div
        className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-white/10 bg-black/5 dark:bg-white/[0.03]"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="p-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] hover:border-[#C9A84C]/50 text-zinc-700 dark:text-[#A9A9A9] hover:text-black dark:hover:text-white transition-all cursor-pointer flex items-center justify-center"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#F5D78A]" />
      ) : (
        <Moon className="w-4 h-4 text-[#C9A84C]" />
      )}
    </button>
  );
}
