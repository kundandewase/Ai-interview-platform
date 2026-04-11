import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc?: string;
  imageAlt?: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-slate-300/70 transition-colors hover:text-cyan-300"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="text-slate-300/70 transition-colors hover:text-emerald-300"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
};

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt = 'Hero visual',
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-slate-950 p-8 font-sans text-slate-100 md:p-12',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(6,182,212,0.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_34%),linear-gradient(135deg,#020617_0%,#0b1120_55%,#111827_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-[linear-gradient(to_top,rgba(34,197,94,0.18),transparent)]" />

      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider text-cyan-300"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-slate-100"></span>
          <span className="block h-0.5 w-6 bg-slate-100"></span>
          <span className="block h-0.5 w-5 bg-slate-100"></span>
        </motion.button>
      </header>

      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-200/90 md:mx-0">{mainText}</p>
          <a
            href={readMoreLink}
            className="mt-4 inline-block text-sm font-semibold text-emerald-300 underline decoration-emerald-400"
          >
            Read More
          </a>
        </motion.div>

        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.35),rgba(16,185,129,0.08)_55%,transparent_70%)] blur-sm md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
          ></motion.div>
          {imageSrc ? (
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="relative z-10 h-auto w-56 scale-150 object-cover md:w-64 lg:w-72"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="relative z-10 rounded-2xl border border-cyan-300/30 bg-slate-900/75 p-8 text-center shadow-[0_0_50px_rgba(6,182,212,0.2)] backdrop-blur"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300/90">AI INTERVIEW PLATFORM</p>
              <p className="mt-3 text-2xl font-bold text-slate-100">Practice. Improve. Get Hired.</p>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-6xl font-extrabold uppercase leading-[0.9] text-slate-100 md:text-8xl lg:text-9xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-slate-300/90"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
