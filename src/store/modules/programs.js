import Vue from 'vue'
import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: [],
    selected: {}
  },
  actions: {
    GET_PROGRAMS: ({ commit, state }, fields = {}) => {
      return state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
          query: gql`
            {
            	programs {
                program_id
                program_name
                url
                description
                department
                graduate_level
                degree_level
                additional_degree
                learning_outcomes {
                  track_id
                  outcomes
                }
                goals {
                  track_id
                  goal
                }
                areas {
                  track_id
                  areas {
                    title
                    area_id
                  }
                }
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_PROGRAMS', res.data)
            return res.data
          } else {
            Promise.reject(":err :programs graphql failed")
          }
        }).catch((err) =>{
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    
    GET_PROGRAM: ({ commit, state }, fields = {}) => {
      return apollo.query({
        query: gql`
          {
            programs(program_id:"${fields}") {
              program_id
              program_name
              url
              description
              department
              graduate_level
              degree_level
              additional_degree
              learning_outcomes {
                track_id
                outcomes
              }
              goals {
                track_id
                goal
              }
              areas {
                track_id
                areas {
                  title
                  area_id
                }
              }
            }
          }
        `
      }).then((res,err) => {
        if (res) {
          commit('SET_PROGRAM', res.data)
          return res.data
        } else {
          Promise.reject(":err :program graphql failed")
        }
      }).catch((err) =>{
        console.error(err.locations)
        console.error(`GraphQL Error: ${err.message}`)
      })
    }
  },
  mutations: {
    SET_PROGRAMS: (state, data) => {
      state.list = data.programs;
    },
    SET_PROGRAM: (state, data) => {
      state.selected = (data.programs && data.programs[0]) ? data.programs[0] : {};
    }
  }
}
