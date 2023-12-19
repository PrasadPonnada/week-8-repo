import { z } from 'zod'

export const signupInput = z.object({
    username: z.string().min(5).max(30).email(),
    password: z.string().min(6).max(12)
})

export type signupParams = z.infer<typeof signupInput>
