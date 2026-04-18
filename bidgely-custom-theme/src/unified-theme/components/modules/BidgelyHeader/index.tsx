import { useId } from 'react';
import type { LinkFieldType, TextFieldType, BooleanFieldType, LogoFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { PlaceholderEmptyContent } from '../../PlaceholderComponent/PlaceholderEmptyContent.js';
import HeaderSvg from './assets/bidgely-header.svg';

type NavItem = {
  label: string;
  url: string;
  linkTarget?: string;
  children?: NavItem[];
};

type BidgelyHeaderProps = {
  hublData: {
    navigation: { children: NavItem[] };
    isInEditor: boolean;
    defaultLogo: LogoFieldType['default'];
  };
  groupNavigation: {
    menu: string;
    navAriaLabel: TextFieldType['default'];
  };
  groupLogo: {
    logo?: LogoFieldType['default'];
    logoMark: TextFieldType['default'];
    logoSuffix: TextFieldType['default'];
    brandLink: LinkFieldType['default'];
  };
  groupCtas: {
    showSecondaryCta: BooleanFieldType['default'];
    secondaryCtaText: TextFieldType['default'];
    secondaryCtaLink: LinkFieldType['default'];
    primaryCtaText: TextFieldType['default'];
    primaryCtaLink: LinkFieldType['default'];
  };
};

const Chevron = () => (
  <svg className="site-nav__chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function NavList({ items }: { items: NavItem[] }) {
  return (
    <ul className="site-nav">
      {items.map((item, i) => {
        const hasChildren = item.children && item.children.length > 0;
        const itemHref = item.url || '#';
        if (hasChildren) {
          return (
            <li key={i} className="site-nav__item site-nav__item--has-sub">
              <details className="site-nav__details" name="bidgely-site-nav-dropdowns">
                <summary className="site-nav__dropdown">
                  {item.label}
                  <Chevron />
                </summary>
                <ul className="site-nav__sub">
                  {item.children!.map((sub, j) => {
                    const subHref = sub.url || '#';
                    return (
                      <li key={j}>
                        <a
                          className="site-nav__sublink"
                          href={subHref}
                          {...(sub.linkTarget === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {sub.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        }
        return (
          <li key={i} className="site-nav__item">
            <a
              className="site-nav__link"
              href={itemHref}
              {...(item.linkTarget === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export const Component = (props: BidgelyHeaderProps) => {
  const { hublData, groupNavigation, groupLogo, groupCtas } = props;
  const reactId = useId();
  const toggleId = `bidgely-nav-toggle-${reactId.replace(/:/g, '')}`;
  const primaryNavId = `bidgely-primary-nav-${reactId.replace(/:/g, '')}`;
  const navItems = hublData?.navigation?.children ?? [];
  const isEditor = hublData?.isInEditor ?? false;

  const brandHref = getLinkFieldHref(groupLogo.brandLink) || '/';
  const primaryHref = getLinkFieldHref(groupCtas.primaryCtaLink) || '#';
  const secondaryHref = getLinkFieldHref(groupCtas.secondaryCtaLink) || '#';

  const navLabel = groupNavigation.navAriaLabel || 'Primary';

  const primaryTarget = getLinkFieldTarget(groupCtas.primaryCtaLink);
  const secondaryTarget = getLinkFieldTarget(groupCtas.secondaryCtaLink);

  const logoField = groupLogo.logo;
  const useImageLogo = Boolean(logoField?.override_inherited_src && logoField?.src);

  return (
    <div className="bidgely-header-module">
      <header className="site-header" role="banner">
        <input type="checkbox" id={toggleId} className="site-nav__toggle" aria-controls={primaryNavId} />
        <div className="site-header__inner">
          <div className="site-header__left">
            <a className="site-header__brand" href={brandHref}>
              {useImageLogo && logoField ? (
                <img
                  className="site-header__logo-img"
                  src={logoField.src}
                  alt={logoField.alt || 'Logo'}
                  width={logoField.width}
                  height={logoField.height}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <span className="site-header__logo">
                  <span className="site-header__logo-mark">{groupLogo.logoMark}</span>
                  {groupLogo.logoSuffix}
                </span>
              )}
            </a>
            <nav id={primaryNavId} className="site-header__nav" aria-label={navLabel}>
              {navItems.length === 0 && isEditor ? (
                <PlaceholderEmptyContent
                  title="No menu selected"
                  description="Choose a menu in the sidebar, or create one in Navigation settings."
                />
              ) : (
                <NavList items={navItems} />
              )}
            </nav>
          </div>
          <label htmlFor={toggleId} className="site-nav__burger">
            <span className="site-nav__burger-line" />
            <span className="site-nav__burger-line" />
            <span className="site-nav__burger-line" />
            <span className="site-nav__burger-label">Menu</span>
          </label>
          <div className="site-header__actions">
            {groupCtas.showSecondaryCta ? (
              <a
                className="btn btn--ghost"
                href={secondaryHref}
                {...(secondaryTarget
                  ? { target: secondaryTarget, rel: getLinkFieldRel(groupCtas.secondaryCtaLink) || undefined }
                  : {})}
              >
                {groupCtas.secondaryCtaText}
              </a>
            ) : null}
            <a
              className="btn btn--primary"
              href={primaryHref}
              {...(primaryTarget
                ? { target: primaryTarget, rel: getLinkFieldRel(groupCtas.primaryCtaLink) || undefined }
                : {})}
            >
              {groupCtas.primaryCtaText}
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "navigation": menu(module.groupNavigation.menu, "site_root"),
      "isInEditor": is_in_editor,
      "defaultLogo": {
        "src": brand_settings.logo.src,
        "alt": brand_settings.logo.alt,
        "width": brand_settings.logo.width,
        "height": brand_settings.logo.height
      }
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Bidgely header',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: HeaderSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/bidgely_header',
  version: 1,
  themeModule: true,
};
