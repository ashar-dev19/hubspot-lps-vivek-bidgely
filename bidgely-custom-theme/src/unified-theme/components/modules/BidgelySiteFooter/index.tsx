import type { TextFieldType, ImageFieldType, LinkFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { createComponent } from '../../utils/create-component.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import BidgelySiteFooterSvg from './assets/bidgely-site-footer.svg';

type ColumnLink = {
  linkLabel: TextFieldType['default'];
  linkUrl: LinkFieldType['default'];
};

type FooterColumn = {
  columnHeading: TextFieldType['default'];
  columnListAriaLabel: TextFieldType['default'];
  groupColumnLinks: ColumnLink[];
};

type BidgelySiteFooterProps = {
  moduleName?: string;
  hublData?: {
    isInEditor: boolean;
  };
  groupFooterBrand: {
    footerLogo: ImageFieldType['default'];
    brandLink: LinkFieldType['default'];
    logoAriaLabel: TextFieldType['default'];
  };
  groupFooterColumns: FooterColumn[];
  groupFooterLegal: {
    termsLabel: TextFieldType['default'];
    termsLink: LinkFieldType['default'];
    privacyLabel: TextFieldType['default'];
    privacyLink: LinkFieldType['default'];
    copyrightText: TextFieldType['default'];
  };
};

const Footer = createComponent('footer');
const Div = createComponent('div');
const A = createComponent('a');
const Nav = createComponent('nav');
const H2 = createComponent('h2');
const Ul = createComponent('ul');
const Li = createComponent('li');
const P = createComponent('p');
const Span = createComponent('span');
const Img = createComponent('img');

export const Component = (props: BidgelySiteFooterProps) => {
  const { moduleName, groupFooterBrand, groupFooterColumns, groupFooterLegal } = props;

  const brandHref = getLinkFieldHref(groupFooterBrand.brandLink) || '/';
  const brandTarget = getLinkFieldTarget(groupFooterBrand.brandLink);
  const brandRel = getLinkFieldRel(groupFooterBrand.brandLink);

  const logo = groupFooterBrand.footerLogo;
  const hasLogo = Boolean(logo?.src);
  const imgLoading = logo?.loading && logo.loading !== 'disabled' ? logo.loading : 'lazy';

  const termsHref = getLinkFieldHref(groupFooterLegal.termsLink) || '#';
  const termsTarget = getLinkFieldTarget(groupFooterLegal.termsLink);
  const termsRel = getLinkFieldRel(groupFooterLegal.termsLink);

  const privacyHref = getLinkFieldHref(groupFooterLegal.privacyLink) || '#';
  const privacyTarget = getLinkFieldTarget(groupFooterLegal.privacyLink);
  const privacyRel = getLinkFieldRel(groupFooterLegal.privacyLink);

  return (
    <Div className="customer-engagement-page">
      <Footer className="site-footer">
        <Div className="container site-footer__main">
        <A
          href={brandHref}
          className="site-footer__logo"
          aria-label={groupFooterBrand.logoAriaLabel || 'Home'}
          {...(brandTarget ? { target: brandTarget, rel: brandRel || 'noopener' } : {})}
          data-hs-token={getDataHSToken(moduleName, 'groupFooterBrand.brandLink')}
        >
          {hasLogo ? (
            <Img
              className="site-footer__logo-img"
              src={logo.src}
              alt={logo.alt ?? ''}
              width={logo.width ?? 160}
              height={logo.height ?? 44}
              loading={imgLoading}
              decoding="async"
              data-hs-token={getDataHSToken(moduleName, 'groupFooterBrand.footerLogo')}
            />
          ) : null}
        </A>
          <Nav className="site-footer__cols" aria-label="Footer">
          {groupFooterColumns.map((col, colIndex) => {
            const heading = (col.columnHeading ?? '').toString().trim();
            const listAria = (col.columnListAriaLabel ?? '').toString().trim();
            const listAriaProps = listAria ? { 'aria-label': listAria } : {};

            return (
              <Div className="site-footer__col" key={colIndex}>
                {heading ? (
                  <H2 className="site-footer__heading" data-hs-token={getDataHSToken(moduleName, `groupFooterColumns[${colIndex}].columnHeading`)}>
                    {col.columnHeading}
                  </H2>
                ) : null}
                <Ul className="site-footer__list" {...listAriaProps}>
                  {col.groupColumnLinks.map((row, linkIndex) => {
                    const href = getLinkFieldHref(row.linkUrl) || '#';
                    const target = getLinkFieldTarget(row.linkUrl);
                    const rel = getLinkFieldRel(row.linkUrl);
                    return (
                      <Li key={linkIndex}>
                        <A
                          href={href}
                          {...(target ? { target, rel: rel || 'noopener' } : {})}
                          data-hs-token={getDataHSToken(moduleName, `groupFooterColumns[${colIndex}].groupColumnLinks[${linkIndex}].linkUrl`)}
                        >
                          {row.linkLabel}
                        </A>
                      </Li>
                    );
                  })}
                </Ul>
              </Div>
            );
          })}
          </Nav>
        </Div>
        <Div className="container site-footer__bar">
          <Div className="site-footer__legal">
          <A
            href={termsHref}
            {...(termsTarget ? { target: termsTarget, rel: termsRel || 'noopener' } : {})}
            data-hs-token={getDataHSToken(moduleName, 'groupFooterLegal.termsLink')}
          >
            {groupFooterLegal.termsLabel}
          </A>
          <Span className="site-footer__sep" aria-hidden="true">
            |
          </Span>
          <A
            href={privacyHref}
            {...(privacyTarget ? { target: privacyTarget, rel: privacyRel || 'noopener' } : {})}
            data-hs-token={getDataHSToken(moduleName, 'groupFooterLegal.privacyLink')}
          >
            {groupFooterLegal.privacyLabel}
          </A>
          </Div>
          <P className="site-footer__copy" data-hs-token={getDataHSToken(moduleName, 'groupFooterLegal.copyrightText')}>
            {groupFooterLegal.copyrightText}
          </P>
        </Div>
      </Footer>
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
  label: 'Bidgely — site footer',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: BidgelySiteFooterSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/bidgely_site_footer',
  version: 2,
  themeModule: true,
};
