import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    department: {},
    list: []
  },
  actions: {
    GET_DEPARTMENT: ({ commit, state }, fields = {}) => {
      return state.department.length
        ? Promise.resolve(state.department)
        : apollo.query({
          query: gql`
            {
            	department(uid:"${fields}"){
                uid
                name
                description
                mainimg
                logo
                url
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_DEPARTMENT', res.data)
            return res.data
          } else {
            Promise.reject(":err :department graphql failed")
          }
        }).catch((err) =>{
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    GET_DEPARTMENT_LIST: ({ commit, state }, fields = {}) => {
      return state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
          query: gql`
            {
              directoryAggregate(field:"department"){
                _id
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_DEPARTMENT_LIST', res.data)
            return res.data
          } else {
            Promise.reject(":err :department graphql failed")
          }
        }).catch((err) =>{
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    }
  },
  mutations: {
    SET_DEPARTMENT: (state, data) => {
      Vue.set(state.department, data.department.uid, data.department)
    },
    SET_DEPARTMENT_LIST: (state, data) => {
      state.list = data.directoryAggregate
    }
  }
}
