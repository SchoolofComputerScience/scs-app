<template>
  <transition name="fade" mode="out-in" appear>
    <section class="page">
      <div class="card-holder">
        <div class="card">
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
          <router-link :to="'/departments/deans_office'">
            <div>
              <h1>(SCS)</h1>
              <h2>SCS Dean's Office</h2>
              <p>School of Computer Science Dean's Office.</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'home-view',
  created () {
    this.$store.dispatch('documentTitle', 'Home')
  }
}
</script>

<style lang="stylus" scoped>
.card-holder {
  display: flex;
  flex-wrap: row wrap;
  flex-flow: row wrap;
  width: calc(100% + 2vw);
  position: relative;
  left: -1vw;
  h1 {
    font-size: 1em;
    a {
      text-decoration: none;
    }
  }
  p {
    font-size: .8em;
    em {
      color: #C41230;
    }
  }
}

.card {
  flex: 1 0 16em;
  transition: .4s all;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1vw;
  position: relative;
  border: 1px solid #eee;
  > a{
    padding: 2em;
    display: block;
    text-decoration: none;
  }
  > div {
    flex: 1;
    padding: 2em;
    min-width: 18em;
    > p {
      display: block;
    }
  }
  aside {
    display: block;
    vertical-align: center;
    border-top: 1px solid #C41230;
    p {
      display: inline-block;
      font-weight: 900;
      margin-right: 2em;
      font-size: 1em;
      text-transform: uppercase;
    }
  }
  &:hover {
    background: white;
    transition: .4s all;
    border: 1px solid #C41230;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  }
  h1 {
    font-size: 1.6em;
    color: #C41230;
    margin-bottom: 0;
  }
  h2 {
    font-size: 1.6em;
    margin: 0;
    border-bottom: 1px solid #C41230;
    padding-bottom: .6em;
    font-weight: 300;
    position: relative;
    &:after {
      content: " ";
      display: block;
      width: 2em;
      height: 3px;
      position: absolute;
      bottom: -3px;
      background: rgb(196, 18, 48);
    }
  }
  p {
    font-size: .85em;
    margin-top: 1em;
  }
}
</style>
