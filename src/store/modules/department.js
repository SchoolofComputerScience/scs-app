import Vue from 'vue'
import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: [],
    scs_list: [],
    selected_department: { id: '', name: '' }
  },
  // @TODO: semesterCode is hard coded in this query. Fix it.
  actions: {
    GET_DEPARTMENTS: ({ commit, state }, fields = {}) => {
      return state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
          query: gql`
            {
              departments {
                department_id
                department_name
                college_id
                scs_relationship
                scs_type
                cmu_type
                url
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_DEPARTMENTS', res.data)
            return res.data
          } else {
            Promise.reject(":err :department graphql failed")
          }
        }).catch((err) =>{
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    GET_SCS_DEPARTMENT_LIST: ({ commit, state }, fields = {}) => {
      return state.scs_list.length
        ? Promise.resolve(state.scs_list)
        : apollo.query({
          query: gql`
            {
              departments(college_id:"scs") {
                department_id
                department_name
                college_id
                college_name
                scs_relationship
                scs_type
                cmu_type
                url
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_SCS_DEPARTMENT_LIST', res.data)
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
    SET_DEPARTMENTS: (state, data) => {
      state.list = data.departments;
    },
    SET_SCS_DEPARTMENT_LIST: (state, data) => {
      state.scs_list = data.departments;
    },
    SET_SELECTED_DEPARTMENT: (state, department) => {
      state.selected_department.id = department.id;
      state.selected_department.name = department.name;
    }
  }
}
