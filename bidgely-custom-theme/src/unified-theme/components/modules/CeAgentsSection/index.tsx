import { useId } from 'react';
import type { TextFieldType, ImageFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { createComponent } from '../../utils/create-component.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import CeAgentsSectionSvg from './assets/ce-agents-section.svg';

type AgentCardRow = {
  cardIcon: ImageFieldType['default'];
  cardTitle: TextFieldType['default'];
  cardBody: TextFieldType['default'];
  cardStat: TextFieldType['default'];
};

type CeAgentsSectionProps = {
  moduleName?: string;
  hublData?: {
    isInEditor: boolean;
  };
  groupCeAgentsIntro: {
    ceAgentsEyebrow: TextFieldType['default'];
    ceAgentsHeading: TextFieldType['default'];
    ceAgentsLead: TextFieldType['default'];
  };
  groupCeAgentsValue: {
    ceAgentsValueEyebrow: TextFieldType['default'];
    ceAgentsValueNum: TextFieldType['default'];
    ceAgentsValueDesc: TextFieldType['default'];
  };
  groupCeAgentCards: AgentCardRow[];
};

const Section = createComponent('section');
const Div = createComponent('div');
const P = createComponent('p');
const H2 = createComponent('h2');
const H3 = createComponent('h3');
const Article = createComponent('article');
const Img = createComponent('img');

export const Component = (props: CeAgentsSectionProps) => {
  const { moduleName, groupCeAgentsIntro, groupCeAgentsValue, groupCeAgentCards } = props;
  const reactId = useId();
  const headingId = `ce-agents-heading-${reactId.replace(/:/g, '')}`;

  return (
    <Div className="customer-engagement-page">
      <Section className="section--agents" aria-labelledby={headingId}>
        <Div className="section--agents__glow" aria-hidden="true" />
        <Div className="container">
          <Div className="agents-intro">
            <Div>
              <P
                className="eyebrow eyebrow--on-dark"
                data-hs-token={getDataHSToken(moduleName, 'groupCeAgentsIntro.ceAgentsEyebrow')}
              >
                {groupCeAgentsIntro.ceAgentsEyebrow}
              </P>
              <H2
                id={headingId}
                className="section-heading section-heading--white"
                data-hs-token={getDataHSToken(moduleName, 'groupCeAgentsIntro.ceAgentsHeading')}
              >
                {groupCeAgentsIntro.ceAgentsHeading}
              </H2>
              <P
                className="lead lead--on-dark"
                data-hs-token={getDataHSToken(moduleName, 'groupCeAgentsIntro.ceAgentsLead')}
              >
                {groupCeAgentsIntro.ceAgentsLead}
              </P>
            </Div>
            <Div className="agents-intro__aside">
              <Div className="agents-value">
                <P
                  className="eyebrow eyebrow--sm"
                  data-hs-token={getDataHSToken(moduleName, 'groupCeAgentsValue.ceAgentsValueEyebrow')}
                >
                  {groupCeAgentsValue.ceAgentsValueEyebrow}
                </P>
                <P
                  className="agents-value__num"
                  data-hs-token={getDataHSToken(moduleName, 'groupCeAgentsValue.ceAgentsValueNum')}
                >
                  {groupCeAgentsValue.ceAgentsValueNum}
                </P>
                <P
                  className="agents-value__desc"
                  data-hs-token={getDataHSToken(moduleName, 'groupCeAgentsValue.ceAgentsValueDesc')}
                >
                  {groupCeAgentsValue.ceAgentsValueDesc}
                </P>
              </Div>
            </Div>
          </Div>

          <Div className="agent-grid">
            {groupCeAgentCards.map((row, index) => {
              const icon = row.cardIcon;
              const hasIcon = Boolean(icon?.src);
              const imgLoading =
                icon?.loading && icon.loading !== 'disabled' ? icon.loading : 'lazy';
              return (
                <Article className="agent-card" key={index}>
                  <Div className="agent-card__icon" aria-hidden="true">
                    {hasIcon ? (
                      <Img
                        src={icon.src}
                        alt={icon.alt ?? ''}
                        width={icon.width ?? 28}
                        height={icon.height ?? 28}
                        loading={imgLoading}
                        decoding="async"
                        data-hs-token={getDataHSToken(
                          moduleName,
                          `groupCeAgentCards[${index}].cardIcon`,
                        )}
                      />
                    ) : null}
                  </Div>
                  <H3
                    className="agent-card__title"
                    data-hs-token={getDataHSToken(moduleName, `groupCeAgentCards[${index}].cardTitle`)}
                  >
                    {row.cardTitle}
                  </H3>
                  <P
                    className="agent-card__body"
                    data-hs-token={getDataHSToken(moduleName, `groupCeAgentCards[${index}].cardBody`)}
                  >
                    {row.cardBody}
                  </P>
                  <P
                    className="agent-card__stat"
                    data-hs-token={getDataHSToken(moduleName, `groupCeAgentCards[${index}].cardStat`)}
                  >
                    {row.cardStat}
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
  label: 'Customer Engagement — agentic automation',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: CeAgentsSectionSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_agents_section',
  version: 1,
  themeModule: true,
};
