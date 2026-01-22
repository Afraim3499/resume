export interface SocialProfile {
  platform: string;
  url: string;
  username?: string;
  icon: string;
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/rizwanul-islam-afraim99/",
    username: "rizwanul-islam-afraim99",
    icon: "linkedin",
  },
  {
    platform: "GitHub",
    url: "https://github.com/Afraim3499",
    username: "Afraim3499",
    icon: "github",
  },
  {
    platform: "X",
    url: "https://x.com/rizwanul_afraim",
    username: "rizwanul_afraim",
    icon: "twitter",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/Rizwan.Afraim/",
    username: "Rizwan.Afraim",
    icon: "facebook",
  },
  {
    platform: "Dev.to",
    url: "https://dev.to/rizwanul_islam_afraim",
    username: "rizwanul_islam_afraim",
    icon: "book", // mapped to BookOpen in SocialLinks component
  },
  {
    platform: "Medium",
    url: "https://medium.com/@rizwanul_afraim",
    username: "@rizwanul_afraim",
    icon: "medium",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/afraim_privateer/",
    username: "afraim_privateer",
    icon: "instagram",
  },
  {
    platform: "YouTube",
    url: "https://www.youtube.com/@rizwanul_afraim",
    username: "rizwanul_afraim",
    icon: "youtube",
  },
];

export const socialProof = {
  communitySize: "3,500+",
  communityLabel: "Investors",
  projects: 6,
  experience: "3+",
  experienceLabel: "Years",
};

