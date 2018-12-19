<template lang="pug">
div.visible(class="page_block_container filter_item_list visible")

  div(
    v-for="(member,index) in facultyInArea"
    v-if="index <= 7"
    :key="member.scid"
    class="page_block person"
    :style="member.backgroundImage"
  )
    router-link(
      :to="'/people/single/' + member.scid"
      class="link_absolute"
    ) {{ member.given_name }} {{ member.family_name }}
    div(class="page_block_content")
      span(class="page_block_title") {{ member.given_name }} {{ member.family_name }}
      span(class="page_block_description") {{ member.position }}

  a(href="#", class="view_all") View All
</template>

<script>

export default {
  name: 'tab-people',
  computed: {
    dataCount () {
      let faculty = [];
      if (this.$store.state.researchAreaMembers.list.length && this.$store.state.directory.list.length && this.$store.state.researchAreas.area_id) {
        let selected_area = this.$store.state.researchAreas.area_id;
        let directory = this.$store.state.directory.list;
        let research_members = this.$store.state.researchAreaMembers.list;

        research_members.map(function(member){
          let research_member = _.find(directory, function(person){ return person.scid === member.scid })

          if (research_member) {
            research_member.backgroundImage =  'background-image: url(' + research_member.image_url + ');';
            faculty.push(research_member);
          }

        });
      }

      return faculty.length;
    },
    facultyInArea() {
      let faculty = [];
      if (this.$store.state.researchAreaMembers.list.length && this.$store.state.directory.list.length && this.$store.state.researchAreas.area_id) {
        let selected_area = this.$store.state.researchAreas.area_id;
        let directory = this.$store.state.directory.list;
        let research_members = this.$store.state.researchAreaMembers.list;

        research_members.map(function(member){
          let research_member = _.find(directory, function(person){ return person.scid === member.scid })

          if (research_member) {
            research_member.backgroundImage =  'background-image: url(' + research_member.image_url + ');';
            faculty.push(research_member);
          }

        });
      }

      if (faculty.length)
        return faculty;
      else
        return false;
    }
  }
}
</script>
