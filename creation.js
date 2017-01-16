function createText(text) {
  return ({
    text,
  })
}

function createAttachment(text, buttons) {
  return ({
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text,
        buttons,
      }
    }
  })
}

function createButton(block_name, title) {
  return ({
    type: 'show_block',
    block_name,
    title,
  })
}

function createUrlButton(url, title) {
  return ({
    type: 'web_url',
    url,
    title,
  })
}

exports.createText = createText
exports.createAttachment = createAttachment
exports.createButton = createButton
exports.createUrlButton = createUrlButton
