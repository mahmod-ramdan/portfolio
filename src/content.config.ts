import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stage = z.enum(['research', 'positioning', 'content', 'media', 'analysis', 'client']);

const result = z.object({
  value: z.string(),            // e.g. "EGP 1.2M+"
  label: z.string(),            // e.g. "in sales in the last 3 months"
  note: z.string().optional(),  // context: before → after, timeframe
  pending: z.boolean().optional(), // true = waiting for Mahmoud to confirm; hidden in production
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      companyUrl: z.string().url().optional(),
      partner: z.string().optional(),          // extra line under the company, e.g. partnership note
      logo: image().optional(),
      role: z.string(),
      roleNote: z.string().optional(),
      type: z.enum(['Full-time', 'Freelance', 'Part-time', 'Freelance & Part-time']),
      dates: z.string().optional(),
      industry: z.array(z.enum(['EdTech', 'B2B', 'Retail & F&B', 'Consumer Tech', 'Agency'])),
      stages: z.array(stage),
      tier: z.enum(['featured', 'work']),
      order: z.number(),
      variant: z.enum(['standard', 'confidential']).default('standard'),
      headline: z.string(),
      cardLine: z.string(),                    // short line for cards
      cover: image().optional(),               // image for cards & page transition
      coverAlt: z.string().optional(),
      context: z.string().optional(),
      challenge: z.string().optional(),
      insight: z.string().optional(),
      did: z.array(z.string()).default([]),
      story: z.array(z.string()).default([]),  // progression steps (e.g. Xiaomi)
      howIWork: z.array(z.object({ step: z.string(), text: z.string() })).default([]),
      results: z.array(result).default([]),
      quotes: z.array(z.object({ label: z.string(), text: z.string() })).default([]),
      samples: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string(),
            arabic: z.boolean().optional(),
            wide: z.boolean().optional(),
          }),
        )
        .default([]),
      samplesIntro: z.string().optional(),
      clientLogos: z.array(z.string()).default([]),
      note: z.string().optional(),
      learned: z.string().optional(),
      closing: z.string().optional(),
      todos: z.array(z.string()).default([]),  // shown only in dev
    }),
});

const lab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lab' }),
  schema: z.object({
    company: z.string(),
    companyUrl: z.string().url().optional(),
    title: z.string(),
    type: z.string(),
    dates: z.string().optional(),
    stages: z.array(stage),
    summary: z.string(),
    insight: z.string().optional(),
    wentLive: z.string().optional(),
    todos: z.array(z.string()).default([]),
  }),
});

export const collections = { cases, lab };
