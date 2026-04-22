import {
  ModuleFields,
  TextField,
  FieldGroup,
  ImageField,
  LinkField,
  RepeatedFieldGroup,
  ChoiceField,
  BooleanField,
  NumberField,
} from '@hubspot/cms-components/fields';
import driverEvPng from './assets/ev-intelligence.png';
import driverHvacPng from './assets/HVAC-usage.png';
import driverWeatherPng from './assets/Weather-adjustment.png';

const defaultProgramLink = {
  url: { href: '#', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

const defaultProgramLinkAnchor = {
  url: { href: '#proactive-notifications', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

function driverIconDefault(src: string) {
  return {
    src,
    alt: '',
    width: 34,
    height: 17,
    loading: 'lazy' as const,
  };
}

const defaultBillDriverRow = (src: string, label: string, barPercent: number, amount: string) => ({
  billDriverIcon: driverIconDefault(src),
  billDriverLabel: label,
  billDriverBarPercent: barPercent,
  billDriverAmount: amount,
});

const defaultBillDrivers = [
  defaultBillDriverRow(driverEvPng, 'EV Charging (on-peak)', 75, '+$34'),
  defaultBillDriverRow(driverHvacPng, 'HVAC usage spike', 40, '+$22'),
  defaultBillDriverRow(driverWeatherPng, 'Weather adjustment', 22, '+$12'),
];

const visAlerts = {
  controlling_field_path: 'groupProgramRows.programDiagram',
  controlling_value_regex: 'alerts_compare',
  operator: 'EQUAL' as const,
};

const visBill = {
  controlling_field_path: 'groupProgramRows.programDiagram',
  controlling_value_regex: 'bill_panel',
  operator: 'EQUAL' as const,
};

const visPortal = {
  controlling_field_path: 'groupProgramRows.programDiagram',
  controlling_value_regex: 'portal',
  operator: 'EQUAL' as const,
};

const defaultOutcomesTemplate = [
  { programOutcomeText: '85% verified CSAT on personalized alert programs' },
  { programOutcomeText: '2+ quartile JD Power improvement at reference utilities' },
  { programOutcomeText: '15%+ reduction in CSR churn from reduced inbound volume' },
];

const defaultOutcomesRow2 = [
  { programOutcomeText: '50%+ reduction in high-bill calls' },
  { programOutcomeText: '30% reduction in average call handle time' },
  { programOutcomeText: 'Up to 25,000 CSR calls deflected in a single program cycle' },
];

const defaultOutcomesRow3 = [
  { programOutcomeText: '18% TOU enrollment rates via targeted self-service journeys' },
  { programOutcomeText: '127% of filed EE targets achieved across deployments' },
  { programOutcomeText: '1.5 TWh+ in total energy saved' },
];

function emptyPortalPromoIcon() {
  return {
    src: '',
    alt: '',
    width: 24,
    height: 24,
    loading: 'lazy' as const,
  };
}

const defaultPortalTabs = [
  { portalTabLabel: 'Usage', portalTabIsActive: true },
  { portalTabLabel: 'Bills', portalTabIsActive: false },
  { portalTabLabel: 'Programs', portalTabIsActive: false },
];

const defaultPortalBars = [
  { portalBarLabel: 'EV', portalBarFillPercent: 65 },
  { portalBarLabel: 'HVAC', portalBarFillPercent: 48 },
  { portalBarLabel: 'H2O', portalBarFillPercent: 28 },
  { portalBarLabel: 'Other', portalBarFillPercent: 18 },
];

const defaultProgramRows = [
  {
    programAnchorId: 'proactive-notifications',
    programReverseLayout: false,
    programDiagram: 'alerts_compare',
    programTitle: 'Proactive Usage Notifications',
    programSubtitle: 'Alerts that change behavior, not just inboxes.',
    programProblem:
      'Generic alerts train customers to ignore you. When every notification says the same thing to the same segment, open rates fall, calls rise, and trust erodes.',
    groupProgramOutcomes: defaultOutcomesTemplate,
    programLinkLabel: 'Explore Proactive Notifications',
    programLink: defaultProgramLinkAnchor,
    alertsVisualLabel: 'Generic vs. Appliance-Level Alerts',
    alertsGenericSource: 'Your utility',
    alertsGenericTag: 'Segment based',
    alertsGenericHeadline: 'Your bill may be higher this month',
    alertsGenericBody:
      'Usage in your area has been above average. Visit your online account to see your usage.',
    alertsSmartSource: 'Your utility – Powered by UtilityAI',
    alertsSmartTag: 'Appliance-level',
    alertsSmartHeadlineBefore: 'Hi Jennifer — your ',
    alertsSmartHeadlineHighlight: 'EV charging',
    alertsSmartHeadlineAfter: ' added $34 this week.',
    alertsSmartBodyBefore: 'Shifting to off-peak overnight charging could save you up to ',
    alertsSmartBodyHighlight: '$28/month',
    alertsSmartBodyAfter: ". Here's how to enroll in our Smart Charge program.",
    billVisualEyebrow: 'CSR Console · High Bill Resolution',
    billPanelTitle: 'Bill Analysis · Acct #449211',
    billPanelPill: 'CSR ASSISTANT',
    billDeltaVal: '+$68',
    billDeltaHint: 'vs. prior billing period',
    groupBillDriverRows: defaultBillDrivers,
    billTipLead: 'Recommended:',
    billTip: 'Offer Smart Charge enrollment. Saves $34/mo. 92% propensity match.',
    portalVisualEyebrow: 'Customer Portal · Appliance-Level View',
    portalNavTitle: 'My Energy Dashboard',
    portalChartLabel: 'Last 7 Days · Appliance Breakdown',
    portalPromoTitle: 'Smart Charge Program',
    portalPromoSub: 'Based on your EV usage, you could save up to $34/month',
    groupPortalTabs: defaultPortalTabs,
    groupPortalBars: defaultPortalBars,
    portalPromoIcon: emptyPortalPromoIcon(),
    portalPromoCta: 'Enroll Now',
    portalPromoCtaLink: defaultProgramLink,
  },
  {
    programAnchorId: '',
    programReverseLayout: true,
    programDiagram: 'bill_panel',
    programTitle: 'High Bill Analyzer & Call Resolution',
    programSubtitle: 'Resolve the call before the customer finishes explaining.',
    programProblem:
      'No more clicking through four systems to piece together a vague answer. Get to the root cause of calls, to make them one and done.',
    groupProgramOutcomes: defaultOutcomesRow2,
    programLinkLabel: 'Explore High Bill Analyzer',
    programLink: defaultProgramLink,
    alertsVisualLabel: 'Generic vs. Appliance-Level Alerts',
    alertsGenericSource: 'Your utility',
    alertsGenericTag: 'Segment based',
    alertsGenericHeadline: 'Your bill may be higher this month',
    alertsGenericBody:
      'Usage in your area has been above average. Visit your online account to see your usage.',
    alertsSmartSource: 'Your utility – Powered by UtilityAI',
    alertsSmartTag: 'Appliance-level',
    alertsSmartHeadlineBefore: 'Hi Jennifer — your ',
    alertsSmartHeadlineHighlight: 'EV charging',
    alertsSmartHeadlineAfter: ' added $34 this week.',
    alertsSmartBodyBefore: 'Shifting to off-peak overnight charging could save you up to ',
    alertsSmartBodyHighlight: '$28/month',
    alertsSmartBodyAfter: ". Here's how to enroll in our Smart Charge program.",
    billVisualEyebrow: 'CSR Console · High Bill Resolution',
    billPanelTitle: 'Bill Analysis · Acct #449211',
    billPanelPill: 'CSR ASSISTANT',
    billDeltaVal: '+$68',
    billDeltaHint: 'vs. prior billing period',
    groupBillDriverRows: defaultBillDrivers,
    billTipLead: 'Recommended:',
    billTip: 'Offer Smart Charge enrollment. Saves $34/mo. 92% propensity match.',
    portalVisualEyebrow: 'Customer Portal · Appliance-Level View',
    portalNavTitle: 'My Energy Dashboard',
    portalChartLabel: 'Last 7 Days · Appliance Breakdown',
    portalPromoTitle: 'Smart Charge Program',
    portalPromoSub: 'Based on your EV usage, you could save up to $34/month',
    groupPortalTabs: defaultPortalTabs,
    groupPortalBars: defaultPortalBars,
    portalPromoIcon: emptyPortalPromoIcon(),
    portalPromoCta: 'Enroll Now',
    portalPromoCtaLink: defaultProgramLink,
  },
  {
    programAnchorId: '',
    programReverseLayout: false,
    programDiagram: 'portal',
    programTitle: 'Customer Self-Service Tools',
    programSubtitle: 'Self-service that actually resolves, not just redirects.',
    programProblem:
      "Customers who can't explain their own bill don't trust their utility. Self-service built on whole-home averages doesn't resolve that — it moves the confusion online.",
    groupProgramOutcomes: defaultOutcomesRow3,
    programLinkLabel: 'Explore Self-Service Tools',
    programLink: defaultProgramLink,
    alertsVisualLabel: 'Generic vs. Appliance-Level Alerts',
    alertsGenericSource: 'Your utility',
    alertsGenericTag: 'Segment based',
    alertsGenericHeadline: 'Your bill may be higher this month',
    alertsGenericBody:
      'Usage in your area has been above average. Visit your online account to see your usage.',
    alertsSmartSource: 'Your utility – Powered by UtilityAI',
    alertsSmartTag: 'Appliance-level',
    alertsSmartHeadlineBefore: 'Hi Jennifer — your ',
    alertsSmartHeadlineHighlight: 'EV charging',
    alertsSmartHeadlineAfter: ' added $34 this week.',
    alertsSmartBodyBefore: 'Shifting to off-peak overnight charging could save you up to ',
    alertsSmartBodyHighlight: '$28/month',
    alertsSmartBodyAfter: ". Here's how to enroll in our Smart Charge program.",
    billVisualEyebrow: 'CSR Console · High Bill Resolution',
    billPanelTitle: 'Bill Analysis · Acct #449211',
    billPanelPill: 'CSR ASSISTANT',
    billDeltaVal: '+$68',
    billDeltaHint: 'vs. prior billing period',
    groupBillDriverRows: defaultBillDrivers,
    billTipLead: 'Recommended:',
    billTip: 'Offer Smart Charge enrollment. Saves $34/mo. 92% propensity match.',
    portalVisualEyebrow: 'Customer Portal · Appliance-Level View',
    portalNavTitle: 'My Energy Dashboard',
    portalChartLabel: 'Last 7 Days · Appliance Breakdown',
    portalPromoTitle: 'Smart Charge Program',
    portalPromoSub: 'Based on your EV usage, you could save up to $34/month',
    groupPortalTabs: defaultPortalTabs,
    groupPortalBars: defaultPortalBars,
    portalPromoIcon: emptyPortalPromoIcon(),
    portalPromoCta: 'Enroll Now',
    portalPromoCtaLink: defaultProgramLink,
  },
];

export const fields = (
  <ModuleFields>
    <FieldGroup label="Programs — section intro" name="groupProgramsIntro" display="inline">
      <TextField label="Eyebrow" name="programsEyebrow" default="Use Cases" />
      <TextField label="Heading — before accent" name="programsHeadingBefore" default="What " />
      <TextField label="Heading — accent" name="programsHeadingAccent" default="UtilityAI" />
      <TextField label="Heading — after accent" name="programsHeadingAfter" default=" makes possible in CX." />
      <TextField
        label="Lead paragraph"
        name="programsLead"
        default="Each use case uses the same appliance-level intelligence layer — so your CX, DSM, and marketing teams operate from the same source of truth."
      />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Program rows"
      name="groupProgramRows"
      occurrence={{
        min: 1,
        max: 8,
        default: 3,
      }}
      default={defaultProgramRows}
    >
      <TextField
        label="Anchor id (optional)"
        name="programAnchorId"
        default=""
        helpText="Sets the article id (e.g. proactive-notifications for #proactive-notifications). Leave empty to omit."
      />
      <BooleanField
        label="Reverse columns (text / visual)"
        name="programReverseLayout"
        display="toggle"
        default={false}
        helpText="Adds program-block--reverse (visual column appears first on wide layouts)."
      />
      <ChoiceField
        label="Diagram / visual"
        name="programDiagram"
        display="select"
        choices={[
          ['alerts_compare', 'Alerts comparison (generic vs appliance-level)'],
          ['bill_panel', 'High bill CSR panel'],
          ['portal', 'Customer portal mockup'],
        ]}
        required={true}
        default="alerts_compare"
      />

      <TextField label="Title" name="programTitle" default="Proactive Usage Notifications" inlineEditable={true} />
      <TextField label="Subtitle" name="programSubtitle" default="" inlineEditable={true} />
      <TextField label="Problem paragraph" name="programProblem" default="" inlineEditable={true} />
      <RepeatedFieldGroup
        label="Outcomes"
        name="groupProgramOutcomes"
        occurrence={{
          min: 1,
          max: 12,
          default: 3,
        }}
        default={defaultOutcomesTemplate}
      >
        <TextField label="Outcome text" name="programOutcomeText" default="" inlineEditable={true} />
      </RepeatedFieldGroup>
      <TextField label="Link label" name="programLinkLabel" default="Explore" inlineEditable={true} />
      <LinkField
        label="Link URL"
        name="programLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'CALL_TO_ACTION']}
        showAdvancedRelOptions={false}
        default={defaultProgramLink}
      />

      <TextField
        label="[Alerts] Compare row label"
        name="alertsVisualLabel"
        default="Generic vs. Appliance-Level Alerts"
        visibility={visAlerts}
        inlineEditable={true}
      />
      <TextField label="[Alerts] Generic — source line" name="alertsGenericSource" default="Your utility" visibility={visAlerts} />
      <TextField label="[Alerts] Generic — tag" name="alertsGenericTag" default="Segment based" visibility={visAlerts} />
      <TextField
        label="[Alerts] Generic — headline"
        name="alertsGenericHeadline"
        default="Your bill may be higher this month"
        visibility={visAlerts}
      />
      <TextField
        label="[Alerts] Generic — body"
        name="alertsGenericBody"
        default=""
        visibility={visAlerts}
      />
      <TextField
        label="[Alerts] Smart — source line"
        name="alertsSmartSource"
        default="Your utility – Powered by UtilityAI"
        visibility={visAlerts}
      />
      <TextField label="[Alerts] Smart — tag" name="alertsSmartTag" default="Appliance-level" visibility={visAlerts} />
      <TextField
        label="[Alerts] Smart — headline (before highlight)"
        name="alertsSmartHeadlineBefore"
        default="Hi Jennifer — your "
        visibility={visAlerts}
      />
      <TextField
        label="[Alerts] Smart — headline (highlight)"
        name="alertsSmartHeadlineHighlight"
        default="EV charging"
        visibility={visAlerts}
      />
      <TextField
        label="[Alerts] Smart — headline (after highlight)"
        name="alertsSmartHeadlineAfter"
        default=" added $34 this week."
        visibility={visAlerts}
      />
      <TextField
        label="[Alerts] Smart — body (before $ highlight)"
        name="alertsSmartBodyBefore"
        default=""
        visibility={visAlerts}
      />
      <TextField label="[Alerts] Smart — body ($ highlight)" name="alertsSmartBodyHighlight" default="$28/month" visibility={visAlerts} />
      <TextField label="[Alerts] Smart — body (after $ highlight)" name="alertsSmartBodyAfter" default="" visibility={visAlerts} />

      <TextField label="[Bill] Visual eyebrow" name="billVisualEyebrow" default="" visibility={visBill} />
      <TextField label="[Bill] Panel title" name="billPanelTitle" default="" visibility={visBill} />
      <TextField label="[Bill] Panel pill" name="billPanelPill" default="CSR ASSISTANT" visibility={visBill} />
      <TextField label="[Bill] Delta value" name="billDeltaVal" default="+$68" visibility={visBill} />
      <TextField label="[Bill] Delta hint" name="billDeltaHint" default="vs. prior billing period" visibility={visBill} />
      <RepeatedFieldGroup
        label="[Bill] Driver rows"
        name="groupBillDriverRows"
        occurrence={{
          min: 1,
          max: 10,
          default: 3,
        }}
        default={defaultBillDrivers}
        visibility={visBill}
      >
        <ImageField
          label="Icon"
          name="billDriverIcon"
          resizable={false}
          responsive={false}
          showLoading={true}
          default={driverIconDefault(driverEvPng)}
          inlineEditable={true}
        />
        <TextField label="Label" name="billDriverLabel" default="EV Charging (on-peak)" inlineEditable={true} />
        <NumberField
          label="Bar width (%)"
          name="billDriverBarPercent"
          display="text"
          min={0}
          max={100}
          step={1}
          default={75}
        />
        <TextField label="Amount" name="billDriverAmount" default="+$34" inlineEditable={true} />
      </RepeatedFieldGroup>
      <TextField
        label="[Bill] Tip — lead (bold, e.g. Recommended:)"
        name="billTipLead"
        default="Recommended:"
        visibility={visBill}
      />
      <TextField
        label="[Bill] Tip — body"
        name="billTip"
        default="Offer Smart Charge enrollment. Saves $34/mo. 92% propensity match."
        visibility={visBill}
        helpText="Follows the lead above (include a space after the colon in the lead if you want one)."
      />

      <TextField label="[Portal] Visual eyebrow" name="portalVisualEyebrow" default="" visibility={visPortal} />
      <TextField label="[Portal] Nav title" name="portalNavTitle" default="My Energy Dashboard" visibility={visPortal} />
      <TextField label="[Portal] Chart label" name="portalChartLabel" default="" visibility={visPortal} />

      <RepeatedFieldGroup
        label="[Portal] Tabs"
        name="groupPortalTabs"
        occurrence={{
          min: 1,
          max: 8,
          default: 3,
        }}
        default={defaultPortalTabs}
        visibility={visPortal}
      >
        <TextField label="Tab label" name="portalTabLabel" default="Usage" inlineEditable={true} />
        <BooleanField
          label="Active tab"
          name="portalTabIsActive"
          display="toggle"
          default={false}
          helpText="Enable for the tab that should look selected. If several are on, the first one wins."
        />
      </RepeatedFieldGroup>

      <RepeatedFieldGroup
        label="[Portal] Chart bars"
        name="groupPortalBars"
        occurrence={{
          min: 1,
          max: 8,
          default: 4,
        }}
        default={defaultPortalBars}
        visibility={visPortal}
      >
        <TextField label="Bar label" name="portalBarLabel" default="EV" inlineEditable={true} />
        <NumberField
          label="Bar height (%)"
          name="portalBarFillPercent"
          display="text"
          min={0}
          max={100}
          step={1}
          default={50}
        />
      </RepeatedFieldGroup>

      <ImageField
        label="[Portal] Promo icon (optional — replaces default lightning graphic)"
        name="portalPromoIcon"
        resizable={true}
        responsive={false}
        showLoading={true}
        default={emptyPortalPromoIcon()}
        visibility={visPortal}
        inlineEditable={true}
      />
      <TextField label="[Portal] Promo title" name="portalPromoTitle" default="" visibility={visPortal} />
      <TextField label="[Portal] Promo subtitle" name="portalPromoSub" default="" visibility={visPortal} />
      <TextField label="[Portal] Promo CTA label" name="portalPromoCta" default="Enroll Now" visibility={visPortal} inlineEditable={true} />
      <LinkField
        label="[Portal] Promo CTA link"
        name="portalPromoCtaLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'CALL_TO_ACTION']}
        showAdvancedRelOptions={false}
        default={defaultProgramLink}
        visibility={visPortal}
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);
