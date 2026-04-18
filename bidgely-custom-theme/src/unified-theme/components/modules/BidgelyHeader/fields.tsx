import {
  ModuleFields,
  MenuField,
  FieldGroup,
  TextField,
  LinkField,
  BooleanField,
  LogoField,
} from '@hubspot/cms-components/fields';

const emptyLink = {
  url: { href: '', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

export const fields = (
  <ModuleFields>
    <FieldGroup label="Navigation" name="groupNavigation" display="inline">
      <MenuField label="Menu" name="menu" default="default" />
      <TextField
        label="Nav aria label"
        name="navAriaLabel"
        default="Primary"
        helpText="Accessible name for the main navigation landmark."
      />
    </FieldGroup>
    <FieldGroup label="Logo" name="groupLogo" display="inline">
      <LogoField
        label="Logo image"
        name="logo"
        showLoading={false}
        helpText="Optional. When you upload a custom logo here, it replaces the text logo below. Leave unchanged to keep the text mark + wordmark."
      />
      <TextField label="Logo mark (gradient letter)" name="logoMark" default="b" />
      <TextField label="Logo text" name="logoSuffix" default="idgely" />
      <LinkField
        label="Logo link"
        name="brandLink"
        supportedTypes={['EXTERNAL', 'CONTENT']}
        showAdvancedRelOptions={false}
        default={{ url: { href: '/', type: 'EXTERNAL', content_id: null }, open_in_new_tab: false }}
      />
    </FieldGroup>
    <FieldGroup label="Calls to action" name="groupCtas" display="inline">
      <BooleanField label="Show secondary button" name="showSecondaryCta" display="toggle" default={true} />
      <TextField label="Secondary button text" name="secondaryCtaText" default="Log In" />
      <LinkField
        label="Secondary button link"
        name="secondaryCtaLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS']}
        showAdvancedRelOptions={false}
        default={emptyLink}
      />
      <TextField label="Primary button text" name="primaryCtaText" default="Talk to Sales" />
      <LinkField
        label="Primary button link"
        name="primaryCtaLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'CALL_TO_ACTION']}
        showAdvancedRelOptions={false}
        default={emptyLink}
      />
    </FieldGroup>
  </ModuleFields>
);
