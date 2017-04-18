<template>
  <section class="page">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <div class="member-view" v-if="loaded">
      <transition name="fade" mode="out-in" appear>
        <div>
          <div v-if="gs">
            <img v-if="member.gsProfile[0].gs_image_url" :src="'https://scholar.google.com/' + member.gsProfile[0].gs_image_url" />
          </div>
          <h1>{{member.fullname}}</h1>
          <p v-if="gs"><a :href="member.gsProfile[0].gs_homepage_url">{{member.gsProfile[0].gs_homepage_url}}</a></p>
          <p class="job"><span>{{member.job}}</span> | {{member.short_jobtitle}}</p>
          <router-link :to="'/departments/' + member.department">{{member.fulldepartment}}</router-link>
          <p v-if="member.room">room: {{member.room}}</p>
          <div v-if="gs">
            <p>affiliations: {{member.gsProfile[0].gs_affiliation}}</p>
            <p v-if="member.gsProfile[0].gs_areas">areas: {{member.gsProfile[0].gs_areas}}</p>
            <p>citations amount: {{member.gsProfile[0].gs_citation_count}}</p>
            <p><a :href="member.gsProfile[0].gs_profile_url">google scholar profile</a></p>
          </div>
          <div v-if="gp">
            <br>
            <h2>Cited Publications</h2>
            <div v-for="pub in member.gsProfile[0].pub_year_agg">
              <h4>{{pub._id}}</h4>
              <div v-for="art in member.gsPublication">
                <div v-if="art.pub_year == pub._id">
                  <p><router-link :to="'/publication/' + art._id">{{art.title}}</router-link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'

function fetchMember(store) {
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
    }
  },

  beforeMount () {
    fetchMember(this.$store)
  },

  methods: {
    oops () {
      this.$router.replace('/404')
    }
  }
}
</script>

<style lang="stylus" scoped>
.member-view
  h1
    text-transform capitalize
  p.job
    text-transform capitalize
</style>
