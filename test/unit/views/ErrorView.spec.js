import Vue from 'vue';
import ErrorView from '@views/ErrorView.vue';

describe('ErrorView', () => {
    it('Should display something about page not found', () => {
        const Constructor = Vue.extend(ErrorView);
        const ErrorViewComponent = new Constructor().$mount();

        expect(ErrorViewComponent.$el.querySelector('p').textContent.toLowerCase())
            .toContain('page not found');
    });
});