import { z } from "zod"

// ── Zod Schema ──────────────────────────────────────────────────────────

export const ProjectStatusEnum = z.enum([
  "in-progress",
  "submitted",
  "published",
  "accepted",
])

export const ResearchProjectSchema = z.object({
  title: z.string().min(1),
  status: ProjectStatusEnum,
  tags: z.array(z.string()),
  abstract: z.string().min(1),
  links: z.object({
    arxiv: z.string().url().optional(),
    doi: z.string().optional(),
    pdf: z.string().url().optional(),
  }),
  startDate: z.string(),
  endDate: z.string().optional(),
  venue: z.string().optional(),
  collaborators: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  thumbnail: z.string().optional(),
})

export type ResearchProject = z.infer<typeof ResearchProjectSchema>

// ── Sample Data ─────────────────────────────────────────────────────────

const projectData = [
  {
    title: "Efficient Language Model Fine-tuning for Low-Resource Languages",
    status: "published" as const,
    tags: ["NLP", "LLM", "Fine-tuning", "Low-resource", "Vietnamese NLP"],
    abstract:
      "We investigate parameter-efficient fine-tuning methods for large language models applied to low-resource languages, with a focus on Vietnamese. Through extensive experiments on multiple benchmarks, we demonstrate that LoRA and adapter-based methods achieve competitive performance to full fine-tuning while reducing trainable parameters by over 95%. Our analysis further reveals that the relative effectiveness of each method varies by task type and language family, providing practical guidance for practitioners working on underrepresented languages.",
    links: {
      arxiv: "https://arxiv.org/abs/2501.12345",
      doi: "10.18653/v1/2025.acl-long.123",
    },
    startDate: "2024-01",
    endDate: "2025-03",
    venue: "ACL 2025",
    collaborators: ["Jane Doe", "John Smith"],
    featured: true,
    thumbnail: "/images/research/efficient-lm-finetuning.png",
  },
  {
    title: "Retrieval-Augmented Generation for Domain-Specific QA",
    status: "accepted" as const,
    tags: ["RAG", "Vector Search", "LLM", "Information Retrieval", "QA"],
    abstract:
      "We propose a retrieval-augmented generation framework designed for domain-specific question answering in technical documentation. Our approach combines dense passage retrieval with a novel re-ranking strategy that incorporates domain relevance signals. On a curated benchmark of API documentation queries, the system achieves a 22% improvement in answer accuracy over standard RAG baselines while reducing retrieval latency through an adaptive chunking mechanism. We release our evaluation dataset to facilitate further research.",
    links: {
      arxiv: "https://arxiv.org/abs/2502.67890",
      pdf: "https://example.com/papers/rag-domain-qa.pdf",
    },
    startDate: "2024-06",
    endDate: "2025-02",
    venue: "EMNLP 2025",
    collaborators: ["Alice Wang"],
    featured: false,
    thumbnail: "/images/research/rag-domain-qa.png",
  },
  {
    title: "Parameter-Efficient Transfer Learning for Vietnamese NER",
    status: "published" as const,
    tags: ["NER", "Vietnamese NLP", "Transfer Learning", "Transformers"],
    abstract:
      "Named entity recognition for Vietnamese presents unique challenges due to the language's rich morphology and limited annotated corpora. We systematically evaluate parameter-efficient transfer learning approaches for Vietnamese NER, including adapter modules, prompt tuning, and sparse fine-tuning. Our best model achieves state-of-the-art results on the VLSP 2021 NER benchmark while updating fewer than 5% of model parameters. We provide ablation studies examining the impact of pre-training data composition and layer-wise transfer dynamics.",
    links: {
      arxiv: "https://arxiv.org/abs/2503.45678",
      doi: "10.18653/v1/2025.naacl-long.45",
    },
    startDate: "2024-03",
    endDate: "2024-11",
    venue: "NAACL 2025",
    collaborators: ["Bob Chen", "Carol Tran"],
    featured: false,
    thumbnail: "/images/research/vietnamese-ner.png",
  },
  {
    title: "Neural Architecture Search for Lightweight Acoustic Models",
    status: "submitted" as const,
    tags: ["NAS", "Acoustic Model", "Speech Recognition", "Model Compression"],
    abstract:
      "We apply neural architecture search to design lightweight acoustic models suitable for on-device speech recognition. Using a differentiable architecture search space with latency-aware regularization, we discover efficient architectures that match the accuracy of larger manually designed models at a fraction of the computational cost. Our discovered model achieves a 4.2× parameter reduction and 3.5× inference speedup on mobile hardware with less than a 1% word error rate increase on LibriSpeech test-clean.",
    links: {
      pdf: "https://example.com/papers/nas-acoustic.pdf",
    },
    startDate: "2024-08",
    endDate: "2025-01",
    collaborators: ["David Kim"],
    featured: false,
    thumbnail: "/images/research/nas-acoustic.png",
  },
  {
    title: "Cross-lingual Representation Learning with Contrastive Objectives",
    status: "in-progress" as const,
    tags: ["Cross-lingual", "Representation Learning", "Contrastive Learning"],
    abstract:
      "Exploring contrastive learning objectives for cross-lingual representation alignment without parallel data.",
    links: {},
    startDate: "2025-02",
    venue: undefined,
    featured: false,
    thumbnail: "/images/research/cross-lingual-contrastive.png",
  },
]

export const researchProjects: ResearchProject[] = projectData.map((p) =>
  ResearchProjectSchema.parse(p),
)

export function getAvailableStatuses(): string[] {
  const statuses = new Set(researchProjects.map((p) => p.status))
  return Array.from(statuses)
}
