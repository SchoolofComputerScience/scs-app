import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    articles: {},
    list: []
  },
  actions: {
    GET_NEWS_ARTICLE: ({ commit, state }, fields = {}) => {
      return state.articles[fields]
        ? Promise.resolve(state.articles[fields])
        : apollo.query({
          query: gql`
            {
              article(uid:"${fields}") {
                title
                date
                uid
                image
                body
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_NEWS_ARTICLE', res.data)
            return res.data
          }
        }).catch((err) =>{
          Promise.reject(":err :department graphql failed")
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    GET_NEWS_LIST: ({ commit, state }, fields = {}) => {
      return state.list.length
        ? Promise.resolve(state.list)
        : apollo.query({
          query: gql`
            {
              news {
                image
                date
                title
                uid
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_NEWS_LIST', res.data)
            return res.data
          } else {
            Promise.reject(":err :department graphql failed")
          }
        }).catch((err) =>{
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        })
    }
  },
  mutations: {
    SET_NEWS_ARTICLE: (state, data) => {
      Vue.set(state.articles, data.article[0].uid, data.article[0])
    },
    SET_NEWS_LIST: (state, data) => {
      state.list = data.news
    }
  }
}
