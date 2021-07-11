window.addEventListener("load", function() {
   setTimeout(function() {
        $("#loading-window").addClass("closed");
        console.log("Web App is ready to be used.\n");
        setTimeout(function() {
            $(".animation-loading").addClass("stopped");
       }, 1500);
   }, 1900);
});

setTimeout(function() {
    $(".offline-notification").removeClass("closed");
    console.log("Offline Notification opened.\n \nIf you are looking at the dev-tools and don't see anything talking about connection issues on the app, it's because the page already loaded everything, lol.");
}, 8000);

$(".reload").click(function() {
    location.reload();
});

$(".continue").click(function() {
    $("#loading-window").addClass("closed");
    console.log("User continued to the web app.");
});

