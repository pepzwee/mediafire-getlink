const jsdom = require('jsdom')
const axios = require('axios')
const { JSDOM } = jsdom

async function getLink(link) {
  const validLink = new RegExp(/^(http|https):\/\/(?:www\.)?(mediafire)\.com\/[0-9a-z]+(\/.*)/gm)

  if (!link.match(validLink)) throw new Error('Unknown link')

  try {
    let { data } = await axios.get(link)

    const dom = new JSDOM(data)
    const downloadButton = dom.window.document.querySelector('#downloadButton')

    if (!downloadButton) throw new Error('Could not find download button')

    return downloadButton.href
  } catch (err) {
    if (err.response) {
      if (err.response.status === 404) {
        throw new Error('The key you provided for file access was invalid.')
      }

      throw new Error(`Mediafire returned status ${err.response.status}`)
    }

    throw err
  }
}

module.exports = getLink