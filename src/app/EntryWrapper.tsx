"use client";

import { useState, useEffect } from "react";
import { EntryGate } from "@/components/EntryGate";

export function EntryWrapper({ children }: { children: React.ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    // Check if user has seen entry gate before
    const hasSeenGate = localStorage.getItem("hasSeenEntryGate");
    if (hasSeenGate === "true") {
      setHasEntered(true);
      setShowGate(false);
    }
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    setTimeout(() => {
      setShowGate(false);
    }, 500);
  };

  return (
    <>
      {showGate && <EntryGate onEnter={handleEnter} />}
      {hasEntered && children}
    </>
  );
}

