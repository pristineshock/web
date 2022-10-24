<script>
  import { onMount } from "svelte";
  import { SITE } from "~/config.mjs";

  var cookieConsent = true;
  var cookiesClass = "hidden";

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
    <div
      class="fixed bottom-0 w-full px-8 py-5 text-sm text-left text-white transition bg-black md:max-w-sm md:bottom-5 md:left-5 opacity-90 backdrop-filter md:rounded"
    >
      <header class="pb-2 text-lg font-bold">Cookie Agreement</header>
      <p class="pb-4 text-sm">
        We utilize <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank">Cookies</a> for multiple purposes, including customizing content
        and monitoring the website performance.
      </p>
      <p class="pb-4 text-sm md:pb-8">Collected information is not sold or distributed.</p>
      <fotter class="flex justify-end gap-6 md:justify-center">
        <button
          type="button"
          class="w-20 p-2 text-sm text-white btn border-primary-400 hover:border-primary-600 font-md"
          aria-label="Deny"
          data-toggle-cookies="disabled"
        >
          Deny
        </button>
        <button
          type="button"
          class="w-32 p-2 text-sm text-black btn bg-primary-400 hover:bg-primary-500 font-md"
          aria-label="Accept"
          data-toggle-cookies="enabled"
        >
          Accept
        </button>
      </fotter>
    </div>
  </div>
{/if}
