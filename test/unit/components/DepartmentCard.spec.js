import Vue from 'vue';
import DepartmentCard from '@components/DepartmentCard.vue';
import VueRouter from 'vue-router';
import Router from 'vue-router';

describe('DepartmentCard', function () {
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

  // Default Test Model Data
  const defaultTestData = {
    "uid": "abcbo",
    "name": "ABC Computational Science Department",
    "description": "ABC students use computational science to create the theory of everything.",
    "short_description": "ABC's computational science builds comprehensive models that address the fundamental of the multi-verse.",
    "mainimg": "https://abctest-5.jpg",
    "logo": "http://localhost/abc.com-logo-only.jpg",
    "url": "http://localhost/abccbo/",
    "course_count": {
      "_id": 55
    },
    "member_count": {
      "_id": 101
    },
    "programs_count": {
      "_id": 9
    },
    "news": [
      {
        "title": "ABC Will Welcome Largest First-Year Class This Fall",
        "date": "2017-06-28T04:00:00+0000",
        "uid": "abc-will-welcome-largest-first-year-class-fall",
        "image": "http://localhost/abccbo/test1.jpg"
      }
    ],
    "events": [
      {
        "uid": "abc-new-site-launch",
        "talkTitle": "",
        "type": "special events",
        "title": "2020 Website Launch",
        "speakerName": "John Doe",
        "startDate": "2020-05-05T04:06:00+0000"
      },
      {
        "uid": "abc-commencement-ceremony",
        "talkTitle": "Commencement",
        "type": "conferences / workshops",
        "title": "ABC Commencement: Graduation Ceremony",
        "speakerName": "Jill Doe",
        "startDate": "2017-05-21T19:30:00+0000"
      }
    ]
  };

  beforeEach(function () {
    this.department = defaultTestData;
    this.mockRouter = new Router(sampleRoutes);
  });

  it('Should render main Department router-link correctly', function () {
    let abcDepartment = Object.assign({}, this.department);
    abcDepartment.uid = "xyzbo";
    abcDepartment.name = "XYZ Computational Science Department";

    Vue.use(VueRouter);
    const Constructor = Vue.extend(DepartmentCard);
    const DepartmentCardComponent = new Constructor({
      propsData: {departmentData: abcDepartment},
      router: this.mockRouter
    }).$mount();

    expect(DepartmentCardComponent.$el.querySelector(".department-link h2").textContent)
        .toBe('XYZ Computational Science Department');

    expect(DepartmentCardComponent.$el.querySelector(".department-link").getAttribute('href'))
        .toBe('#/departments/xyzbo');

  });

  it('Should properly format the date and time of events', function () {
    const eventData = Object.assign({}, this.department);

    Vue.use(VueRouter);
    const Constructor = Vue.extend(DepartmentCard);
    const DepartmentCardComponent = new Constructor({
      propsData: {departmentData: eventData},
      router: this.mockRouter
    }).$mount();

    const currentEvents = DepartmentCardComponent.$el.querySelectorAll('.event-time-header');
    expect(currentEvents[0].textContent)
        .toBe('May 5th 2020, 12:06 am');

    expect(currentEvents[1].textContent)
        .toBe('May 21st 2017, 3:30 pm');
  });

  it('Should display a no events message when there are no events', function() {
    let departmentX = Object.assign({}, this.department);;
    departmentX.uid = "deptX";
    departmentX.name = "X Department";
    departmentX.description = "X department has no events";
    departmentX.events = [];

    Vue.use(VueRouter);
    const Constructor = Vue.extend(DepartmentCard);
    const DepartmentCardComponent = new Constructor({
      propsData: {departmentData: departmentX},
      router: this.mockRouter
    }).$mount();

    expect(DepartmentCardComponent.$el.querySelector('.events-card').textContent.toLowerCase())
        .toBe('no deptx events');
  });
});