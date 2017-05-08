const Mousetrap = require('mousetrap');
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

Mousetrap.bind('alt+x', function () {
    minibufferStatus.classList.add('invisible')
    minibufferRead.classList.remove('invisible')
    minibufferReadInput.focus()
})

minibufferReadInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        webview.loadURL(minibufferReadInput.value)
        minibufferReadInput.value = ''
        minibufferRead.classList.add('invisible')
        minibufferStatus.classList.remove('invisible')
    }
})
