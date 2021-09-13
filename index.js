const LaunchDarkly = require('launchdarkly-node-server-sdk');
const sdk_key = ""; // remember, it's SDK key, NOT client ID
const client = LaunchDarkly.init(sdk_key);

client.once("ready", () => {
    client.variation("pricing-tier-3", {"key": "user@test.com"}, false,
      (err, showFeature) => {
        if (showFeature) {
          console.log("Flag is true!");
        } else {
          console.log("Flag is false!");
        }
      });
});
