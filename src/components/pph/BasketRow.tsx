"use client";

import type { CartLine } from "@/lib/cart/types";
import { pence } from "@/lib/pph/money";
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
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="font-display text-base font-bold">{line.name}</div>
          <div className="shrink-0 font-bold">{pence(line.unitPricePence * line.quantity)}</div>
        </div>
        <div className="text-xs text-neutral-600">{summary || "No customisations"}</div>
        <div className="mt-2 flex items-center justify-between">
          <QuantityStepper
            value={line.quantity}
            onChange={(n) => onQty(line.lineId, n)}
            min={1}
            size="sm"
          />
          <button
            type="button"
            onClick={() => onRemove(line.lineId)}
            className="text-xs text-neutral-500 underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
