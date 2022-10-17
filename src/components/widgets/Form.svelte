<script>
  let botField = "";
  let name = "";
  let email = "";
  let message = "";

  let resNameErr = false;
  let resMailErr = false;
  let resMsgErr = false;
  $: resSuccess = false;
  $: resMsg = null;
  $: resStatus = null;
  $: submitting = false;
  $: loading = false;

  const handleSubmit = async () => {
    console.log({ email, name, message });
    try {
      submitting = true;
      var formData = new FormData();
      formData.append("name", name);
      formData.append("mail", email);
      formData.append("message", message);
      const response = await fetch(`/api/mail.php`, {
        method: "POST",
        body: formData,
      });

      let parsedJson = await response.json();
      console.log(parsedJson);

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
    } catch (error) {
      let parsedJson = await response.json();
      console.log(parsedJson);
      submitting = false;
      resStatus = parsedJson.status;
      resMsg = parsedJson.message;
      if (parsedJson.nameErr) resNameErr = parsedJson.nameErr;
      else resNameErr = null;
      if (parsedJson.mailErr) resMailErr = parsedJson.mailErr;
      else resMailErr = null;
      if (parsedJson.messageErr) resMsgErr = parsedJson.messageErr;
      else resMsgErr = null;
    }
  };
</script>

<section class="relative" id="contact">
  <div class="max-w-6xl px-4 mx-auto sm:px-6">
    <div class="py-12">
      <div class="max-w-3xl p-6 mx-auto text-center rounded-md shadow-lg dark:shadow-slate-800">
        <h2 class="mb-4 text-4xl font-bold tracking-tighter md:text-4xl leading-tighter font-heading">Let's talk!</h2>
        <p class="text-xl text-gray-600 dark:text-slate-400">
          Don't wait more time. Talk to us. We'll contact you in a moment and begin the process to get you online.
        </p>
        {#if loading}
          <div class="py-40 mx-auto fancy-spinner">
            <div class="spinner-ring" />
            <div class="spinner-ring" />
            <div class="spinner-dot" />
          </div>
        {/if}
        {#if resSuccess && !loading}
          <div class="flex items-center justify-center py-40 mx-auto">
            <p class="">
              {resMsg}
            </p>
          </div>
        {:else}
          <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center max-w-lg px-6 py-3 m-auto mt-6 text-left">
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
            {#if resStatus == "failed"}
              <p class="py-3 text-sm font-bold text-red-600">
                {resMsg}
              </p>
            {/if}
            <div class="w-full my-2 text-center">
              <button
                class="text-lg text-black border btn border-primary-500 bg-primary-500 hover:bg-primary-600 hover:border-primary-600"
                type="submit"
                disabled={submitting}
              >
                Send</button
              >
            </div>
          </form>
        {/if}
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
