'use client';

import {
addProduct, getCategoryTree
}
from"@/lib/actions";

import {
ArrowLeft, Package, Boxes, Image as ImageIcon, Layout, Zap, ChevronLeft, Save, Sparkles, Database, Plus, Trash2, Truck, Search, ShieldCheck, Settings, Layers, DollarSign
}
from"lucide-react";

import Link from"next/link";

import {
useRouter
}
from"next/navigation";

import {
useEffect, useState
}
from"react";

import {
Category
}
from"@/lib/types";

import {
motion, AnimatePresence
}
from"framer-motion";

const SectionHeader = ({
  icon: Icon, title, desc
}
: {
  icon: any, title: string, desc: string
}
) => ( <div className="flex items-start gap-4 mb-8"> <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-lime-100/50"> <Icon className="w-6 h-6 text-lime-600" /> </div> <div> <h3 className="text-lg font-black text-zinc-950 uppercase tracking-tight">{title
}
</h3> <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{desc
}
</p> </div> </div> );

const InputGroup = ({
  label, id, name, type ="text", placeholder, required = false, icon: Icon, step, min, defaultValue
}
: any) => ( <div className="space-y-2"> <label htmlFor={id}
className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2"> {Icon && <Icon className="w-3 h-3 text-slate-400" />
}
{label
}
{required && <span className="text-lime-600">*</span>
}
</label> <input type={type}
id={id}
name={name}
required={required}
step={step}
min={min}
defaultValue={defaultValue}
className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-zinc-950 placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 focus:border-lime-600/30 transition-all outline-none" placeholder={placeholder
}
/> </div> );

export default 
function AddProduct() {

const router = useRouter();

const [categoryTree, setCategoryTree] = useState<Category[]>([]);

const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
const [flattenedCategories, setFlattenedCategories] = useState<{
  id: string, name: string, level: number, parentCategoryId?: string
}[]>([]);

const [specs, setSpecs] = useState<{
  key: string, value: string
}[]>([]);

const [isSaving, setIsSaving] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);

// Form Persistence
useEffect(() => {
  const saved = localStorage.getItem('add_product_draft');
  if (saved) {
    const data = JSON.parse(saved);
    const form = document.querySelector('form');
    if (form) {
      Object.entries(data).forEach(([name, value]) => {
        const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (input && input.type !== 'file') {
          input.value = value as string;
        }
      });
      if (data.category) setSelectedCategoryId(data.category);
      if (data.specs) setSpecs(data.specs);
    }
  }
}, []);

const saveDraft = () => {
  const form = document.querySelector('form');
  if (form) {
    const formData = new FormData(form);
    const data: any = {};
    formData.forEach((value, key) => {
      if (!(value instanceof File)) data[key] = value;
    });
    data.specs = specs;
    localStorage.setItem('add_product_draft', JSON.stringify(data));
  }
};

useEffect(() => {
  if (specs.length > 0) saveDraft();
}, [specs]);

useEffect(() => {
  if (selectedCategoryId) saveDraft();
}, [selectedCategoryId]);

useEffect(() => {
  const fetchCategories = async () => {
    const tree = await getCategoryTree();
    setCategoryTree(tree);

    const flattened: {
      id: string, name: string, level: number, parentCategoryId?: string
    }[] = [];

    const flatten = (cats: Category[], level: number = 0, parentId?: string) => {
      cats.forEach(cat => {
        flattened.push({
          id: cat.id, name: cat.name, level, parentCategoryId: parentId
        });

        if (cat.subCategories && cat.subCategories.length > 0) {
          flatten(cat.subCategories, level + 1, cat.id);
        }
      });
    };
    flatten(tree);
    setFlattenedCategories(flattened);
  };
  fetchCategories();
}, []);

  const addSpec = () => setSpecs([...specs, { key: '', value: '' }]);

  const addFanTemplate = () => {
    const fanSpecs = [
      { key: 'Size', value: '12"' },
      { key: 'Sweep Size', value: '300mm' },
      { key: 'Rated Power', value: '45W' },
      { key: 'Speed', value: '1350RPM' },
      { key: 'Air Delivery', value: '70 m3/min' },
      { key: 'Service Value', value: '1.55' }
    ];
    setSpecs(fanSpecs);
  };

  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));

const updateSpec = (index: number, field: 'key' | 'value', val: string) => {

const newSpecs = [...specs];
newSpecs[index][field] = val;
setSpecs(newSpecs);
}
;
async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault();
setIsSaving(true);

const formData = new FormData(event.currentTarget);

// Add dynamic specs to formData
specs.forEach(spec => {

if (spec.key && spec.value) {
formData.append('specKey', spec.key);
formData.append('specValue', spec.value);
}

}
);
try {
  await addProduct(formData);
  setShowSuccess(true);
  setIsSaving(false);
  // Clear success message after 5 seconds
  setTimeout(() => setShowSuccess(false), 5000);
} catch (error) {
  console.error(error);
  alert(error instanceof Error ? error.message : 'Failed to add product');
  setIsSaving(false);
}
}



return ( <div className="max-w-6xl mx-auto space-y-12 pb-32"> {/* Header */
}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4"> <div> <Link href="/admin/products" className="group flex items-center gap-2 text-slate-400 hover:text-lime-600 transition-colors mb-4"> <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <span className="text-[10px] font-black uppercase tracking-[0.2em]">Inventory Matrix</span> </Link> <h1 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter uppercase"> New <span className="text-lime-600 underline decoration-slate-100 underline-offset-8">Product</span> Node </h1> </div> <div className="hidden lg:flex items-center gap-8 bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-900/5"> <div className="flex flex-col"> <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</span> <span className="text-xs font-black text-zinc-950 uppercase tracking-widest">SECURE_PUSH_2.0</span> </div> <div className="w-px h-8 bg-slate-100" /> <Database className="w-6 h-6 text-slate-200" /> </div> </div> <form onSubmit={handleFormSubmit}
  onChange={saveDraft}
  className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-4">
 {/* Left Column - Main Details */
}
<div className="lg:col-span-8 space-y-10"> {/* 1. Basic Information */
}
<motion.section initial={{
opacity: 0, y: 20
}

}
animate={{
opacity: 1, y: 0
}

}
className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-50 shadow-xl shadow-slate-900/5" > <SectionHeader icon={Layout
}
title="Product Identity" desc="Primary identifiers" /> <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> <div className="md:col-span-2"> <InputGroup label="Product Name" id="name" name="name" required placeholder="Orient Ceiling Fan X100" /> </div> <InputGroup label="Product SKU" id="sku" name="sku" required placeholder="FAN-X100" icon={Package
}
/> <div className="space-y-2"> <label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Category <span className="text-lime-600">*</span></label> <select id="category" name="category" required value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-zinc-950 focus:ring-2 focus:ring-lime-600/20 outline-none"> <option value="">Select Category</option> {flattenedCategories.filter(c => c.level === 0).map(cat => ( <option key={cat.id} value={cat.id}>{cat.name}</option> ))} </select> </div> </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"> <div className="space-y-2"> <label htmlFor="subcategory" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Subcategory <span className="text-lime-600">*</span></label> <select id="subcategory" name="subcategory" required disabled={!selectedCategoryId} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-zinc-950 focus:ring-2 focus:ring-lime-600/20 outline-none disabled:opacity-50"> <option value="">{selectedCategoryId ? 'Select Subcategory' : 'Select Category First'}</option> {flattenedCategories.filter(c => c.parentCategoryId === selectedCategoryId).map(cat => ( <option key={cat.id} value={cat.id}>{cat.name}</option> ))} </select> </div> <InputGroup label="Display Short Summary" id="shortDescription" name="shortDescription" placeholder="Brief summary for cards..." /> </div> <div className="mt-8 space-y-2"> <label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Product Details</label> <textarea id="description" name="description" rows={4
}
required className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 text-sm font-black text-zinc-950 placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 outline-none resize-none" placeholder="Enter full product description..." /> </div> </motion.section> {/* 2. Pricing & Variants */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-lg shadow-slate-900/5"
  >
    <SectionHeader icon={DollarSign} title="Commercials" desc="Price & Tax" />
    <div className="space-y-6">
      <InputGroup label="Unit Price (PKR)" id="price" name="price" type="number" step="0.01" required placeholder="5000" />
      <InputGroup label="Sale Price (Optional)" id="salePrice" name="salePrice" type="number" step="0.01" placeholder="4500" />
    </div>
  </motion.section>

  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-lg shadow-slate-900/5"
  >
    <SectionHeader icon={Settings} title="Configurations" desc="Sizes & Colors" />
    <div className="space-y-6">
      <InputGroup label="Available Sizes" id="sizes" name="sizes" placeholder='12", 14", 16" (comma separated)' />
      <InputGroup label="Available Colors" id="colors" name="colors" placeholder="Off-White, Black, Silver (comma separated)" />
    </div>
  </motion.section>
</div>

{/* 3. Inventory & Logistics */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-lg shadow-slate-900/5"
  >
    <SectionHeader icon={Boxes} title="Stock Matrix" desc="Quantity Control" />
    <div className="space-y-6">
      <InputGroup label="Available Units" id="stock" name="stock" type="number" required placeholder="50" min="0" />
      <div className="space-y-2">
        <label htmlFor="stockStatus" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Status</label>
        <select id="stockStatus" name="stockStatus" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-zinc-950 outline-none">
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
    </div>
  </motion.section>

  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-lg shadow-slate-900/5"
  >
    <SectionHeader icon={ShieldCheck} title="Service" desc="Warranty & Period" />
    <div className="space-y-6">
      <InputGroup label="Warranty Period" id="warrantyPeriod" name="warrantyPeriod" placeholder="LifeTime Guarantee, 2 Years, etc." />
      <InputGroup label="Warranty Type" id="warrantyType" name="warrantyType" placeholder="Replacement, Repair, etc." />
    </div>
  </motion.section>
</div>
 {/* Product Images */
}
<motion.section initial={{
opacity: 0, y: 20
}

}
animate={{
opacity: 1, y: 0
}

}
className="bg-white rounded-[3rem] p-12 border border-slate-50 shadow-xl shadow-slate-900/5" > <SectionHeader icon={ImageIcon
}
title="Media" desc="Photos & Gallery" /> <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> <div className="space-y-6"> <div className="space-y-3"> <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Main Cover</label> <div className="relative group/file"> <input type="file" name="imageFile" accept="image/*" className="w-full h-40 opacity-0 absolute inset-0 cursor-pointer z-10" /> <div className="w-full h-40 bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 group-hover/file:border-lime-600 group-hover/file:bg-lime-50/50 transition-all"> <Plus className="w-8 h-8 mb-2" /> <p className="text-[10px] font-black uppercase tracking-widest">Select Image</p> </div> </div> </div> <InputGroup label="Or URL Link" id="imageUrl" name="imageUrl" placeholder="https://..." /> </div> <div className="space-y-3"> <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Gallery (Multiple)</label> <div className="relative group/file"> <input type="file" name="imageFiles" multiple accept="image/*" className="w-full h-40 opacity-0 absolute inset-0 cursor-pointer z-10" /> <div className="w-full h-40 bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 group-hover/file:border-lime-600 group-hover/file:bg-lime-50/50 transition-all"> <Plus className="w-8 h-8 mb-2" /> <p className="text-[10px] font-black uppercase tracking-widest">Add Gallery Shots</p> </div> </div> </div> </div> </motion.section> {/* Specifications */
}
<motion.section initial={{
opacity: 0, y: 20
}

}
animate={{
opacity: 1, y: 0
}

}
className="bg-white rounded-[3rem] p-12 border border-slate-50 shadow-xl shadow-slate-900/5 overflow-hidden" > <SectionHeader icon={Zap
}
title="Specs" desc="Key details" /> <div className="space-y-4"> <div className="flex items-center justify-between gap-4 mb-4">
  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specification Nodes</p>
  <button 
    type="button" 
    onClick={addFanTemplate}
    className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5"
  >
    <Sparkles className="w-3 h-3" />
    Use Fan Template
  </button>
</div>
<AnimatePresence>
  {specs.map((spec, index) => (
    <motion.div 
      key={index}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="grid grid-cols-12 gap-4 items-end mb-4"
    >
      <div className="col-span-5">
        <input 
          value={spec.key}
          onChange={(e) => updateSpec(index, 'key', e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-zinc-950 placeholder:text-slate-200 outline-none" 
          placeholder="Key (e.g. Speed)" 
        />
      </div>
      <div className="col-span-6">
        <input 
          value={spec.value}
          onChange={(e) => updateSpec(index, 'value', e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-zinc-950 placeholder:text-slate-200 outline-none" 
          placeholder="Value (e.g. 1350RPM)" 
        />
      </div>
      <div className="col-span-1 flex justify-center pb-2">
        <button 
          type="button" 
          onClick={() => removeSpec(index)}
          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  ))}
</AnimatePresence>
<button 
  type="button" 
  onClick={addSpec}
  className="w-full py-4 border-2 border-dashed border-slate-50 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-lime-600 hover:border-lime-100 hover:bg-lime-50/30 transition-all flex items-center justify-center gap-2"
>
  <Plus className="w-4 h-4" />
  Add Custom Row
</button>
 </div> </motion.section> </div> {/* Right Column - Status */
}
<div className="lg:col-span-4 space-y-10"> <motion.section initial={{
opacity: 0, x: 20
}

}
animate={{
opacity: 1, x: 0
}

}
className="bg-zinc-950 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/20 sticky top-10" > <SectionHeader icon={Settings
}
title="Control" desc="Publish State" /> <div className="space-y-8"> <div className="space-y-3"> <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label> <div className="grid grid-cols-2 gap-4"> <label className="cursor-pointer"> <input type="radio" name="status" value="Published" defaultChecked className="sr-only peer" /> <div className="py-4 text-center rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest peer-checked:bg-lime-600 peer-checked:border-lime-600 transition-all">Go Live</div> </label> <label className="cursor-pointer"> <input type="radio" name="status" value="Draft" className="sr-only peer" /> <div className="py-4 text-center rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest peer-checked:bg-lime-600 peer-checked:border-lime-600 transition-all">Draft</div> </label> </div> </div> <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10"> <div className="space-y-1"> <p className="text-[10px] font-black uppercase tracking-widest">Pin to Home</p> <p className="text-[8px] font-medium text-slate-500 uppercase">Featured List</p> </div> <input type="checkbox" name="isFeatured" value="true" className="w-5 h-5 rounded border-white/10 bg-white/5 text-lime-600 focus:ring-lime-600/20" /> </div> <div className="pt-8 border-t border-white/10 text-center"> <p className="text-[9px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed"> Brand, Shipping, and SEO fields are managed automatically to keep things smooth. </p> </div> </div> </motion.section> </div> </form> {/* Bottom Actions Bar */
}
<div className="fixed bottom-0 left-0 lg:left-80 right-0 p-8 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-between gap-6 z-[100] shadow-2xl"> <div className="hidden sm:flex items-center gap-4"> <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100"> <Sparkles className="w-5 h-5 text-lime-200" /> </div> <div className="flex flex-col"> <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</span> <span className="text-[10px] font-black text-zinc-950 uppercase tracking-widest">{isSaving ? 'Synchronizing...' : 'Draft Ready'
}
</span> </div> </div> <div className="flex items-center gap-4 ml-auto"> <Link href="/admin/products" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-lime-600 transition-colors px-6"> Abort </Link>            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-lime-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-lime-600/20"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Product Cached Successfully!</span>
              </motion.div>
            )}
            <button onClick={() => (document.querySelector('form') as any)?.requestSubmit()
}
disabled={isSaving
}
className="btn-primary !px-12 !py-5 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-lime-600/30 flex items-center gap-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100" > {isSaving ? <Layers className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />
}
{isSaving ? 'Processing Matrix' : 'Post Product'
}
</button> </div> </div> </div> );
}
