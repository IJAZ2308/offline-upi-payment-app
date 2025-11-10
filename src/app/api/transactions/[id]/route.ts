import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { transactions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
      return NextResponse.json(
        {
          error: 'Valid transaction ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    // Query single transaction
    const transaction = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, parseInt(id)))
      .limit(1);

    // Check if transaction exists
    if (transaction.length === 0) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction[0], { status: 200 });
  } catch (error) {
    console.error('GET transaction error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
      return NextResponse.json(
        {
          error: 'Valid transaction ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { status } = body;

    // Validate status field
    if (!status) {
      return NextResponse.json(
        {
          error: 'Status is required',
          code: 'MISSING_STATUS'
        },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['success', 'pending', 'failed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: 'Status must be one of: success, pending, failed',
          code: 'INVALID_STATUS'
        },
        { status: 400 }
      );
    }

    // Check if transaction exists before updating
    const existingTransaction = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, parseInt(id)))
      .limit(1);

    if (existingTransaction.length === 0) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Update transaction status
    const updated = await db
      .update(transactions)
      .set({ status })
      .where(eq(transactions.id, parseInt(id)))
      .returning();

    // Return updated transaction
    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH transaction error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}