import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: []
  },
  actions: {
    GET_RESEARCH_AREA_COURSES: ({ commit, state }, fields = {}) => {
      return state.list && state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
          query: gql`
            {
            	researchAreaCourses(area_id:"${fields}") {
                course_id
                course_number
                title
              }
            }
          `
        }).then((res, err) => {
          if (res) {
            commit('SET_RESEARCH_COURSES', res.data)
            return res.data
          } else {
            Promise.reject(":err :reasearch areas courses graphql failed")
          }
        }).catch((err) => {
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    }
  },
  mutations: {
    SET_RESEARCH_COURSES: (state, data) => {
      state.list = data.researchAreaCourses;
    }
  }
}
