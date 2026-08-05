
import type { PricingPlanThree, ProcessStep } from "./prosessType";
import pricingImg1 from '../../../public/assets/images/resources/pricing-2-1.png';
import pricingImg2 from '../../../public/assets/images/resources/pricing-2-2.png';
import pricingImg3 from '../../../public/assets/images/resources/pricing-2-3.png';
import pricingImg4 from '../../../public/assets/images/resources/pricing-2-4.png';

export const processSteps: ProcessStep[] = [
    {
        id: 1,
        title: "Choose A Car",
        description:
            "Open multipy a green form lesser their from in made herb multiply",
        icon: "icon-car-wash", 
    },
    {
        id: 2,
        title: "Come In Contact",
        description:
            "Open multipy a green form lesser their from in made herb multiply",
        icon: "icon-in-person", 
    },
    {
        id: 3,
        title: "Pick-Up Locations",
        description:
            "Open multipy a green form lesser their from in made herb multiply",
        icon: "icon-car-insurance", 
    },
    {
        id: 4,
        title: "Enjoy Driving",
        description:
            "Open multipy a green form lesser their from in made herb multiply",
        icon: "icon-steering-wheel", 
    },
];
 
// Data
export const pricingPlansThree: PricingPlanThree[] = [
    {
        id: 1,
        title: 'Basic',
        price: 500,
        image: pricingImg1,
        features: [
            'Car service is essential for maintaining.',
            'Performance and longevity of vehicle.',
            'Per minutes stopped traffic',
            'Online booking',
            '24/7 customer support',
        ],
    },
    {
        id: 2,
        title: 'Standard',
        price: 600,
        image: pricingImg2,
        features: [
            'Car service is essential for maintaining.',
            'Performance and longevity of vehicle.',
            'Per minutes stopped traffic',
            'Online booking',
            '24/7 customer support',
        ],
    },
    {
        id: 3,
        title: 'Premium',
        price: 700,
        image: pricingImg3,
        features: [
            'Car service is essential for maintaining.',
            'Performance and longevity of vehicle.',
            'Per minutes stopped traffic',
            'Online booking',
            '24/7 customer support',
        ],
    },
    {
        id: 4,
        title: 'Vip',
        price: 900,
        image: pricingImg4,
        features: [
            'Car service is essential for maintaining.',
            'Performance and longevity of vehicle.',
            'Per minutes stopped traffic',
            'Online booking',
            '24/7 customer support',
        ],
    },
];












