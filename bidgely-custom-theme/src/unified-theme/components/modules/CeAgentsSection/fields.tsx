import {
  ModuleFields,
  TextField,
  FieldGroup,
  RepeatedFieldGroup,
  ImageField,
} from '@hubspot/cms-components/fields';
import agentIconIvr from './assets/iucx-icon-05-1.svg';
import agentIconOutreach from './assets/Black.svg';
import agentIconEnrollment from './assets/dtech26-for-regulators.svg';

function agentCardIconDefault(src: string, alt: string) {
  return {
    src,
    alt,
    width: 28,
    height: 28,
    loading: 'lazy' as const,
  };
}

const defaultAgentCards = [
  {
    cardIcon: agentCardIconDefault(agentIconIvr, ''),
    cardTitle: 'IVR Personalization Agent',
    cardBody:
      'Detects the likely call reason before the customer finishes speaking — pulling from their live appliance profile and billing delta. Routes and resolves at the IVR level without a CSR.',
    cardStat: 'Up to 50,000 at-risk customers handled per program cycle',
  },
  {
    cardIcon: agentCardIconDefault(agentIconOutreach, ''),
    cardTitle: 'Proactive Outreach Agent',
    cardBody:
      'Continuously monitors usage patterns and triggers personalized email, SMS, or portal messages before the customer has a reason to call. Picks the right channel and timing for each premise.',
    cardStat: '15%+ reduction in CSR churn from reduced inbound volume',
  },
  {
    cardIcon: agentCardIconDefault(agentIconEnrollment, ''),
    cardTitle: 'Program Enrollment Agent',
    cardBody:
      'Identifies program-eligible customers, segments by propensity, and runs targeted recruitment journeys — including follow-ups, re-engagements, and confirmation — without manual campaign management.',
    cardStat: '4x reduction in marketing cost per enrollment',
  },
];

export const fields = (
  <ModuleFields>
    <FieldGroup label="Agents — intro (left)" name="groupCeAgentsIntro" display="inline">
      <TextField label="Eyebrow" name="ceAgentsEyebrow" default="Agentic Automation in CX" />
      <TextField
        label="Heading"
        name="ceAgentsHeading"
        default="AI that acts. Not just advises."
      />
      <TextField
        label="Lead paragraph"
        name="ceAgentsLead"
        default="Bidgely's agentic layer runs the workflows your team currently does manually across every customer touchpoint. From IVR personalization to campaign triggers, agents work continuously without adding headcount."
      />
    </FieldGroup>

    <FieldGroup label="Agents — value card (right)" name="groupCeAgentsValue" display="inline">
      <TextField label="Eyebrow" name="ceAgentsValueEyebrow" default="Agentic Value, Modeled" />
      <TextField label="Highlight number" name="ceAgentsValueNum" default="$3–7M/year" />
      <TextField
        label="Description"
        name="ceAgentsValueDesc"
        default="From deflected calls, improved enrollment, and automated DSM workflows"
      />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Agent cards"
      name="groupCeAgentCards"
      occurrence={{
        min: 1,
        max: 12,
        default: 3,
      }}
      default={defaultAgentCards}
    >
      <ImageField
        label="Card icon"
        name="cardIcon"
        resizable={false}
        responsive={false}
        showLoading={true}
        default={agentCardIconDefault(agentIconIvr, 'Agent icon')}
        inlineEditable={true}
      />
      <TextField label="Title" name="cardTitle" default="IVR Personalization Agent" inlineEditable={true} />
      <TextField
        label="Body"
        name="cardBody"
        default="Detects the likely call reason before the customer finishes speaking — pulling from their live appliance profile and billing delta. Routes and resolves at the IVR level without a CSR."
        inlineEditable={true}
      />
      <TextField
        label="Stat line"
        name="cardStat"
        default="Up to 50,000 at-risk customers handled per program cycle"
        inlineEditable={true}
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);
