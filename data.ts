import { AppData } from './types';

// Shared Data
const PHONE_NUMBER = "+201009809127";
const WHATSAPP_LINK = "https://wa.me/201009809127";
const MAP_LINK = "https://maps.app.goo.gl/Nddj9N9raLz5o5Hb7?g_st=ac";

const WORKS = [
  {
    id: "ward-chocolate",
    title: "Ward & Chocolate",
    type: "TV Series",
    videoUrl: "https://www.youtube.com/embed/xZ8rhK6vHLI"
  },
  {
    id: "what-you-see",
    title: "What You See Is Not What It Seems",
    type: "TV Series",
    videoUrl: "https://www.youtube.com/embed/0jmRcP9ZuSQ"
  },
  {
    id: "oscar",
    title: "Oscar: Return of the Mammoth",
    type: "Film",
    videoUrl: "https://www.youtube.com/embed/u0pXgLocWYA"
  },
  {
    id: "zed-park",
    title: "Zed Park – Ramadan Campaign",
    type: "Commercial",
    videoUrl: "https://www.youtube.com/embed/gCIEGdUNUgs"
  }
];

export const CONTACT_INFO = {
  phone: PHONE_NUMBER,
  whatsapp: WHATSAPP_LINK,
  map: MAP_LINK,
  displayPhone: "+20 100 980 9127"
};

export const CV_DATA: AppData = {
  en: {
    nav: {
      home: "Home",
      about: "Services",
      works: "Portfolio",
      contact: "Contact",
    },
    hero: {
      role: "Ahmed Amin",
      tagline: "Costume Executor | Film & TV Productions",
      actions: {
        whatsapp: "WhatsApp",
        call: "Call Now",
        location: "Location"
      }
    },
    about: {
      title: "Professional Services",
      description: "A professional Costume Executor specializing in renting, designing, and executing costumes for all needs of Cinema, TV Drama, Commercials, and Events. We offer integrated solutions starting from concept analysis through design and execution, ensuring high-quality delivery and attention to detail.",
      servicesTitle: "We execute and provide all types of clothing, including:",
      services: [
        "Cinema & Drama Costumes",
        "Security & Guard Uniforms",
        "Medical & Nursing Scrubs",
        "Hospitality, Restaurant & Club Uniforms",
        "Traditional Sa'idi Costumes",
        "Abayas & Traditional Wear",
        "Formal Suits",
        "T-Shirts, Polos & Caps",
        "Delivery Staff Uniforms",
        "Safety Wear",
        "Factory & Bakery Overalls"
      ]
    },
    works: {
      title: "Selected Works",
      subtitle: "A cinematic journey through fabric and character.",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Open for new productions and creative collaborations.",
      connect: "Connect"
    },
    items: {
      works: WORKS.map(w => ({...w})) // Clone structure
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "خدماتنا",
      works: "أعمالي",
      contact: "تواصل معي",
    },
    hero: {
      role: "أحمد أمين",
      tagline: "منفّذ ملابس | إنتاج سينمائي وتلفزيوني",
      actions: {
        whatsapp: "واتساب",
        call: "اتصال",
        location: "الموقع"
      }
    },
    about: {
      title: "عن خدماتنا",
      description: "منفّذ ملابس محترف متخصص في تأجير وتصميم وتنفيذ الملابس لكافة احتياجات السينما، الدراما التلفزيونية، الإعلانات، والفعاليات. نقدّم حلولًا متكاملة تبدأ من فهم متطلبات العمل، مرورًا بالتصميم والتنفيذ، وصولًا إلى التسليم النهائي بجودة عالية ودقة في التفاصيل.",
      servicesTitle: "ننفّذ ونوفّر جميع أنواع الملابس، بما في ذلك:",
      services: [
        "ملابس السينما والأعمال الدرامية",
        "ملابس الأمن والحراسة",
        "ملابس التمريض والأطباء",
        "ملابس الويتر والمطاعم والأندية",
        "الملابس الصعيدية التراثية",
        "العبايات بأنواعها",
        "البدل الرسمية",
        "التيشيرتات والبولو والكابات",
        "ملابس الدليفري",
        "ملابس السلامة (Safety Wear)",
        "الأفرولات وأزياء المصانع والأفران"
      ]
    },
    works: {
      title: "مختارات من الأعمال",
      subtitle: "رحلة سينمائية عبر الأزياء والشخصيات.",
    },
    contact: {
      title: "تواصل معي",
      subtitle: "متاح للمشاريع الفنية والإنتاجية الجديدة.",
      connect: "تواصل"
    },
    items: {
      works: WORKS.map(w => ({
        ...w,
        type: w.type === "TV Series" ? "مسلسل تلفزيوني" : w.type === "Film" ? "فيلم سينمائي" : "إعلان تجاري"
      }))
    },
  },
};