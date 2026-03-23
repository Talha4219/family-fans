const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://talha:talha@cluster0.hfgz0mu.mongodb.net/";

async function run() {
    try {
        await mongoose.connect(MONGODB_URI);
        const db = mongoose.connection.db;
        const categories = await db.collection('categories').find({}).toArray();
        
        console.log("Total Categories: " + categories.length);
        categories.forEach(cat => {
            console.log(`ID: ${cat._id} | Name: ${cat.name} | Status: ${cat.status} | Level: ${cat.level} | Parent: ${cat.parentCategoryId}`);
        });

        await mongoose.disconnect();
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
