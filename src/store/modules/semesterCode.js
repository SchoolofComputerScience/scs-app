import Vue from 'vue'
import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    code: ''
  },
  actions: {
    GET_SEMESTER_CODE: ({ commit, state }, fields = {}) => {
      return state.code.length
        ? Promise.resolve(state.code)
        : apollo.query({
          query: gql`
            {
            	semesterCode
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_SEMESTER_CODE', res.data)
            return res.data
          } else {
            Promise.reject(":err :sememsterCode graphql failed")
          }
        }).catch((err) =>{
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    }
  },
  mutations: {
    SET_SEMESTER_CODE: (state, data) => {
      state.code = data.semesterCode;
    }
  }
}
