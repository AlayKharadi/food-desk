var cacheName = 'pc-v2'; 

self.addEventListener('install',  function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("CACHING /INDEX.HTML");
      return cache.addAll(
        [
          './Cart.js',
          './Menu.js',
          './Checkout.js',
          './ForgotPassword.js',
          './Homepage.js.js',
          './LogIn.js',
          './Setting.js',
          './Settings.js',
          './SignUp.js',
          '../Images/Pic1.jpeg',
          '../Images/Pic2.jpeg',
          '../Images/Pic3.jpeg',
          '../Images/Pic4.jpeg',
          '../Images/Food.png',
          '../Images/Food1.png',
          '../Images/not-found.svg',
          '../Images/noprofile.png',
          '../Images/Headder.svg',
          '../Images/flexible.jpeg',
          '../Images/breakfask.svg',
          '../Images/cafemanagment.png',
          '../Images/Customer.jpeg',
          '../homepage.css',
          '../Navlinks.js',
          '../store.js',
          '../actiontype.js',
          '../reducer.js',
          '../sever.js',
          '../routes.js',
          '../App.js',
          '../index.js',
          '../index.css',
          '../components/UserCard.js',
          '../components/Aboutus.js',
          '../components/CustomNavbar.js',
          '../components/Feature.js',
          '../components/Team.js',
          '../components/Slider.js',
          '../components/ShopBar.js',
          '../components/SearchBar.js',
          '../components/Pricing.js.js',
          '../components/Footer.js',
          '../components/RemoveShop.js',
          '../components/UpdateUser.js',
          '../components/slider.css',
          '../components/feature.css',
          '../components/aboutus.css'
        ]
      );
    })
  ); 
  console.log('[Service Worker] Install');   
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// FETCH PROXY & CACHING
// 1.) try get resource from cache else fetch and update cache else --> error
self.addEventListener('fetch', function (e) {
  console.log('network or cache: ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) {
          console.log('Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      }).catch(function(err){console.log(err);});
    })
  );
});