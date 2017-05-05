import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: []
  },
  actions: {
    GET_DIRECTORY: ({ commit, state }, department = '') => {
      if (!department) {
        if (!state.default_list) {
          return apollo.query({
            query: gql`
              {
                directory {
                  _id
                  given_name
                  family_name
                  full_name
                  positions {
                    title
                    department
                    room
                    building
                  }
                  relationship
                  relationship_class
                  relationship_desc
                  research_areas
                  scid
                }
              }
            `
          }).then((res,err) => {
            if (res) {
              commit('SET_DEFAULT_DIRECTORY', res.data)
              return res.data
            } else {
              Promise.reject(":err :directory graphql failed")
            }
          }).catch((err) => {
            console.error(err.locations)
            console.error(`GraphQL Error: ${err.message}`)
          });
        }
        else {
          commit('SET_DEFAULT_DIRECTORY', state.default_list)
          return Promise.resolve(state.list);
        }
      }
      else {
        if (state.department === department) {
          return Promise.resolve(state.list);
        }

        if (!state.default_list && state.department !== department) {
          apollo.query({
            query: gql`
              {
                directory(department:"${department}" ) {
                  _id
                  given_name
                  family_name
                  full_name
                  positions {
                    title
                    department
                    room
                    building
                  }
                  relationship
                  relationship_class
                  relationship_desc
                  research_areas
                  scid
                }
              }
            `
          }).then((res,err) => {
            if (res) {
              commit('SET_DIRECTORY', res.data, department)
              return res.data
            } else {
              Promise.reject(":err :directory graphql failed")
            }
          }).catch((err) => {
            console.error(err.locations)
            console.error(`GraphQL Error: ${err.message}`)
          });
        }
        else {
          commit('SET_FILTERED_DIRECTORY', state.default_list, department)
        }
      }
    }
  },
  mutations: {
    SET_DIRECTORY: (state, data, department) => {
      if (department) {
        state.list = data.directory;
        state.department = department;
      }
      else {
        state.list = data.directory;
        state.default_list = data.directory;
        state.department = '';
      }
    },
    SET_DEFAULT_DIRECTORY: (state, data) => {
      state.list = data.directory;
      state.default_list = data.directory;
    },
    SET_FILTERED_DIRECTORY: (state, data, department) => {
      let filtered_list = {};
      filtered_list = state.default_list.filter(function(item){
        return item.positions.find(position => position.department === department);
      });
      state.list = filtered_list;
    }
  }
}
