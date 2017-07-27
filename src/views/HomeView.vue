<template>
  <transition name="fade" mode="out-in" appear>
    <section class="page">
      <div class="card-holder">



        <!-- <div class="card">
          <router-link :to="'/departments/csd'">
            <div>
              <h1>(CSD)</h1>
              <h2>Computer Science</h2>
              <p>Lead in computer science research and education that has real-world impact.</p>
            </div>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="'/departments/mld'">
            <div>
              <h1><span>(MLD)</span></h1>
              <h2>Machine Learning</h2>
              <p>We focus on research and education in all areas of statistical machine learning.</p>
            </div>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="'/departments/isr'">
            <div>
              <h1>(ISR)</h1>
              <h2>Institute for Software Research </h2>
              <p>Software engineering, privacy and security engineering, eBusiness, and societal computing.</p>
            </div>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="'/departments/hcii'">
            <div>
              <h1>(HCII)</h1>
              <h2>Human-Computer Interaction Institute </h2>
              <p>Living laboratory where we investigate the relationship between computer technology, human activity and society.</p>
            </div>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="'/departments/compbio'">
            <div>
              <h1>(CBD)</h1>
              <h2>Computational Biology Department</h2>
              <p>Computational approaches to building comprehensive models that address the fundamental problem of understanding how biological systems function.</p>
            </div>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="'/departments/lti'">
            <div>
              <h1>(LTI)</h1>
              <h2>Language Technologies Institute </h2>
              <p>Get the right information to the right people at the right time in the right language, the right format and the right level of detail.</p>
            </div>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="'/departments/ri'">
            <div>
              <h1>(RI)</h1>
              <h2>Robotics Institute</h2>
              <p>Combine the practical and the theoretical, the Robotics Institute has diversified its efforts and approaches to robotics science.</p>
            </div>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="'/departments/ai'">
            <div>
              <h1>(AI)</h1>
              <h2>Artificial Intelligence</h2>
              <p>CMU AI unites our interdisciplinary artificial intelligence research and education efforts to create an AI strategy for the planet.</p>
            </div>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="'/departments/deans_office'">
            <div>
              <h1>(SCS)</h1>
              <h2>SCS Dean's Office</h2>
              <p>School of Computer Science Dean's Office.</p>
            </div>
          </router-link>
        </div> -->
      </div>
    </section>
  </transition>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import DepartmentCard from '../components/DepartmentCard.vue'

export default {
  name: 'home-view',
  components: {
    Spinner,
    DepartmentCard
  }
  // asyncData ({ store }) {
  //   return store.dispatch('FETCH_DEPARTMENTS_STATS', { type })
  // }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';
@import '../assets/scss/vars.scss';
</style>
