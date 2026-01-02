import { Metadata } from 'next';

export interface WpSeoData {
    title?: string;
    metaDesc?: string;
    canonical?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphImage?: {
        sourceUrl: string;
    };
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: {
        sourceUrl: string;
    };
    metaRobotsNoindex?: string;
    metaRobotsNofollow?: string;
}

export function generateMetadataFromSeo(seo: WpSeoData | undefined): Metadata {
    if (!seo) return {};

    return {
        title: seo.title || undefined,
        description: seo.metaDesc || undefined,
        alternates: {
            canonical: seo.canonical || undefined,
        },
        openGraph: {
            title: seo.opengraphTitle || seo.title || undefined,
            description: seo.opengraphDescription || seo.metaDesc || undefined,
            images: seo.opengraphImage?.sourceUrl ? [{ url: seo.opengraphImage.sourceUrl }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.twitterTitle || seo.title || undefined,
            description: seo.twitterDescription || seo.metaDesc || undefined,
            images: seo.twitterImage?.sourceUrl ? [seo.twitterImage.sourceUrl] : undefined,
        },
        robots: {
            index: seo.metaRobotsNoindex !== 'noindex',
            follow: seo.metaRobotsNofollow !== 'nofollow',
        },
    };
}

export const SEO_FRAGMENT = `
  seo {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
    }
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
    }
    metaRobotsNoindex
    metaRobotsNofollow
  }
`;
