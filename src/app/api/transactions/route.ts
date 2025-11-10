import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { transactions } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

const VALID_STATUSES = ['success', 'pending', 'failed'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const results = await db
      .select()
      .from(transactions)
      .orderBy(desc(transactions.timestamp))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantName, upiId, amount, status, note, timestamp } = body;

    // Validate required fields
    if (!merchantName || typeof merchantName !== 'string' || merchantName.trim() === '') {
      return NextResponse.json(
        { error: 'merchantName is required and must be a non-empty string', code: 'INVALID_MERCHANT_NAME' },
        { status: 400 }
      );
    }

    if (!upiId || typeof upiId !== 'string' || upiId.trim() === '') {
      return NextResponse.json(
        { error: 'upiId is required and must be a non-empty string', code: 'INVALID_UPI_ID' },
        { status: 400 }
      );
    }

    if (amount === undefined || amount === null || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'amount is required and must be a positive number', code: 'INVALID_AMOUNT' },
        { status: 400 }
      );
    }

    if (!status || typeof status !== 'string' || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { 
          error: `status is required and must be one of: ${VALID_STATUSES.join(', ')}`, 
          code: 'INVALID_STATUS' 
        },
        { status: 400 }
      );
    }

    if (timestamp === undefined || timestamp === null || typeof timestamp !== 'number' || timestamp <= 0 || !Number.isInteger(timestamp)) {
      return NextResponse.json(
        { error: 'timestamp is required and must be a valid positive integer (unix timestamp)', code: 'INVALID_TIMESTAMP' },
        { status: 400 }
      );
    }

    // Validate optional note field
    if (note !== undefined && note !== null && typeof note !== 'string') {
      return NextResponse.json(
        { error: 'note must be a string if provided', code: 'INVALID_NOTE' },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const insertData = {
      merchantName: merchantName.trim(),
      upiId: upiId.trim(),
      amount,
      status,
      note: note ? note.trim() : null,
      timestamp,
      createdAt: Math.floor(Date.now() / 1000),
    };

    const newTransaction = await db
      .insert(transactions)
      .values(insertData)
      .returning();

    return NextResponse.json(newTransaction[0], { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}