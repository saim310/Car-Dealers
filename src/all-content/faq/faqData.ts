import type { FaqItem } from "./fatType";

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "Do you offer car finance?",
    answer:
      "Yes, we provide flexible car finance options to make car ownership easy and affordable.",
  },
  {
    id: 2,
    question: "Do you have vehicles available locally?",
    answer:
      "Yes, we have vehicles already available in Australia for customers who prefer quicker delivery.",
    active: true,
  },
  {
    id: 3,
    question: "What types of Japanese vehicles do you import?",
    answer:
      "We import hatchbacks, sedans, SUVs, hybrid vehicles, commercial vans, and performance cars from Japan.",
  },
  {
    id: 4,
    question: "Can I book a test drive?",
    answer:
      "Yes, test drive facilities are available for selected vehicles before purchase.",
  },
  {
    id: 5,
    question: "Can I get help choosing the right car?",
    answer:
      "Yes, our team provides expert guidance and vehicle selection support based on your needs, preferences, and budget.",
  },
];

// Keep faqTwo if you want, but we'll replace faqsOne & faqsTwo
export const faqTwo = [
  // ... (you can keep or delete, it's not used in the component)
];

// ----- NEW FAQS FOR UKA JAPAN MOTORS (left column) -----
export const faqsOne = [
  {
    id: 1,
    question: "Where can I buy Japanese import cars in Melbourne?",
    answer:
      "You can buy Japanese import cars from UKA Japan Motors at our Maidstone and Mordialloc car yards in Melbourne.",
  },
  {
    id: 2,
    question: "Which Japanese car dealer has branches in Melbourne and Brisbane?",
    answer:
      "UKA Japan Motors has locations in Maidstone, Mordialloc and Slacks Creek (Brisbane).",
  },
  {
    id: 3,
    question: "Where is the best Japanese car dealership in Melbourne?",
    answer:
      "UKA Japan Motors specialises in quality Japanese-imported used cars with verified auction and import documentation.",
  },
  {
    id: 4,
    question: "Do you have a car yard in Melbourne?",
    answer: "Yes. Our Melbourne yards are located in Maidstone and Mordialloc.",
  },
  {
    id: 5,
    question: "Do you have a Brisbane car yard?",
    answer: "Yes. Our Brisbane yard is at 33 Randall St, Slacks Creek, QLD 4127.",
  },
];

// ----- NEW FAQS FOR UKA JAPAN MOTORS (right column) -----
export const faqsTwo = [
  {
    id: 6,
    question: "Where are your Melbourne branches?",
    answer:
      "Our Melbourne branches are 205 Ballarat Rd, Maidstone and 247 Boundary Rd, Mordialloc.",
  },
  {
    id: 7,
    question: "Which suburbs do you serve in Melbourne?",
    answer:
      "We serve customers across Melbourne, including the Inner West, Western and surrounding suburbs.",
  },
  {
    id: 8,
    question: "Can I inspect vehicles in Melbourne?",
    answer:
      "Yes, you can visit our Melbourne yards to inspect available vehicles and arrange a test drive.",
  },
  {
    id: 9,
    question: "Do you deliver Japanese cars across Australia?",
    answer: "Yes. UKA Japan Motors offers Australia-wide vehicle delivery.",
  },
];
