---
title: Site search
description:
date: 2021-03-31
---

Added Site search similar in function to the Gov design system site. When searching with JS enabled they are offered potential keyword matches in a dropdown. With no JS enabled, when the user searches the form is posted and they are teken to a results page. 

{% from "screenshots/macro.njk" import appScreenshots with context %}
{{ appScreenshots({
  items: [{
      text: "Search closed screenshot",
      img: { src: "01-search-closed-screenshot.jpg" }
    }, {
      text: "Search open screenshot",
      img: { src: "02-search-open-screenshot.jpg" }
    }, {
      text: "Search active screenshot",
      img: { src: "03-search-active-screenshot.jpg" }
    }, {
      text: "Search no js screenshot",
      img: { src: "04-search-no-js-screenshot.jpg" }
    }, {
      text: "Search no js result screenshot",
      img: { src: "05-search-no-js-result-screenshot.png" }
    }]
}) }}
