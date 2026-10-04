"use client";

import { X } from "lucide-react";
import type { CartLine } from "@/lib/cart/types";
import { pence } from "@/lib/pph/money";
import { FoodThumb } from "./FoodThumb";
import { QuantityStepper } from "./QuantityStepper";

type Props = {
  line: CartLine;
  onQty: (lineId: string, next: number) => void;
  onRemove: (lineId: string) => void;
};

// Port of wing-app/src/components/BasketRow.tsx — divider on top via
// border-t border-elevated, name + customisations + line price + remove X,
// QuantityStepper underneath.
export function BasketRow({ line, onQty, onRemove }: Props) {
  const summary = [...line.modifierLabels, ...line.sauceLabels].join(" · ");
  return (
    <li className="flex items-start gap-3 border-t border-pph-elevated py-4">
      <FoodThumb src={line.imageUrl} alt={line.name} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="font-display text-[17px] uppercase leading-tight tracking-tight text-pph">
            {line.name}
          </div>
          <div className="shrink-0 font-display text-[17px] text-pph">
            {pence(line.unitPricePence * line.quantity)}
          </div>
        </div>
        <div className="mt-1 line-clamp-2 font-body text-[13px] leading-tight text-pph-muted">
          {summary || "No customisations"}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="w-36">
            <QuantityStepper
              value={line.quantity}
              onChange={(n) => onQty(line.lineId, n)}
              min={1}
              size="sm"
            />
          </div>
          <button
            type="button"
            onClick={() => onRemove(line.lineId)}
            aria-label={`Remove ${line.name} from basket`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-pph-muted hover:opacity-70"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </li>
  );
}
