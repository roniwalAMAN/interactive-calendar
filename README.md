# Interactive Calendar Component

A polished, responsive wall calendar inspired UI built with Next.js App Router, TypeScript, and Tailwind CSS.

This component combines a visual monthly hero panel with an interactive calendar grid, date range selection, and persistent notes for practical day-to-day planning.

## Features

- Wall calendar inspired layout with a monthly hero image and calendar panel.
- Interactive date range selection:
  - Start date selection
  - End date selection
  - Highlighted in-between range
- Visual states for today, selected range, and disabled past dates.
- Notes section with localStorage persistence.
- Month navigation with smooth transition effects.
- Fully responsive design for desktop and mobile screens.
- Subtle month-wise theming and polished UI interactions.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hooks (state and effects)
- localStorage for client-side persistence

## Screenshots

Add screenshots here after capturing your UI:

- Desktop View: `./screenshots/desktop.png`
- Mobile View: `./screenshots/mobile.png`
- Date Range Selection: `./screenshots/range-selection.png`
- Notes Persistence: `./screenshots/notes.png`

Example markdown:

```md
![Desktop View](./screenshots/desktop.png)
![Mobile View](./screenshots/mobile.png)
```

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open in browser:

```text
http://localhost:3000
```

## Usage

1. Navigate months using left and right arrow controls.
2. Select a date range:
	- First click sets start date.
	- Second click sets end date.
	- Dates in between are automatically highlighted.
3. Click outside the card area (or press Escape) to clear current selection.
4. Add notes:
	- If a date is selected, notes are saved for that date.
	- If no date is selected, notes are saved at month level.
5. Reload the page to verify notes are restored from localStorage.

## Folder Structure

```text
interactive-calendar/
├─ app/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ public/
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Future Improvements

- Add keyboard navigation across dates using arrow keys.
- Add accessibility enhancements (ARIA announcements for range updates).
- Support event badges and custom reminders per date.
- Add export/import notes functionality.
- Add optional dark mode and custom theme picker.

## Live Demo

Live URL: https://your-live-demo-link.vercel.app

Replace the placeholder link with your deployed project URL.
