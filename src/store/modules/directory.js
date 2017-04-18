import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: []
  },
  actions: {
    GET_DIRECTORY: ({ commit, state }) => {
      return state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
         query: gql`
          {
            directory {
              _id
              name
              fullname
              job
              room
              department
              short_jobtitle
            }
          }
        `
      }).then((res,err) => {
         if (res) {
          commit('SET_DIRECTORY', res.data)
          return res.data
        } else {
          Promise.reject(":err :directory graphql failed")
        }
      }).catch((err) =>{
        console.error(err.locations)
        console.error(`GraphQL Error: ${err.message}`)
      })
    }
  },
  mutations: {
    SET_DIRECTORY: (state, data) => {
      state.list = data.directory
    }
  }
}
