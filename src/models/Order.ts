
import mongoose, {
Document, Model, Schema
}
from 'mongoose';

export interface IOrderItem {
productId: string;

// Storing as string to keep history even if product is deleted 
name: string;
price: number;
quantity: number;
imageUrl?: string;
}

export interface IOrder extends Document {
userId?: string;
items: IOrderItem[];
totalAmount: number;
shippingAddress: {
firstName: string;
lastName: string;
email: string;
phone?: string;
address: string;
city?: string;
zipCode?: string;
country?: string;
}
;
billingAddress: {
firstName: string;
lastName: string;
email: string;
phone?: string;
address: string;
city?: string;
zipCode?: string;
country?: string;
}
;
status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
trackingId?: string;
shippingMethod?: string;
createdAt: Date;
updatedAt: Date;
}

const OrderItemSchema = new Schema({
productId: {
type: String, required: true
},
name: {
type: String, required: true
},
price: {
type: Number, required: true
},
quantity: {
type: Number, required: true
},
imageUrl: {
type: String
}

},
{
_id: false
}
);

const OrderSchema = new Schema({
userId: {
type: String
},

// Optional, for guests 
items: [OrderItemSchema], 
totalAmount: {
type: Number, required: true
},
shippingAddress: {
firstName: {
type: String, required: true
},
lastName: {
type: String, required: true
},
email: {
type: String, required: true
},
phone: {
type: String
},
address: {
type: String, required: true
},
city: {
type: String
},
zipCode: {
type: String
},
country: {
type: String
}

},
billingAddress: {
firstName: {
type: String, required: true
},
lastName: {
type: String, required: true
},
email: {
type: String, required: true
},
phone: {
type: String
},
address: {
type: String, required: true
},
city: {
type: String
},
zipCode: {
type: String
},
country: {
type: String
}

},
status: {
type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending'
},
paymentStatus: {
type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending'
},
trackingId: {
type: String
},
shippingMethod: {
type: String
}

},
{
timestamps: true
}
);

const OrderModel: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
