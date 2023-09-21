"use client";
import { AnimatePresence } from "framer-motion";

const FramerMotionWrapper = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default FramerMotionWrapper;
