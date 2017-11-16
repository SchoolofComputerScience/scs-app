<template>
  <div class="card">
    <div :class="data.type" class="type">{{data.type}}</div>
    <router-link :to="'/events/' + data.uid">
      <div>
        <p><b>{{timeFix(data.startDate)}}</b> / {{dateFix(data.startDate)}}</p>
        <h3>{{data.title}}</h3>
      </div>
    </router-link>
  </div>
</template>

<script>
import format from 'date-fns/format'

export default {
  name: 'EventsItem',
  props: ['data'],
  methods: {
    timeFix (arg) {
      return format(arg, 'h:mm a')
    },
    dateFix (arg) {
      return format(arg, 'MMM. D, YYYY')
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.type{
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  font-size: .8rem;
  background: $red;
  padding-bottom: 0;
  padding: $base-line-height / 4;
  text-transform: uppercase;
}
.card{
  width: 30%;
  position: relative;
  z-index: 1;
  margin: 0;
  margin-top: $base-line-height;
  &:nth-child(3n -2),
  &:nth-child(3n -1){
    margin-right: $base-line-height;
  }
  @include breakpoint-max(tablet) {
    &:nth-child(3n -2),
    &:nth-child(3n -1){
      margin-right: 0;
    }
    &:nth-child(2n -1){
      margin-right: $base-line-height;
    }
    width: 46%;
  }
  @include breakpoint-max(phone) {
    width: 100%;
    margin-right: 0;
    &:nth-child(3n -2),
    &:nth-child(3n -1){
      margin-right: 0;
    }
    &:nth-child(2n -1){
      margin-right: 0;
    }
  }
  p{
    color: $black;
  }
  a{
    padding-top: $base-line-height;
    width: 100%;
    z-index: 9;
    text-decoration: none;
    display: flex;
    align-items: center;
    > div{
      width: 100%;
    }
  }
  h3{
    padding-top: $base-line-height;
    border-top: 1px solid $primary-grey;
  }
}
</style>
