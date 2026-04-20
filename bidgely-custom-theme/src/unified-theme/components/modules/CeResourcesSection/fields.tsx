import { ModuleFields, TextField, FieldGroup, NumberField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <FieldGroup label="Resources — HubDB settings" name="groupCeResourcesHubdb" display="inline">
      <NumberField
        label="HubDB table ID"
        name="hubdbTableId"
        default={0}
        required={true}
        helpText="Find this in HubDB → your table → Table details → ID. Required."
      />
      <NumberField
        label="Max rows"
        name="hubdbLimit"
        default={3}
        required={true}
        min={1}
        max={50}
        helpText="How many rows to display from the HubDB table."
      />
    </FieldGroup>

    <FieldGroup label="Resources — HubDB column names" name="groupCeResourcesColumns" display="inline">
      <TextField
        label="Column name for 'Type' (pill)"
        name="colType"
        default="type"
        helpText="Example: type (values like White Paper, Solution Brief, Demo)"
      />
      <TextField
        label="Column name for image (optional)"
        name="colImage"
        default="image"
        helpText="Optional. HubDB Image column used for the card's top media."
      />
      <TextField label="Column name for title" name="colTitle" default="title" />
      <TextField
        label="Column name for description"
        name="colDesc"
        default="description"
        helpText="Use a Rich text column if editors format in HubDB; HTML is rendered. Plain Text shows as normal text."
      />
      <TextField
        label="Column name for CTA label"
        name="colCtaLabel"
        default="cta_label"
        helpText="Example: Download White Paper →"
      />
      <TextField
        label="Column name for CTA link"
        name="colCtaLink"
        default="cta_link"
        helpText="URL column or text column containing a URL."
      />
      <TextField
        label="Column name for card variant (optional)"
        name="colVariant"
        default="variant"
        helpText="Optional. Values map to modifier classes like whitepaper, brief, demo."
      />
    </FieldGroup>

    <FieldGroup label="Section heading" name="groupCeResourcesHeading" display="inline">
      <TextField label="Eyebrow" name="ceResourcesEyebrow" default="Resources" />
    </FieldGroup>
  </ModuleFields>
);

