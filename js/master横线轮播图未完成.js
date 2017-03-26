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

const tiao = function() {
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

const playNext = function() {
	var s = e ('.section')
	var father = s.parentElement
    var grandpa = father.parentElement
	var zongUu = parseInt(grandpa.dataset.article)
	var index = parseInt(grandpa.dataset.sections)
	var newIndex = (index + 1) % zongUu
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

const header = function() {
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
        var n = (-100) * (newIndex)
        e('.content').style.transform = `translateY(${n}vh)`;
    })
}

const bindmouse = function() {
    var selector = '.content'
    //  e=e || window.event
    bindAll(selector, 'onmousewheel', function(event) {
        if(window.detail==120) {
            e('.content').style.transform = `translateY(100vh)`;

        }else{
            //向下滚动事件
            e('.content').style.transform = `translateY(-100vh)`;

        }
    })
}

// const e = sel => document.querySelector(sel)

const getPxByPs = function() {
    let a = e('.allSection').dataset.active
    return -a * 100
}

const movePs = function(len) {
    // console.log(len);
    let now = getPxByPs()
    let all = now + len
    if (all < 0 && all > -200) {
        e('.allSection').style.transform = `translate(${now + len}vw, -50%)`
    }
}

const goIndex = function(index) {
    index = Number(index)
    e('.allSection').style.transform = `translate(${-index*100}vw, -50%)`
    e('.allSection').dataset.active = index
    // var newId = '#dian-'+ String(index)
	// var className = 'active'
	// removeClassAll(className)
	// var c = e(newId)
	// c.classList.add(className)
    // var father = newId.parentElement
    // var grandpa = father.parentElement
    // grandpa.dataset.sections = index
}

const bindDrop = function() {
    let startX
    let isDrap = false
    e('.allSection').addEventListener('mousedown', function(event){
        startX = event.clientX
        isDrap = true
        this.classList.add('no')
        console.log('dragstart', startX);
    })

    e('.allSection').addEventListener('mousemove', function(event){
        if (isDrap == true) {
            let moveX = event.clientX
            console.log('draging', moveX);
            let len = moveX - startX
            movePs(len)
        }
    })

    e('.allSection').addEventListener('mouseup', function(event){
        let endX = event.clientX
        isDrap = false
        console.log('dragend', endX);
        let len = endX - startX
        let index = Number(e('.allSection').dataset.active)
        if (len < 50 && len > -50) {
            goIndex(index)
        } else if (len > 50) {
            if (index > 0) {
                goIndex(index-1)
            }
        } else if (len < -50) {
            if (index < 2) {
                goIndex(index+1)
            }
        }
        this.classList.remove('no')
    })
}

const bindNtbutton = function() {
    var button = e('.nextPage')
    bindEvent(button, 'click', function(event){
        // var newIndex = parseInt(target.dataset.nav)
        // var n = (-100) * (newIndex)
        e('.content').style.transform = `translateY(-100vh)`;
        // let n = e('body').scrollTop
        // log('n',n)
        // let h = e('.content').offsetHeight
        // log('h',h)
        // let speed = 10
        // for (var i = 0; i < 4; i++) {
        //     for (let i = n; i < h; i = i + speed) {
        //         setTimeout(function(){
        //             e('body').scrollTop = i + speed
        //         }, i+1)
        //     }
        // }

    })
}







const bindall = function() {
    tiao()
    header()
    bindDrop()
    bindNtbutton()
}

const init = function() {
    e('.allSection').style.transform = 'translate(0px, -50%)'
}

const __main = function(){
    bindall()
    init()
    // setInterval(playNext, 3000)
}
__main()
