// app/checkout/layout.tsx
import Script from "next/script";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Paystack script loaded successfully");
        }}
        onError={(e) => {
          console.error("Failed to load Paystack script:", e);
        }}
      />
      {children}
    </>
  );
}
