import { client } from "./strapi-client";
import { blocksPopulate } from "./populate";
import type { Article, Author } from "../types/strapi";

async function getSingleType(name: string, params: object) {
  const data = await client.single(name).find(params);
  return data;
}
async function getGlobalPageData(locale: string = "hu") {
  const data = await getSingleType("global", {
    locale: locale,
    populate: {
      banner: {
        populate: {
          link: {
            fields: ["href", "label", "isExternal"],
          },
        },
      },
      header: {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          navItems: true,
          cta: true,
        },
      },
      footer: {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          navItems: true,
          socialLinks: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
        },
      },
    },
  });
  const globalData = data?.data;
  if (!globalData) throw new Error("No global data found");
  return globalData;
}

async function getLandingPageData(locale: string = "hu") {
  const data = await getSingleType("landing-page", {
    locale: locale,
    populate: {
      blocks: blocksPopulate,
    },
  });
  return data;
}
// COLLECTION TYPES
//PAGES

async function getPages(locale: string = "hu") {
  return client.collection("pages").find({
    locale: locale,
    populate: {
      blocks: blocksPopulate,
    },
  });
}

async function getPageBySlug(slug: string, locale: string = "hu") {
  const data = await client.collection("pages").find({
    filters: { slug: { $eq: slug } },
    locale: locale, // ← Strapi i18n locale
    populate: { blocks: blocksPopulate },
  });
  return data.data?.[0];
}

//ARTICLES

async function getArticles(locale: string = "hu") {
  return client.collection("articles").find({
    locale: locale,
    populate: {
      featuredImage: { fields: ["url", "alternativeText"] },
      author: {
        populate: {
          image: { fields: ["url", "alternativeText"] },
        },
      },
      contentTag: true,
    },
  });
}
async function getArticleBySlug(slug: string, locale: string = "hu") {
  const data = await client.collection("articles").find({
    filters: { slug: { $eq: slug } },
    locale: locale,
    populate: {
      featuredImage: { fields: ["url", "alternativeText"] },
      author: {
        populate: {
          image: { fields: ["url", "alternativeText"] },
        },
      },
      contentTag: true,
    },
  });
  return data.data?.[0];
}

//PLANTS

async function getPlants(locale: string = "hu") {
  return client.collection("plants").find({
    locale,
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });
}
async function getPlantBySlug(slug: string, locale: string = "hu") {
  const data = await client.collection("plants").find({
    filters: { slug: { $eq: slug } },
    locale,
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  return data.data?.[0];
}

export {
  getGlobalPageData,
  getLandingPageData,
  getArticles,
  getPages,
  getPageBySlug,
  getArticleBySlug,
  getPlants,
  getPlantBySlug,
};
