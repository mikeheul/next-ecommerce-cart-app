import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const products = await db.product.findMany({
            include: {
                tagsProduct: true,
            },
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log("[PRODUCTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}