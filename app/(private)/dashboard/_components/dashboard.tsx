
"use client";

import React from "react";
import PlugDashboard from "../(plug)/_components/plug-dashboard";
import { useSwrUser } from "@/hooks/use-current-user";
import SupplierDashboard from "../(supplier)/_components/supplier-dashboard";

const Dashboard = () => {
   const { user, isLoading } = useSwrUser();
  console.log("user", user);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        loading....
      </div>
    );
  }

 if(user) {  
  return (
    <div>
      {user?.userType === "PLUG" ? <PlugDashboard /> : <SupplierDashboard />}
    </div>
  );
}
};

export default Dashboard;
