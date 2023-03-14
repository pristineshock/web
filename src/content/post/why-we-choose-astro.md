---
publishDate: 2022-10-12T09:30:00Z
title: "Why we choose Astro to build our webs?"
description: "Why we choose this new technology to build our webs?"
excerpt: "Astro is a new technology recently released. One of the thousands, if I may. But a promising and complete one. So we will talk about why we use it as our base for websites instead of ReactJS or just base HTML."
image: "~/assets/images/blog/astro-logo.jpg"
category: "WebDev"
tags:
  - astro
  - webdev
  - framework
  - javascript
---

> Astro is an **all-in-one web framework** for building **fast, content-focused websites.**
>
> _Quote from [Astro website](https://astro.build/)._

Astro is a new technology recently released. One of the thousands, if I may. But a promising and complete one. So we will talk about why we use it as our base for websites instead of ReactJS or just base HTML.

## Performance is key in Astro

Astro has a pattern that they call Islands. It is not new, but they extract a lot of it.

These called “Astro Island” are interactive components, in an otherwise static page of HTML. We know plain HTML is the fastest way, but it has almost zero interactivity. Islands are small components that exist in a base of HTML, making the base load super fast, and just using small components here and there. As is called on the Astro website, “_Think of them as islands in a sea of static, non-interactive HTML_”_._

So, anytime we build our website in Astro, Astro compilers first turn them into pure HTML, with no client-side JavaScript by default. Even if you use any other frontend framework, like React, Vue, or Svelte, Astro will prioritize the base HTML and then hydrate it with interactivity, if there is interactivity.

In the case of React, you must load all the JavaScript to start printing the base HTML, in Astro, the HTML is shown first, and then it adds the remaining JavaScript. This keeps every site fast by removing the unused JavaScript from the page and only using it when necessary.

Performance is always important. But when that time is proven that gives you more engagement, conversions, and money, it is a no-brainer why we choose speed and performance.

- Every 100ms faster → 1% more conversions ([Mobify](https://web.dev/why-speed-matters/), earning +$380,000/yr)
- 50% faster → 12% more sales ([AutoAnything](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/))
- 20% faster → 10% more conversions ([Furniture Village](https://www.thinkwithgoogle.com/intl/en-gb/marketing-strategies/app-and-mobile/furniture-village-and-greenlight-slash-page-load-times-boosting-user-experience/))
- 40% faster → 15% more sign-ups ([Pinterest](https://medium.com/pinterest-engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7))
- 850ms faster → 7% more conversions ([COOK](https://web.dev/why-speed-matters/))
- Every 1 second slower → 10% fewer users ([BBC](https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale))

_Quote from [Astro website](https://astro.build/)._

Astro specializes in getting the best of both words. Light speed of a simple HTML base, and interactivity and reactivity from just the necessary JavaScript.

Quoting Astro website, *“An Astro website can [load 40% faster with 90% less JavaScript](https://twitter.com/t3dotgg/status/1437195415439360003) than the same site built with the most popular React web framework. But don’t take our word for it: watch Astro’s performance leave Ryan Carniato (creator of Solid.js and Marko) [speechless](https://youtu.be/2ZEMb_H-LYE?t=8163).”*

**That is why we choose Astro.**

## Using React, Vue or Svelte?

Yes, you hear it right, Astro lets you use any other framework you want on top of it. The Astro people call this **Bring Your Own UI Framework (BYOF)**. It is not that is needed, we have built a lot of sites with just Astro as a framework, not adding more than simple packages to it, Astro already includes components, routing, asset handling, building process even bundling, and a lot of optimizations, and more. But in case we can’t do want we want in the base Astro, we can add React or Svelte (like this site) and use it with all the benefits of Astro.

## Content websites instead of apps

Astro was designed to build content-rich websites. And we specialize in that. Our clients priority it is to get known by the people, to show what their offer and to gain clients and attraction. A blog, for example, a portfolio, or landing page. We do not build apps, with complex user databases, dashboards, or a SAAS for example, not that is not possible in Astro, but it is not its main use.

Astro focuses on content and delivering that content fast. And it does it well.

## Server-side rendering

Astro focuses on server-side rendering as much as possible instead of client-side rendering. When using Astro, the website is built on the server and then given to you. You receive a full copy of it. When using React, for example, you receive an empty web, and then the website is loaded. Interesting difference, huh? This approach has its benefits, but an expensive tradeoff in performance. And velocity in these times is more important than ever.
