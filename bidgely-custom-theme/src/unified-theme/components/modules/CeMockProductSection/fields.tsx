import {
  ModuleFields,
  TextField,
  FieldGroup,
  RepeatedFieldGroup,
  BooleanField,
  NumberField,
  LinkField,
  ImageField,
} from '@hubspot/cms-components/fields';
import applianceEvCharging from './assets/appliance-ev-charging.svg';
import applianceCooling from './assets/appliance-cooling.svg';
import applianceWaterHeater from './assets/appliance-water-heater.svg';

const defaultActionLink = {
  url: { href: '#send', type: 'EXTERNAL' as const, content_id: null },
  open_in_new_tab: false,
};

const defaultInsightCards = [
  {
    insightLabel: 'This Month',
    insightValue: '$247',
    insightHint: '+$68 vs last month',
    insightCardAccent: false,
    insightValueGradient: false,
    insightGroupHeadingPrice: true,
  },
  {
    insightLabel: 'Primary Driver',
    insightValue: 'EV Charging',
    insightHint: '+$34 on-peak shift',
    insightCardAccent: true,
    insightValueGradient: true,
    insightGroupHeadingPrice: true,
  },
  {
    insightLabel: 'Program Match',
    insightValue: '92%',
    insightHint: 'Smart Charge Rebate',
    insightCardAccent: false,
    insightValueGradient: false,
    insightGroupHeadingPrice: false,
  },
];

const defaultApplianceRows = [
  {
    applianceIcon: {
      src: applianceEvCharging,
      alt: 'EV charging',
      width: 22,
      height: 22,
      loading: 'lazy' as const,
    },
    applianceLabel: 'EV Charging',
    applianceBarPercent: 82,
    applianceAmount: '$89',
  },
  {
    applianceIcon: {
      src: applianceCooling,
      alt: 'HVAC / cooling',
      width: 22,
      height: 22,
      loading: 'lazy' as const,
    },
    applianceLabel: 'HVAC / Cooling',
    applianceBarPercent: 58,
    applianceAmount: '$63',
  },
  {
    applianceIcon: {
      src: applianceWaterHeater,
      alt: 'Water heater',
      width: 22,
      height: 22,
      loading: 'lazy' as const,
    },
    applianceLabel: 'Water Heater',
    applianceBarPercent: 28,
    applianceAmount: '$31',
  },
];

const defaultStatTiles = [
  {
    statLabel: 'JD Power',
    statValue: '2+',
    statHint: 'Quartile improvement',
  },
  {
    statLabel: 'CSAT',
    statValue: '85%',
    statHint: 'On alert programs',
  },
  {
    statLabel: 'Enrollment',
    statValue: '3.1×',
    statHint: 'Program increase',
  },
  {
    statLabel: 'Energy Saved',
    statValue: '1.5 TWh',
    statHint: 'Across deployments',
  },
];

export const fields = (
  <ModuleFields>
    <TextField
      label="Section accessible name (aria-label)"
      name="mockSectionAriaLabel"
      default="Product preview"
    />

    <FieldGroup label="Floating card — left" name="groupFloaterLeft" display="inline">
      <TextField label="Label" name="leftFloaterLabel" default="Energy saved" />
      <TextField label="Value" name="leftFloaterValue" default="1.5 TWh" />
      <TextField label="Hint" name="leftFloaterHint" default="Across deployments" />
    </FieldGroup>

    <FieldGroup label="Floating card — right" name="groupFloaterRight" display="inline">
      <TextField label="Label" name="rightFloaterLabel" default="Enrollment" />
      <TextField label="Value" name="rightFloaterValue" default="3.1×" />
      <TextField label="Hint" name="rightFloaterHint" default="Program increase" />
    </FieldGroup>

    <FieldGroup label="Browser chrome" name="groupMockChrome" display="inline">
      <TextField
        label="Window title bar text"
        name="mockWindowTitle"
        default="UTILITYAI · CUSTOMER INTELLIGENCE · METER #49211"
      />
    </FieldGroup>

    <FieldGroup label="Customer row" name="groupMockCustomer" display="inline">
      <TextField label="Avatar initials" name="mockAvatarText" default="JM" />
      <TextField label="Customer name" name="mockCustomerName" default="Jennifer Martinez" />
      <TextField
        label="Customer meta line"
        name="mockCustomerMeta"
        default="Acct #449211 · TOU-EV Rate · Springfield, IL"
      />
      <TextField label="Badge text" name="mockCustomerBadge" default="High Bill Risk" />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Insight cards"
      name="groupInsightCards"
      occurrence={{
        min: 1,
        max: 6,
        default: 3,
      }}
      default={defaultInsightCards}
    >
      <TextField label="Label" name="insightLabel" default="This Month" inlineEditable={true} />
      <TextField label="Value" name="insightValue" default="$247" inlineEditable={true} />
      <TextField label="Hint" name="insightHint" default="+$68 vs last month" inlineEditable={true} />
      <BooleanField label="Accent card style" name="insightCardAccent" display="toggle" default={false} />
      <BooleanField label="Gradient value text" name="insightValueGradient" display="toggle" default={false} />
      <BooleanField
        label="Group label + value (heading/price row)"
        name="insightGroupHeadingPrice"
        display="toggle"
        default={false}
      />
    </RepeatedFieldGroup>

    <RepeatedFieldGroup
      label="Appliance / usage rows"
      name="groupApplianceRows"
      occurrence={{
        min: 1,
        max: 10,
        default: 3,
      }}
      default={defaultApplianceRows}
    >
      <ImageField
        label="Icon"
        name="applianceIcon"
        resizable={false}
        responsive={false}
        showLoading={true}
        default={{
          src: applianceEvCharging,
          alt: 'Appliance',
          width: 22,
          height: 22,
          loading: 'lazy',
        }}
        inlineEditable={true}
      />
      <TextField label="Label" name="applianceLabel" default="EV Charging" inlineEditable={true} />
      <NumberField
        label="Bar fill (%)"
        name="applianceBarPercent"
        display="text"
        min={0}
        max={100}
        step={1}
        default={82}
      />
      <TextField label="Amount" name="applianceAmount" default="$89" inlineEditable={true} />
    </RepeatedFieldGroup>

    <FieldGroup label="Bottom action row" name="groupMockAction" display="inline">
      <TextField
        label="Message"
        name="mockActionText"
        default="Send proactive outreach: shift EV charging to save $34/month"
      />
      <TextField label="Link text" name="mockActionButtonLabel" default="Send Now" />
      <LinkField
        label="Link URL"
        name="mockActionLink"
        supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'CALL_TO_ACTION']}
        showAdvancedRelOptions={false}
        default={defaultActionLink}
      />
    </FieldGroup>

    <FieldGroup label="Side panel — impact card" name="groupImpactCard" display="inline">
      <TextField label="Tag" name="impactTag" default="CX Impact" />
      <TextField label="Stat" name="impactStat" default="50%+" />
      <TextField
        label="Description"
        name="impactDesc"
        default="Reduction in high-bill call volume through proactive outreach"
      />
    </FieldGroup>

    <RepeatedFieldGroup
      label="Stat tiles"
      name="groupStatTiles"
      occurrence={{
        min: 1,
        max: 8,
        default: 4,
      }}
      default={defaultStatTiles}
    >
      <TextField label="Label" name="statLabel" default="JD Power" inlineEditable={true} />
      <TextField label="Value" name="statValue" default="2+" inlineEditable={true} />
      <TextField label="Hint" name="statHint" default="Quartile improvement" inlineEditable={true} />
    </RepeatedFieldGroup>
  </ModuleFields>
);
