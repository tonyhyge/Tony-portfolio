export type ProjectStatus = "active" | "submitted" | "published" | "in-progress";

export interface ResearchProject {
  title: string;
  status: ProjectStatus;
  description: string;
  tags: string[];
  link?: string;
}

export const researchProjects: ResearchProject[] = [
  {
    title: "Efficient Language Model Fine-tuning for Low-Resource Languages",
    status: "active",
    description:
      "Investigating parameter-efficient fine-tuning methods for multilingual LLMs with focus on Vietnamese language tasks.",
    tags: ["NLP", "LLM", "Fine-tuning", "Low-resource"],
  },
  {
    title: "Retrieval-Augmented Generation for Domain-Specific QA",
    status: "in-progress",
    description:
      "Building a RAG pipeline that combines vector search with LLM generation for accurate question answering on technical documentation.",
    tags: ["RAG", "Vector Search", "LLM", "Information Retrieval"],
  },
];
