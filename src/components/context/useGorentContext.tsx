"use client"
import { useContext } from 'react';
import GorentContext from './GorentContext';
import type { contextType } from './contextType';

const useGorentContext = (): contextType => {
    const context = useContext(GorentContext);
    if (context === null) {
        throw new Error("useFinrisContext must be used within a <FinrisProvider>");
    }
    return context;
};

export default useGorentContext;