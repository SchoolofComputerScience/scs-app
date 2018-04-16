<template>
  <div v-if="!compact" class="card">
    <div class="type" :style="{background: typeColors.get(data.type)}">{{data.type}}</div>
    <router-link :to="'/events/' + data.uid">
      <div class="pull-left date-card">
        <div class="date-month">{{eventDate.month}}</div>
        <div class="date-day">{{eventDate.day}}</div>
        <div class="date-year">{{eventDate.year}}</div>
      </div>
      <div class="card-content">
        <h3>{{data.title}}</h3>
        <div v-if="data.speakerName" class="text-capitalize">{{data.speakerName}}</div>
        <p>
          {{data.building}} {{data.room}}<br>
          <b>{{timeFix(data.startDate)}}</b>
        </p>
      </div>
    </router-link>
  </div>

  <div v-else class="condensed-card" :style="{ borderLeftColor: typeColors.get(data.type)}">
    <router-link :to="'/events/' + data.uid">
      <div class="condensed-type" :style="{background: typeColors.get(data.type)}">{{data.type}}</div>
      <div class="pl-3 pt-1 date-card"><strong>{{dateFix(data.startDate)}} &ndash; {{timeFix(data.startDate)}}</strong></div>
      <h3 class="pl-3 pr-3">{{data.title}}</h3>
      <div v-if="data.speakerName" class="pl-3 text-capitalize text-right pr-3">{{data.speakerName}}</div>
      <p class="text-right pr-3">
        {{data.building}} {{data.room}}
      </p>
    </router-link>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  import { SCS_EVENT_COLORS } from '../filter/index';

  export default {
    name: 'EventsItem',
    data: function () {
      return {
        'typeColors': SCS_EVENT_COLORS
      };
    },
    props: {
      data: {},
      compact: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      eventDate(){
        const dateObject = {
          month: format(this.data.startDate, 'MMM'),
          day: format(this.data.startDate, 'DD'),
          year: format(this.data.startDate, 'YYYY')
        };

        return dateObject;
      }
    },
    methods: {
      timeFix (arg) {
        return format(arg, 'h:mm a')
      },
      dateFix (arg) {
        return format(arg, 'MMM D, YYYY')
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../assets/scss/vars';

  .condensed-card {
    width: 30%;
    position: relative;
    z-index:1;
    margin: 0;
    border-left: solid 0.375rem $red;
    border-radius: 0.3rem;
    background-color: white;
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

    h3 {

      padding:0;
      font-size: 1em;
    }

    p {
      padding-left: 1rem;
      padding-bottom: 0;
      color: black;
    }

    .date-card{
      color: #34495e;
    }

  }

  .condensed-type {
    position: relative;
    top: 0;
    color: white;
    font-size: .8rem;
    background: $red;
    padding: $base-line-height / 26.66 ;
    text-transform: uppercase;
    border-top-right-radius: 0.3rem;
  }

  .type{
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    font-size: .7em;
    background: $red; //default
    padding-bottom: 0;
    padding: $base-line-height / 4;
    text-transform: uppercase;
  }

  .card{
    padding:0;
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
      color: #000;
    }
    a{
      height:100%;
      width: 100%;
      z-index: 9;
      text-decoration: none;
      display: flex;
      align-items: center;
    }
    h3{
      font-weight: bold;
      font-size: 1.125em;
      padding-top: $base-line-height;
      padding-right: 1em;
    }

    .card-content{
      height: 100%;
      padding-left: 1em;
      border-left: 1px solid #afafaf;
    }
    .date-card{
      padding: 0px;
      min-width: 20%;
      text-align: center;

      .date-day{
        font-size: 2.5em;
      }
      .date-month{
        text-transform: uppercase;
      }
      .date-year{}

    }
  }
</style>
