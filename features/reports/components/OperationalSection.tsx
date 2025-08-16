import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ReportForm } from '../schema';

interface Props {
  form: UseFormReturn<ReportForm>;
}

export default function OperationalSection({ form }: Props) {
  const { register, watch, formState: { errors } } = form;
  const hasBorda = watch('hasBordaLivre');

  return (
    <fieldset style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <legend>Operacional</legend>
      <label>
        <input type="checkbox" {...register('hasBordaLivre')} aria-label="Has free board" />
        Possui borda livre?
      </label>
      {hasBorda && (
        <div>
          <label>
            Medida (m)
            <input
              type="number"
              {...register('bordaLivreOperacionalMedidaM', { valueAsNumber: true })}
              aria-required="true"
            />
          </label>
          {errors.bordaLivreOperacionalMedidaM && (
            <span role="alert">{errors.bordaLivreOperacionalMedidaM.message}</span>
          )}
        </div>
      )}
    </fieldset>
  );
}
