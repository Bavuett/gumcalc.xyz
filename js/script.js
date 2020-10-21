// When the app starts, the account type is set to 0 (Classic Account) and
// gets the buttons ready.
sessionStorage.setItem("accountType", "0");

$(document).ready(function(){
   $("#classicAccount").addClass("active");
});

// When the user clicks the buttons, change the account type and changes
// the buttons' style to make the user know what kind of account they did choose.
$("#classicAccount").click(function(){
    sessionStorage.setItem("accountType", "0");
    $("#classicAccount").addClass("active");
    $("#creatorAccount").removeClass("active");
 });

$("#creatorAccount").click(function(){
    sessionStorage.setItem("accountType", "1");
    $("#classicAccount").removeClass("active");
    $("#creatorAccount").addClass("active");
 });

// Making the Donation Button look decent with a script.
$(".buttonDonate").hover(function(){
   $(".aButton").addClass("hover");
}, function(){
   $(".aButton").removeClass("hover");
});

// When the Checkbox is checkes, the script checks the state.
// If it is checked, sets the value to 1. If it is not, sets the value to 0.
$(".checkbox__input").click(function(){
   if($(".checkbox__input").is(":checked")) {
      sessionStorage.setItem("isGumroadDiscover", "1");
   } else {
      sessionStorage.setItem("isGumroadDiscover", "0");
   }
});


