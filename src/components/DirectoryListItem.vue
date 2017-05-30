<template>
  <li class="card">
    <div class="dep-icons">
      <span v-for="dep in item.positions" :class="dep.department" v-if="!qatar"></span>
    </div>
    <router-link :to="'/directory/' + item.scid">
      <p class="name">{{ item.full_name }}</p>
      <p class="title"><span>({{item.relationship_class}})</span> {{ item.position}}</p>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="stylus" scoped>

.dep-icons{
  top: -3px;
  left: 9px;
  position: absolute;
  line-height: 0;
  span{
    display: inline-block;
    width: 36px;
    height: 4px;
    line-height: 0;
    margin-right: 7px;
    &.ri{
      background-color: #9b22b4;
    }
    &.lti{
      background-color: #3bb422;
    }
    &.csd{
      background-color: #22b49b;
    }
    &.hcii{
      background-color: #b49b22;
    }
    &.compbio{
      background-color: #b45222;
    }
    &.deans_office, &.scs{
      background-color: #C41230;
    }
    &.isr{
      background-color: #165574;
    }
    &.mld{
      background-color: #b42284;
    }
  }
}

.card {
  position: relative;
  justify-content: space-between;
  padding: 10px;
  margin-right: 2.5%;
  margin-top: 15px;
  margin-bottom: 15px;
  display: block;
  transition: none;
  border: 1px solid #eee;
  height: 120px;
  max-width: 25%;
  width: 22.5%;
  overflow: hidden;
  &:hover {
    background: white;
    box-shadow: none;
    transition: none;
    border: 1px solid #bbb;
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
    font-size: .9em;
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
