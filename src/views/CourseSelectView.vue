<template>
  <div class="courses-view">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded" >
      <article>

        <h1>Course Listings</h1>
        <p>The Carnegie Mellon School of Computer Science is recognized around the world as a leader in all facets of computer science and robotics education.</p>
        <li class="current">
          <router-link class="btn" :to="'/courses/M17'">Summer 17</router-link>
          <router-link class="btn" :to="'/courses/F17'">Fall 17</router-link>
        </li>

        <h2 class="archived">Archived Course Listings</h2>

        <div class="archive-find">
          <div>
            <multiselect v-model="year" placeholder="Select a Year..." track-by="_id" label="_id" :options="years"></multiselect>
          </div>
          <div>
            <multiselect v-model="season" track-by="id" label="name" placeholder="Select a Season..." :options="[{ name: 'Fall', id: 'F' }, { name: 'Summer', id: 'M' }, { name: 'Spring', id: 'S' }]">
            </multiselect>
          </div>
          <div>
            <button v-bind:class="classObject"><router-link :to="navigate">View</router-link></button>
          </div>
        </div>
      </article>
    </transition>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'

function fetchCourses(store) {
  return store.dispatch('FETCH_COURSE_YEARS')
}

export default {
  name: 'courses-select-view',

  components: {
    Spinner
  },

  preFetch: fetchCourses,

  data () {
    return {
      season: '',
      year: '',
    }
  },

  computed: {
    loaded() {
      return this.$store.state.courses.years.length > 0 ? true : false
    },
    years() {
      return this.$store.state.courses.years
    },
    classObject() {
      return {
        active: this.season && this.year
      }
    },
    navigate(){
      if(!this.year || !this.season)
        return ''
      else
        return '/courses/' + this.season.id + this.yearFilter(this.year._id)
    }
  },

  methods: {
    yearFilter(e){
      let year = e +'';
      return year.slice(-2);
    }
  },

  beforeMount () {
    fetchCourses(this.$store)
  }
}
</script>

<style lang="stylus">
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: #c41230!important
}

fieldset[disabled] .multiselect {
  pointer-events: none;
}

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: #fff;
  display: block;
}

.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #41B883 transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}

.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}

.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}

.multiselect__loading-transition {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}

.multiselect__loading-enter,
.multiselect__loading-leave {
  opacity: 0;
}

.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 14px;
}

.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 40px;
  text-align: left;
  color: #35495E;
}

.multiselect * {
  box-sizing: border-box;
}

.multiselect:focus {
  outline: none;
}

.multiselect--disabled {
  pointer-events: none;
  opacity: 0.6;
}

.multiselect--active {
  z-index: 50;
}

.multiselect--active .multiselect__current,
.multiselect--active .multiselect__input,
.multiselect--active .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.multiselect--active .multiselect__select {
  transform: rotateZ(180deg);
}

.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: #fff;
  padding: 1px 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
}

.multiselect__tag ~ .multiselect__input {
  width: auto;
}

.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}

.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}

.multiselect__single {
  padding-left: 6px;
  margin-bottom: 8px;
}

.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #E8E8E8;
  background: #fff;
}

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  margin-bottom: 8px;
  white-space: nowrap;
}

.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}

.multiselect__tag-icon:after {
  content: "×";
  color: #266d4d;
  font-size: 14px;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #369a6e;
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}

.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #E8E8E8;
  cursor: pointer;
}

.multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: #999;
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #999999 transparent transparent transparent;
  content: "";
}

.multiselect__placeholder {
  color: #ADADAD;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}

.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__content {
  position: absolute;
  list-style: none;
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  padding: 0;
  margin: 0;
  border: 1px solid #E8E8E8;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
}

.multiselect__content::webkit-scrollbar {
  display: none;
}

.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
}

.multiselect__option--highlight {
  outline: none;
  color: white;
}

.multiselect__option--highlight:after {
  content: attr(data-select);
  color: white;
}

.multiselect__option--selected {
  background: #F3F3F3;
  color: #35495E;
  font-weight: bold;
}

.multiselect__option--selected:after {
  content: attr(data-selected);
  color: silver;
}

.multiselect__option--selected.multiselect__option--highlight {
  color: #fff;
}

.multiselect__option--selected.multiselect__option--highlight:after {
  content: attr(data-deselect);
  color: #fff;
}

.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
}

.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}

.multiselect__option--disabled {
  background: #ededed;
  color: #a6a6a6;
  cursor: text;
  pointer-events: none;
}

.multiselect__option--disabled:visited {
  color: #a6a6a6;
}

.multiselect-transition {
  transition: all 0.3s ease;
}

.multiselect-enter,
.multiselect-leave {
  opacity: 0;
  max-height: 0 !important;
}
</style>

<style lang="stylus" scoped>
h1 {
  padding-top: .7em;
  font-size: 2em;

  @media only screen and (max-width: 768px) {
    font-size: 1.5em;
    padding-bottom: .7em;
  }
}

.current {
  @media only screen and (max-width: 768px) {
    margin: 1em 0 0 0;
  }
}

.courses-view {
  @media only screen and (max-width: 768px) {
    margin: 0 1em;
  }
}

h2.archived {
  font-size: 1.2em;
  text-transform: uppercase;
  margin-bottom: .2em;
  border-bottom: 1px solid #eee;
  padding-bottom: .6em;
  color: #b7b2b3;
}

.archive-find {
  display: flex;
  > div {
    flex: 1;
    padding: 1em 1em 1em 0;
  }
  button {
    min-height: 20px;
    line-height: 20px;
    padding: 1px 0 0 5px;
    margin-bottom: 8px;
    font-size: 14px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 0px;
    color: white;
    font-weight: 800
    background: #b7b2b3;
    a {
      text-decoration: none;
      cursor: default;
      color white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media only screen and (max-width: 768px) {
      padding: 10px 0;
    }
  }

  @media only screen and (max-width: 768px) {
    display: block;
  }
}

button.active {
  background: #c41230;
  cursor: pointer;
  a {
    cursor: pointer;
    height: 100%;
  }
  &:hover {
    background: #ab2139;
  }
}

li {
  list-style: none;
  margin-bottom: 1em;
  padding-bottom: 1em;
  width: 50%;
  display: inline-block;
  font-size: .8em;
  &:first-of-type {
    display: block;
    font-size: 1.4em;
    width: 100%;
  }
}

.btn {
  display: inline-block;
  color: white;
  background: #c41230;
  padding: .3em .8em;
  margin-right: .5em;
  margin-bottom: .2em;
  font-weight: 900;
  text-decoration: none;
  text-align: center;
  border: 2px solid;
  &:hover {
    background: white;
    color: #c41230;
    text-decoration: none;
  }
}
</style>
