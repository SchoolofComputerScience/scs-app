import Vue from 'vue'
import apollo from '../../api'
import gql from 'graphql-tag'

export default {
  state: {
    articles: {},
    list: [],
    //TODO: News contact should come from the database and not hard-coded. At this time, it is not available.
    newsContact: {
      display_name: 'Byron Spice',
      phone: '412-268-9068',
      email: 'bspice@cs.cmu.edu'
    },
    error: {}
  },
  actions: {
    SEARCH_NEWS_ARTICLES: ({ commit, state }, fields = {}) => {
      return apollo.query({
          query: gql`
            {
              newsBySearch(query:"${fields}") {
                headline
                date
                id
                image
                image_alt
                image_caption
              }
            }
          `
        }).then((res,err) => {
          if (res.data.newsBySearch.length == 0){
            commit('SET_NEWS_LIST', {error: "No Matching Articles"})
          }else {
            commit('SET_NEWS_LIST', res.data)
            return res.data
          }
        }).catch((err) =>{
          console.log(err)
          Promise.reject(":err :news articles graphql failed")
          console.error(`GraphQL Error: ${err.message}`)
          commit('SET_NEWS_LIST', {error: `GraphQL Error: ${err.message}`})
        })
    },
    GET_NEWS_ARTICLE: ({ commit, state }, fields = {}) => {
      return state.articles[fields]
        ? Promise.resolve(state.articles[fields])
        : apollo.query({
          query: gql`
            {
              news(id:"${fields}") {
                headline
                subheading
                date
                id
                image
                image_alt
                image_caption
                copy
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_NEWS_ARTICLE', res.data)
            return res.data
          } else {
            commit('SET_NEWS_ARTICLE', {error: `GraphQL Error: ${err.message}`})
          }
        }).catch((err) =>{
          Promise.reject(":err :news article graphql failed")
          console.error(`GraphQL Error: ${err.message}`)
          commit('SET_NEWS_ARTICLE', {error: `GraphQL Error: ${err.message}`})
        })
    },
    GET_NEWS_LIST: ({ commit, state }, fields = {}) => {
      return apollo.query({
          query: gql`
            {
              news {
                headline
                subheading
                date
                id
                image
                image_alt
                image_caption
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_NEWS_LIST', res.data)
            return res.data
          } else {
            Promise.reject(":err :news articles graphql failed")
            commit('SET_NEWS_LIST', {error: `GraphQL Error: ${err.message}`})
          }
        }).catch((err) =>{
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
          commit('SET_NEWS_LIST', {error: `GraphQL Error: ${err.message}`})
        })
    }
  },
  mutations: {
    SET_NEWS_ARTICLE: (state, data) => {
      if(data.error){
        state.error = data.error
      } else {
        state.error = ''
        Vue.set(state.articles, data.news[0].id, data.news[0])
      }
    },
    SET_NEWS_LIST: (state, data) => {
      if(data.error){
        state.error = data.error
      }else{
        state.error = ''
        state.list = data.news || data.newsBySearch
      }
    }
  }
}
