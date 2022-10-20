<script>
  import { SITE } from "~/config.mjs";
  import { onMount } from "svelte";

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
      if (parsedJson.nameErr) resNameErr = parsedJson.nameErr;
      else resNameErr = null;
      if (parsedJson.mailErr) resMailErr = parsedJson.mailErr;
      else resMailErr = null;
      if (parsedJson.messageErr) resMsgErr = parsedJson.messageErr;
      else resMsgErr = null;
      if (parsedJson.captchaErr) resCaptchaErr = parsedJson.captchaErr;
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
  <div class="max-w-6xl px-4 mx-auto sm:px-6">
    <div class="py-12">
      <div class="max-w-5xl p-6 mx-auto text-center rounded-md shadow-lg dark:shadow-slate-800">
        <h2 class="mb-8 text-4xl font-bold tracking-tighter md:text-4xl leading-tighter font-heading">Contact Us</h2>
        <div class="flex flex-col md:flex-row">
          <div class="flex flex-col items-center gap-6 md:w-1/2">
            <img src="/assets/images/undraw_contact.svg" class="w-2/3" alt="Contact Us" />
            <p class="mt-4 text-2xl font-bold tracking-tighter">Completely free consultation</p>
            <p>
              Our process begins with a free consultation meeting to chat over ideas and objectives for your website. Your inquiries about our
              features, costs, and procedures can be addressed by our head designer.
            </p>
            <p>Please contact us using the form, and we'll get in touch to arrange your consultation.</p>
            <p class="mb-6">
              If you'd rather write to us, you can do so at <a
                href="mailto:contact@pristineshock.com"
                class="text-primary-700 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-400"
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
              <div class="flex flex-col items-center justify-center py-32 mx-auto">
                <img src="/assets/images/undraw_mail_sent.svg" class="max-w-[10rem]" alt="Success" />
                <p class="p-6 text-2xl font-bold">
                  {resMsg}
                </p>
              </div>
            {:else if !resSuccess && !loading}
              <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center max-w-lg px-6 m-auto mt-6 text-left md:mt-0">
                <input aria-hidden="true" type="hidden" name="bot-field" bind:value={botField} />
                <div class="w-full my-2">
                  <label for="name">Name</label>
                  <input
                    bind:value={name}
                    class="w-full p-2 border rounded dark:border-slate-500 dark:bg-slate-800 dark:text-white"
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
                <div class="w-full my-2">
                  <label for="email">Email</label>
                  <input
                    bind:value={email}
                    class="w-full p-2 border rounded dark:border-slate-500 dark:bg-slate-800 dark:text-white"
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
                <div class="w-full my-2">
                  <label for="message">Message</label>
                  <textarea
                    bind:value={message}
                    class="w-full p-2 border rounded dark:border-slate-500 dark:bg-slate-800 dark:text-white"
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
                  <div class="w-full my-2 text-center">
                    <button
                      class="text-lg text-black border btn border-primary-500 bg-primary-500 hover:bg-primary-600 hover:border-primary-600"
                      type="submit"
                    >
                      Send</button
                    >
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
  @keyframes fancy {
    to {
      transform: rotate(360deg) scale(0.5);
    }
  }
</style>
