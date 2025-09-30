import ServicesGrid from "@/components/servicesGrid";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-primary my-4">جميع الخدمات</h1>

      <ServicesGrid />
    </div>
  );
}
