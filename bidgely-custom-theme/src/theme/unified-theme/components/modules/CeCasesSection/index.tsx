import { useId } from 'react';
import type { TextFieldType, ImageFieldType, LinkFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { createComponent } from '../../utils/create-component.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import CeCasesSectionSvg from './assets/ce-cases-section.svg';
import arrowUpRightPng from './assets/arrow-up-right.png';

type PeerLogoRow = {
  logoImage: ImageFieldType['default'];
};

type MetricRow = {
  metricValue: TextFieldType['default'];
  metricLabel: TextFieldType['default'];
};

type CeCasesSectionProps = {
  moduleName?: string;
  hublData?: {
    isInEditor: boolean;
  };
  groupCeCasesHeading: {
    ceCasesEyebrow: TextFieldType['default'];
    ceCasesHeadingBefore: TextFieldType['default'];
    ceCasesHeadingAccent: TextFieldType['default'];
  };
  groupCeCasesLogos: {
    ceCasesPeerLabel: TextFieldType['default'];
  };
  groupCeCasesPeerLogos: PeerLogoRow[];
  groupCeCasesLeft: {
    ceCasesKicker: TextFieldType['default'];
    ceCasesTitle: TextFieldType['default'];
    ceCasesDesc: TextFieldType['default'];
    ceCasesBigValue: TextFieldType['default'];
    ceCasesBigLabel: TextFieldType['default'];
  };
  groupCeCasesRight: {
    ceCasesQuote: TextFieldType['default'];
    ceCasesDownloadLabel: TextFieldType['default'];
    ceCasesDownloadLink: LinkFieldType['default'];
  };
  groupCeCasesMetrics: MetricRow[];
};

const Section = createComponent('section');
const Div = createComponent('div');
const P = createComponent('p');
const H2 = createComponent('h2');
const H3 = createComponent('h3');
const Span = createComponent('span');
const Article = createComponent('article');
const Img = createComponent('img');
const A = createComponent('a');
const Blockquote = createComponent('blockquote');

export const Component = (props: CeCasesSectionProps) => {
  const {
    moduleName,
    groupCeCasesHeading,
    groupCeCasesLogos,
    groupCeCasesPeerLogos,
    groupCeCasesLeft,
    groupCeCasesRight,
    groupCeCasesMetrics,
  } = props;

  const reactId = useId();
  const headingId = `ce-cases-heading-${reactId.replace(/:/g, '')}`;

  const downloadHref = getLinkFieldHref(groupCeCasesRight.ceCasesDownloadLink) || '#';
  const downloadTarget = getLinkFieldTarget(groupCeCasesRight.ceCasesDownloadLink);
  const downloadRel = getLinkFieldRel(groupCeCasesRight.ceCasesDownloadLink);

  return (
    <Div className="customer-engagement-page">
      <Section className="section--cases" aria-labelledby={headingId}>
        <Div className="container">
          <P className="eyebrow" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesHeading.ceCasesEyebrow')}>
            {groupCeCasesHeading.ceCasesEyebrow}
          </P>
          <H2 id={headingId} className="section-heading section-heading--mb-lg">
            <Span data-hs-token={getDataHSToken(moduleName, 'groupCeCasesHeading.ceCasesHeadingBefore')}>
              {groupCeCasesHeading.ceCasesHeadingBefore}
            </Span>
            <Span className="headline-accent" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesHeading.ceCasesHeadingAccent')}>
              {groupCeCasesHeading.ceCasesHeadingAccent}
            </Span>
          </H2>

          <Div className="cases-logos" aria-label="Peer utilities">
            <P className="cases-logos__label" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesLogos.ceCasesPeerLabel')}>
              {groupCeCasesLogos.ceCasesPeerLabel}
            </P>
            <Div className="cases-logos__row">
              {groupCeCasesPeerLogos.map((row, index) => {
                const logo = row.logoImage;
                const hasLogo = Boolean(logo?.src);
                const imgLoading = logo?.loading && logo.loading !== 'disabled' ? logo.loading : 'lazy';
                if (!hasLogo) return null;
                return (
                  <Span className="cases-logo-pill" key={index}>
                    <Img
                      className="cases-logo__img"
                      src={logo.src}
                      alt={logo.alt ?? ''}
                      loading={imgLoading}
                      decoding="async"
                      data-hs-token={getDataHSToken(moduleName, `groupCeCasesPeerLogos[${index}].logoImage`)}
                    />
                  </Span>
                );
              })}
            </Div>
          </Div>

          <Article className="case-feature" aria-label="Featured case study">
            <Div className="case-feature__left">
              <P className="case-feature__kicker" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesLeft.ceCasesKicker')}>
                {groupCeCasesLeft.ceCasesKicker}
              </P>
              <H3 className="case-feature__title" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesLeft.ceCasesTitle')}>
                {groupCeCasesLeft.ceCasesTitle}
              </H3>
              <P className="case-feature__desc" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesLeft.ceCasesDesc')}>
                {groupCeCasesLeft.ceCasesDesc}
              </P>

              <Div className="case-feature__big-stat">
                <P className="case-feature__big-num" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesLeft.ceCasesBigValue')}>
                  {groupCeCasesLeft.ceCasesBigValue}
                </P>
                <P className="case-feature__big-sub" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesLeft.ceCasesBigLabel')}>
                  {groupCeCasesLeft.ceCasesBigLabel}
                </P>
              </Div>
            </Div>

            <Div className="case-feature__right">
              <Blockquote className="case-feature__quote" data-hs-token={getDataHSToken(moduleName, 'groupCeCasesRight.ceCasesQuote')}>
                {groupCeCasesRight.ceCasesQuote}
              </Blockquote>

              <Div className="case-feature__metrics">
                {groupCeCasesMetrics.map((m, index) => (
                  <Div className="case-metric" key={index}>
                    <P className="case-metric__value" data-hs-token={getDataHSToken(moduleName, `groupCeCasesMetrics[${index}].metricValue`)}>
                      {m.metricValue}
                    </P>
                    <P className="case-metric__label" data-hs-token={getDataHSToken(moduleName, `groupCeCasesMetrics[${index}].metricLabel`)}>
                      {m.metricLabel}
                    </P>
                  </Div>
                ))}
              </Div>

              <A
                className="case-feature__download"
                href={downloadHref}
                {...(downloadTarget ? { target: downloadTarget, rel: downloadRel || undefined } : {})}
                data-hs-token={getDataHSToken(moduleName, 'groupCeCasesRight.ceCasesDownloadLink')}
              >
                <Span data-hs-token={getDataHSToken(moduleName, 'groupCeCasesRight.ceCasesDownloadLabel')}>
                  {groupCeCasesRight.ceCasesDownloadLabel}
                </Span>
                <Img className="case-feature__download-icon" src={arrowUpRightPng} alt="" aria-hidden="true" decoding="async" />
              </A>
            </Div>
          </Article>
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
  label: 'Customer Engagement — proven results',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: CeCasesSectionSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_cases_section',
  version: 1,
  themeModule: true,
};

