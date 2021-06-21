// Main script.
var isEverythingCorrect = 0;
var percentage = 0;
var subPrice = 0;

window.addEventListener("load", function() {
   if(Number(localStorage.getItem("times-used")) > 0) {
      var timesUsed = Number(localStorage.getItem("times-used"));
   }

   if (Number(localStorage.getItem("all-total")) > 0) {
      $("#average-p").addClass("closed");
      $("#average-price").removeClass("closed");
      var medium = Number(localStorage.getItem("all-total")) / timesUsed;
      medium = medium.toFixed(2);
      $("#average-price").text("$" + medium);
      $(".average-section").addClass("showing-result");
      $("#average-details").removeClass("closed");
      $("#average-details").text("Based on previous data, you made a total of $" + Number(localStorage.getItem("all-total")) + " with " + timesUsed + " purchases.");
   }
});

$("button.form-confirm").click(function() {
   var timesUsed = Number(localStorage.getItem("times-used"));
   var previousTotal = Number(localStorage.getItem("all-total"));
   var price = document.getElementById("price").value;
   var isAccountCreator = document.getElementById("account-type").value;
   var isPurchaseByDiscover = document.getElementById("discover-type").value;

   if (price >= 1 && isAccountCreator != 'dont-know-account' && isPurchaseByDiscover != 'dont-know-discover') {
      isEverythingCorrect = 1;
      console.log("Everything is Correct: " + isEverythingCorrect);

      timesUsed += 1;
      
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
      console.log("Final price is: " + finalPrice);

      $("#price").removeClass("error");
      $("#account-type").removeClass("error");
      $("#discover-type").removeClass("error");
      $(".average-section").addClass("showing-result");
      $(".explanation").addClass("closed");
      $("#intro-explanation").text("Here's how much you're going to earn.");
      $("#price-result").text("$" + finalPrice);
      $(".price-result").removeClass("closed");

      $("#result-details").removeClass("closed");
      $("#result-details").text("Gumroad will apply a fee of " + percentage + "% from the original price ($" + price + ") and will then subtract $0.30.");

      var finalTotal = Number(Number(finalPrice) + previousTotal);
      var finalTotal = finalTotal.toFixed(2);
      localStorage.setItem("all-total", finalTotal);
      localStorage.setItem("times-used", timesUsed);
      var medium = Number(localStorage.getItem("all-total")) / timesUsed;
      medium = medium.toFixed(2);
      $("#average-price").text("$" + medium);
      $("#average-details").removeClass("closed");
      $("#average-details").text("Based on previous data, you made a total of $" + Number(localStorage.getItem("all-total")) + " with " + timesUsed + " purchases.");

   } else {
      $("button.form-confirm").addClass("error");
      setTimeout(function(){
         $("button.form-confirm").removeClass("error");
      }, 1500);

      console.log("Something is Wrong: " + isEverythingCorrect);

      $("#price").removeClass("error");
      $("#account-type").removeClass("error");
      $("#discover-type").removeClass("error");
      $("#result-section").removeClass("showing-result");
      $("#explanation").removeClass("closed");
      $("#intro-explanation").text("Whoops!");
      $("#explanation").text("Something went wrong. The errors have been highlighted in red.");
      
      if (price < 1) {
         $("#price").addClass("error");
      }
      
      if (isAccountCreator == 'dont-know-account') {
         $("#account-type").addClass("error");
      }
      
      if (isPurchaseByDiscover == 'dont-know-discover') {
         $("#discover-type").addClass("error");
      }

      $("#price-result").addClass("closed");
   }
});


// Back to top arrow animation.
$("document").ready(function(){
   $("a.back-to-top").hover(function(){
       $(".north").addClass("moveUp");
   }, function(){
       $(".north").removeClass("moveUp");
   });
});

// Nav bar animation on scroll.
window.addEventListener("scroll", function(){
   if(window.scrollY==0){
     $("nav").removeClass("scrolled");
   } else {
     $("nav").addClass("scrolled");
   }
});

$(".install").hover(function() {
   $(".material-icons-round").addClass("move-down");
}, function() {
   $(".material-icons-round").removeClass("move-down");
});

function clearData() {
   var confirmation = confirm("This will delete all the data you entered on Gumroad Calculator. This means that the app will look like you never used it, and won't show your average earnings. Are you sure you want to continue?");
   if (confirmation == true) {
      localStorage.removeItem("times-used");
      localStorage.removeItem("all-total");
      
      location.reload();
   }
}