import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { productId: string } }) {
    const { productId } = params;

    try {
        const product = await db.product.findUnique({
        where: {
            id: productId,
        },
        });

        if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.log('Error fetching product:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
