import React from "react";
import WelcomePage from "./_components/welcome-page";

export const metadata = {
  title: 'Pluggn - Start Your Online Business in Nigeria Without Inventory',
  description: 'Pluggn lets you launch and grow an online business effortlessly—no inventory, no logistics, no technical hassles. Discover trending products, sell online, and earn with ease across Nigeria.',
  alternates: {
    canonical: 'https://www.pluggn.com.ng/',
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
