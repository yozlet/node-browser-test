// the sdk wants this
window.setImmediate = (fn) => setTimeout(fn,0)

// fix the http/https polyfill
const https = require('https')
const http = require('http')
const url = require('url')

function wrapHTTPRequestFn(fn) {
  return function wrappedRequest(a,b,c) {
     if (arguments.length == 3) {
      return fn(Object.assign({}, b, url.parse(a)), c)  
    }
    return fn(a,b)
  }
}
https.request = wrapHTTPRequestFn(https.request)
http.request = wrapHTTPRequestFn(http.request)

const LaunchDarkly = require('launchdarkly-node-server-sdk');
const sdk_key = process.env.LD_SDK_KEY; // remember, it's SDK key, NOT client ID
const client = LaunchDarkly.init(sdk_key, {
  streamUri: "/proxy/stream/",
  baseUri: "/proxy/app/",
  eventsUri: "/proxy/events/"
});
client.on("update", function() {
    client.allFlagsState({"key": "user@test.com"}).then(function(flags) {
	    document.getElementById("output").innerText = JSON.stringify(flags.toJSON(), null, 2)
    })
})
client.once("ready", () => {
    client.allFlagsState({"key": "user@test.com"})
      .then(
          (flags) => console.log(flags.toJSON()),
          (e) => console.error(e)
       )
    
});
