import type { TextFieldType, LinkFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { createComponent } from '../../utils/create-component.js';
import HeroSectionSvg from './assets/ce-hero-section.svg';

type CeHeroSectionProps = {
  hublData: {
    isInEditor: boolean;
  };
  groupCeHero: {
    ceEyebrow: TextFieldType['default'];
    ceHeadingBeforeAccent: TextFieldType['default'];
    ceHeadingAccent: TextFieldType['default'];
    ceTagline: TextFieldType['default'];
  };
  groupCeHeroCta: {
    ceCtaText: TextFieldType['default'];
    ceCtaLink: LinkFieldType['default'];
  };
};

const Section = createComponent('section');
const Div = createComponent('div');
const P = createComponent('p');
const H1 = createComponent('h1');
const Span = createComponent('span');
const A = createComponent('a');

const HERO_HEADING_ID = 'hero-heading';

export const Component = (props: CeHeroSectionProps) => {
  const { groupCeHero, groupCeHeroCta } = props;
  const href = getLinkFieldHref(groupCeHeroCta.ceCtaLink) || '#';
  const target = getLinkFieldTarget(groupCeHeroCta.ceCtaLink);
  const rel = getLinkFieldRel(groupCeHeroCta.ceCtaLink);

  return (
    <Div className="customer-engagement-page">
      <Section className="hero" aria-labelledby={HERO_HEADING_ID}>
        <Div className="hero__grid" aria-hidden="true" />
        <Div className="hero__inner">
          <Div className="hero__col-left">
            <P className="eyebrow">{groupCeHero.ceEyebrow}</P>
            <H1 id={HERO_HEADING_ID} className="hero__title">
              {groupCeHero.ceHeadingBeforeAccent}
              <Span className="text-teal-bold">{groupCeHero.ceHeadingAccent}</Span>
            </H1>
            <Div>
              <A
                className="btn btn--dark"
                href={href}
                {...(target ? { target, rel: rel || undefined } : {})}
              >
                {groupCeHeroCta.ceCtaText}
              </A>
            </Div>
          </Div>
          <Div className="hero__col-right">
            <P className="hero__tagline">{groupCeHero.ceTagline}</P>
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
  label: 'Customer Engagement Hero Section',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: HeroSectionSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_hero_section',
  version: 4,
  themeModule: true,
};
