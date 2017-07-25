import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    navState: false
  },

  mutations: {
    SET_NAVIGATION_STATE: (state, position) => {
      state.navState = position
    }
  }
}
