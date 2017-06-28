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
              directory(scid:"${fields}"){
                email
                biography
                family_name
                fax_phone
                given_name
                homepage_url
                middle_name
                name_suffix
                image_url
                phone_area_code
                phone_area_code_secondary
                phone_exchange
                phone_extension
                phone_extension_secondary
                hr_relationship
                hr_relationship_class
                hr_relationship_desc
                research_areas
                full_name
                phone_full_call
                phone_full
                scid
                scs_relationship_class
                scs_relationship_desc
                positions {
                  building
                  department
                  department_name
                  hr_department
                  performance_supervisor
                  primary_position
                  room
                  title
                }
                news {
                  title
                  date
                  uid
                  image
                  tags {
                    tag
                    name
                  }
                }
                events{
                  uid
                  title
                  startDate
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
                courses{
                  longTitle
                  courseNumber
                  courseCode
                  level
                  department
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
      Vue.set(state.info, data[0].scid, data[0])
    }
  }
}
