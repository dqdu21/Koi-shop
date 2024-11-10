import { z } from "zod"

export const credentialSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})
