import { useId } from 'react';
import type { TextFieldType, ImageFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { createComponent } from '../../utils/create-component.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import CeCapabilitiesSectionSvg from './assets/ce-capabilities-section.svg';

type CapCardRow = {
  cardIcon: ImageFieldType['default'];
  cardTitle: TextFieldType['default'];
  cardText: TextFieldType['default'];
};

type CeCapabilitiesSectionProps = {
  moduleName?: string;
  hublData?: {
    isInEditor: boolean;
  };
  groupCeCapIntro: {
    ceCapEyebrow: TextFieldType['default'];
    ceCapHeadingBefore: TextFieldType['default'];
    ceCapHeadingAccent: TextFieldType['default'];
    ceCapLead: TextFieldType['default'];
  };
  groupCeCapabilityCards: CapCardRow[];
};

const Section = createComponent('section');
const Div = createComponent('div');
const P = createComponent('p');
const H2 = createComponent('h2');
const H3 = createComponent('h3');
const Span = createComponent('span');
const Article = createComponent('article');
const Img = createComponent('img');

export const Component = (props: CeCapabilitiesSectionProps) => {
  const { moduleName, groupCeCapIntro, groupCeCapabilityCards } = props;
  const reactId = useId();
  const headingId = `ce-cap-heading-${reactId.replace(/:/g, '')}`;

  return (
    <Div className="customer-engagement-page">
      <Section className="section-capabilities" aria-labelledby={headingId}>
        <Div className="container">
          <Div className="jtbd-head">
            <P
              className="eyebrow"
              data-hs-token={getDataHSToken(moduleName, 'groupCeCapIntro.ceCapEyebrow')}
            >
              {groupCeCapIntro.ceCapEyebrow}
            </P>
            <H2 id={headingId} className="section-heading">
              <Span data-hs-token={getDataHSToken(moduleName, 'groupCeCapIntro.ceCapHeadingBefore')}>
                {groupCeCapIntro.ceCapHeadingBefore}
              </Span>
              <Span
                className="headline-accent"
                data-hs-token={getDataHSToken(moduleName, 'groupCeCapIntro.ceCapHeadingAccent')}
              >
                {groupCeCapIntro.ceCapHeadingAccent}
              </Span>
            </H2>
            <P
              className="jtbd-head__lead"
              data-hs-token={getDataHSToken(moduleName, 'groupCeCapIntro.ceCapLead')}
            >
              {groupCeCapIntro.ceCapLead}
            </P>
          </Div>
          <Div className="jtbd-grid">
            {groupCeCapabilityCards.map((row, index) => {
              const icon = row.cardIcon;
              const hasIcon = Boolean(icon?.src);
              const imgLoading =
                icon?.loading && icon.loading !== 'disabled' ? icon.loading : 'lazy';
              return (
                <Article className="jtbd-card" key={index}>
                  {hasIcon ? (
                    <Img
                      className="jtbd-card__icon"
                      src={icon.src}
                      alt={icon.alt ?? ''}
                      width={icon.width ?? 56}
                      height={icon.height ?? 56}
                      loading={imgLoading}
                      decoding="async"
                      data-hs-token={getDataHSToken(
                        moduleName,
                        `groupCeCapabilityCards[${index}].cardIcon`,
                      )}
                    />
                  ) : null}
                  <H3
                    className="jtbd-card__title"
                    data-hs-token={getDataHSToken(moduleName, `groupCeCapabilityCards[${index}].cardTitle`)}
                  >
                    {row.cardTitle}
                  </H3>
                  <P
                    className="jtbd-card__text"
                    data-hs-token={getDataHSToken(moduleName, `groupCeCapabilityCards[${index}].cardText`)}
                  >
                    {row.cardText}
                  </P>
                </Article>
              );
            })}
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
  label: 'Customer Engagement — capabilities',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: CeCapabilitiesSectionSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_capabilities_section',
  version: 4,
  themeModule: true,
};
