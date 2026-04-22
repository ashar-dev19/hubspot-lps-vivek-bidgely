import { useId } from 'react';
import { RichText } from '@hubspot/cms-components';
import type { TextFieldType, ImageFieldType, LinkFieldType, ChoiceFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import { createComponent } from '../../utils/create-component.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { RichTextContentFieldLibraryType } from '../../fieldLibrary/RichTextContent/types.js';
import CeGenaiSectionSvg from './assets/ce-genai-section.svg';

type GenaiFeatureRow = {
  featureIcon: ImageFieldType['default'];
  featureTitle: TextFieldType['default'];
  featureBody: TextFieldType['default'];
};

type GenaiChatMessageRow = RichTextContentFieldLibraryType & {
  messageRole: ChoiceFieldType['default'];
  senderLabel: TextFieldType['default'];
};

type GenaiChatChipRow = {
  chipLabel: TextFieldType['default'];
  chipLink: LinkFieldType['default'];
};

type CeGenaiSectionProps = {
  moduleName?: string;
  hublData?: {
    isInEditor: boolean;
  };
  groupCeGenaiIntro: {
    ceGenaiEyebrow: TextFieldType['default'];
    ceGenaiHeadingBefore: TextFieldType['default'];
    ceGenaiHeadingAccent: TextFieldType['default'];
    ceGenaiLead: TextFieldType['default'];
  };
  groupCeGenaiFeatures: GenaiFeatureRow[];
  groupCeGenaiChatDemo: {
    ceGenaiChatAvatar: ImageFieldType['default'];
    ceGenaiChatAriaLabel: TextFieldType['default'];
    ceGenaiChatHeadline: TextFieldType['default'];
    ceGenaiChatStatus: TextFieldType['default'];
  };
  groupCeGenaiChatMessages: GenaiChatMessageRow[];
  groupCeGenaiChatChips: GenaiChatChipRow[];
};

const Section = createComponent('section');
const Div = createComponent('div');
const P = createComponent('p');
const H2 = createComponent('h2');
const H3 = createComponent('h3');
const Article = createComponent('article');
const Img = createComponent('img');
const Aside = createComponent('aside');
const A = createComponent('a');
const Span = createComponent('span');

export const Component = (props: CeGenaiSectionProps) => {
  const { moduleName, groupCeGenaiIntro, groupCeGenaiFeatures, groupCeGenaiChatDemo, groupCeGenaiChatMessages, groupCeGenaiChatChips } =
    props;
  const reactId = useId();
  const headingId = `ce-genai-heading-${reactId.replace(/:/g, '')}`;

  return (
    <Div className="customer-engagement-page">
      <Section className="section--genai" aria-labelledby={headingId}>
        <Div className="container">
          <P
            className="eyebrow"
            data-hs-token={getDataHSToken(moduleName, 'groupCeGenaiIntro.ceGenaiEyebrow')}
          >
            {groupCeGenaiIntro.ceGenaiEyebrow}
          </P>
          <H2 id={headingId} className="section-heading">
            <span data-hs-token={getDataHSToken(moduleName, 'groupCeGenaiIntro.ceGenaiHeadingBefore')}>
              {groupCeGenaiIntro.ceGenaiHeadingBefore}
            </span>
            <span className="headline-accent" data-hs-token={getDataHSToken(moduleName, 'groupCeGenaiIntro.ceGenaiHeadingAccent')}>
              {groupCeGenaiIntro.ceGenaiHeadingAccent}
            </span>
          </H2>
          <P
            className="lead lead--narrow"
            data-hs-token={getDataHSToken(moduleName, 'groupCeGenaiIntro.ceGenaiLead')}
          >
            {groupCeGenaiIntro.ceGenaiLead}
          </P>

          <Div className="genai-grid">
            <Div className="genai-features">
              {groupCeGenaiFeatures.map((row, index) => {
                const icon = row.featureIcon;
                const hasIcon = Boolean(icon?.src);
                const imgLoading =
                  icon?.loading && icon.loading !== 'disabled' ? icon.loading : 'lazy';
                return (
                  <Article className="genai-feature" key={index}>
                    <Div className="genai-feature__icon" aria-hidden="true">
                      {hasIcon ? (
                        <Img
                          src={icon.src}
                          alt={icon.alt ?? ''}
                          width={icon.width ?? 26}
                          height={icon.height ?? 26}
                          loading={imgLoading}
                          decoding="async"
                          data-hs-token={getDataHSToken(moduleName, `groupCeGenaiFeatures[${index}].featureIcon`)}
                        />
                      ) : null}
                    </Div>
                    <Div>
                      <H3
                        className="genai-feature__title"
                        data-hs-token={getDataHSToken(moduleName, `groupCeGenaiFeatures[${index}].featureTitle`)}
                      >
                        {row.featureTitle}
                      </H3>
                      <P
                        className="genai-feature__text"
                        data-hs-token={getDataHSToken(moduleName, `groupCeGenaiFeatures[${index}].featureBody`)}
                      >
                        {row.featureBody}
                      </P>
                    </Div>
                  </Article>
                );
              })}
            </Div>

            <Aside className="chat-demo" aria-label={groupCeGenaiChatDemo.ceGenaiChatAriaLabel || undefined}>
              <Div className="chat-demo__header">
                <Div className="chat-demo__avatar" aria-hidden="true">
                  {groupCeGenaiChatDemo.ceGenaiChatAvatar?.src ? (
                    <Img
                      className="chat-demo__avatar-img"
                      src={groupCeGenaiChatDemo.ceGenaiChatAvatar.src}
                      alt={groupCeGenaiChatDemo.ceGenaiChatAvatar.alt ?? ''}
                      width={groupCeGenaiChatDemo.ceGenaiChatAvatar.width ?? 26}
                      height={groupCeGenaiChatDemo.ceGenaiChatAvatar.height ?? 26}
                      loading={
                        groupCeGenaiChatDemo.ceGenaiChatAvatar.loading &&
                        groupCeGenaiChatDemo.ceGenaiChatAvatar.loading !== 'disabled'
                          ? groupCeGenaiChatDemo.ceGenaiChatAvatar.loading
                          : 'lazy'
                      }
                      decoding="async"
                      data-hs-token={getDataHSToken(moduleName, 'groupCeGenaiChatDemo.ceGenaiChatAvatar')}
                    />
                  ) : (
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.46161 0.75L0.75 9.87188H4.40651L2.85961 16.75L9.75 7.36639H5.9534L7.46161 0.75Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Div>
                <Div>
                  <Div
                    className="chat-demo__headline"
                    data-hs-token={getDataHSToken(moduleName, 'groupCeGenaiChatDemo.ceGenaiChatHeadline')}
                  >
                    {groupCeGenaiChatDemo.ceGenaiChatHeadline}
                  </Div>
                  <Div
                    className="chat-demo__status"
                    data-hs-token={getDataHSToken(moduleName, 'groupCeGenaiChatDemo.ceGenaiChatStatus')}
                  >
                    {groupCeGenaiChatDemo.ceGenaiChatStatus}
                  </Div>
                </Div>
              </Div>
              <Div className="chat-demo__thread">
                {groupCeGenaiChatMessages.map((msg, index) => {
                  const isUser = msg.messageRole !== 'assistant';
                  const groupClass = isUser ? 'chat-bubble-group chat-bubble-group--user' : 'chat-bubble-group chat-bubble-group--assistant';
                  const labelClass = isUser
                    ? 'chat-bubble__label'
                    : 'chat-bubble__label chat-bubble__label--brand';
                  const bubbleClass = isUser ? 'chat-bubble chat-bubble--user' : 'chat-bubble chat-bubble--assistant';
                  return (
                    <Div className={groupClass} key={index}>
                      <Div
                        className={labelClass}
                        data-hs-token={getDataHSToken(moduleName, `groupCeGenaiChatMessages[${index}].senderLabel`)}
                      >
                        {msg.senderLabel}
                      </Div>
                      <Div className={bubbleClass}>
                        {msg.richTextContentHTML ? (
                          <RichText
                            fieldPath={`groupCeGenaiChatMessages[${index}].richTextContentHTML`}
                            tag="div"
                            data-hs-token={getDataHSToken(
                              moduleName,
                              `groupCeGenaiChatMessages[${index}].richTextContentHTML`,
                            )}
                          />
                        ) : null}
                      </Div>
                    </Div>
                  );
                })}
              </Div>
              {groupCeGenaiChatChips?.length ? (
                <Div className="chat-demo__chips">
                  {groupCeGenaiChatChips.map((chip, index) => {
                    const href = getLinkFieldHref(chip.chipLink) || '#';
                    const target = getLinkFieldTarget(chip.chipLink);
                    const rel = getLinkFieldRel(chip.chipLink);
                    if (!chip.chipLabel?.trim()) {
                      return null;
                    }
                    return (
                      <A
                        key={index}
                        href={href}
                        className="chat-chip"
                        {...(target ? { target, rel: rel || undefined } : {})}
                        data-hs-token={getDataHSToken(moduleName, `groupCeGenaiChatChips[${index}].chipLink`)}
                      >
                        <Span data-hs-token={getDataHSToken(moduleName, `groupCeGenaiChatChips[${index}].chipLabel`)}>
                          {chip.chipLabel}
                        </Span>
                      </A>
                    );
                  })}
                </Div>
              ) : null}
            </Aside>
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
  label: 'Customer Engagement — GenAI in CX',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_LISTING', 'BLOG_POST'],
  icon: CeGenaiSectionSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/ce_genai_section',
  version: 2,
  themeModule: true,
};
