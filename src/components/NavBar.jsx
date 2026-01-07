// src/components/Navbar.jsx
import { Briefcase, Package, Users, Lightbulb, ArrowRight } from "lucide-react";
import { FloatingNav } from "./aceternity/floating-nav";

export default function Navbar({ onContactClick }) {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <ArrowRight className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Services",
      link: "/#services",
      icon: <Briefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Products",
      link: "/#horizontal",
      icon: <Package className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Leadership",
      link: "/#leadership",
      icon: <Users className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Careers",
      link: "/careers",
      icon: <Briefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Insights",
      link: "/#insights",
      icon: <Lightbulb className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <FloatingNav 
      navItems={navItems}
      logoSrc="/logo.png"
      logoAlt="Buildbot Logo"
      ctaText="Contact us"
      ctaLink="/#cta"
      ctaIcon={<ArrowRight className="w-4 h-4" />}
    />
  );
}
    
