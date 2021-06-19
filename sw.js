self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open("gumroad-calculator-v0-1").then(function(cache){
            return cache.addAll([
		        "/Gumroad-Calculator/",
                "/Gumroad-Calculator/css/style.css",
                "/Gumroad-Calculator/js/script.js",
                "/Gumroad-Calculator/manifest.json",
                "/Gumroad-Calculator/resources/512.png",
                "/Gumroad-Calculator/resources/152.png",
                "/Gumroad-Calculator/resources/jquery.js"
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
    var cacheWhiteList = ["gumroad-calculator-v0-1"];
    
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