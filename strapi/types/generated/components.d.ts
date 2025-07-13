import type { Schema, Struct } from '@strapi/strapi'

export interface DynamicZoneCta extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_ctas'
  info: {
    description: ''
    displayName: 'CTA'
    icon: 'cursor'
  }
  attributes: {
    CTAs: Schema.Attribute.Component<'shared.button', true>
    heading: Schema.Attribute.String
    sub_heading: Schema.Attribute.String
  }
}

export interface DynamicZoneFaq extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_faqs'
  info: {
    displayName: 'FAQ'
    icon: 'question'
  }
  attributes: {
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>
    heading: Schema.Attribute.String
    sub_heading: Schema.Attribute.String
  }
}

export interface DynamicZoneFeatures extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_features'
  info: {
    description: ''
    displayName: 'Features'
    icon: 'bulletList'
  }
  attributes: {
    heading: Schema.Attribute.String
    sub_heading: Schema.Attribute.String
  }
}

export interface DynamicZoneHero extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_heroes'
  info: {
    description: ''
    displayName: 'Hero'
    icon: 'layout'
  }
  attributes: {
    CTAs: Schema.Attribute.Component<'shared.button', true>
    heading: Schema.Attribute.String
    sub_heading: Schema.Attribute.String
  }
}

export interface DynamicZoneRelatedArticles extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_related_articles'
  info: {
    description: ''
    displayName: 'related_articles'
    icon: 'bulletList'
  }
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>
    heading: Schema.Attribute.String
    sub_heading: Schema.Attribute.String
  }
}

export interface DynamicZoneTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_testimonials'
  info: {
    description: ''
    displayName: 'Testimonials'
    icon: 'emotionHappy'
  }
  attributes: {
    heading: Schema.Attribute.String
    sub_heading: Schema.Attribute.String
    testimonials: Schema.Attribute.Relation<'oneToMany', 'api::testimonial.testimonial'>
  }
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers'
  info: {
    description: ''
    displayName: 'Footer'
    icon: 'apps'
  }
  attributes: {
    built_with: Schema.Attribute.String
    business_links: Schema.Attribute.Component<'shared.link', true>
    copyright: Schema.Attribute.String
    description: Schema.Attribute.String
    designed_developed_by: Schema.Attribute.String
    earning_links: Schema.Attribute.Component<'shared.link', true>
    internal_links: Schema.Attribute.Component<'shared.link', true>
    logo: Schema.Attribute.Relation<'oneToOne', 'api::logo.logo'>
    policy_links: Schema.Attribute.Component<'shared.link', true>
    resource_links: Schema.Attribute.Component<'shared.link', true>
    social_media_links: Schema.Attribute.Component<'shared.link', true>
  }
}

export interface GlobalNavbar extends Struct.ComponentSchema {
  collectionName: 'components_global_navbars'
  info: {
    displayName: 'Navbar'
    icon: 'bold'
  }
  attributes: {
    left_navbar_items: Schema.Attribute.Component<'shared.link', true>
    logo: Schema.Attribute.Relation<'oneToOne', 'api::logo.logo'>
    right_navbar_items: Schema.Attribute.Component<'shared.link', true>
  }
}

export interface ItemsInput extends Struct.ComponentSchema {
  collectionName: 'components_items_inputs'
  info: {
    description: ''
    displayName: 'Input'
    icon: 'apps'
  }
  attributes: {
    name: Schema.Attribute.String
    placeholder: Schema.Attribute.String
    type: Schema.Attribute.Enumeration<
      [
        'text',
        'email',
        'password',
        'submit',
        'textarea',
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'radio',
        'range',
        'reset',
        'search',
        'tel',
        'time',
        'url',
        'week',
      ]
    > &
      Schema.Attribute.DefaultTo<'text'>
  }
}

export interface ItemsLeftNavbarItems extends Struct.ComponentSchema {
  collectionName: 'components_items_left_navbar_items'
  info: {
    displayName: 'Left_Navbar_Items'
    icon: 'bulletList'
  }
  attributes: {
    name: Schema.Attribute.String
    URL: Schema.Attribute.String
  }
}

export interface ItemsRayItems extends Struct.ComponentSchema {
  collectionName: 'components_items_ray_items'
  info: {
    description: ''
    displayName: 'Ray_Card_Items'
    icon: 'bulletList'
  }
  attributes: {
    item_1: Schema.Attribute.String
    item_2: Schema.Attribute.String
    item_3: Schema.Attribute.String
  }
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons'
  info: {
    description: ''
    displayName: 'Button'
    icon: 'cursor'
  }
  attributes: {
    target: Schema.Attribute.Enumeration<['_blank', '_self', '_parent', '_top']>
    text: Schema.Attribute.String
    URL: Schema.Attribute.String
    variant: Schema.Attribute.Enumeration<['simple', 'outline', 'primary', 'muted']> &
      Schema.Attribute.DefaultTo<'primary'>
  }
}

export interface SharedForm extends Struct.ComponentSchema {
  collectionName: 'components_shared_forms'
  info: {
    description: ''
    displayName: 'Form'
    icon: 'paperPlane'
  }
  attributes: {
    inputs: Schema.Attribute.Component<'items.input', true>
  }
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links'
  info: {
    displayName: 'Link'
    icon: 'link'
  }
  attributes: {
    target: Schema.Attribute.Enumeration<['_blank', '_self', '_parent', '_top']>
    text: Schema.Attribute.String
    URL: Schema.Attribute.String
  }
}

export interface SharedOffer extends Struct.ComponentSchema {
  collectionName: 'components_shared_offers'
  info: {
    description: ''
    displayName: 'Offer'
    icon: 'star'
  }
  attributes: {
    badge: Schema.Attribute.String
    currency: Schema.Attribute.Enumeration<['USD', 'EUR']>
    description: Schema.Attribute.String
    images: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>
    price: Schema.Attribute.Decimal
    title: Schema.Attribute.String
  }
}

export interface SharedPerks extends Struct.ComponentSchema {
  collectionName: 'components_shared_perks'
  info: {
    description: ''
    displayName: 'Perks'
    icon: 'check'
  }
  attributes: {
    text: Schema.Attribute.String
  }
}

export interface SharedRangeBar extends Struct.ComponentSchema {
  collectionName: 'components_shared_range_bars'
  info: {
    displayName: 'Range Bar'
    icon: 'connector'
  }
  attributes: {
    heading: Schema.Attribute.String
    hexColor: Schema.Attribute.String
    max: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Schema.Attribute.DefaultTo<100>
    min: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      >
  }
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts'
  info: {
    description: ''
    displayName: 'Rich Text'
    icon: 'write'
  }
  attributes: {
    content: Schema.Attribute.Blocks
  }
}

export interface SharedSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections'
  info: {
    displayName: 'Section'
    icon: 'cursor'
  }
  attributes: {
    heading: Schema.Attribute.String
    sub_heading: Schema.Attribute.String
    users: Schema.Attribute.Component<'shared.user', true>
  }
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos'
  info: {
    displayName: 'seo'
    icon: 'search'
  }
  attributes: {
    canonicalURL: Schema.Attribute.String
    keywords: Schema.Attribute.Text
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 50
      }>
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>
    metaRobots: Schema.Attribute.String
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60
      }>
    metaViewport: Schema.Attribute.String
    structuredData: Schema.Attribute.JSON
  }
}

export interface SharedSocialMediaIconLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_media_icon_links'
  info: {
    description: ''
    displayName: 'Social_Media_Icon_Links'
    icon: 'expand'
  }
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    link: Schema.Attribute.Component<'shared.link', true>
  }
}

export interface SharedSteps extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps'
  info: {
    description: ''
    displayName: 'Steps'
    icon: 'bulletList'
  }
  attributes: {
    description: Schema.Attribute.String
    title: Schema.Attribute.String
  }
}

export interface SharedUser extends Struct.ComponentSchema {
  collectionName: 'components_shared_users'
  info: {
    description: ''
    displayName: 'User'
    icon: 'user'
  }
  attributes: {
    firstname: Schema.Attribute.String
    image: Schema.Attribute.Media<'images'>
    job: Schema.Attribute.String
    lastname: Schema.Attribute.String
  }
}

export interface TableCell extends Struct.ComponentSchema {
  collectionName: 'components_table_cells'
  info: {
    displayName: 'Cell'
  }
  attributes: {
    content: Schema.Attribute.Text
  }
}

export interface TableComparisonPair extends Struct.ComponentSchema {
  collectionName: 'components_table_comparison_pairs'
  info: {
    description: ''
    displayName: 'Comparison Pair'
  }
  attributes: {
    left: Schema.Attribute.String
    right: Schema.Attribute.String
  }
}

export interface TableHeader extends Struct.ComponentSchema {
  collectionName: 'components_table_headers'
  info: {
    description: ''
    displayName: 'Header'
  }
  attributes: {
    cells: Schema.Attribute.Component<'table.cell', true>
  }
}

export interface TableRow extends Struct.ComponentSchema {
  collectionName: 'components_table_rows'
  info: {
    description: ''
    displayName: 'Row'
  }
  attributes: {
    cells: Schema.Attribute.Component<'table.cell', true>
  }
}

export interface WidgetsComparisonTable extends Struct.ComponentSchema {
  collectionName: 'components_widgets_comparison_tables'
  info: {
    description: ''
    displayName: 'Comparison Table'
  }
  attributes: {
    header: Schema.Attribute.Component<'table.comparison-pair', false>
    heading: Schema.Attribute.String
    rows: Schema.Attribute.Component<'table.comparison-pair', true>
  }
}

export interface WidgetsCta extends Struct.ComponentSchema {
  collectionName: 'components_widgets_ctas'
  info: {
    description: ''
    displayName: 'CTA'
    icon: 'cursor'
  }
  attributes: {
    target: Schema.Attribute.Enumeration<['_blank', '_self', '_parent', '_top']>
    text: Schema.Attribute.String & Schema.Attribute.Required
    URL: Schema.Attribute.String
    variant: Schema.Attribute.Enumeration<['default', 'online']>
  }
}

export interface WidgetsEstimationBarChart extends Struct.ComponentSchema {
  collectionName: 'components_widgets_estimation_bar_charts'
  info: {
    description: ''
    displayName: 'Estimation Bar Chart'
    icon: 'layout'
  }
  attributes: {
    bars: Schema.Attribute.Component<'shared.range-bar', true>
    caption: Schema.Attribute.String
    heading: Schema.Attribute.String
    sliderMax: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>
    sliderMin: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>
    sliderText: Schema.Attribute.String
    sliderUnit: Schema.Attribute.String
  }
}

export interface WidgetsHighlightedOffers extends Struct.ComponentSchema {
  collectionName: 'components_widgets_highlighted_offers'
  info: {
    displayName: 'highlighted-offers'
    icon: 'slideshow'
  }
  attributes: {
    heading: Schema.Attribute.String
    offers: Schema.Attribute.Component<'shared.offer', true>
  }
}

export interface WidgetsTable extends Struct.ComponentSchema {
  collectionName: 'components_widgets_tables'
  info: {
    description: ''
    displayName: 'Table'
    icon: 'apps'
  }
  attributes: {
    header: Schema.Attribute.Component<'table.header', false>
    heading: Schema.Attribute.String
    rows: Schema.Attribute.Component<'table.row', true>
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'dynamic-zone.cta': DynamicZoneCta
      'dynamic-zone.faq': DynamicZoneFaq
      'dynamic-zone.features': DynamicZoneFeatures
      'dynamic-zone.hero': DynamicZoneHero
      'dynamic-zone.related-articles': DynamicZoneRelatedArticles
      'dynamic-zone.testimonials': DynamicZoneTestimonials
      'global.footer': GlobalFooter
      'global.navbar': GlobalNavbar
      'items.input': ItemsInput
      'items.left-navbar-items': ItemsLeftNavbarItems
      'items.ray-items': ItemsRayItems
      'shared.button': SharedButton
      'shared.form': SharedForm
      'shared.link': SharedLink
      'shared.offer': SharedOffer
      'shared.perks': SharedPerks
      'shared.range-bar': SharedRangeBar
      'shared.rich-text': SharedRichText
      'shared.section': SharedSection
      'shared.seo': SharedSeo
      'shared.social-media-icon-links': SharedSocialMediaIconLinks
      'shared.steps': SharedSteps
      'shared.user': SharedUser
      'table.cell': TableCell
      'table.comparison-pair': TableComparisonPair
      'table.header': TableHeader
      'table.row': TableRow
      'widgets.comparison-table': WidgetsComparisonTable
      'widgets.cta': WidgetsCta
      'widgets.estimation-bar-chart': WidgetsEstimationBarChart
      'widgets.highlighted-offers': WidgetsHighlightedOffers
      'widgets.table': WidgetsTable
    }
  }
}
