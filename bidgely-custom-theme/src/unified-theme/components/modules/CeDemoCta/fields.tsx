import { ModuleFields, TextField, LinkField, FieldGroup } from '@hubspot/cms-components/fields';

const defaultCtaLink = {
  url: { href: '#sales', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

export const fields = (
  <ModuleFields>
    <FieldGroup label="Customer engagement — demo CTA" name="groupCeDemoCta" display="inline">
      <TextField
        label="Heading"
        name="ceDemoTitle"
        default="See UtilityAI CX Engagement in Action"
      />
      <TextField label="Button label" name="ceDemoCtaText" default="Talk to Sales" />
      <LinkField
        label="Button link"
        name="ceDemoCtaLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'CALL_TO_ACTION']}
        showAdvancedRelOptions={false}
        default={defaultCtaLink}
      />
    </FieldGroup>
  </ModuleFields>
);
