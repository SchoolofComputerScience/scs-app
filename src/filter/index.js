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

export function departmentTranslate (depId) {
  let departmentMap = new Map([
    [ 'CB', 'Computational Biology Department' ],
    [ 'HCI', 'Human-Computer Interaction Institute' ],
    [ 'ISR', 'Institute for Software Research' ],
    [ 'MLG', 'Machine Learning Department' ],
    [ 'LTI', 'Language Technologies Institute' ],
    [ 'CS', 'Computer Science Department' ],
    [ 'ROB', 'The Robotics Institute' ],
    [ 'SE', 'Software Engineering' ],
    [ 'ETC', 'Entertainment Technology Center' ],
    [ 'compbio', 'Computational Biology Department' ],
    [ 'hcii', 'Human-Computer Interaction Institute' ],
    [ 'isr', 'Institute for Software Research' ],
    [ 'mld', 'Machine Learning Department' ],
    [ 'lti', 'Language Technologies Institute' ],
    [ 'csd', 'Computer Science Department' ],
    [ 'ri', 'The Robotics Institute' ],
    [ 'etc', 'Entertainment Technology Center' ]
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
