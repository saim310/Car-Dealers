import React from 'react';
import Link from 'next/link';
interface FeatureItem {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    link: string;
}

const featureItems: FeatureItem[] = [
    {
        id: 1,
        title: "Are You Looking \nFor a Car ?",
        description:
            "Lorem ipsum is simply ipun txns mane so dummy text of free available in market the printing and typesetting industry",
        buttonText: "Get Started",
        link: "/inner/contact",
    },
    {
        id: 2,
        title: "Do You Want to \nRent a Car ?",
        description:
            "Lorem ipsum is simply ipun txns mane so dummy text of free available in market the printing and typesetting industry",
        buttonText: "Get Started",
        link: "/inner/car-list-v-1",
    },
];


const FeatureTwo: React.FC = () => {
    return (
        <section className="feature-one">
            <div className="container">
                <div className="feature-one__inner">
                    <div className="row">
                        {featureItems.map((item) => (
                            <div className="col-xl-6 col-lg-6" key={item?.id}>
                                <div className={`feature-one__inner-single ${item?.id === 2 ? "feature-one__inner-single--two" : ""} wow`} >
                                    <div className={`feature-one__inner-single-bg bgImage-${item?.id}`}></div>
                                    <h3 className="feature-one__inner-title">
                                        {item.title.split("\n").map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </h3>
                                    <p className="feature-one__inner-text">
                                        {item?.description}
                                    </p>
                                    <div className="feature-one__inner-btn-box">
                                        <Link href={item?.link} className="thm-btn">
                                            {item?.buttonText}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureTwo;
