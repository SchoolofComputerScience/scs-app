<template>
  <div class="card">
    <div>
      <router-link  :to="'/news/' + data.uid">
        <figure :style="{ 'background-image': 'url(' + data.image + ')' }"></figure>
        <div class="content">
          <h2>{{data.date | moment("dddd, MMMM Do YYYY")}}</h2>
          <h3>{{data.title}}</h3>
        </div>
      </router-link>
      <div class="tags" v-for="tag in data.tags" v-if="tag.name != ''">
        <router-link :to="tag.tag.toLowerCase()">{{tag.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
  props: ['data'],
}
</script>

<style lang="scss" scoped>
.tags{
  font-size: .7em;
  display: inline-block;
  margin-right: .7em;
  margin-bottom: .7em;
  position: relative;
  a{
    border: 1px solid;
    padding: .35em .6em;
    text-decoration: none;
    &:hover{
      border: 1px solid;
      background: #C41230;
      color: white;
    }
  }
}

.card {
  position: relative;
  background-position: center;
  background-size: cover;
  flex: 1 45%;
  padding: 1vw;
  transition: .4s all;
  display: flex;
  align-items: start;
  justify-content: start;
  position: relative;
  z-index: 1;
  max-width: 50%;
  > div{
    width: 100%;
  }
  > div > a {
    z-index: 9;
    text-decoration: none;
    width: 100%;
    left: 0em;
    top: 0em;
    display: inline-block;
    transition: .35s box-shadow, .35s top, .35s left;
    position: relative;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    margin-bottom: 1em;
  }
  .content {
    padding: 1.6em 2vw;
    display: block;
  }
  &:hover{
    > div > a {
      top: -.1em;
      left: -.1em;
      transition: .2s box-shadow, .2s top, .2s left;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
  &:active{
    > div > a {
      top: 0em;
      left: 0em;
      transition: 0s box-shadow, 0s top, 0s left;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    }
  }
  aside {
    display: block;
    vertical-align: center;
    border-top: 1px solid #C41230;
  }
  figure{
    display: block;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 12em;
    transition: .4s background;
    padding-left: 0;
  }
  h2 {
    font-size: .95em;
    margin: 0;
    border-bottom: 1px solid #C41230;
    padding-bottom: .9em;
    margin-top: .6em;
    font-weight: 300;
    position: relative;
    &:after {
      content: " ";
      display: block;
      width: 2em;
      height: 2px;
      position: absolute;
      bottom: -2px;
      background: rgb(196, 18, 48);
    }
  }
  h3 {
    font-size: 1.2em;
    padding-top: .8em;
    margin-bottom: .4em;
    font-weight: 300;
  }
  p {
    font-size: .85em;
    margin-top: 1em;
  }
}
</style>
