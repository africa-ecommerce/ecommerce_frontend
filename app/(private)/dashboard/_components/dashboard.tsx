
"use client";

import React from "react";
import PlugDashboard from "../(plug)/_components/plug-dashboard";
import SupplierDashboard from "../(supplier)/_components/supplier-dashboard";
import { useUser } from "@/app/_components/provider/UserContext";

const Dashboard = () => {
   const { userData } = useUser();

 

  return (
    <div>
      {userData?.userType === "PLUG" ? <PlugDashboard /> : <SupplierDashboard />}
    </div>
  );
};
export default Dashboard;
