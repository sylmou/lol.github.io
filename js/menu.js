(function(){
    var divSwtich = $(".menu_swtich");
    var ulNav = $(".menu_nav");
  

    toggleNav = function() {

        divSwtich.classList.toggle("menu_swtich--expend");
        ulNav.classList.toggle("menu_nav--expend");
    }
    
    divSwtich.onclick = toggleNav;
    
    ulNav.addEventListener('click',function() {
        toggleNav();
    });
})();

