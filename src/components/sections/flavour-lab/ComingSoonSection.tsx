import { COMING_SOON_LE } from "@/lib/flavours";
import { LockedFlavoursSection } from "./LockedFlavoursSection";

// "Next drops" per the FlavourLab board. The data comes from COMING_SOON_LE
// (status === "coming-soon") — not hardcoded, so adding or removing a soon-to-
// drop flavour in flavour-lab-data.ts flows straight to this section.
export function ComingSoonSection() {
  return (
    <LockedFlavoursSection
      id="next-drops"
      title="NEXT DROPS"
      intro="Next up on the drop rotation. Names dropped, cooks dialling them in."
      badge="Coming Soon"
      flavours={COMING_SOON_LE}
      variant="coming-soon"
    />
  );
}
