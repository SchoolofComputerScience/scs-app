<template>
  <section class="page">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <div class="member-view" v-if="loaded">
      <transition name="fade" mode="out-in" appear>
        <div>

          <section class="top-header">
            <div class="image" v-if="member.image_url" :style="{ 'background-image': 'url(' + member.image_url + ')' }">
            </div>
            <div>
              <h1 class="full_name">{{member.full_name}}</h1>
              <p class="full_title">{{member.scs_relationship_desc}}</p>
              <p v-if="member.homepage_url" class="homepage"><a :href="member.homepage_url">{{member.homepage_url}}</a></p>
            </div>
          </section>

          <section class="main-positions" v-for="position in member.positions" v-if="position.primary_position == 'true'">
            <p><router-link :to="'/departments/' + position.department">{{position.department_name}}</router-link></p>
            <p class="job" v-if="position.title">{{position.title | tlc}}</p>
          </section>

          <section v-if="member.positions.length > 0" class="sub-positions">
            <div v-for="position in member.positions" v-if="position.primary_position == 'false'">
              <p><router-link :to="'/departments/' + position.department">{{position.department_name}}</router-link></p>
              <p v-if="position.title" class="job">{{position.title | tlc}}</p>
            </div>
          </section>

          <section v-if="member.biography" class="biography">
            <div v-html="member.biography"></div>
          </section>

          <section class="directory-information">
            <div v-if="member.phone_full != '(null) null - null'">
              <p class="title">phone</p>
              <p><a :to="'tel:' + member.phone_full_call" class="phone">{{member.phone_full}}</a></p>
            </div>
            <div v-if="member.email">
              <p class="title">email</p>
              <p><a :to="'mailto:' + member.email">{{member.email}}</a></p>
            </div>
            <div v-if="member.positions[0].building">
              <p class="title">building</p>
              <p>{{ member.positions[0].building | buildingTranslate }}</a></p>
            </div>
            <div v-if="member.positions[0].room">
              <p class="title">room</p>
              <p>{{member.positions[0].room}}</a></p>
            </div>
          </section>

          <section v-if="member.courses.length > 0" class="courses">
            <p class="title">{{semesterCode | seasonTranslate}} Courses</p>
            <p v-for="course in member.courses"><router-link :to="'/courses/course/' + course.courseCode">{{course.courseNumber}} - {{course.longTitle}}</router-link></p>
          </section>

          <section class="research directory-information">
            <div v-if="member.research_areas">
              <p class="title">Research Areas</p>
              <p><a href="javascript:void(0);" v-on:click="setResearchArea" v-for="area in member.research_areas" :area="area">{{ area }}<em>|</em></a></p>
            </div>
          </section>

          <section v-if="news" class="news">
            <p class="title">news articles</p>
            <div class="article" v-for="article in member.news">
              <router-link :to="'/news/' + article.uid">{{article.title}}</router-link>
            </div>
          </section>

          <section v-if="events" class="news">
            <p class="title">events</p>
            <div class="article" v-for="event in member.events">
              <router-link :to="'/events/' + event.uid">{{event.title}}</router-link>
            </div>
          </section>

          <section v-if="gp" class="gp">
            <p class="title">Cited Publications <span class="amount">(Amount: {{member.gsProfile[0].gs_citation_count}})</span>
            </p>
            <div class="list" v-for="pub in member.gsProfile[0].pub_year_agg">
              <h4>{{pub._id}}</h4>
              <div v-for="art in member.gsPublication">
                <div v-if="art.pub_year == pub._id">
                  <p><router-link :to="'/publication/' + art._id">{{art.title}}</router-link></p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'

function fetchMember(store) {
  store.dispatch('GET_SEMESTER_CODE');
  return store.dispatch('FETCH_MEMBER', store.state.route.params.name)
}

export default {
  name: 'member-view',

  preFetch: fetchMember,

  components: {
    Spinner
  },

  computed: {
    loaded() {
      return this.$store.state.member.info[this.$route.params.name] ? true : false
    },
    member(){
      return this.$store.state.member.info[this.$route.params.name]
    },
    gs(){
      return this.$store.state.member.info[this.$route.params.name].gsProfile.length
    },
    gp(){
      return this.$store.state.member.info[this.$route.params.name].gsPublication.length
    },
    news(){
      return this.$store.state.member.info[this.$route.params.name].news.length
    },
    events(){
      return this.$store.state.member.info[this.$route.params.name].events.length
    },
    semesterCode(){
      return this.$store.state.semesterCode.code;
    }
  },

  beforeMount () {
    fetchMember(this.$store)
  },

  methods: {
    oops () {
      this.$router.replace('/404')
    },
    setResearchArea(event) {
      let area = event.target.getAttribute('area');
      this.$store.commit("SET_SELECTED_RESEARCH_AREA", area); 
      this.$router.push('/research_areas');
    }
  }
}
</script>

<style lang="stylus">

.biography{
  font-size: .95em;
  padding: 1em 0;
  border-bottom: 1px solid #ccc;
  p {
    padding-top: 1em;
    &:first-child{
      padding-top: 0;
    }
  }
}

</style>

<style lang="stylus" scoped>
.member-view{
  font-size: 1.05em;
}

.title{
  text-transform: uppercase;
  font-size: .8em;
  padding-bottom: .5em;
  margin-bottom: .5em;
  border-bottom: 1px solid #ccc;
}

.news{
  margin-bottom: 2em;
}

.gp{
  .title{
    margin-bottom: 2.1em;
  }
  .list{
    border-left: 1px solid #ccc;
    margin-left: 3.2em;
    padding-left: 1em;
    position: relative;
    margin-bottom: 1.6em;
    > h4{
      position: absolute;
      left: -3.2em;
      top: .2em;
    }
  }
  .amount{
    font-size: .8em;
    font-style: italic;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }
  a{
    font-size: .8em;
    margin-top: 2em;
  }
}

.top-header{
  display: flex;
  border-bottom: 1px solid #ccc;
  font-size: 1.4em;
  padding-bottom: 2em;
  padding-top: 2em;
  .homepage{
    font-size: .8em;
    padding-top: 1em;
  }
  .full_title{
    padding-top: .6em;
  }
  div{
    display: inline-block
    &:nth-child(2){
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .image{
    width: 8em;
    height: 8em;
    margin-right: 1em;
    background-size: cover;
    border: 1px solid #ccc;
  }
}

.research{
  p{
    text-transform: capitalize;
  }
}

.sub-positions, .main-positions{
  border-bottom: 1px solid #ccc;
  font-size: .95em;
  div{
    display: inline-block;
    margin-right: 2em;
    padding: 1em 0;
    &:not(:last-child){
      padding-right: 1em;
      margin-right: 1em;
      border-right: 1px solid #ccc;
    }
    p{
      padding: 0;
      padding-bottom: .5em;
      text-transform: capitalize;
      &:nth-child(2){
        padding-bottom: 0;
      }
    }
  }
}
.main-positions{
  font-size: 1.1em;
  padding-top: 1.2em;
  padding-bottom: 1.6em;
  p{
    padding: 0;
    padding-top: .95em;
    padding-bottom: .5em;
    padding-left: 1em;
    border-left: 6px solid #C41230;
    text-transform: capitalize;
    &:nth-child(2){
      padding-top: 0;
    }
  }
}

.directory-information{
  padding: 1.6em 0;
  display: flex;
  flex-wrap: wrap;
  > div{
    margin-right: 3.5rem;
  }
  .title{
    text-transform: uppercase;
    font-size: .8em;
    padding-bottom: .5em;
    margin-bottom: .5em;
    border-bottom: 1px solid #ccc;
  }
}

.directory-information{
  p:nth-child(2) > a > em{
    color: #ccc;
    padding: 0 .8em;
  }
  p:nth-child(2) > a:last-child{
    em{
      display: none;
    }
  }

  em:hover {
    text-decoration: none;
  }
}

</style>
