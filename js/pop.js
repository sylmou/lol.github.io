var showPop = (function(){
//弹窗关闭事件
var closes = $$(".pop_close");
for(var i = 0; i < closes.length; i++){
closes[i].onclick = function closes(){
    var containtor = this.parentElement.parentElement;
    containtor.style.display = "none";
    }
}

//展示弹窗事件
function showPop(id) {
    var containtor = $("#" + id);
$("#" + id).style.display = "";
    if(id === "popVideo") {
        var vdo = containtor.querySelector("video");
        vdo.play();
    }
}

//切换预约方式（微信/qq）
var Wx = $(".pop_wx");
var Qq = $(".pop_qq");

Wx.onclick = function choseWx() {
    Wx.classList.add("selected");
    Qq.classList.remove("selected");
}



Qq.onclick = function choseQq() {
    Wx.classList.remove("selected");
    Qq.classList.add("selected");
}

//处理关闭视频弹窗关闭视频暂停
var closeBtn = $("#popVideo .pop_close" );
closeBtn.addEventListener("click",function(){
    $("#popVideo video").pause();
});

return showPop;
})();

