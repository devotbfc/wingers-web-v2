import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wingers — Buttermilk Halal Fried Chicken",
    short_name: "Wingers",
    description:
      "Buttermilk halal fried chicken in Milton Keynes & Northampton.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FF6FB5",
    icons: [
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
