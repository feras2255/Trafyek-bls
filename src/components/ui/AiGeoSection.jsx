import Link from "next/link";

export default function AiGeoSection({ isAr = true }) {
  const features = [
    {
      id: 1,
      title: "مساعد ذكي (Chatbot)",
      desc: "يرد على عملائك ويجمع الطلبات تلقائياً.",
      icon: (
        <svg
          className="w-6 h-6 text-[#5E3286]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "تحسين GEO",
      desc: "محتوى وبنية تقتبس منها محركات الذكاء الاصطناعي.",
      icon: (
        <svg
          className="w-6 h-6 text-[#5E3286]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "بيانات منظمة (Schema)",
      desc: "لتصدر الإجابات وفهم أدق لنشاطك.",
      icon: (
        <svg
          className="w-6 h-6 text-[#5E3286]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "أتمتة التسويق",
      desc: "محتوى وحملات مدعومة بالذكاء الاصطناعي.",
      icon: (
        <svg
          className="w-6 h-6 text-[#5E3286]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="relative bg-[#F9F7FC] rounded-3xl py-8 px-3 md:p-12 lg:p-16 border border-[#ECE5F5] overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-200/40 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div
            className={`lg:col-span-5 space-y-6 ${isAr ? "text-right" : "text-left"}`}
          >
            <div className="inline-block bg-[#5E3286] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
              {isAr
                ? "جديد - الذكاء الاصطناعي"
                : "New - Artificial Intelligence"}
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-[42px] font-black text-[#1E293B] leading-tight">
              {isAr ? (
                <>
                  نربط أعمالك بالذكاء الاصطناعي <br />
                  <span className="text-[#5E3286]">
                    وتحسين محركات الإجابة GEO
                  </span>
                </>
              ) : (
                "Connecting your business to AI & Improving GEO answers"
              )}
            </h2>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {isAr
                ? "لم يعد البحث في جوجل وحده — عملاؤك يسألون ChatGPT وGemini وClaude AI. نَهيئ موقعك ليظهر داخل إجابات الذكاء الاصطناعي، لا في نتائج البحث فقط."
                : "Your customers are asking AI engines directly. We optimize your brand to show up inside AI answers."}
            </p>

            <div>
              <Link
                href="#optimize"
                className="inline-flex items-center justify-center bg-[#5E3286] hover:bg-[#4d286d] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-purple-900/20 transition-all duration-300 text-sm md:text-base"
              >
                {isAr
                  ? "هيئ موقعك للذكاء الاصطناعي"
                  : "Optimize Your Site for AI"}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 ">
            {features.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 shadow-md shadow-purple-900/5 border border-purple-50 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1E293B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
