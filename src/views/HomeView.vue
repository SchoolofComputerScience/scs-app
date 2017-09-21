<template>
  <transition name="page-transition" mode="out-in" appear>
    <div class="page">

      <Hero
        headline="New Method Enables Telescoping Devices That Bend and Twist"
        headingLevel=2
        subhead="Technology could result in robots that readily expand or shrink."
        link="/news/carnegie-mellon-method-enables-telescoping-devices-bend-and-twist"
        backgroundImageURL="http://www.cs.cmu.edu/sites/default/files/lizard-teaser_banner_1.jpg"
      ></Hero>

      <TeaserCardList
        :cards="cards"
        :callToAction="{'Show more news': '/news'}">
      </TeaserCardList>

      <section class="programs">
        <div class="u-content-container">
          <div class="programs-blurb">
            <h1>Imagine working with a team of researchers to create gestures for a robot designed to help people with mobility issues.</h1>
            <p>Or maybe you can’t wait to enter a hackathon and create something that changes how we interact with the world forever. And let’s not forget that all-important summer internship. It all can be done at CMU-SCS.</p>
          </div>
          <ul class="programs-list diagonal-separated-list">
            <li><ALink url="#">Undergraduate Programs</ALink></li>
            <li><ALink url="#">Graduate Programs</ALink></li>
            <li><ALink url="#">Doctoral Programs</ALink></li>
            <li><ALink url="#">Overview of Programs</ALink></li>
          </ul>
        </div>
      </section>

      <section class="departments-list-wrapper">
        <h2 class="u-sr-only">Departments</h2>
        <ul class="departments-list">
          <li><ALink url="#">
            <img src="http://fillmurray.com/400/400" alt="">
            <span>Computational Biology</span>
          </ALink></li>
          <li><ALink url="#">
            <img src="http://fillmurray.com/400/450" alt="">
            <span>Computer Science</span>
          </ALink></li>
          <li><ALink url="#">
            <img src="http://fillmurray.com/400/400" alt="">
            <span>Human Computer Interaction</span>
          </ALink></li>
          <li><ALink url="#">
            <img src="http://fillmurray.com/400/450" alt="">
            <span>Software Research</span>
          </ALink></li>
          <li><ALink url="#">
            <img src="http://fillmurray.com/400/400" alt="">
            <span>Language Technologies</span>
          </ALink></li>
          <li><ALink url="#">
            <img src="http://fillmurray.com/400/450" alt="">
            <span>Machine Learning</span>
          </ALink></li>
          <li><ALink url="#">
            <img src="http://fillmurray.com/400/400" alt="">
            <span>Robotics</span>
          </ALink></li>
          <li><ALink url="#">
            <span>See all Departments & Programs</span>
          </ALink></li>
        </ul>
      </section>

      <div class="brochure-bits">
        <div class="u-content-container">
          <section class="brochure-bit">
            <div class="brochure-bit-content">
              <blockquote>
                <h2>There’s a lot of thinking out there that you need to change the curriculum to suite women, but that’s just not true.</h2>
                <p>Cultural factors play a more important role than gender differences. Indeed, here at CMU in a more balanced environment we’ve not seen the familiar, simplistic gender divide in computer science. Rather, we’ve found men and women relate to computer science through a spectrum of attitudes and with more similarities than differences.</p>
                <footer>
                  <cite>
                    <strong>Carol Frieze</strong>
                    Director, Women@SCS
                  </cite>
                </footer>
              </blockquote>
            </div>
            <div class="brochure-bit-media">
              <img src="http://fillmurray.com/600/500" alt="">
            </div>
          </section>
          <section class="brochure-bit">
            <div class="brochure-bit-content">
              <h2>Our Students Are in Incredible Demand with Leading Companies</h2>
              <p>We know learning happens largely outside the classroom, and we encourage students to get their hands dirty  — to participate in undergraduate research, to create real products and applications as assignments, and to explore ideas for new technologies with other students and faculty members.</p>
            </div>
            <div class="brochure-bit-media">
              <img src="http://fillmurray.com/600/500" alt="">
            </div>
          </section>
        </div>
      </div>

      <div class="logo-bar">
        <ul class="u-content-container">
          <li>Example Internships</li>
          <li>IBM</li>
          <li>The Wall Street Journal</li>
          <li>MSNBC</li>
          <li>The Huffington Post</li>
        </ul>
      </div>

      <div class="brochure-bits">
        <section class="brochure-bit u-content-container">
          <div class="brochure-bit-content">
            <h2>Live and Learn in the Newly Redesigned Gates at Hillman Centers</h2>
            <p>SCS lives mostly in the Gates and Hillman Centers, which opened in 2009. The complex includes 217,000 square feet of classroom, office and lab space — but the buildings are also certified LEED Gold and won the American Institute of Architects Honor Award for Architecture in 2012. When you live and learn in the Gates Center, you’re surrounded by interesting architecture, and there’s plenty of room to study or meet friends.</p>
          </div>
          <div class="brochure-bit-media">
            <img src="http://fillmurray.com/600/500" alt="">
          </div>
        </section>
      </div>

      <div class="factoid-bar">
        <ul class="factoid-bar-list u-content-container">
          <li>
            <h2>27 Programs</h2>
            <p>Cross disciplinary boundaries</p>
          </li>
          <li>
            <h2>15 Libraries</h2>
            <p>Holds over 11 million volumes</p>
          </li>
          <li>
            <h2>$1 Billion</h2>
            <p>Annual Research Budget</p>
          </li>
        </ul>
      </div>

    </div>
  </transition>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import Hero from '../components/Hero.vue'
import TeaserCardList from '../components/TeaserCardList.vue'
import ALink from '../components/ALink.vue';

export default {
  name: 'home-view',

  components: {
    Spinner,
    Hero,
    TeaserCardList,
    ALink
  },

  data: function () {
    return {
      'cards': {
        card0: {
          'headline': 'A Sensor That Could Soon Make Homes Scary-Smart',
          'subhead': 'Optional subhead',
          'linkURL': 'https://www.wired.com/2017/05/supercharged-sensor-soon-make-homes-scary-smart/',
          'label':'News & Events',
          'imageURL': 'http://ai.cs.cmu.edu/sites/default/files/styles/card_image/public/Synthetic%20Sensor%20burner.jpg?itok=Rwxr5ZLg',
        },
        card1: {
          'headline': 'A Sensor That Could Soon Make Homes Scary-Smart',
          'subhead': 'Optional subhead',
          'linkURL': 'https://www.wired.com/2017/05/supercharged-sensor-soon-make-homes-scary-smart/',
          'label':'News & Events',
          'imageURL': 'http://ai.cs.cmu.edu/sites/default/files/styles/card_image/public/Synthetic%20Sensor%20burner.jpg?itok=Rwxr5ZLg',
        },
        card2: {
          'headline': 'A Sensor That Could Soon Make Homes Scary-Smart',
          'subhead': 'Optional subhead',
          'linkURL': 'https://www.wired.com/2017/05/supercharged-sensor-soon-make-homes-scary-smart/',
          'label':'News & Events',
          'imageURL': 'http://ai.cs.cmu.edu/sites/default/files/styles/card_image/public/Synthetic%20Sensor%20burner.jpg?itok=Rwxr5ZLg',
        },
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

///
// Programs listing
///
.programs {
  background: #fff;

  .u-content-container {
    padding: $default-gutter;

    @include breakpoint-min(desktop) {
      padding: #{$default-gutter * 2};
    }

    @include breakpoint-min(full) {
      padding: #{$default-gutter * 3} #{$default-gutter * 4};
    }
  }

  h1 {
    font-size: 1.5em;
    line-height: 1.333;
    @include breakpoint-min(desktop) {
      font-size: 1.875em;
    }
  }

  p {
    font-size: 1.25em;
    line-height: 1.95;
  }
}

@include breakpoint-min(laptop) {
  .programs .u-content-container {
    display: flex;
    align-items: flex-start;
  }

  .programs-blurb {
    width: 66.667%;
    padding-right: $default-gutter * 2;
  }

  .programs-list {
    width: 33.333%;
  }
}

.programs-list {
  font-size: 1em;
  background: #F7F7F7;

  li {
    margin: 0 0 0.5em 0.5em;
    padding: 0;
    background: #fff;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    display: inline-block;
    padding: 0.75em 1em;
  }
}

///
// Department listing
///
.departments-list-wrapper {
  background: #fff;
}

.departments-list {
  display: flex;
  flex-wrap: wrap;
  max-width: $max-width;
  margin: 0 auto;

  li {
    width: 100%;
    overflow: hidden;
    @include breakpoint-min(phone) {
      width: 50%;
    }
    @include breakpoint-min(laptop) {
      width: 33.333%;
    }
    @include breakpoint-min(desktop) {
      width: 25%;
    }

    a {
      position: relative;
      z-index: 0;
      display: block;
      box-sizing: content-box;
      padding: 0 0 93.2%;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        display: block;
        width: 100%;
        height: 100%;
        background:
          linear-gradient(180deg,rgba(0,0,0,0.05) 0%,
          rgba(0,0,0,0.45) 66%,
          rgba(0,0,0,0.65) 100%);
      }

      span {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        padding: $default-gutter * 0.75;
        font-size: 1.25em;
        font-weight: 600;
        color: #fff;
        @include breakpoint-min(phablet) {
          padding: #{$default-gutter * 1.25} #{$default-gutter * 1.5};
        }
      }
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
    }
  }

  li:last-child {
    @include breakpoint-min(laptop) {
      width: 66.667%;
    }

    @include breakpoint-min(desktop) {
      width: 25%;
    }

    a {
      background: #900;

      @include breakpoint-min(laptop) {
        padding-bottom: 46.6%;
      }
      @include breakpoint-min(desktop) {
        padding-bottom: 93.2%;
      }

      &:before {
        // Remove gradient on solid color
        display: none;
      }
    }
  }
}

///
// Logo Bar
///
.logo-bar {
  padding: #{$default-gutter * 1.06} 0;
  color: #fff;
  background: #006677;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  li {
    padding: #{$default-gutter * 0.5} #{$default-gutter * 0.5};
  }
}

///
// Brochure bits section
///
.brochure-bits {
  background: #fff;
}

.brochure-bit {
  display: flex;
  flex-direction: column-reverse;
  padding: $default-gutter;
  font-size: 1.25rem;
  line-height: 1.7;
  @include breakpoint-min(laptop) {
    flex-direction: row;
    padding: #{$default-gutter * 2};

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }
  @include breakpoint-min(full) {
    padding: #{$default-gutter * 3} #{$default-gutter * 4};
  }

  // Special spacing between touching brochure bits
  + .brochure-bit {
    padding-top: $default-gutter;
  }

  .brochure-bit-content {
    @include breakpoint-min(phablet) {
      padding: #{$default-gutter * 0.5} #{$default-gutter * 2} $default-gutter 0;
    }
    @include breakpoint-min(laptop) {
      padding-right: $default-gutter * 2;
      padding-left: 0;
      width: 55%;
    }
  }

  &:nth-child(even) .brochure-bit-content {
    @include breakpoint-min(laptop) {
      padding-left: $default-gutter * 2;
      padding-right: 0;
    }
  }

  .brochure-bit-media {
    text-align: center;
    padding-bottom: $default-gutter;
    @include breakpoint-min(laptop) {
      width: 45%;
      padding-bottom: 0;
    }

    img {
      max-width: 100%;
    }
  }

  h2 {
    font-size: 1.4em;
    line-height: 1.44;
    font-weight: bold;
  }

  p {
    font-size: inherit;
    line-height: inherit;
  }

  blockquote {
    position: relative;
    border-left: 0.5rem solid #f7f7f7;
    padding: 0 0 0 1.875rem;

    &:before {
      content: '\201C';
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.125em 0;
      transform: translate(-50%, 0);
      font-size: 4.25em;
      line-height: 0.5;
      color: #900;
      background: #fff;
    }
  }

  cite {
    font-size: 1rem;
    line-height: 1.375;
    font-style: italic;

    strong {
      display: block;
      font-style: normal;
    }
  }
}

///
// Factoid bar
///
.factoid-bar {
  padding: 4.7em 0;
  font-size: 1.25rem;
  line-height: 1.35;
  text-align: center;
  color: #fff;
  background: #224477;

  @include breakpoint-min(tablet) {
    .factoid-bar-list {
      display: flex;
      justify-content: space-evenly;
    }

    li {
      flex-basis: 25%;
    }
  }

  h2 {
    margin: 0;
    padding: 0 0 0.5625rem;
    border-bottom: 0.5rem solid rgba(220, 220, 220, 0.2);
    font-size: 1.5em;
    font-weight: 900;
    color: #fff;
  }

  p {
    padding: 1rem 0 0;
    font-style: italic;
  }
}

</style>
