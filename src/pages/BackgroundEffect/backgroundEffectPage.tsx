import { useEffect, useState, Suspense, lazy } from "react";

const Three = lazy(() => import("../../components/Three/three"));

export default function BackgroundEffectPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // يشتغل بعد أول Paint
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => setMounted(true));
    } else {
      setTimeout(() => setMounted(true), 1500);
    }
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <Three />
    </Suspense>
  );
}
