import { useId } from 'react';
import type { TextFieldType, LinkFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { createComponent } from '../../utils/create-component.js';
import CeDemoCtaSvg from './assets/ce-demo-cta.svg';

type CeDemoCtaProps = {
  hublData: {
    isInEditor: boolean;
  };
  groupCeDemoCta: {
    ceDemoTitle: TextFieldType['default'];
    ceDemoCtaText: TextFieldType['default'];
    ceDemoCtaLink: LinkFieldType['default'];
  };
};

const Section = createComponent('section');
const Div = createComponent('div');
const H2 = createComponent('h2');
const A = createComponent('a');

export const Component = (props: CeDemoCtaProps) => {
  const { groupCeDemoCta } = props;
  const reactId = useId();
  const headingId = `ce-demo-cta-heading-${reactId.replace(/:/g, '')}`;
  const href = getLinkFieldHref(groupCeDemoCta.ceDemoCtaLink) || '#';
  const target = getLinkFieldTarget(groupCeDemoCta.ceDemoCtaLink);
  const rel = getLinkFieldRel(groupCeDemoCta.ceDemoCtaLink);

  return (
    <Div className="customer-engagement-page">
      <Section className="demo-cta" aria-labelledby={headingId}>
        <Div className="demo-cta__grid" aria-hidden="true" />
        <Div className="demo-cta__inner container">
          <H2 id={headingId} className="demo-cta__title">
            {groupCeDemoCta.ceDemoTitle}
          </H2>
          <A
            className="btn btn--xl"
            href={href}
            {...(target ? { target, rel: rel || undefined } : {})}
          >
            {groupCeDemoCta.ceDemoCtaText}
          </A>
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
  label: 'Customer Engagement — demo CTA',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: CeDemoCtaSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_demo_cta',
  version: 1,
  themeModule: true,
};
