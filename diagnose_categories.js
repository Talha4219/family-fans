const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://talha:talha@cluster0.hfgz0mu.mongodb.net/";

async function run() {
    try {
        console.log("Connecting to " + MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log("Connected.");

        const db = mongoose.connection.db;
        const categories = await db.collection('categories').find({}).toArray();
        
        console.log("Found " + categories.length + " categories.");
        categories.forEach(cat => {
            console.log("ID: " + cat._id + " | Name: " + cat.name + " | Status: " + cat.status + " | Parent: " + cat.parentCategoryId);
        });

        await mongoose.disconnect();
    } catch (e) {
        console.error("Error details:", e);
    }
}
run();
