import { db } from '@/db';
import { transactions } from '@/db/schema';

async function main() {
    const baseTimestamp = Math.floor(Date.now() / 1000);
    
    const sampleTransactions = [
        {
            merchantName: "Raj's General Store",
            upiId: 'rajstore@paytm',
            amount: 450.00,
            status: 'success',
            note: 'Groceries and household items',
            timestamp: baseTimestamp - (6 * 24 * 60 * 60) - (3 * 60 * 60),
            createdAt: baseTimestamp - (6 * 24 * 60 * 60) - (3 * 60 * 60),
        },
        {
            merchantName: 'Mumbai Cafe',
            upiId: 'mumbai.cafe@phonepe',
            amount: 180.50,
            status: 'success',
            note: 'Coffee and evening snacks',
            timestamp: baseTimestamp - (5 * 24 * 60 * 60) - (8 * 60 * 60),
            createdAt: baseTimestamp - (5 * 24 * 60 * 60) - (8 * 60 * 60),
        },
        {
            merchantName: 'Delhi Electronics',
            upiId: 'delhielec@googlepay',
            amount: 2850.00,
            status: 'pending',
            note: 'Mobile phone and accessories',
            timestamp: baseTimestamp - (4 * 24 * 60 * 60) - (2 * 60 * 60),
            createdAt: baseTimestamp - (4 * 24 * 60 * 60) - (2 * 60 * 60),
        },
        {
            merchantName: 'Bangalore Book Shop',
            upiId: 'blrbooks@paytm',
            amount: 650.00,
            status: 'success',
            note: 'Academic books and stationery',
            timestamp: baseTimestamp - (3 * 24 * 60 * 60) - (5 * 60 * 60),
            createdAt: baseTimestamp - (3 * 24 * 60 * 60) - (5 * 60 * 60),
        },
        {
            merchantName: 'Chennai Supermarket',
            upiId: 'chennai.super@phonepe',
            amount: 1250.75,
            status: 'success',
            note: 'Monthly grocery shopping',
            timestamp: baseTimestamp - (2 * 24 * 60 * 60) - (4 * 60 * 60),
            createdAt: baseTimestamp - (2 * 24 * 60 * 60) - (4 * 60 * 60),
        },
        {
            merchantName: 'Kolkata Sweet House',
            upiId: 'kolkata.sweets@googlepay',
            amount: 320.00,
            status: 'failed',
            note: 'Sweets for festival',
            timestamp: baseTimestamp - (1 * 24 * 60 * 60) - (6 * 60 * 60),
            createdAt: baseTimestamp - (1 * 24 * 60 * 60) - (6 * 60 * 60),
        },
        {
            merchantName: 'Pune Medical Store',
            upiId: 'punemedical@paytm',
            amount: 580.00,
            status: 'pending',
            note: 'Prescription medicines',
            timestamp: baseTimestamp - (12 * 60 * 60),
            createdAt: baseTimestamp - (12 * 60 * 60),
        },
    ];

    await db.insert(transactions).values(sampleTransactions);
    
    console.log('✅ Transactions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});