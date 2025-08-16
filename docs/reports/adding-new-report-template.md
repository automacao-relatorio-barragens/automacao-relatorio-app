# Adding a New Report Template

The project uses a schema-first approach for PDF report generation. Each template defines its data contract and field placement before implementation.

## Steps

1. **Define the schema**
   - Create a JSON Schema file in `reports/schemas/<template>.json` describing all form fields and validation rules.
   - Include field metadata such as labels and default values.

2. **Generate types**
   - Run `pnpm generate:types` to create TypeScript types from the schema for runtime and compile-time safety.

3. **Map fields to the PDF**
   - Create `reports/mappings/<template>.ts` exporting coordinate mappings for each field.
   - Coordinates are defined as `{ x: number, y: number }` relative to the bottom-left of the page.

4. **Add the PDF layout**
   - Place the blank template PDF at `assets/reports/<template>.pdf`.
   - Verify that coordinates align with the layout.

5. **Register the template**
   - Update the report configuration to reference the new schema, mapping, and PDF.

6. **Test and iterate**
   - Run `pnpm test` and `pnpm test:e2e` to ensure unit and end-to-end coverage.
   - Generate a sample output with `pnpm pdf:sample --template <template>`.

Following these steps keeps templates consistent and maintainable.
