import {
  ModuleFields,
  TextField,
  FieldGroup,
  RepeatedFieldGroup,
  ImageField,
} from '@hubspot/cms-components/fields';
import explainPng from './assets/Explain.png';
import knowWhatPng from './assets/Know what.png';
import reachTheRightPng from './assets/Reach the right.png';
import makeEveryPng from './assets/Make every.png';

function cardIconDefault(src: string, alt: string) {
  return {
    src,
    alt,
    width: 56,
    height: 56,
    loading: 'lazy' as const,
  };
}

const defaultCapabilityCards = [
  {
    cardIcon: cardIconDefault(explainPng, 'Explain every bill'),
    cardTitle: 'Explain every bill before the phone rings.',
    cardText:
      'Surface appliance-level cost drivers proactively so customers already understand their bill and CSRs can resolve what does come in.',
  },
  {
    cardIcon: cardIconDefault(knowWhatPng, 'Satisfaction scores'),
    cardTitle: 'Know exactly what moves your satisfaction scores.',
    cardText:
      'Map JD Power drivers to specific customer interactions so improvements are targeted and measurable, not guesswork.',
  },
  {
    cardIcon: cardIconDefault(reachTheRightPng, 'Right customers'),
    cardTitle: 'Reach the right customers with the right offer.',
    cardText:
      'AI agents work continuously in the background across targeting, outreach, enrollment, and program management. You set the rules and approve what matters. Agents handle the volume. Your team handles the judgment.',
  },
  {
    cardIcon: cardIconDefault(makeEveryPng, 'Digital touchpoints'),
    cardTitle: 'Make every digital touchpoint feel personal.',
    cardText:
      'Put appliance-level intelligence behind your portal, IVR, and app so customers feel understood, not processed.',
  },
];

export const fields = (
  <ModuleFields>
    <FieldGroup label="Section intro" name="groupCeCapIntro" display="inline">
      <TextField label="Eyebrow" name="ceCapEyebrow" default="CAPABILITIES" />
      <TextField
        label="Heading — line before accent"
        name="ceCapHeadingBefore"
        default="CX outcomes you can "
      />
      <TextField label="Heading — accent phrase" name="ceCapHeadingAccent" default="actually own." />
      <TextField
        label="Lead paragraph"
        name="ceCapLead"
        default="The data you need is already behind every meter. Decode it and put it to work."
      />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Capability cards"
      name="groupCeCapabilityCards"
      occurrence={{
        min: 1,
        max: 16,
        default: 4,
      }}
      default={defaultCapabilityCards}
    >
      <ImageField
        label="Card icon"
        name="cardIcon"
        resizable={false}
        responsive={false}
        showLoading={true}
        default={cardIconDefault(explainPng, 'Card icon')}
        helpText="Defaults use the Customer Engagement art; replace from the file manager if needed."
        inlineEditable={true}
      />
      <TextField
        label="Card title"
        name="cardTitle"
        default="Explain every bill before the phone rings."
        inlineEditable={true}
      />
      <TextField
        label="Card body"
        name="cardText"
        default="Surface appliance-level cost drivers proactively so customers already understand their bill and CSRs can resolve what does come in."
        inlineEditable={true}
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);
