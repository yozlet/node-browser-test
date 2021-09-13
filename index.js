// the sdk wants this
window.setImmediate = (fn) => setTimeout(fn,0)
const LaunchDarkly = require('launchdarkly-node-server-sdk');
const sdk_key = process.env.LD_SDK_KEY; // remember, it's SDK key, NOT client ID
const client = LaunchDarkly.init(sdk_key, {
  streamUri: "http://localhost:1234/proxy/stream/",
  baseUri: "http://localhost:1234/proxy/app/",
  eventsUri: "http://localhost:1234/proxy/events/"
});

client.once("ready", () => {
    client.allFlagsState({"key": "user@test.com"})
      .then(
          (flags) => console.log(flags.toJSON()),
          (e) => console.error(e)
       )
    
});
