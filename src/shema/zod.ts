import { z } from "zod"

export const createCheckOutSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('nameRequired')),
    phone: z.string().min(1, t('phoneRequired')),
    street: z.string().optional(),
    house: z.string().optional(),
    cityId: z.string().optional(),
    cityName: z.string().optional(),
    deliveryType: z.enum(['pickup', 'delivery']),
    deliveryTime: z.enum(['in_time', 'nearest_time']),
    date: z.any().optional(),
    time: z.string().optional(),
    birthdayDiscount: z.boolean(),
    comment: z.string().optional(),
    valuePerson: z.number().min(1),
    agreePolicy: z.boolean().refine(val => val === true, {
      message: t('agreePolicyRequired'),
    }),
  }).superRefine((data, ctx) => {
    if (data.deliveryType === 'delivery') {
      if (!data.cityId) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cityId'], message: t('cityRequired') })
      }
      if (!data.street) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['street'], message: t('streetRequired') })
      }
      if (!data.house) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['house'], message: t('houseRequired') })
      }
    }
  })

export type CheckOutFormData = z.infer<ReturnType<typeof createCheckOutSchema>>
