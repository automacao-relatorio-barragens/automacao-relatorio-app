import { z } from 'zod';

/**
 * Schema describing a regular inspection form. The structure mirrors the
 * sections of the PDF that will be generated from the collected data.
 */
export const inspectionFichaRegularSchema = z.object({
  /** DADOS GERAIS */
  dadosGerais: z.object({
    responsavel: z.string(),
    endereco: z.string(),
    data: z.string(),
  }),

  /** INFORMAÇÕES DA VISTORIA */
  informacoesVistoria: z
    .object({
      presencaInsetosAnimais: z.boolean(),
      observacaoInsetosAnimais: z.string().optional(),
      possuiPiscina: z.boolean(),
      observacaoPiscina: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.presencaInsetosAnimais && !data.observacaoInsetosAnimais) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['observacaoInsetosAnimais'],
          message:
            'observacaoInsetosAnimais is required when presencaInsetosAnimais is true',
        });
      }

      if (data.possuiPiscina && !data.observacaoPiscina) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['observacaoPiscina'],
          message: 'observacaoPiscina is required when possuiPiscina is true',
        });
      }
    }),

  /** ESTADO DE CONSERVAÇÃO */
  estadoConservacao: z
    .object({
      condicaoEstrutural: z.enum(['boa', 'regular', 'ruim']),
      necessitaReparo: z.boolean(),
      observacaoReparo: z.string().optional(),
    })
    .refine(
      (data) => !data.necessitaReparo || !!data.observacaoReparo,
      {
        message: 'observacaoReparo is required when necessitaReparo is true',
        path: ['observacaoReparo'],
      }
    ),

  /** PHOTOS */
  photos: z
    .array(
      z.object({
        uri: z.string(),
        descricao: z.string().optional(),
      })
    )
    .default([]),
});

/** Type inferred from {@link inspectionFichaRegularSchema}. */
export type InspectionFichaRegular = z.infer<
  typeof inspectionFichaRegularSchema
>;

/**
 * DTO used for PDF generation. Each section contains a title and a map of
 * string values. Photos are kept as an array and forwarded directly to the
 * generator layer.
 */
export type InspectionFichaRegularPdfDTO = {
  sections: Array<{ title: string; data: Record<string, string> }>;
  photos: Array<{ uri: string; descricao?: string }>;
};

const boolToYesNo = (v: boolean) => (v ? 'Sim' : 'Não');

/**
 * Transforms parsed schema output into a structure friendly for PDF
 * generation.
 */
export const toInspectionFichaRegularPdfDTO = (
  data: InspectionFichaRegular
): InspectionFichaRegularPdfDTO => ({
  sections: [
    {
      title: 'DADOS GERAIS',
      data: {
        responsavel: data.dadosGerais.responsavel,
        endereco: data.dadosGerais.endereco,
        data: data.dadosGerais.data,
      },
    },
    {
      title: 'INFORMAÇÕES DA VISTORIA',
      data: {
        presencaInsetosAnimais: boolToYesNo(
          data.informacoesVistoria.presencaInsetosAnimais
        ),
        observacaoInsetosAnimais:
          data.informacoesVistoria.observacaoInsetosAnimais ?? '',
        possuiPiscina: boolToYesNo(data.informacoesVistoria.possuiPiscina),
        observacaoPiscina: data.informacoesVistoria.observacaoPiscina ?? '',
      },
    },
    {
      title: 'ESTADO DE CONSERVAÇÃO',
      data: {
        condicaoEstrutural: data.estadoConservacao.condicaoEstrutural,
        necessitaReparo: boolToYesNo(
          data.estadoConservacao.necessitaReparo
        ),
        observacaoReparo: data.estadoConservacao.observacaoReparo ?? '',
      },
    },
  ],
  photos: data.photos,
});

