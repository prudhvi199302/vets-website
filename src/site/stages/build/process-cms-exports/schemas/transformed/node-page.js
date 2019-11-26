const baseType = 'node';
const subType = 'page';
module.exports = {
  type: 'object',
  properties: {
    contentModelType: { type: 'string', enum: [`${baseType}-${subType}`] },
    entityType: { type: 'string', enum: [baseType] },
    entityBundle: { type: 'string', enum: [subType] },
    title: { type: 'string' },
    fieldIntroText: { type: ['string', 'null'] },
    fieldDescription: { type: ['string', 'null'] },
    fieldFeaturedContent: {
      type: 'array',
      items: {
        $ref: 'Paragraph',
      },
    },
    fieldContentBlock: {
      type: 'array',
      items: {
        $ref: 'Paragraph',
      },
    },
    fieldAlert: { type: ['object', 'null'] },
    fieldRelatedLinks: {
      type: 'array',
      items: {
        $ref: 'transformed/paragraph-list_of_link_teasers',
      },
    },
    fieldAdministration: {
      type: 'array',
      items: {
        $ref: 'transformed/taxonomy_term-administration',
      },
    },
    fieldPageLastBuilt: {
      type: 'object',
      properties: {
        date: { type: 'string' },
      },
      required: ['date'],
    },
    entityMetaTags: { $ref: 'MetaTags' },
  },
};
