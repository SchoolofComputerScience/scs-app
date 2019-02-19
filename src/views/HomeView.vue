<template>
  <transition name="page-transition" mode="out-in" appear>
    <div class="page">
      <section class="welcome">
        <div class="jumbotron">
          <p class="lead">Carnegie Mellon’s School of Computer Science is widely recognized as one of the first and best computer science programs in the world. Our programs train the next generation of innovators to solve real-world problems and improve the way people live and work.</p>
          <div class="quick-links">
            <h3>Quick Links</h3>
            <ul class="block-list">
              <li>
                <router-link to="/undergraduate-programs">
                  Undergraduate Programs
                </router-link>
              </li>
              <li>
                <router-link to="/master-programs">
                  Master Programs
                </router-link>
              </li>
              <li>
                <router-link to="/doctoral-programs">
                  Doctoral Programs
                </router-link>
              </li>
              <li>
                <router-link to="/undergraduate-admissions">
                  Undergraduate Admissions
                </router-link>
              </li>
              <li>
                <router-link to="/master-admissions">
                  Master Admissions
                </router-link>
              </li>
              <li>
                <router-link to="/doctoral-admissions">
                  Doctoral Admissions
                </router-link>
              </li>
              <li>
                <router-link to="/directory">
                  SCS Directory
                </router-link>
              </li>
              <li>
                <router-link to="/events">
                  Events At SCS
                </router-link>
              </li>
              <li>
                <router-link to="/donate">
                  Donate To SCS
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="teaser" v-if="newsLoaded">
        <NewsItem v-for="list in news" :key="list.uid" :data="list" :show_tags="false"></NewsItem>
      </section>
      <div class="news-footer footer">
        <router-link to="/news" class="button button-simple">
          Show More News
        </router-link>
      </div>
      <section class="department-list-wrapper">
        <h2 class="u-sr-only">Departments</h2>
        <ul class="department-list">
          <li class="compbio">
            <router-link to="/departments/compbio">
              <span>Computational Biology</span>
            </router-link>
          </li>
          <li class="csd">
            <router-link to="/departments/csd">
              <span>Computer Science</span>
            </router-link>
          </li>
          <li class="hcii">
            <router-link to="/departments/hcii">
              <span>Human Computer Interaction</span>
            </router-link>
          </li>
          <li class="software-research">
            <router-link to="/departments/isr">
              <span>Software Research</span>
            </router-link>
          </li>
          <li class="lti">
            <router-link to="/departments/lti">
              <span>Language Technologies</span>
            </router-link>
          </li>
          <li class="mld">
            <router-link to="/departments/mld">
              <span>Machine Learning</span>
            </router-link>
          </li>
          <li class="robotics">
            <router-link to="/departments/ri">
              <span>Robotics</span>
            </router-link>
          </li>
          <li>
            <router-link to="/departments">
              <span>See all Departments & Programs</span>
            </router-link>
          </li>
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
              <img src="../assets/img/views/HomeView/women-scs.jpg" alt="">
            </div>
          </section>
          <section class="brochure-bit">
            <div class="brochure-bit-content">
              <h2>Our Students Are in Incredible Demand with Leading Companies</h2>
              <p>We know learning happens largely outside the classroom, and we encourage students to get their hands dirty  — to participate in undergraduate research, to create real products and applications as assignments, and to explore ideas for new technologies with other students and faculty members.</p>
            </div>
            <div class="brochure-bit-media">
              <img src="../assets/img/views/HomeView/student.jpg" alt="">
            </div>
          </section>
        </div>
      </div>

      <div class="logo-bar">
        <ul class="u-content-container">
          <li>Example Internships:</li>
          <li><img src="../assets/img/views/HomeView/logos/google.png" alt="Google" /></li>
          <li><img src="../assets/img/views/HomeView/logos/facebook.png" alt="Facebook" /></li>
          <li><img src="../assets/img/views/HomeView/logos/amazon.png" alt="Amazon" /></li>
          <li><img src="../assets/img/views/HomeView/logos/microsoft.png" alt="Microsoft" /></li>
        </ul>
      </div>

      <div class="brochure-bits">
        <section class="brochure-bit u-content-container">
          <div class="brochure-bit-content">
            <h2>Live and Learn in the Newly Redesigned Gates at Hillman Centers</h2>
            <p>SCS lives mostly in the Gates and Hillman Centers, which opened in 2009. The complex includes 217,000 square feet of classroom, office and lab space — but the buildings are also certified LEED Gold and won the American Institute of Architects Honor Award for Architecture in 2012. When you live and learn in the Gates Center, you’re surrounded by interesting architecture, and there’s plenty of room to study or meet friends.</p>
          </div>
          <div class="brochure-bit-media">
            <img src="../assets/img/views/HomeView/hillman-center.jpg" alt="">
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
import NewsItem from '../components/NewsItem.vue';
import format from 'date-fns/format';

export default {
  name: 'home-view',

  components: {
    NewsItem
  },

  data: function () {
    return {
      // Should come from CMS somehow for editorial control
      'hero_carousel': []
    }
  },

  computed: {
    newsLoaded() {
      if(this.$store.state.news.error.length > 0){
        this.error = this.$store.state.news.error
      }else{
        this.error = false;
      }
      return this.$store.state.news.list.length > 0 ? true : false
    },
    news: function() {
      let newsList = this.$store.state.news.list;
      let list = [];

      for (let i = 0; i < 6; i++) {
        if (i === 0 && this.hero_carousel.length < 3) {
          this.hero_carousel.push({
            title : newsList[i].title,
            date  : format(newsList[i].date, 'MMM D, YYYY'),
            url   : '/news/' + newsList[i].uid,
            img   : newsList[i].image,
            isActive: true
          });
        }
        else if (i < 3) {
          this.hero_carousel.push({
            title : newsList[i].title,
            date  : format(newsList[i].date, 'MMM D, YYYY'),
            url   : '/news/' + newsList[i].uid,
            img   : newsList[i].image,
            isActive: false
          });
        }
        else {
          list.push(newsList[i]);
        }
      }

      return list;
    },
  },

  asyncData ({ store }) {
    store.dispatch('GET_NEWS_LIST');
    store.dispatch('GET_EVENTS_LIST');
    store.dispatch('GET_RESEARCH_FIELDS');
    return store.dispatch('GET_DIRECTORY');
  }
}
</script>
