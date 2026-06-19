export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "AI Engineer",
    company: "Current Company",
    location: "Remote",
    startDate: "2024-06",
    endDate: "Present",
    description:
      "Building ML-powered products and AI solutions for production environments.",
    highlights: [
      "Developed production RAG pipeline serving 10k+ queries per day",
      "Fine-tuned LLMs for domain-specific tasks using LoRA and QLoRA",
      "Designed and deployed ML inference APIs with <100ms latency",
    ],
  },
  {
    role: "Research Intern",
    company: "AI Research Lab",
    location: "University Lab",
    startDate: "2023-06",
    endDate: "2024-05",
    description:
      "Conducted research in natural language processing and representation learning.",
    highlights: [
      "Published paper on efficient transformer architectures at peer-reviewed venue",
      "Built evaluation benchmarks for Vietnamese language understanding",
      "Implemented baseline models and ran comparative experiments",
    ],
  },
];
