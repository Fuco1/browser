const Mousetrap = require('mousetrap');
const showhide = require('./app/js/showhide');

const remote = require('electron').remote
const window = remote.getCurrentWindow()

const minibufferStatus = document.getElementById('minibuffer-status')
const minibufferRead = document.getElementById('minibuffer-read')
const minibufferReadInput = document.getElementById('minibuffer-read-input')
const webview = document.getElementById('webview')

const loadstart = () => {
    minibufferStatus.innerText = 'Loading...'
}

const loadstop = () => {
    minibufferStatus.innerText = 'Ready'
}

webview.addEventListener('did-start-loading', loadstart)
webview.addEventListener('did-stop-loading', loadstop)

let search
let isearch = false
Mousetrap.bind('ctrl+s', function() {
    if (!isearch) {
        showhide.show(minibufferRead)
        showhide.hide(minibufferStatus)
        minibufferReadInput.focus()
    }
    isearch = true

    let searchStr = minibufferReadInput.value
    if (searchStr.length > 0) {
        webview.findInPage(searchStr)
    }
})

webview.addEventListener('found-in-page', (e) => {
    minibufferStatus.innerText = e.result.activeMatchOrdinal
})

Mousetrap.bind('alt+x', function () {
    showhide.show(minibufferRead)
    showhide.hide(minibufferStatus)
    minibufferReadInput.focus()
})

minibufferReadInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        if (isearch) {
            isearch = false
            webview.stopFindInPage('clearSelection')
        } else {
            let url = minibufferReadInput.value;
            if (!url.startsWith('https://') &&
                !url.startsWith('http://')) {
                url = 'https://' + url
            }
            webview.loadURL(url)
        }
        minibufferReadInput.value = ''
        showhide.hide(minibufferRead)
        showhide.show(minibufferStatus)
        return
    }

    if (isearch &&
        event.keyCode > 64 && event.keyCode < 91) {
        let searchStr = minibufferReadInput.value
        if (searchStr.length > 0) {
            webview.findInPage(searchStr)
        }
    }
})
