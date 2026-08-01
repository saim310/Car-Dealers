"use client"
import useGorentContext from '@/components/context/useGorentContext';
import Link from 'next/link';
import React from 'react';  

const VideoOne: React.FC = () => {
    const { handleVideoClick } = useGorentContext();
    return (
        <section className="video-one">
            <div className="video-one__bg jarallax"></div>
            <div className="container">
                <div className="video-one__inner">
                    <h2 className="video-one__title">Want To Know More About? <br /> Play Our Promotional Video Now!</h2>
                    <div className="video-one__video-link">
                        <Link href="#" className="video-popup" onClick={(e) => handleVideoClick(e, 'https://www.youtube.com/watch?v=Get7rqXYrbQ')}>
                            <div className="video-one__video-icon">
                                <span className="icon-play"></span>
                                <i className="ripple"></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoOne;