<script>
  import { onMount } from "svelte";
  import { SITE } from "~/config.mjs";
  import imageContact from "~/assets/images/undraw_contact.svg";
  import imageSuccess from "~/assets/images/undraw_mail_sent.svg";

  onMount(() => {
    window.onloadCallback = onloadCallback;
    window.toggleCaptcha = toggleCaptcha;
  });

  var onloadCallback = function () {
    grecaptcha.render("captcha", {
      sitekey: SITE.googleCaptchaPublicKey,
      callback: toggleCaptcha,
    });
  };

  const toggleCaptcha = (token) => {
    recaptcha_response = token;
    submitting = false;
  };

  var recaptcha_response = "";
  let botField = "";
  let name = "";
  let email = "";
  let message = "";

  let resNameErr = false;
  let resMailErr = false;
  let resMsgErr = false;
  let resCaptchaErr = false;
  $: resSuccess = false;
  $: resMsg = null;
  $: resStatus = null;
  $: submitting = true;
  $: loading = false;

  const handleSubmit = async () => {
    try {
      submitting = true;
      loading = true;

      var formData = new FormData();
      formData.append("name", name);
      formData.append("mail", email);
      formData.append("message", message);
      formData.append("recaptcha", recaptcha_response);
      const response = await fetch(SITE.origin + `/api/mail.php`, {
        method: "POST",
        body: formData,
      });

      let parsedJson = await response.json();

      submitting = false;
      resStatus = parsedJson.status;

      if (parsedJson.status == "success") resSuccess = true;
      resMsg = parsedJson.message;
      if (parsedJson.nameErr) resNameErr = "Name Error: " + parsedJson.nameErr;
      else resNameErr = null;
      if (parsedJson.mailErr) resMailErr = "Mail Error: " + parsedJson.mailErr;
      else resMailErr = null;
      if (parsedJson.messageErr) resMsgErr = "Message Error: " + parsedJson.messageErr;
      else resMsgErr = null;
      if (parsedJson.captchaErr) resCaptchaErr = "Captcha Error: " + parsedJson.captchaErr;
      else resCaptchaErr = null;
      loading = false;
    } catch (error) {
      resMsg = error.message;
      submitting = false;
      loading = false;
    }
  };
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" defer></script>
</svelte:head>

<section class="relative" id="contact">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="py-12">
      <div class="mx-auto max-w-5xl rounded-md p-6 text-center shadow-lg dark:shadow-slate-800">
        <h2 class="leading-tighter font-heading mb-8 text-4xl font-bold tracking-tighter md:text-4xl">Contact Us</h2>
        <div class="flex flex-col md:flex-row">
          <div class="flex flex-col items-center gap-6 md:w-1/2">
            <img src={imageContact} class="w-2/3" alt="Contact Us" />
            <p class="mt-4 text-2xl font-bold tracking-tighter">Completely free consultation</p>
            <p>
              Our process begins with a free consultation meeting to chat over ideas and objectives for your website. Your inquiries about our
              features, costs, and procedures can be addressed by our head designer.
            </p>
            <p>Please contact us using the form, and we'll get in touch to arrange your consultation.</p>
            <p class="mb-6">
              If you'd rather write to us, you can do so at <a
                href="mailto:contact@pristineshock.com"
                class="text-yellow-700 hover:text-yellow-800 dark:text-yellow-300 dark:hover:text-yellow-400"
                target="blank">contact@pristineshock.com</a
              >.
            </p>
          </div>
          <div class="md:w-1/2">
            {#if loading}
              <div class="flex items-center justify-center py-40">
                <div class="fancy-spinner">
                  <div class="spinner-ring" />
                  <div class="spinner-ring" />
                  <div class="spinner-dot" />
                </div>
              </div>
            {/if}
            {#if resSuccess && !loading}
              <div class="mx-auto flex flex-col items-center justify-center py-32">
                <img src={imageSuccess} class="max-w-[10rem]" alt="Success" />
                <p class="p-6 text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                  {resMsg}
                </p>
              </div>
            {:else if !resSuccess && !loading}
              <form on:submit|preventDefault={handleSubmit} class="m-auto mt-6 flex max-w-lg flex-col items-center px-6 text-left md:mt-0">
                <input aria-hidden="true" type="hidden" name="bot-field" bind:value={botField} />
                <div class="my-2 w-full">
                  <label for="name">Name</label>
                  <input
                    bind:value={name}
                    class="w-full rounded border p-2 dark:border-slate-500 dark:bg-slate-800 dark:text-white"
                    required
                    id="name"
                    placeholder="Name"
                    title="Name"
                    type="text"
                  />
                  {#if resNameErr}
                    <p class="text-sm font-bold text-red-600">{resNameErr}</p>
                  {/if}
                </div>
                <div class="my-2 w-full">
                  <label for="email">Email</label>
                  <input
                    bind:value={email}
                    class="w-full rounded border p-2 dark:border-slate-500 dark:bg-slate-800 dark:text-white"
                    required
                    id="email"
                    placeholder="blake@example.com"
                    title="Email"
                    type="email"
                  />
                  {#if resMailErr}
                    <p class="text-sm font-bold text-red-600">{resMailErr}</p>
                  {/if}
                </div>
                <div class="my-2 w-full">
                  <label for="message">Message</label>
                  <textarea
                    bind:value={message}
                    class="w-full rounded border p-2 dark:border-slate-500 dark:bg-slate-800 dark:text-white"
                    required
                    id="message"
                    rows={6}
                    placeholder="Write your message here..."
                    title="Message"
                    type="text"
                  />
                  {#if resMsgErr}
                    <p class="text-sm font-bold text-red-600">{resMsgErr}</p>
                  {/if}
                </div>
                <div class="mx-auto my-4">
                  <div id="captcha" />
                  {#if resCaptchaErr}
                    <p class="text-sm font-bold text-red-600">{resCaptchaErr}</p>
                  {/if}
                </div>
                {#if resStatus == "failed"}
                  <p class="py-3 text-sm font-bold text-red-600">
                    {resMsg}
                  </p>
                {/if}
                {#if !submitting}
                  <div class="my-2 w-full text-center">
                    <button class="btn btn-primary text-lg" type="submit">Send</button>
                  </div>
                {/if}
              </form>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .fancy-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
  }
  .fancy-spinner div {
    position: absolute;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .fancy-spinner div.spinner-ring {
    border-width: 0.5rem;
    border-style: solid;
    border-color: transparent;
    animation: 3s fancy infinite alternate;
  }
  .fancy-spinner div.spinner-ring:nth-child(1) {
    border-left-color: #333;
    border-right-color: #333;
  }
  .fancy-spinner div.spinner-ring:nth-child(2) {
    border-top-color: #333;
    border-bottom-color: #333;
    animation-delay: 2s;
  }
  .fancy-spinner div.spinner-dot {
    width: 1rem;
    height: 1rem;
    background: #333;
  }
  .dark .fancy-spinner div.spinner-ring:nth-child(1) {
    border-left-color: #eaeaea;
    border-right-color: #eaeaea;
  }
  .dark .fancy-spinner div.spinner-ring:nth-child(2) {
    border-top-color: #eaeaea;
    border-bottom-color: #eaeaea;
    animation-delay: 2s;
  }
  .dark .fancy-spinner div.spinner-dot {
    width: 1rem;
    height: 1rem;
    background: #eaeaea;
  }
  @keyframes fancy {
    to {
      transform: rotate(360deg) scale(0.5);
    }
  }
</style>
