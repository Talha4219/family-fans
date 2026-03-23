import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  sku: string;
  brand: string;
  slug: string;
  shortDescription?: string;
  description: string;
  price: number;
  salePrice?: number;
  currency: string;
  tax?: number;
  discount: number;
  isOnSale: boolean;
  category: string | mongoose.Types.ObjectId;
  subcategory?: string | mongoose.Types.ObjectId;
  imageUrl: string;
  images: string[];
  stock: number;
  lowStockAlert?: number;
  stockStatus: "In Stock" | "Out of Stock";
  rating: number;
  numReviews: number;
  reviews: any[];
  features?: string[];
  specifications?: Record<string, string>;
  shipping?: {
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
    class?: string;
    deliveryTime?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    slug?: string;
  };
  status: "Draft" | "Published";
  visibility: "Public" | "Hidden";
  isFeatured: boolean;
  variations?: any[];
  warranty?: {
    period?: string;
    type?: string;
    installationRequired?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    brand: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
    },
    currency: {
      type: String,
      default: "PKR",
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    lowStockAlert: {
      type: Number,
      default: 0,
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Array,
      default: [],
    },
    features: {
      type: [String],
    },
    specifications: {
      type: Map,
      of: String,
    },
    shipping: {
      weight: {
        type: Number,
      },
      dimensions: {
        length: {
          type: Number,
        },
        width: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
      class: {
        type: String,
      },
      deliveryTime: {
        type: String,
      },
    },
    seo: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      slug: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },
    visibility: {
      type: String,
      enum: ["Public", "Hidden"],
      default: "Public",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    variations: {
      type: Array,
      default: [],
    },
    warranty: {
      period: {
        type: String,
      },
      type: {
        type: String,
      },
      installationRequired: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

// Avoid model recompilation in Next.js development
const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
