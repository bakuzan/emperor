import { GatsbyNode, Node } from 'gatsby';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  async ({ actions }) => {
    const { createTypes, createFieldExtension } = actions;
    const names = [
      'daysSinceReignStart',
      'daysSinceReignEnd',
      'reignLengthInDays',
      'slug'
    ];

    for (let name of names) {
      createFieldExtension({
        name,
        extend: () => ({
          resolve(source: Node) {
            return (source.fields as any)[name];
          }
        })
      });
    }

    createTypes(`
      type EmperorsJson implements Node {
        daysSinceReignStart: Int @daysSinceReignStart
        daysSinceReignEnd: Int @daysSinceReignEnd
        reignLengthInDays: Int @reignLengthInDays
        slug: String @slug
        image: File @link(from: "fields.imageFile")
      }
    `);
  };
