import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma'; // Adjust the import path as needed
import { ProductStatus, StaffStatus } from '@/shared/models';

export async function GET() {
  try {
    // Fetch all products
    const allProducts = await prisma.product.findMany();

    // Products statistics
    const totalProducts = allProducts.length;
    const activeProducts = allProducts.filter(
      (p) => p.status === ProductStatus.ACTIVE
    ).length;
    const inactiveProducts = allProducts.filter(
      (p) => p.status === ProductStatus.INACTIVE
    ).length;
    const outOfStockProducts = allProducts.filter(
      (p) => p.status === ProductStatus.OUT_OF_STOCK
    ).length;
    const discontinuedProducts = allProducts.filter(
      (p) => p.status === ProductStatus.DISCONTINUED
    ).length;

    // Fetch all staffs
    const allStaffs = await prisma.staff.findMany();

    // Staffs statistics
    const totalStaffs = allStaffs.length;
    const activeStaffs = allStaffs.filter(
      (s) => s.status === StaffStatus.ACTIVE
    ).length;
    const inactiveStaffs = allStaffs.filter(
      (s) => s.status === StaffStatus.INACTIVE
    ).length;

    // Prepare response
    const json_response = {
      status: 'success',
      data: {
        products: {
          total: totalProducts,
          active: activeProducts,
          inactive: inactiveProducts,
          outOfStock: outOfStockProducts,
          discontinued: discontinuedProducts,
        },
        staffs: {
          total: totalStaffs,
          active: activeStaffs,
          inactive: inactiveStaffs,
        },
      },
    };

    return NextResponse.json(json_response);
  } catch (error) {
    console.error('Dashboard API Error:', error);

    const error_response = {
      status: 'failed',
      message: 'Error fetching dashboard statistics',
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    return NextResponse.json(error_response, { status: 500 });
  }
}
