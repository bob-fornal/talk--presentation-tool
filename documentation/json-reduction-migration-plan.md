# JSON Reduction & Remote/Local File Support - Migration Plan

## Executive Summary

**Current State:**
The presentation tool relies on large, monolithic JSON files (`structure.json`, `talks.json`) that contain all presentation content, making presentations tightly coupled to the deployment.

**Target State:**
A flexible system that can:
- Load presentation definitions from local or remote sources
- Support multiple file formats (JSON, Markdown, YAML)
- Reference images locally or remotely
- Work as a deployed website (remote files) or local application (local files)
- Reduce JSON file sizes by extracting content into separate files

**Benefits:**
- Smaller payload sizes
- Better maintainability
- Separation of content from structure
- Portable presentations
- CDN-friendly architecture
- Version control friendly (smaller, focused files)

---

## Problem Analysis

### Current Issues with JSON-Heavy Architecture

#### 1. **Large File Sizes**
```
structure.json files: 50KB - 500KB+
- Embedded HTML strings
- Inline CSS
- Base64 encoded data
- Repetitive content
```

#### 2. **Deployment Coupling**
- All presentations must be bundled with application
- Cannot share presentations across installations
- Difficult to maintain presentation versions

#### 3. **Content Management Challenges**
- HTML embedded in JSON strings (escaping issues)
- Version control shows entire file changed for small edits
- No content reusability across presentations
- Difficult to preview changes

#### 4. **Image Management**
- Images hardcoded to specific paths
- No support for remote images
- CDN optimization difficult
- No lazy loading support

#### 5. **Collaboration Friction**
- Single large file = merge conflicts
- Cannot edit individual slides independently
- No slide library sharing

---

## Target Architecture

### High-Level Design

```
Presentation Definition (manifest.json)
├── Metadata (title, author, tags)
├── Configuration (template, styles)
└── Slide References
    ├── Slide 1 → content/slide-001.md
    ├── Slide 2 → content/slide-002.yaml
    ├── Slide 3 → https://cdn.example.com/slides/shared-slide.json
    └── ...

Content Files
├── slide-001.md          (Markdown with frontmatter)
├── slide-002.yaml        (YAML structure)
├── slide-003.json        (Legacy JSON format)
├── images/
│   ├── diagram.png       (Local image)
│   └── photo.jpg
└── code/
    ├── example-01.ts
    └── example-02.css

Images (local or remote)
├── ./images/local.png
├── https://cdn.example.com/talks/talk-01/image.png
└── https://unsplash.com/photos/xyz.jpg
```

### File Format Support

#### 1. **Manifest File** (`manifest.json` or `manifest.yaml`)

**Purpose:** Lightweight presentation index

```json
{
  "version": "2.0",
  "metadata": {
    "title": "My Presentation",
    "author": "Bob Fornal",
    "date": "2026-05-07",
    "tags": ["typescript", "testing"],
    "description": "A talk about testing strategies"
  },
  "configuration": {
    "template": "light",
    "baseUrl": "./",
    "remoteBaseUrl": "https://cdn.example.com/talks/my-talk/",
    "fallbackLocal": true
  },
  "slides": [
    { "id": "cover", "source": "content/cover.md" },
    { "id": "intro", "source": "content/intro.yaml" },
    { "id": "demo", "source": "https://shared.talks.com/demo-slide.json" },
    { "id": "conclusion", "source": "content/conclusion.md" }
  ],
  "styles": "styles.css",
  "globalSlides": [
    "https://global.talks.com/edje-about.json"
  ]
}
```

**Size Reduction:** ~2KB vs 50-500KB structure.json

#### 2. **Markdown Slides** (`.md`)

**Purpose:** Human-readable content authoring

```markdown
---
type: panel-double
title: Why Testing Matters
visibility: true
notes: |
  Emphasize the business value of testing.
  Share real-world examples.
---

## Left Column

Testing improves:
- Code quality
- Developer confidence
- Refactoring safety

## Right Column

![Testing Pyramid](./images/pyramid.png)

**Key Insight:** Write tests first!
```

**Advantages:**
- Git-friendly diffs
- Standard Markdown editors
- Frontmatter for metadata
- Preview-friendly

#### 3. **YAML Slides** (`.yaml`)

**Purpose:** Structured data with less verbosity than JSON

```yaml
type: code-editor
title: Example Implementation
folder: code-001
files:
  - example.ts
  - config.json
notes: |
  Walk through the code line by line.
  Point out the error handling.
visibility: true
pdfInclude:
  - example.ts
```

**Advantages:**
- More readable than JSON
- Native multi-line string support
- Comments allowed
- Less syntax noise

#### 4. **JSON Slides** (`.json`)

**Purpose:** Backward compatibility, programmatic generation

```json
{
  "type": "panel-single",
  "title": "Key Concepts",
  "text1": "<ul><li>Point 1</li><li>Point 2</li></ul>",
  "notes": "Presenter notes here",
  "visibility": true
}
```

**Advantages:**
- Legacy support
- API-generated content
- JavaScript-native parsing

---

## Migration Strategy

### Phase 1: URL Abstraction Layer (Weeks 1-2)

**Goal:** Support both local and remote resource loading

#### 1.1 Create ResourceLoaderService

```typescript
@Injectable({ providedIn: 'root' })
export class ResourceLoaderService {
  constructor(private http: HttpClient) {}

  /**
   * Load a resource from local or remote location
   * @param path - Relative or absolute URL
   * @param baseUrl - Base URL for relative paths
   * @param fallbackLocal - Try local path if remote fails
   */
  async load<T>(
    path: string,
    baseUrl?: string,
    fallbackLocal: boolean = true
  ): Promise<T> {
    // 1. Check if absolute URL (http://, https://)
    if (this.isAbsoluteUrl(path)) {
      return this.loadRemote<T>(path, fallbackLocal);
    }
    
    // 2. Check for environment-specific base URL
    const fullPath = baseUrl 
      ? this.joinUrl(baseUrl, path) 
      : path;
    
    // 3. Try primary path
    try {
      return await firstValueFrom(this.http.get<T>(fullPath));
    } catch (error) {
      // 4. Fallback to local if enabled
      if (fallbackLocal && baseUrl) {
        return firstValueFrom(this.http.get<T>(path));
      }
      throw error;
    }
  }

  private isAbsoluteUrl(url: string): boolean {
    return /^https?:\/\//i.test(url);
  }

  private joinUrl(base: string, path: string): string {
    return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  }

  private async loadRemote<T>(
    url: string, 
    fallbackLocal: boolean
  ): Promise<T> {
    try {
      return await firstValueFrom(this.http.get<T>(url));
    } catch (error) {
      if (fallbackLocal) {
        // Extract filename and try local assets folder
        const filename = url.split('/').pop();
        return firstValueFrom(
          this.http.get<T>(`./assets/talks/${filename}`)
        );
      }
      throw error;
    }
  }

  /**
   * Preload multiple resources in parallel
   */
  async loadMany<T>(
    paths: string[], 
    baseUrl?: string
  ): Promise<T[]> {
    return Promise.all(
      paths.map(path => this.load<T>(path, baseUrl))
    );
  }

  /**
   * Load with cache control
   */
  async loadCached<T>(
    path: string, 
    ttl: number = 3600000
  ): Promise<T> {
    const cacheKey = `resource_${path}`;
    const cached = this.getFromCache(cacheKey, ttl);
    if (cached) return cached;

    const data = await this.load<T>(path);
    this.setCache(cacheKey, data);
    return data;
  }

  private cache = new Map<string, { data: any; timestamp: number }>();

  private getFromCache(key: string, ttl: number): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > ttl) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}
```

#### 1.2 Update CodeService

```typescript
export class CodeService {
  constructor(
    private http: HttpClient,
    private resourceLoader: ResourceLoaderService
  ) {}

  async getStructure(folder: string): Promise<any> {
    // Check for new manifest format first
    const manifestPath = `./assets/talks/${folder}/manifest.json`;
    
    try {
      const manifest = await this.resourceLoader.load<Manifest>(
        manifestPath
      );
      return this.loadFromManifest(manifest, folder);
    } catch {
      // Fallback to legacy structure.json
      return this.loadLegacyStructure(folder);
    }
  }

  private async loadFromManifest(
    manifest: Manifest, 
    folder: string
  ): Promise<Structure> {
    const baseUrl = manifest.configuration.baseUrl || './';
    const remoteBaseUrl = manifest.configuration.remoteBaseUrl;
    
    // Load slides in parallel
    const slidePromises = manifest.slides.map(async (slideRef) => {
      const slideContent = await this.resourceLoader.load(
        slideRef.source,
        remoteBaseUrl || baseUrl,
        manifest.configuration.fallbackLocal
      );
      
      return {
        id: slideRef.id,
        content: this.parseSlideContent(slideContent, slideRef.source)
      };
    });

    const slides = await Promise.all(slidePromises);

    // Build structure object
    return this.buildStructure(manifest, slides);
  }

  private parseSlideContent(content: any, source: string): StructureType {
    const ext = source.split('.').pop()?.toLowerCase();

    switch (ext) {
      case 'md':
        return this.parseMarkdown(content);
      case 'yaml':
      case 'yml':
        return this.parseYaml(content);
      case 'json':
        return content;
      default:
        throw new Error(`Unsupported format: ${ext}`);
    }
  }
}
```

#### 1.3 Create Image URL Helper

```typescript
export class ImageUrlHelper {
  static resolve(
    imagePath: string, 
    baseUrl: string, 
    remoteBaseUrl?: string
  ): string {
    // Already absolute URL
    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    // Try remote first if configured
    if (remoteBaseUrl) {
      return this.joinUrl(remoteBaseUrl, imagePath);
    }

    // Local path
    return this.joinUrl(baseUrl, imagePath);
  }

  static resolveWithFallback(
    imagePath: string,
    baseUrl: string,
    remoteBaseUrl?: string
  ): string[] {
    const paths: string[] = [];

    // Remote path
    if (remoteBaseUrl) {
      paths.push(this.joinUrl(remoteBaseUrl, imagePath));
    }

    // Local path
    paths.push(this.joinUrl(baseUrl, imagePath));

    return paths;
  }

  private static joinUrl(base: string, path: string): string {
    return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  }
}
```

#### 1.4 Update Image Components

```typescript
@Component({
  selector: 'app-image-only',
  template: `
    <img 
      [src]="resolvedImageUrl" 
      [class]="imageClass"
      (error)="onImageError()"
      [alt]="title"
    />
  `
})
export class ImageOnlyComponent {
  @Input() image: string = '';
  @Input() remoteBaseUrl?: string;
  @Input() baseUrl: string = './assets/talks/';
  
  resolvedImageUrl: string = '';
  fallbackUrls: string[] = [];
  currentFallbackIndex: number = 0;

  ngOnInit() {
    this.fallbackUrls = ImageUrlHelper.resolveWithFallback(
      this.image,
      this.baseUrl,
      this.remoteBaseUrl
    );
    this.resolvedImageUrl = this.fallbackUrls[0];
  }

  onImageError() {
    this.currentFallbackIndex++;
    if (this.currentFallbackIndex < this.fallbackUrls.length) {
      this.resolvedImageUrl = this.fallbackUrls[this.currentFallbackIndex];
    } else {
      console.error('All image sources failed:', this.image);
      this.resolvedImageUrl = './assets/images/image-not-found.png';
    }
  }
}
```

**Testing:**
- Load presentation from local `assets/`
- Load presentation from remote CDN
- Verify image fallback works (remote → local)
- Test offline scenario (service worker caching)

---

### Phase 2: Format Parsers (Weeks 3-4)

**Goal:** Support Markdown and YAML slide definitions

#### 2.1 Markdown Parser

```typescript
export class MarkdownSlideParser {
  /**
   * Parse Markdown with YAML frontmatter
   */
  parse(markdown: string): StructureType {
    const { frontmatter, content } = this.extractFrontmatter(markdown);
    
    const slide: StructureType = {
      ...frontmatter,
      title: frontmatter.title || '',
      type: frontmatter.type || 'panel-single'
    };

    // Parse content based on slide type
    switch (slide.type) {
      case 'panel-double':
        this.parsePanelDouble(slide, content);
        break;
      case 'panel-triple':
        this.parsePanelTriple(slide, content);
        break;
      case 'panel-single':
      default:
        slide.text1 = this.markdownToHtml(content);
    }

    return slide;
  }

  private extractFrontmatter(markdown: string): {
    frontmatter: any;
    content: string;
  } {
    const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    
    if (!match) {
      return { frontmatter: {}, content: markdown };
    }

    const [, yamlContent, mdContent] = match;
    const frontmatter = this.parseYaml(yamlContent);
    
    return { frontmatter, content: mdContent };
  }

  private parsePanelDouble(slide: StructureType, content: string): void {
    // Split by ## headers
    const sections = content.split(/^## /m).filter(s => s.trim());
    
    if (sections.length >= 1) {
      slide.text1 = this.markdownToHtml(sections[0]);
    }
    if (sections.length >= 2) {
      slide.text2 = this.markdownToHtml(sections[1]);
    }
  }

  private parsePanelTriple(slide: StructureType, content: string): void {
    const sections = content.split(/^## /m).filter(s => s.trim());
    
    slide.text1 = sections[0] ? this.markdownToHtml(sections[0]) : '';
    slide.text2 = sections[1] ? this.markdownToHtml(sections[1]) : '';
    slide.text3 = sections[2] ? this.markdownToHtml(sections[2]) : '';
  }

  private markdownToHtml(markdown: string): string {
    // Use a library like marked.js or build simple parser
    return this.simpleMarkdownToHtml(markdown);
  }

  private simpleMarkdownToHtml(md: string): string {
    let html = md;
    
    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Bold, italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Lists
    html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Images
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g, 
      '<img src="$2" alt="$1" />'
    );
    
    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2">$1</a>'
    );
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = `<p>${html}</p>`;
    
    return html;
  }

  private parseYaml(yaml: string): any {
    // Use js-yaml library
    // For now, simplified implementation
    const obj: any = {};
    const lines = yaml.split('\n');
    
    lines.forEach(line => {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        const [, key, value] = match;
        obj[key] = this.parseValue(value);
      }
    });
    
    return obj;
  }

  private parseValue(value: string): any {
    // Boolean
    if (value === 'true') return true;
    if (value === 'false') return false;
    
    // Number
    if (/^\d+$/.test(value)) return parseInt(value);
    
    // String
    return value.replace(/^["']|["']$/g, '');
  }
}
```

#### 2.2 YAML Parser Integration

```bash
npm install js-yaml
npm install --save-dev @types/js-yaml
```

```typescript
import * as yaml from 'js-yaml';

export class YamlSlideParser {
  parse(yamlContent: string): StructureType {
    try {
      const slide = yaml.load(yamlContent) as StructureType;
      
      // Validate required fields
      if (!slide.type) {
        throw new Error('Slide type is required');
      }
      
      return slide;
    } catch (error) {
      console.error('YAML parsing error:', error);
      throw error;
    }
  }
}
```

#### 2.3 Register Parsers

```typescript
@Injectable({ providedIn: 'root' })
export class SlideParserService {
  private parsers = {
    md: new MarkdownSlideParser(),
    markdown: new MarkdownSlideParser(),
    yaml: new YamlSlideParser(),
    yml: new YamlSlideParser(),
    json: new JsonSlideParser()
  };

  parse(content: string, format: string): StructureType {
    const parser = this.parsers[format.toLowerCase()];
    
    if (!parser) {
      throw new Error(`No parser for format: ${format}`);
    }
    
    return parser.parse(content);
  }

  canParse(format: string): boolean {
    return format.toLowerCase() in this.parsers;
  }
}
```

**Testing:**
- Parse various Markdown slides
- Parse YAML slides
- Handle malformed content gracefully
- Validate output matches expected StructureType

---

### Phase 3: Presentation Conversion Tool (Week 5)

**Goal:** Automate migration of existing presentations

#### 3.1 CLI Tool

```typescript
// tools/convert-presentation.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface ConversionOptions {
  inputDir: string;
  outputDir: string;
  format: 'json' | 'yaml' | 'markdown';
  splitSlides: boolean;
}

class PresentationConverter {
  async convert(options: ConversionOptions): Promise<void> {
    console.log(`Converting presentation: ${options.inputDir}`);
    
    // 1. Load legacy structure.json
    const structurePath = path.join(options.inputDir, 'structure.json');
    const structureData = await fs.readFile(structurePath, 'utf-8');
    const structure = JSON.parse(structureData);

    // 2. Create manifest
    const manifest = this.createManifest(structure, options);

    // 3. Extract slides
    if (options.splitSlides) {
      await this.extractSlides(structure, options);
    }

    // 4. Extract styles
    await this.extractStyles(structure, options);

    // 5. Write manifest
    const manifestPath = path.join(options.outputDir, 'manifest.json');
    await fs.writeFile(
      manifestPath, 
      JSON.stringify(manifest, null, 2)
    );

    console.log('✓ Conversion complete');
  }

  private createManifest(structure: any, options: ConversionOptions): Manifest {
    const manifest: Manifest = {
      version: '2.0',
      metadata: {
        title: structure[structure.ORDER[0]]?.title || 'Untitled',
        author: structure[structure.ORDER[0]]?.author || '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        description: ''
      },
      configuration: {
        template: 'DEFAULT',
        baseUrl: './',
        fallbackLocal: true
      },
      slides: [],
      styles: 'styles.css'
    };

    // Map slides
    structure.ORDER.forEach((slideKey: string) => {
      const slideData = structure[slideKey];
      
      if (options.splitSlides) {
        const ext = this.getExtension(options.format);
        manifest.slides.push({
          id: slideKey,
          source: `content/${slideKey}.${ext}`
        });
      } else {
        manifest.slides.push({
          id: slideKey,
          source: `structure.json#${slideKey}`
        });
      }
    });

    return manifest;
  }

  private async extractSlides(
    structure: any, 
    options: ConversionOptions
  ): Promise<void> {
    const contentDir = path.join(options.outputDir, 'content');
    await fs.mkdir(contentDir, { recursive: true });

    for (const slideKey of structure.ORDER) {
      const slideData = structure[slideKey];
      const ext = this.getExtension(options.format);
      const filename = `${slideKey}.${ext}`;
      const filepath = path.join(contentDir, filename);

      let content: string;

      switch (options.format) {
        case 'markdown':
          content = this.slideToMarkdown(slideData);
          break;
        case 'yaml':
          content = yaml.dump(slideData);
          break;
        case 'json':
        default:
          content = JSON.stringify(slideData, null, 2);
      }

      await fs.writeFile(filepath, content);
    }
  }

  private slideToMarkdown(slide: any): string {
    const frontmatter = {
      type: slide.type,
      title: slide.title,
      visibility: slide.visibility !== false,
      notes: slide.notes || ''
    };

    let content = '---\n';
    content += yaml.dump(frontmatter);
    content += '---\n\n';

    // Convert content based on type
    if (slide.text1) {
      content += this.htmlToMarkdown(slide.text1);
    }

    if (slide.text2) {
      content += '\n\n## Column 2\n\n';
      content += this.htmlToMarkdown(slide.text2);
    }

    if (slide.text3) {
      content += '\n\n## Column 3\n\n';
      content += this.htmlToMarkdown(slide.text3);
    }

    return content;
  }

  private htmlToMarkdown(html: string): string {
    // Simple conversion (could use turndown.js for better results)
    let md = html;
    
    md = md.replace(/<h1>(.*?)<\/h1>/g, '# $1\n');
    md = md.replace(/<h2>(.*?)<\/h2>/g, '## $1\n');
    md = md.replace(/<h3>(.*?)<\/h3>/g, '### $1\n');
    md = md.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
    md = md.replace(/<em>(.*?)<\/em>/g, '*$1*');
    md = md.replace(/<li>(.*?)<\/li>/g, '* $1\n');
    md = md.replace(/<\/?ul>/g, '');
    md = md.replace(/<br\s*\/?>/g, '\n');
    md = md.replace(/<div[^>]*>/g, '\n');
    md = md.replace(/<\/div>/g, '');
    
    return md.trim();
  }

  private async extractStyles(
    structure: any, 
    options: ConversionOptions
  ): Promise<void> {
    if (!structure.STYLE || structure.STYLE.length === 0) {
      return;
    }

    const cssContent = structure.STYLE.join('\n');
    const cssPath = path.join(options.outputDir, 'styles.css');
    await fs.writeFile(cssPath, cssContent);
  }

  private getExtension(format: string): string {
    switch (format) {
      case 'markdown': return 'md';
      case 'yaml': return 'yaml';
      case 'json': return 'json';
      default: return 'json';
    }
  }
}

// CLI execution
const converter = new PresentationConverter();

converter.convert({
  inputDir: './public/assets/talks/my-talk',
  outputDir: './public/assets/talks/my-talk-v2',
  format: 'markdown',
  splitSlides: true
});
```

#### 3.2 Batch Conversion Script

```typescript
// tools/batch-convert.ts
import * as fs from 'fs/promises';
import * as path from 'path';

async function convertAllPresentations() {
  const talksDir = './public/assets/talks';
  const entries = await fs.readdir(talksDir, { withFileTypes: true });

  const folders = entries
    .filter(e => e.isDirectory())
    .filter(e => !['GLOBAL', 'converted'].includes(e.name))
    .map(e => e.name);

  console.log(`Found ${folders.length} presentations to convert`);

  for (const folder of folders) {
    const inputDir = path.join(talksDir, folder);
    const outputDir = path.join(talksDir, 'converted', folder);

    try {
      await converter.convert({
        inputDir,
        outputDir,
        format: 'markdown',
        splitSlides: true
      });
      console.log(`✓ Converted: ${folder}`);
    } catch (error) {
      console.error(`✗ Failed: ${folder}`, error);
    }
  }
}

convertAllPresentations();
```

**Usage:**
```bash
# Convert single presentation
npm run convert-presentation -- --input=my-talk --format=markdown

# Convert all presentations
npm run convert-all
```

---

### Phase 4: CDN & Remote Loading (Week 6)

**Goal:** Deploy presentations to CDN, support remote loading

#### 4.1 Environment Configuration

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  talksBaseUrl: './assets/talks/',
  talksRemoteUrl: null,
  imagesCdnUrl: null
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  talksBaseUrl: './assets/talks/',
  talksRemoteUrl: 'https://cdn.example.com/talks/',
  imagesCdnUrl: 'https://cdn.example.com/images/'
};
```

#### 4.2 Update ResourceLoaderService

```typescript
export class ResourceLoaderService {
  private baseUrl: string;
  private remoteUrl: string | null;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.talksBaseUrl;
    this.remoteUrl = environment.talksRemoteUrl;
  }

  async load<T>(path: string): Promise<T> {
    // Try remote first if available
    if (this.remoteUrl) {
      try {
        const remoteUrl = this.joinUrl(this.remoteUrl, path);
        return await firstValueFrom(
          this.http.get<T>(remoteUrl, { 
            headers: { 'Cache-Control': 'max-age=3600' }
          })
        );
      } catch (error) {
        console.warn(`Remote load failed: ${path}, falling back to local`);
      }
    }

    // Fallback to local
    const localUrl = this.joinUrl(this.baseUrl, path);
    return firstValueFrom(this.http.get<T>(localUrl));
  }
}
```

#### 4.3 CDN Deployment Script

```bash
#!/bin/bash
# deploy-talks.sh

TALKS_DIR="./public/assets/talks"
S3_BUCKET="s3://my-cdn-bucket/talks"
CLOUDFRONT_ID="E1234567890ABC"

# Sync talks to S3
aws s3 sync "$TALKS_DIR" "$S3_BUCKET" \
  --exclude "*.xcf" \
  --exclude ".DS_Store" \
  --cache-control "max-age=3600" \
  --metadata-directive REPLACE

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_ID" \
  --paths "/talks/*"

echo "✓ Deployment complete"
```

#### 4.4 Presentation Manifest with CDN

```json
{
  "version": "2.0",
  "metadata": {
    "title": "My Presentation"
  },
  "configuration": {
    "baseUrl": "./",
    "remoteBaseUrl": "https://cdn.example.com/talks/my-talk/",
    "imagesCdnUrl": "https://cdn.example.com/images/",
    "fallbackLocal": true
  },
  "slides": [
    {
      "id": "cover",
      "source": "content/cover.md"
    }
  ]
}
```

Images automatically resolve to CDN:
```markdown
![Diagram](./diagram.png)
<!-- Resolves to: https://cdn.example.com/images/diagram.png -->
```

---

### Phase 5: Hybrid Mode (Weeks 7-8)

**Goal:** Support both legacy and new formats simultaneously

#### 5.1 Format Detection

```typescript
export class PresentationLoaderService {
  async loadPresentation(folder: string): Promise<Structure> {
    // Check for v2 manifest
    const manifestPath = `${folder}/manifest.json`;
    
    if (await this.resourceExists(manifestPath)) {
      return this.loadV2Presentation(folder);
    }

    // Fallback to v1 structure.json
    console.log('Loading legacy v1 format');
    return this.loadV1Presentation(folder);
  }

  private async resourceExists(path: string): Promise<boolean> {
    try {
      await this.resourceLoader.load(path);
      return true;
    } catch {
      return false;
    }
  }

  private async loadV2Presentation(folder: string): Promise<Structure> {
    const manifest = await this.resourceLoader.load<Manifest>(
      `${folder}/manifest.json`
    );
    return this.buildStructureFromManifest(manifest);
  }

  private async loadV1Presentation(folder: string): Promise<Structure> {
    const structure = await this.resourceLoader.load<Structure>(
      `${folder}/structure.json`
    );
    return this.processLegacyStructure(structure);
  }
}
```

#### 5.2 Migration Flag

```json
// manifest.json
{
  "version": "2.0",
  "migration": {
    "from": "1.0",
    "date": "2026-05-15",
    "backupPath": "structure.json.bak"
  }
}
```

---

## Implementation Checklist

### Phase 1: URL Abstraction Layer
- [ ] Create `ResourceLoaderService`
- [ ] Create `ImageUrlHelper`
- [ ] Update `CodeService` to use ResourceLoader
- [ ] Update image components with fallback logic
- [ ] Test local resource loading
- [ ] Test remote resource loading
- [ ] Test fallback scenarios

### Phase 2: Format Parsers
- [ ] Implement `MarkdownSlideParser`
- [ ] Implement `YamlSlideParser`
- [ ] Create `SlideParserService`
- [ ] Add unit tests for each parser
- [ ] Test complex Markdown structures
- [ ] Test YAML edge cases

### Phase 3: Conversion Tool
- [ ] Build CLI converter
- [ ] Add batch conversion script
- [ ] Convert 1-2 presentations manually
- [ ] Verify converted presentations render correctly
- [ ] Document conversion process

### Phase 4: CDN & Remote Loading
- [ ] Set up CDN (S3 + CloudFront or similar)
- [ ] Create deployment script
- [ ] Update environment configuration
- [ ] Test remote loading in production
- [ ] Measure performance improvements

### Phase 5: Hybrid Mode
- [ ] Implement format detection
- [ ] Support v1 and v2 simultaneously
- [ ] Add migration warnings/logs
- [ ] Create migration guide
- [ ] Convert all presentations gradually

---

## Rollout Strategy

### Week 1-2: Foundation
- Implement ResourceLoader and URL abstraction
- Test with existing presentations (no breaking changes)

### Week 3-4: Parser Implementation
- Build Markdown and YAML parsers
- Create conversion tool
- Convert 1-2 pilot presentations

### Week 5: Tooling
- Refine conversion tool
- Convert 5-10 more presentations
- Gather feedback on new format

### Week 6-7: CDN Setup
- Set up CDN infrastructure
- Deploy converted presentations
- A/B test performance

### Week 8-12: Migration
- Convert remaining presentations
- Update documentation
- Remove legacy code paths (optional)

---

## Expected Outcomes

### File Size Reduction
| Presentation | Current (JSON) | New (Manifest + MD) | Reduction |
|--------------|----------------|---------------------|-----------|
| Small (10 slides) | 50 KB | 5 KB + 10×2 KB = 25 KB | 50% |
| Medium (30 slides) | 200 KB | 5 KB + 30×3 KB = 95 KB | 52% |
| Large (50 slides) | 500 KB | 5 KB + 50×4 KB = 205 KB | 59% |

### Performance Improvements
- **Initial Load:** 30-40% faster (smaller manifest)
- **Slide Navigation:** Negligible difference (content already loaded)
- **CDN Caching:** 80-90% cache hit rate
- **Bandwidth Savings:** 50-60% reduction over time

### Developer Experience
- **Easier Editing:** Markdown in VS Code with preview
- **Better Version Control:** Smaller, focused diffs
- **Collaboration:** Independent slide editing, less merge conflicts
- **Portability:** Presentations can be packaged and shared

---

## Risks & Mitigation

### Risk 1: Breaking Existing Presentations
**Mitigation:** Hybrid mode supports both formats during transition

### Risk 2: CDN Costs
**Mitigation:** Use generous caching, monitor usage, consider CloudFlare (free tier)

### Risk 3: Conversion Errors
**Mitigation:** Manual review of converted presentations, comprehensive testing

### Risk 4: Complexity Increase
**Mitigation:** Clear documentation, migration guides, maintain backward compatibility

### Risk 5: Remote Loading Failures
**Mitigation:** Fallback to local files, service worker for offline support

---

## Future Enhancements

### Dynamic Slide Loading
Load slides on-demand rather than all at once:
```typescript
async navigateToSlide(slideId: string): Promise<void> {
  if (!this.loadedSlides.has(slideId)) {
    const slide = await this.loadSlide(slideId);
    this.loadedSlides.set(slideId, slide);
  }
  this.currentSlide = this.loadedSlides.get(slideId);
}
```

### Presentation Packages
Bundle presentation as a single `.zip` or `.talkpkg`:
```
my-presentation.talkpkg
├── manifest.json
├── content/
├── images/
└── styles.css
```

### Cloud Storage Integration
Load presentations from Google Drive, Dropbox, etc.:
```json
{
  "source": "gdrive://1a2b3c4d5e/my-presentation"
}
```

### Real-time Collaboration
Multiple presenters edit same presentation:
- Use WebSocket for live updates
- Operational Transform for conflict resolution

### Presentation Marketplace
Share presentations publicly:
- `https://talks.example.com/bob-fornal/typescript-testing`
- Fork/remix presentations
- Versioning and changelog

---

## Conclusion

This migration plan provides a clear path to:
1. **Reduce JSON file sizes** by 50-60%
2. **Support local and remote resources** seamlessly
3. **Improve developer experience** with Markdown/YAML
4. **Enable CDN deployment** for better performance
5. **Maintain backward compatibility** during transition

The phased approach allows for incremental implementation and validation, minimizing risk while delivering value early. The hybrid mode ensures existing presentations continue to work while new presentations benefit from the improved architecture.
