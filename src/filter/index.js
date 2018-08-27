import Vue from 'vue'

export function yearSlice (year) {
  return year.slice(-2)
}

export function seasonTranslate (seasonId) {
  let seasonMap = new Map([
    [ 'S', 'Spring' ],
    [ 'M', 'Summer' ],
    [ 'F', 'Fall' ]
  ])
  let month = seasonId.substr(seasonId, 1)
  let year = '20' + seasonId.slice(-2)

  return `${seasonMap.get(month)} ${year}`
}

export function tlc(str) {
  return str.toLowerCase()
}

export function upc(str) {
  return str.toUpperCase()
}

export function collegeTranslate (colId) {
  colId = colId ? colId.toLowerCase() : colId
  let collegeMap = new Map([
    [ 'scs', 'School of Computer Science' ]
  ])
  return collegeMap.get(colId) || colId
}

export function courseLocationTranslate (locId) {
  locId = locId ? locId.toLowerCase() : locId
  let courseLocMap = new Map([
    [ 'pit', 'Pittsburgh, Pennsylvania' ],
    [ 'doh', 'Doha, Qatar' ]
  ])
  return courseLocMap.get(locId) || locId
}
export function courseLevelTranslate (levelId) {
  levelId = levelId ? levelId.toLowerCase() : levelId
  let courseLevelMap = new Map([
    [ 'g', 'Graduate' ],
    [ 'u', 'Undergraduate' ],
  ])
  return courseLevelMap.get(levelId) || levelId
}

export function departmentTranslate (depId) {
  depId = depId ? depId.toLowerCase() : depId
  let departmentMap = new Map([
    [ 'cb', 'Computational Biology Department' ],
    [ 'hci', 'Human-Computer Interaction Institute' ],
    [ 'isr', 'Institute for Software Research' ],
    [ 'mlg', 'Machine Learning Department' ],
    [ 'lti', 'Language Technologies Institute' ],
    [ 'cs', 'Computer Science Department' ],
    [ 'rob', 'The Robotics Institute' ],
    [ 'etc', 'Entertainment Technology Center' ],
    [ 'se', 'Software Engineering' ],
    [ 'scs', 'School Of Computer Science' ]
  ])
  return departmentMap.get(depId) || depId
}

export function buildingTranslate (buildingCode) {
  let buildingMap = new Map([
    ['BH', 'Baker Hall'],
    ['CFA', 'College of Fine Arts'],
    ['CIC', 'Collaborative Innovation Center'],
    ['CYH', 'Cyert Hall'],
    ['DH', 'Doherty Hall'],
    ['EDS ', 'Elliot Dunlap Smith Hall'],
    ['GES', 'Gesling Stadium'],
    ['GHC', 'Gates and Hillman Centers'],
    ['GYM', 'Weigand Gymnasium'],
    ['HBH', 'Hamburg Hall'],
    ['HH', 'Hamerschlag Hall'],
    ['HL', 'Hunt Library'],
    ['IA', 'GSIA'],
    ['MI', 'Mellon Institute'],
    ['MM', 'Margaret Morrison Carnegie Hall'],
    ['NSH', 'Newell-Simon Hall'],
    ['OFF', 'Off Campus'],
    ['PCA', 'Purnell Center for the Arts'],
    ['POS', 'Posner Hall'],
    ['PH', 'Porter Hall'],
    ['PTC', 'Pittsburgh Technology Center'],
    ['REH', 'Roberts Engineering Hall'],
    ['SEI', 'Software Engineering Institute'],
    ['SH', 'Scaife Hall'],
    ['CUC', 'Cohon University Center'],
    ['WH', 'Warner Hall'],
    ['WEH', 'Wean Hall'],
    ['DNM', 'Does Not Meet'],
    ['3SC', '3SC - 300 South Craig Street'],
    ['4SC', '4SC - 407 South Craig Street']
  ])

  return buildingMap.get(buildingCode) || buildingCode
}

export function dayTranslate (dayCode) {

  if (dayCode === "TBA") return dayCode

  let daySplit = dayCode.split('')

  let dayMap = new Map([
    ['M', 'Monday'],
    ['T', 'Tuesday'],
    ['W', 'Wednesday'],
    ['R', 'Thursday'],
    ['F', 'Friday'],
    ['S', 'Saturday'],
    ['U', 'Sunday']
  ])

  let dayTranslate = []

  for (let day of daySplit) {
    dayTranslate.push(dayMap.get(day))
  }

  return dayTranslate.join(', ') || dayCode
}

/**
 * Sorts an array of our data objects by a date. Data must be an array.
 * dataField is the name of the object property to sort by.
 * Default order is ascending. Setting ascendingOrder to false will sort descending.
 *
 * @param data
 * @param dateField
 * @param ascendingOrder
 * @returns {*|Array}
 */
export function sortDataByDate (data, dateField, ascendingOrder=true){
  let results = [];

  if(ascendingOrder){
    results = data.sort(function compareDates(date1, date2){
      const dateA = new Date(date1[dateField]);
      const dateB = new Date(date2[dateField]);

      return dateA - dateB;
    });
  } else {
    results = data.sort(function compareDates(date1, date2){
      const dateA = new Date(date1[dateField]);
      const dateB = new Date(date2[dateField]);

      return dateB - dateA;
    });
  }

  return results;
}

export const SCS_EVENT_COLORS = new Map([
  [ 'Special Events', '#C60' ],
  [ 'Seminars', '#603' ],
  [ 'Thesis Orals', '#224433' ],
  [ 'Speaking Skills', '#006600' ],
  //todo: get actual color for conferences and workshops.
  [ 'Conferences,Workshop', '#c41230' ],
  [ 'Talks', '#993300' ],
  [ 'Lecture', '#669966' ],
  [ 'Career Presentation', '#009999' ],
  [ 'Fun', '#000066' ],
  [ 'Introductory Course,Orientation', '#cc0000'],
  [ 'Project Presentations', '#099' ],
  [ 'Alumni Event', '#999' ],
  [ 'Distinguished Lecture Series', '#C00' ]
]);

