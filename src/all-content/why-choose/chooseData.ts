import type { CounterItem, WhyChooseItem } from "./chooseType";


export const whyChooseData: WhyChooseItem[] = [
  {
    id: 1,
    icon: "icon-car-insurance",
    title: "Finance Options",
    text: "We provide flexible car finance solutions...",
    link: "/inner/finance/finance-calculator", // Pehla link
  },
  {
    id: 3,
    icon: "icon-rating",
    title: "Quality Inspected Vehicles",
    text: "Every vehicle is carefully reviewed...",
    link: "/inner/contact", // Teesra link
  },
  {
    id: 6,
    icon: "icon-speedometer",
    title: "Competitive Wholesale Pricing",
    text: "We help customers and dealers...",
    link: "/inner/wholesale", // Chhata link
  }
];

export const counterData: CounterItem[] = [
    {
        id: 1,
        icon: "icon-car",
        count: 1000,
        suffix: "+",
        text: "Vehicle fleet",
    },
    {
        id: 2,
        icon: "icon-mileage",
        count: 10,
        suffix: "M+",
        text: "Miles of drive",
    },
    {
        id: 3,
        icon: "icon-range",
        count: 15,
        suffix: "K+",
        text: "Booking reserved",
    },
    {
        id: 4,
        icon: "icon-pin-2",
        count: 50,
        suffix: "K+",
        text: "Pickup & drop",
    },
];
