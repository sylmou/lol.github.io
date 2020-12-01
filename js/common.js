// 全局通用的一些函数或一开始要执行的全局代码
function $(selector) {
    return document.querySelector(selector);
}

function $$(selectors) {
    return document.querySelectorAll(selectors);
}


function width() {
    return document.documentElement.clientWidth;
}
function height() {
    return document.documentElement.clientHeight;
}


//轮播图
var carouselId = "newsCarousel"; //容器id
//轮播图数据
function createCarousel(carouselId,datas) {
  //获取整个轮播图容器
var containtor = document.getElementById(carouselId);
var carouselList = containtor.querySelector(".g_carousel_list");
var indecator = containtor.querySelector(".g_carousel_indecator");
var prev = containtor.querySelector(".g_carousel-prev");
var next = containtor.querySelector(".g_carousel-next");
var curIndex = 0; //显示当前页面索引

//创建轮播图中的各种元素
function createCarouselElements(){
  var listHtml = "";
  var indHtml = "";
  for(var i = 0; i < datas.length; i++){
    var data = datas[i];
    if(data.link){
      listHtml += `<li>
      <a href="${data.link}" target="_blank">
      <img src="${data.image}">
      </a>
      </li>`
    }else{
      listHtml += `<li>
      <img src="${data.image}">
      </li>`
    }
    indHtml += `<li></li>`;
  }
  carouselList.style.width = `${datas.length}00%`;
  carouselList.innerHTML = listHtml;
  indecator.innerHTML = indHtml;
}
createCarouselElements();


function setStatus() {
  carouselList.style.marginLeft = -curIndex *width() + "px";
  //设置指示器状态

  // 取消之前的selected

  var beforeSelected = indecator.querySelector(".selected");
  if(beforeSelected){
    beforeSelected.classList.remove("selected");
  }
  indecator.children[curIndex].classList.add("selected");


  //处理之前和之后按钮
  if(prev){
    if(curIndex === 0) {
      prev.classList.add("selected");//不可用样式
    } else {
      prev.classList.remove("selected");
    }
  }
  if(next){
    if(curIndex === datas.length - 1) {
      next.classList.add("selected");
    } else {
      next.classList.remove("selected");
    }
  }
}
setStatus();

//切换到上一个
function toPrev() {
  if(curIndex ===0){
    return;// 没有上一个 
  }
  curIndex--;
  setStatus();
}

//切换到下一个
function toNext() {
  if(curIndex === datas.length - 1){
    return;// 没有下一个 
  }
  curIndex++;
  setStatus();
}

var timer = null;//自动切换id
//开始自动切换
function start() {
  if(timer){
    //已经在切换
    return;
  }
  timer = setInterval(function() {
    curIndex++;
    if(curIndex === datas.length){
      curIndex = 0;
    }
    setStatus();
  },2000)
}
//停止切换
function stop() {
   clearInterval(timer);
   timer = null;
}

start();

//事件
if(prev) {
  prev.onclick = toPrev;
}
if(next) {
  next.onclick = toNext;
}

containtor.ontouchstart = function(e) {
  e.stopPropagation(); //阻止事件冒泡
  var x = e.touches[0].clientX;//记下横坐标
  //停止自动播放
  stop();
  carouselList.style.transition = "none";
  var pressTime = Date.now();//手指按下时间
  //取消过渡效果

  //监听移动事件
  containtor.ontouchmove = function(e) {
    var dis = e.touches[0].clientX - x;//计算拖动的距离
    carouselList.style.marginLeft = -curIndex *width() + dis + "px";
  }

//放手
containtor.ontouchend = function(e) {
    var dis = e.changedTouches[0].clientX - x;//计算拖动的距离
    start();
    carouselList.style.transition = "";
    //不再监听事件
    containtor.ontouchmove = null;
    var duration = Date.now() - pressTime;//松开手指计算滑动时间
    //500毫秒内
    if(duration < 500){
      if(dis > 20 && curIndex > 0){
        toPrev();
      }
    } else if(dis < -20 && curIndex < datas.length - 1){
      toNext();
    }
    
  //改动curIndex
  if(dis < -width() / 2 && curIndex < datas.length - 1){
    toNext();
  } else if(dis > width() / 2 && curIndex > 0){
    toPrev();
  }

    setStatus();
}
}
}
