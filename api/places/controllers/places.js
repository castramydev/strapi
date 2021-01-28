'use strict';
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async (ctx) => {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.places.search(ctx.query);
      return key.encrypt(entities, "base64");
    } else {
      entities = await strapi.services.places.find(ctx.query);
      // return entities;
      return key.encrypt(entities, "base64");
    }
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;

    const entity = await strapi.services.restaurant.findOne({ id });
    return key.encrypt(entity, "base64");
  },

  update: async (ctx) => {
   const { id } = ctx.params;

   let entity;
   if (ctx.is("multipart")) {
     const { data, files } = parseMultipartData(ctx);
     entity = await strapi.services.places.update({ id }, data, {
       files,
     });
   } else {
     entity = await strapi.services.places.update({ id }, ctx.request.body);
     var resMessage = {};
     console.log(entity.name);
     resMessage.status = 200;
     resMessage.message = entity.name + " updated successfully!";
     return JSON.stringify(resMessage);
   }

  // return key.encrypt(entity, "base64");
  },

  delete: async (ctx) => {
    const { id } = ctx.params;

    const entity = await strapi.services.restaurant.delete({ id });
    var resMessage = {};

    resMessage.status = 200;
    resMessage.message = entity[0].name + " deleted successfully!";
    return JSON.stringify(resMessage);

  }
};
