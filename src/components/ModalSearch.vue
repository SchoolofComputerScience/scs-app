<template lang="pug">
div(class="modal modal_search")
  div(class="modal_contents")
    div(class="container")
      section(class="page_title large")
        div Search
      section(class="search")
        div(class="search_bar")
          button(class="search", name="Search modal button") Search
          label(for="search_modal", class="label_hidden") Search this website
          input(type="text", id="search_modal", placeholder="Search news, events, people and programs")

      section(class="trending")
        span(class="h2") Popular in the last few hours
        ul(class="list_trending list_multi_column visible")
          li(class="theme_events")
            a(href="#") #[span(class="item_title") Computer Science Visiting Speaker Talk] #[span(class="label") events] #[span(class="rank", style="width:100%")]
          li(class="theme_people")
            a(href="#") #[span(class="item_title") Martial Hebert - Director, Robotics Institute] #[span(class="label") people] #[span(class="rank", style="width:50%")]
          li(class="theme_research")
            a(href="#") #[span(class="item_title") Machine Learning] #[span(class="label") research] #[span(class="rank", style="width:30%")]
          li(class="theme_news")
            a(href="#") #[span(class="item_title") Architect Reveals Design of TCS Hall] #[span(class="label") news] #[span(class="rank", style="width:20%")]
          li(class="theme_events")
            a(href="#") #[span(class="item_title") ROBOBURGH Opportunity Expo] #[span(class="label") events] #[span(class="rank", style="width:10%")]
          li(class="theme_publications")
            a(href="#") #[span(class="item_title") ROBOBURGH Opportunity Expo] #[span(class="label") publications] #[span(class="rank", style="width:5%")]
</template>
