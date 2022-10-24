<script>
  import { onMount } from "svelte";
  import { SITE } from "~/config.mjs";

  var cookieConsent = true;
  var cookiesClass = "hidden fixed bottom-5 left-5 text-white bg-stone-900 opacity-90 backdrop-filter rounded transition";

  onMount(() => {
    attachEvent("[data-toggle-cookies]", "click", function (e) {
      const elem = document.querySelector("#cookies");
      let value = e.getAttribute("data-toggle-cookies");
      localStorage.cookies = value;
      if (elem) elem.remove();
    });

    if (!localStorage.getItem("cookies")) {
      console.log("localstorage not has cookies");
      cookieConsent = true;
      cookiesClass += " !block";
    }

    if (localStorage.cookies === "enabled") {
      if (SITE.googleAnalyticsId) {
        const script = document.createElement("script");
        script.onload = function () {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", SITE.googleAnalyticsId);
        };
        script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.googleAnalyticsId}`;
        document.body.appendChild(script);
      }
    }
  });
</script>

{#if cookieConsent}
  <div class={cookiesClass} id="cookies">
    <div class="px-8 py-5 text-center text-sm">
      <p class="pb-4">Cookies sin aceptar {cookieConsent}</p>
      <button type="button" class="btn p-2 bg-primary-400 text-sm text-black font-md" aria-label="Deny" data-toggle-cookies="disabled"> Deny </button>
      <button type="button" class="btn p-2 bg-primary-400 text-sm text-black font-md" aria-label="Accept" data-toggle-cookies="enabled">
        Accept
      </button>
    </div>
  </div>
{/if}
