import type {
  TextFieldType,
  BooleanFieldType,
  NumberFieldType,
  LinkFieldType,
  ImageFieldType,
} from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { createComponent } from '../../utils/create-component.js';
import cx from '../../utils/classnames.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import MockSectionSvg from './assets/ce-mock-product-section.svg';

const Section = createComponent('section');
const Div = createComponent('div');
const Span = createComponent('span');
const P = createComponent('p');
const Aside = createComponent('aside');
const A = createComponent('a');
const Img = createComponent('img');
const Svg = createComponent('svg');
const Path = createComponent('path');

type InsightCardRow = {
  insightLabel: TextFieldType['default'];
  insightValue: TextFieldType['default'];
  insightHint: TextFieldType['default'];
  insightCardAccent: BooleanFieldType['default'];
  insightValueGradient: BooleanFieldType['default'];
  insightGroupHeadingPrice: BooleanFieldType['default'];
};

type ApplianceRow = {
  applianceIcon: ImageFieldType['default'];
  applianceLabel: TextFieldType['default'];
  applianceBarPercent: NumberFieldType['default'];
  applianceAmount: TextFieldType['default'];
};

type StatTileRow = {
  statLabel: TextFieldType['default'];
  statValue: TextFieldType['default'];
  statHint: TextFieldType['default'];
};

type CeMockProductSectionProps = {
  moduleName?: string;
  /** Passed from HubL when `hublDataTemplate` is present */
  hublData?: {
    isInEditor: boolean;
  };
  mockSectionAriaLabel: TextFieldType['default'];
  groupFloaterLeft: {
    leftFloaterLabel: TextFieldType['default'];
    leftFloaterValue: TextFieldType['default'];
    leftFloaterHint: TextFieldType['default'];
  };
  groupFloaterRight: {
    rightFloaterLabel: TextFieldType['default'];
    rightFloaterValue: TextFieldType['default'];
    rightFloaterHint: TextFieldType['default'];
  };
  groupMockChrome: {
    mockWindowTitle: TextFieldType['default'];
  };
  groupMockCustomer: {
    mockAvatarText: TextFieldType['default'];
    mockCustomerName: TextFieldType['default'];
    mockCustomerMeta: TextFieldType['default'];
    mockCustomerBadge: TextFieldType['default'];
  };
  groupInsightCards: InsightCardRow[];
  groupApplianceRows: ApplianceRow[];
  groupMockAction: {
    mockActionText: TextFieldType['default'];
    mockActionButtonLabel: TextFieldType['default'];
    mockActionLink: LinkFieldType['default'];
  };
  groupImpactCard: {
    impactTag: TextFieldType['default'];
    impactStat: TextFieldType['default'];
    impactDesc: TextFieldType['default'];
  };
  groupStatTiles: StatTileRow[];
};

function clampBarPercent(value: NumberFieldType['default']): number {
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value));
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function MockActionArrowIcon() {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        d="M4.66667 11.3332L11.3333 4.6665"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.66667 4.6665H11.3333V11.3332"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const Component = (props: CeMockProductSectionProps) => {
  const {
    moduleName,
    mockSectionAriaLabel,
    groupFloaterLeft,
    groupFloaterRight,
    groupMockChrome,
    groupMockCustomer,
    groupInsightCards,
    groupApplianceRows,
    groupMockAction,
    groupImpactCard,
    groupStatTiles,
  } = props;

  const actionHref = getLinkFieldHref(groupMockAction.mockActionLink) || '#';
  const actionTarget = getLinkFieldTarget(groupMockAction.mockActionLink);
  const actionRel = getLinkFieldRel(groupMockAction.mockActionLink);

  return (
    <Div className="customer-engagement-page">
      <Section
        className="mock-section"
        aria-label={mockSectionAriaLabel || 'Product preview'}
        data-hs-token={getDataHSToken(moduleName, 'mockSectionAriaLabel')}
      >
        <Div className="container">
          <Div className="mock-shell">
            <Aside className="mock-floater mock-floater--left" aria-hidden="true">
              <P
                className="mock-floater__label"
                data-hs-token={getDataHSToken(moduleName, 'groupFloaterLeft.leftFloaterLabel')}
              >
                {groupFloaterLeft.leftFloaterLabel}
              </P>
              <P
                className="mock-floater__value"
                data-hs-token={getDataHSToken(moduleName, 'groupFloaterLeft.leftFloaterValue')}
              >
                {groupFloaterLeft.leftFloaterValue}
              </P>
              <P
                className="mock-floater__hint"
                data-hs-token={getDataHSToken(moduleName, 'groupFloaterLeft.leftFloaterHint')}
              >
                {groupFloaterLeft.leftFloaterHint}
              </P>
            </Aside>
            <Aside className="mock-floater mock-floater--right" aria-hidden="true">
              <P
                className="mock-floater__label"
                data-hs-token={getDataHSToken(moduleName, 'groupFloaterRight.rightFloaterLabel')}
              >
                {groupFloaterRight.rightFloaterLabel}
              </P>
              <P
                className="mock-floater__value"
                data-hs-token={getDataHSToken(moduleName, 'groupFloaterRight.rightFloaterValue')}
              >
                {groupFloaterRight.rightFloaterValue}
              </P>
              <P
                className="mock-floater__hint"
                data-hs-token={getDataHSToken(moduleName, 'groupFloaterRight.rightFloaterHint')}
              >
                {groupFloaterRight.rightFloaterHint}
              </P>
            </Aside>

            <Div className="mock-window">
              <Div className="mock-window__chrome">
                <Span className="mock-window__dot mock-window__dot--red" aria-hidden="true" />
                <Span className="mock-window__dot mock-window__dot--yellow" aria-hidden="true" />
                <Span className="mock-window__dot mock-window__dot--green" aria-hidden="true" />
                <Span
                  className="mock-window__title"
                  data-hs-token={getDataHSToken(moduleName, 'groupMockChrome.mockWindowTitle')}
                >
                  {groupMockChrome.mockWindowTitle}
                </Span>
              </Div>
              <Div className="mock-window__body">
                <Div className="mock-window__main">
                  <Div className="mock-customer">
                    <Div
                      className="mock-customer__avatar"
                      aria-hidden="true"
                      data-hs-token={getDataHSToken(moduleName, 'groupMockCustomer.mockAvatarText')}
                    >
                      {groupMockCustomer.mockAvatarText}
                    </Div>
                    <Div>
                      <Div
                        className="mock-customer__name"
                        data-hs-token={getDataHSToken(moduleName, 'groupMockCustomer.mockCustomerName')}
                      >
                        {groupMockCustomer.mockCustomerName}
                      </Div>
                      <Div
                        className="mock-customer__meta"
                        data-hs-token={getDataHSToken(moduleName, 'groupMockCustomer.mockCustomerMeta')}
                      >
                        {groupMockCustomer.mockCustomerMeta}
                      </Div>
                    </Div>
                    <Span
                      className="mock-customer__badge"
                      data-hs-token={getDataHSToken(moduleName, 'groupMockCustomer.mockCustomerBadge')}
                    >
                      {groupMockCustomer.mockCustomerBadge}
                    </Span>
                  </Div>

                  <Div className="insight-row">
                    {groupInsightCards.map((card, index) => {
                      const groupHeading = card.insightGroupHeadingPrice === true;
                      return (
                        <Div
                          key={index}
                          className={cx('insight-card', { 'insight-card--accent': card.insightCardAccent })}
                        >
                          {groupHeading ? (
                            <>
                              <Div className="insight-card__heading-price">
                                <Div
                                  className="insight-card__label"
                                  data-hs-token={getDataHSToken(
                                    moduleName,
                                    `groupInsightCards[${index}].insightLabel`,
                                  )}
                                >
                                  {card.insightLabel}
                                </Div>
                                <Div
                                  className={cx('insight-card__value', {
                                    'insight-card__value--gradient': card.insightValueGradient,
                                  })}
                                  data-hs-token={getDataHSToken(
                                    moduleName,
                                    `groupInsightCards[${index}].insightValue`,
                                  )}
                                >
                                  {card.insightValue}
                                </Div>
                              </Div>
                              <Div
                                className="insight-card__hint"
                                data-hs-token={getDataHSToken(moduleName, `groupInsightCards[${index}].insightHint`)}
                              >
                                {card.insightHint}
                              </Div>
                            </>
                          ) : (
                            <>
                              <Div
                                className="insight-card__label"
                                data-hs-token={getDataHSToken(moduleName, `groupInsightCards[${index}].insightLabel`)}
                              >
                                {card.insightLabel}
                              </Div>
                              <Div
                                className={cx('insight-card__value', {
                                  'insight-card__value--gradient': card.insightValueGradient,
                                })}
                                data-hs-token={getDataHSToken(moduleName, `groupInsightCards[${index}].insightValue`)}
                              >
                                {card.insightValue}
                              </Div>
                              <Div
                                className="insight-card__hint"
                                data-hs-token={getDataHSToken(moduleName, `groupInsightCards[${index}].insightHint`)}
                              >
                                {card.insightHint}
                              </Div>
                            </>
                          )}
                        </Div>
                      );
                    })}
                  </Div>

                  <Div className="appliance-list">
                    {groupApplianceRows.map((row, index) => {
                      const icon = row.applianceIcon;
                      const hasIcon = Boolean(icon?.src);
                      const imgLoading =
                        icon?.loading && icon.loading !== 'disabled' ? icon.loading : 'eager';
                      return (
                      <Div className="appliance-row" key={index}>
                        <Span className="appliance-row__icon" aria-hidden="true">
                          {hasIcon ? (
                            <Img
                              className="appliance-row__icon-img"
                              src={icon.src}
                              alt={icon.alt ?? ''}
                              width={icon.width ?? 22}
                              height={icon.height ?? 22}
                              loading={imgLoading}
                              data-hs-token={getDataHSToken(moduleName, `groupApplianceRows[${index}].applianceIcon`)}
                            />
                          ) : null}
                        </Span>
                        <Span
                          className="appliance-row__label"
                          data-hs-token={getDataHSToken(moduleName, `groupApplianceRows[${index}].applianceLabel`)}
                        >
                          {row.applianceLabel}
                        </Span>
                        <Span className="appliance-row__track">
                          <Span
                            className="appliance-row__fill"
                            style={{ width: `${clampBarPercent(row.applianceBarPercent)}%` }}
                          />
                        </Span>
                        <Span
                          className="appliance-row__amt"
                          data-hs-token={getDataHSToken(moduleName, `groupApplianceRows[${index}].applianceAmount`)}
                        >
                          {row.applianceAmount}
                        </Span>
                      </Div>
                    );
                    })}
                  </Div>

                  <Div className="mock-action">
                    <P
                      className="mock-action__text"
                      data-hs-token={getDataHSToken(moduleName, 'groupMockAction.mockActionText')}
                    >
                      {groupMockAction.mockActionText}
                    </P>
                    <A
                      className="btn"
                      href={actionHref}
                      data-hs-token={getDataHSToken(moduleName, 'groupMockAction.mockActionButtonLabel')}
                      {...(actionTarget ? { target: actionTarget, rel: actionRel || undefined } : {})}
                    >
                      {groupMockAction.mockActionButtonLabel}
                      <MockActionArrowIcon />
                    </A>
                  </Div>
                </Div>

                <Aside className="mock-side">
                  <Div className="impact-card">
                    <Span
                      className="impact-card__tag"
                      data-hs-token={getDataHSToken(moduleName, 'groupImpactCard.impactTag')}
                    >
                      {groupImpactCard.impactTag}
                    </Span>
                    <Div
                      className="impact-card__stat"
                      data-hs-token={getDataHSToken(moduleName, 'groupImpactCard.impactStat')}
                    >
                      {groupImpactCard.impactStat}
                    </Div>
                    <P
                      className="impact-card__desc"
                      data-hs-token={getDataHSToken(moduleName, 'groupImpactCard.impactDesc')}
                    >
                      {groupImpactCard.impactDesc}
                    </P>
                  </Div>
                  <Div className="stat-grid">
                    {groupStatTiles.map((tile, index) => (
                      <Div className="stat-tile" key={index}>
                        <Div
                          className="stat-tile__label"
                          data-hs-token={getDataHSToken(moduleName, `groupStatTiles[${index}].statLabel`)}
                        >
                          {tile.statLabel}
                        </Div>
                        <Div
                          className="stat-tile__value"
                          data-hs-token={getDataHSToken(moduleName, `groupStatTiles[${index}].statValue`)}
                        >
                          {tile.statValue}
                        </Div>
                        <Div
                          className="stat-tile__hint"
                          data-hs-token={getDataHSToken(moduleName, `groupStatTiles[${index}].statHint`)}
                        >
                          {tile.statHint}
                        </Div>
                      </Div>
                    ))}
                  </Div>
                </Aside>
              </Div>
            </Div>
          </Div>
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
  label: 'Customer Engagement — product mock',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: MockSectionSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_mock_product_section',
  version: 3,
  themeModule: true,
};
