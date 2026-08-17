import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { productsList } from '@/all-content/products/productData';

// Force dynamic so it always reads the latest CSV file and avoids static caching
export const dynamic = 'force-dynamic';

const FALLBACK_IMAGE = '/assets/images/shop/shop-product-1-1.jpg';

// The stock.csv (source of truth for specs/description) has NO image column at all.
// productData.ts already carries real per-car image arrays keyed by StockNumber/id —
// so we cross-reference the two and attach images to the CSV record.
function attachImages(car: any) {
    const stockNo = String(car.StockNumber || car.id || '').trim();
    const match = productsList.find((p: any) => String(p.id) === stockNo);

    if (match?.images?.length) {
        car.images = match.images;
        car.image = match.image || match.images[0];
    } else if (match?.image) {
        car.images = [match.image];
        car.image = match.image;
    } else {
        car.images = [];
        car.image = FALLBACK_IMAGE;
    }

    // Normalize yard field: CSV calls it YardCode, but the rest of the app
    // (email routing, yard/city display) reads car?.yard || car?.Yard.
    if (car.YardCode && !car.yard) {
        car.yard = car.YardCode;
    }
    
    // City isn't a CSV column either — fall back to productData's city if we matched one.
    if (!car.city && match?.city) {
        car.city = match.city;
    }

    return car;
}

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

        // Parse CSV and attach images/yard data from static productsList
        const cars = (parsed.data as any[]).map(attachImages);

        // Sort cars: Valid price (> 0) first, Contact for Price (0 or empty) afterwards
        cars.sort((a, b) => {
            const priceA = Number(a.Price) || 0;
            const priceB = Number(b.Price) || 0;

            if (priceA > 0 && priceB === 0) return -1; // A comes first
            if (priceA === 0 && priceB > 0) return 1;  // B comes first
            return 0; // Keep original relative order if both have price or both don't
        });

        // If no specific ID requested, return full list
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

        // If car not found after accurate ID matching, throw error
        if (!car) {
            return NextResponse.json({ error: 'Car not found' }, { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error('CSV API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
