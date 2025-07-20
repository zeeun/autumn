// 서비스 워커 버전
const CACHE_NAME = "autumn-namsan-chatbot-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1",
];

// 서비스 워커 설치
self.addEventListener("install", function (event) {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// 캐시된 리소스 제공
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 캐시에 있으면 캐시에서 반환
      if (response) {
        return response;
      }

      // 캐시에 없으면 네트워크에서 가져오기
      return fetch(event.request).then(function (response) {
        // 응답이 유효하지 않으면 그대로 반환
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // 응답을 복제하여 캐시에 저장
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// 오래된 캐시 정리
self.addEventListener("activate", function (event) {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
