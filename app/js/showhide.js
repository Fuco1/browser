function hide(element) {
    element.classList.add('hidden')
}

function show(element) {
    element.classList.remove('hidden')
}

module.exports = {
    hide: hide,
    show: show
}


// Alternative function style
// TODO: learn why this works
// function showhide() {
//     this.hide = function (element) {
//         element.classList.add('hidden')
//     }

//     this.show = function (element) {
//         element.classList.remove('hidden')
//     }
// }

// module.exports = showhide;

// when using:
// let showhide = require('./app/js/showhide');
// showhide = new showhide()
