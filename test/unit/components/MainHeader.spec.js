import Vue from 'vue';
import MainHeader from "@components/MainHeader";
import TestHelper from "@test-utils/TestHelper";
import VueRouter from 'vue-router';
import Router from "vue-router";

describe('MainHeader', function () {
  'use strict';

  // test Routes for Router
  const sampleRoutes = {
    routes: [
      {path: '/'},
      {path: '/directory/'},
      {path: '/directory/department/:department'},
      {path: '/directory/:name?'},
      {path: '/courses/'},
      {path: '/courses/course/:course'},
      {path: '/courses/:semester'},
      {path: '/departments'},
      {path: '/departments/:department?'},
      {path: '/programs'},
      {path: '/programs/:program'},
      {path: '/publication/:pubid?'},
      {path: '/news/'},
      {path: '/events/'},
      {path: '/news/:article?'},
      {path: '/events/:event?'},
      {path: '/research/'},
      {path: '/research/:research_area'},
      {path: '/404'},
      {path: '/:page', name: 'page'},
    ]
  };


  beforeEach( function () {
    this.mockRouter = new Router(sampleRoutes);
  });

  it('Should initialize mobileMenu flag to false', function () {
    Vue.use(VueRouter);
    const mainHeaderComponent = TestHelper.mountComponent(MainHeader, {
      router: this.mockRouter
    });

    expect(mainHeaderComponent.mobileMenu)
        .toBe(false);
  });

  it('Should toggle the mobileMenu flag when menuButton has been clicked', function () {
    Vue.use(VueRouter);
    const mainHeaderComponent = TestHelper.mountComponent(MainHeader, {
      router: this.mockRouter
    });

    const menuButton = mainHeaderComponent.$el.querySelector('button[type="button"]');

    menuButton.click();
    expect(mainHeaderComponent.mobileMenu)
        .toBe(true);

    menuButton.click();
    expect(mainHeaderComponent.mobileMenu)
        .toBe(false);
  });


});