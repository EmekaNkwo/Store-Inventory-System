import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';
import { Staff } from '@/shared/models';

const validateStaff = (
  input: Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validation function for email and phone number
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhoneNumber = (phone: string) =>
    /^\+?[1-9]\d{1,14}$/.test(phone);

  // Type checks with specific error messages
  if (typeof input.name !== 'string' || input.name.trim().length === 0) {
    errors.push('Name must be a non-empty string');
  }
  if (
    !input.email ||
    typeof input.role !== 'string' ||
    !isValidEmail(input.email)
  ) {
    errors.push('Email must be a valid email address');
  }
  if (typeof input.role !== 'string' || input.role.trim().length === 0) {
    errors.push('Role must be a non-empty string');
  }

  if (
    typeof input.phoneNumber !== 'string' ||
    !input.phoneNumber ||
    !isValidPhoneNumber(input.phoneNumber)
  ) {
    errors.push('Valid phone number is required.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export async function GET() {
  try {
    const staffs = await prisma.staff.findMany();
    const json_response = {
      status: 'success',
      data: staffs,
    };
    return NextResponse.json(json_response);
  } catch (error) {
    console.log(error);
    const error_response = {
      status: 'failed',
      message: 'Error fetching staffs',
    };
    return NextResponse.json(error_response);
  }
}

export async function POST(req: NextRequest) {
  const newStaff = await req.json();

  // Set default status to "active"
  newStaff.status = 'ACTIVE';

  const validation = validateStaff(newStaff);

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
    const createdStaff = await prisma.staff.create({
      data: {
        name: newStaff.name,
        email: newStaff.email,
        role: newStaff.role,
        phoneNumber: newStaff.phoneNumber,
        status: newStaff.status,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'Staff created successfully',
        data: createdStaff,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Extract the field causing the unique constraint violation
        const targetField = error.meta?.target as string[];

        if (targetField?.includes('email')) {
          return NextResponse.json(
            {
              status: 'failed',
              message: 'A staff with this email already exists.',
            },
            { status: 400 }
          );
        }

        if (targetField?.includes('phoneNumber')) {
          return NextResponse.json(
            {
              status: 'failed',
              message: 'A staff with this phone number already exists.',
            },
            { status: 400 }
          );
        }
      }
    }

    // Log and handle generic errors
    console.error('Staff creation error:', error);
    return NextResponse.json(
      {
        status: 'failed',
        message: 'Failed to create staff.',
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedStaff = await req.json();

    const missingFields = [];
    if (!updatedStaff.name) missingFields.push('name');
    if (!updatedStaff.role) missingFields.push('role');
    if (!updatedStaff.phoneNumber) missingFields.push('phoneNumber');
    if (!updatedStaff.email) missingFields.push('email');

    if (missingFields.length > 0) {
      const error_response = {
        status: 'failed',
        message: `Missing required fields: ${missingFields.join(', ')}`,
      };
      return NextResponse.json(error_response);
    } else {
      const staff = await prisma.staff.update({
        where: {
          id: updatedStaff.id,
        },
        data: updatedStaff,
      });

      const json_response = {
        status: 'success',
        message: 'Staff Updated',
        data: staff,
      };

      return NextResponse.json(json_response);
    }
  } catch (error) {
    console.log(error);
    const error_response = {
      status: 'failed',
      message: 'Error updating staff',
    };
    return NextResponse.json(error_response);
  }
}
