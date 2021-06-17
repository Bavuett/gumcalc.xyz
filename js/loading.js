window.addEventListener("load", function(){
   setTimeout(function(){
        $(".glass").addClass("closed");
        setTimeout(function(){
            $(".animation-loading").addClass("stopped");
            console.log("Animation Paused");
       }, 1500);
   }, 1900);
});