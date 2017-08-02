<template>
  <li class="card">
    <router-link :to="'/directory/' + item.scid">
      <div class="link-hold">
        <div class="dep-icons">
          <span v-for="dep in item.positions" :class="dep.department" v-if="!'qatar'"></span>
        </div>
        <div class="image circle" v-if="item.image_url" :style="{ 'background-image': 'url(' + item.image_url + ')' }"></div>
        <div>
          <p class="name">{{ item.display_name }}</p>
          <p class="title">{{ item.position}}</p>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';
@import '../assets/scss/circle.scss';

.image{
  width: $base-line-height * 4;
  height: $base-line-height * 4;
  background-size: cover;
  margin: auto;
}

.card {
  margin-right: 2.6%;
  &:nth-child(4n+4) {
    margin-right: 0;
  }
  margin-top: 6px;
  margin-bottom: 22px;
  padding: 0;
  height: 75px * 4;
  min-height: 75px * 4;
  max-width: 25%;
  width: 23%;
  overflow: hidden;
  left: 0em;
  top: 0em;
  transition: .35s box-shadow, .35s top, .35s left;
  position: relative;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  display: inline-block;
  vertical-align: top;
  
  @include breakpoint-max(laptop) {
    max-width: 50%;
    width: 48.5%;
    height: 106px * 2;
    min-height: 106px * 2;
    margin-bottom: 6px;
    &:nth-child(2n+2) {
      margin-right: 0;
    }
  }
  p{
    padding-bottom: 0;
  }

  &:hover {
    background: white;
    box-shadow: none;
    transition: none;
    top: -.1em;
    left: -.1em;
    transition: .2s box-shadow, .2s top, .2s left;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }

  p.name {
    font-weight: 900;
    border-bottom: 1px solid #eee;
    font-size: 1em;
    text-transform: capitalize;
    color: #C41230;
    padding-bottom: .2em;
    padding-top: .35em;
  }
  p.title {
    font-size: .8em;
    font-weight: 400;
    padding-top: 0;
    span {
      font-weight: 900;
      text-transform: uppercase;
    }
  }
  span.department {
    font-weight: 900;
    text-transform: uppercase;
  }
  a {
    text-decoration: none;
    color: #131313;
    width: 100%;
    display: block;
    height: 100%;
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .link-hold{
      width: 100%;
    }
  }
  p {
    margin-bottom: .4em;
    margin-top: 0;
    text-transform: capitalize;
  }
  p.room {
    font-size: .7em;
    text-transform: uppercase;
    font-weight: 300;
  }
}

</style>
