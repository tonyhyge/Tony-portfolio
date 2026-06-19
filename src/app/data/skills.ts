export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Machine Learning & Deep Learning",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Transformers",
      "LoRA/QLoRA",
      "RAG",
      "Computer Vision",
      "NLP",
    ],
  },
  {
    category: "Programming Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Rust"],
  },
  {
    category: "Tools & Frameworks",
    skills: [
      "Next.js",
      "React",
      "Node.js",
      "Docker",
      "Git",
      "Linux",
      "Weights & Biases",
    ],
  },
  {
    category: "Research Methods",
    skills: [
      "Experimental Design",
      "Statistical Analysis",
      "Paper Writing",
      "Literature Review",
      "Benchmarking",
    ],
  },
];
