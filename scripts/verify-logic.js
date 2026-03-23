const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://talha:talha@cluster0.hfgz0mu.mongodb.net/e-comerce';

async function verifyLogic() {
    try {
        await mongoose.connect(MONGODB_URI);
        const OrderSchema = new mongoose.Schema({ status: String, trackingId: String }, { timestamps: true });
        const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
        
        const shortId = '0C532AC2';
        const fullId = '69b7a4b94be36a7c0c532ac2';
        const trackingId = 'TRK-VERIFY-123';

        console.log('--- VERIFYING SHORT ID: ' + shortId + ' ---');
        const byShort = await Order.findOne({
            $expr: {
                $regexMatch: {
                    input: { $toString: "$_id" },
                    regex: new RegExp(shortId + "$", "i")
                }
            }
        });
        console.log('Found by short ID: ' + (byShort ? 'SUCCESS (' + byShort._id + ')' : 'FAILED'));

        console.log('\n--- VERIFYING FULL ID: ' + fullId + ' ---');
        const byFull = await Order.findById(fullId);
        console.log('Found by full ID: ' + (byFull ? 'SUCCESS' : 'FAILED'));

        console.log('\n--- VERIFYING TRACKING ID: ' + trackingId + ' ---');
        const byTracking = await Order.findOne({ 
            trackingId: { $regex: new RegExp(`^${trackingId}$`, 'i') } 
        });
        console.log('Found by tracking ID: ' + (byTracking ? 'SUCCESS' : 'FAILED'));

    } catch (err) {
        console.error('ERROR:' + err.message);
    } finally {
        await mongoose.disconnect();
    }
}

verifyLogic();
