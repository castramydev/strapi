'use strict';
const axios = require("axios");
// var querystring = require("querystring");
const FormData = require("form-data");
const CircularJSON = require("circular-json");
// const Flatted = require("flatted");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  index: async (ctx) => {
    const bank = await axios.get(
      "https://toyyibpay.com/index.php/api/getBankFPX"
    );
    ctx.send(bank.data);
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
        var data = JSON.stringify(response.data);
        ctx.send(data);
      })
      .catch(function (error) {
        console.log(error);
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
        var data = JSON.stringify(response.data);
        ctx.send(data);
      })
      .catch(function (error) {
        console.log(error);
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

        var data = JSON.stringify(data);
        console.log(data);
        return data;
      })
      .catch(function (error) {
        console.log(error);
        // ctx.send(data);
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
        var data = JSON.stringify(response.data);
        ctx.send(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
