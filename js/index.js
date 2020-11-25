const cards = [...document.querySelectorAll('[class^="card"]')];

cards.forEach(card =>
  card.addEventListener("click", function() {
    this.classList.add("flip");
  })
);

cards.forEach(card =>
  card.addEventListener("transitionend", function() {
    this.classList.add("none");
  })
);

// ask whether service worker object exists
if ("serviceWorker" in navigator) {
  // Register the service worker
  navigator.serviceWorker.register("sw.js").then(
    function(result) {
      console.log("Service worker registered");
      console.log("Scope: " + result.scope);
    },
    function(error) {
      console.log("Service worker registration failed");
      console.log(error);
    }
  );
} else {
  // service workers are not supported
  console.log("Service workers not supported");
}
