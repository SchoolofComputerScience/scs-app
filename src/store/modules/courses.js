import Vue from 'vue'
import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    years: [],
    courses: [],
    lists: {},
    course: {}
  },
  actions: {
    FETCH_COURSE_YEARS: ({ commit, state }, fields = {}) => {
      return state.years.length
        ? Promise.resolve(state.years)
        : apollo.query({
        query: gql`
          {
            courseIntAgg(field:"year") {
              _id
            }
          }
        `
      }).then((res,err) => {
        if (res) {
          commit('SET_COURSE_YEARS', res.data)
          return res.data
        } else {
          Promise.reject(":err :course graphql failed")
        }
      }).catch((err) =>{
        console.error(err.locations)
        console.error(`GraphQL Error: ${err.message}`)
      })
    },
    FETCH_COURSE_LIST: ({commit, state}, fields = {}) => {
      return state.lists[fields]
        ? Promise.resolve(state.lists[fields])
        : apollo.query({
          query: gql`
            {
              courseStringAgg(field:"department") {
                _id
              }
              courses(semester_code:"${fields}"){
                _id
                college
                course_id
                course_number
                department
                description
                graduate_level
                long_title
                s3_department
                semester
                semester_code
                sections{
                  course_section_id
                  delivery_mode
                  location
                  long_title
                  presence_required
                  title

                  child_courses{
                    course_number
                    section
                    semester_code
                  }
                  cross_listed_courses{
                    course_number
                    section
                    semester_code
                  }
                  instructors{
                    andrew_id
                    email
                    first_name
                    last_name
                    scid
                    valid
                  }
                  meetings{
                    building
                    days
                    end_time
                    room
                    start_time
                  }
                  parent_course{
                    course_number
                    section
                    semester_code
                  }
                }
              }
            }
          `
        }).then((res,err) => {
          var dataSend = {
            fields : fields,
            data : res.data
          }
          commit('SET_COURSE_LIST', dataSend)
          return dataSend
        }).catch((err) =>{
          console.error(`GraphQL Error: ${err.message}`)
        })

    },
    FETCH_COURSE: ({commit, state}, fields = {}) => {
      return state.course[fields]
        ? Promise.resolve(state.course[fields])
        : apollo.query({
          query: gql`
            {
              course(course_id:"${fields}"){
                _id
                areas{
                  area_id
                  title
                }
                college
                course_id
                course_number
                department
                description
                graduate_level
                lecture_distinction
                long_title
                s3_department
                semester
                semester_code
                units
                sections{
                  course_section_id
                  delivery_mode
                  location
                  long_title
                  presence_required
                  section
                  title

                  child_courses{
                    course_number
                    section
                    semester_code
                  }
                  cross_listed_courses{
                    course_number
                    section
                    semester_code
                  }
                  instructors{
                    andrew_id
                    email
                    first_name
                    last_name
                    scid
                    valid
                  }
                  meetings{
                    building
                    days
                    end_time
                    room
                    start_time
                  }
                  parent_course{
                    course_number
                    section
                    semester_code
                  }
                }
              }
            }
          `
        }).then((res,err) => {
          commit('SET_COURSE', res.data)
          return res.data
        }).catch((err) =>{
          console.error(`GraphQL Error: ${err.message}`)
        })

    }
  },
  mutations: {
    SET_COURSE_YEARS: (state, data) => {
      state.years = data.courseIntAgg;
    },
    SET_COURSE_LIST: (state, data) => {
      Vue.set(state.lists, data.fields, data.data.courses)
    },
    SET_COURSE: (state, data) => {
      Vue.set(state.course, data.course.course_id, data.course)
    }
  }
}
