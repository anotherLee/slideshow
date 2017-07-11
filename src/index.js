require('./index.css')
var $ = require('./jquery.min')


$(function(){
  let $slideShow = $('.slideShow')
  let $view = $('.view')
  let count = $view.children().length
  let $width = $slideShow.width()
  let currentIndex = 0
  let clock   //这是一个全局变量，所以它可以被其它函数内部访问到

  let $ol = $('<ol class="controls"></ol>')
  $slideShow.append($ol)
  for(let i=0; i<count; i++){
    let $li = $(`<li>${i+1}</li>`)
    $ol.append($li)
  }

  $ol.on('click','li',function(e){
    let $li = $(e.currentTarget)
    let index = $li.index()
    changeColor(index)
    slide(index)
    currentIndex = index
  })

  function slide(index){
    console.log('这里是slide的index',index)
    if(index >= count){
      index = 0
    }else if(index < 0){
      index = count - 1
    }
    if(index === 0){
      currentIndex = index         //如何解决1的color问题，因为事件是异步的，所以要提前放在这里
      // clearInterval(clock)
      let $faker = $('.view').children().eq(0).clone()
      $view.append($faker)
      let distance = -($width * count)
      $view.css('transform', `translateX(${distance}px)`)
      $view.one('transitionend', function(){            //bug出在这里，如果是on的话当走一遍这个分支，就会一直监听
        $faker.remove()                                 //我真的要被气死了，花了一天的时间来解决这个问题
        let oldTransition = $view.css('transition')
        $view.css({
          transition: 'none',
          transform: `translate(0px)`
        })
        $view.offset()                                 //分开两段代码使浏览器不合并执行
        $view.css('transition',oldTransition)
        currentIndex = index
      })
      return
    }
    let distance = -($width * index)
    $view.css('transform', `translateX(${distance}px)`)
    currentIndex = index
  }


  function autoPlay(){
    clock = setInterval(function(){
      slide(currentIndex + 1)
      changeColor(currentIndex)
    },2500)
  }
  autoPlay()

  function changeColor(n){
    $('.controls').children().eq(n).addClass('active')
      .siblings().removeClass('active')
  }
  changeColor(0)


  $slideShow.on('mouseenter',function(){
    clearInterval(clock)
  })
  $slideShow.on('mouseleave',function(){
    autoPlay()
  })


})