import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ReportForm } from '../schema';

interface Props {
  form: UseFormReturn<ReportForm>;
}

export default function ObservationSection({ form }: Props) {
  const { register, watch, formState: { errors } } = form;
  const hasInsetos = watch('insetosAnimais');

  return (
    <fieldset style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <legend>Observações</legend>
      <label>
        <input type="checkbox" {...register('insetosAnimais')} aria-label="Observou insetos ou animais" />
        Insetos/Animais?
      </label>
      {hasInsetos && (
        <div>
          <label>
            Observação
            <textarea {...register('observacaoInsetosAnimais')} aria-required="true" />
          </label>
          {errors.observacaoInsetosAnimais && (
            <span role="alert">{errors.observacaoInsetosAnimais.message}</span>
          )}
        </div>
      )}
    </fieldset>
  );
}
