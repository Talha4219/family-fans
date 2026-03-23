export type Product = {
  id: string;
  _id?: string;
  name: string;
  sku?: string;
  brand?: string;
  slug?: string;
  shortDescription?: string;
  description: string;
  price: number;
  salePrice?: number;
  currency?: string;
  tax?: number;
  discount?: number;
  isOnSale?: boolean;
  category: string;
  categoryId?: string;
  subcategoryId?: string;
  imageUrl: string;
  images?: string[];
  stock?: number;
  lowStockAlert?: number;
  stockStatus?: "In Stock" | "Out of Stock";
  rating?: number;
  numReviews?: number;
  reviewCount?: number;
  features?: string[];
  specifications?: Record<string, string>;
  specs?: Record<string, string>;
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
  status?: "Draft" | "Published";
  visibility?: "Public" | "Hidden";
  isFeatured?: boolean;
  variations?: any[];
  warranty?: {
    period?: string;
    type?: string;
    installationRequired?: boolean;
  };
  deal?: {
    id: string;
    title: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    endDate: string;
    maxQuantity?: number;
    soldQuantity: number;
  };
};

export type Deal = {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  maxQuantity?: number;
  soldQuantity: number;
  isActive: boolean;
};

export type Category = {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  productCount?: number;
  isFeatured?: boolean;
  parentCategoryId?: string;
  level?: number;
  status?: "Active" | "Inactive";
  displayOrder?: number;
  subCategories?: Category[];
  subCategoryCount?: number;
};
export type Testimonial = {
  id: string;
  _id?: string;
  name: string;
  content: string;
  rating: number;
  designation: string;
  isActive: boolean;
  createdAt: string;
};

export type BlogPost = {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewsletterSubscription = {
  id: string;
  email: string;
  subscribedAt: string;
};
