# Technical Speaker Agent Usage Guide

This workspace includes a comprehensive **Technical Speaker** agent that combines deep technical expertise with Patrick Winston's MIT Presentation Framework. The agent handles everything from initial content creation through final presentation coaching.

---

## Technical Speaker Agent

**Name:** `Technical Speaker`  
**File:** `.github/agents/technical-speaker.agent.md`

### Overview

The Technical Speaker agent is a **complete presentation solution** combining:
- **Content creation and structure** expertise
- **Patrick Winston's MIT Presentation Framework** coaching
- **Deep technical knowledge** (Frontend, Cloud, AI)
- **35 years** of technical public speaking experience
- **47 years** of software development expertise

This unified agent handles all aspects of technical presentation development, from initial structure through final delivery coaching.

---

## Core Capabilities

### 1. Content Creation & Structure

**Expertise:**
- Organize talks with clear narratives and logical flow
- Review and refine technical accuracy (JavaScript, TypeScript, React, Angular, Vue, AWS, Azure, AI)
- Develop comprehensive speaker notes with timing and transitions
- Create and review slide content for clarity and impact
- Balance technical depth with audience accessibility (default entry-level)

**Use when:**
```
@technical-speaker help me structure a 45-minute talk on React Server Components

@technical-speaker review the technical accuracy of my TypeScript advanced types content

@technical-speaker create speaker notes with timing for my Azure Functions talk
```

---

### 2. Patrick Winston's 5 Frameworks

The agent applies five critical Winston frameworks to technical presentations:

#### Framework 1: Opening Design - Start Any Presentation Right

Creates powerful openings with **empowerment promises** that hook audiences immediately.

**What it delivers:**
- Empowerment Promise (specific, outcome-driven)
- First 60 Seconds script
- What to Cut list
- Complete Opening Script

**Use when:**
```
@technical-speaker design an opening with empowerment promise for my Kubernetes talk

@technical-speaker help me craft the first 60 seconds for my observables presentation
```

**Rules Applied:**
- Never open with a joke or "thank you for having me"
- Empowerment promise: "by the end you'll be able to DO Y" not "learn about X"
- First 60 seconds must earn the next 60 minutes

---

#### Framework 2: Slide Crime Investigation - Eliminate Slide Crimes

Audits presentations against **Winston's 10 slide crimes** that make audiences disengage.

**The 10 Crimes:**
1. Too many slides (Target: 28-34 slides for standard 45-50 minute talk)
2. Too many words per slide
3. Font size under 40pt
4. Reading slides aloud
5. Laser pointer usage
6. Speaker standing far from slides
7. No white space or air
8. Background clutter and logos
9. Collaborators list as final slide
10. "Thank you" or "Questions?" as final slide

**What it delivers:**
- Complete Crime Audit
- Specific Fix per Crime
- Final Slide Redesign (as contributions slide)
- Clean Slide Brief

**Use when:**
```
@technical-speaker audit my slides for Winston's presentation crimes

@technical-speaker review my 60-slide deck and tell me what to cut
```

---

#### Framework 3: Winston Star Framework - Make Ideas Unforgettable

Applies the **Star framework** (Symbol, Slogan, Surprise, Salient idea, Story) to make technical concepts stick.

**What it delivers:**
- Symbol (visual representation)
- Slogan (memorable phrase)
- Surprise (counterintuitive truth)
- Salient Idea (the one thing to remember)
- Story (how it works, why it matters)
- Complete Winston Star

**Use when:**
```
@technical-speaker apply the Star framework to my reactive programming concept

@technical-speaker make my serverless architecture idea unforgettable

@technical-speaker create a Winston Star for observables
```

---

#### Framework 4: Job Talk Structure - Structure A Talk That Persuades

Structures talks using **vision, proof of work, and contributions** to convince audiences.

**What it delivers:**
- Vision Statement
- Proof of Work
- 5-Minute Opening
- Contributions Close
- Full Talk Structure

**Use when:**
```
@technical-speaker structure my talk with vision and proof of work

@technical-speaker help me build a persuasive microservices architecture talk

@technical-speaker create a job talk structure for my conference keynote
```

**Rules Applied:**
- Vision established within first 5 minutes
- Opening and close mirror each other (promise made, promise kept)
- Contributions slide stays up during Q&A

---

#### Framework 5: Sample Code and Storytelling - Teaching Through Demonstrations

Designs **code demonstrations and stories** that make complex concepts tangible and clear.

**What it delivers:**
- Confusing Concept identification
- Demo Code Design
- Story Arc (tension, demonstration, resolution)
- Verbal Script
- Complete Teaching Sequence

**Use when:**
```
@technical-speaker design a code demo to teach async/await clearly

@technical-speaker create a teaching story around my closures example

@technical-speaker help me demonstrate dependency injection with a narrative
```

**Rules Applied:**
- Avoid live coding - use pre-prepared examples
- Code must be real and demonstrable
- Presentations run locally (no internet dependencies)
- Story must have genuine tension before resolution

---

### 3. Code Example Excellence

The agent provides best practices for creating effective presentation code:

**Visual Clarity:**
- 40pt minimum font size (matches slide rule)
- Consistent syntax highlighting
- Lines under 80 characters
- Readable contrast for projection

**Code Content:**
- Short and effective
- Progressive reveal for complexity
- Remove boilerplate noise
- Focus attention on key lines

**Presentation:**
- Context first, then code
- Build from simple to complex
- Executable, not pseudo-code
- Error-free and tested
- Realistic examples

**Use when:**
```
@technical-speaker review my code examples for presentation best practices

@technical-speaker help me simplify this complex code for my slides

@technical-speaker create a progressive reveal for this algorithm
```

---

### 4. Rehearsal & Preparation

Guides through a **7-step rehearsal workflow**:

1. **Initial Design**: Shell structure and initial thoughts
2. **Build Outline**: Comprehensive talk outline with logical flow
3. **Flesh Out Details**: Complete all outlined slides
4. **Add Code**: Include necessary code examples with tests
5. **First Run-Through**: Complete presentation and add speaker notes
6. **Second Run-Through**: Verify notes, check spelling
7. **Basic Presentation Practice**: Final practice with notes verification

**Use when:**
```
@technical-speaker guide me through preparing my talk for next week

@technical-speaker I'm at step 3 - help me flesh out the details

@technical-speaker what should I focus on in my second run-through?
```

---

### 5. Technical Accuracy Review

Leverages expertise in:
- **Frontend**: JavaScript/TypeScript, Angular, React, Vue, CSS, HTML5, web performance
- **Cloud**: AWS and Azure (certified developer level)
- **AI**: GitHub Copilot, AI-assisted development, modern AI tools

**Use when:**
```
@technical-speaker verify the accuracy of my React hooks explanation

@technical-speaker review my Azure serverless architecture content

@technical-speaker check if my TypeScript generics example is correct
```

---

## Complete Workflow Example

Here's how to use the Technical Speaker agent for a full presentation:

### Task: Create a 45-minute conference talk on "TypeScript Advanced Types"

```bash
# Step 1: Initial structure and content
@technical-speaker structure a 45-minute conference talk on TypeScript advanced types for intermediate developers

# Step 2: Design the opening
@technical-speaker design an opening with an empowerment promise for my TypeScript talk

# Step 3: Create code examples
@technical-speaker create 3 code examples demonstrating mapped types, conditional types, and template literals

# Step 4: Make key concept memorable
@technical-speaker apply the Winston Star framework to type inference

# Step 5: Audit slides
@technical-speaker audit my slides for Winston's 10 crimes

# Step 6: Develop speaker notes
@technical-speaker create comprehensive speaker notes with timing for each section

# Step 7: Design closing
@technical-speaker create a contributions slide that mirrors my opening promise

# Step 8: Final review
@technical-speaker review my complete talk for technical accuracy and pacing
```

---

## Quick Reference Guide

| Need | Command Example |
|------|----------------|
| Structure new talk | `@technical-speaker structure a talk on [topic] for [audience]` |
| Design opening | `@technical-speaker create an empowerment promise for [topic]` |
| Audit slides | `@technical-speaker audit my slides for presentation crimes` |
| Make concept memorable | `@technical-speaker apply Star framework to [concept]` |
| Persuasive structure | `@technical-speaker structure with vision and proof for [topic]` |
| Code examples | `@technical-speaker create code examples for [concept]` |
| Teaching demo | `@technical-speaker design a teaching demo for [complex topic]` |
| Review accuracy | `@technical-speaker verify the technical accuracy of [content]` |
| Speaker notes | `@technical-speaker create speaker notes with timing` |
| Rehearsal guidance | `@technical-speaker guide me through rehearsal step [number]` |

---

## Key Guidelines the Agent Follows

### Presentation Standards:
- **Duration**: Standard 45-50 minutes
- **Slide Count**: 28-34 slides (warnings if too short/long)
- **Audience**: Default to entry-level unless specified
- **Font Size**: 40pt minimum (slides and code)

### Demo Strategy:
- Avoid live coding whenever possible
- Pre-prepared code examples
- Run locally (terminal/browser)
- Internet as fallback only

### Backup Plan:
- Entire presentation on presenter's computer
- Fallback: https://www.bobs-tech-presentations.com

### Winston Framework Rules:
- Never open with jokes or "thank you"
- Never allow "Questions?" or "Thank you" as final slide
- Final slide must be contributions
- Empowerment promises must be action-oriented
- All slide crimes must be eliminated

---

## Integration with Presentation Tool

The agent understands your workspace structure:
- Can reference existing talks in `/public/assets/talks/`
- Can review documentation in `/documentation/`
- Understands the Angular-based presentation tool
- Can reference Patrick Winston framework documentation
- Aware of Q&A tracking system
- Familiar with presentation format types

---

## Additional Resources

The agent has access to:
- **[Patrick Winston Framework](../documentation/patrick-winston-mit-presentation-framework.md)**: Full MIT presentation framework
- **[Q&A Tracking](../documentation/qa-documentation-tracking.md)**: System for documenting questions after presentations
- **[Presentation Format Types](../documentation/presentation-format-types.md)**: Guide to different presentation formats (lightning talks, workshops, keynotes, etc.)
- **[Speaker Agent Notes](../documentation/speaker-agent.md)**: Original speaker agent design notes

---

## Tips for Best Results

1. **Be Specific**: Provide context about your audience, duration, and goals
2. **One Thing at a Time**: Focus on one framework or aspect per request
3. **Iterate**: Use the agent multiple times to refine different aspects
4. **Provide Content**: Share existing content for review rather than starting from scratch when possible
5. **Ask Questions**: The agent will ask clarifying questions - provide detailed answers
6. **Reference Files**: Point to existing talks or documentation for patterns

---

## Example Invocations

### Content Creation:
```
@technical-speaker I need to create a talk about WebAssembly. My audience is frontend developers with 2-3 years experience. The talk is 45 minutes. Help me structure it.

@technical-speaker review my explanation of React hooks for technical accuracy

@technical-speaker create speaker notes for my section on async/await with timing
```

### Winston Framework Application:
```
@technical-speaker my talk starts with "Hi, I'm Bob, thanks for coming." Fix my opening.

@technical-speaker I have 78 slides for a 45-minute talk. Audit for crimes.

@technical-speaker my core concept is "observables are lazy push collections" - make this unforgettable

@technical-speaker structure my architecture talk with vision and proof of work

@technical-speaker my audience struggles with closures - design a teaching demo
```

### Code & Demos:
```
@technical-speaker review these code examples - is the font size readable?

@technical-speaker this code is 150 lines - help me simplify for a slide

@technical-speaker create a progressive reveal for this recursive algorithm
```

### Rehearsal & Practice:
```
@technical-speaker I'm doing my first run-through - what should I focus on?

@technical-speaker help me time my talk - how do I know if I'm running long?

@technical-speaker what's the best way to practice transitions between sections?
```

---

## Support and Feedback

The Technical Speaker agent is designed to:
- Ask clarifying questions when context is needed
- Provide specific, actionable guidance (not just theory)
- Reference proven frameworks and principles
- Deliver concrete outputs and deliverables
- Balance technical accuracy with accessibility
- Hold presentations to high standards

If the agent needs more information, it will ask. The more context you provide about your technical topic, audience level, and presentation goals, the better the results.

---

**Remember:** This is a comprehensive agent that combines content creation, Winston framework coaching, and technical expertise. You don't need multiple agents - the Technical Speaker handles everything from initial structure through final delivery coaching.
