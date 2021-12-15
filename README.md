# mediafire-getlink

Slightly fixed version of [mediafire-link](https://www.npmjs.com/package/mediafire-link) which has no Github repository anymore as far as I know.

## Example

```js
const getLink = require('mediafire-getlink')

getLink('MEDIAFIRE LINK')
    .then(link => {
        console.log(link)
        //output: DOWNLOAD MEDIAFIRE LINK
    })
    .catch(console.error)