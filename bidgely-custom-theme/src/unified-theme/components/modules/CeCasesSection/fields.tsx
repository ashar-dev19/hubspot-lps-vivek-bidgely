import {
  ModuleFields,
  TextField,
  FieldGroup,
  RepeatedFieldGroup,
  ImageField,
  LinkField,
} from '@hubspot/cms-components/fields';
import logoNvEnergy from './assets/logo-nv-energy.png';
import logoAvista from './assets/logo-avista.png';
import logoOge from './assets/logo-oge.png';
import logoAmeren from './assets/logo-ameren.png';
import logoXcelEnergy from './assets/logo-xcel-energy.png';
import logoPower from './assets/logo-power.png';
import logoEnel from './assets/logo-enel.png';

const defaultDownloadLink = {
  url: { href: '#', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

function logoDefault(src: string, alt: string) {
  return {
    src,
    alt,
    width: 120,
    height: 18,
    loading: 'lazy' as const,
  };
}

function metricDefault(value: string, label: string) {
  return {
    metricValue: value,
    metricLabel: label,
  };
}

const defaultLogos = [
  { logoImage: logoDefault(logoNvEnergy, 'NV Energy') },
  { logoImage: logoDefault(logoAvista, 'Avista') },
  { logoImage: logoDefault(logoOge, 'OG&E') },
  { logoImage: logoDefault(logoAmeren, 'Ameren') },
  { logoImage: logoDefault(logoXcelEnergy, 'Xcel Energy') },
  { logoImage: logoDefault(logoPower, 'Power') },
  { logoImage: logoDefault(logoEnel, 'enel') },
];

const defaultMetrics = [
  metricDefault('30%', 'Reduction in average handle time'),
  metricDefault('3.1×', 'Increase in program enrollment'),
  metricDefault('85%', 'CSAT on personalized alert programs'),
  metricDefault('25K', 'CSR calls deflected in one program cycle'),
];

export const fields = (
  <ModuleFields>
    <FieldGroup label="Section heading" name="groupCeCasesHeading" display="inline">
      <TextField label="Eyebrow" name="ceCasesEyebrow" default="Proven Results" />
      <TextField label="Heading — line before accent" name="ceCasesHeadingBefore" default="Deployed at scale. " />
      <TextField label="Heading — accent phrase" name="ceCasesHeadingAccent" default="Measured at the meter." />
    </FieldGroup>

    <FieldGroup label="Peer utilities row" name="groupCeCasesLogos" display="inline">
      <TextField label="Label" name="ceCasesPeerLabel" default="Peer Utilities:" />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Peer utility logos"
      name="groupCeCasesPeerLogos"
      occurrence={{ min: 0, max: 20, default: 7 }}
      default={defaultLogos}
    >
      <ImageField
        label="Logo image"
        name="logoImage"
        resizable={false}
        responsive={false}
        showLoading={true}
        default={logoDefault(logoNvEnergy, 'Logo')}
        helpText="If a logo image is set, it renders inside the pill (border + padding)."
        inlineEditable={true}
      />
    </RepeatedFieldGroup>

    <FieldGroup label="Featured case — left (navy)" name="groupCeCasesLeft" display="inline">
      <TextField label="Kicker" name="ceCasesKicker" default="Customer Engagement • High bill resolution" />
      <TextField label="Title" name="ceCasesTitle" default="Large Western IOU" />
      <TextField
        label="Description"
        name="ceCasesDesc"
        default="Following a TOU rollout, this utility faced a surge in high-bill call volume — CSRs were overwhelmed and first-contact resolution was falling. They needed a way to explain bill changes at the appliance level and deflect calls before they came in."
      />
      <TextField label="Big stat value" name="ceCasesBigValue" default="50%+" />
      <TextField
        label="Big stat description"
        name="ceCasesBigLabel"
        default="Reduction in high-bill call volume — without adding headcount"
      />
    </FieldGroup>

    <FieldGroup label="Featured case — right (quote + metrics)" name="groupCeCasesRight" display="inline">
      <TextField
        label="Quote"
        name="ceCasesQuote"
        default="“Bidgely gave us visibility we never had: appliance-level insights that transformed how we talk to customers and recruit for programs. We’re resolving calls we used to escalate and enrolling customers we used to miss.”"
      />
      <TextField label="Download link label" name="ceCasesDownloadLabel" default="Download the Full Case Study PDF" />
      <LinkField
        label="Download link"
        name="ceCasesDownloadLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS']}
        showAdvancedRelOptions={false}
        default={defaultDownloadLink}
      />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Metric tiles"
      name="groupCeCasesMetrics"
      occurrence={{ min: 1, max: 12, default: 4 }}
      default={defaultMetrics}
    >
      <TextField label="Value" name="metricValue" default="30%" inlineEditable={true} />
      <TextField label="Label" name="metricLabel" default="Reduction in average handle time" inlineEditable={true} />
    </RepeatedFieldGroup>
  </ModuleFields>
);

