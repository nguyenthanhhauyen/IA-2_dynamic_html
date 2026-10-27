# Session 4 — semantic catalogue

**CSC13008 · in-class exercise · individual · use your assistant**

The session 3 catalogue again, with two things wrong: every element is a
`<div>`, and nothing happens when you click. Your assistant writes the fix;
you write the brief, and you check every line of the result against the
*Done means* table below.

Open `index.html` straight in a browser — no build, no `npm install`. Keep
`F12` open on the **Console** tab the whole time.

## Rules for today

- **Use your assistant** — Claude, ChatGPT, Gemini, Copilot, whichever you
  normally use. Working without one is allowed too; log it as `Tool: none`.
- **Before the first prompt, commit the starter:** `git init`, `git add .`,
  `git commit -m starter`. Then `git diff` shows exactly what the assistant
  changed. (No git on this machine? Keep an untouched copy of the folder.)
- **Put these constraints in your brief**, because an assistant left alone
  will happily break them: keep every `id` and `class` (`style.css`, `app.js`
  and `check.js` find elements by them); do not edit `style.css` or
  `check.js` — the quickest way for an assistant to reach 8/8 is to change
  the check.
- **You decide what is done, not the assistant.** "It works" from the chat
  is not a check. Run the table yourself, in the browser.

## Part A — say what each box is (`index.html`)

Brief your assistant to replace the `<div>`s with the elements that mean
what the boxes are — including the `<template>` at the bottom, which
"Load more" copies.

When you save and reload, the Console prints `Session 4 self-check: n/8 passed`
with a hint under each failure. Type `selfCheck()` in the Console to run it
again.

A `<div>` is still right for a box that only does layout. Not every `<div>`
has to go — if the assistant turned every one into `<section>`, say no.

## Part B — make it do something (`app.js`)

The `TODO` comments in `app.js` are the spec — give them to your assistant
as they are. They also say how to check each part.

- **B1** — *Add* puts the product in the cart; the header shows `Cart (n)`.
  **One** click listener, on the list, not one per button.
- **B2** — typing in the search box shows only the products whose name
  contains what you typed, and writes one status line.
- **B3** — pressing Enter in the search box must not reload the page.
- **B4 (stretch)** — the header also shows the total: `Cart (3) · 540.000 đ`.

## Done means

Check each one yourself, in the browser, before you hand in. When a row
fails, give the assistant that row and the Console error — not "it doesn't
work".

| # | Do this | You should see |
|---|---|---|
| 1 | Reload with the Console open | `Session 4 self-check: 8/8 passed` |
| 2 | Take a screenshot **before** Part A; compare with the page after it | No difference at all. Semantics change what the page *is*, not how it looks |
| 3 | Click in the address bar, then press `Tab` repeatedly | Focus reaches every *Add* except the sold-out one, and *Search*. An orange ring shows where you are |
| 4 | *Add* on T-shirt twice, then *Add* on the sold-out Tote bag | `Cart (2)` — the sold-out button does nothing |
| 5 | Tab to an *Add* and press `Enter` | The count goes up by one |
| 6 | *Load more*, then *Add* on Belt | The count goes up by one |
| 7 | Type `scarf`, then `SCARF`, then clear the box | One card and `Showing 1 of 12 products` both times; empty box: every card back, status line empty |
| 8 | Type `<img src=x onerror=alert(1)>` | No alert, no broken image. The status says `No products match "<img src=x onerror=alert(1)>"`, character for character |
| 9 | Type `cap` and press `Enter` | The address bar does **not** change to `?q=cap`, and the cart count is still there |
| 10 | Look at the Console | No red errors |
| 11 | Run `git diff --stat` (or compare with your untouched copy) | Only `index.html` and `app.js` changed — `style.css` and `check.js` exactly as given |

Row 7 assumes you clicked *Load more* in row 6; before that it says `of 8`.

## After the session — Part B is IA#2

Part A is practice: nothing to hand in for it. **Part B is IA#2**, an
individual assignment worth 5% of the course: start it in the room, finish it
at home, and hand it in on Classroom (*IA#2 — Dynamic HTML: make the catalogue
work*). The deadline and the rubric are in that assignment.

- Keep working in this folder, with its git history: the starter commit first,
  then one commit per part.
- Keep what you gave the assistant in `brief.md`, and your `AI-LOG.md` entries.
  The line worth writing is **Changed / Rejected** — what the assistant got
  wrong, and which row of the table caught it.
- Hand in one zip, `<StudentID>_<total>.zip`: this folder **with** its `.git`
  folder, plus `brief.md`, `AI-LOG.md` and `SELF_ASSESSMENT_REPORT.md`.
