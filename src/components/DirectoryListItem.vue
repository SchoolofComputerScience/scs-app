<template>
  <li class="card">
    <router-link :to="'/directory/' + item.scid">
      <div class="link-hold">
        <div class="dep-icons">
          <span v-for="dep in item.positions" :class="dep.department" v-if="!'qatar'"></span>
        </div>

        <div class="image" v-if="item.image_url" :style="{ 'background-image': 'url(' + item.image_url + ')' }"></div>

        <div>
          <p class="name">{{ item.full_name }}</p>
          <p class="title">{{ item.position}}</p>
          <p class="title"><span>{{item.scs_relationship_desc}}</span></p>
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
//
// .dep-icons{
//   top: -3px;
//   left: 9px;
//   position: absolute;
//   line-height: 0;
//   span{
//     display: inline-block;
//     width: 36px;
//     height: 4px;
//     line-height: 0;
//     margin-right: 7px;
//     &.ri{
//       background-color: #9b22b4;
//     }
//     &.lti{
//       background-color: #3bb422;
//     }
//     &.csd{
//       background-color: #22b49b;
//     }
//     &.hcii{
//       background-color: #b49b22;
//     }
//     &.compbio{
//       background-color: #b45222;
//     }
//     &.deans_office, &.scs{
//       background-color: #C41230;
//     }
//     &.isr{
//       background-color: #165574;
//     }
//     &.mld{
//       background-color: #b42284;
//     }
//   }
// }
//
// .image{
//   width: 4.2em;
//   height: 4.2em;
//   border-radius: 4em;
//   border: 2px solid white;
//   background-size: cover;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
//   margin: auto;
// }
//
// .card {
//   position: relative;
//   justify-content: space-between;
//   margin-right: 2.5%;
//   margin-top: 15px;
//   margin-bottom: 15px;
//   display: block;
//   transition: none;
//   height: 225px;
//   max-width: 25%;
//   width: 23%;
//   overflow: hidden;
//
//   left: 0em;
//   top: 0em;
//   display: flex;
//   transition: .35s box-shadow, .35s top, .35s left;
//   position: relative;
//   background: white;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
//
//   &:nth-child(4n+4) {
//     margin-right: 0;
//   }
//
//   &:hover {
//     background: white;
//     box-shadow: none;
//     transition: none;
//     top: -.1em;
//     left: -.1em;
//     transition: .2s box-shadow, .2s top, .2s left;
//     box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
//   }
//
//   p.name {
//     font-weight: 900;
//     border-bottom: 1px solid #eee;
//     font-size: 1em;
//     text-transform: capitalize;
//     color: #C41230;
//     padding-bottom: .2em;
//     padding-top: .35em;
//   }
//   p.title {
//     font-size: .8em;
//     font-weight: 400;
//     padding-top: 0;
//     span {
//       font-weight: 900;
//       text-transform: uppercase;
//     }
//   }
//   span.department {
//     font-weight: 900;
//     text-transform: uppercase;
//   }
//   a {
//     text-decoration: none;
//     color: #131313;
//     width: 100%;
//     display: block;
//     height: 100%;
//     padding: 1em;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     .link-hold{
//       width: 100%;
//     }
//   }
//   p {
//     margin-bottom: .4em;
//     margin-top: 0;
//     text-transform: capitalize;
//   }
//   p.room {
//     font-size: .7em;
//     text-transform: uppercase;
//     font-weight: 300;
//   }
// }

</style>
