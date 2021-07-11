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

function invokeServiceWorkerUpdateFlow(registration) {
    // TODO implement your own UI notification element
    $("#update-window").removeClass("closed");
    $(".install").click(function() {
        if (registration.waiting) {
            registration.waiting.postMessage('SKIP_WAITING');
        }
    });
    $(".later").click(function() {
        $("#update-window").addClass("closed");
    }) 
};

if ('serviceWorker' in navigator) {
    // wait for the page to load
    window.addEventListener('load', async () => {
        // register the service worker from the file specified
        const registration = await navigator.serviceWorker.register('/service-worker.js');

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration)
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener('updatefound', () => {
            if (registration.installing) {
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener('statechange', () => {
                    if (registration.waiting) {
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            invokeServiceWorkerUpdateFlow(registration);
                        } else {
                            // otherwise it's the first install, nothing to do
                            console.log('Service Worker initialized for the first time');
                        }
                    }
                })
            }
        });

        let refreshing = false;

        // detect controller change and refresh the page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload()
                refreshing = true
            }
        })
    })
}