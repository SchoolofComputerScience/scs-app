import Vue from 'vue';
import EventsItem from '@components/EventsItem';
import VueRouter from 'vue-router';
import Router from "vue-router";
import TestHelper from "@test-utils/TestHelper";

describe('EventsItem', function () {
  'use strict'

  // test Routes for Router
  const sampleRoutes = {
    routes: [
      {path: '/events/:event?'},
    ]
  };

  const sampleEventData = {
    "uid": "hci-seminar",
    "talkTitle": "Human Behavior in a Cyber-world.",
    "type": "seminars",
    "title": "Human-Computer Interaction Seminar",
    "speakerName": "John Doe",
    "startDate": "2019-05-04T17:30:00+0000"
  };

  beforeEach(function () {
    this.mockRouter = new Router(sampleRoutes);
    this.eventsData = sampleEventData;
  });

  it('Should convert the time to [h:mm a] format', function () {
    Vue.use(VueRouter);
    const EventsItemComponent = TestHelper.mountComponent(EventsItem,{
      propsData: { data: this.eventsData},
      router: this.mockRouter }
      );

    expect(EventsItemComponent.timeFix(this.eventsData.startDate))
        .toBe('1:30 pm');
  });

  it('Should convert the date to [MMM D, YYYY] format', function () {
    Vue.use(VueRouter);
    const EventsItemComponent = TestHelper.mountComponent(EventsItem,{
      propsData: { data: this.eventsData},
      router: this.mockRouter }
    );

    expect(EventsItemComponent.dateFix(this.eventsData.startDate))
        .toBe('May 4, 2019');
  });

  it('Should properly display date and time', function () {
    Vue.use(VueRouter);
    const EventsItemComponent = TestHelper.mountComponent(EventsItem,{
      propsData: { data: this.eventsData},
      router: this.mockRouter }
    );

    expect(EventsItemComponent.$el.querySelector('p').textContent)
        .toBe('1:30 pm / May 4, 2019');
  });

  it('Should not display the date and time in the raw format', function () {
    Vue.use(VueRouter);
    const EventsItemComponent = TestHelper.mountComponent(EventsItem,{
      propsData: { data: this.eventsData},
      router: this.mockRouter }
    );

    expect(EventsItemComponent.$el.querySelector('p').textContent)
        .not.toEqual(this.eventsData.startDate);
  });

  it('Should properly create router link for events', function () {
    Vue.use(VueRouter);
    const EventsItemComponent = TestHelper.mountComponent(EventsItem,{
      propsData: { data: this.eventsData},
      router: this.mockRouter }
    );

    expect(EventsItemComponent.$el.querySelector('a ').getAttribute('href'))
        .toBe('#/events/hci-seminar');
  });
});