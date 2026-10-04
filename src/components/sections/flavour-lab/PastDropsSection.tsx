import { PAST_DROPS } from "@/lib/flavours";
import { LockedFlavoursSection } from "./LockedFlavoursSection";

export function PastDropsSection() {
  return (
    <LockedFlavoursSection
      id="past-drops"
      title="PAST DROPS"
      intro="Drops that came, cooked, and closed. Was here, gone now."
      badge="Past Drop"
      flavours={PAST_DROPS}
      variant="past"
    />
  );
}
