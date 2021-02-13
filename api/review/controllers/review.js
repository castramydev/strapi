'use strict';
const CryptoJS = require("crypto-js");
const scrtkey = "cstra123#";
const { sanitizeEntity } = require("strapi-utils");


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async (ctx) => {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.review.search(ctx.query);
      var jsons = JSON.stringify(entities);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      return encryptedData;
    } else {
      entities = await strapi.services.review.find(ctx.query);
      let tryEntities = sanitizeEntity(entities, { model: strapi.models.review });
      var jsons = JSON.stringify(tryEntities);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      return encryptedData;
    }
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.review.findOne({ id });
    let tryEntity = sanitizeEntity(entity, { model: strapi.models.review });
    var jsons = JSON.stringify(tryEntity);
    var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
    return encryptedData;
  },

  update: async (ctx) => {
   const { id } = ctx.params;

   let entity;
   if (ctx.is("multipart")) {
     const { data, files } = parseMultipartData(ctx);
     entity = await strapi.services.review.update({ id }, data, {
       files,
     });
   } else {
     entity = await strapi.services.review.update({ id }, ctx.request.body);
     var resMessage = {};
     resMessage.status = 200;
     resMessage.message = entity.name + " updated successfully!";
     return JSON.stringify(resMessage);
   }
  },

  delete: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.review.delete({ id });
    if(entity){
      var resMessage = {};
      resMessage.status = 200;
      resMessage.message = "Review deleted successfully!";
      return JSON.stringify(resMessage);
    }
    else{
      var resMessage = {};
      resMessage.status = 400;
      resMessage.message = "An error has occurred. Please try again!";
      return JSON.stringify(resMessage);
    }


  }
};
