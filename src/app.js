const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const { join } = require('path');

const staticFilePath = join(process.cwd(), '/public');
app.use(
  express.static(staticFilePath)
);

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "uxd.co.jp"],
        "style-src": null,
        "frame-ancestors": ["'none'"],
      },
    },

    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-origin" },
    expectCt: {
      maxAge: 86400,
      enforce: true,
    },
    referrerPolicy: {
      policy: "no-referrer",
    },
    hsts: {
      maxAge: 15552000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    originAgentCluster: true,
    dnsPrefetchControl: {
      allow: true,
    },
    ieNoOpen: true,
    frameguard: {
      action: "deny",
    },
    permittedCrossDomainPolicies: {
      permittedPolicies: "none",
    },
    hidePoweredBy: true,
    xssFilter: true,
  })
);

const cors_config = {
  options: {
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["*", "X-Requested-With", "content-type", "authorization"],
    preflightContinue: false,
    maxAge: 600,
    credentials: true,
  },
  origin: "*",
  whitelist: {
    enable: false,
    list: [
      "http://192.168.87.32:3000",
      "http://192.168.87.32:5001",
      "https://trackdev3.ultra-x.jp",
    ],
  },
};

const corsWhitelistFunction = (origin, callback) => {
  !origin || cors_config.whitelist.list.indexOf(origin) !== -1
    ? callback(null, true)
    : callback(new Error("Not allowed by CORS").message);
};

const corsOptions = cors_config;

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());

const user = require("./routes/user");
const folder = require("./routes/folder");
const file = require("./routes/file");

app.use("/user", user);
app.use("/folder", folder);
app.use("/file", file);

app.use("/test", (req, res) => {
  res.status(200).json({
    message: "success",
    body: req.body,
  });
});

module.exports = app;
