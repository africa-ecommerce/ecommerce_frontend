// MorePageWrapper.tsx
"use client";

import PlugSuccess from "@/app/onboarding/_components/plug-success";
import { useState } from "react";
import { MorePageContent } from "./more-page-content";


export default function MorePageWrapper({
  userType,
}: {
  userType: "PLUG" | "SUPPLIER";
}) {
  const [showMorePage, setShowMorePage] = useState(false);
  const [activeSection, setActiveSection] = useState<"learnMore" | null>(null);

  const handleLearnMore = () => {
    setActiveSection("learnMore");
    setShowMorePage(true);
  };

  return (
    <>
      {!showMorePage ? (
        <PlugSuccess onLearnMoreClick={handleLearnMore} />
      ) : (
        <MorePageContent
          onBack={() => setShowMorePage(false)}
          userType={userType}
          initialSection={activeSection}
        />
      )}
    </>
  );
}
