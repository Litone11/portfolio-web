import { ComponentType } from "react";

export interface ProjectItem {
  n: string;
  title: string;
  year: string;
  kind: string;
  desc: string;
  stack: string[];
  github: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  place: string;
}

export interface SocialItem {
  label: string;
  handle: string;
  href: string;
}

export interface SocialIcon {
  k: string;
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
}

export interface Shortcut {
  id: string;
  label: string;
  num: string;
  count: string | null;
  note: string;
}

export interface TweakState {
  layout: "a" | "b" | "c";
  accent: "blue" | "red" | "green" | "black";
  inverted: boolean;
  cursor: boolean;
}
