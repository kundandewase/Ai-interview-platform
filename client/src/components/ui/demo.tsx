import React from 'react';
import { LayoutDashboard, Code2, Trophy, History } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const MinimalistHeroDemo = () => {
  const navLinks = [
    { label: 'DASHBOARD', href: '/dashboard' },
    { label: 'PROBLEMS', href: '/problems' },
    { label: 'INTERVIEW', href: '/interview' },
    { label: 'LEADERBOARD', href: '/leaderboard' },
  ];

  const socialLinks = [
    { icon: LayoutDashboard, href: '/dashboard' },
    { icon: Code2, href: '/problems' },
    { icon: Trophy, href: '/leaderboard' },
    { icon: History, href: '/history' },
  ];

  return (
    <MinimalistHero
      logoText="AI Interview"
      navLinks={navLinks}
      mainText="Practice real coding rounds with AI feedback, solve curated problems, and track your interview readiness over time."
      readMoreLink="/interview"
      overlayText={{
        part1: 'ace your',
        part2: 'interviews.',
      }}
      socialLinks={socialLinks}
      locationText="Track progress. Build confidence."
    />
  );
};

export default MinimalistHeroDemo;
