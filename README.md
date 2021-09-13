# node-browser-test

A (so far) failed attempt at using the LaunchDarkly NodeJS server-side SDK in the browser.

## What works

* Parcel bundles `launchdarkly-node-server-sdk` correctly
* Adding the `browserslist` config to `package.json` helps

## What doesn't

* Can't open stream connection because LD stream endpoint doesn't emit CORS headers
