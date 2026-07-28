import { LucideIcon } from "lucide-react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface FooterBrandProps {
  socialLinks: SocialLink[];
}

export interface FooterLinksProps {
  sections: FooterSection[];
}

export interface FooterNewsletterProps {
  title: string;
  description: string;
}

export interface FooterBottomProps {
  year: number;
}