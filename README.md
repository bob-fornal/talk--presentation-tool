# Talk: Presentation Tool

## Goals

This project was designed to provide a means of doing a presentation with code examples and execution as a part of the presentation.

- [x] Upgrade to Angular v18 and convert to `app.module.ts` pattern.

## Talks

- [x] A Look Inside Observables
- [x] Active Career Management
- [/] Asynchronous JavaScript: Livin' on a Prayer
- [x] Developer Tools for non-Developers
- [x] What to Avoid When Writing Unit Tests
- [x] Writing Testable Code

## To Do

- [x] Incorporate Monaco Editor.
- [x] Incorporate means of injecting JavaScript and being able to trigger via function call.
- [x] Include RxJS Tooling for Code Examples / CDN [](https://rxjs.dev/guide/importing#cdn).
- [/] Unit Tests.
- [x] GitHub Actions Pipeline.
- [x] BUG: Fix GitHub Page.
- [x] Angular Upgrade to 17, Standalone Components.
- [x] CSS Cleanup of Duplicate Patterns.
- [ ] Add Slide Transitions (for presentation)

### Editing Talk

- [ ] Incorporate a means of generating new talk.
- [x] Incorporate a means of editing a talk.
- [x] Incorporate a means of displaying a LIST of slides.
- [x] Edit Deck Title.
- [ ] Edit Deck Global CSS.
- [ ] Add means of Disabling Slide.
- [x] Edit Slide (Specific to Type).
- [x] Edit Slide (Code Editor).
- [ ] Edit Slide (Code Editor): Optional fields for Triggers.
- [x] Edit Slide (Code Editor): Simplify Save.
- [x] Code-Editor (add and remove) triggers.
- [ ] Add new Slide (before and after Slide).
- [ ] Reorder Slides (up and down).
- [ ] Delete Slide with Verification.
- [x] Add Speaker Notes to Slide Editor.
- [x] Split, indent, and Unsplit content (prettify code).
- [x] Save JSON result.

## Multiple Tabs

- [x] Broadcast Message Service(s) / Parent and Child
- [x] Add Speaker Notes to Deck (EDITING)

### Control Slide Deck

- [x] List of Pages (navigation on page name)
- [ ] Next, Previous (navigation without name).
- [x] Font Size (Zoom)
- [x] Determine and Trigger Functionality (code)

## Server

- [x] Sitemap Generator
- [ ] Make it dynamic / access `assets` data

## Pipeline

- [x] Adding PR Template
- [x] Adding Pipeline Checks to Merge to Main

## FUTURE USE-CASES

### Dynamic Loading of Slide Pages

Use Angular Portal to allow dynamic component loading?

```html
  <!-- Cannot write this in HTML by default; use Portal to inject it -->
  <alterate-cover [attr.data]="slide['data']"></alternate-cover>
```

JSON at TOP of `structure.json`. The "key" (`cover`) should be in the `ORDER` array:

```json
  "COMPONENTS": {
    "alternate-cover": {
      "location": "./assets/components/cover-01.js",
      "fallback": "NONE",
      "attribute": [
        { "data-attribute": "data", "use-key": "data" }
      ]
    }
  },
```

Slide data for `cover` could look like:

```json
"alternate-cover": {
  "data": {
    "title": "Active Career Management",
    "type": "cover",
    "author": "Bob Fornal",
    "text1": "...",
    "text2": "...",
  },
  "notes": "..."
}
```

### Investigate JaveScript Load on Code Editor Pages

```html
  <source [attr.src]="filepath" />
```

