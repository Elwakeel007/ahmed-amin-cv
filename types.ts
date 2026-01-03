export interface WorkItem {
  id: string;
  title: string;
  type: string; // "TV Series", "Film", "Commercial"
  videoUrl: string; // YouTube Embed URL
}

export interface TranslationData {
  nav: {
    home: string;
    about: string;
    works: string;
    contact: string;
  };
  hero: {
    role: string;
    tagline: string;
    actions: {
      whatsapp: string;
      call: string;
      location: string;
    }
  };
  about: {
    title: string;
    description: string;
    servicesTitle: string;
    services: string[];
  };
  works: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    connect: string;
  };
  items: {
    works: WorkItem[];
  };
}

export interface AppData {
  en: TranslationData;
  ar: TranslationData;
}