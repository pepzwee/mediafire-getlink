const jsdom = require('jsdom')
const axios = require('axios')
const { JSDOM } = jsdom

// some mediafire links are instant downloads
// and that will potentially crash our JSDOM parsing or make node run out of memory
// so this function makes sure that the given link returns "text/html" content-type
async function checkLinkResponseType(url, axiosOptions = {}) {
  const { headers } = await axios({
    method: 'head',
    url,
    ...axiosOptions,
  })

  // content type is something other than html
  if (!headers?.['content-type']?.includes('text/html')) {
    return headers['content-type']
  }

  return false
}

async function getLink(url, axiosOptions = {}) {
  const validLink = new RegExp(/^(http|https):\/\/(?:www\.)?(mediafire)\.com\/[0-9a-z]+(\/.*)/gm)

  if (!url.match(validLink)) throw new Error('Unknown link')

  try {
    // make sure we are going to be handling html before requesting data
    const type = await checkLinkResponseType(url, axiosOptions)

    // TODO: return link based on content-type
    // right now we just assume anything besides text/html is a direct dl link
    if (type) return url

    const { data } = await axios({
      method: 'get',
      url,
      ...axiosOptions,
    })

    const dom = new JSDOM(data)
    const downloadButton = dom.window.document.querySelector('#downloadButton')

    if (!downloadButton) throw new Error('Could not find download button')

    return downloadButton.href
  } catch (err) {
    if (err.response) {
      if (err.response.status === 404) {
        throw new Error('The key you provided for file access was invalid')
      }

      throw new Error(`Mediafire returned status ${err.response.status}`)
    }

    throw err
  }
}

module.exports = getLink