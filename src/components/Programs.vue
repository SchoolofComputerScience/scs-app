<template>
  <div class="programs-view">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in">
      <article v-if="!condensed">
        <div v-for="(department, departmentID) in programs">
          <h2 :id="departmentID.toLowerCase()">{{departmentID | departmentTranslate}}</h2>
          <section class="container">
            <div class="degree" v-for="(degree_level, graduate_level) in department">
              <h3>{{graduate_level}} Programs</h3>
              <div v-for="degree in degree_level" class="level">
                <div v-for="program in degree" class="program">
                  <h4>{{program.program_name}} - <a :href="program.url" target="_blank">Learn More</a></h4>
                  <div>{{program.description}}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
      <article v-if="condensed">
        <div v-for="department in programs">
          <section class="container">
            <div class="degree" v-for="(degree_level, graduate_level) in department">
              <h3>{{graduate_level}} Programs</h3>
              <ul v-for="degree in degree_level">
                <li v-for="program in degree" class="program">
                  <a :href="program.url" target="_blank">{{program.program_name}}</a>
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
      let component_department = this.department || this.$store.state.route.params.department;
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
              url: program.url,
              description: program.description,
              department: program.department
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

<style lang="stylus" scoped>

h3 {
  text-transform: capitalize;
  background: #eee;
  padding: 0.25em;
  margin-bottom: 0.5em;
}

#csd {
  border-bottom: 4px solid #22b49b;
  margin: 1em 0 .5em 0;
  padding-bottom: 0.25em;
}

#ri {
  border-bottom: 4px solid #9b22b4;
  margin: 1em 0 .5em 0;
  padding-bottom: 0.25em;
}

#mld {
  border-bottom: 4px solid #b42284;
  margin: 1em 0 .5em 0;
  padding-bottom: 0.25em;
}

#compbio {
  border-bottom: 4px solid #b45222;
  margin: 1em 0 .5em 0;
  padding-bottom: 0.25em;
}

#isr {
  border-bottom: 4px solid #165574;
  margin: 1em 0 .5em 0;
  padding-bottom: 0.25em;
}

#etc {
  border-bottom: 4px solid #2c3e50;
  margin: 1em 0 .5em 0;
  padding-bottom: 0.25em;
}

#lti {
  border-bottom: 4px solid #3bb422;
  margin: 1em 0 .5em 0;
  padding-bottom: 0.25em;
}

#hcii {
  border-bottom: 4px solid #b49b22;
  margin: 1em 0 .5em 0;
  padding-bottom: 0.25em;
}

.degree, .level {
  margin-bottom: 2em;
}

.program {
  margin-bottom: 1em;
}

</style>
