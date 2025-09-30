export default function InstagramIcon({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#e6683c" />
          <stop offset="100%" stopColor="#dc2743" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#grad1)" />
      <circle cx="12" cy="12" r="5" fill="white" />
      <circle cx="17" cy="7" r="1" fill="white" />
    </svg>
  );
}
