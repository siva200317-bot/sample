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
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
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
                className="border text-xs md:text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-2 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors flex items-center gap-1 md:gap-2 whitespace-nowrap">
                <span className="hidden sm:inline">{ctaText}</span>
                <span className="sm:hidden">Contact</span>
                {ctaIcon && <span className="hidden sm:inline">{ctaIcon}</span>}
                <span
                  className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px" />
              </button>
            </Link>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
