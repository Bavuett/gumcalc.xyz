self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open("gumroad-calculator-v2-2").then(function(cache){
            return cache.addAll([
		        "https://devlbd.github.io/Gumroad-Calculator/",
                "https://devlbd.github.io/Gumroad-Calculator/css/style.css",
                "https://devlbd.github.io/Gumroad-Calculator/js/script.js",
                "https://devlbd.github.io/Gumroad-Calculator/manifest.json",
                "https://devlbd.github.io/Gumroad-Calculator/resources/512.png",
                "https://devlbd.github.io/Gumroad-Calculator/resources/152.png",
                "https://devlbd.github.io/Gumroad-Calculator/js/jquery.js"
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
    var cacheWhiteList = ["gumroad-calculator-v2-2", "mytasks-v8-0-2"];
    
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