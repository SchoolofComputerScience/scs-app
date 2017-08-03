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
              courses(semesterCode:"${fields}"){
                _id
                level
                longTitle
                college
                s3Department
                department
                courseCode
                courseNumber
                section
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
              course(courseCode:"${fields}"){
                _id
            		description
                courseNumber
                meetings{
                  endTime
                  building
                  room
                  days
                  startTime
                }
                childCourses{
                  section
                  semesterCode
                  detailUri
                  courseNumber
                }
                deliveryMode
                s3Department
                department
                courseCode
                title
                programLocation
                level
                isStudentPresenceRequired
                crossListedCourses{
                  section
                  semesterCode
                  detailUri
                  courseNumber
                }
                units
                longTitle
                instructors{
                  andrewId
                  scid
                  lastName
                  firstName
                  email
                  valid
                }
                college
                section
                semesterCode
                semester
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
      Vue.set(state.course, data.course.courseCode, data.course)
    }
  }
}
