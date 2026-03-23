
import mongoose, {
Document, Model, Schema
}
from 'mongoose';

export interface IReview extends Document {
targetId: string;

// The ID of the Product or BlogPost 
targetType: 'Product' | 'BlogPost';
userName: string;
userEmail: string;
rating: number;

// 1 to 5 
comment: string;
status: 'Pending' | 'Approved' | 'Rejected';
createdAt: Date;
updatedAt: Date;
}

const ReviewSchema = new Schema({
targetId: {
type: String, required: true, index: true
},
targetType: {
type: String, required: true, enum: ['Product', 'BlogPost']
},
userName: {
type: String, required: true
},
userEmail: {
type: String, required: true
},
rating: {
type: Number, required: true, min: 1, max: 5
},
comment: {
type: String, required: true
},
status: {
type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'
}

},
{
timestamps: true
}
);

// Create compound index to quickly find approved reviews for a specific target 
ReviewSchema.index({
targetId: 1, targetType: 1, status: 1
}
);

const ReviewModel: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;
