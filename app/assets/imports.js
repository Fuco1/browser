const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, function (link) {
    let template = link.import.querySelector('.browser-template')
    let target = template.getAttribute('target')
    let clone = document.importNode(template.content, true)
    document.querySelector('#'+target).appendChild(clone)
})
