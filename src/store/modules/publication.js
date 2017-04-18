import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    pub: {},
  },
  actions: {
    FETCH_PUBLICATION: ({ commit, state }, fields = {}) => {
      return state.pub[fields]
        ? Promise.resolve(state.pub[fields])
        : apollo.query({
          query: gql`
            {
              publication(id:"${fields}"){
                _id
                authors
                desc
                gs_citation_count
                gs_citation_guid
                gs_citation_url
                gs_profile_guid
                journal
                pages
                pub_date
                pub_format
                pub_url
                pub_year
                publisher
                timestamp
                title
                scid
              }
            }
          `,
          variables: {
            fields
          }
        }).then((res,err) => {
          if (res) {
            commit('SET_PUBLICATION', res.data)
            return res.data
          } else {
            Promise.reject(":err :directory graphql failed")
          }
        }).catch((err) =>{
          console.error(`GraphQL Error: ${err.message}`)
        })

    }
  },
  mutations: {
    SET_PUBLICATION: (state, data) => {
      Vue.set(state.pub, data.publication._id, data.publication)
    }
  }
}
