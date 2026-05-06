import type { TextFieldType, NumberFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { createComponent } from '../../utils/create-component.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import CeResourcesSectionSvg from './assets/ce-resources-section.svg';
import arrowUpRightPng from './assets/arrow-up-right.png';

type HubdbColumns = {
  colType: TextFieldType['default'];
  colImage: TextFieldType['default'];
  imageBaseUrl: TextFieldType['default'];
  colTitle: TextFieldType['default'];
  colDesc: TextFieldType['default'];
  colCtaLabel: TextFieldType['default'];
  colCtaLink: TextFieldType['default'];
};

type HubdbSettings = {
  hubdbTableId: TextFieldType['default'];
  hubdbLimit: NumberFieldType['default'];
  filterColumn: TextFieldType['default'];
  filterValue: TextFieldType['default'];
};

type ResourceRow = {
  type: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

type CeResourcesSectionProps = {
  moduleName?: string;
  hublData?: {
    isInEditor: boolean;
    resources: ResourceRow[];
  };
  groupCeResourcesHubdb: HubdbSettings;
  groupCeResourcesColumns: HubdbColumns;
  groupCeResourcesHeading: {
    ceResourcesEyebrow: TextFieldType['default'];
  };
};

const Section = createComponent('section');
const Div = createComponent('div');
const P = createComponent('p');
const H3 = createComponent('h3');
const Span = createComponent('span');
const A = createComponent('a');
const Article = createComponent('article');
const Img = createComponent('img');

/** HubDB Rich text stores HTML; React must not escape it. Plain text has no tags. */
function looksLikeHtmlFragment(value: string) {
  return /<[a-z][\s\S]*>/i.test((value || '').trim());
}

/**
 * Legacy bug: HubL stringified HubDB Image objects as `Image{...,url='https://...',...}`.
 * Extract a real https URL when present so img src/CORS still work after deploy/cache.
 */
function normalizeHubdbImageSrc(src: string) {
  const s = (src || '').trim();
  if (!s.startsWith('Image{')) return s;
  const m = s.match(/url='([^']+)'/);
  return m && m[1] ? m[1] : s;
}

function ResourceCardDescription({ text }: { text: string }) {
  const t = text ?? '';
  if (looksLikeHtmlFragment(t)) {
    return <Div className="resource-card__desc" dangerouslySetInnerHTML={{ __html: t }} />;
  }
  return <P className="resource-card__desc">{t}</P>;
}

export const Component = (props: CeResourcesSectionProps) => {
  const { moduleName, hublData, groupCeResourcesHeading } = props;
  const resources = hublData?.resources ?? [];

  return (
    <Div className="customer-engagement-page">
      <Section className="section--resources" aria-labelledby="resources-heading">
        <Div className="container">
          <P
            className="eyebrow"
            id="resources-heading"
            data-hs-token={getDataHSToken(moduleName, 'groupCeResourcesHeading.ceResourcesEyebrow')}
          >
            {groupCeResourcesHeading.ceResourcesEyebrow}
          </P>

          <Div className="resource-grid resource-grid--spaced">
            {resources.map((row, idx) => {
              const imageSrc = normalizeHubdbImageSrc(row.imageSrc);
              const hasImage = Boolean(imageSrc);
              return (
                <Article className="resource-card" key={idx}>
                  <Span className="resource-card__type">{row.type}</Span>
                  <Div className="resource-card__media" aria-hidden={!hasImage}>
                    {hasImage ? (
                      <Img
                        src={imageSrc}
                        alt={row.imageAlt || ''}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </Div>
                  <Div className="resource-card__body">
                    <Div>
                      <H3 className="resource-card__title">{row.title}</H3>
                      <ResourceCardDescription text={row.description} />
                    </Div>
                    <A className="resource-card__cta" href={row.ctaHref || '#'} rel="noopener">
                      <Span className="resource-card__cta-text">{row.ctaLabel}</Span>
                      <Img
                        className="resource-card__cta-icon"
                        src={arrowUpRightPng}
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                      />
                    </A>
                  </Div>
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
  {# Text field so pasted IDs (with commas/spaces) work reliably; digits-only for hubdb_table_rows. #}
  {% set table_id_raw = module.groupCeResourcesHubdb.hubdbTableId|default("")|trim %}
  {% set table_id_digits = table_id_raw|replace(",", "")|replace(" ", "") %}
  {% set table_id = table_id_digits|int %}
  {% set limit = module.groupCeResourcesHubdb.hubdbLimit|int %}
  {% set filter_col = module.groupCeResourcesHubdb.filterColumn|default("")|trim %}
  {% set filter_val = module.groupCeResourcesHubdb.filterValue|default("")|trim %}
  {% set filter_active = filter_col and filter_val %}
  {% set fetch_limit = limit %}
  {% if filter_active %}
    {% set fetch_limit = 500 %}
  {% endif %}
  {% set colType = module.groupCeResourcesColumns.colType %}
  {% set colImage = module.groupCeResourcesColumns.colImage %}
  {% set image_base = module.groupCeResourcesColumns.imageBaseUrl|default("")|trim %}
  {% set colTitle = module.groupCeResourcesColumns.colTitle %}
  {% set colDesc = module.groupCeResourcesColumns.colDesc %}
  {% set colCtaLabel = module.groupCeResourcesColumns.colCtaLabel %}
  {% set colCtaLink = module.groupCeResourcesColumns.colCtaLink %}

  {% set rows = [] %}

  {% if table_id > 0 %}
    {% set hubdb_rows = hubdb_table_rows(table_id, "limit=" ~ fetch_limit) %}

    {% for r in hubdb_rows %}
      {% if rows|length >= limit %}
        {% break %}
      {% endif %}

      {# Comma-separated tags (e.g. CA,DS,EDD): exact token match after trim; spaces removed in cell only. #}
      {% set row_match = namespace(ok=true) %}
      {% if filter_active %}
        {% set row_match.ok = false %}
        {% set cell_norm = (r[filter_col] ~ "")|replace(" ", "") %}
        {% for part in cell_norm|split(",") %}
          {% if part|trim == filter_val %}
            {% set row_match.ok = true %}
          {% endif %}
        {% endfor %}
      {% endif %}

      {% if row_match.ok %}
      {% set raw_link = r[colCtaLink] %}
      {% if raw_link is mapping and raw_link.url %}
        {% set href = raw_link.url %}
      {% else %}
        {% set href = raw_link %}
      {% endif %}

      {# HubDB Image columns return a mapping; Text columns can hold a filename when image_base is set. #}
      {% set raw_image = r[colImage] %}
      {% set img_src = "" %}
      {% set img_alt = "" %}
      {% if raw_image %}
        {% if raw_image is mapping %}
          {% if raw_image.url %}
            {% set img_src = raw_image.url %}
          {% elif raw_image.src %}
            {% set img_src = raw_image.src %}
          {% endif %}
          {% if img_src == "" %}
            {% set fid = "" %}
            {% if raw_image.fileId %}
              {% set fid = raw_image.fileId %}
            {% elif raw_image.file_id %}
              {% set fid = raw_image.file_id %}
            {% endif %}
            {% if fid %}
              {% set fb = file_by_id(fid) %}
              {% if fb %}
                {% if fb.url %}
                  {% set img_src = fb.url %}
                {% elif fb.friendlyUrl %}
                  {% set img_src = fb.friendlyUrl %}
                {% endif %}
              {% endif %}
            {% endif %}
          {% endif %}
          {% if raw_image.altText %}
            {% set img_alt = raw_image.altText %}
          {% elif raw_image.alt %}
            {% set img_alt = raw_image.alt %}
          {% endif %}
        {% elif raw_image is string %}
          {% set raw_str = raw_image|trim %}
          {% if image_base %}
            {% set base = image_base %}
            {% set blen = base|length %}
            {% if blen > 0 and base|slice(blen - 1, 1) != "/" %}
              {% set base = base ~ "/" %}
            {% endif %}
            {% set fname = raw_str %}
            {% set flen = fname|length %}
            {% if flen > 0 and fname|slice(0, 1) == "/" %}
              {% set fname = fname|slice(1, flen - 1) %}
            {% endif %}
            {% set img_src = base ~ fname %}
          {% else %}
            {% set img_src = raw_str %}
          {% endif %}
        {% endif %}
      {% endif %}

      {% set raw_desc = r[colDesc] %}
      {% set desc_str = "" %}
      {% if raw_desc is mapping %}
        {% if raw_desc.html %}
          {% set desc_str = raw_desc.html %}
        {% elif raw_desc.content %}
          {% set desc_str = raw_desc.content %}
        {% else %}
          {% set desc_str = raw_desc|string %}
        {% endif %}
      {% else %}
        {% set desc_str = raw_desc ~ "" %}
      {% endif %}

      {# Normalize protocol-relative URLs returned by file fields #}
      {% if img_src is string and img_src|slice(0,2) == "//" %}
        {% set img_src = "https:" ~ img_src %}
      {% endif %}

      {% set cta_lab = "" %}
      {% if colCtaLabel|trim %}
        {% set cta_lab = r[colCtaLabel|trim] ~ "" %}
      {% endif %}
      {% if cta_lab|trim == "" %}
        {% set cta_lab = "Read More" %}
      {% endif %}

      {% set row = {
          "type": (r[colType] ~ ""),
          "imageSrc": (img_src ~ ""),
          "imageAlt": (img_alt ~ ""),
          "title": (r[colTitle] ~ ""),
          "description": desc_str,
          "ctaLabel": cta_lab,
          "ctaHref": (href ~ "")
        }
      %}
      {% do rows.append(row) %}
      {% endif %}
    {% endfor %}
  {% endif %}

  {% set hublData = {
      "isInEditor": is_in_editor,
      "resources": rows
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Customer Engagement — resources (HubDB)',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: CeResourcesSectionSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_resources_section',
  version: 12,
  themeModule: true,
};

