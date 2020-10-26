/*
 * STEP 1
 * Set `domain` to the website you want to screenshot, eg localhost:3000
 */
const domain = 'https://beta-getintoteaching.education.gov.uk/'

/*
 * STEP 2
 * Set `paths` to an array of named paths, for example:
 *
 * [
 *   { title: 'Index page', path: '/'},
 *   { title: 'Terms and conditions', path: '/terms-conditions'}
 * ]
 */
const paths = [
  { title: 'Homepage', path: '/'},
  { title: 'Funding Your Training', path: '/funding-your-training'},
  { title: 'Steps to become a teacher', path: '/steps-to-become-a-teacher'},
  { title: 'If you need to get the right qualification', path: '/if-you-need-to-get-the-right-qualifications'},
  { title: 'international candidates', path: '/international-candidates'},
  { title: 'Returning to teaching', path: '/returning-to-teaching'},
  { title: 'Teaching as a career', path: '/life-as-a-teacher'},
  { title: 'My Story into Teaching', path: '/life-as-a-teacher/my-story-into-teaching'},
  { title: 'Stories index page', path: '/life-as-a-teacher/my-story-into-teaching/career-changers'},
  { title: 'Individual story page', path: '/life-as-a-teacher/my-story-into-teaching/career-changers/swapping-senior-management-for-students'},
  { title: 'Salaries adn benefits', path: '/life-as-a-teacher/teachers-salaries-and-benefits'},
  { title: 'Events landing page', path: '/events'},
  { title: 'Events index page', path: '/events/category/train-to-teach-events'},
  { title: 'Individual event - Train to teach', path: '/events/train-to-teach-peterborough-online-event-41120'},
  { title: 'Event signup personal details', path: '/events/train-to-teach-peterborough-online-event-41120/apply'},
  { title: 'Event signup contact details', path: '/events/train-to-teach-peterborough-online-event-41120/apply/contact_details'},
  { title: 'Event signup further details', path: '/events/train-to-teach-peterborough-online-event-41120/apply/further_details'},
  { title: 'Event signup personalised updates', path: '/events/train-to-teach-peterborough-online-event-41120/apply/personalised_updates'},
  { title: 'Event signup completed', path: '/events/train-to-teach-peterborough-online-event-41120/apply/completed?subscribed=1'},
  { title: 'Individual event - Online events', path: '/events/secondary-teacher-training-options-0'},
  { title: 'Individual event - TSchool and uni events', path: '/events/201022-ljmu-get-into-teaching-online-event'},
  { title: 'Mailing list - personal details', path: '/mailinglist/signup'},
  { title: 'Mailing list - how close to applying?', path: '/mailinglist/signup/teacher_training'},
  { title: 'Mailing list - Subject', path: '/mailinglist/signup/subject'},
  { title: 'Mailing list - Postcode', path: '/mailinglist/signup/postcode'},
  { title: 'Mailing list - Contact details', path: '/mailinglist/signup/contact'},
  { title: 'Mailing list - Completed', path: '/mailinglist/signup/completed'}
]

/*
 * STEP 3
 * Run: node scripts/screenshot.js [name-of-directory], for example:
 *
 * node scripts/screenshot.js apply-for-teacher-training/name-of-directory
 */

// Dependencies
const { DateTime } = require('luxon')
const webshot = require('webshot-node')
const fs = require('fs')

// Arguments
const directoryName = process.argv.slice(-1)[0]
warnIfNoArguments()

const deepestDirectory = directoryName.split('/').pop()

var title = deepestDirectory.replace(/-/g, ' ')
title = title.charAt(0).toUpperCase() + title.slice(1)

const datestamp = DateTime.local().toFormat('yyyy-MM-dd')

const imageDirectory = `app/images/${directoryName}`
const postDirectory = `app/posts/${directoryName}`.replace('/' + deepestDirectory, '')

// Run
function start () {
  makeDirectories()
  decoratePaths()
  generatePage()
  takeScreenshots()
}

function warnIfNoArguments (title) {
  // TODO: Use a better check for an argument
  if (directoryName.startsWith('/Users')) {
    console.log('No arguments set')
    console.log('Please set a directory name: `node scripts/screenshot.js "name-of-directory"`')
  }
}

function makeDirectories () {
  if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory)
  }

  if (!fs.existsSync(postDirectory)) {
    fs.mkdirSync(postDirectory)
  }
}

function decoratePaths () {
  paths.forEach(function (item, index) {
    item.id = item.title.replace(/ +/g, '-').toLowerCase()
    item.file = `${imageDirectory}/${item.id}.png`
    item.src = item.file.replace('app/assets', '/public')
  })
}

function takeScreenshots () {
  // https://github.com/brenden/node-webshot
  const webshotOptions = {
    phantomConfig: {
      'ignore-ssl-errors': 'true'
    },
    windowSize: {
      width: 1200,
      height: 800
    },
    shotSize: {
      width: 'window',
      height: 'all'
    }
  }

  paths.forEach(function (item, index) {
    webshot(
      domain + item.path,
      item.file,
      webshotOptions,
      function () {
        console.error(`${domain + item.path} \n >> ${item.file}`)
      }
    )
  })
}

function generatePage () {
  var template = ''
  const templateStart = `---
title: ${title}
description:
date: ${datestamp}
---
{% from "screenshots/macro.njk" import appScreenshots with context %}
{{ appScreenshots({
  items: [`

  const templateEnd = `
  ]
}) }}
`

  paths.forEach(function (item, index) {
    template += `${index > 0 ? ', ' : ''}
    {
      text: "${item.title}"
    }`
  })

  const filename = `${postDirectory}/${datestamp}-${deepestDirectory}.md`

  fs.writeFile(
    filename,
    templateStart + template + templateEnd,
    function (err) {
      if (err) {
        console.error(err)
      }
      console.log(`Page generated: ${filename}`)
    }
  )
}

start()
