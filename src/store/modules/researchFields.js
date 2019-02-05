import Vue from 'vue'
import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: [],
    field: {}
  },
  actions: {
    GET_RESEARCH_FIELDS: ({ commit, state }) => {
      return state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
          query: gql`
            {
            	allResearchFields {
                field
                field_text
                description
                discipline
              }
            }
          `
        }).then((res, err) => {
          if (res) {
            commit('SET_RESEARCH_FIELDS', res.data)
            return res.data
          } else {
            Promise.reject(":err :reasearch fields graphql failed")
          }
        }).catch((err) => {
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    GET_RESEARCH_FIELD: ({ commit, state }, fields = {}) => {
      return state.field.length
        ? Promise.resolve(state.field)
        : apollo.query({
          query: gql`
            {
            	researchField(field:"${fields}") {
                field
                field_text
                description
                discipline
                areas {
                  area_id
                  title
                }
                courses {
                  course_id
                  course_number
                  long_title
                }
                members {
                  scid
                }
              }
            }
          `
        }).then((res, err) => {
          if (res) {
            commit('SET_RESEARCH_FIELD', res.data)
            return res.data
          } else {
            Promise.reject(":err :reasearch field graphql failed")
          }
        }).catch((err) => {
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    }
  },
  mutations: {
    SET_RESEARCH_FIELDS: (state, data) => {
      state.list = data.allResearchFields;
    },
    SET_RESEARCH_FIELD: (state, data) => {
      state.field = data.researchField[0];
    }
  }
}
