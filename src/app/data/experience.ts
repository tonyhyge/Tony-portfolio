export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights: string[];
  techTags: string[];
  companyUrl?: string;
}

export const experiences: Experience[] = [
  {
    role: "AI Engineer",
    company: "AILOGY",
    location: "Hanoi, Vietnam",
    startDate: "2024-07",
    endDate: "Present",
    description:
      "Building ML-powered products and AI solutions for production environments. Design, train, and deploy machine learning models serving thousands of users.",
    highlights: [
      "Developed production RAG pipeline serving 10k+ queries per day",
      "Fine-tuned LLMs for domain-specific tasks using LoRA and QLoRA",
      "Designed and deployed ML inference APIs with <100ms latency",
    ],
    techTags: [
      "Python",
      "PyTorch",
      "LangChain",
      "RAG",
      "LoRA",
      "FastAPI",
      "Docker",
    ],
    companyUrl: "https://ailogy.com",
  },
  {
    role: "Research Intern",
    company: "University Lab",
    location: "University Lab",
    startDate: "2023-06",
    endDate: "2024-05",
    description:
      "Conducted research in natural language processing and representation learning, with a focus on efficient transformer architectures and low-resource language understanding.",
    highlights: [
      "Published paper on efficient transformer architectures at peer-reviewed venue",
      "Built evaluation benchmarks for Vietnamese language understanding",
      "Implemented baseline models and ran comparative experiments",
    ],
    techTags: [
      "Python",
      "PyTorch",
      "Transformers",
      "NLP",
      "Vietnamese NLP",
      "BERT",
    ],
  },
];
