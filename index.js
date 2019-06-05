process.env.DEBUG = "config";
process.title = "config-microservice";

/**
 * handler for unhandled rejected promises.  This should never really get called, but we might expect some
 * node_module we depend on to be poorly written.
 */
process.on("unhandledRejection", function(reason, p) {
  console.log(
    "Possibly Unhandled Rejection at: Promise ",
    p,
    " reason: ",
    reason
  );
});

if (!process.env.ROBODOMO_MONGODB) {
  throw new Error("ENV ROBODOMO_MONGODB not set");
}

const fs = require("fs"),
  debug = require("debug")("config");

const MongoClient = require("mongodb").MongoClient,
  url = process.env.ROBODOMO_MONGODB;

const config = require("./Config.js");
const HostBase = require("microservice-core/HostBase");

const host = process.env.MQTT_HOST || "mqtt://robodomo",
  topic = process.env.MQTT_TOPIC || "settings";

class ConfigHost extends HostBase {
  constructor(config) {
    super(host, topic);
    this.config = config;
    this.state = { config: config };
  }
  async command() {}
}

const main = async () => {
  config._id = "config";
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
      .replaceOne(config, config, { upsert: true });
    configs["config"] = new ConfigHost(config);
  });

  // if a file in this director is changed on disk, exit/restart (forever)
  fs.watch("./", (eventType, filename) => {
    debug("eventType", eventType, "filename", filename);
    debug("restarting");
    process.exit(0);
  });
};
main();
