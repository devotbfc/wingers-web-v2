import { COMING_SOON_LE } from "@/lib/flavours";
import { LockedFlavoursSection } from "./LockedFlavoursSection";

export function ComingSoonSection() {
  return (
    <LockedFlavoursSection
      id="coming-soon"
      title="COMING SOON"
      intro="Next up on the drop rotation. Names dropped, cooks dialling them in."
      badge="Coming Soon"
      flavours={COMING_SOON_LE}
      variant="coming-soon"
    />
  );
}
