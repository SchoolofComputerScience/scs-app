<template lang="pug">

PeopleGrid(
  :directory="facultyInArea"
  :hasHeadline="false"
  )
</template>

<script>

import PeopleGrid from '../components/PeopleGrid.vue';

export default {
  name: 'tab-people',
  components: {
    PeopleGrid
  },
  computed: {
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
