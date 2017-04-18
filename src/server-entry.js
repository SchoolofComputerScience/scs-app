import { app, router, store } from './app'

export default context => {
  router.push(context.url)

  if (!router.getMatchedComponents().length) {
    return Promise.reject({ code: '404' })
  }

  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.preFetch) {
      return component.preFetch(store || {})
    }
  })).then(() => {
    context.initialState = store.state
    return app
  })
}
