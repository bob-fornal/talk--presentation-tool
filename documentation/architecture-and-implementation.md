# Presentation Tool - Architecture and Implementation

## Overview

The Presentation Tool is an Angular-based web application designed for creating, managing, and delivering technical presentations. It provides a comprehensive platform for displaying slides, managing content, controlling presentations remotely, and tracking audience polling.

**Technology Stack:**
- **Framework:** Angular (with standalone components and modules)
- **Styling:** SCSS, Angular Material
- **Code Display:** Monaco Editor (`ngx-monaco-editor-v2`)
- **QR Codes:** `ng-qrcode`
- **Real-time Communication:** WebSockets
- **HTTP Client:** Angular HttpClient with fetch API

---

## Project Structure

### High-Level Directory Organization

```
src/
├── app/
│   ├── core/                  # Core business logic and services
│   │   ├── constants/         # Static configuration (slide type icons)
│   │   ├── enums/            # Enumerations (font sizes)
│   │   ├── interfaces/       # TypeScript interfaces for type safety
│   │   └── services/         # Core services (8 services)
│   ├── demos/                # Standalone demo components
│   ├── features/             # Feature modules (biography, conference, etc.)
│   ├── pages/                # Route-level page components
│   │   ├── control-panel/    # Remote presentation control
│   │   ├── courses/          # Presentation listing/selection
│   │   ├── edit/             # Presentation editor
│   │   ├── events/           # Event management
│   │   ├── polling/          # Audience polling interface
│   │   ├── print-deck/       # Print-friendly presentation view
│   │   └── talk/             # Presentation display
│   ├── shared/               # Shared components (edit buttons, dialogs)
│   └── slides/               # Slide type components (13 types)
│       ├── abstract.slide.ts # Base slide component
│       ├── code-editor/      # Code display slide
│       ├── cover-01/         # Cover slide variant 1
│       ├── image-double/     # Dual-image layout
│       ├── panel-single/     # Single-panel text
│       └── ...
├── index.html
├── main.ts
└── styles.scss

public/assets/
├── talks/
│   ├── talks.json            # Master list of all presentations
│   ├── GLOBAL/
│   │   ├── slides.json       # Reusable global slide definitions
│   │   └── configuration.json # Template configurations
│   └── [talk-folder]/
│       ├── structure.json    # Presentation structure & content
│       ├── code-*/           # Code snippets for code-editor slides
│       └── [other assets]
├── images/                   # Presentation images
├── fonts/                    # Custom fonts
└── events/                   # Event/conference data (JSON)
```

---

## Core Architecture

### 1. **Application Routing**

The application uses Angular Router with the following main routes:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `CoursesComponent` | Landing page, presentation catalog |
| `/talk/:folder/:template/:slideKey` | `TalkComponent` | Display presentation slides |
| `/edit/:folder` | `EditComponent` | Edit entire presentation |
| `/edit/:folder/:slideKey` | `EditComponent` | Edit specific slide |
| `/control-panel/:folder/:slideKey` | `ControlPanelComponent` | Remote control interface |
| `/polling/:folder/:slideKey` | `PollingComponent` | Audience polling |
| `/print-deck/:folder` | `PrintDeckComponent` | Print-optimized view |
| `/events` | `EventsComponent` | Event listing |
| `/courses` | `CoursesComponent` | Presentation selection |

**Route Parameters:**
- `folder`: Directory name in `public/assets/talks/`
- `template`: Visual theme/template name
- `slideKey`: Unique identifier for a specific slide

---

### 2. **Core Services**

#### **CodeService** (`code.service.ts`)
**Responsibilities:**
- Load and manage presentation data (talks.json, structure.json)
- Fetch code snippets from file system
- Load web components dynamically
- Manage global slide templates

**Key Methods:**
```typescript
init(): Promise<void>                    // Load talks.json and templates
getStructure(folder: string): Promise<any>  // Load presentation structure
getCode(filepath: string): Promise<string>  // Fetch code files
loadScript(script: WebComponent): Promise<any> // Dynamic component loading
```

**BehaviorSubjects:**
- `talks`: Master list of all presentations
- `structure`: Current presentation structure
- `templates`: Available visual templates

#### **BroadcastService** (`broadcast-service.service.ts`)
**Responsibilities:**
- Internal message bus for component communication
- Coordinate slide navigation, control panel updates
- Enable remote presentation control

**Pattern:** Pub/Sub with typed message filtering

#### **WebSocketService** (`web-socket-service.service.ts`)
**Responsibilities:**
- Real-time bidirectional communication
- Remote control synchronization
- Polling data transmission

#### **StyleService** (`style.service.ts`)
**Responsibilities:**
- Dynamic CSS injection
- Template-specific styling
- Theme switching

#### **FontsizeService** (`fontsize.service.ts`)
**Responsibilities:**
- Manage font size preferences
- Accessibility adjustments

#### **SlideInformationService** (`slide-information.service.ts`)
**Responsibilities:**
- Track slide metadata
- Navigation state management

---

### 3. **Data Model**

#### **Talks Data Structure** (`talks.json`)

```typescript
interface Talks {
  STYLE: string[];              // Global CSS rules
  TAGS: Array<Tag>;             // Categorization tags
  TALKS: Array<Talk>;           // List of presentations
}

interface Talk {
  folder: string;               // Directory name
  title: string;                // Presentation title
  tags: string[];               // Associated tags
  highlight?: boolean;          // Featured talk
  pdf?: string;                 // PDF download link
  pdfActive?: boolean;          // PDF availability
}

interface Tag {
  tag: string;                  // Tag identifier
  title: string;                // Display name
}
```

#### **Presentation Structure** (`structure.json`)

```typescript
interface Structure {
  ORDER: string[];              // Slide sequence
  STYLE: string[];              // Presentation-specific CSS
  [slideKey: string]: StructureType | OrderType | StyleType;
}

interface StructureType {
  title: string;                // Slide title
  type: string;                 // Component type (e.g., 'panel-single')
  
  // Content fields (vary by slide type)
  text1?: string;
  text2?: string;
  text3?: string;
  html?: string;
  panel?: string;
  
  // Images
  image?: string;
  imageClass?: string;
  image1?: string;
  image2?: string;
  
  // Code editor
  folder?: string;              // Code snippet folder
  files?: string[];             // Code files to display
  
  // Author/Biography
  author?: string;
  bio1?: string;
  bio2?: string;
  
  // Metadata
  notes?: string;               // Presenter notes
  script?: string;              // Presentation script
  visibility?: boolean;         // Show/hide slide
  pdfInclude?: string[];        // PDF export settings
  triggers?: Trigger[];         // Interactive triggers
  environment_keys?: string[];  // Environment variables
  
  // Polling
  tag?: string;
  location?: string;
  data?: any;
  
  // Table data
  orientation?: string;
  table?: string[][];
}
```

#### **Global Slides** (`GLOBAL/slides.json`)

Reusable slide definitions referenced via `type: "GLOBAL/slide-name"`. These are merged into the presentation structure at runtime.

**Example:**
```json
{
  "edje-about": {
    "title": "",
    "type": "image-only",
    "background": "transparent",
    "image": "./assets/images/--edje-about.webp",
    "imageClass": "width-100-percent",
    "notes": "Company information..."
  }
}
```

#### **Templates** (`GLOBAL/configuration.json`)

Visual theme configurations with CSS adjustments:

```typescript
interface TemplateType {
  title: string;
  key: string;
  ADJUSTMENT: string[];         // CSS property overrides
  STYLE?: string[];             // Additional CSS rules
}
```

---

### 4. **Slide Component System**

#### **Abstract Base Class** (`abstract.slide.ts`)

All slide components extend `AbstractSlide`:

```typescript
@Directive()
export abstract class AbstractSlide implements OnDestroy {
  @Input() notes: string = '';
  @Input() editing: boolean = false;
  @Output() save: EventEmitter<any> = new EventEmitter();
  
  toggleView: boolean = false;
  
  setView(state: boolean): void { }
  saveEvent(): void { }         // Persist edits
  openNotesEditor(): void { }   // Edit presenter notes
}
```

#### **Slide Component Types**

1. **Cover Slides**
   - `cover-01`: Standard title/author/bio layout
   - `cover-image-wrap`: Title with wrapped image

2. **Content Slides**
   - `panel-single`: Single column text
   - `panel-double`: Two-column layout
   - `panel-triple`: Three-column layout
   - `panel-single-table`: Single column with table data

3. **Image Slides**
   - `image-only`: Full-screen image
   - `image-text`: Image with text overlay
   - `image-double`: Side-by-side images

4. **Code Slides**
   - `code-editor`: Monaco editor with multi-file support
   - `ce-display`: Read-only code display
   - `ce-editor`: Editable code view

5. **Interactive Slides**
   - `track-polling`: Audience polling interface

#### **Dynamic Component Loading**

Slide types are dynamically selected based on the `type` field in `structure.json`:

```typescript
// In TalkComponent
const page: StructureType = structure[slideKey];
const slideType = page.type;  // e.g., 'panel-double'

// Angular dynamically renders the corresponding component
<app-panel-double *ngIf="type === 'panel-double'" ...>
```

---

### 5. **Navigation & Control Flow**

#### **Slide Navigation**

**TalkComponent** manages navigation:

```typescript
// Keyboard shortcuts
ArrowRight, ArrowUp   → next()
ArrowLeft, ArrowDown  → previous()

next(): void {
  this.slideIndex++;
  this.updateSlide();
}

previous(): void {
  this.slideIndex--;
  this.updateSlide();
}
```

#### **Remote Control**

**ControlPanelComponent** sends broadcast messages:

```typescript
this.service.send({
  type: 'control',
  action: 'navigate',
  slideKey: 'next-slide-key'
});
```

**TalkComponent** listens for messages:

```typescript
this.service.messagesOfType('control').subscribe(msg => {
  if (msg.action === 'navigate') {
    this.navigateToSlide(msg.slideKey);
  }
});
```

#### **WebSocket Synchronization**

For multi-device control:

```typescript
// Controller sends
this.socketService.send({
  type: 'slide-change',
  folder: 'talk-name',
  slideKey: 'slide-05'
});

// Display receives
this.socketService.messages.subscribe(msg => {
  if (msg.type === 'slide-change') {
    this.navigateToSlide(msg.slideKey);
  }
});
```

---

### 6. **Edit Mode**

**EditComponent** provides WYSIWYG editing:

1. **Structure View**: Reorder slides, add/remove slides
2. **Content Editing**: Inline editing of slide properties
3. **Notes Editor**: Markdown editor for presenter notes
4. **Preview**: Live preview of changes

**Data Flow:**
```
User Edit → Component @Output → EditComponent
         → Update structure object → Save to structure.json
```

**Persistence:**
Currently saves to local `structure.json` via HTTP POST (requires backend endpoint).

---

### 7. **Print/Export**

**PrintDeckComponent** generates printer-friendly output:

- Renders all slides sequentially
- Applies `pdfInclude` filters
- Uses print-optimized CSS

**Usage:**
```
/print-deck/talk-folder
```

Browser print dialog can then export to PDF.

---

## Data Loading Lifecycle

### Initial Load
1. **App Initialization** (`main.ts`): Bootstrap Angular
2. **CodeService.init()**: Load `talks.json` and `configuration.json`
3. **CoursesComponent**: Display talk catalog from `talks` BehaviorSubject

### Presentation Load
1. **Navigate to** `/talk/folder/template/slideKey`
2. **TalkComponent.init()**:
   - Extract `folder` from route params
   - Call `CodeService.getStructure(folder)`
3. **CodeService.getStructure()**:
   - Fetch `./assets/talks/{folder}/structure.json`
   - Fetch `./assets/talks/GLOBAL/slides.json`
   - Merge global slides referenced as `type: "GLOBAL/..."`
   - Filter slides by `visibility` property
   - Emit merged structure to `structure` BehaviorSubject
4. **TalkComponent**: Subscribe to structure updates, render slide

### Slide Navigation
1. **User Input**: Arrow key or control panel click
2. **Update `slideIndex`**
3. **Extract `slideKey`** from `structure.ORDER[slideIndex]`
4. **Update URL**: `/talk/folder/template/{newSlideKey}`
5. **Render Component**: Angular change detection updates view

### Code Snippet Load
1. **Slide Type**: `code-editor`
2. **CodeEditorComponent.ngOnInit()**:
   - Extract `folder` and `files` from slide data
   - Call `CodeService.getCode()` for each file
3. **CodeService.getCode(filepath)**:
   - Fetch file via HTTP (e.g., `./assets/talks/talk-name/code-001/example.ts`)
   - Return text content
4. **Monaco Editor**: Display code with syntax highlighting

---

## Styling System

### Hierarchy
1. **Global Styles** (`styles.scss`): Base layout, resets
2. **Presentation Styles** (`talks.json` → `STYLE`): Applied to all talks
3. **Template Styles** (`configuration.json`): Theme-specific overrides
4. **Talk Styles** (`structure.json` → `STYLE`): Per-presentation customization
5. **Slide Component Styles** (e.g., `panel-single.component.scss`): Component-scoped

### Dynamic Injection

**StyleService** injects CSS at runtime:

```typescript
injectStyle(css: string[]): void {
  const styleEl = document.createElement('style');
  styleEl.textContent = css.join('\n');
  document.head.appendChild(styleEl);
}
```

**Order of Injection:**
1. Global styles (loaded at app start)
2. Presentation styles (when structure loads)
3. Template styles (when template applied)

---

## Special Features

### 1. **Audience Polling**

**Workflow:**
1. Presenter displays polling slide (`track-polling` component)
2. Audience scans QR code → `/polling/folder/slideKey`
3. **PollingComponent** displays question and answer options
4. Audience submits response → WebSocket message
5. **TrackPollingComponent** receives responses, updates live chart

**Data Structure:**
```typescript
interface PollingData {
  question: string;
  options: string[];
  responses: { [option: string]: number };
}
```

### 2. **Code Editor**

**Features:**
- Multi-file tabbed interface
- Syntax highlighting via Monaco Editor
- Read-only display mode
- Editable mode (for demos)
- Language detection from file extension

**Configuration:**
```json
{
  "type": "code-editor",
  "folder": "code-001",
  "files": ["example.ts", "config.json", "styles.css"]
}
```

### 3. **Web Component Integration**

Custom web components can be embedded:

```json
{
  "type": "custom",
  "tag": "my-component",
  "location": "./assets/slide-components/my-component.js",
  "data": { "prop1": "value1" }
}
```

**CodeService** dynamically loads the script and instantiates the component.

### 4. **Template Switching**

Change visual theme without modifying content:

- `/talk/folder/DEFAULT/slideKey` - Dark theme
- `/talk/folder/light/slideKey` - Light theme

Templates adjust colors, backgrounds, and layout via CSS overrides.

---

## Testing Architecture

### Unit Tests
- **Services**: Mock HTTP calls, test data transformations
- **Components**: Test user interactions, data binding
- **Utilities**: Test helper functions

### Test Utilities (`_spec/`)
- Mock components (e.g., `MockCodeService`)
- Mock services (e.g., `MockActivatedRoute`)
- Shared test data

### Coverage
Located at: `coverage/talk--presentation-tool/`

---

## Deployment Considerations

### Build Process
```bash
ng build --configuration production
```

**Output:** `dist/` directory with:
- Compiled JavaScript bundles
- Optimized assets
- `index.html`

### Static Hosting
Application requires static file hosting with:
- JSON file access (`assets/talks/**/*.json`)
- Image serving (`assets/images/**`)
- Client-side routing support (redirect all routes to `index.html`)

### Backend Requirements
**Optional:**
- WebSocket server for real-time control
- API endpoint for saving edits (currently not implemented)

### Environment Configuration
No environment variables currently used. API endpoints hardcoded in services.

---

## Key Dependencies

```json
{
  "angular": "^18.x",
  "rxjs": "^7.x",
  "ngx-monaco-editor-v2": "^18.x",
  "ng-qrcode": "^18.x",
  "@angular/material": "^18.x"
}
```

---

## Extensibility

### Adding New Slide Types

1. **Create Component**: Extend `AbstractSlide`
2. **Register in Module**: Add to `declarations` in `app.module.ts`
3. **Add to Template**: Add `*ngIf` condition in `talk.component.html`
4. **Define Structure**: Use new type in `structure.json`

### Adding New Presentations

1. **Create Folder**: `public/assets/talks/my-new-talk/`
2. **Create Structure**: `structure.json` with ORDER, STYLE, and slide definitions
3. **Register Talk**: Add entry to `talks.json`

### Custom Templates

1. **Add Entry**: Create template definition in `GLOBAL/configuration.json`
2. **Define Styles**: Set ADJUSTMENT and STYLE arrays
3. **Use Template**: Navigate to `/talk/folder/template-key/slideKey`

---

## Performance Considerations

### Current Implementation
- **Eager Loading**: All slides loaded at once
- **No Code Splitting**: Entire app bundle loaded upfront
- **Image Optimization**: None (images loaded as-is)
- **Caching**: Browser HTTP cache only

### Potential Improvements
- Lazy load slide components by route
- Progressive image loading
- Service worker for offline capability
- Pre-render common presentations

---

## Known Patterns & Conventions

1. **File Naming**: Kebab-case for files, PascalCase for classes
2. **Component Selectors**: `app-*` prefix
3. **Service Injection**: Constructor-based DI
4. **Observables**: RxJS BehaviorSubjects for state management
5. **CSS Scoping**: Component-scoped SCSS with global overrides
6. **Data Binding**: One-way data flow with event emitters
7. **Type Safety**: Comprehensive TypeScript interfaces

---

## Conclusion

This presentation tool is a well-structured Angular application with a clear separation of concerns:

- **Core services** handle data loading and coordination
- **Page components** manage routing and high-level UI
- **Slide components** encapsulate presentation content
- **JSON data files** provide content flexibility without code changes

The architecture supports extensibility through:
- Component inheritance (`AbstractSlide`)
- Dynamic component loading
- Configurable templates
- Global slide library

The main coupling point is the heavy reliance on JSON structure files, which is addressed in the migration plan document.
