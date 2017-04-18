import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    info: {},
  },
  actions: {
    FETCH_MEMBER: ({ commit, state }, fields = {}) => {
      return state.info[fields]
        ? Promise.resolve(state.info[fields])
        : apollo.query({
          query: gql`
            {
              directory(name:"${fields}"){
                _id
                fullname
                job
                name
                room
                department
                fulldepartment
                short_jobtitle
                news{
                  uid
                  image
                }
                gsProfile{
                  gs_affiliation
                  gs_areas
                  gs_citation_count
                  gs_citation_count_five_year
                  gs_fullname
                  gs_hindex
                  gs_hindex_five_year
                  gs_homepage_url
                  gs_i10index
                  gs_i10index_five_year
                  gs_image_url
                  gs_profile_guid
                  gs_profile_url
                  scid
                  pub_year_agg{
                    _id
                  }
                }
                gsPublication{
                  _id
                  title
                  pub_year
                }
              }
            }
          `,
          variables: {
            fields
          }
        }).then((res,err) => {
          if (res) {
            commit('SET_MEMBER', res.data.directory)
            return res.data.directory
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
    SET_MEMBER: (state, data) => {
      Vue.set(state.info, data[0].name, data[0])
    }
  }
}
