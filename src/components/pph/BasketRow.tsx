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

export function BasketRow({ line, onQty, onRemove }: Props) {
  const summary = [...line.modifierLabels, ...line.sauceLabels].join(" · ");
  return (
    <li className="flex items-start gap-3 border-b border-neutral-100 py-3">
      <FoodThumb src={line.imageUrl} alt={line.name} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="font-display text-base font-extrabold uppercase leading-tight tracking-tight">
            {line.name}
          </div>
          <div className="shrink-0 font-display font-bold">
            {pence(line.unitPricePence * line.quantity)}
          </div>
        </div>
        <div className="line-clamp-2 text-xs text-neutral-500">
          {summary || "No customisations"}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="w-32">
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-brand-black"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </li>
  );
}
