'use server';

import dbConnect from './db';

import ProductModel from '@/models/Product';

import CategoryModel from '@/models/Category';

import UserModel from '@/models/User';

import {
Product, Category, BlogPost, Deal
}
from './types';

import {
revalidatePath
}
from 'next/cache';

import {
uploadToCloudinary
}
from './cloudinary';

import bcrypt from 'bcryptjs';

import DealModel from '@/models/Deal';

import OfferModel from '@/models/Offer';

import SaleModel from '@/models/Sale';

import OrderModel from '@/models/Order';

import ReviewModel from '@/models/Review';

import BlogPostModel from '@/models/BlogPost';

import MessageModel from '@/models/Message';

import TestimonialModel from '@/models/Testimonial';

import NewsletterModel from '@/models/Newsletter';

import mongoose from 'mongoose';

function mapCategory(doc: any): Category {

return {
id: doc._id.toString(), _id: doc._id.toString(), name: doc.name, slug: doc.slug, description: doc.description, imageUrl: doc.imageUrl, images: doc.images, isFeatured: doc.isFeatured, parentCategoryId: doc.parentCategoryId ? doc.parentCategoryId.toString() : undefined, level: doc.level, status: doc.status, displayOrder: doc.displayOrder,
}
;
}

function mapProduct(doc: any, activeSales: any[] = [], activeDeals: any[] = []): Product {
let price = doc.price;
let salePrice = doc.price;
let isOnSale = false;
let activeDealMetadata = undefined;
activeSales.forEach(sale => {
let applies = false;

    if (sale.applyTo === 'all') applies = true;

    if (sale.applyTo === 'category' && doc.category && (
      (typeof doc.category === 'string' && sale.categoryIds.includes(doc.category)) ||
      ((doc.category as any)._id && sale.categoryIds.includes((doc.category as any)._id.toString()))
    )) applies = true;

    if (sale.applyTo === 'products' && sale.productIds.some((id: any) => id.toString() === doc._id.toString())) applies = true;

if (applies) {
let campaignPrice = salePrice;

if (sale.discountType === 'percentage') {
campaignPrice = salePrice * (1 - sale.discountValue / 100);
}

else {
campaignPrice = salePrice - sale.discountValue;
}

if (campaignPrice < salePrice) {
salePrice = campaignPrice;
isOnSale = true;
}

}

}
);

const activeDeal = activeDeals.find(deal => deal.productIds.some((id: any) => id.toString() === doc._id.toString()) && (!deal.maxQuantity || deal.soldQuantity < deal.maxQuantity) );

if (activeDeal) {
let dealPrice = salePrice;

if (activeDeal.discountType === 'percentage') {
dealPrice = salePrice * (1 - activeDeal.discountValue / 100);
}

else {
dealPrice = salePrice - activeDeal.discountValue;
}

if (dealPrice < salePrice) {
salePrice = dealPrice;
isOnSale = true;
activeDealMetadata = {
id: activeDeal._id.toString(), title: activeDeal.title, discountType: activeDeal.discountType, discountValue: activeDeal.discountValue, endDate: activeDeal.endDate.toISOString(), maxQuantity: activeDeal.maxQuantity, soldQuantity: activeDeal.soldQuantity
}
;
}

}

const specs = doc.specifications ? Object.fromEntries(doc.specifications) : {
}
;

return {
id: doc._id.toString(), _id: doc._id.toString(), name: doc.name, sku: doc.sku, brand: doc.brand, slug: doc.slug, shortDescription: doc.shortDescription, description: doc.description, price: doc.price, salePrice: isOnSale ? salePrice : doc.salePrice, currency: doc.currency, tax: doc.tax, discount: doc.discount, isOnSale, category: (doc.category as any)?.name || doc.category?.toString() || 'Uncategorized', categoryId: doc.category?._id?.toString() || doc.category?.toString(), subcategoryId: doc.subcategory?._id?.toString() || doc.subcategory?.toString(), imageUrl: doc.imageUrl, images: doc.images, stock: doc.stock, lowStockAlert: doc.lowStockAlert, stockStatus: doc.stockStatus, rating: doc.rating, numReviews: doc.numReviews, reviewCount: doc.numReviews, features: doc.features, specifications: specs, specs: specs, shipping: doc.shipping, seo: doc.seo, status: doc.status, visibility: doc.visibility, isFeatured: doc.isFeatured, variations: doc.variations, warranty: doc.warranty, deal: activeDealMetadata
}
;
}

export async function getProducts(): Promise<Product[]> {
await dbConnect();

try {

const activeSales = await SaleModel.find({
isActive: true, startDate: {
$lte: new Date()
}
, endDate: {
$gte: new Date()
}

}
);

const activeDeals = await DealModel.find({
isActive: true, startDate: {
$lte: new Date()
}
, endDate: {
$gte: new Date()
}

}
);

const docs = await ProductModel.find({
}
).sort({
createdAt: -1
}
) .populate('category') .populate({
path: 'subcategory', strictPopulate: false
}
);

    const results = docs.map(p => mapProduct(p, activeSales, activeDeals));
    return JSON.parse(JSON.stringify(results));
}

catch (error) {
console.error("Error fetching products from MongoDB:", error);

return [];
}

}

export async function getProduct(idOrSlug: string): Promise<Product | null> {
await dbConnect();

try {

const activeSales = await SaleModel.find({
isActive: true, startDate: {
$lte: new Date()
}
, endDate: {
$gte: new Date()
}

}
);

const activeDeals = await DealModel.find({
isActive: true, startDate: {
$lte: new Date()
}
, endDate: {
$gte: new Date()
}

}
);
let doc;

if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
doc = await ProductModel.findById(idOrSlug) .populate('category') .populate({
path: 'subcategory', strictPopulate: false
}
);
}

else {
doc = await ProductModel.findOne({
slug: idOrSlug
}
) .populate('category') .populate({
path: 'subcategory', strictPopulate: false
}
);
}

    const result = doc ? mapProduct(doc, activeSales, activeDeals) : null;
    return JSON.parse(JSON.stringify(result));
}

catch (error) {
console.error(`Error fetching product ${idOrSlug
}
from MongoDB:`, error);

return null;
}

}

export async function addProduct(formData: FormData) {
await dbConnect();

const name = formData.get('name') as string;

const sku = formData.get('sku') as string;

const brand = formData.get('brand') as string;

const slug = formData.get('seoSlug') as string || (sku ? sku.toLowerCase().replace(/[^\w-]+/g, '-') : name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
let imageUrl = formData.get('imageUrl') as string;

const imageFile = formData.get('imageFile') as File;

const additionalFiles = formData.getAll('imageFiles') as File[];

const uploadedImages: string[] = [];

if (imageFile && imageFile.size > 0) {

try {

const buffer = Buffer.from(await imageFile.arrayBuffer());
imageUrl = await uploadToCloudinary(buffer, 'FamilyFans-products');
uploadedImages.push(imageUrl);
}

catch (uploadError) {
console.error('Main image upload failed', uploadError);
}

}

else 
if (imageUrl) {
uploadedImages.push(imageUrl);
}
for (
const file of additionalFiles) {

if (file && file.size > 0) {

try {

const buffer = Buffer.from(await file.arrayBuffer());

const url = await uploadToCloudinary(buffer, 'FamilyFans-products');
uploadedImages.push(url);
}

catch (err) {
console.error('Additional image upload failed', err);
}

}

}

// Build specifications from dynamic key-value pairs 
const specKeys = formData.getAll('specKey') as string[];

const specValues = formData.getAll('specValue') as string[];

const specifications: Record<string, string> = {
}
;
specKeys.forEach((key, i) => {

if (key && specValues[i]) specifications[key.trim()] = specValues[i].trim();
}
);

if (brand) specifications['Brand'] = brand;

const price = parseFloat(formData.get('price') as string);

const salePrice = parseFloat(formData.get('salePrice') as string);

  const category = formData.get('category') as string;
  const subcategory = formData.get('subcategory') as string;

  if (!category || category === 'null' || !subcategory || subcategory === 'null') {
    throw new Error('Both Category and Subcategory are mandatory.');
  }

  // Handle Variations (Sizes and Colors as strings for now, can be parsed into arrays)
  const sizes = formData.get('sizes') as string;
  const colors = formData.get('colors') as string;
  const variations = [];
  if (sizes) variations.push({ type: 'size', options: sizes.split(',').map(s => s.trim()) });
  if (colors) variations.push({ type: 'color', options: colors.split(',').map(c => c.trim()) });

  // Handle Warranty
  const warrantyPeriod = formData.get('warrantyPeriod') as string;
  const warrantyType = formData.get('warrantyType') as string;

  const productData: any = {
    name,
    sku,
    brand: brand || 'Generic',
    slug,
    shortDescription: formData.get('shortDescription') as string || '',
    description: formData.get('description') as string || '',
    price,
    salePrice: isNaN(salePrice) ? undefined : salePrice,
    currency: 'PKR',
    tax: 0,
    isOnSale: salePrice > 0 && salePrice < price,
    discount: salePrice > 0 && salePrice < price ? Math.round(((price - salePrice) / price) * 100) : 0,
    category,
    subcategory,
    imageUrl: uploadedImages.length > 0 ? uploadedImages[0] : imageUrl,
    images: uploadedImages,
    stock: parseInt(formData.get('stock') as string) || 0,
    lowStockAlert: 0,
    stockStatus: formData.get('stockStatus') as string || 'In Stock',
    isFeatured: formData.get('isFeatured') === 'true',
    specifications: Object.keys(specifications).length > 0 ? specifications : undefined,
    features: (formData.get('features') as string)?.split('\n').map((s: string) => s.trim()).filter(Boolean) || [],
    shipping: {
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0
      },
      class: 'Standard',
      deliveryTime: 'Standard Shipping',
    },
    seo: {
      title: name,
      description: formData.get('shortDescription') as string || name,
      slug: slug,
    },
    status: formData.get('status') as string || 'Published',
    visibility: 'Public',
    warranty: {
      period: 'No Warranty',
      type: 'No Warranty',
      installationRequired: false,
    },
  };

try {
await ProductModel.create(productData);
revalidatePath('/');
revalidatePath('/admin');
revalidatePath('/admin/products');
}

catch (error) {
console.error('Error adding product to MongoDB:', error);
}

}

export async function updateProduct(id: string, formData: FormData) {
await dbConnect();

const name = formData.get('name') as string;

const sku = formData.get('sku') as string;

const brand = formData.get('brand') as string;
let imageUrl = formData.get('imageUrl') as string;

const imageFile = formData.get('imageFile') as File;

const additionalFiles = formData.getAll('imageFiles') as File[];

const uploadedImages: string[] = [];

if (imageFile && imageFile.size > 0) {

try {

const buffer = Buffer.from(await imageFile.arrayBuffer());
imageUrl = await uploadToCloudinary(buffer, 'FamilyFans-products');
}

catch (uploadError) {
console.error('Main image upload failed', uploadError);
}

}
for (
const file of additionalFiles) {

if (file && file.size > 0) {

try {

const buffer = Buffer.from(await file.arrayBuffer());

const url = await uploadToCloudinary(buffer, 'FamilyFans-products');
uploadedImages.push(url);
}

catch (err) {
console.error('Additional image upload failed', err);
}

}

}

// Build specifications from dynamic key-value pairs 
const specKeys = formData.getAll('specKey') as string[];

const specValues = formData.getAll('specValue') as string[];

const specifications: Record<string, string> = {
}
;
specKeys.forEach((key, i) => {

if (key && specValues[i]) specifications[key.trim()] = specValues[i].trim();
}
);

if (brand) specifications['Brand'] = brand;

const price = parseFloat(formData.get('price') as string);

const salePrice = parseFloat(formData.get('salePrice') as string);

  const category = formData.get('category') as string;
  const subcategory = formData.get('subcategory') as string;

  if (!category || category === 'null' || !subcategory || subcategory === 'null') {
    throw new Error('Both Category and Subcategory are mandatory.');
  }

  // Handle Variations (Sizes and Colors as strings for now, can be parsed into arrays)
  const sizes = formData.get('sizes') as string;
  const colors = formData.get('colors') as string;
  const variations = [];
  if (sizes) variations.push({ type: 'size', options: sizes.split(',').map(s => s.trim()) });
  if (colors) variations.push({ type: 'color', options: colors.split(',').map(c => c.trim()) });

  // Handle Warranty
  const warrantyPeriod = formData.get('warrantyPeriod') as string;
  const warrantyType = formData.get('warrantyType') as string;

  const productData: any = {
    name,
    sku,
    brand: brand || 'Generic',
    shortDescription: formData.get('shortDescription') as string || '',
    description: formData.get('description') as string || '',
    price,
    salePrice: isNaN(salePrice) ? undefined : salePrice,
    currency: 'PKR',
    tax: 0,
    isOnSale: salePrice > 0 && salePrice < price,
    discount: salePrice > 0 && salePrice < price ? Math.round(((price - salePrice) / price) * 100) : 0,
    category,
    subcategory,
    stock: parseInt(formData.get('stock') as string) || 0,
    lowStockAlert: 0,
    stockStatus: formData.get('stockStatus') as string || 'In Stock',
    isFeatured: formData.get('isFeatured') === 'true',
    specifications: Object.keys(specifications).length > 0 ? specifications : undefined,
    variations,
    warranty: {
      period: warrantyPeriod,
      type: warrantyType,
      installationRequired: false,
    },
    features: (formData.get("features") as string)
      ?.split("\n")
      .map((s: string) => s.trim())
      .filter(Boolean) || [],
    shipping: {
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      class: 'Standard',
      deliveryTime: 'Standard Shipping',
    },
  };

if (imageUrl) productData.imageUrl = imageUrl;

const existingProduct = await ProductModel.findById(id);
let currentImages = existingProduct?.images || [];

if (imageUrl && !currentImages.includes(imageUrl)) {
currentImages = [imageUrl, ...currentImages];
}
productData.images = [...currentImages, ...uploadedImages];

try {
await ProductModel.findByIdAndUpdate(id, productData);
revalidatePath('/');
revalidatePath('/admin');
revalidatePath('/admin/products');
revalidatePath(`/products/${existingProduct.slug
}
`);
}

catch (error) {
console.error('Error updating product in MongoDB:', error);
}

}

export async function deleteProduct(id: string) {
await dbConnect();

try {
await ProductModel.findByIdAndDelete(id);
revalidatePath('/');
revalidatePath('/admin');
revalidatePath('/admin/products');
}

catch (error) {
console.error("Error deleting product from MongoDB:", error);
}

}

export async function getCategories(): Promise<Category[]> {
await dbConnect();

try {

const docs = await CategoryModel.find({
}
).sort({
name: 1
}
);

    const results = docs.map(mapCategory);
    return JSON.parse(JSON.stringify(results));
}

catch (error) {
console.error("Error fetching categories from MongoDB:", error);

return [];
}

}

export async function searchProducts(query: string): Promise<Product[]> {

if (!query) 
return [];
await dbConnect();

try {

const docs = await ProductModel.find({
$or: [ {
name: {
$regex: query, $options: 'i'
}

}
, {
category: {
$regex: query, $options: 'i'
}

}
]
}
).limit(5);

    const results = docs.map(doc => mapProduct(doc));
    return JSON.parse(JSON.stringify(results));
}

catch (error) {
console.error("Error searching products in MongoDB:", error);

return [];
}

}

export async function addCategory(formData: FormData) {
await dbConnect();

const name = formData.get('name') as string;

const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
let imageUrl = formData.get('imageUrl') as string;

const imageFile = formData.get('imageFile') as File;

if (imageFile && imageFile.size > 0) {

try {

const buffer = Buffer.from(await imageFile.arrayBuffer());
imageUrl = await uploadToCloudinary(buffer, 'FamilyFans-categories');
}

catch (error) {
console.error("Cloudinary upload failed for category", error);
}

}

const isFeatured = formData.get('isFeatured') === 'on';

const status = (formData.get('status') as 'Active' | 'Inactive') || 'Active';

const displayOrder = parseInt(formData.get('displayOrder') as string) || 0;

const parentCategoryId = formData.get('parentCategoryId') as string;
let level = 0;

if (parentCategoryId && parentCategoryId !== 'null') {

const parent = await CategoryModel.findById(parentCategoryId);

if (parent) level = (parent.level || 0) + 1;
}

const categoryData = {
name, slug, description: formData.get('description') as string, imageUrl, isFeatured, status, displayOrder, parentCategoryId: parentCategoryId && parentCategoryId !== 'null' ? parentCategoryId : null, level,
}
;

try {
await CategoryModel.create(categoryData);
revalidatePath('/admin');
revalidatePath('/admin/categories');
revalidatePath('/');
}

catch (error) {
console.error("Error adding category to MongoDB:", error);
}

}

export async function updateCategory(id: string, formData: FormData) {
await dbConnect();
let imageUrl = formData.get('imageUrl') as string;

const imageFile = formData.get('imageFile') as File;

if (imageFile && imageFile.size > 0) {

try {

const buffer = Buffer.from(await imageFile.arrayBuffer());
imageUrl = await uploadToCloudinary(buffer, 'FamilyFans-categories');
}

catch (error) {
console.error("Cloudinary upload failed for category update", error);
}

}

const isFeatured = formData.get('isFeatured') === 'on';

const status = (formData.get('status') as 'Active' | 'Inactive') || 'Active';

const displayOrder = parseInt(formData.get('displayOrder') as string) || 0;

const parentCategoryId = formData.get('parentCategoryId') as string;
let level = 0;

if (parentCategoryId && parentCategoryId !== 'null') {

const parent = await CategoryModel.findById(parentCategoryId);

if (parent) level = (parent.level || 0) + 1;
}

const categoryData: any = {
name: formData.get('name') as string, description: formData.get('description') as string, isFeatured, status, displayOrder, parentCategoryId: parentCategoryId && parentCategoryId !== 'null' ? parentCategoryId : null, level,
}
;

if (imageUrl) categoryData.imageUrl = imageUrl;

try {
await CategoryModel.findByIdAndUpdate(id, categoryData);
revalidatePath('/admin');
revalidatePath('/admin/categories');
revalidatePath('/');
}

catch (error) {
console.error("Error updating category in MongoDB:", error);
}

}

export async function deleteCategory(id: string) {
await dbConnect();

try {
await CategoryModel.findByIdAndDelete(id);
revalidatePath('/admin');
revalidatePath('/admin/categories');
}

catch (error) {
console.error("Error deleting category from MongoDB:", error);
}

}

export async function registerUser(formData: FormData) {
await dbConnect();

const name = formData.get('name') as string;

const email = formData.get('email') as string;

const password = formData.get('password') as string;

if (!name || !email || !password) throw new Error("Missing required fields");

const existingUser = await UserModel.findOne({
email
}
);

if (existingUser) throw new Error("User already exists");

const hashedPassword = await bcrypt.hash(password, 12);

try {
await UserModel.create({
name, email, password: hashedPassword, role: 'customer'
}
);

return {
success: true
}
;
}

catch (error) {
console.error("Error registering user:", error);
throw new Error("Failed to register user");
}

}

export async function getCategoryTree(onlyActive: boolean = true): Promise<Category[]> {
await dbConnect();

try {

const query = onlyActive ? {
status: {
$ne: 'Inactive'
}

}
: {
}
;

const allCategories = await CategoryModel.find(query).sort({
displayOrder: 1, name: 1
}
);

const categories = allCategories.map(mapCategory);

const map: Record<string, Category> = {
}
;

const tree: Category[] = [];
categories.forEach(cat => {
cat.subCategories = [];
map[cat.id] = cat;
}
);
categories.forEach(cat => {

if (cat.parentCategoryId && map[cat.parentCategoryId]) {
map[cat.parentCategoryId].subCategories?.push(cat);
}

else 
if (!cat.parentCategoryId) {
tree.push(cat);
}

}
);

    return JSON.parse(JSON.stringify(tree));
}

catch (error) {
console.error("Error building category tree:", error);

return [];
}

}

export async function getAdminCategories(): Promise<Category[]> {
await dbConnect();

try {

const categories = await CategoryModel.find({
}
).sort({
displayOrder: 1, name: 1
}
);

const mapped = categories.map(mapCategory);

// Enhance with stats 
const enhanced = await Promise.all(mapped.map(async (cat) => {

const subCount = await CategoryModel.countDocuments({
parentCategoryId: cat.id
}
);

const prodCount = await ProductModel.countDocuments({
$or: [ {
category: cat.id
}
, {
subcategory: cat.id
}
]
}
);

return {
...cat, subCategoryCount: subCount, productCount: prodCount
}
;
}
));

return JSON.parse(JSON.stringify(enhanced));
}

catch (error) {
console.error("Error fetching admin categories:", error);

return [];
}

}

export async function getDeals(activeOnly: boolean = false): Promise<Deal[]> {
await dbConnect();

try {

const query = activeOnly ? {
isActive: true, startDate: {
$lte: new Date()
}
, endDate: {
$gte: new Date()
}

}
: {
}
;

    const deals = await DealModel.find(query).sort({
      startDate: activeOnly ? 1 : -1
    });
    return JSON.parse(JSON.stringify(deals.map((deal: any) => ({
      ...deal.toObject(),
      id: deal._id.toString()
    }))));
}

catch (error) {
console.error("Error fetching deals:", error);

return [];
}

}

export async function getLatestDeal() {
  await dbConnect();
  try {
    const deal = await DealModel.findOne({
      isActive: true,
      endDate: { $gt: new Date() }
    }).sort({ createdAt: -1 });
    
    return deal ? JSON.parse(JSON.stringify(deal)) : null;
  } catch (error) {
    console.error("Error fetching latest deal:", error);
    return null;
  }
}

export async function addDeal(formData: FormData) {
await dbConnect();

const title = formData.get('title') as string;

const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

const dealData = {
title, slug, discountType: formData.get('discountType') as any, discountValue: parseFloat(formData.get('discountValue') as string), productIds: formData.getAll('productIds').map(id => new mongoose.Types.ObjectId(id as string)), startDate: new Date(formData.get('startDate') as string), endDate: new Date(formData.get('endDate') as string), maxQuantity: parseInt(formData.get('maxQuantity') as string) || undefined, soldQuantity: 0, isActive: formData.get('isActive') === 'on',
}
;

try {
await DealModel.create(dealData);
revalidatePath('/admin/offers/deals');
revalidatePath('/deals');
}

catch (error) {
console.error("Error adding deal:", error);
}

}

export async function deleteDeal(id: string) {
await dbConnect();

try {
await DealModel.findByIdAndDelete(id);
revalidatePath('/admin/offers/deals');
revalidatePath('/deals');
}

catch (error) {
console.error("Error deleting deal:", error);
}

}

export async function addCoupon(formData: FormData) {
await dbConnect();

const couponData = {
title: formData.get('title') as string, code: (formData.get('code') as string).toUpperCase(), discountType: formData.get('discountType') as any, discountValue: parseFloat(formData.get('discountValue') as string), minOrderValue: parseFloat(formData.get('minOrderValue') as string) || 0, applicableProducts: formData.getAll('applicableProducts').map(id => new mongoose.Types.ObjectId(id as string)), expiryDate: new Date(formData.get('expiryDate') as string), usageLimit: parseInt(formData.get('usageLimit') as string) || undefined, isActive: formData.get('isActive') === 'on',
}
;

try {
await OfferModel.create(couponData);
revalidatePath('/admin/offers');
}

catch (error) {
console.error("Error adding coupon:", error);
}

}

export async function validateCoupon(code: string, cartTotal: number) {
await dbConnect();

try {

const coupon = await OfferModel.findOne({
code: code.toUpperCase(), isActive: true, expiryDate: {
$gt: new Date()
}

}
);

if (!coupon) 
return {
valid: false, message:"Invalid or expired coupon"
}
;

if (cartTotal < coupon.minOrderValue) 
return {
valid: false, message: `Minimum order value: Rs ${coupon.minOrderValue
}
`
}
;

if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) 
return {
valid: false, message:"Coupon usage limit reached"
}
;

    return JSON.parse(JSON.stringify({
      valid: true, coupon
    }));
}

catch (error) {

return {
valid: false, message:"Error validating coupon"
}
;
}

}

export async function getSales() {
await dbConnect();

try {

    const sales = await SaleModel.find({}).sort({
      startDate: -1
    });
    return JSON.parse(JSON.stringify(sales));
}

catch (error) {
console.error("Error fetching sales:", error);

return [];
}

}

export async function getSaleById(id: string) {
    await dbConnect();
    try {
        const sale = await SaleModel.findById(id);
        return JSON.parse(JSON.stringify(sale));
    } catch (error) {
        console.error("Error fetching sale:", error);
        return null;
    }
}

export async function addSale(formData: FormData) {
await dbConnect();

const applyTo = formData.get('applyTo') as any;

const saleData = {
name: formData.get('name') as string, discountType: formData.get('discountType') as any, discountValue: parseFloat(formData.get('discountValue') as string), applyTo, categoryIds: applyTo === 'category' ? formData.getAll('categoryIds') : [], productIds: applyTo === 'products' ? formData.getAll('productIds').map(id => new mongoose.Types.ObjectId(id as string)) : [], startDate: new Date(formData.get('startDate') as string), endDate: new Date(formData.get('endDate') as string), isActive: formData.get('isActive') === 'on',
}
;

try {
    await SaleModel.create(saleData);
    revalidatePath('/admin/offers/sales');
    revalidatePath('/');
    revalidatePath('/shop');
}

catch (error) {
console.error("Error adding sale campaign:", error);
}

}

export async function deleteSale(id: string) {
await dbConnect();

try {
    await SaleModel.findByIdAndDelete(id);
    revalidatePath('/admin/offers/sales');
    revalidatePath('/');
    revalidatePath('/shop');
}

catch (error) {
console.error("Error deleting sale:", error);
}

}

export async function updateSale(id: string, formData: FormData) {
    await dbConnect();
    const applyTo = formData.get('applyTo') as any;
    const saleData = {
        name: formData.get('name') as string,
        discountType: formData.get('discountType') as any,
        discountValue: parseFloat(formData.get('discountValue') as string),
        applyTo,
        categoryIds: applyTo === 'category' ? formData.getAll('categoryIds') : [],
        productIds: applyTo === 'products' ? formData.getAll('productIds').map(pid => new mongoose.Types.ObjectId(pid as string)) : [],
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        isActive: formData.get('isActive') === 'on',
    };

    try {
        await SaleModel.findByIdAndUpdate(id, saleData);
        revalidatePath('/admin/offers/sales');
        revalidatePath('/');
        revalidatePath('/shop');
        return { success: true };
    } catch (error) {
        console.error("Error updating sale:", error);
        return { success: false };
    }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
await dbConnect();

try {

    const posts = await BlogPostModel.find({}).sort({
      createdAt: -1
    });
    return JSON.parse(JSON.stringify(posts.map((post: any) => ({
      ...post.toObject(),
      id: post._id.toString()
    }))));
}

catch (error) {
console.error("Error fetching blog posts:", error);

return [];
}

}

export async function getBlogPost(id: string) {
await dbConnect();

try {

    const post = await BlogPostModel.findById(id);
    return JSON.parse(JSON.stringify(post));
}

catch (error) {
console.error(`Error fetching blog post ${id
}
:`, error);

return null;
}

}

export async function getBlogPostBySlug(slug: string) {
await dbConnect();

try {

    const post = await BlogPostModel.findOne({
      slug, isPublished: true
    });
    return JSON.parse(JSON.stringify(post));
}

catch (error) {
console.error(`Error fetching blog post by slug ${slug
}
:`, error);

return null;
}

}

export async function addBlogPost(formData: FormData) {
await dbConnect();

const title = formData.get('title') as string;

const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
let imageUrl = formData.get('imageUrl') as string;

const imageFile = formData.get('imageFile') as File;

if (imageFile && imageFile.size > 0) {

try {

const buffer = Buffer.from(await imageFile.arrayBuffer());
imageUrl = await uploadToCloudinary(buffer, 'FamilyFans-blog');
}

catch (error) {
console.error("Cloudinary upload failed for blog post", error);
}

}

const blogData = {
title, slug, excerpt: formData.get('excerpt') as string, content: formData.get('content') as string, author: formData.get('author') as string || 'Admin', category: formData.get('category') as string, tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()) || [], imageUrl, isPublished: formData.get('isPublished') === 'on', publishedAt: formData.get('isPublished') === 'on' ? new Date() : null,
}
;

try {
await BlogPostModel.create(blogData);
revalidatePath('/admin/blog');
revalidatePath('/blog');
}

catch (error) {
console.error("Error adding blog post to MongoDB:", error);
}

}

export async function updateBlogPost(id: string, formData: FormData) {
await dbConnect();
let imageUrl = formData.get('imageUrl') as string;

const imageFile = formData.get('imageFile') as File;

if (imageFile && imageFile.size > 0) {

try {

const buffer = Buffer.from(await imageFile.arrayBuffer());
imageUrl = await uploadToCloudinary(buffer, 'FamilyFans-blog');
}

catch (error) {
console.error("Cloudinary upload failed for blog update", error);
}

}

const blogData: any = {
title: formData.get('title') as string, excerpt: formData.get('excerpt') as string, content: formData.get('content') as string, author: formData.get('author') as string, category: formData.get('category') as string, tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()) || [], isPublished: formData.get('isPublished') === 'on',
}
;

if (formData.get('isPublished') === 'on' && !blogData.publishedAt) blogData.publishedAt = new Date();

if (imageUrl) blogData.imageUrl = imageUrl;

try {
await BlogPostModel.findByIdAndUpdate(id, blogData);
revalidatePath('/admin/blog');
revalidatePath('/blog');
revalidatePath(`/blog/${id
}
`);
}

catch (error) {
console.error("Error updating blog post in MongoDB:", error);
}

}

export async function deleteBlogPost(id: string) {
await dbConnect();

try {
await BlogPostModel.findByIdAndDelete(id);
revalidatePath('/admin/blog');
revalidatePath('/blog');
}

catch (error) {
console.error("Error deleting blog post from MongoDB:", error);
}

}

export async function getCoupons() {
await dbConnect();

try {

const coupons = await OfferModel.find({
isActive: true, expiryDate: {
$gt: new Date()
}

}
).sort({
createdAt: -1
}
);

return JSON.parse(JSON.stringify(coupons));
}

catch (error) {
console.error("Error fetching coupons:", error);

return [];
}

}

// ─── ORDERS ─────────────────────────────────────────────────────── 
export async function createOrder(orderData: any) {
await dbConnect();

const session = await mongoose.startSession();
session.startTransaction();

try {

const order = new OrderModel(orderData);
await order.save({
session
}
);
for (
const item of orderData.items) {

const product = await ProductModel.findById(item.productId).session(session);

if (product) {

if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name
}
`);
product.stock -= item.quantity;
await product.save({
session
}
);
}

}
await session.commitTransaction();
session.endSession();
revalidatePath('/admin/inventory');
revalidatePath('/admin/orders');

return {
success: true, orderId: order._id.toString()
}
;
}

catch (error: any) {

if (session.inTransaction()) await session.abortTransaction();
session.endSession();
console.error("Error creating order:", error);

return {
success: false, message: error.message
}
;
}

}

export async function getOrders(filters: any = {
}
) {
await dbConnect();

try {
let query: any = {
}
;

if (filters.status && filters.status !== 'All') query.status = filters.status;

if (filters.search) {
query.$or = [ {
'shippingAddress.firstName': {
$regex: filters.search, $options: 'i'
}

}
, {
'shippingAddress.lastName': {
$regex: filters.search, $options: 'i'
}

}
, {
'shippingAddress.email': {
$regex: filters.search, $options: 'i'
}

}
];

if (mongoose.isValidObjectId(filters.search)) query.$or.push({
'_id': filters.search
}
);
}

const orders = await OrderModel.find(query).sort({
createdAt: -1
}
);

return JSON.parse(JSON.stringify(orders));
}

catch (error) {
console.error("Error fetching orders:", error);

return [];
}

}

export async function getOrderById(id: string) {

if (!id) 
return null;
await dbConnect();

try {
let order = null;

// 1. Try finding by MongoDB ID if valid 
if (mongoose.isValidObjectId(id)) {
order = await OrderModel.findById(id);
}

// 2. Fallback: Try finding by trackingId (case-insensitive search) 
if (!order) {
order = await OrderModel.findOne({
trackingId: {
$regex: new RegExp(`^${id
}
$`, 'i')
}

}
);
}

// 3. Fallback: Search by last 8 characters of ID if users copy it from the UI 
if (!order && id.length >= 8) {

// MongoDB allows searching by stringified _id using $expr 
order = await OrderModel.findOne({
$expr: {
$regexMatch: {
input: {
$toString:"$_id"
}
, regex: new RegExp(id +"$","i")
}
}
});
}

return order ? JSON.parse(JSON.stringify(order)) : null;
}

catch (error) {
console.error("Error fetching order by ID:", error);

return null;
}

}

export async function updateOrder(id: string, updateData: any) {
await dbConnect();

try {

const oldOrder = await OrderModel.findById(id);

if (!oldOrder) throw new Error("Order not found");

if (updateData.status === 'Cancelled' && oldOrder.status !== 'Cancelled') {
for (
const item of oldOrder.items) await ProductModel.findByIdAndUpdate(item.productId, {
$inc: {
stock: item.quantity
}

}
);
}

else 
if (oldOrder.status === 'Cancelled' && updateData.status && updateData.status !== 'Cancelled') {
for (
const item of oldOrder.items) await ProductModel.findByIdAndUpdate(item.productId, {
$inc: {
stock: -item.quantity
}

}
);
}
await OrderModel.findByIdAndUpdate(id, updateData);
revalidatePath('/admin/orders');
revalidatePath('/admin/inventory');

return {
success: true
}
;
}

catch (error: any) {
console.error("Error updating order:", error);

return {
success: false, message: error.message
}
;
}

}

export async function updateOrderStatus(id: string, status: string) {

return updateOrder(id, {
status
}
);
}

// ─── REVIEWS ────────────────────────────────────────────────────── 
export async function createReview(reviewData: any) {
await dbConnect();

try {

const review = new ReviewModel(reviewData);
await review.save();
revalidatePath(`/product/${reviewData.targetId
}
`);
revalidatePath(`/blog/${reviewData.targetId
}
`);

return {
success: true
}
;
}

catch (error: any) {
console.error("Error creating review:", error);

return {
success: false, message: error.message
}
;
}

}

export async function getReviews(targetId: string, targetType: 'Product' | 'BlogPost') {
await dbConnect();

try {

const reviews = await ReviewModel.find({
targetId, targetType, status: 'Approved'
}
).sort({
createdAt: -1
}
);

return JSON.parse(JSON.stringify(reviews));
}

catch (error) {
console.error("Error fetching reviews:", error);

return [];
}

}

export async function getAllReviews() {
await dbConnect();

try {

    const reviews = await ReviewModel.find().sort({
      createdAt: -1
    });
    return JSON.parse(JSON.stringify(reviews));
}

catch (error) {
console.error("Error fetching all reviews:", error);

return [];
}

}

export async function updateReviewStatus(id: string, status: string) {
await dbConnect();

try {

const review = await ReviewModel.findByIdAndUpdate(id, {
status
}
, {
new: true
}
);

if (review) {
revalidatePath(`/product/${review.targetId
}
`);
revalidatePath(`/blog/${review.targetId
}
`);
revalidatePath('/admin/reviews');
}

return {
success: true
}
;
}

catch (error: any) {
console.error("Error updating review status:", error);

return {
success: false, message: error.message
}
;
}

}

export async function getOrderAnalytics() {
await dbConnect();

try {

const orders = await OrderModel.find({
}
);

const products = await ProductModel.find({
}
);

// 1. Basic Stats 
const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

const totalOrders = orders.length;

const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

// 2. Unique Customers 
const uniqueEmails = new Set(orders.map(o => o.shippingAddress.email.toLowerCase()));

const totalCustomers = uniqueEmails.size;

// 3. Category Data 
const categoryMap: Record<string, number> = {
}
;
orders.forEach(order => {
order.items.forEach((item: any) => {
categoryMap[item.category || 'Uncategorized'] = (categoryMap[item.category || 'Uncategorized'] || 0) + item.quantity;
}
);
}
);

// 4. Sales Data (Last 30 Days) 
const last30Days = Array.from({
length: 30
}
, (_, i) => {

const date = new Date();
date.setDate(date.getDate() - (29 - i));

return date.toISOString().split('T')[0];
}
);

const salesMap: Record<string, number> = {
}
;

const countMap: Record<string, number> = {
}
;
orders.forEach(order => {

const dateKey = new Date(order.createdAt).toISOString().split('T')[0];

if (last30Days.includes(dateKey)) {
salesMap[dateKey] = (salesMap[dateKey] || 0) + order.totalAmount;
countMap[dateKey] = (countMap[dateKey] || 0) + 1;
}

}
);

const salesData = last30Days.map(date => ({
date, amount: salesMap[date] || 0
}
));

const dailyData = last30Days.map(date => ({
date: date.split('-').slice(1).join('/'), 
// Format MM/DD for simpler chart count: countMap[date] || 0
}
));

// 5. Low Stock Alerts (< 10) 
const lowStockProducts = products .filter(p => p.stock < 10) .sort((a,b) => a.stock - b.stock) .slice(0, 5);

// 6. Top Selling Products 
const productSalesMap: Record<string, {
name: string, sales: number, revenue: number, price: number, id: string
}
> = {
}
;
orders.forEach(order => {
order.items.forEach((item: any) => {

if (!productSalesMap[item.productId]) {
productSalesMap[item.productId] = {
name: item.name, sales: 0, revenue: 0, price: item.price, id: item.productId
}
;
}
productSalesMap[item.productId].sales += item.quantity;
productSalesMap[item.productId].revenue += item.quantity * item.price;
}
);
}
);

const topSellingProducts = Object.values(productSalesMap) .sort((a, b) => b.sales - a.sales) .slice(0, 5);

const productRevenue = Object.values(productSalesMap) .sort((a, b) => b.revenue - a.revenue) .map(p => ({
name: p.name, value: p.revenue
}
)) .slice(0, 5);

// 7. Recent Activity 
const recentActivity = await OrderModel.find({
}
) .sort({
createdAt: -1
}
) .limit(5);

// 8. Messages & Reviews Counts 
const unreadMessagesCount = await MessageModel.countDocuments({
status: 'New'
}
);

const pendingReviewsCount = await ReviewModel.countDocuments({
status: 'Pending'
}
);

// 9. Latest Reviews 
const latestReviews = await ReviewModel.find({
status: 'Approved'
}
) .sort({
createdAt: -1
}
) .limit(3);

return JSON.parse(JSON.stringify({
totalRevenue, 
totalOrders, 
totalCustomers, 
averageOrderValue, 
avgOrderValue: averageOrderValue, // Alias for legacy support 
salesData, 
dailyData, // Count based for Analytics page 
categoryData: Object.entries(categoryMap).map(([name, value]) => ({
name, value
})).sort((a, b) => b.value - a.value).slice(0, 5), 
lowStockProducts, 
topSellingProducts, 
productRevenue, // Value based for Analytics page 
recentActivity, 
unreadMessagesCount, 
pendingReviewsCount, 
latestReviews
}));
}

catch (error) {
console.error("Error fetching analytics:", error);

return null;
}

}

// --- Messages --- 
export async function createMessage(data: any) {
await dbConnect();

try {
await MessageModel.create(data);
revalidatePath('/admin/messages');

return {
success: true, message:"Message sent successfully!"
}
;
}

catch (error) {
console.error("Error creating message:", error);

return {
success: false, message:"Failed to send message."
}
;
}

}

export async function getMessages() {
await dbConnect();

try {

const messages = await MessageModel.find({
}
).sort({
createdAt: -1
}
);

return JSON.parse(JSON.stringify(messages));
}

catch (error) {
console.error("Error fetching messages:", error);

return [];
}

}

export async function updateMessageStatus(id: string, status: string) {
await dbConnect();

try {
await MessageModel.findByIdAndUpdate(id, {
status
}
);
revalidatePath('/admin/messages');

return {
success: true
}
;
}

catch (error) {
console.error("Error updating message status:", error);

return {
success: false
}
;
}

}

export async function deleteMessage(id: string) {
await dbConnect();

try {
await MessageModel.findByIdAndDelete(id);
revalidatePath('/admin/messages');

return {
success: true
}
;
}

catch (error) {
console.error("Error deleting message:", error);

return {
success: false
}
;
}

}

// --- Testimonials --- 
export async function createTestimonial(data: any) {
await dbConnect();

try {
await TestimonialModel.create(data);
revalidatePath('/admin/testimonials');
revalidatePath('/');

// Homepage usually shows testimonials 
return {
success: true, message:"Testimonial created successfully!"
}
;
}

catch (error) {
console.error("Error creating testimonial:", error);

return {
success: false, message:"Failed to create testimonial."
}
;
}

}

export async function getTestimonials(onlyActive: boolean = false) {
await dbConnect();

try {

const query = onlyActive ? {
isActive: true
}
: {
}
;

const testimonials = await TestimonialModel.find(query).sort({
createdAt: -1
}
);

return JSON.parse(JSON.stringify(testimonials));
}

catch (error) {
console.error("Error fetching testimonials:", error);

return [];
}

}

export async function updateTestimonial(id: string, data: any) {
await dbConnect();

try {
await TestimonialModel.findByIdAndUpdate(id, data);
revalidatePath('/admin/testimonials');
revalidatePath('/');

return {
success: true
}
;
}

catch (error) {
console.error("Error updating testimonial:", error);

return {
success: false
}
;
}

}

export async function deleteTestimonial(id: string) {
await dbConnect();

try {
await TestimonialModel.findByIdAndDelete(id);
revalidatePath('/admin/testimonials');
revalidatePath('/');

return {
success: true
}
;
}

catch (error) {
console.error("Error deleting testimonial:", error);

return {
success: false
}
;
}

}
// --- Newsletter --- 
export async function subscribeToNewsletter(email: string) {
await dbConnect();

try {
  // Check if already subscribed
  const existing = await NewsletterModel.findOne({ email });
  if (existing) {
    return { success: false, message: "Email already subscribed!" };
  }

  await NewsletterModel.create({ email });
  return { success: true, message: "Subscribed successfully!" };
} catch (error) {
  console.error("Error subscribing to newsletter:", error);
  return { success: false, message: "Failed to subscribe." };
}
}

export async function updateProfile(formData: FormData) {
  await dbConnect();
  
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!id || !name || !email) {
    throw new Error("Missing required fields");
  }

  try {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    
    if (!updated) {
      throw new Error("User not found");
    }

    revalidatePath('/account');
    return { success: true };
  } catch (error: any) {
    console.error("Error updating profile:", error);
    throw new Error(error.message || "Failed to update profile");
  }
}
