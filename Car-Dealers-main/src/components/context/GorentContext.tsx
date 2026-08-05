"use client"
import { createContext } from "react";
import { contextType } from "./contextType";

const GorentContext = createContext<contextType | null>(null)
export default GorentContext;