self.addEventListener("install",e =>{
    //Installation of PWA
        console.log("Instalation done !!"); 
        
        //caching data
        e.waitUntil(
            caches.open("static").then(cache =>{
                //files to cached when there is slow or no internet
                return cache .addAll(["./","./style.css","./mobile.css","./img/logo192.png", "./img/logo.png"]);
            })
        );
    });

    self.addEventListener("fetch", e => {
        e.respondWith(
            caches.match(e.request)
                .then(response => {
                    return response || fetch(e.request);
                })
        )
    });
    