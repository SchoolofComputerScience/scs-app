import Vue from 'vue'
import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: [],
    area_id: '',
    title: ''
  },
  actions: {
    GET_RESEARCH_AREAS: ({ commit, state }) => {
      return state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
          query: gql`
            {
            	researchAreas {
                area_id
                title
                description
                gs_count
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_RESEARCH_AREAS', res.data)
            return res.data
          } else {
            Promise.reject(":err :reasearch areas graphql failed")
          }
        }).catch((err) =>{
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    }
  },
  mutations: {
    SET_RESEARCH_AREAS: (state, data) => {
      state.list = data.researchAreas;
    },
    SET_SELECTED_RESEARCH_AREA: (state, researchArea) => {
      state.area_id = researchArea.area_id;
      state.title = researchArea.title;
    }
  }
}
