
# CMU:SCS App
Main Application

[![Build Status](https://travis-ci.org/SchoolofComputerScience/scs-app.svg?branch=master)](https://travis-ci.org/SchoolofComputerScience/scs-app)

## Requirements
[Node.js 8.4.x](https://nodejs.org/en/)

## Getting Started

1. `cd scs-app`.

2. `npm install`

3. `npm run build`

4. Request the `.env` file

5. Optionally add `PORT=` with preferred port number, it defaults to 4000

6. `npm run start:prod`

7. Visit `http://localhost:4000` (or whatever port number you provided).

## Adding Content

### Adding simple markdown pages
1. Add Markdown file in: [scs-content/pages](https://github.com/SchoolofComputerScience/scs-content/tree/master/pages)

2. When that page is accepted into the repository add a new path to pages in [scs-app/content/static_db.js](https://github.com/SchoolofComputerScience/scs-app/blob/master/content/static_db.js)

### Adding new custom .vue pages
1. Add new .vue page in [scs-app/src/views](https://github.com/SchoolofComputerScience/scs-app/tree/master/src/views)

2. Import the 'view' and add new route entry in [scs-app\src\router\index.js](https://github.com/SchoolofComputerScience/scs-app/blob/master/src/router/index.js)

### @todo Adding Events

### @todo Adding News
