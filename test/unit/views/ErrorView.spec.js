import Vue from 'vue'
import ErrorView from '@views/ErrorView.vue'

describe('ErrorView', () => {
    it('should display something about page not found', () => {
        const Constructor = Vue.extend(ErrorView)
        const ErrorViewComponent = new Constructor().$mount()

        expect(ErrorViewComponent.$el.querySelector('p').textContent)
            .toBe('404 | Page Not Found')
    })
})