self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open("gumroadCalculator-v0-1").then(function(cache){
            return cache.addAll([
		        "/Gumroad-Calculator/",
                "/Gumroad-Calculator/index",
		        "/Gumroad-Calculator/help",
                "/Gumroad-Calculator/css/style.css",
                "/Gumroad-Calculator/js/script.js",
                "/Gumroad-Calculator/manifest.json",
		        "/Gumroad-Calculator/resources/icon.ico",
                "/Gumroad-Calculator/resources/512.png",
                "/Gumroad-Calculator/resources/192.png",
                "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
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
    var cacheWhiteList = ["gumroadCalculator-v0-1"];
    
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