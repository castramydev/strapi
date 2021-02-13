'use strict';
const { sanitizeEntity } = require("strapi-utils");
const CryptoJS = require("crypto-js");
const scrtkey = "cstra123#";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async (ctx) => {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.package.search(ctx.query);
      let tryEntity = sanitizeEntity(entities, { model: strapi.models.package });
      var jsons = JSON.stringify(tryEntity);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      return encryptedData;
    } else {
      entities = await strapi.services.package.find(ctx.query);
      let tryEntity = sanitizeEntity(entities, { model: strapi.models.package });
      var jsons = JSON.stringify(tryEntity);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      return encryptedData;
    }
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.package.findOne({ id });
    let tryEntity = sanitizeEntity(entity, { model: strapi.models.package });
    var jsons = JSON.stringify(tryEntity);
    var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
    return encryptedData;
  },

  update: async (ctx) => {
   const { id } = ctx.params;

   let entity;
   if (ctx.is("multipart")) {
     const { data, files } = parseMultipartData(ctx);
     entity = await strapi.services.package.update({ id }, data, {
       files,
     });
   } else {

     entity = await strapi.services.package.update({ id }, ctx.request.body);
     var resMessage = {};
     resMessage.status = 200;
     resMessage.message = entity.package_name + " updated successfully!";
     return JSON.stringify(resMessage);
   }
  },

  create: async (ctx) => {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.package.create(data, { files });
    } else {
      entity = await strapi.services.package.create(ctx.request.body);
      let tryEntity = sanitizeEntity(entity, { model: strapi.models.package });
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
    const entity = await strapi.services.package.delete({ id });
    if(entity){
      var resMessage = {};
      resMessage.status = 200;
      resMessage.message = "Package deleted successfully!";
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
