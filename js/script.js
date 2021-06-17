window.addEventListener("load", function(){
   $(".glass").addClass("closed");
   this.setTimeout(function(){
      $(".animation-loading").addClass("stopped");
      console.log("Animation Paused");
   }, 1500);
});