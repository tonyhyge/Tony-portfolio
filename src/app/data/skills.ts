export interface Skill {
  name: string
  categories: string[]
  relatedProjects?: { slug: string; title: string }[]
}

export interface CategoryDisplay {
  name: string
  color: string
  skills: Skill[]
}

export const CATEGORY_COLORS: Record<string, string> = {
  "Machine Learning & Deep Learning": "cyan",
  "Programming Languages": "violet",
  "Tools & Frameworks": "amber",
}

export const CATEGORY_ORDER: string[] = [
  "Machine Learning & Deep Learning",
  "Programming Languages",
  "Tools & Frameworks",
]

export const skills: Skill[] = [
  // Machine Learning & Deep Learning
  {
    name: "PyTorch",
    categories: ["Machine Learning & Deep Learning"],
    relatedProjects: [
      {
        slug: "efficient-language-model-fine-tuning-for-low-resource-languages",
        title: "Efficient Language Model Fine-tuning for Low-Resource Languages",
      },
    ],
  },
  {
    name: "TensorFlow",
    categories: ["Machine Learning & Deep Learning"],
  },
  {
    name: "Transformers",
    categories: ["Machine Learning & Deep Learning"],
    relatedProjects: [
      {
        slug: "efficient-language-model-fine-tuning-for-low-resource-languages",
        title: "Efficient Language Model Fine-tuning for Low-Resource Languages",
      },
      {
        slug: "parameter-efficient-transfer-learning-for-vietnamese-ner",
        title: "Parameter-Efficient Transfer Learning for Vietnamese NER",
      },
    ],
  },
  {
    name: "LoRA/QLoRA",
    categories: ["Machine Learning & Deep Learning"],
    relatedProjects: [
      {
        slug: "efficient-language-model-fine-tuning-for-low-resource-languages",
        title: "Efficient Language Model Fine-tuning for Low-Resource Languages",
      },
    ],
  },
  {
    name: "RAG",
    categories: ["Machine Learning & Deep Learning"],
    relatedProjects: [
      {
        slug: "retrieval-augmented-generation-for-domain-specific-qa",
        title: "Retrieval-Augmented Generation for Domain-Specific QA",
      },
    ],
  },
  {
    name: "Computer Vision",
    categories: ["Machine Learning & Deep Learning"],
  },
  {
    name: "NLP",
    categories: ["Machine Learning & Deep Learning"],
    relatedProjects: [
      {
        slug: "efficient-language-model-fine-tuning-for-low-resource-languages",
        title: "Efficient Language Model Fine-tuning for Low-Resource Languages",
      },
      {
        slug: "parameter-efficient-transfer-learning-for-vietnamese-ner",
        title: "Parameter-Efficient Transfer Learning for Vietnamese NER",
      },
      {
        slug: "cross-lingual-representation-learning-with-contrastive-objectives",
        title: "Cross-lingual Representation Learning with Contrastive Objectives",
      },
    ],
  },

  // Cross-category: ML/DL + Programming Languages
  {
    name: "Python",
    categories: ["Machine Learning & Deep Learning", "Programming Languages"],
  },

  // Programming Languages
  {
    name: "TypeScript",
    categories: ["Programming Languages"],
  },
  {
    name: "JavaScript",
    categories: ["Programming Languages"],
    relatedProjects: [
      {
        slug: "retrieval-augmented-generation-for-domain-specific-qa",
        title: "Retrieval-Augmented Generation for Domain-Specific QA",
      },
    ],
  },
  {
    name: "SQL",
    categories: ["Programming Languages"],
  },
  {
    name: "Rust",
    categories: ["Programming Languages"],
  },

  // Tools & Frameworks
  {
    name: "Next.js",
    categories: ["Tools & Frameworks"],
  },
  {
    name: "React",
    categories: ["Tools & Frameworks"],
  },
  {
    name: "Node.js",
    categories: ["Tools & Frameworks"],
  },
  {
    name: "Docker",
    categories: ["Tools & Frameworks"],
  },
  {
    name: "Git",
    categories: ["Tools & Frameworks"],
  },
  {
    name: "Linux",
    categories: ["Tools & Frameworks"],
  },
  {
    name: "Weights & Biases",
    categories: ["Tools & Frameworks"],
  },
]

export const categoryDisplay: CategoryDisplay[] = CATEGORY_ORDER.map(
  (name) => ({
    name,
    color: CATEGORY_COLORS[name],
    skills: skills.filter((s) => s.categories.includes(name)),
  })
)
