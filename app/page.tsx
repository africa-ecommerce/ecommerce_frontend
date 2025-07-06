import React from "react";
import WelcomePage from "./_components/welcome-page";

export const metadata = {
  title: "Pluggn - Discover Trends & Products",
  description: "Shop, sell, and discover the latest trends on Pluggn Nigeria.",
  alternates: {
    canonical: "https://www.pluggn.com.ng/",
  },
};

const Page = () => {
  return (
    <div>
      <WelcomePage />
    </div>
  );
};

export default Page;
