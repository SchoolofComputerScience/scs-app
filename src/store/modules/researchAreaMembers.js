import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: []
  },
  actions: {
    GET_RESEARCH_AREA_MEMBERS: ({ commit, state }, fields = {}) => {
      return state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
          query: gql`
            {
            	researchAreaMembers(area_id:"${fields}") {
                scid
              }
            }
          `
        }).then((res, err) => {
          if (res) {
            commit('SET_MEMBERS', res.data)
            return res.data
          } else {
            Promise.reject(":err :reasearch areas members graphql failed")
          }
        }).catch((err) => {
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    }
  },
  mutations: {
    SET_MEMBERS: (state, data) => {
      state.list = data.researchAreaMembers;
    }
  }
}
