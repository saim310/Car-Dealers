import Banner from '@/sections/common/Banner';
import LetsTalk from '@/sections/common/LetsTalk';
import SlidingText from '@/sections/common/SlidingText';
import ProcessInner from '@/sections/process/ProcessInner';
import ServiceInner from '@/sections/service/ServiceInner';
import ServiceInnerTwo from '@/sections/service/ServiceInnerTwo';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Services' />
            <SlidingText />
            <ServiceInner sectionClass='services-one' />
            <ProcessInner sectionClass='services-page-process' />
            <ServiceInnerTwo sectionClass='services-four'/>
            <LetsTalk />
            <ServiceInner sectionClass='services-two'/>
        </>
    );
};

export default page;