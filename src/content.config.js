import { defineCollection } from 'astro:content'; // 💡 REQUIRED: Pulls definition utilities directly from content wrappers
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import path from 'path';

export const collections = {
  'products': defineCollection({
    loader: glob({ 
      pattern: '**/*.md', 
      base: path.join(process.cwd(), 'src/content/products') 
    }),
    schema: z.object({
      title: z.string(),
      category: z.string().default('General'),
      image: z.string().default('https://unsplash.com'),
      price: z.number().default(0),
      moq: z.number().default(1),
      // 💡 NEW: Accept color choices array in frontend mapping
      colors: z.array(z.string()).default([]),
    }).passthrough(),
  }),
};
