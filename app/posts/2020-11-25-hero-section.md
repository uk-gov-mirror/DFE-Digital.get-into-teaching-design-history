---
title: Hero section
description:
date: 2020-11-25
---

Following user feedback that the page titles could be clearer we changed the style used on both the homepage and content pages.

{% from "screenshots/macro.njk" import appScreenshots with context %}
{{ appScreenshots({
  items: [{
      text: "Homepage hero screenshot",
      img: { src: "01-homepage-hero-screenshot.jpg" }
    }, {
      text: "Content page hero screenshot",
      img: { src: "02-content-page-hero-screenshot.jpg" }
    }]
}) }}
