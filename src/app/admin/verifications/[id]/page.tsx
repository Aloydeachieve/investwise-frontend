import VerificationDetails from "@/components/admin/VerificationDetails/VerificationDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ unwrap params here
  return <VerificationDetails id={id} />;
}
