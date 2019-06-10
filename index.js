process.env.DEBUG = "config";
process.title = "config-microservice";

if (!process.env.ROBODOMO_MONGODB) {
  throw new Error("ENV ROBODOMO_MONGODB not set");
}

const fs = require("fs"),
  debug = require("debug")("config"),
  CONFIG = "./config/Config.js",
  CONFIG_SAMPLE = "./Config.sample.js",
  MACROS = "./config/Macros.js",
  MACROS_SAMPLE = "./Macros.sample.js";

const defaults = () => {
  try {
    fs.mkdir("./config");
  }
  catch (e) {}
  if (!fs.existsSync(CONFIG)) {
    console.log("Creating", CONFIG, "from", CONFIG_SAMPLE);
    fs.copyFileSync(CONFIG_SAMPLE, CONFIG);
  }
  if (!fs.existsSync(MACROS)) {
    console.log("Creating", MACROS, "from", MACROS_SAMPLE);
    fs.copyFileSync(MACROS_SAMPLE, MACROS);
  }
};
defaults();

const MongoClient = require("mongodb").MongoClient,
  url = process.env.ROBODOMO_MONGODB,

const config = require(CONFIG),
  macros = require(MACROS);

const HostBase = require("microservice-core/HostBase");

const host = process.env.MQTT_HOST || "mqtt://robodomo",
  topic = process.env.MQTT_TOPIC || "settings";

class ConfigHost extends HostBase {
  constructor(config) {
    super(host, topic);
    this.config = config;
    this.state = config;
    //    console.log("state", this.state);
    this.state = { config: config };
  }
  async command() {}
}

const main = async () => {
  config._id = "config";
  macros._id = "macros";
  const configs = {};
  debug("connecting to ", url);
  MongoClient.connect(url, { useNewUrlParser: true }, async function(
    err,
    database
  ) {
    debug("Connected");
    await database
      .db("settings")
      .collection("config")
      .replaceOne({ _id: "config" }, config, { upsert: true });
    await database
      .db("settings")
      .collection("config")
      .replaceOne({ _id: "macros" }, macros, { upsert: true });
    configs["config"] = new ConfigHost(config);
  });

  if (process.env.NODE_ENV !== "production") {
    // in dev, watch index.js for changes
    fs.watch("./index.js", (eventType, filename) => {
      debug("eventType", eventType, "filename", filename);
      debug("restarting");
      process.exit(0);
    });
  }

  // if the Config.js file is changed, restart
  fs.watch(CONFIG, (eventType, filename) => {
    debug("eventType", eventType, "filename", filename);
    debug("restarting");
    process.exit(0);
  });

  // if the macros.js file is changed, restart
  fs.watch(MACROS, (eventType, filename) => {
    debug("eventType", eventType, "filename", filename);
    debug("restarting");
    process.exit(0);
  });
};

//
main();
