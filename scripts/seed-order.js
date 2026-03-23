const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://talha:talha@cluster0.hfgz0mu.mongodb.net/e-comerce';

async function seedOrder() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const OrderSchema = new mongoose.Schema({
            items: [{
                productId: String,
                name: String,
                price: Number,
                quantity: Number
            }],
            totalAmount: Number,
            shippingAddress: {
                firstName: String,
                lastName: String,
                email: String,
                address: String
            },
            status: String,
            paymentStatus: String,
            trackingId: String
        }, { timestamps: true });

        const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
        
        const testOrder = new Order({
            items: [{
                productId: '65f1234567890abcdef00001',
                name: 'Solar Panel Pro',
                price: 1200,
                quantity: 1
            }],
            totalAmount: 1200,
            shippingAddress: {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                address: '123 Test St'
            },
            status: 'Shipped',
            paymentStatus: 'Paid',
            trackingId: 'TRK-VERIFY-123'
        });

        await testOrder.save();
        console.log('ORDER_ID:' + testOrder._id.toString());
        console.log('SHORT_ID:' + testOrder._id.toString().slice(-8).toUpperCase());
        console.log('TRACKING_ID:' + testOrder.trackingId);

    } catch (err) {
        console.error('ERROR:' + err.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedOrder();
