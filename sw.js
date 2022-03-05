self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open("gumroad-calculator-v2-9-4").then(function(cache){
            return cache.addAll([
		        "https://gumcalc.xyz/",
		    	"https://gumcalc.xyz/?app-install-source=microsoft-store",
                "https://gumcalc.xyz/css/style.css",
			    "https://gumcalc.xyz/css/loading.css",
                "https://gumcalc.xyz/js/script.js",
		    	"https://gumcalc.xyz/js/loading.js",
                "https://gumcalc.xyz/manifest.json",
                "https://gumcalc.xyz/resources/512.png",
                "https://gumcalc.xyz/resources/152.png",
                "https://gumcalc.xyz/js/jquery.js"
            ]);
        })
    );
});

self.addEventListener("fetch", function(event){
    console.log("Browser fetched this URL: " + event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event){
    var cacheWhiteList = ["gumroad-calculator-v2-9-4"];
    
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    console.log("Deteleting Cache.");
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
