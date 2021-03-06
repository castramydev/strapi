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
      entities = await strapi.services.places.search(ctx.query);
      let tryEntity = sanitizeEntity(entities, { model: strapi.models.places });
      var jsons = JSON.stringify(tryEntity);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      return encryptedData;
    } else {
      entities = await strapi.services.places.find(ctx.query);
      let tryEntity = sanitizeEntity(entities, { model: strapi.models.places });
      var jsons = JSON.stringify(tryEntity);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      return encryptedData;
    }
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.places.findOne({ id });
    let tryEntity = sanitizeEntity(entity, { model: strapi.models.places });
    var jsons = JSON.stringify(tryEntity);
    var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
    return encryptedData;
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
     let tryEntity = sanitizeEntity(entity, { model: strapi.models.places });
     var jsons = JSON.stringify(tryEntity);
     var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
     var resMessage = {};
     resMessage.status = 200;
     resMessage.message = tryEntity.name + " updated successfully!";
     resMessage.body = encryptedData;
     return JSON.stringify(resMessage);
   }
  },

  create: async (ctx) => {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.places.create(data, { files });
    } else {
      entity = await strapi.services.places.create(ctx.request.body);
      let tryEntity = sanitizeEntity(entity, { model: strapi.models.places });
      var jsons = JSON.stringify(tryEntity);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      var resMessage = {};
      resMessage.status = 200;
      resMessage.message = "Booking created successfully!";
      resMessage.body = encryptedData;
      return JSON.stringify(resMessage);
    }
  },

  delete: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.places.delete({ id });
    if(entity){
      var resMessage = {};
      resMessage.status = 200;
      resMessage.message = "Campsite deleted successfully!";
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
