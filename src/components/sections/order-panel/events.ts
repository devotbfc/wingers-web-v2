// Window-event bridge for callers that live outside the per-page
// OrderPanelProvider tree (currently: the global SignupSlideIn in the root
// layout). Lifted into its own module so the slide-in doesn't have to import
// the OrderPanel component — importing OrderPanel would pull Radix Sheet,
// LOCATIONS, fbclid helpers, and the consent hook into the layout boundary
// unnecessarily.
export const OPEN_ORDER_EVENT = "wingers:open-order";
