import React from "react";
import { SingleProduct } from "./productCart";


// Define types for search params
type SearchParams = {
  pid?: string;
  ref?: string;
  platform?: string;
};


// Pass the search params to the SingleProductCart component
const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div>
      <SingleProduct
        productId={searchParams.pid}
        referralId={searchParams.ref}
        platform={searchParams.platform}
      />
    </div>
  );
};

export default Page;
