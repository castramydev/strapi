'use strict';
const axios = require("axios");
const FormData = require("form-data");
const CircularJSON = require("circular-json");
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
      entities = await strapi.services.booking.search(ctx.query);
      let tryEntity = sanitizeEntity(entities, { model: strapi.models.booking });
      var jsons = JSON.stringify(tryEntity);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      return encryptedData;
    } else {
      entities = await strapi.services.booking.find(ctx.query);
      let tryEntity = sanitizeEntity(entities, { model: strapi.models.booking });
      var jsons = JSON.stringify(tryEntity);
      var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
      return encryptedData;
    }
  },

  create: async (ctx) => {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.booking.create(data, { files });
    } else {
      entity = await strapi.services.booking.create(ctx.request.body);
      let tryEntity = sanitizeEntity(entity, { model: strapi.models.booking });
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
    const entity = await strapi.services.booking.delete({ id });
    if(entity){
      var resMessage = {};
      resMessage.status = 200;
      resMessage.message = "Booking deleted successfully!";
      return JSON.stringify(resMessage);
    }
    else{
      var resMessage = {};
      resMessage.status = 400;
      resMessage.message = "An error has occurred. Please try again!";
      return JSON.stringify(resMessage);
    }
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.booking.findOne({ id });
    let tryEntity = sanitizeEntity(entity, { model: strapi.models.booking });
    var jsons = JSON.stringify(tryEntity);
    var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
    return encryptedData;
  },

  index: async (ctx) => {
    const bank = await axios.get(
      "https://toyyibpay.com/index.php/api/getBankFPX"
    );
    var jsons = JSON.stringify(bank.data);
    var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
    ctx.send(encryptedData);
  },

  getBank: async (ctx) => {
    const bank = await axios.get(
      "https://toyyibpay.com/index.php/api/getBank"
    );
    var jsons = JSON.stringify(bank.data);
    var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
    ctx.send(encryptedData);
  },

  createuser: async (ctx) => {
    var form_data = new FormData();
    const param = ctx.request.body;
    const head = ctx.request.header.authorization;
    for (var key in param) {
      form_data.append(key, param[key]);
    }

    var config = {
      method: "post",
      url: "https://toyyibpay.com/index.php/api/createAccount",
      headers: {
        Authorization: head,
        ...form_data.getHeaders(),
      },
      data: form_data,
    };

    axios(config)
      .then(function (response) {
        var jsons = JSON.stringify(response.data);
        var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
        ctx.send(encryptedData);
      })
      .catch(function (error) {
        ctx.send(error);
      });
  },

  createCategory: async (ctx) => {
    var form_data = new FormData();
    const param = ctx.request.body;
    const head = ctx.request.header.authorization;
    for (var key in param) {
      form_data.append(key, param[key]);
    }

    var config = {
      method: "post",
      url: "https://toyyibpay.com/index.php/api/createCategory",
      headers: {
        Authorization: head,
        ...form_data.getHeaders(),
      },
      data: form_data,
    };

    axios(config)
      .then(function (response) {
        var jsons = JSON.stringify(response.data);
        var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
        ctx.send(encryptedData);
      })
      .catch(function (error) {
        ctx.send(error);
      });
  },

  createBill: async (ctx) => {
    var form_data = new FormData();
    const param = ctx.request.body;
    const head = ctx.request.header.authorization;
    for (var key in param) {
      form_data.append(key, param[key]);
    }

    var config = {
      method: "post",
      url: "https://toyyibpay.com/index.php/api/createBill",
      headers: {
        Authorization: head,
        ...form_data.getHeaders(),
      },
      data: form_data,
    };

    axios(config)
      .then(function (response) {
        var jsons = JSON.stringify(data);
        var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
        ctx.send(encryptedData);
      })
      .catch(function (error) {
        ctx.send(error);
      });
  },

  payBill: async (ctx) => {
    var form_data = new FormData();
    const param = ctx.request.body;
    const head = ctx.request.header.authorization;
    for (var key in param) {
      form_data.append(key, param[key]);
    }

    var config = {
      method: "post",
      url: "https://toyyibpay.com/index.php/api/runBill",
      headers: {
        Authorization: head,
        ...form_data.getHeaders(),
      },
      data: form_data,
    };

    axios(config)
      .then(function (response) {
        var jsons = JSON.stringify(response.data);
        var encryptedData = CryptoJS.AES.encrypt(jsons,scrtkey).toString();
        ctx.send(encryptedData);
      })
      .catch(function (error) {
        ctx.send(error);
      });
  }
};
