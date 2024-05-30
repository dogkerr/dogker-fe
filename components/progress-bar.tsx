"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="3px"
        startPosition={0.4}
        color="#066da5"
        stopDelayMs={400}
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  );
};

export default ProgressBarProvider;
