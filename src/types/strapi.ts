export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface Logo {
  id: number;
  logoText: string;
  logoLink: string;
  image: Image;
}

export interface Link {
  href: string;
  label?: string;
  isExternal?: boolean;
  isButtonLink?: boolean;
  type?: "PRIMARY" | "SECONDARY";
}

export interface GlobalPageHeader {
  logo: Logo;
  navItems: Link[];
  cta: Link;
}

export interface GlobalPageFooter {
  logo: Logo;
  navItems: Link[];
  socialLinks: Logo[];
  text: string;
}

export type ComponentType =
  | "blocks.hero"
  | "blocks.heading-section"
  | "blocks.card-grid"
  | "blocks.plant-grid"
  | "blocks.content-with-image"
  | "blocks.faqs"
  | "blocks.person-card"
  | "blocks.markdown"
  | "blocks.featured-articles"
  | "blocks.fun-facts"
  | "blocks.items"
  | "blocks.title"
  | "blocks.newsletter";

export interface Base<T extends ComponentType> {
  id?: number;
  __component: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface HeroProps extends Base<"blocks.hero"> {
  heading: string;
  text: string;
  image: Image;
  links: Link[];
}

export interface HeadingSectionProps extends Base<"blocks.heading-section"> {
  subHeading: string;
  heading: string;
  anchorLink: string;
}

export interface CardGridProps extends Base<"blocks.card-grid"> {
  cards: {
    id: number;
    heading: string;
    text: string;
    image: Image;
  }[];
}
export interface PlantGridProps extends Base<"blocks.plant-grid"> {
  plantCard: {
    id: number;
    title: string;
    light: string;
    difficulity: string;
    watering: string;
    description: string;
    image: Image;
  }[];
}

export interface ContentWithImageProps extends Base<"blocks.content-with-image"> {
  heading: string;
  content: string;
  link: Link;
  image: Image;
  reversed: boolean;
}

export interface FaqsProps extends Base<"blocks.faqs"> {
  faq: {
    heading: string;
    text: string;
  }[];
}
export interface PersonCardProps extends Base<"blocks.person-card"> {
  personName: string;
  personJob: string;
  image: Image;
  text: string;
}

export interface MarkdownProps extends Base<"blocks.markdown"> {
  content: string;
}

export interface FeaturedArticlesProps extends Base<"blocks.featured-articles"> {
  articles: {
    id: number;
    documentId: string;
    title: string;
    description: string;
    link: Link;
    publishedAt: string;
    updatedAt: string;
    slug: string;
    author: {
      id: number;
      documentId: string;
      fullName: string;
      image: Image;
    };
    featuredImage: Image;
  }[];
}

export interface NewsletterProps extends Base<"blocks.newsletter"> {
  heading: string;
  text: string;
  placeholder: string;
  label: string;
  formId: string;
}

export type BlockData =
  | HeroProps
  | HeadingSectionProps
  | CardGridProps
  | ContentWithImageProps
  | FaqsProps
  | PersonCardProps
  | MarkdownProps
  | FeaturedArticlesProps
  | PlantGridProps
  | NewsletterProps
  | FunFactsProps
  | TitleProps;

export interface Author {
  id: number;
  documentId: string;
  fullName: string;
  image: Image;
}
export interface TitleProps extends Base<"blocks.title"> {
  mainTitle: string;
  subTitle: string;
}
export interface ItemProps {
  id: number;
  text: string;
}
export interface FunFactsProps extends Base<"blocks.fun-facts"> {
  title: string;
  listItem: ItemProps[];
}
export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage: Image;
  author: Author;
  contentTag?: {
    id: number;
    documentId: string;
    name: string;
  };
}

export interface Plant {
  id: number;
  documentId: string;
  name: string;
  shortDescription: string;
  description: string;
  slug: string;

  publishedAt: string;
  updatedAt: string;
  image: Image[];
  watering: "low" | "moderate" | "high";
  light: "low" | "moderate" | "high";
  difficulty: "easy" | "medium" | "hard";
}
