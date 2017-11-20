import Vue from 'vue'
import marked from 'marked'
import * as staticdb from 'staticDB'
const staticContent = 'https://storage.googleapis.com/scs-content/pages/'
import { router } from '../../app'

export default {
  state: {
    title: '',
    menu: false,
    pages: {},
    staticDB: global.STATIC_DB
  },
  actions: {
    FETCH_PAGE: ({ commit, state }, fields = {}) => {

      if (!state.pages[fields]) {
        let page = staticContent + fields + '.md'
        let found = false;

        state.staticDB.pages.map((value, key ) => {
          if (value.slug === fields) {
            found = true;
          }
        })

        if(!found) router.replace('/404')

        fetch(page).then((res, err) => {
          if (res.status >= 400) {
            router.replace('/404')
          }
          return res.text()
        }, (err) => {
          router.replace('/404')
        })
        .then((res) => {
          commit('setMarkdown', {res, fields})
        }) 
      }
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
        page.markdown = page.slug + '.md'
        return page
      }),
  }
}
