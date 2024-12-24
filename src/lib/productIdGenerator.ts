import prisma from './prisma';

export async function generateProductId(): Promise<string> {
  // Find the last product to get the current sequence
  const lastProduct = await prisma.product.findFirst({
    orderBy: { id: 'desc' },
    select: { sku: true },
  });

  // Extract the numeric part or start from 1
  const lastNumber = lastProduct ? parseInt(lastProduct.sku.slice(2)) : 0;

  // Increment and pad to 5 digits
  const newNumber = lastNumber + 1;
  const paddedNumber = newNumber.toString().padStart(5, '0');

  return `IN${paddedNumber}`;
}
