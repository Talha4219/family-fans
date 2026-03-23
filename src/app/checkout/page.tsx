"use client";

import { useState } from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Lock,
  ShoppingBag,
  ShieldCheck,
  Ticket,
  AlertCircle,
  Circle,
  CheckCircle2,
  CircleDot,
} from "lucide-react";

import Image from "next/image";

import { validateCoupon, createOrder } from "@/lib/actions";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/store";

import { clearCart } from "@/store/cartSlice";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { items, totalAmount: subtotal } = useSelector(
    (state: RootState) => state.cart,
  );

  const [contactInfo, setContactInfo] = useState("");

  const [deliveryDetails, setDeliveryDetails] = useState({
    country: "Pakistan",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  const [billingOption, setBillingOption] = useState("same");

  // 'same' | 'different'
  const [couponCode, setCouponCode] = useState("");

  const [isApplying, setIsApplying] = useState(false);

  const [couponError, setCouponError] = useState("");

  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderError, setOrderError] = useState("");

  const shippingFee = 550;

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.discountType === "percentage") {
      return (subtotal * appliedCoupon.discountValue) / 100;
    }

    return appliedCoupon.discountValue;
  };
  const discount = calculateDiscount();

  const total = subtotal - discount + shippingFee;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsApplying(true);
    setCouponError("");

    try {
      const result = await validateCoupon(couponCode, subtotal);

      if (result.valid) {
        setAppliedCoupon(result.coupon);
        setCouponCode("");
      } else {
        setCouponError(result.message || "Invalid coupon");
      }
    } catch (err) {
      setCouponError("Error validating coupon. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setDeliveryDetails({
        ...deliveryDetails,
        [name]: checked,
      });
    } else {
      setDeliveryDetails({
        ...deliveryDetails,
        [name]: value,
      });
    }
  };
  const handleBillingInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };
  const handleExecuteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderError("");

    // Create a combined address object based on the requested model
    const shippingAddress = {
      firstName: deliveryDetails.firstName,
      lastName: deliveryDetails.lastName,
      email: contactInfo,
      phone: deliveryDetails.phone,
      address: `${deliveryDetails.address}
${deliveryDetails.apartment}
`.trim(),
      city: deliveryDetails.city,
      zipCode: deliveryDetails.postalCode,
      country: deliveryDetails.country,
    };
    const billingAddress =
      billingOption === "same"
        ? shippingAddress
        : {
            firstName: billingDetails.firstName,
            lastName: billingDetails.lastName,
            email: contactInfo,
            phone: deliveryDetails.phone,
            address: `${billingDetails.address}
${billingDetails.apartment}
`.trim(),
            city: billingDetails.city,
            zipCode: billingDetails.postalCode,
            country: billingDetails.country,
          };
    const orderData = {
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      totalAmount: total,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      status: "Pending",
    };
    try {
      const res = await createOrder(orderData as any);

      if (res.success) {
        dispatch(clearCart());
        router.push(`/order-confirmation/${res.orderId}
`);
      } else {
        setOrderError(res.message || "Failed to place order.");
      }
    } catch (err: any) {
      setOrderError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-24 px-6">
        {" "}
        <ShoppingBag className="w-16 h-16 text-slate-300 mb-6" />{" "}
        <h2 className="text-3xl font-black text-[zinc-950] tracking-tighter mb-4">
          Your cart is empty
        </h2>{" "}
        <p className="text-slate-500 font-medium mb-8">
          Add components to your cart before proceeding to checkout.
        </p>{" "}
        <Link href="/shop" className="btn-primary">
          Return to Shop
        </Link>{" "}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-[#333333]">
      {" "}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {" "}
        {/* Header */}
        <header className="mb-8 border-b border-gray-200 pb-6 flex items-center justify-between">
          {" "}
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-[zinc-950] uppercase"
          >
            {" "}
            FAMILY<span className="text-lime-600">FANS</span>{" "}
          </Link>{" "}
          <Link
            href="/cart"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            {" "}
            <ArrowLeft className="w-4 h-4" /> Return to cart{" "}
          </Link>{" "}
        </header>{" "}
        <div className="flex flex-col-reverse lg:flex-row gap-12 items-start">
          {" "}
          {/* Left Column: Checkout Form */}
          <div className="flex-grow w-full lg:w-7/12">
            {" "}
            <form onSubmit={handleExecuteOrder} className="space-y-10">
              {" "}
              {/* Contact Section */}
              <section>
                {" "}
                <div className="flex items-center justify-between mb-4">
                  {" "}
                  <h2 className="text-xl font-bold">Contact</h2>{" "}
                  <Link
                    href="/login"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Log in
                  </Link>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <input
                    type="text"
                    name="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Email or mobile phone number"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />{" "}
                </div>{" "}
              </section>{" "}
              {/* Delivery Section */}
              <section>
                {" "}
                <h2 className="text-xl font-bold mb-4">Delivery</h2>{" "}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {" "}
                  <div className="sm:col-span-2">
                    {" "}
                    <select
                      name="country"
                      value={deliveryDetails.country}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition-all"
                    >
                      {" "}
                      <option value="Pakistan">Pakistan</option>{" "}
                    </select>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <input
                      type="text"
                      name="firstName"
                      value={deliveryDetails.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <input
                      type="text"
                      name="lastName"
                      value={deliveryDetails.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />{" "}
                  </div>{" "}
                  <div className="sm:col-span-2">
                    {" "}
                    <input
                      type="text"
                      name="address"
                      value={deliveryDetails.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />{" "}
                  </div>{" "}
                  <div className="sm:col-span-2">
                    {" "}
                    <input
                      type="text"
                      name="apartment"
                      value={deliveryDetails.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <input
                      type="text"
                      name="city"
                      value={deliveryDetails.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <input
                      type="text"
                      name="postalCode"
                      value={deliveryDetails.postalCode}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 text-gray-900"
                    />{" "}
                  </div>{" "}
                  <div className="sm:col-span-2 relative">
                    {" "}
                    <input
                      type="tel"
                      name="phone"
                      value={deliveryDetails.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />{" "}
                  </div>{" "}
                  <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                    {" "}
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={deliveryDetails.saveInfo}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    />{" "}
                    <label
                      htmlFor="saveInfo"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Save this information for next time
                    </label>{" "}
                  </div>{" "}
                </div>{" "}
              </section>{" "}
              {/* Shipping Method Section */}
              <section>
                {" "}
                <h2 className="text-xl font-bold mb-4">Shipping method</h2>{" "}
                <div className="border border-blue-500 bg-blue-50/10 rounded-lg p-4 flex items-center justify-between cursor-pointer">
                  {" "}
                  <div className="flex flex-col gap-0.5">
                    {" "}
                    <span className="font-medium text-sm text-gray-900">
                      SHIPPING CHARGES
                    </span>{" "}
                    <span className="text-xs text-gray-500">
                      Tracking number provided
                    </span>{" "}
                  </div>{" "}
                  <span className="font-semibold text-sm">Rs 550.00</span>{" "}
                </div>{" "}
              </section>{" "}
              {/* Payment Section */}
              <section>
                {" "}
                <h2 className="text-xl font-bold mb-1">Payment</h2>{" "}
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-1 cursor-default">
                  {" "}
                  <Lock className="w-3 h-3" /> All transactions are secure and
                  encrypted.{" "}
                </p>{" "}
                <div className="border border-gray-300 rounded-lg flex items-center justify-between p-4 bg-gray-50 cursor-pointer">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />{" "}
                    <span className="font-medium text-sm text-gray-900">
                      Cash on Delivery (COD)
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </section>{" "}
              {/* Billing Address Section */}
              <section>
                {" "}
                <h2 className="text-xl font-bold mb-4">Billing address</h2>{" "}
                <div className="border border-gray-300 rounded-lg overflow-hidden divide-y divide-gray-200 shadow-sm">
                  {" "}
                  <label
                    className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                      billingOption === "same"
                        ? "bg-blue-50/30"
                        : "bg-white hover:bg-gray-50"
                    }
`}
                  >
                    {" "}
                    {billingOption === "same" ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    <div className="flex flex-col">
                      {" "}
                      <span className="font-semibold text-sm text-gray-900 leading-none">
                        Same as shipping address
                      </span>{" "}
                      <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-widest leading-none">
                        Standard billing flow
                      </p>{" "}
                    </div>{" "}
                    <input
                      type="radio"
                      name="billing"
                      value="same"
                      checked={billingOption === "same"}
                      onChange={() => setBillingOption("same")}
                      className="hidden"
                    />{" "}
                  </label>{" "}
                  <div>
                    {" "}
                    <label
                      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                        billingOption === "different"
                          ? "bg-blue-50/30"
                          : "bg-white hover:bg-gray-50"
                      }
`}
                    >
                      {" "}
                      {billingOption === "different" ? (
                        <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                      <div className="flex flex-col">
                        {" "}
                        <span className="font-semibold text-sm text-gray-900 leading-none">
                          Use a different billing address
                        </span>{" "}
                        <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-widest leading-none">
                          Custom finance record
                        </p>{" "}
                      </div>{" "}
                      <input
                        type="radio"
                        name="billing"
                        value="different"
                        checked={billingOption === "different"}
                        onChange={() => setBillingOption("different")}
                        className="hidden"
                      />{" "}
                    </label>{" "}
                    {billingOption === "different" && (
                      <div className="p-6 bg-slate-50/50 border-t border-gray-100 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        {" "}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {" "}
                          <div className="sm:col-span-2">
                            {" "}
                            <select
                              name="country"
                              value={billingDetails.country}
                              onChange={handleBillingInputChange}
                              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition-all"
                            >
                              {" "}
                              <option value="Pakistan">Pakistan</option>{" "}
                            </select>{" "}
                          </div>{" "}
                          <div>
                            {" "}
                            <input
                              type="text"
                              name="firstName"
                              value={billingDetails.firstName}
                              onChange={handleBillingInputChange}
                              placeholder="First name"
                              required={billingOption === "different"}
                              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />{" "}
                          </div>{" "}
                          <div>
                            {" "}
                            <input
                              type="text"
                              name="lastName"
                              value={billingDetails.lastName}
                              onChange={handleBillingInputChange}
                              placeholder="Last name"
                              required={billingOption === "different"}
                              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />{" "}
                          </div>{" "}
                          <div className="sm:col-span-2">
                            {" "}
                            <input
                              type="text"
                              name="address"
                              value={billingDetails.address}
                              onChange={handleBillingInputChange}
                              placeholder="Address"
                              required={billingOption === "different"}
                              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />{" "}
                          </div>{" "}
                          <div className="sm:col-span-2">
                            {" "}
                            <input
                              type="text"
                              name="apartment"
                              value={billingDetails.apartment}
                              onChange={handleBillingInputChange}
                              placeholder="Apartment, suite, etc. (optional)"
                              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />{" "}
                          </div>{" "}
                          <div>
                            {" "}
                            <input
                              type="text"
                              name="city"
                              value={billingDetails.city}
                              onChange={handleBillingInputChange}
                              placeholder="City"
                              required={billingOption === "different"}
                              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />{" "}
                          </div>{" "}
                          <div>
                            {" "}
                            <input
                              type="text"
                              name="postalCode"
                              value={billingDetails.postalCode}
                              onChange={handleBillingInputChange}
                              placeholder="Postal Status (44000)"
                              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>
                    )}
                  </div>{" "}
                </div>{" "}
              </section>{" "}
              {orderError && (
                <div className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-lg flex items-center gap-2">
                  {" "}
                  <AlertCircle className="w-5 h-5" /> {orderError}
                </div>
              )}
              {/* Submit Action */}
              <div className="pt-4">
                {" "}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  {" "}
                  {isSubmitting ? "Processing..." : "Complete order"}
                </button>{" "}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                  {" "}
                  <span>Powered by SecureCheckout</span>{" "}
                  <Lock className="w-3 h-3" />{" "}
                </div>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
          {/* Right Column: Order Summary */}
          <aside className="w-full lg:w-5/12 lg:sticky lg:top-10 bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 lg:border-none lg:bg-transparent lg:p-0">
            {" "}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {" "}
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  {" "}
                  <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 p-1 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                    {" "}
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-md" />
                    )}
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
                      {" "}
                      {item.quantity}
                    </span>{" "}
                  </div>{" "}
                  <div className="flex-grow min-w-0">
                    {" "}
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </p>{" "}
                  </div>{" "}
                  <p className="text-sm font-medium text-gray-900">
                    Rs {(item.price * item.quantity).toFixed(2)}
                  </p>{" "}
                </div>
              ))}
            </div>{" "}
            <div className="my-6 pt-6 border-t border-gray-200">
              {" "}
              {!appliedCoupon ? (
                <div className="flex gap-3">
                  {" "}
                  <div className="relative flex-grow">
                    {" "}
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase"
                    />{" "}
                  </div>{" "}
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isApplying || !couponCode}
                    className="px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg text-sm transition-all disabled:opacity-50"
                  >
                    {" "}
                    {isApplying ? "..." : "Apply"}
                  </button>{" "}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 rounded-lg px-4 py-3 border border-green-200">
                  {" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    <Ticket className="w-4 h-4 text-green-600" />{" "}
                    <span className="text-sm font-medium text-green-800">
                      {appliedCoupon.code}
                      applied
                    </span>{" "}
                  </div>{" "}
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    {" "}
                    Remove{" "}
                  </button>{" "}
                </div>
              )}
              {couponError && (
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                  {" "}
                  <AlertCircle className="w-3 h-3" /> {couponError}
                </div>
              )}
            </div>{" "}
            <div className="space-y-3 pb-6 border-b border-gray-200">
              {" "}
              <div className="flex justify-between items-center text-sm">
                {" "}
                <span className="text-gray-600">Subtotal</span>{" "}
                <span className="font-medium text-gray-900">
                  Rs {subtotal.toFixed(2)}
                </span>{" "}
              </div>{" "}
              {appliedCoupon && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  {" "}
                  <span>Discount</span>{" "}
                  <span className="font-medium">
                    -Rs {discount.toFixed(2)}
                  </span>{" "}
                </div>
              )}
              <div className="flex justify-between items-center text-sm">
                {" "}
                <span className="text-gray-600">Shipping</span>{" "}
                <span className="font-medium text-gray-900">
                  Rs {shippingFee.toFixed(2)}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="flex justify-between items-center pt-6">
              {" "}
              <span className="text-base font-bold text-gray-900">
                Total
              </span>{" "}
              <span className="text-2xl font-bold text-gray-900">
                {" "}
                <span className="text-sm text-gray-500 font-medium mr-1">
                  PKR
                </span>{" "}
                Rs {total.toFixed(2)}
              </span>{" "}
            </div>{" "}
          </aside>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
