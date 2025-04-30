import { NextResponse } from "next/server"

// Mock products data
const products = [
  {
    id: 1,
    name: "Oversized Boyfriend Tee",
    price: "$29.99",
    image: "/placeholder.svg?height=400&width=300",
    category: "tops",
  },
  {
    id: 2,
    name: "High-Waisted Skinny Jeans",
    price: "$49.99",
    image: "/placeholder.svg?height=400&width=300",
    category: "bottoms",
  },
  {
    id: 3,
    name: "Faux Leather Moto Jacket",
    price: "$79.99",
    image: "/placeholder.svg?height=400&width=300",
    category: "outerwear",
  },
  {
    id: 4,
    name: "Ribbed Bodycon Dress",
    price: "$39.99",
    image: "/placeholder.svg?height=400&width=300",
    category: "dresses",
  },
  {
    id: 5,
    name: "Platform Chunky Sneakers",
    price: "$59.99",
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
  },
  {
    id: 6,
    name: "Cropped Hoodie",
    price: "$34.99",
    image: "/placeholder.svg?height=400&width=300",
    category: "tops",
  },
  {
    id: 7,
    name: "Pleated Mini Skirt",
    price: "$29.99",
    image: "/placeholder.svg?height=400&width=300",
    category: "bottoms",
  },
  {
    id: 8,
    name: "Oversized Denim Jacket",
    price: "$69.99",
    image: "/placeholder.svg?height=400&width=300",
    category: "outerwear",
  },
]

export async function GET() {
  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(products)
}
