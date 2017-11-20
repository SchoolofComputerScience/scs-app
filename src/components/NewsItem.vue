<template>
  <div class="news-item">
    <router-link :to="'/news/' + data.uid" class="card">
      <figure :style="{ 'background-image': 'url(' + data.image + ')' }"></figure>
      <div class="content">
        <p>{{timeFix(data.date)}}</p>
        <h3>{{data.title}}</h3>
      </div>
    </router-link>
    <div v-if="show_tags" class="tags">
      <router-link
        v-for="tag in data.tags"
        v-if="tag.name != ''"
        :key="tag.name"
        class="button-small"
        :to="tag.tag.toLowerCase()">{{tag.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'

export default {
  name: 'NewsItem',
  props: ['data', 'show_tags'],
  methods: {
    timeFix (arg) {
      return format(arg, 'MMM. D, YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.tags{
  display: inline-block;
  a{
    margin-bottom: $base-line-height / 2;
  }
}

.news-item{
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  position: relative;
  width: 50%;
  max-width: 50%;
  @include breakpoint-max(laptop) {
    width: 100%;
    max-width: 100%;
  }
  &:nth-child(even){
    padding-left: $base-line-height;
    @include breakpoint-max(laptop) {
      padding: 0;
    }
  }
  margin-top: $base-line-height;
}

.card {
  position: relative;
  z-index: 1;
  flex-grow: 1;
  width: 100%;
  background-position: center;
  background-size: cover;
  transition: .4s all;
  margin-bottom: $base-line-height * 0.562;
  > div > a {
    z-index: 9;
    text-decoration: none;
  }
  .content {
    display: block;
  }
  aside {
    display: block;
    vertical-align: center;
  }
  figure{
    display: block;
    background-position: center;
    background-size: cover;
    width: calc(100% + (#{$base-line-height} * 2));
    height: $base-line-height * 10;
    top: -$base-line-height;
    position: relative;
    margin: 0;
    margin-left: -$base-line-height;
  }
  h3 {
    font-weight: bold;
  }
  p {
    color: $black;
  }

}
</style>
