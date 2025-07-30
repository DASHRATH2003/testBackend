import { PrismaClient } from '@prisma/client';

async function testConnection() {
    const prisma = new PrismaClient();
    
    try {
        // Try to query the database
        await prisma.$connect();
        console.log('✅ Successfully connected to the database');
        
        // Try to perform a simple query
        const result = await prisma.$queryRaw`SELECT 1`;
        console.log('✅ Successfully executed a test query');
        console.log('Query result:', result);
        
    } catch (error) {
        console.error('❌ Database connection failed');
        console.error('Error details:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection(); 