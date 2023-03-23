<script>
  import { onMount } from "svelte";
  import { SITE } from "~/config.mjs";

  $: cookieConsent = "not";

  function setCookie(value) {
    localStorage.setItem("cookies", value);
    cookieConsent = "not";
    if (value === "enabled" && SITE.googleAnalyticsId) {
      loadScript();
    }
  }

  function loadScript() {
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

  onMount(() => {
    if (!localStorage.getItem("cookies")) {
      cookieConsent = "show";
    }

    if (localStorage.cookies === "enabled") {
      cookieConsent = "enabled";
      if (SITE.googleAnalyticsId) {
        loadScript();
      }
    }
  });
</script>

{#if cookieConsent === "show"}
  <div class={cookieConsent === "show" ? "block" : "hidden"} id="cookies">
    <div
      class="fixed bottom-0 z-50 w-full bg-black px-8 py-5 text-left text-sm text-white opacity-90 backdrop-filter transition md:bottom-5 md:left-5 md:max-w-sm md:rounded"
    >
      <header class="pb-2 text-lg font-bold">Cookie Agreement</header>
      <p class="pb-4 text-sm">
        We utilize <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank" rel="noreferrer">Cookies</a> for multiple purposes, including customizing
        content and monitoring the website performance.
      </p>
      <p class="pb-4 text-sm md:pb-8">Collected information is not sold or distributed.</p>
      <fotter class="flex justify-end gap-6 md:justify-center">
        <button
          type="button"
          class="btn font-md w-20 border-2 border-yellow-400 p-2 text-sm text-white hover:border-yellow-600 hover:bg-black dark:border-yellow-400 dark:hover:border-yellow-600 dark:hover:bg-gray-900 dark:hover:text-white"
          on:click|preventDefault={() => setCookie("disabled")}
        >
          Deny
        </button>
        <button type="button" class="btn font-md btn-primary  w-32 p-2 text-sm" on:click|preventDefault={() => setCookie("enabled")}> Accept </button>
      </fotter>
    </div>
  </div>
{/if}
