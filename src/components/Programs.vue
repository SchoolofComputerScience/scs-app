<template>
  <div class="programs-view content-page card">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in">

      <article v-if="!condensed">
        <div v-for="(department, departmentID) in programs" :key="departmentID">
          <h2 :id="departmentID.toLowerCase()">{{departmentID | departmentTranslate}}</h2>
          <section class="container">
            <div class="degree" v-for="(degree_level, graduate_level) in department" :key="graduate_level">
              <h2>{{graduate_level}} Programs</h2>
              <div v-for="(degree, index) in degree_level" class="level" :key="index">
                <div v-for="program in degree" class="program" :key="program.program_id">
                  <h3><router-link v-if="program.description && program.areas_count > 0" :to="'/programs/' + program.program_id">{{program.program_name}}</router-link><a v-else :href="program.url" target="_blank">{{program.program_name}}</a></h3>
                  <p>{{program.description}}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      <article v-if="condensed">
        <div v-for="(department, departmentID) in programs" :key="departmentID">
          <section class="container condensed">
            <div class="degree" v-for="(degree_level, graduate_level) in department" :key="graduate_level">
              <h2>{{graduate_level}} Programs</h2>
              <ul v-for="(degree, index) in degree_level" :key="index">
                <li v-for="program in degree" class="program" :key="program.program_id">
                  <p><router-link v-if="program.description && program.areas_count > 0" :to="'/programs/' + program.program_id">{{program.program_name}}</router-link><a v-else :href="program.url" target="_blank">{{program.program_name}}</a></p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </article>

    </transition>
  </div>
</template>

<script>
import { router } from '../app'
import Spinner from '../components/Spinner.vue'

function fetchPrograms(store) {
  return store.dispatch('GET_PROGRAMS')
}

export default {
  name: 'programs',

  props: ['degree_level', 'department', 'graduate_level', 'condensed'],

  components: {
    Spinner,
  },

  preFetch: fetchPrograms,

  components: {
    Spinner
  },

  computed: {
    loaded() {
      return this.$store.state.programs.list.length;
    },

    programs() {
      let component_department = this.department || this.$store.state.route.params.department || this.$store.state.department.selected_department;
      let component_degree_level = this.degree_level || this.$store.state.route.params.degree_level;
      let component_graduate_level = this.graduate_level || this.$store.state.route.params.graduate_level;
      let programs_data = this.$store.state.programs.list || [];
      let final_list = {};
      let valid_departments = [
        'csd',
        'compbio',
        'lti',
        'hcii',
        'mld',
        'etc',
        'ri',
        'isr'
      ];

      for(let i = 0, programs_length = programs_data.length; i < programs_length; i++) {
        let program = programs_data[i];

        if (component_degree_level && component_degree_level.length && component_degree_level !== program.degree_level) {
          continue;
        }

        if (component_graduate_level && component_graduate_level.length && component_graduate_level !== program.graduate_level) {
          continue;
        }

        if (component_department && component_department.length && !program.department.includes(component_department)) {
          continue;
        }

        for(let y = 0, department_count = program.department.length; y < department_count; y++) {
          let department = program.department[y];

          if (component_department && component_department.length && component_department !== department) {
            continue;
          }

          if (valid_departments.includes(department)) {
            final_list[department] = final_list[department] || {};
            final_list[department][program.graduate_level] = final_list[department][program.graduate_level] || {};
            final_list[department][program.graduate_level][program.degree_level] = final_list[department][program.graduate_level][program.degree_level] || [];

            final_list[department][program.graduate_level][program.degree_level].push({
              program_name: program.program_name,
              program_id: program.program_id,
              url: program.url,
              description: program.description,
              department: program.department,
              areas_count: program.areas ? program.areas.length : 0
            });
          }
        }
      }

      return final_list;
    }
  },

  beforeMount () {
    fetchPrograms(this.$store);
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

h2 {
  text-transform: capitalize;
  margin-top: $base-line-height;
}

</style>
