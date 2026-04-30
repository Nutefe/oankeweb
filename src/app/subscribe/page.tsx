"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PaymentTabs from "@/components/payment/PaymentTabs";
import { useSubscription } from "@/lib/SubscriptionContext";
import { useLang } from "@/lib/LangContext";
import { ROUTES } from "@/constants/routes";

function SubscribeContent() {
  const { t } = useLang();
  const s = t.subscribe;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { draft, setOffer, resetDraft } = useSubscription();
  const [success, setSuccess] = useState(false);

  // Hydrate offer from URL query params on first render
  useEffect(() => {
    const name = searchParams.get("name");
    const price = searchParams.get("price");
    const planKey = searchParams.get("planKey");
    if (name && price && planKey && !draft.offer) {
      setOffer({ name, price, planKey });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSuccess() {
    setSuccess(true);
    resetDraft();
  }

  if (success) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <span className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{s.success_title}</h2>
          <p className="text-gray-500 mb-8">{s.success_desc}</p>
          <button
            onClick={() => router.push(ROUTES.LOGIN)}
            className="w-full bg-[#1E3080] hover:bg-[#162260] text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            {s.go_dashboard}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{s.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{s.subtitle}</p>

        {/* Selected offer summary */}
        {draft.offer && (
          <div className="bg-[#E8ECFF] border border-[#c5cdf7] rounded-xl px-5 py-4 mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#1E3080] font-semibold uppercase tracking-wider mb-1">
                {s.offer_label}
              </p>
              <p className="text-gray-900 font-bold">{draft.offer.name}</p>
            </div>
            <p className="text-[#1E3080] font-extrabold text-lg">{draft.offer.price}</p>
          </div>
        )}

        {/* Payment tabs (steps 2–4) */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <PaymentTabs onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#1E3080] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <SubscribeContent />
      </Suspense>
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Oanke. Tous droits réservés.
      </footer>
    </div>
  );
}
