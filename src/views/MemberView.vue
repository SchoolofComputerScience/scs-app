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

          <section v-if="position.primary_position" v-for="position in member.positions" class="main-positions">
            <p><router-link :to="'/departments/' + position.department">{{position.department_name}}</router-link></p>
            <p class="job" v-if="position.title">{{position.title | tlc}}</p>
          </section>

          <section v-if="member.positions.length > 0" class="sub-positions">
            <div v-for="position in member.positions" v-if="!position.primary_position">
              <p><router-link :to="'/departments/' + position.department">{{position.department_name}}</router-link></p>
              <p v-if="position.title" class="job">{{position.title | tlc}}</p>
            </div>
          </section>

          <section v-if="member.biography || member.biography != null" class="biography">
            <p class="title">Biography</p>
            <div ref="biographyInfo" v-bind:style="styleObject" :class="{read: readMoreBio}" class="biographyInfo">
              <div class="data" v-html="member.biography"></div>
            </div>
            <button @click="readMore()" v-if="readMoreBio">Read More</button>
          </section>

          <section class="directory-information">
            <div v-if="!member.phone_full.includes('null') || !member.phone_full">
              <p class="title">phone</p>
              <p><a :to="'tel:' + member.phone_full_call" class="phone">{{member.phone_full}}</a></p>
            </div>
            <div v-if="member.display_email">
              <p class="title">email</p>
              <p><a :to="'mailto:' + member.display_email">{{member.display_email}}</a></p>
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
            <p v-for="course in member.courses">
              <router-link :to="'/courses/course/' + course.courseCode">{{course.longTitle}} | <span>{{course.courseNumber}}</span></router-link>
            </p>
          </section>

          <section v-if="member.research_areas" class="research directory-information">
            <p class="title">Research Areas</p>
            <p>
              <a href="javascript:void(0);" v-on:click="setResearchArea" v-for="area in member.research_areas" :area-id="area.area_id" :area-title="area.title">{{ area.title }}</a>
            </p>
          </section>

          <section v-if="news" class="news">
            <p class="title">news articles</p>
            <div class="card-holder">
              <NewsItem v-for="list in member.news" :key="list.uid" :data="list"></NewsItem>
            </div>
          </section>

          <section v-if="events" class="events">
            <p class="title">events</p>
            <p v-for="event in member.events">
              <router-link :to="'/events/' + event.uid">{{event.title}} | <span>{{event.date | moment("dddd, MMMM Do YYYY")}}</span></router-link>
            </p>
          </section>

          <section v-if="gp" class="publications">
            <p class="title">Cited Publications <span class="amount">(Amount: {{member.profile[0].gs_citation_count}})</span>
            </p>
            <div class="list" v-for="pub in member.profile[0].pub_year_agg">
              <h4>{{pub._id}}</h4>
              <div v-for="art in member.publications">
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
import Vue from 'vue'
import Spinner from '../components/Spinner.vue'
import NewsItem from '../components/NewsItem.vue'

function fetchData(store) {
  store.dispatch('GET_SEMESTER_CODE');
  store.dispatch('GET_RESEARCH_AREAS');
  return store.dispatch('FETCH_MEMBER', store.state.route.params.name)
}

const bioHeight = 112

export default {
  name: 'member-view',

  preFetch: fetchData,

  components: {
    Spinner,
    NewsItem
  },

  data () {
    return {
      readMoreBio: true,
      height: '0px',
    }
  },

  computed: {
    loaded() {
      if(this.$store.state.member[this.$route.params.name])
        this.biographyInformation()
      return this.$store.state.member[this.$route.params.name] ? true : false
    },
    member(){
      return this.$store.state.member[this.$route.params.name]
    },
    gs(){
      return this.$store.state.member[this.$route.params.name].profile.length
    },
    gp(){
      return this.$store.state.member[this.$route.params.name].publications.length
    },
    news(){
      return this.$store.state.member[this.$route.params.name].news.length
    },
    events(){
      return this.$store.state.member[this.$route.params.name].events.length
    },
    semesterCode(){
      return this.$store.state.semesterCode.code;
    },
    activeBio() {
      return this.member && this.member.biography !== 'undefined' ? true : false;
    },
    styleObject() {
      return  {
        height: this.height
      }
    }
  },

  beforeMount () {
    fetchData(this.$store)
  },

  mounted () {
    window.addEventListener('resize', this.bioResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.bioResize);
  },

  methods: {
    biographyInformation(){
      Vue.nextTick(() => {
        if(this.$refs.biographyInfo){
          if(this.$el.querySelector('.biographyInfo').scrollHeight < bioHeight){
            this.height = this.$el.querySelector('.biographyInfo').scrollHeight + 'px'
            this.readMoreBio = false;
          }else{
            this.height = bioHeight + 'px'
          }
        }
      })
    },

    bioResize(){
      if(!this.readMoreBio){
        this.height = this.$el.querySelector('.biographyInfo > div').scrollHeight + 'px'
      }
    },

    readMore () {
      if(this.height === bioHeight + 'px'){
        this.height = this.$el.querySelector('.biographyInfo').scrollHeight + 'px';
        this.readMoreBio = false;
      }else{
        this.height = bioHeight + 'px';
      }
    },

    setResearchArea(event) {
      let area_id = event.target.getAttribute('area-id');
      let area_title = event.target.getAttribute('area-title');
      let research_area = {
        area_id: area_id,
        title: area_title
      }
      this.$store.commit("SET_SELECTED_RESEARCH_AREA", research_area);
      this.$router.push('/research/'+ area_id);
    }
  }
}
</script>

<style lang="scss">
// .biography{
//   font-size: .95em;
//   padding: 1.6em 0;
//   .biographyInfo{
//     overflow-y: hidden;
//     transition: .3s height;
//     p:not(:first-child) {
//       padding-top: 1.45em;
//     }
//     p:first-child{
//       padding-top: .6em;
//     }
//   }
//   ul{
//     display: none;
//   }
// }
//
// .biographyInfo .data{
//   max-width: 46em;
// }
//
// </style>
//
// <style lang="scss" scoped>
//
//
// .member-view{
//   font-size: 1.05em;
// }
//
// .title{
//   text-transform: uppercase;
//   font-size: .8em;
//   padding-bottom: .5em;
//   margin-bottom: .5em;
//   border-bottom: 1px solid #ccc;
// }
//
// .biography{
//   position: relative;
//   line-height: 1.58;
//   letter-spacing: -.003em;
//   width: 100%;
//
//   .biographyInfo{
//     &:not(.read){
//       &:before{
//         opacity: 0;
//         transition: .2s opacity;
//       }
//     }
//     &.read{
//       position: relative;
//       &:before{
//         content: ' ';
//         width: 100%;
//         background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
//         height: 2em;
//         position: absolute;
//         display: block;
//         bottom: 0;
//         opacity: 1;
//       }
//     }
//   }
//   button{
//     -webkit-appearance: none;
//     cursor: pointer;
//     border: 0;
//     background-color: #c41230;
//     color: #fff;
//     font-weight: 900;
//     font-size: .7em;
//     padding: .5em 1.2em;
//     text-transform: uppercase;
//     font-family: Open Sans;
//     &:focus {
//       outline:0;
//     }
//     &:hover{
//       background-color: rgba(#C41230, 0.80);
//     }
//     &:active{
//       background-color: rgba(#C41230, 0.40);
//     }
//   }
// }
//
// .card-holder {
//   font-size: .9em;
//   display: flex;
//   flex-wrap: row;
//   flex-flow: wrap;
//   width: 100%;
//   position: relative;
//   display: -webkit-flex;
//   display: flex;
//   -webkit-flex-wrap: wrap;
//   flex-wrap: wrap;
//   -webkit-flex-direction: row;
//   flex-direction: row;
//   > div{
//     padding: 0;
//     padding-top: 1em;
//     &:nth-child(1){
//       padding-right: 1em;
//     }
//     &:nth-child(2){
//       padding-left: 1em;
//     }
//   }
//   p {
//     font-size: .8em;
//     em {
//       color: #C41230;
//     }
//   }
// }
//
// .events, .research, .courses, .news{
//   padding: 1.6em 0;
//   p{
//     line-height: 1.8em;
//   }
//   span{
//     font-size: .8em;
//     font-weight: 900;
//   }
// }
//
// .research{
//   button{
//     font-size: .7em;
//     padding: .5em 1.2em;
//     text-transform: uppercase;
//   }
//   #info{
//     transition:height 0.3s ease-out;
//   }
//   p:nth-child(2) > span > em{
//     color: #ccc;
//     padding: 0 .8em;
//   }
//   p:nth-child(2) > span:last-child{
//     em{
//       display: none;
//     }
//   }
// }
//
// .publications{
//   padding-top: 1.6em;
//   .title{
//     margin-bottom: 2.1em;
//   }
//   .list{
//     border-left: 1px solid #ccc;
//     margin-left: 3.2em;
//     padding-left: 1em;
//     position: relative;
//     margin-bottom: 1.6em;
//     > h4{
//       position: absolute;
//       left: -3.2em;
//       top: .2em;
//     }
//   }
//   .amount{
//     font-size: .8em;
//     font-style: italic;
//     margin-bottom: 2rem;
//     text-transform: uppercase;
//   }
//   a{
//     font-size: .8em;
//     margin-top: 2em;
//   }
// }
//
// .top-header{
//   display: flex;
//   border-bottom: 1px solid #ccc;
//   font-size: 1.4em;
//   padding-bottom: 2em;
//   padding-top: 2em;
//   .homepage{
//     font-size: .8em;
//     padding-top: 1em;
//   }
//   .full_title{
//     padding-top: .6em;
//   }
//   div{
//     display: inline-block
//     &:nth-child(2){
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }
//   }
//   .image{
//     width: 8em;
//     height: 8em;
//     margin-right: 1em;
//     background-size: cover;
//     border: 1px solid #ccc;
//     border-radius: 8em;
//     border: .2em solid white;
//     background-size: cover;
//     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
//   }
// }
//
// .sub-positions{
//   font-size: .85em;
//   margin-top: -1px;
//   div{
//     display: inline-block;
//     margin-right: 2em;
//     padding: 1em 0;
//     border-top: 1px solid #ccc;
//
//     &:not(:last-child){
//       padding-right: 1em;
//       margin-right: 1em;
//     }
//     p{
//       padding: 0;
//       padding-bottom: .5em;
//       text-transform: capitalize;
//       &:nth-child(2){
//         padding-bottom: 0;
//       }
//     }
//   }
// }
//
// .main-positions{
//   font-size: 1.1em;
//   padding-top: 1.2em;
//   padding-bottom: 1.6em;
//   p{
//     padding: 0;
//     padding-top: .95em;
//     padding-bottom: .5em;
//     padding-left: 1em;
//     border-left: 6px solid #C41230;
//     text-transform: capitalize;
//     &:nth-child(2){
//       padding-top: 0;
//     }
//   }
//   div{
//     display: inline-block;
//     margin-right: 2em;
//     padding: 1em 0;
//     border-top: 1px solid #ccc;
//
//     &:not(:last-child){
//       padding-right: 1em;
//       margin-right: 1em;
//     }
//     p{
//       padding: 0;
//       padding-bottom: .5em;
//       text-transform: capitalize;
//       &:nth-child(2){
//         padding-bottom: 0;
//       }
//     }
//   }
// }
//
// .directory-information{
//   padding: 1.6em 0;
//   display: flex;
//   flex-wrap: wrap;
//   > div{
//     margin-right: 3.5rem;
//   }
//   .title{
//     text-transform: uppercase;
//     font-size: .8em;
//     padding-bottom: .5em;
//     margin-bottom: .5em;
//     border-bottom: 1px solid #ccc;
//   }
// }
//
// .directory-information{
//   p:nth-child(2) > a > em{
//     color: #ccc;
//     padding: 0 .8em;
//   }
//   p:nth-child(2) > a:last-child{
//     em{
//       display: none;
//     }
//   }
//
//   em:hover {
//     text-decoration: none;
//   }
// }

</style>
