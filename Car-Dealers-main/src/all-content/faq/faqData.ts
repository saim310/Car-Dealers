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

interface FaqTwo {
    id: number;
    question: string;
    answer: string;
}

export const faqTwo: FaqTwo[] = [
    {
        id: 1,
        question: `How old do I need to be to rent a car?`,
        answer: `You must be at least 21 years of age to rent a vehicle from our fleet. Drivers under 25 may be subject to a young driver surcharge. A valid driver's license held for a minimum of one year is required.`
    },
    {
        id: 2,
        question: `What documents do I need to import a car from Japan?`,
        answer: `You will need a valid photo ID, proof of address, import approval from the Department of Infrastructure, and compliance documentation. Our team handles all paperwork on your behalf to ensure a smooth process.`
    },
    {
        id: 3,
        question: `How long does the import process take?`,
        answer: `The typical import timeline from Japan to Australia is 6 to 10 weeks, depending on shipping schedules, customs clearance, and compliance inspections. We provide regular updates throughout the entire process.`
    },
    {
        id: 4,
        question: `Are imported Japanese cars compliant with Australian standards?`,
        answer: `Yes, all vehicles we import undergo thorough compliance checking and modification to meet Australian Design Rules (ADR) before delivery. We work with certified compliance workshops to ensure full roadworthiness.`
    },
    {
        id: 5,
        question: `Do you offer warranty on imported vehicles?`,
        answer: `Yes, we offer comprehensive warranty packages on all imported vehicles. Coverage includes engine, transmission, and electrical components. Extended warranty options are also available for added peace of mind.`
    },
    {
        id: 6,
        question: `Can I trade in my current vehicle?`,
        answer: `Absolutely. We accept trade-ins and offer competitive valuations based on current market rates. Simply bring your vehicle in for an assessment, and we will apply the trade-in value toward your purchase or import order.`
    }
]


export const faqsOne: FaqTwo[] = [
    {
        id: 1,
        question: `How old do I need to be to rent a car?`,
        answer: `You must be at least 21 years of age to rent a vehicle from our fleet. Drivers under 25 may be subject to a young driver surcharge. A valid driver's license held for a minimum of one year is required.`
    },
    {
        id: 2,
        question: `What is the deposit requirement for vehicle rental?`,
        answer: `A security deposit of $500 is required for all rentals, held on your credit card and released within 5-7 business days after the vehicle is returned in satisfactory condition.`
    },
    {
        id: 3,
        question: `Can I modify or cancel my import order?`,
        answer: `Orders can be modified within 48 hours of placement at no charge. Cancellations made before shipping departure are eligible for a full refund minus a $500 administrative fee.`
    },
    {
        id: 4,
        question: `Do you provide vehicle inspection reports?`,
        answer: `Yes, every imported vehicle comes with a detailed auction sheet and independent inspection report from Japan, including mileage verification, condition grading, and any noted defects.`
    },
    {
        id: 5,
        question: `Is insurance included with rental vehicles?`,
        answer: `Basic third-party insurance is included with every rental. Comprehensive coverage and reduced excess options are available as upgrades at competitive daily rates.`
    },
]

export const faqsTwo: FaqTwo[] = [
    {
        id: 6,
        question: `What payment methods do you accept?`,
        answer: `We accept bank transfers, credit and debit cards, and certified cheques. For imports, a 50% deposit is required upfront with the balance due prior to delivery.`
    },
    {
        id: 7,
        question: `Can I arrange my own shipping for an imported car?`,
        answer: `While we recommend using our trusted shipping partners for insurance and tracking purposes, you may arrange your own shipping. Please note that compliance and clearance responsibilities remain with the importer.`
    },
    {
        id: 8,
        question: `Do you offer after-sales support?`,
        answer: `Yes, our dedicated after-sales team is available to assist with servicing, parts sourcing, warranty claims, and general enquiries. We maintain strong relationships with Japanese parts suppliers for fast turnaround times.`
    },
    {
        id: 9,
        question: `Are there any hidden fees in the import process?`,
        answer: `No. We provide a transparent, itemised quote covering vehicle cost, shipping, customs duties, GST, compliance, and registration. There are no hidden charges — what you see is what you pay.`
    },
    {
        id: 10,
        question: `Can I view the vehicle before committing to purchase?`,
        answer: `For locally available stock, yes — we encourage inspections and test drives. For imports, we provide high-resolution photos, video walkarounds, and detailed condition reports prior to auction bidding.`
    },
]