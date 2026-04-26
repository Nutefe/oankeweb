import { cn } from "@/utils/cn";

interface SubscriptionCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  recommendedLabel?: string;
}

export default function SubscriptionCard({
  name,
  price,
  description,
  features,
  highlighted = false,
  ctaLabel,
  recommendedLabel = "Recommandé",
}: SubscriptionCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl p-8 bg-white shadow-md border-2 transition-transform hover:-translate-y-1",
        highlighted ? "border-blue-700 scale-105" : "border-gray-200"
      )}
    >
      {highlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
            {recommendedLabel}
          </span>
      )}
      <h3 className={cn("text-xl font-bold mb-2", highlighted ? "text-blue-700" : "text-gray-800")}>
        {name}
      </h3>
      <p className="text-3xl font-extrabold text-gray-900 mb-1">{price}</p>
      <p className="text-sm text-gray-500 mb-6">{description}</p>
      <ul className="flex flex-col gap-2 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "w-full py-3 rounded-xl font-semibold text-sm transition-colors",
          highlighted
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        )}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
