var showPage = (function(){
    var pageIndex = 0;//当前显示页面索引
    var pages = $$(".page_containtor .page");//获取所有页面索引
    var nextIndex = null;//下一个页面索引
    
    //静止位置
    function setStatic() {
        nextIndex = null;
        for(var i = 0; i < pages.length; i++) {
        var page = pages[i];
        //判断是否为当前页面
        if(i === pageIndex) {
            //令当前页面zIndex = 1;
            page.style.zIndex = 1;
    
        } else {
            page.style.zIndex = 10; //不是当前页面的话则为10
            }
            page.style.top = (i - pageIndex) * height() + "px";//计算该页面的具体位置
        } 
    }
    setStatic();
    
    //移动中
    function moving(dis) {
        for(var i = 0; i < pages.length; i++){
            var page = pages[i];
            //判断是否不为当前页面
            if(i !== pageIndex){
                page.style.top = (i - pageIndex) * height() + dis + "px";
            }
        }
        //往下拖
    if(dis > 0 && pageIndex > 0){
        nextIndex = pageIndex - 1;
    }else if(dis < 0 && pageIndex < pages.length - 1) {
        //往上拖
        nextIndex = pageIndex + 1;
        }
    else{
        nextIndex = null;
        }
    }
    
    //移动完成
    function finishMove() {
        if(nextIndex === null){
            setStatic();
            return;
        }
        else{
            var nextPage = pages[nextIndex];
            nextPage.style.transition = "0.5s";
            nextPage.style.top = 0;
    
            setTimeout(function() {
                //当前页面发生改变
                pageIndex = nextIndex;
                //动画结束
                nextPage.style.transition = "";
                setStatic();
            },500)
        }
    }
    
    /// 事件
    var pageContainer = $(".page_containtor");
    pageContainer.ontouchstart = function (e) {
      // 类似于mousedown   表示手指按下
      var y = e.touches[0].clientY;
      // 手指按下，监听移动
      function handler(e) {
        var dis = e.touches[0].clientY - y;
        if (Math.abs(dis) < 20) {
          // 防止误触
          dis = 0; // 相当于手指没动
        }
        moving(dis);
        // 阻止事件的默认行为
        if (e.cancelable) {
          // 如果事件可以取消
          e.preventDefault(); // 取消事件 - 阻止默认行为
        }
      }
      // 手指按下，监听移动
      pageContainer.addEventListener("touchmove", handler, {
        passive: false,
      });
  
      // 手指松开，完成移动
      pageContainer.ontouchend = function () {
        finishMove();
        pageContainer.removeEventListener("touchmove", handler);
      };
    };
  
    //点击页面切换
    // index 当前页面索引
    function showPage(index) {
        nextIndex = index;
        finishMove();
    }
    return showPage;
})();




 

