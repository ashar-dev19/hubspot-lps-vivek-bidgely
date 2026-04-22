import {
  ModuleFields,
  TextField,
  FieldGroup,
  RepeatedFieldGroup,
  ImageField,
  LinkField,
} from '@hubspot/cms-components/fields';

const defaultLink = {
  url: { href: '#', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

function linkRow(label: string) {
  return {
    linkLabel: label,
    linkUrl: defaultLink,
  };
}

const defaultFooterColumns = [
  {
    columnHeading: 'Solutions',
    columnListAriaLabel: '',
    groupColumnLinks: [
      linkRow('Energy Efficiency'),
      linkRow('EV Programs'),
      linkRow('Customer Engagement'),
      linkRow('DER Grid Planning'),
      linkRow('Flex Demand'),
      linkRow('Gas Solutions'),
      linkRow('Small Medium Business'),
    ],
  },
  {
    columnHeading: 'Technology',
    columnListAriaLabel: '',
    groupColumnLinks: [
      linkRow('True Disaggregation'),
      linkRow('Disaggregation as a Service'),
      linkRow('UtilityAI™'),
      linkRow('Patents'),
    ],
  },
  {
    columnHeading: 'Knowledge Base',
    columnListAriaLabel: '',
    groupColumnLinks: [linkRow('Resource Library'), linkRow('Insights')],
  },
  {
    columnHeading: '',
    columnListAriaLabel: 'Company',
    groupColumnLinks: [
      linkRow('Contact us'),
      linkRow('Careers'),
      linkRow('Press release'),
      linkRow('Leadership'),
      linkRow('Board and advisors'),
      linkRow('About Bidgely'),
    ],
  },
];

export const fields = (
  <ModuleFields>
    <FieldGroup label="Logo" name="groupFooterBrand" display="inline">
      <ImageField
        label="Footer logo"
        name="footerLogo"
        resizable={true}
        responsive={true}
        showLoading={true}
        default={{
          src: '',
          alt: '',
          width: 160,
          height: 44,
          loading: 'lazy' as const,
        }}
        helpText="Optional. Recommended ~160×44. Shown inside the logo link."
      />
      <LinkField
        label="Logo link (home)"
        name="brandLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS']}
        showAdvancedRelOptions={false}
        default={{ url: { href: '/', type: 'EXTERNAL' as const, content_id: null }, open_in_new_tab: false }}
      />
      <TextField label="Logo link aria-label" name="logoAriaLabel" default="Bidgely home" />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Footer columns"
      name="groupFooterColumns"
      occurrence={{ min: 1, max: 8, default: 4 }}
      default={defaultFooterColumns}
    >
      <TextField
        label="Column heading"
        name="columnHeading"
        default="Solutions"
        helpText="Leave empty for a column with no heading (use list aria-label instead)."
      />
      <TextField
        label="List aria-label (optional)"
        name="columnListAriaLabel"
        default=""
        helpText="Sets aria-label on the &lt;ul&gt; when there is no column heading (e.g. Company)."
      />
      <RepeatedFieldGroup
        label="Links in this column"
        name="groupColumnLinks"
        occurrence={{ min: 1, max: 30, default: 4 }}
        default={[linkRow('Contact us'), linkRow('Careers'), linkRow('Press release'), linkRow('About Bidgely')]}
      >
        <TextField label="Link label" name="linkLabel" default="Contact us" inlineEditable={true} />
        <LinkField
          label="Link URL"
          name="linkUrl"
          supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS']}
          showAdvancedRelOptions={false}
          default={defaultLink}
        />
      </RepeatedFieldGroup>
    </RepeatedFieldGroup>

    <FieldGroup label="Legal bar" name="groupFooterLegal" display="inline">
      <TextField label="Terms link label" name="termsLabel" default="Terms & Conditions" />
      <LinkField
        label="Terms link"
        name="termsLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS']}
        showAdvancedRelOptions={false}
        default={defaultLink}
      />
      <TextField label="Privacy link label" name="privacyLabel" default="Privacy Policy" />
      <LinkField
        label="Privacy link"
        name="privacyLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS']}
        showAdvancedRelOptions={false}
        default={defaultLink}
      />
      <TextField
        label="Copyright line"
        name="copyrightText"
        default="© 2026 Bidgely, Inc. All Rights Reserved."
      />
    </FieldGroup>
  </ModuleFields>
);
