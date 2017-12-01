import Vue from 'vue'
import marked from 'marked'
import { router } from '../../app'
const staticContent = 'http://localhost:5000/content?page_name='

export default {
  state: {
    title: '',
    menu: false,
    pages: {}
  },
  actions: {
    FETCH_PAGE: ({ commit, state }, fields = {}) => {

      if (!state.pages[fields]) {
        let page = staticContent + fields;

        fetch(page).then((res, err) => {
          if (res.status >= 400) {
            router.replace('/404')
          }
          return res.text();
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
      Vue.set(state.pages, data.fields, data.res)
    }
  },
  getters:{
    title: state => state.title,

    menu: state => state.menu
  }
}
