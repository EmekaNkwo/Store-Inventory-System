import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest) {
  try {
    const { id, action } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          status: 'failed',
          message: 'Staff ID is required',
        },
        { status: 400 }
      );
    }

    let updatedStaff;
    let message;

    switch (action) {
      case 'ACTIVATE':
        updatedStaff = await prisma.staff.update({
          where: { id },
          data: { status: 'ACTIVE' },
        });
        message = 'Staff activated successfully';
        break;

      case 'DEACTIVATE':
        updatedStaff = await prisma.staff.update({
          where: { id },
          data: { status: 'INACTIVE' },
        });
        message = 'Staff deactivated successfully';
        break;

      default:
        return NextResponse.json(
          {
            status: 'failed',
            message: 'Invalid action. Use ACTIVATE or DEACTIVATE',
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      status: 'success',
      message,
      data: updatedStaff,
    });
  } catch (error) {
    console.error('Error changing staff status:', error);
    return NextResponse.json(
      {
        status: 'failed',
        message: 'Error changing staff status',
      },
      { status: 500 }
    );
  }
}
