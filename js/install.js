// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  if (window.matchMedia("(min-width: 900px)") == true) {
    e.preventDefault();
    deferredPrompt = e;
    $(".install").addClass("active");
  }
});

$(".install").click(function() {
   deferredPrompt.prompt();
});

window.addEventListener('appinstalled', () => {
   // Hide the app-provided install promotion
   $(".install").removeClass("active");
   // Clear the deferredPrompt so it can be garbage collected
   deferredPrompt = null;
 });