import { useId } from 'react';
import type {
  TextFieldType,
  ImageFieldType,
  LinkFieldType,
  BooleanFieldType,
  NumberFieldType,
} from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { createComponent } from '../../utils/create-component.js';
import cx from '../../utils/classnames.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import CeProgramsSectionSvg from './assets/ce-programs-section.svg';

type ProgramDiagram = 'alerts_compare' | 'bill_panel' | 'portal';

type ProgramOutcomeSubRow = {
  programOutcomeText: TextFieldType['default'];
};

type BillDriverSubRow = {
  billDriverIcon: ImageFieldType['default'];
  billDriverLabel: TextFieldType['default'];
  billDriverBarPercent: NumberFieldType['default'];
  billDriverAmount: TextFieldType['default'];
};

type PortalTabSubRow = {
  portalTabLabel: TextFieldType['default'];
  portalTabIsActive: BooleanFieldType['default'];
};

type PortalBarSubRow = {
  portalBarLabel: TextFieldType['default'];
  portalBarFillPercent: NumberFieldType['default'];
};

type ProgramRow = {
  programAnchorId: TextFieldType['default'];
  programReverseLayout: BooleanFieldType['default'];
  programDiagram: string;
  programTitle: TextFieldType['default'];
  programSubtitle: TextFieldType['default'];
  programProblem: TextFieldType['default'];
  groupProgramOutcomes?: ProgramOutcomeSubRow[];
  /** @deprecated v2 — used only if groupProgramOutcomes is missing */
  programOutcome1?: TextFieldType['default'];
  programOutcome2?: TextFieldType['default'];
  programOutcome3?: TextFieldType['default'];
  programLinkLabel: TextFieldType['default'];
  programLink: LinkFieldType['default'];
  alertsVisualLabel: TextFieldType['default'];
  alertsGenericSource: TextFieldType['default'];
  alertsGenericTag: TextFieldType['default'];
  alertsGenericHeadline: TextFieldType['default'];
  alertsGenericBody: TextFieldType['default'];
  alertsSmartSource: TextFieldType['default'];
  alertsSmartTag: TextFieldType['default'];
  alertsSmartHeadlineBefore: TextFieldType['default'];
  alertsSmartHeadlineHighlight: TextFieldType['default'];
  alertsSmartHeadlineAfter: TextFieldType['default'];
  alertsSmartBodyBefore: TextFieldType['default'];
  alertsSmartBodyHighlight: TextFieldType['default'];
  alertsSmartBodyAfter: TextFieldType['default'];
  billVisualEyebrow: TextFieldType['default'];
  billPanelTitle: TextFieldType['default'];
  billPanelPill: TextFieldType['default'];
  billDeltaVal: TextFieldType['default'];
  billDeltaHint: TextFieldType['default'];
  groupBillDriverRows?: BillDriverSubRow[];
  billTipLead?: TextFieldType['default'];
  billTip: TextFieldType['default'];
  /** @deprecated pre-repeater bill drivers */
  billDriverEvIcon?: ImageFieldType['default'];
  billDriverHvacIcon?: ImageFieldType['default'];
  billDriverWeatherIcon?: ImageFieldType['default'];
  billDriver1Label?: TextFieldType['default'];
  billDriver1Val?: TextFieldType['default'];
  billDriver2Label?: TextFieldType['default'];
  billDriver2Val?: TextFieldType['default'];
  billDriver3Label?: TextFieldType['default'];
  billDriver3Val?: TextFieldType['default'];
  portalVisualEyebrow: TextFieldType['default'];
  portalNavTitle: TextFieldType['default'];
  portalChartLabel: TextFieldType['default'];
  groupPortalTabs?: PortalTabSubRow[];
  groupPortalBars?: PortalBarSubRow[];
  portalPromoIcon?: ImageFieldType['default'];
  portalPromoTitle: TextFieldType['default'];
  portalPromoSub: TextFieldType['default'];
  portalPromoCta?: TextFieldType['default'];
  portalPromoCtaLink?: LinkFieldType['default'];
};

type CeProgramsSectionProps = {
  moduleName?: string;
  hublData?: {
    isInEditor: boolean;
  };
  groupProgramsIntro: {
    programsEyebrow: TextFieldType['default'];
    programsHeadingBefore: TextFieldType['default'];
    programsHeadingAccent: TextFieldType['default'];
    programsHeadingAfter: TextFieldType['default'];
    programsLead: TextFieldType['default'];
  };
  groupProgramRows: ProgramRow[];
};

const Section = createComponent('section');
const Div = createComponent('div');
const P = createComponent('p');
const H2 = createComponent('h2');
const H3 = createComponent('h3');
const Article = createComponent('article');
const Ul = createComponent('ul');
const Li = createComponent('li');
const Span = createComponent('span');
const A = createComponent('a');
const Img = createComponent('img');
const Svg = createComponent('svg');
const Path = createComponent('path');
const Strong = createComponent('strong');

function isTruthyBoolean(v: unknown): boolean {
  return v === true || v === 'true';
}

function getLegacyOutcomeRows(row: ProgramRow): ProgramOutcomeSubRow[] {
  const legacy: ProgramOutcomeSubRow[] = [];
  if (row.programOutcome1) legacy.push({ programOutcomeText: row.programOutcome1 });
  if (row.programOutcome2) legacy.push({ programOutcomeText: row.programOutcome2 });
  if (row.programOutcome3) legacy.push({ programOutcomeText: row.programOutcome3 });
  return legacy;
}

function clampBarPercent(value: NumberFieldType['default']): number {
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value));
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function clampPortalBarHeight(value: NumberFieldType['default']): number {
  return clampBarPercent(value);
}

const DEFAULT_PORTAL_TABS_FALLBACK: PortalTabSubRow[] = [
  { portalTabLabel: 'Usage', portalTabIsActive: true },
  { portalTabLabel: 'Bills', portalTabIsActive: false },
  { portalTabLabel: 'Programs', portalTabIsActive: false },
];

const DEFAULT_PORTAL_BARS_FALLBACK: PortalBarSubRow[] = [
  { portalBarLabel: 'EV', portalBarFillPercent: 65 },
  { portalBarLabel: 'HVAC', portalBarFillPercent: 48 },
  { portalBarLabel: 'H2O', portalBarFillPercent: 28 },
  { portalBarLabel: 'Other', portalBarFillPercent: 18 },
];

function getPortalTabs(row: ProgramRow): PortalTabSubRow[] {
  if (Array.isArray(row.groupPortalTabs) && row.groupPortalTabs.length > 0) {
    return row.groupPortalTabs;
  }
  return DEFAULT_PORTAL_TABS_FALLBACK;
}

function getActivePortalTabIndex(tabs: PortalTabSubRow[]): number {
  const idx = tabs.findIndex((t) => isTruthyBoolean(t.portalTabIsActive));
  return idx >= 0 ? idx : 0;
}

function getPortalBars(row: ProgramRow): PortalBarSubRow[] {
  if (Array.isArray(row.groupPortalBars) && row.groupPortalBars.length > 0) {
    return row.groupPortalBars;
  }
  return DEFAULT_PORTAL_BARS_FALLBACK;
}

function PortalPromoLightningFallback() {
  return (
    <Svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <Path
        d="M10.4445 0.75L0.75 13.2926H6.03162L3.79722 22.75L13.75 9.84754H8.26602L10.4445 0.75Z"
        stroke="#499ED7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PromoCtaArrowIcon() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <Path
        d="M4.66667 11.3337L11.3333 4.66699"
        stroke="#449BD5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.66667 4.66699H11.3333V11.3337"
        stroke="#449BD5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function getBillDriverRows(row: ProgramRow): BillDriverSubRow[] {
  const rep = row.groupBillDriverRows;
  if (Array.isArray(rep) && rep.length > 0) return rep;
  const ev = row.billDriverEvIcon;
  const hv = row.billDriverHvacIcon;
  const wx = row.billDriverWeatherIcon;
  if (ev || row.billDriver1Label) {
    return [
      {
        billDriverIcon: ev ?? { src: '', alt: '' },
        billDriverLabel: row.billDriver1Label ?? '',
        billDriverBarPercent: 75,
        billDriverAmount: row.billDriver1Val ?? '',
      },
      {
        billDriverIcon: hv ?? { src: '', alt: '' },
        billDriverLabel: row.billDriver2Label ?? '',
        billDriverBarPercent: 40,
        billDriverAmount: row.billDriver2Val ?? '',
      },
      {
        billDriverIcon: wx ?? { src: '', alt: '' },
        billDriverLabel: row.billDriver3Label ?? '',
        billDriverBarPercent: 22,
        billDriverAmount: row.billDriver3Val ?? '',
      },
    ];
  }
  return [];
}

function diagramType(row: ProgramRow): ProgramDiagram {
  const d = String(row.programDiagram || 'alerts_compare');
  if (d === 'bill_panel' || d === 'portal') return d;
  return 'alerts_compare';
}

function OutcomeListCheckIcon() {
  return (
    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <Path
        d="M15.75 7.56429V8.25429C15.7491 9.87161 15.2254 11.4453 14.257 12.7407C13.2886 14.036 11.9275 14.9837 10.3765 15.4422C8.82557 15.9008 7.16794 15.8457 5.65085 15.2852C4.13376 14.7247 2.83849 13.6889 1.95822 12.3321C1.07795 10.9753 0.659843 9.37034 0.766258 7.75653C0.872672 6.14272 1.49791 4.60654 2.54871 3.3771C3.59951 2.14766 5.01959 1.29083 6.59714 0.934402C8.17469 0.577975 9.8252 0.741046 11.3025 1.39929"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.75 2.25391L8.25 9.76141L6 7.51141"
        stroke="var(--teal-lt)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ProgramCtaArrowIcon() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <Path
        d="M4.66667 11.3337L11.3333 4.66699"
        stroke="#449BD5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.66667 4.66699H11.3333V11.3337"
        stroke="#449BD5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const LEGACY_OUTCOME_KEYS = ['programOutcome1', 'programOutcome2', 'programOutcome3'] as const;

function OutcomeListRepeater({
  moduleName,
  programRowIndex,
  outcomes,
  useRepeaterFieldPaths,
}: {
  moduleName?: string;
  programRowIndex: number;
  outcomes: ProgramOutcomeSubRow[];
  /** v3+ repeater field paths; false uses programOutcome1…3 for older saved modules */
  useRepeaterFieldPaths: boolean;
}) {
  return (
    <Ul className="outcome-list">
      {outcomes.map((oRow, oi) => {
        const tokenPath = useRepeaterFieldPaths
          ? `groupProgramRows[${programRowIndex}].groupProgramOutcomes[${oi}].programOutcomeText`
          : oi < LEGACY_OUTCOME_KEYS.length
            ? `groupProgramRows[${programRowIndex}].${LEGACY_OUTCOME_KEYS[oi]}`
            : `groupProgramRows[${programRowIndex}].groupProgramOutcomes[${oi}].programOutcomeText`;
        return (
          <Li key={oi}>
            <Span className="outcome-list__check" aria-hidden="true">
              <OutcomeListCheckIcon />
            </Span>{' '}
            <Span data-hs-token={getDataHSToken(moduleName, tokenPath)}>{oRow.programOutcomeText}</Span>
          </Li>
        );
      })}
    </Ul>
  );
}

function ProgramCtaLinkRow({
  moduleName,
  index,
  link,
  label,
}: {
  moduleName?: string;
  index: number;
  link: LinkFieldType['default'];
  label: TextFieldType['default'];
}) {
  const href = getLinkFieldHref(link) || '#';
  const target = getLinkFieldTarget(link);
  const rel = getLinkFieldRel(link);
  return (
    <A
      className="program-block__link"
      href={href}
      data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].programLink`)}
      {...(target ? { target, rel: rel || undefined } : {})}
    >
      <Span data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].programLinkLabel`)}>{label}</Span>{' '}
      <ProgramCtaArrowIcon />
    </A>
  );
}

function BillDriverRowVisual({
  row,
  programRowIndex,
  driverIndex,
  moduleName,
}: {
  row: BillDriverSubRow;
  programRowIndex: number;
  driverIndex: number;
  moduleName?: string;
}) {
  const icon = row.billDriverIcon;
  const hasIcon = Boolean(icon?.src);
  const loading = icon?.loading && icon.loading !== 'disabled' ? icon.loading : 'lazy';
  const base = `groupProgramRows[${programRowIndex}].groupBillDriverRows[${driverIndex}]`;
  return (
    <Div className="driver-row">
      <Span className="driver-row__icon" aria-hidden="true">
        {hasIcon ? (
          <Img
            src={icon.src}
            alt={icon.alt ?? ''}
            height={17}
            width={icon.width ?? 17}
            loading={loading}
            decoding="async"
            data-hs-token={getDataHSToken(moduleName, `${base}.billDriverIcon`)}
          />
        ) : null}
      </Span>
      <Span className="driver-row__label" data-hs-token={getDataHSToken(moduleName, `${base}.billDriverLabel`)}>
        {row.billDriverLabel}
      </Span>
      <Span className="driver-row__track">
        <Span
          className="driver-row__fill"
          style={{ width: `${clampBarPercent(row.billDriverBarPercent)}%` }}
          data-hs-token={getDataHSToken(moduleName, `${base}.billDriverBarPercent`)}
        />
      </Span>
      <Span className="driver-row__val" data-hs-token={getDataHSToken(moduleName, `${base}.billDriverAmount`)}>
        {row.billDriverAmount}
      </Span>
    </Div>
  );
}

/** Legacy flat bill fields: inline-edit tokens match v3 field paths */
function BillDriverRowLegacyVisual({
  row,
  programRowIndex,
  driverIndex,
  moduleName,
}: {
  row: BillDriverSubRow;
  programRowIndex: number;
  driverIndex: 0 | 1 | 2;
  moduleName?: string;
}) {
  const iconKeys = ['billDriverEvIcon', 'billDriverHvacIcon', 'billDriverWeatherIcon'] as const;
  const labelKeys = ['billDriver1Label', 'billDriver2Label', 'billDriver3Label'] as const;
  const valKeys = ['billDriver1Val', 'billDriver2Val', 'billDriver3Val'] as const;
  const icon = row.billDriverIcon;
  const hasIcon = Boolean(icon?.src);
  const loading = icon?.loading && icon.loading !== 'disabled' ? icon.loading : 'lazy';
  return (
    <Div className="driver-row">
      <Span className="driver-row__icon" aria-hidden="true">
        {hasIcon ? (
          <Img
            src={icon.src}
            alt={icon.alt ?? ''}
            height={17}
            width={icon.width ?? 17}
            loading={loading}
            decoding="async"
            data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${programRowIndex}].${iconKeys[driverIndex]}`)}
          />
        ) : null}
      </Span>
      <Span className="driver-row__label" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${programRowIndex}].${labelKeys[driverIndex]}`)}>
        {row.billDriverLabel}
      </Span>
      <Span className="driver-row__track">
        <Span className="driver-row__fill" style={{ width: `${clampBarPercent(row.billDriverBarPercent)}%` }} />
      </Span>
      <Span className="driver-row__val" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${programRowIndex}].${valKeys[driverIndex]}`)}>
        {row.billDriverAmount}
      </Span>
    </Div>
  );
}

function ProgramTextColumn({
  moduleName,
  index,
  row,
}: {
  moduleName?: string;
  index: number;
  row: ProgramRow;
}) {
  const useRepeaterPaths = Array.isArray(row.groupProgramOutcomes) && row.groupProgramOutcomes.length > 0;
  const outcomes = useRepeaterPaths ? row.groupProgramOutcomes! : getLegacyOutcomeRows(row);
  return (
    <Div className="program-block__text">
      <H3 className="program-block__title" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].programTitle`)}>
        {row.programTitle}
      </H3>
      <P className="program-block__subtitle" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].programSubtitle`)}>
        {row.programSubtitle}
      </P>
      <P className="program-block__problem" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].programProblem`)}>
        {row.programProblem}
      </P>
      <OutcomeListRepeater
        moduleName={moduleName}
        programRowIndex={index}
        outcomes={outcomes}
        useRepeaterFieldPaths={useRepeaterPaths}
      />
      <ProgramCtaLinkRow moduleName={moduleName} index={index} link={row.programLink} label={row.programLinkLabel} />
    </Div>
  );
}

function VisualAlertsCompare({ moduleName, index, row }: { moduleName?: string; index: number; row: ProgramRow }) {
  return (
    <Div className="program-block__visual">
      <Div className="program-visual program-visual--alerts-compare">
        <P className="eyebrow" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsVisualLabel`)}>
          {row.alertsVisualLabel}
        </P>
        <Div className="alerts-grid">
          <Div className="alert-card alert-card--generic">
            <P className="alert-card__source" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsGenericSource`)}>
              {row.alertsGenericSource}
            </P>
            <Span className="alert-card__tag alert-card__tag--muted" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsGenericTag`)}>
              {row.alertsGenericTag}
            </Span>
            <P className="alert-card__headline" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsGenericHeadline`)}>
              {row.alertsGenericHeadline}
            </P>
            <P className="alert-card__body" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsGenericBody`)}>
              {row.alertsGenericBody}
            </P>
          </Div>
          <Div className="alert-card alert-card--smart">
            <P className="alert-card__source" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsSmartSource`)}>
              {row.alertsSmartSource}
            </P>
            <Span className="alert-card__tag alert-card__tag--mid" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsSmartTag`)}>
              {row.alertsSmartTag}
            </Span>
            <P className="alert-card__headline">
              <Span data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsSmartHeadlineBefore`)}>
                {row.alertsSmartHeadlineBefore}
              </Span>
              <Span className="text-teal" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsSmartHeadlineHighlight`)}>
                {row.alertsSmartHeadlineHighlight}
              </Span>
              <Span data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsSmartHeadlineAfter`)}>
                {row.alertsSmartHeadlineAfter}
              </Span>
            </P>
            <P className="alert-card__body">
              <Span data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsSmartBodyBefore`)}>
                {row.alertsSmartBodyBefore}
              </Span>
              <Span className="text-teal" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsSmartBodyHighlight`)}>
                {row.alertsSmartBodyHighlight}
              </Span>
              <Span data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].alertsSmartBodyAfter`)}>
                {row.alertsSmartBodyAfter}
              </Span>
            </P>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}

function VisualBillPanel({ moduleName, index, row }: { moduleName?: string; index: number; row: ProgramRow }) {
  const drivers = getBillDriverRows(row);
  const useRepeaterPaths = Array.isArray(row.groupBillDriverRows) && row.groupBillDriverRows.length > 0;
  const tipLead = row.billTipLead != null && String(row.billTipLead).trim() !== '' ? String(row.billTipLead) : 'Recommended:';

  return (
    <Div className="program-block__visual">
      <Div className="program-visual">
        <P className="eyebrow" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].billVisualEyebrow`)}>
          {row.billVisualEyebrow}
        </P>
        <Div className="bill-panel">
          <Div className="bill-panel__head">
            <Span className="bill-panel__title" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].billPanelTitle`)}>
              {row.billPanelTitle}
            </Span>
            <Span className="bill-panel__pill" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].billPanelPill`)}>
              {row.billPanelPill}
            </Span>
          </Div>
          <Div className="bill-panel__body">
            <Div className="bill-panel__delta">
              <Span className="bill-panel__delta-val" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].billDeltaVal`)}>
                {row.billDeltaVal}
              </Span>
              <Span className="bill-panel__delta-hint" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].billDeltaHint`)}>
                {row.billDeltaHint}
              </Span>
            </Div>
            {drivers.map((dRow, di) =>
              useRepeaterPaths ? (
                <BillDriverRowVisual key={di} row={dRow} programRowIndex={index} driverIndex={di} moduleName={moduleName} />
              ) : (
                <BillDriverRowLegacyVisual
                  key={di}
                  row={dRow}
                  programRowIndex={index}
                  driverIndex={di as 0 | 1 | 2}
                  moduleName={moduleName}
                />
              ),
            )}
            <P className="bill-panel__tip">
              <Strong data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].billTipLead`)}>{tipLead}</Strong>{' '}
              <Span data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].billTip`)}>{row.billTip}</Span>
            </P>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}

function VisualPortal({ moduleName, index, row }: { moduleName?: string; index: number; row: ProgramRow }) {
  const tabs = getPortalTabs(row);
  const activeTabIndex = getActivePortalTabIndex(tabs);
  const bars = getPortalBars(row);
  const useRepeaterTabPaths = Array.isArray(row.groupPortalTabs) && row.groupPortalTabs.length > 0;
  const useRepeaterBarPaths = Array.isArray(row.groupPortalBars) && row.groupPortalBars.length > 0;

  const promoIcon = row.portalPromoIcon;
  const promoHasImage = Boolean(promoIcon?.src);

  const ctaText =
    row.portalPromoCta != null && String(row.portalPromoCta).trim() !== ''
      ? String(row.portalPromoCta)
      : 'Enroll Now';

  const ctaHref = getLinkFieldHref(row.portalPromoCtaLink) || '#';
  const ctaTarget = getLinkFieldTarget(row.portalPromoCtaLink);
  const ctaRel = getLinkFieldRel(row.portalPromoCtaLink);

  return (
    <Div className="program-block__visual">
      <Div className="program-visual">
        <P className="eyebrow" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].portalVisualEyebrow`)}>
          {row.portalVisualEyebrow}
        </P>
        <Div className="portal-frame">
          <Div className="portal-frame__nav">
            <Span className="portal-frame__title" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].portalNavTitle`)}>
              {row.portalNavTitle}
            </Span>
            <Div className="portal-tabs">
              {tabs.map((tab, ti) => (
                <Span
                  key={ti}
                  className={cx('portal-tab', ti === activeTabIndex ? 'portal-tab--active' : 'portal-tab--idle')}
                  {...(useRepeaterTabPaths
                    ? {
                        'data-hs-token': getDataHSToken(
                          moduleName,
                          `groupProgramRows[${index}].groupPortalTabs[${ti}].portalTabLabel`,
                        ),
                      }
                    : {})}
                >
                  {tab.portalTabLabel}
                </Span>
              ))}
            </Div>
          </Div>
          <Div className="portal-frame__body">
            <Div>
              <P className="portal-chart__label" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].portalChartLabel`)}>
                {row.portalChartLabel}
              </P>
              <Div className="portal-bars">
                {bars.map((bar, bi) => {
                  const barBase = `groupProgramRows[${index}].groupPortalBars[${bi}]`;
                  return (
                    <Div className="portal-bar" key={bi}>
                      <Div className="portal-bar__track">
                        <Div
                          className="portal-bar__fill"
                          style={{ height: `${clampPortalBarHeight(bar.portalBarFillPercent)}%` }}
                          {...(useRepeaterBarPaths
                            ? {
                                'data-hs-token': getDataHSToken(moduleName, `${barBase}.portalBarFillPercent`),
                              }
                            : {})}
                        />
                      </Div>
                      <Span
                        className="portal-bar__lbl"
                        {...(useRepeaterBarPaths
                          ? {
                              'data-hs-token': getDataHSToken(moduleName, `${barBase}.portalBarLabel`),
                            }
                          : {})}
                      >
                        {bar.portalBarLabel}
                      </Span>
                    </Div>
                  );
                })}
              </Div>
            </Div>
            <Div className="portal-promo">
              <Span className="portal-promo__icon" aria-hidden="true">
                {promoHasImage && promoIcon ? (
                  <Img
                    className="portal-promo__icon-img"
                    src={promoIcon.src}
                    alt={promoIcon.alt ?? ''}
                    width={promoIcon.width ?? undefined}
                    height={promoIcon.height ?? 24}
                    loading={promoIcon.loading && promoIcon.loading !== 'disabled' ? promoIcon.loading : 'lazy'}
                    decoding="async"
                    data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].portalPromoIcon`)}
                  />
                ) : (
                  <PortalPromoLightningFallback />
                )}
              </Span>
              <Div className="portal-promo__text">
                <Div className="portal-promo__title" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].portalPromoTitle`)}>
                  {row.portalPromoTitle}
                </Div>
                <Div className="portal-promo__sub" data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].portalPromoSub`)}>
                  {row.portalPromoSub}
                </Div>
              </Div>
              <A
                className="portal-promo__cta"
                href={ctaHref}
                data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].portalPromoCtaLink`)}
                {...(ctaTarget ? { target: ctaTarget, rel: ctaRel || undefined } : {})}
              >
                <Span data-hs-token={getDataHSToken(moduleName, `groupProgramRows[${index}].portalPromoCta`)}>
                  {ctaText}
                </Span>
                <PromoCtaArrowIcon />
              </A>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}

function ProgramRowArticle({
  moduleName,
  index,
  row,
}: {
  moduleName?: string;
  index: number;
  row: ProgramRow;
}) {
  const anchor = String(row.programAnchorId || '').trim();
  const diagram = diagramType(row);
  const reverse = isTruthyBoolean(row.programReverseLayout);
  const articleClass = cx('program-block', {
    'program-block--usage-alerts': diagram === 'alerts_compare',
    'program-block--reverse': reverse,
  });

  const visual =
    diagram === 'alerts_compare' ? (
      <VisualAlertsCompare moduleName={moduleName} index={index} row={row} />
    ) : diagram === 'bill_panel' ? (
      <VisualBillPanel moduleName={moduleName} index={index} row={row} />
    ) : (
      <VisualPortal moduleName={moduleName} index={index} row={row} />
    );

  return (
    <Article {...(anchor ? { id: anchor } : {})} className={articleClass}>
      <ProgramTextColumn moduleName={moduleName} index={index} row={row} />
      {visual}
    </Article>
  );
}

export const Component = (props: CeProgramsSectionProps) => {
  const { moduleName, groupProgramsIntro, groupProgramRows } = props;
  const reactId = useId();
  const headingId = `ce-programs-heading-${reactId.replace(/:/g, '')}`;
  const rows = Array.isArray(groupProgramRows) ? groupProgramRows : [];

  return (
    <Div className="customer-engagement-page">
      <Section className="section--programs" aria-labelledby={headingId}>
        <Div className="container">
          <Div className="programs-intro">
            <P className="eyebrow" data-hs-token={getDataHSToken(moduleName, 'groupProgramsIntro.programsEyebrow')}>
              {groupProgramsIntro.programsEyebrow}
            </P>
            <H2 id={headingId} className="section-heading">
              <Span data-hs-token={getDataHSToken(moduleName, 'groupProgramsIntro.programsHeadingBefore')}>
                {groupProgramsIntro.programsHeadingBefore}
              </Span>
              <Span
                className="headline-accent"
                data-hs-token={getDataHSToken(moduleName, 'groupProgramsIntro.programsHeadingAccent')}
              >
                {groupProgramsIntro.programsHeadingAccent}
              </Span>
              <Span data-hs-token={getDataHSToken(moduleName, 'groupProgramsIntro.programsHeadingAfter')}>
                {groupProgramsIntro.programsHeadingAfter}
              </Span>
            </H2>
            <P className="lead" data-hs-token={getDataHSToken(moduleName, 'groupProgramsIntro.programsLead')}>
              {groupProgramsIntro.programsLead}
            </P>
          </Div>

          {rows.map((row, index) => (
            <ProgramRowArticle key={index} moduleName={moduleName} index={index} row={row} />
          ))}
        </Div>
      </Section>
    </Div>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "isInEditor": is_in_editor
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Customer Engagement — programs / use cases',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: CeProgramsSectionSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_programs_section',
  version: 7,
  themeModule: true,
};
