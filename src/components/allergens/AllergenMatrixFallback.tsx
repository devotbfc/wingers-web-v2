import { MatrixTable } from "./MatrixTable";

/**
 * Server-rendered fallback used while the client AllergenMatrix hydrates
 * (its useSearchParams call makes it dynamic, so Suspense wraps it to
 * keep /allergies statically prerenderable). Renders the same tables
 * MatrixTable produces, with no avoid/hide filters applied — matches
 * the default empty state so there's no visual flash on hydration.
 */
export function AllergenMatrixFallback() {
  return (
    <>
      <p className="font-body text-sm leading-relaxed text-brand-black/60">
        Pick what you avoid and those columns move to the front.
      </p>
      <MatrixTable avoid={[]} hide={false} />
    </>
  );
}
