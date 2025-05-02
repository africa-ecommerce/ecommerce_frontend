

import React from "react";
import PlugDashboard from "../(plug)/_components/plug-dashboard";
import SupplierDashboard from "../(supplier)/_components/supplier-dashboard";
// import { useUser } from "@/app/_components/provider/UserContext";
import { getUserFromHeaders } from "@/lib/auth-utils";

const Dashboard = async() => {
  //  const { userData } = useUser();


         const userData = await getUserFromHeaders();

 

  return (
    <div>
      {userData?.userType === "PLUG" ? <PlugDashboard /> : <SupplierDashboard />}
    </div>
  );
};
export default Dashboard;
