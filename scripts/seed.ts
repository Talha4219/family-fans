import * as dotenv from 'dotenv';
dotenv.config();

import dbConnect from '../src/lib/db';
import Product from '../src/models/Product';
import data from '../src/lib/data.json';
import mongoose from 'mongoose';

async function seed() {
    console.log('Using URI:', process.env.MONGODB_URI);
    await dbConnect();
    
    console.log('Seeding products...');
    
    try {
        // Clear existing products
        await Product.deleteMany({});
        
        // Data is a flat array in data.json
        const productsWithSlugs = data.map((p: any) => ({
            name: p.name,
            slug: p.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            description: p.description,
            price: p.price,
            category: p.category,
            imageUrl: p.imageUrl,
            rating: p.rating,
            numReviews: p.reviewCount || 0,
            stock: 10,
            specifications: p.specs || {}
        }));
        
        await Product.insertMany(productsWithSlugs);
        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect();
    }
}

seed();
