// app/(private)/layout.tsx
import { getUserFromHeaders } from "@/lib/auth-utils";
import ClientLayoutWrapper from "./clientLayoutWrapper";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user data from headers (set by middleware)
      const userData = await getUserFromHeaders();

  const userType = userData?.userType || null;

  return (
    <ClientLayoutWrapper serverUserType={userType} initialUserData={userData}>
      {children}
    </ClientLayoutWrapper>
  );
}
