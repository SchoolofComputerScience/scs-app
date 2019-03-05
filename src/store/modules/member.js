import Vue from 'vue'
import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: { },
  actions: {
    FETCH_MEMBER: ({ commit, state }, fields = {}) => {
      return state[fields]
        ? Promise.resolve(state[fields])
        : apollo.query({
          query: gql`
            {
              members(scid:"${fields}"){
                andrew_id
                biography
                display_email
                display_name
                email
                family_name
                fax_phone
                given_name
                homepage_url
                image_url
                is_alum
                middle_name
                name_suffix
                phone_area_code
                phone_area_code_secondary
                phone_exchange
                phone_extension
                phone_extension_secondary
                hr_relationship
                hr_relationship_class
                hr_relationship_desc
                phone_full
                phone_full_call
                scid
                scs_id
                scs_email
                scs_relationship_desc
                scs_relationship_class
                scs_relationship_subclass
                positions {
                  building_id
                  department
                  hr_department_id
                  performance_supervisor_scid
                  primary_position_indicator
                  room
                  scs_position_class
                  scs_position_desc
                  title
                }
                profile {
                  scid
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
                }
                publications {
                  authors
                  description
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
            }
          `,
          variables: {
            fields
          }
        }).then((res,err) => {
          if (res) {
            commit('SET_MEMBER', res.data.members)
            return res.data.members
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
      Vue.set(state, data[0].scid, data[0])
    }
  }
}
