const express = require('express')
const xmlbuilder = require('xmlbuilder');
const app = express();
const PORT = process.env.PORT || 3000;

// Define your application's routes
const routes = [
  '/',
  '/talk/a-look-inside-observables/cover-slide-01',
  '/talk/a-look-inside-observables/what-is-rxjs--slide',
  '/talk/a-look-inside-observables/history--slide',
  '/talk/a-look-inside-observables/essential-concepts--slide',
  '/talk/a-look-inside-observables/promises-versus-observables--slide',
  '/talk/a-look-inside-observables/subject--slide',
  '/talk/a-look-inside-observables/observable--code',
  '/talk/a-look-inside-observables/subject--code',
  '/talk/a-look-inside-observables/behavior-subject--code',
  '/talk/a-look-inside-observables/replay-subject--code',
  '/talk/a-look-inside-observables/sync-subject--code',
  '/talk/a-look-inside-observables/void-subject--code',
  '/talk/a-look-inside-observables/time-for-questions',

  '/talk/active-career-management/cover-slide-01',
  '/talk/active-career-management/history--slide',
  '/talk/active-career-management/career-levels--early-career',
  '/talk/active-career-management/career-levels--mid-career',
  '/talk/active-career-management/career-levels--late-career',
  '/talk/active-career-management/build-things--slide',
  '/talk/active-career-management/project--slide',
  '/talk/active-career-management/portfolio--slide',
  '/talk/active-career-management/resume-ats--slide',
  '/talk/active-career-management/linkedin--slide',
  '/talk/active-career-management/twitter-x--slide',
  '/talk/active-career-management/connections--slide',
  '/talk/active-career-management/interview-types--slide',
  '/talk/active-career-management/job-search--slide',
  '/talk/active-career-management/cold-calling--slide',
  '/talk/active-career-management/networking-01--slide',
  '/talk/active-career-management/networking-02--slide',
  '/talk/active-career-management/quickly-getting-job--slide',
  '/talk/active-career-management/time-for-questions',

  '/talk/asynchronous-javacript-living-on-a-prayer/cover-slide-01',
  '/talk/asynchronous-javacript-living-on-a-prayer/spoiler--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/definitions--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/javascript-engine-details--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/callback-hell--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/overview-001--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/overview-002--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/thought-exercise--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/non-asynchronous-code--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/network-code--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/promise-code--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/generator-throttle-code--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/user-interaction-code--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/event-listeners--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/web-workers--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/race-condition--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/set-timeout-timer--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/async-await--slide',
  '/talk/asynchronous-javacript-living-on-a-prayer/time-for-questions',

  '/talk/asynchronous-javascript-we-are-half-way-there/cover-slide-01',
  '/talk/asynchronous-javascript-we-are-half-way-there/asynchronous-patterns--slide',
  '/talk/asynchronous-javascript-we-are-half-way-there/callbacks--slide',
  '/talk/asynchronous-javascript-we-are-half-way-there/callbacks--code',
  '/talk/asynchronous-javascript-we-are-half-way-there/promise--slide',
  '/talk/asynchronous-javascript-we-are-half-way-there/promise--code',
  '/talk/asynchronous-javascript-we-are-half-way-there/pubsub--slide',
  '/talk/asynchronous-javascript-we-are-half-way-there/pubsub--code',
  '/talk/asynchronous-javascript-we-are-half-way-there/observable--slide',
  '/talk/asynchronous-javascript-we-are-half-way-there/observable--code',

  '/talk/developer-tools-for-non-developers/cover-slide-01',
  '/talk/developer-tools-for-non-developers/docking--slide',
  '/talk/developer-tools-for-non-developers/reading-error-messages--slide',
  '/talk/developer-tools-for-non-developers/xhr-versus-preflight--slide',
  '/talk/developer-tools-for-non-developers/copying-data-after-load--slide',
  '/talk/developer-tools-for-non-developers/size-and-frequency-of-data--slide',
  '/talk/developer-tools-for-non-developers/reading-compiled-code--breakpoints--slide',
  '/talk/developer-tools-for-non-developers/console-and-data-in-time--slide',
  '/talk/developer-tools-for-non-developers/storage--slide',
  '/talk/developer-tools-for-non-developers/devices--slide',
  '/talk/developer-tools-for-non-developers/targeting--slide',
  '/talk/developer-tools-for-non-developers/styles--slide',
  '/talk/developer-tools-for-non-developers/overrides--slide',
  '/talk/developer-tools-for-non-developers/time-for-questions',

  '/talk/what-to-avoid-when-writing-unit-tests--code/cover-slide-01',
  '/talk/what-to-avoid-when-writing-unit-tests--code/engineers-in-a-bar',
  '/talk/what-to-avoid-when-writing-unit-tests--code/what-are-unit-tests',
  '/talk/what-to-avoid-when-writing-unit-tests--code/talk-details',
  '/talk/what-to-avoid-when-writing-unit-tests--code/art-form',
  '/talk/what-to-avoid-when-writing-unit-tests--code/test-code-in-production',
  '/talk/what-to-avoid-when-writing-unit-tests--code/not--well-factored',
  '/talk/what-to-avoid-when-writing-unit-tests--code/in-the-test',
  '/talk/what-to-avoid-when-writing-unit-tests--code/dry-principle',
  '/talk/what-to-avoid-when-writing-unit-tests--code/poisoning-the-codebase--non-deterministic',
  '/talk/what-to-avoid-when-writing-unit-tests--code/non-deterministic',
  '/talk/what-to-avoid-when-writing-unit-tests--code/poisoning-the-codebase--side-effects',
  '/talk/what-to-avoid-when-writing-unit-tests--code/side-effects',
  '/talk/what-to-avoid-when-writing-unit-tests--code/testing-too-much--slide',
  '/talk/what-to-avoid-when-writing-unit-tests--code/testing-too-much--code',
  '/talk/what-to-avoid-when-writing-unit-tests--code/bad-test-double--slide',
  '/talk/what-to-avoid-when-writing-unit-tests--code/bad-test-double--code',
  '/talk/what-to-avoid-when-writing-unit-tests--code/false-positives--slide',
  '/talk/what-to-avoid-when-writing-unit-tests--code/false-positives--code',
  '/talk/what-to-avoid-when-writing-unit-tests--code/excessive-setup',
  '/talk/what-to-avoid-when-writing-unit-tests--code/testing-private-functionality-directly--slide',
  '/talk/what-to-avoid-when-writing-unit-tests--code/testing-private-functionality-directly--code',
  '/talk/what-to-avoid-when-writing-unit-tests--code/unit-test-recommendations',
  '/talk/what-to-avoid-when-writing-unit-tests--code/time-for-questions',

  '/talk/writing-testable-code/cover-slide-01',
  '/talk/writing-testable-code/context-slide',
  '/talk/writing-testable-code/constructor-does-real-work--warning-signs',
  '/talk/writing-testable-code/constructor-does-real-work--code-examples-001',
  '/talk/writing-testable-code/constructor-does-real-work--code-examples-002',
  '/talk/writing-testable-code/collaborator--warning-signs',
  '/talk/writing-testable-code/collaborator--code-examples-001',
  '/talk/writing-testable-code/collaborator--code-examples-002',
  '/talk/writing-testable-code/collaborator--code-examples-003',
  '/talk/writing-testable-code/brittle-global-state-and-singletons--warning-signs',
  '/talk/writing-testable-code/brittle-global-state-and-singletons--spooky-action',
  '/talk/writing-testable-code/brittle-global-state-and-singletons--code-examples-001',
  '/talk/writing-testable-code/brittle-global-state-and-singletons--ok',
  '/talk/writing-testable-code/class-does-too-much--warning-signs-001',
  '/talk/writing-testable-code/class-does-too-much--warning-signs-002',
  '/talk/writing-testable-code/class-does-too-much--warning-signs-003',
  '/talk/writing-testable-code/context-close-slide',
  '/talk/writing-testable-code/time-for-questions',
];

app.get('/sitemap.xml', (req, res) => {
  const root = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
  root.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  routes.forEach(route => {
    const url = root.ele('url');
    url.ele('loc', `https://www.bobs-tech-presentations.com/${route}`);
  });

  res.header('Content-Type', 'application/xml');
  res.send(root.end({ pretty: true }));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});