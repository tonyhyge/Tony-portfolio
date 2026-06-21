import type { MetadataRoute } from "next";
import { researchProjects } from "@/app/data/research";

export const dynamic = "force-static";

const BASE_URL = "https://tonyhyge.github.io/Tony-portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const projectEntries: MetadataRoute.Sitemap = researchProjects.map(() => ({
      url: `${BASE_URL}/#research`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [...staticEntries, ...projectEntries];
}
