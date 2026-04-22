import { ModuleFields, TextField, FieldGroup, NumberField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <FieldGroup label="Resources — HubDB settings" name="groupCeResourcesHubdb" display="inline">
      <TextField
        label="HubDB table ID"
        name="hubdbTableId"
        default="1051752149"
        required={true}
        helpText="Paste the numeric table ID from HubDB → Table details. Commas and spaces are stripped (e.g. 1,051,752,149). Use 0 to disable the HubDB query."
      />
      <NumberField
        label="Max rows"
        name="hubdbLimit"
        default={3}
        required={true}
        min={1}
        max={50}
        helpText="How many matching rows to display. When a filter is set, more rows are read from HubDB (up to 500) until enough matches are found."
      />
      <TextField
        label="Filter column (optional)"
        name="filterColumn"
        default="solution_tags"
        helpText="HubDB column with comma-separated tags, e.g. CA,DS,EDD. Leave both Filter fields blank to show all rows (up to Max rows)."
      />
      <TextField
        label="Filter value (optional)"
        name="filterValue"
        default="CX"
        helpText="Show rows where this value is one of the comma-separated tokens (exact match after trim), e.g. CA matches CA,DS,EDD."
      />
    </FieldGroup>

    <FieldGroup label="Resources — HubDB column names" name="groupCeResourcesColumns" display="inline">
      <TextField
        label="Column name for 'Type' (pill)"
        name="colType"
        default="page_template"
        helpText="Example: page_template or type (values like White Paper, Solution Brief, Demo)"
      />
      <TextField
        label="Column name for image (optional)"
        name="colImage"
        default="feature_image"
        helpText="HubDB Image column (full URL), or Text column with just a filename when “Image file base URL” is set (e.g. example.jpg)."
      />
      <TextField
        label="Image file base URL (optional)"
        name="imageBaseUrl"
        default="https://244460873.fs1.hubspotusercontent-na2.net/hubfs/244460873/resources"
        helpText="When set, the image column is treated as a file name or path fragment under this URL (trailing slash optional). Leave empty to use a HubDB Image column or full URLs in a text column."
      />
      <TextField label="Column name for title" name="colTitle" default="hs_name" />
      <TextField
        label="Column name for description"
        name="colDesc"
        default="long_description"
        helpText="Use a Rich text column if editors format in HubDB; HTML is rendered. Plain Text shows as normal text."
      />
      <TextField
        label="Column name for CTA label"
        name="colCtaLabel"
        default=""
        helpText="HubDB column for the card link text. If the cell is empty, the label falls back to “Read More”."
      />
      <TextField
        label="Column name for CTA link"
        name="colCtaLink"
        default="url"
        helpText="URL column or text column containing a URL."
      />
    </FieldGroup>

    <FieldGroup label="Section heading" name="groupCeResourcesHeading" display="inline">
      <TextField label="Eyebrow" name="ceResourcesEyebrow" default="Resources" />
    </FieldGroup>
  </ModuleFields>
);

