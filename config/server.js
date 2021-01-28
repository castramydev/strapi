

module.exports = ({ env }) => ({

  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '6161ebc5a69f40c6b1867509df2e2f79'),
    },
  },
});
