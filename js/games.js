(function() {

    var carouselDatas = [
        {
          image: "https://game.gtimg.cn/images/lolm/m/f_1.jpg",
        },
        {
          image: "https://game.gtimg.cn/images/lolm/m/f_2.jpg",
        },
        {
          image: "https://game.gtimg.cn/images/lolm/m/f_3.jpg",
        },
          {
          image: "https://game.gtimg.cn/images/lolm/m/f_4.jpg",
        },
          {
          image: "https://game.gtimg.cn/images/lolm/m/f_5.jpg",
        },
          {
          image: "https://game.gtimg.cn/images/lolm/m/f_6.jpg",
        },
      ];
        createCarousel("gamesCarousel",carouselDatas);
      
      
        var containtor = $(".games_containtor");
        containtor.ontouchstart = function(e) {
        if(containtor.scrollTop >= 10) {
          e.stopPropagation();//阻止事件冒泡
        }
      }
  
  })();