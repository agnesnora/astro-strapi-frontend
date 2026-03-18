import { client } from "./strapi-client";
const blocksPopulate = {
  on: {
    "blocks.hero": {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        links: true,
      },
    },
    "blocks.heading-section": true,
    "blocks.card-grid": {
      populate: {
        card: true,
      },
    },
    "blocks.content-with-image": {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: true,
      },
    },
    "blocks.faqs": {
      populate: {
        faq: true,
      },
    },
    "blocks.person-card": {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
      },
    },
    "blocks.markdown": true,
    "blocks.featured-articles": {
      populate: {
        articles: {
          populate: {
            featuredImage: {
              fields: ["url", "alternativeText"],
            },
            author: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
          },
        },
      },
    },
    "blocks.newsletter": true,
  },
};

async function getSingleType(name: string, params: object) {
  const data = await client.single(name).find(params);
  return data;
}
async function getGlobalPageData() {
  const data = await getSingleType("global", {
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

async function getLandingPageData() {
  const data = await getSingleType("landing-page", {
    populate: {
      blocks: blocksPopulate,
    },
  });
  return data;
}
// COLLECTION TYPES
//PAGES

async function getPages() {
  return client.collection("pages").find({
    populate: {
      blocks: blocksPopulate,
    },
  });
}

async function getPageBySlug(slug: string) {
  const data = await client.collection("pages").find({
    filters: { slug: { $eq: slug } },
    populate: { blocks: blocksPopulate },
  })
  return data.data?.[0]
}


//ARTICLES

async function getArticles(){
    return client.collection("articles").find({
          populate: {
      featuredImage: { fields: ["url", "alternativeText"] },
      author: {
        populate: {
          image: { fields: ["url", "alternativeText"] },
        },
      },
      contentTag: true,
    },
    })
} async function getArticleBySlug(slug: string) {
  const data = await client.collection("articles").find({
    filters: { slug: { $eq: slug } },
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

export { getGlobalPageData, getLandingPageData, getArticles, getPages, getPageBySlug, getArticleBySlug };
