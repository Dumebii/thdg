'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk'; // or 'sanity/structure' in newer v3
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'High Performance Blog',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  // CRUCIAL: Matches your App Router folder structure
  basePath: '/studio', 

  plugins: [deskTool(), visionTool()],

  schema: schema,
});