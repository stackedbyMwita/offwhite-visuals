import * as z from "zod"

export const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  service: z.string().min(1, 'Select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message too short'),
})
