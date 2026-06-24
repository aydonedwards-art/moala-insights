import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    pillar: z.enum(['AI Governance', 'Aid & Budget', 'Climate & Pacific', 'Research Translation']),
    dek: z.string(),
    readTime: z.number(),
    cover: z.string().optional(),
    ongoing: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
