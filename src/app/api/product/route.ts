import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { Product, ProductStatus } from '@/shared/models';
import { generateProductId } from '@/lib/productIdGenerator';
import { Prisma } from '@prisma/client';

const validateProduct = (
  input: Omit<Product, 'id' | 'sku' | 'createdAt' | 'updatedAt'>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Type checks with specific error messages
  if (typeof input.name !== 'string' || input.name.trim().length === 0) {
    errors.push('Name must be a non-empty string');
  }

  if (typeof input.quantity !== 'number' || input.quantity < 0) {
    errors.push('Quantity must be a non-negative number');
  }

  if (typeof input.price !== 'number' || input.price < 0) {
    errors.push('Price must be a non-negative number');
  }

  if (typeof input.type !== 'string' || input.type.trim().length === 0) {
    errors.push('Type must be a non-empty string');
  }

  if (!Object.values(ProductStatus).includes(input.status)) {
    errors.push('Invalid product status');
  }

  if (input.variant !== undefined && typeof input.variant !== 'string') {
    errors.push('Variant must be a string');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    const json_response = {
      status: 'success',
      data: products,
    };
    return NextResponse.json(json_response);
  } catch (error) {
    console.log(error);
    const error_response = {
      status: 'failed',
      message: 'Error fetching products',
    };
    return NextResponse.json(error_response);
  }
}

export async function POST(req: NextRequest) {
  const newProduct = await req.json();

  const validation = validateProduct(newProduct);

  if (!validation.valid) {
    return NextResponse.json(
      {
        status: 'failed',
        message: validation.errors.join(', '),
      },
      { status: 400 }
    );
  }

  try {
    // Generate unique product ID
    const sku = await generateProductId();

    const createdProduct = await prisma.product.create({
      data: {
        sku,
        name: newProduct.name,
        quantity: newProduct.quantity,
        price: newProduct.price,
        type: newProduct.type,
        status: newProduct.status,
        variant: newProduct.variant,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'Product created successfully',
        data: createdProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            status: 'failed',
            message: 'A product with this name already exists',
          },
          { status: 400 }
        );
      }
    }
    console.error('Product creation error:', error);
    return NextResponse.json(
      {
        status: 'failed',
        message: 'Failed to create product',
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedProduct = await req.json();

    const missingFields = [];
    if (!updatedProduct.name) missingFields.push('name');
    if (!updatedProduct.quantity) missingFields.push('quantity');
    if (!updatedProduct.price) missingFields.push('price');
    if (!updatedProduct.type) missingFields.push('type');
    if (!updatedProduct.sku) missingFields.push('sku');
    if (!updatedProduct.status) missingFields.push('status');
    if (!updatedProduct.variant) missingFields.push('variant');

    if (missingFields.length > 0) {
      const error_response = {
        status: 'failed',
        message: `Missing required fields: ${missingFields.join(', ')}`,
      };
      return NextResponse.json(error_response);
    } else {
      const product = await prisma.product.update({
        where: {
          id: updatedProduct.id,
        },
        data: updatedProduct,
      });

      const json_response = {
        status: 'success',
        message: 'Product Updated',
        data: product,
      };

      return NextResponse.json(json_response);
    }
  } catch (error) {
    console.log(error);
    const error_response = {
      status: 'failed',
      message: 'Error updating product',
    };
    return NextResponse.json(error_response);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    const json_response = {
      status: 'success',
      message: 'Product Deleted',
      data: product,
    };

    return NextResponse.json(json_response);
  } catch (error) {
    console.log(error);
    const error_response = {
      status: 'failed',
      message: 'Error deleting product',
    };
    return NextResponse.json(error_response);
  }
}
