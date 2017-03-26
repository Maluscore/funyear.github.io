const log = function() {
    console.log.apply(console, arguments)
}

const e = function(selector) {
    return document.querySelector(selector)
}

const es = function (sel) {
    return document.querySelectorAll(sel)
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

const goNext = function(newIndex) {
	var s = e ('.section')
	var father = s.parentElement
    var grandpa = father.parentElement
	var newId = '#dian-'+ String(newIndex)
	var className = 'active'
	removeClassAll(className)
	var c = e(newId)
	c.classList.add(className)
    var n = (-100) * (newIndex)
    // console.log('n', n);
    e('.allSection').style.transform = `translate(${n}vw, -50%)`;
    grandpa.dataset.sections = newIndex
}

const setTag = function(index) {
    removeClassAll('highlight')
    es('.nav-a')[index].classList.add('highlight')
    e('line').style.transform = `translateX(${index * 5}rem)`
}

const goNextPage = function() {
    var now = e('.content').dataset.page
    var next = Number(now) + 1
    // console.log('goNextPage', next);
    goPage(next)
}

const goPage = function(index) {
    index = Number(index)
    if (index >= 0 && index <= 3) {
        e('.content').style.transform = `translateY(${index*(-100)}vh)`;
        e('.content').dataset.page = index
        setTag(index)
    }
    if (index == 3) {
        e('.nextPage').classList.add('hidden')
    } else {
        e('.nextPage').classList.remove('hidden')
    }
}

const playNext = function() {
    var s = e ('.section')
    var father = s.parentElement
    var grandpa = father.parentElement
    var zongUu = parseInt(grandpa.dataset.article)
    var index = parseInt(grandpa.dataset.sections)
    var newIndex = (index + 1) % zongUu
    goNext(newIndex)
}


const bindTiao = function() {
	var selector = '.dian'
	bindAll(selector, 'click', function(event){
		var target = event.target
		var id = parseInt(target.dataset.index)
		var newIndex = '#section-'+ String(id)
		var className = 'active'
		removeClassAll(className)
		target.classList.add(className)
        var n = (-100) * (id)
        e('.allSection').style.transform = `translate(${n}vw, -50%)`;
        var father = target.parentElement
        var grandpa = father.parentElement
        grandpa.dataset.sections = id
	})
}

const bindHeader = function() {
    var selector = '.nav-li'
    bindAll(selector, 'click', function(event) {
        var target = event.target
        var newIndex = parseInt(target.dataset.nav)
        var newId = '#nav-'+ String(newIndex)
    	var className = 'highlight'
    	removeClassAll(className)
    	var c = e(newId)
    	c.classList.add(className)
    })

    bindAll(selector, 'click', function(event){
        var target = event.target
        var newIndex = parseInt(target.dataset.nav)
        goPage(newIndex)
    })
}

const bindWheel = function() {
    e('body').addEventListener('mousewheel', function(event){
        var content = e('.content')
        var index = parseInt(content.dataset.page)
        if (event.deltaY > 0) {
            var newIndex = index + 1
            goPage(newIndex)
        } else {
            var newIndex = index - 1
            goPage(newIndex)
        }
    })
}

const bindNextbutton = function() {
    var next = e('.next')
    bindEvent(next, 'click', function(){
        playNext()
    })
}

const bindPrevbutton =function() {
    var prev = e('.prev')
    bindEvent(prev, 'click', function(){
        var s = e ('.section')
    	var father = s.parentElement
        var grandpa = father.parentElement
    	var zongUu = parseInt(grandpa.dataset.article)
    	var index = parseInt(grandpa.dataset.sections)
        var newIndex = (index + zongUu - 1) % zongUu
        goNext(newIndex)
    })
}


const themeNew =function(newIndex) {
    if (newIndex == 0) {
        e('.theme-color').style.background = '#353d40';
        e('.lazy').src = `img/${newIndex}.png`
    }
    else if (newIndex == 1) {
        e('.theme-color').style.background = 'rgba(242, 70, 70, 0.34)';
        e('.lazy').src = `img/${newIndex}.png`
    }
    else if (newIndex == 2) {
        e('.theme-color').style.background = 'rgba(118, 195, 221, 0.73)';
        e('.lazy').src = `img/${newIndex}.png`
    }

}

const bindYuan = function() {
	var selector = '.circle'
	bindAll(selector, 'click', function(event){
		var target = event.target
		var newIndex = parseInt(target.dataset.index)
        themeNew(newIndex)
        var father = target.parentElement
        var grandpa = father.parentElement
        var grandpapa = grandpa.parentElement
        grandpapa.dataset.theme = newIndex
	})
}

const themeNext = function() {
    var s = e ('.theme-color')
    var father = s.parentElement
    var grandpa = father.parentElement
    var zongUu = parseInt(grandpa.dataset.all)
    var index = parseInt(grandpa.dataset.theme)
    var newIndex = (index + 1) % zongUu
    themeNew(newIndex)
    grandpa.dataset.theme = newIndex
}

const bindNtbutton = function() {
    var button = e('.nextPage')
    bindEvent(button, 'click', function(event){
        goNextPage()
    })
}

const bindall = function() {
    bindTiao()
    bindHeader()
    bindNtbutton()
    bindWheel()
    bindNextbutton()
    bindPrevbutton()
    bindYuan()
}

const init = function() {
    setInterval(playNext, 10000)
    setInterval(themeNext, 5000)

}

const __main = function(){
    bindall()
    init()
}
__main()
