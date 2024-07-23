# Slide Cover Component

(Generated for use in the Tech Presentation Tool project)

## Implementation

This is the implementation of this code.

* The `tag` key identifies the component tag.
* The `location` tag identifies where the JavaScript file for this component is located.
* The `data` tag identifies the data that is injected into the `content` property.

```json
  "external-cover": {
    "type": "external",
    "tag": "slide-cover",
    "location": "/assets/slides/slide-cover/slide-cover.js",
    "data": {
      "title": "<span>A Look Inside Observables</span><br/><span class=\"smaller align-right\">Bob Fornal</span>",
      "background": "/assets/images/grid--green.webp",
      "image1": "/assets/images/code-squid.webp",
      "image2": "/assets/images/leading-edje.webp",
      "text1": "<div class=bold>Entrepreneur</div>Code-squid provides solid, in-depth frontend training that is supported with real-world code projects. Blessed husband and proud father of two.",
      "text2": "<div class=bold>Senior Solutions Developer</div><div class=bold>Leading EDJE, Inc.</div>Passionate about learning, testing, mentoring, speaking, and personal growth."
    }
  },
```

Data for this component includes: `title`, `background` image, `image1`, `image2`, `text1`, and `text2`.

There are classes that can be used within the text areas of the `data` (`title`, `text1`, and `text2`); they are `bold`, `smaller` and `align-right`. These data points can also inject HTML.

## Future

- [ ] Implement an array of `image`, `text` that displays 1-3 groups.
- [ ] Limit the height/width of the image.
- [ ] Override of the left-column width.
