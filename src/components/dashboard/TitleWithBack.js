import { useRouter } from "next/navigation";

export default function TitleWithBack({ title, onBack, url, textBtn }) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof onBack === "function") return onBack();
    router.push(url);
  };

  return (
    <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
      <h1 className="text-3xl text-primary font-semibold">{title}</h1>
      <button
        type="button"
        onClick={handleBack}
        aria-label="عودة إلى لوحة التحكم"
        className="inline-flex items-center  bg-primary text-text hover:bg-hover px-3 py-2 rounded shadow-sm cursor-pointer transition duration-300"
      >
        <span className="text-md font-semibold">{textBtn}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M12.293 16.293a1 1 0 0 1-1.414 0L4.586 9.999l6.293-6.293a1 1 0 0 1 1.414 1.414L7.414 10l4.879 4.879a1 1 0 0 1 0 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
