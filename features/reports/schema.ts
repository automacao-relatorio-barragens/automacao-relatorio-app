import { z } from 'zod';

export const reportSchema = z.object({
  hasBordaLivre: z.boolean().default(false),
  bordaLivreOperacionalMedidaM: z
    .number({ invalid_type_error: 'Obrigatório' })
    .optional()
    .refine((val, ctx) => {
      if (ctx.parent.hasBordaLivre) {
        return typeof val === 'number';
      }
      return true;
    }, { message: 'Obrigatório' }),
  insetosAnimais: z.boolean().default(false),
  observacaoInsetosAnimais: z
    .string()
    .optional()
    .refine((val, ctx) => {
      if (ctx.parent.insetosAnimais) {
        return !!val;
      }
      return true;
    }, { message: 'Obrigatório' }),
});

export type ReportForm = z.infer<typeof reportSchema>;
