import React from "react";
import WelcomePage from "./_components/welcome-page";

export const metadata = {
  title: 'Pluggn - Start Your Business Online Without the Usual Hassles',
  description: 'Pluggn lets you start and grow a profitable online business effortlessly—no inventory, no logistics, no tech headaches.',
  alternates: {
    canonical: 'https://www.pluggn.com.ng/',
  }
};


const Page = () => {
  return (
    <div>
      <WelcomePage />
    </div>
  );
};

export default Page;
