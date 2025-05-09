import { Button } from "@/components/ui/button"
import ShareButton from "./ShareButton"

interface ProductDetailsProps {
  product: any
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    console.log("product", product)
  // Format price
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price)

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <ShareButton productId={product.id} productName={product.name} productDescription={product.description} />
          </div>

          <div className="flex items-center gap-2 mb-4">
            {product.rating && (
              <span className="flex items-center gap-1 text-amber-500">
                <span>★</span>
                <span>{product.rating}</span>
              </span>
            )}
            {product.location && <span className="text-gray-600">{product.location}</span>}
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-4">
            <span className="text-xl font-bold">{formattedPrice}</span>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Features:</h2>
              <ul className="list-disc list-inside">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <Button className="mt-4 w-full">Book Now</Button>
        </div>
      </div>
    </div>
  )
}
