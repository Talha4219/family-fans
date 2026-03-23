const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://talha:talha@cluster0.hfgz0mu.mongodb.net/e-comerce';

async function getOrder() {
    try {
        await mongoose.connect(MONGODB_URI);
        
        // List all databases
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('DATABASES:' + dbs.databases.map(db => db.name).join(', '));

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('COLLECTIONS:' + collections.map(c => c.name).join(', '));

        const OrderSchema = new mongoose.Schema({ status: String, trackingId: String }, { timestamps: true });
        const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
        
        const count = await Order.countDocuments();
        console.log('ORDER_COUNT:' + count);

        const order = await Order.findOne().sort({ createdAt: -1 });
        if (order) {
            console.log('ORDER_ID:' + order._id.toString());
            console.log('TRACKING_ID:' + (order.trackingId || 'NONE'));
            console.log('STATUS:' + order.status);
        } else {
            console.log('NO_ORDERS_FOUND');
        }
    } catch (err) {
        console.error('ERROR:' + err.message);
    } finally {
        await mongoose.disconnect();
    }
}

getOrder();
