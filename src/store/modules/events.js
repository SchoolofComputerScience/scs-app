import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    event: {},
    list: [],
    error: {}
  },
  actions: {
    SEARCH_EVENTS: ({ commit, state }, fields = {}) => {
      return apollo.query({
          query: gql`
            {
              eventsBySearch(query: "${fields}") {
                uid
                talkTitle
                type
                title
                speakerName
                startDate
                tags
              }
            }
          `
        }).then((res,err) => {
          if (res.data.eventsBySearch.length == 0){
            commit('SET_EVENTS_LIST', {error: "No Matching Events"})
          }
          else if (res) {
            commit('SET_EVENTS_LIST', res.data)
            return res.data
          }
        }).catch((err) =>{
          Promise.reject(":err :department graphql failed")
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    GET_EVENT: ({ commit, state }, fields = {}) => {
      return state.event[fields]
        ? Promise.resolve(state.event[fields])
        : apollo.query({
          query: gql`
            {
              event(uid:"${fields}") {
                uid
                room
                building
                title
                abstract
                startDate
                endDate
                talkTitle
                speakerName
                speakerCompany
                speakerCompanyTeam
                type
                tags
                eventUrl
                poster
              }
            }
          `
        }).then((res,err) => {

          if (res) {
            commit('SET_EVENT', res.data)
            return res.data
          }
        }).catch((err) =>{
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    GET_EVENTS_LIST: ({ commit, state }, fields = {}) => {
      return apollo.query({
          query: gql`
            {
              events {
                uid
                talkTitle
                type
                title
                speakerName
                startDate
                tags
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_EVENTS_LIST', res.data)
            return res.data
          }
        }).catch((err) =>{
          console.error(`GraphQL Error: ${err.message}`)
        })
    }
  },
  mutations: {
    SET_EVENT: (state, data) => {
      Vue.set(state.event, data.event[0].uid, data.event[0])
    },
    SET_EVENTS_LIST: (state, data) => {
      if(data.error){
        state.error = data.error
      }else{
        state.error = ''
        state.list = data.events || data.eventsBySearch
      }
    }
  }
}
