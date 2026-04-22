import {
  ModuleFields,
  TextField,
  FieldGroup,
  RepeatedFieldGroup,
  ImageField,
  ChoiceField,
  LinkField,
} from '@hubspot/cms-components/fields';
import { RichTextContent } from '../../fieldLibrary/index.js';
import energyAssistantPng from './assets/EnergyAssistant.png';
import csrCopilotPng from './assets/CSRCopilot.png';
import chartBillPng from './assets/ChartBill.png';

const defaultChipLink = {
  url: { href: '#', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

function featureIconDefault(src: string) {
  return {
    src,
    alt: '',
    width: 26,
    height: 26,
    loading: 'lazy' as const,
  };
}

/** Empty default: module shows built-in SVG until an image is chosen. */
const chatAvatarImageEmpty = {
  src: '',
  alt: '',
  width: 26,
  height: 26,
  loading: 'lazy' as const,
};

const defaultGenaiFeatures = [
  {
    featureIcon: featureIconDefault(energyAssistantPng),
    featureTitle: 'Energy Assistant (Customer-Facing)',
    featureBody:
      'A conversational AI that answers billing and usage questions, explains appliance-level charges, and recommends programs — embedded in your portal, app, or SMS channel. Personalized to each meter, not a generic chatbot.',
  },
  {
    featureIcon: featureIconDefault(csrCopilotPng),
    featureTitle: 'CSR Copilot',
    featureBody:
      'A GenAI assistant embedded in your CSR console. Agents ask plain-language questions and get appliance-level answers, rate comparisons, and next-best actions in seconds. No tab-switching required.',
  },
  {
    featureIcon: featureIconDefault(chartBillPng),
    featureTitle: 'Chart & Bill Explainers',
    featureBody:
      'Usage charts and bill breakdowns with embedded natural-language explanations. Customers can tap any bar, spike, or line item and get a plain-English reason — powered by the same disaggregation that drives your CSR tools.',
  },
];

const defaultChatMessages = [
  {
    messageRole: 'user' as const,
    senderLabel: 'You',
    richTextContentHTML: '<p>Why is my bill $68 higher this month?</p>',
  },
  {
    messageRole: 'assistant' as const,
    senderLabel: 'ENERGY ASSISTANT',
    richTextContentHTML:
      '<p>Your bill increased mainly because of your <strong>EV charging</strong> — it added about <strong>$34</strong> due to on-peak sessions over the past two weeks. Your HVAC also ran longer during the heat wave, contributing another <strong>$22</strong>.</p><p>Shifting your EV charging to overnight (after 10 PM) could recover most of that $34. Want me to walk you through the Smart Charge program?</p>',
  },
  {
    messageRole: 'user' as const,
    senderLabel: 'You',
    richTextContentHTML: '<p>Yes, how do I sign up?</p>',
  },
  {
    messageRole: 'assistant' as const,
    senderLabel: 'ENERGY ASSISTANT',
    richTextContentHTML:
      '<p>I can start your enrollment right here. Based on your <strong>Level 2 charger</strong> and current TOU-EV rate, you qualify and could save up to <strong>$34/month</strong>. Should I proceed?</p>',
  },
];

const defaultChatChips = [
  { chipLabel: 'Yes, enroll me', chipLink: { ...defaultChipLink, url: { href: '#chat-enroll', type: 'EXTERNAL' as const, content_id: null } } },
  { chipLabel: 'Tell me more first', chipLink: { ...defaultChipLink, url: { href: '#chat-more', type: 'EXTERNAL' as const, content_id: null } } },
  {
    chipLabel: 'Show my full bill breakdown',
    chipLink: { ...defaultChipLink, url: { href: '#chat-bill', type: 'EXTERNAL' as const, content_id: null } },
  },
];

export const fields = (
  <ModuleFields>
    <FieldGroup label="GenAI — intro" name="groupCeGenaiIntro" display="inline">
      <TextField label="Eyebrow" name="ceGenaiEyebrow" default="GenAI in Customer Experience" />
      <TextField
        label="Heading (before accent)"
        name="ceGenaiHeadingBefore"
        default="Conversations grounded in real "
      />
      <TextField label="Heading accent" name="ceGenaiHeadingAccent" default="customer data." />
      <TextField
        label="Lead paragraph"
        name="ceGenaiLead"
        default="Bidgely's GenAI layer doesn't run on generic LLM prompts. Every answer — to a customer or a CSR — is grounded in that customer's disaggregated appliance profile."
      />
    </FieldGroup>

    <RepeatedFieldGroup
      label="GenAI feature rows"
      name="groupCeGenaiFeatures"
      occurrence={{
        min: 1,
        max: 12,
        default: 3,
      }}
      default={defaultGenaiFeatures}
    >
      <ImageField
        label="Icon"
        name="featureIcon"
        resizable={false}
        responsive={false}
        showLoading={true}
        default={featureIconDefault(energyAssistantPng)}
        inlineEditable={true}
      />
      <TextField label="Title" name="featureTitle" default="Energy Assistant (Customer-Facing)" inlineEditable={true} />
      <TextField
        label="Body"
        name="featureBody"
        default="A conversational AI that answers billing and usage questions, explains appliance-level charges, and recommends programs — embedded in your portal, app, or SMS channel. Personalized to each meter, not a generic chatbot."
        inlineEditable={true}
      />
    </RepeatedFieldGroup>

    <FieldGroup label="Chat demo — chrome" name="groupCeGenaiChatDemo" display="inline">
      <ImageField
        label="Chat header avatar"
        name="ceGenaiChatAvatar"
        resizable={true}
        responsive={true}
        showLoading={true}
        default={chatAvatarImageEmpty}
        inlineEditable={true}
        helpText="Optional. If empty, the default lightning icon is shown. Recommended ~52×52px or larger (square); it is cropped to a circle."
      />
      <TextField
        label="Aside aria-label"
        name="ceGenaiChatAriaLabel"
        default="Energy Assistant sample conversation"
      />
      <TextField label="Chat headline" name="ceGenaiChatHeadline" default="Energy Assistant" inlineEditable={true} />
      <TextField
        label="Status line"
        name="ceGenaiChatStatus"
        default="● Online · Grounded in your meter data"
        inlineEditable={true}
      />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Chat thread messages"
      name="groupCeGenaiChatMessages"
      occurrence={{
        min: 1,
        max: 24,
        default: 4,
      }}
      default={defaultChatMessages}
    >
      <ChoiceField
        label="Message role"
        name="messageRole"
        display="select"
        helpText="User messages align right; assistant messages align left and can use bold for emphasis."
        choices={[
          ['user', 'User / customer'],
          ['assistant', 'Assistant'],
        ]}
        required={true}
        default="user"
      />
      <TextField
        label="Sender name (label above bubble)"
        name="senderLabel"
        default="You"
        helpText="Shown above the bubble, e.g. “You” or “ENERGY ASSISTANT”."
        inlineEditable={true}
      />
      <RichTextContent
        label="Message"
        featureSet="text"
        richTextDefault="<p>Why is my bill higher this month?</p>"
      />
    </RepeatedFieldGroup>

    <RepeatedFieldGroup
      label="Chat quick-reply chips"
      name="groupCeGenaiChatChips"
      occurrence={{
        min: 0,
        max: 8,
        default: 3,
      }}
      default={defaultChatChips}
    >
      <TextField label="Chip label" name="chipLabel" default="Yes, enroll me" inlineEditable={true} />
      <LinkField
        label="Chip link"
        name="chipLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'CALL_TO_ACTION']}
        showAdvancedRelOptions={false}
        default={defaultChipLink}
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);
