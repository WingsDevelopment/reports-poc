## Reports

Time spent from start to finish ~3h
<br />
Architecture and code structure choice is made to simplify transition from localstorage to real server.

## Scope of Work

### Core Features

- [x] Display a list of reports (table)
- [x] Search & filter reports by title
- [x] Create new reports (title + rich-text content)
- [x] Edit existing reports
- [x] Generate Draft button: AI generates a draft report based on a user-provided prompt
  - This replaces text in editor
- [x] Summarize Content button: AI summarizes existing report content
  - This adds text at the end
- [x] Reorder reports manually using **dnd-kit** (drag & drop)
      - this is not saved to the local storage like everything else!
- [x] Responsive and accessible UI built with **Material UI**

### State Management

- [x] React Query

### Rich-Text Editor

- [x] TinyMCE (or similar)

### AI Integration

- [x] OpenAI API

## Bonus Features

- [ ] User roles: Admin (create/edit/delete) & Viewer (view-only)
- [x] Activity tracking (e.g., created, edited, AI used)
- [x] LocalStorage for persistence

## Unanswered Questions

1. **State Management Approach**
   - I opted for **React Query** instead of Zustand.
2. **User/Admin Login**
   - How would you like to handle the user/admin switch? Separate login page or a toggle button on the UI?
3. **Drag & Drop + Filtering**
   - How should reordering behave when filters are applied?
4. **Persisting Order**
   - Should we save the report order state? If so, should it persist across reloads (e.g., via LocalStorage)?

## Setup Instructions

Environment Variables

Copy .env.example to .env

Add your OpenAI API key and tiny MCE key.

- VITE_OPENAI_API_KEY
- VITE_TINYMCE_EDITOR_API_KEY

Install dependencies

```bash
npm install
```

```bash
npm run dev
```

Created by Srdjan Rakić
