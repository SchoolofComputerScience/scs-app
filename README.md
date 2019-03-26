
# CMU:SCS App
Welcome to the Universal Web Application for the School Of Computer Science (cs.cmu.edu).

[![Build Status](https://travis-ci.org/SchoolofComputerScience/scs-app.svg?branch=master)](https://travis-ci.org/SchoolofComputerScience/scs-app)

## Requirements
[Node.js 8.4.x](https://nodejs.org/en/)

## Getting Started

1. `cd scs-app`.

2. `npm install`

3. `npm run build`

4. Request the `.env` file from a member of the Web2020 Team

5. Optionally add `PORT=` with preferred port number, it defaults to 4000

6. `npm run start:prod`

7. Visit `http://localhost:4000` (or whatever port number you provided).

8. Use Chrome Dev Tools and Vue.js Dev Tools Extension (https://github.com/vuejs/vue-devtools)

## Technologies Used In This Repo
1. Node (https://nodejs.org/)

2. Express (https://expressjs.com/)

3. Vue and Vuex (https://vuejs.org/)

4. GraphQL (https://graphql.org/)

5. Apollo (https://www.apollographql.com/)

6. Karma (https://karma-runner.github.io/)

7. Pug (https://pugjs.org)

8. Webpack (https://webpack.js.org/)

## Hosting
Google Cloud Platform - App Flex - modify https://github.com/SchoolofComputerScience/scs-app/blob/master/app.yaml to configure service when deploying to GCP.

## Deployment
Travis (https://travis-ci.org/) is used to deploy straight to Google Cloud Platform after a Pull Request is accepted and merged.

## Repository Structure
1. https://github.com/SchoolofComputerScience/scs-app/tree/master/src/views - All main pages of the application. Responsible for getting all data into the Vuex store for the components used on its respectable page.
   
2. https://github.com/SchoolofComputerScience/scs-app/tree/master/src/components - All the reusable components that are used on the Views. Because this is a Universal Web Application, the components are not responsible for hydrating the store, the Views are.

3. https://github.com/SchoolofComputerScience/scs-app/tree/master/src/store/module - Modules used to make GraphQL queries (via Apollo) to hydrate the Vuex store
   
4. https://github.com/SchoolofComputerScience/scs-app/blob/master/src/filter/index.js - Filters functions that are used to manipulate strings in components and views (https://vuejs.org/v2/guide/filters.html)


