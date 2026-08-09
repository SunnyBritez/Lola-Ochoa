import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, category, stock, variants, imageUrl } = body;

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        costPrice: body.costPrice,
        wholesalePrice: body.wholesalePrice,
        category: body.category,
        stock: body.stock,
        variants: body.variants,
        imageUrl: body.imageUrl,
        images: body.images || [],
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
