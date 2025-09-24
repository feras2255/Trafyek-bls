import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-primary mb-6">تواصل معنا</h2>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-7/12">
          <form action="" className="space-y-6">
            <Input placeholder="الاسم" className="w-full" />
            <Input placeholder="الايميل" className="w-full" />
            <Input placeholder="الجوال" className="w-full" />
            <Textarea placeholder="الرسالة" className="w-full" />
            <div className="flex justify-center mt-4">
              <Button className="w-1/2 cursor-pointer text-xl">ارسال</Button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-5/12">
          <h1 className="text-3xl font-bold text-secondary mb-4">موقعنا</h1>

          <div className="text-maintext mt-4 space-y-2 text-lg">
            <p>الرياض المملكة العربية السعودية</p>
            <p>0530446151</p>
            <p>5M0b8@example.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
