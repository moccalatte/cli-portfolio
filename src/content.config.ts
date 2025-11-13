import { defineCollection, z } from 'astro:content';

const cli = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { cli };
