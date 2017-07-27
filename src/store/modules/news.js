import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    articles: {},
    list: [],
    error: {}
  },
  actions: {
    SEARCH_NEWS_ARTICLES: ({ commit, state }, fields = {}) => {
      return apollo.query({
          query: gql`
            {
              newsBySearch(query:"${fields}") {
                title
                date
                uid
                image
                tags {
                  tag
                  name
                }
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
          Promise.reject(":err :department graphql failed")
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    GET_DEPARTMENT_NEWS: ({ commit, state }, fields = {}) => {
      return apollo.query({
          query: gql`
            {
              newsByTag(department:"${fields}") {
                title
                date
                uid
                image
                tags {
                  tag
                  name
                }
              }
            }
          `
        }).then((res,err) => {
          commit('SET_DEPARTMENT_NEWS_LIST', res.data)
          return res.data
        }).catch((err) =>{
          Promise.reject(":err :department graphql failed")
          console.error(`GraphQL Error: ${err.message}`)
        })
    },
    GET_NEWS_ARTICLE: ({ commit, state }, fields = {}) => {
      return state.articles[fields]
        ? Promise.resolve(state.articles[fields])
        : apollo.query({
          query: gql`
            {
              newsArticle(uid:"${fields}") {
                title
                date
                uid
                image
                body
                tags {
                  tag
                  name
                }
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
      return apollo.query({
          query: gql`
            {
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
      Vue.set(state.articles, data.newsArticle[0].uid, data.newsArticle[0])
    },
    SET_NEWS_LIST: (state, data) => {
      if(data.error){
        state.error = data.error
      }else{
        state.error = ''
        state.list = data.news || data.newsBySearch
      }
    },
    SET_DEPARTMENT_NEWS_LIST: (state, data) => {
      console.log(data)
      //state.department_list = data.news
    }
  }
}
