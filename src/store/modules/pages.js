import Vue from 'vue'
import marked from 'marked'
import * as staticdb from 'staticDB'

export default {
  state: {
    title: '',
    menu: false,
    pages: {},
    staticDB: global.STATIC_DB
  },
  actions: {
    FETCH_PAGE: ({ commit, state }, fields = {}) => {

      let page = '/content/pages/' + fields + '.md'

      let host = process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'https://scs-shadow.com'

      return state.pages[fields]
        ? Promise.resolve(state.pages[fields])
        : fetch(host + page)
          .then((res, err) => {
             if (res.status >= 400) {
              throw new Error("404 | Page Error")
            }
            return res.text()
          }, (err) => {
            err.message
          }).then((res) => {
            commit('setMarkdown', {res, fields})
            return res
          })
    },

    documentTitle: ({ commit, state }, title) => {
      const documentTitle = title
      commit('setDocumentTitle', { title: documentTitle })
    },

    sideMenu: ({ commit, state }, visibility) => {
      commit('setSideMenu', { visibility })
    }
  },
  mutations: {
    setDocumentTitle: (state, { title }) => {
      state.title = title
    },

    setSideMenu: (state, { visibility }) => {
      state.menu = visibility
    },

    setMarkdown: (state, data) => {
      Vue.set(state.pages, data.fields, data.res )
    }
  },
  getters:{
    title: state => state.title,

    menu: state => state.menu,

    config: state => state.staticDB,

    navigation: state => state.staticDB.pages
      .map(page => {
        page.markdown = '/content/pages/' + page.slug + '.md'
        return page
      }),

  }
}
