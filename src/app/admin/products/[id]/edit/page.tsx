import { getProduct } from "@/lib/actions";
import { notFound } from "next/navigation";
import EditProductClient from "@/components/EditProductClient";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch existing product data on the server
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <EditProductClient initialProduct={product} id={id} />;
}
