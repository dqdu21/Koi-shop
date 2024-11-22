import { z} from "zod"

export const batchSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  description: z.string(),
  price: z.number(),
  productIds: z.array(z.string()),
});
