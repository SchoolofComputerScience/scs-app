<template>
  <div class="card-holder">
    <div class="card" :style="{ 'background-image': 'url(' + data.image + ')' }">
      <router-link  :to="'/news/' + data.uid">
        <div class="content">
          <h2>{{data.date | moment("dddd, MMMM Do YYYY")}}</h2>
          <h3>{{data.title}}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewsItem',
  props: ['data'],
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
  p {
    font-size: .8em;
    em {
      color: #C41230;
    }
  }
}

.card {
  position: relative;
  background-position: center;
  background-size: cover;
  flex: 1;
  padding: 2vw;
  transition: .4s all;
  display: flex;
  align-items: bottom;
  justify-content: bottom;
  margin: 1vw;
  position: relative;
  z-index: 1;
  a {
    z-index: 9;
    text-decoration: none;
  }
  .content {
    padding: 2vw;
    min-width: 19em;
    display: block;
    background: white;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  }
  aside {
    display: block;
    vertical-align: center;
    border-top: 1px solid #C41230;
  }

  h2 {
    font-size: .8em;
    margin: 0;
    border-bottom: 1px solid #C41230;
    padding-bottom: .6em;
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
    font-size: 1.5em;
    margin-bottom: .4em;
    font-weight: 300;
  }
  p {
    font-size: .85em;
    margin-top: 1em;
  }
}
</style>
