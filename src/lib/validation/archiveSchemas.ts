import { z } from 'zod';
import { AcademicTenureSchema, ExecutiveOfficerSchema } from './governanceSchemas';
import { CommitteeProjectSchema, BatchGallerySchema, CommitteeSlugSchema } from './committeeSchemas';

export const ArchiveYearRecordSchema = z.object({
  tenure: AcademicTenureSchema,
  executiveBoard: z.array(ExecutiveOfficerSchema),
  majorInterventions: z.array(CommitteeProjectSchema),
  batchPhotoAlbum: BatchGallerySchema,
  annualReport: z
    .object({
      title: z.string().min(1),
      pdfUrl: z.string().min(1),
      fileSize: z.string().min(1),
      publishedDate: z.string().min(1),
    })
    .optional(),
});

export const ArchiveSearchQuerySchema = z.object({
  term: z.string().optional(),
  batchId: z.string().optional(),
  committeeSlug: z.union([CommitteeSlugSchema, z.literal('all')]).optional(),
});
