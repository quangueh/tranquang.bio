import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quang Tran — Portfolio",
    short_name: "Quang Tran",
    description: "ERP Developer, AI Engineer, SQL Expert and Automation Builder.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
