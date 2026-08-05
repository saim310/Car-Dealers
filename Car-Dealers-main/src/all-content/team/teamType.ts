import { StaticImageData } from "next/image";

export interface TeamButtonItem {
  id: number;
  tabId: string;
  experienceYears: number;
  name: string;
  role: string;
  image: string | StaticImageData;
}

export interface TeamTabItem {
  id: number;
  tabId: string;
  image: string | StaticImageData;
  socials: string[];
}


export interface TeamMemberTwo {
  id: number;
  name: string;
  role: string;
  image: string | StaticImageData;
  link: string;
}

export interface TeamMember {
  id: number;
  image: string | StaticImageData;
  name: string;
  role: string;
}

