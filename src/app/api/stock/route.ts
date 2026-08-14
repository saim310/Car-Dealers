import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

// Force dynamic so it always reads the latest CSV file and avoids static caching
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const csvFilePath = path.join(process.cwd(), 'public', 'data', 'stock.csv');

        if (!fs.existsSync(csvFilePath)) {
            return NextResponse.json({ error: 'CSV file not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(csvFilePath, 'utf8');

        const parsed = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
        });

        const cars = parsed.data as any[];

        // Sort cars: Valid price (> 0) first, Contact for Price (0 or empty) afterwards
        cars.sort((a, b) => {
            const priceA = Number(a.Price) || 0;
            const priceB = Number(b.Price) || 0;

            if (priceA > 0 && priceB === 0) return -1; // A comes first
            if (priceA === 0 && priceB > 0) return 1;  // B comes first
            return 0; 
        });

        if (!id) {
            return NextResponse.json(cars);
        }

        // Match car accurately by StockNumber, id, ID, sku, or index with trimming
        let car: any = cars.find((c: any, index: number) =>  
            String(c.StockNumber ?? '').trim() === String(id).trim() || 
            String(c.id ?? '').trim() === String(id).trim() || 
            String(c.ID ?? '').trim() === String(id).trim() || 
            String(c.sku ?? '').trim() === String(id).trim() ||
            String(index).trim() === String(id).trim()
        );

        if (!car) {
            return NextResponse.json({ error: 'Car not found' }, { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error('CSV API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
