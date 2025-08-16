import { describe, expect, it } from 'vitest';

import {
  inspectionFichaRegularSchema,
  toInspectionFichaRegularPdfDTO,
  InspectionFichaRegular,
} from '../../schemas/InspectionFichaRegular.schema';

const baseData: InspectionFichaRegular = {
  dadosGerais: {
    responsavel: 'João',
    endereco: 'Rua A, 123',
    data: '2024-01-01',
  },
  informacoesVistoria: {
    presencaInsetosAnimais: false,
    possuiPiscina: false,
  },
  estadoConservacao: {
    condicaoEstrutural: 'boa',
    necessitaReparo: false,
  },
  photos: [
    {
      uri: 'http://example.com/photo.jpg',
      descricao: 'Frente do imóvel',
    },
  ],
};

describe('inspectionFichaRegularSchema', () => {
  it('validates a correct payload', () => {
    const parsed = inspectionFichaRegularSchema.parse(baseData);
    expect(parsed.dadosGerais.responsavel).toBe('João');
  });

  it('requires observacaoInsetosAnimais when presencaInsetosAnimais is true', () => {
    const data = {
      ...baseData,
      informacoesVistoria: {
        ...baseData.informacoesVistoria,
        presencaInsetosAnimais: true,
      },
    } as any;

    expect(() => inspectionFichaRegularSchema.parse(data)).toThrow();
  });

  it('allows missing observacaoInsetosAnimais when presencaInsetosAnimais is false', () => {
    const data = {
      ...baseData,
      informacoesVistoria: {
        presencaInsetosAnimais: false,
        possuiPiscina: false,
      },
    };

    const parsed = inspectionFichaRegularSchema.parse(data);
    expect(parsed.informacoesVistoria.observacaoInsetosAnimais).toBeUndefined();
  });
});

describe('toInspectionFichaRegularPdfDTO', () => {
  it('transforms parsed data into PDF DTO', () => {
    const parsed = inspectionFichaRegularSchema.parse(baseData);
    const dto = toInspectionFichaRegularPdfDTO(parsed);

    expect(dto.sections[0].title).toBe('DADOS GERAIS');
    expect(dto.photos.length).toBe(1);
  });
});

