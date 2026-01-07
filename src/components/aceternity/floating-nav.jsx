"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
  logoSrc,
  logoAlt = "Logo",
  ctaText,
  ctaLink,
  ctaIcon
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Always visible now

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex w-[95%] md:w-[90%] max-w-6xl fixed top-4 md:top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-3 md:px-6 py-2 md:py-3 items-center justify-between",
          className
        )}>
        {/* Logo - Left Aligned */}
        {logoSrc && (
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src={logoSrc} 
              alt={logoAlt} 
              className="h-6 md:h-8 w-auto object-contain"
            />
          </Link>
        )}

        {/* Navigation Items - Right Aligned */}
        <div className="flex items-center gap-2 md:gap-6">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}>
              <span className="block md:hidden">{navItem.icon}</span>
              <span className="hidden md:block text-xs md:text-sm whitespace-nowrap">{navItem.name}</span>
            </Link>
          ))}

          {/* CTA Button */}
          {ctaText && ctaLink && (
            <Link to={ctaLink}>
              <button
                className="bg-accent hover:bg-accent/90 text-xs md:text-sm font-medium text-black px-2 md:px-4 py-1.5 md:py-2 rounded-full transition-colors flex items-center gap-1 md:gap-2 whitespace-nowrap">
                <span className="hidden sm:inline">{ctaText}</span>
                <span className="sm:hidden">Contact</span>
                {ctaIcon && <span className="hidden sm:inline">{ctaIcon}</span>}
              </button>
            </Link>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
