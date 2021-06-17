var isEverythingCorrect = 0;
var percentage = 0;
var subPrice = 0;

$("button.form-confirm").click(function(){
   var price = document.getElementById("price").value;
   var isAccountCreator = document.getElementById("account-type").value;
   var isPurchaseByDiscover = document.getElementById("discover-type").value;
   if (price >= 1 && isAccountCreator != 'dont-know-account' && isPurchaseByDiscover != 'dont-know-discover') {
      isEverythingCorrect = 1;
      console.log("Everything is Correct: " + isEverythingCorrect);
      
      if (isAccountCreator == 'classic') {
         percentage = 8.5;
      } else {
         percentage = 3.5;
      }

      if (isPurchaseByDiscover == 'discover') {
         percentage = percentage + 10;
      }

      subPrice = (price) * percentage / 100;
      var finalPrice = (price - subPrice) - 0.30;
      finalPrice = finalPrice.toFixed(2);
      console.log(finalPrice);

      $("#price").removeClass("error");
      $("#account-type").removeClass("error");
      $("#discover-type").removeClass("error");
      $(".result-section").addClass("showing-result");
      $(".explanation").addClass("closed");
      $(".intro-explanation").text("Here's what you're going to earn.");
      $(".price-result").text("$" + finalPrice);
      setTimeout(function(){
         $(".price-result").removeClass("closed");
      }, 800);

   } else {
      $("button.form-confirm").addClass("error");
      setTimeout(function(){
         $("button.form-confirm").removeClass("error");
      }, 1500);
      console.log("Something is Wrong: " + isEverythingCorrect);
      $("#price").removeClass("error");
      $("#account-type").removeClass("error");
      $("#discover-type").removeClass("error");
      $(".result-section").removeClass("showing-result");
      $(".explanation").removeClass("closed");
      $(".intro-explanation").text("Whoops!");
      $(".explanation").text("Something is wrong. The errors have been highlighted in red.");
      
      if (price < 1) {
         $("#price").addClass("error");
      }
      
      if (isAccountCreator == 'dont-know-account') {
         $("#account-type").addClass("error");
      }
      
      if (isPurchaseByDiscover == 'dont-know-discover') {
         $("#discover-type").addClass("error");
      }

      setTimeout(function(){
         $(".price-result").addClass("closed");
      }, 800);
   }
});

$("document").ready(function(){
   $("a.back-to-top").hover(function(){
       $(".north").addClass("moveUp");
   }, function(){
       $(".north").removeClass("moveUp");
   });
});

window.addEventListener("scroll", function(){
   if(window.scrollY==0){
     $("nav").removeClass("scrolled");
   } else {
     $("nav").addClass("scrolled");
   }
});