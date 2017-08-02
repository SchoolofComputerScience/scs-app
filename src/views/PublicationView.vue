<template>
  <section class="page">
    <div class="publication-view">
      <spinner class="spinner" v-if="!pbset" key="spinner"></spinner>
      <transition name="loading" mode="out-in" appear v-if="pbset">
        <div>
          <p><router-link :to="'/directory/'">Directory</router-link> / <router-link :to="'/directory/' + pub.scid">{{pub.scid}}</router-link></p>
          <h2 v-if="pub.title">{{pub.title}}</h2>
          <h3>authors | {{ pub.authors}}</h3>
          <h4>{{pub.pub_date}}</h4>
          <p>{{pub.desc}}</p>
          <p v-if="pub.journal">{{pub.journal}}</p>
          <p v-if="pub.pub_url"><a :href="pub.pub_url">View Publication</a> <small>[{{pub.pub_format}}]</small></p>
          <p v-if="pub.publisher">{{pub.publisher}} </p>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'

function fetchPublication(store) {
  return store.dispatch('FETCH_PUBLICATION', store.state.route.params.pubid)
}

export default {
  name: 'publication-view',

  preFetch: fetchPublication,

  components: {
    Spinner
  },

  computed: {
    pub(){
      if(this.$store.state.publication.pub[this.$route.params.pubid] !== undefined){
        return this.$store.state.publication.pub[this.$route.params.pubid]
      }
    },
    pbset(){
      return this.$store.state.publication.pub[this.$route.params.pubid] ? true : false
    }

  },

  beforeMount () {
    fetchPublication(this.$store)
      .then(() => this.loading = false)
  }

}
</script>
