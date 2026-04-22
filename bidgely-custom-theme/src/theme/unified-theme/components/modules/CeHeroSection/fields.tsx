import { ModuleFields, TextField, LinkField, FieldGroup } from '@hubspot/cms-components/fields';

const defaultCtaLink = {
  url: { href: '#contact', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

export const fields = (
  <ModuleFields>
    <FieldGroup label="Customer engagement — hero" name="groupCeHero" display="inline">
      <TextField
        label="Eyebrow (kicker)"
        name="ceEyebrow"
        default="Customer Engagement"
      />
      <TextField
        label="Heading — line before accent word"
        name="ceHeadingBeforeAccent"
        default="Most CX platforms know what your customers did. Bidgely knows "
      />
      <TextField label="Heading — accent word (teal)" name="ceHeadingAccent" default="why" />
      <TextField
        label="Right column tagline"
        name="ceTagline"
        default="Fewer Calls. Better Enrollment. Customers Who Actually Engage."
      />
    </FieldGroup>
    <FieldGroup label="Primary CTA" name="groupCeHeroCta" display="inline">
      <TextField label="Button label" name="ceCtaText" default="Talk to an Expert" />
      <LinkField
        label="Button link"
        name="ceCtaLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'CALL_TO_ACTION']}
        showAdvancedRelOptions={false}
        default={defaultCtaLink}
      />
    </FieldGroup>
  </ModuleFields>
);
