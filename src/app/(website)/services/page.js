import ServicesGrid from "@/components/servicesGrid";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-primary mb-4">صفحة الخدمات</h1>
      {/* <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center">
        هذه الصفحة تظهر كل الخدمات التي يقدمها الموقع
      </p> */}

      <ServicesGrid />
    </div>
  );
}
