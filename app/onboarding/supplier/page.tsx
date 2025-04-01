// import Link from "next/link"
// import { ArrowRight, ArrowLeft, Building2, Warehouse, Store, Ship } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"

// export default function SupplierPage() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-white">
//       <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
//       <div className="w-full max-w-md px-4 py-8">
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium text-gray-500">Step 2 of 5</span>
//             <span className="text-sm font-medium text-gray-500">40% Complete</span>
//           </div>
//           <Progress value={40} className="h-2 bg-gray-100" />
//         </div>
//         <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
//           What type of business do you have?
//         </h1>
//         <p className="mb-8 text-center text-gray-600">
//           This helps us customize your experience and verification process.
//         </p>

//         <div className="space-y-4">
//           <Card className="p-6 border-2 hover:border-orange-500 cursor-pointer transition-all">
//             <Link href="/onboarding/supplier/verification" className="flex items-center gap-4">
//               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
//                 <Warehouse className="h-7 w-7 text-orange-500" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Warehouse</h3>
//                 <p className="text-gray-500">I operate a warehouse with inventory</p>
//               </div>
//             </Link>
//           </Card>

//           <Card className="p-6 border-2 hover:border-orange-500 cursor-pointer transition-all">
//             <Link href="/onboarding/supplier/verification" className="flex items-center gap-4">
//               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
//                 <Building2 className="h-7 w-7 text-orange-500" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Wholesaler</h3>
//                 <p className="text-gray-500">I sell products in bulk to retailers</p>
//               </div>
//             </Link>
//           </Card>

//           <Card className="p-6 border-2 hover:border-orange-500 cursor-pointer transition-all">
//             <Link href="/onboarding/supplier/verification" className="flex items-center gap-4">
//               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
//                 <Ship className="h-7 w-7 text-orange-500" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Importer</h3>
//                 <p className="text-gray-500">I import products from other countries</p>
//               </div>
//             </Link>
//           </Card>

//           <Card className="p-6 border-2 hover:border-orange-500 cursor-pointer transition-all">
//             <Link href="/onboarding/supplier/verification" className="flex items-center gap-4">
//               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
//                 <Store className="h-7 w-7 text-orange-500" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Local Store</h3>
//                 <p className="text-gray-500">I have a physical retail location</p>
//               </div>
//             </Link>
//           </Card>
//         </div>

//         <div className="mt-8 flex justify-between">
//           <Button asChild variant="outline" className="px-6">
//             <Link href="/onboarding/user-type">
//               <ArrowLeft className="mr-2 h-5 w-5" /> Back
//             </Link>
//           </Button>
//           {/* <Button asChild className="bg-orange-500 hover:bg-orange-600 px-6">
//             <Link href="/onboarding/supplier/verification">
//               Continue <ArrowRight className="ml-2 h-5 w-5" />
//             </Link>
//           </Button> */}
//         </div>
//       </div>
//     </div>
//   )
// }


