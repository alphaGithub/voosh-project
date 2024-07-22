const cors = require("cors");
const getAllowedDomains = () => {
  return [
    `localhost:${process.env.PORT}`,
    `127.0.0.1:${process.env.PORT}`,
    "http://localhost:3000",
    "http://localhost:3123",
  ];
};

const corsMiddleWare = cors({
  origin: async (origin, callback) => {
    const allowdomains = getAllowedDomains();
    const msg = `This site ${origin} does not have an access.`;
    if (!origin) return callback(null, true);
    if (!allowdomains.includes(origin)) return callback(msg, false);
    return callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
});
module.exports = corsMiddleWare;
