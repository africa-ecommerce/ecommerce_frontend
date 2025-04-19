import SupplierOrder from "../_components/supplier-order";


export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Order Management</h1>
      <SupplierOrder />
    </main>
  );
}
