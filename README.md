# mediafire-getlink

Fork of [mediafire-link](https://github.com/azgar44/mediafire-link) which I initially made because the author didn't have a Github repository linked nor was it handling instant download links (memleak).

This package will return a direct download link where possible when passed a Mediafire URL.

I am actively using this in some of my projects so any bug I find will be fixed here.

## Basic usage

```js
const mfLink = require('mediafire-getlink')
```

The most basic example is as follows

```js
const url = await mfLink('MEDIAFIRE LINK')
```

You can also modify the request config if you wish to use proxies (https://github.com/axios/axios#request-config)

```js
const url = await mfLink('MEDIAFIRE LINK', {
    proxy: {
        protocol: 'http',
        host: '0.0.0.0',
        port: 1234,
        auth: {
            username: 'user',
            password: 'pass',
        }
    }
})
```
