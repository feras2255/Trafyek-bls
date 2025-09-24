import React from "react";

export default function ServicePage({ params }) {
  const { slug } = params;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-primary mb-4">
        صفحة الخدمة: {slug}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center">
        هذه صفحة تفاصيل خاصة بالخدمة {slug}. تقدر تجيب بياناتها من API أو من
        قاعدة البيانات.
      </p>
    </div>
  );
}
