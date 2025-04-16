import { Skeleton } from "@/components/ui/skeleton"

export function ProductTableSkeleton() {
  return (
    <div className="w-full">
    
       <div className="grid grid-cols-7 gap-4 py-3 px-4 font-medium text-sm border-b">
        <div>PRODUCT</div>
        <div>PRICE</div>
        <div>STOCK</div>
        <div>STATUS</div>
        <div>PLUGS</div>
        <div>SALES</div>
        <div>ACTIONS</div>
      </div>

      {/* Skeleton rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="grid grid-cols-7 gap-4 py-4 px-4 border-b">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-12" />
          <div className="flex justify-end">
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      ))}

      {/* Skeleton pagination */}
      <div className="flex items-center justify-between py-4 px-4">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  )
}
