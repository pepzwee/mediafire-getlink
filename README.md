# mediafire-getlink

Fork of [mediafire-link](https://github.com/azgar44/mediafire-link) which I initially made because the author didn't have a Github repository linked nor was it handling instant download links (memleak).

I am actively using this in some of my projects so any bug I find will be fixed here.

## Example

```js
const getLink = require('mediafire-getlink')

getLink('MEDIAFIRE LINK')
    .then(link => {
        console.log(link)
        //output: DOWNLOAD MEDIAFIRE LINK
    })
    .catch(console.error)
```