# MSBTE Scholar 2.0 - Blogger Theme & CMS Suite

Is folder me Blogger se related saari files aur scripts hain:

## Files:
- **`msbtescholar-theme.xml`**  
  Ye aapka final, production-ready, fully-functional Blogger Theme XML hai.
- **`msbtescholar-theme.backup.xml`**  
  Aapka purana original Blogger theme backup.

---

## How to Upload to Blogger (Step-by-Step):
1. **Blogger Dashboard** (`blogger.com`) open karein.
2. Left sidebar se **Theme (थीम)** par click karein.
3. **Customize** button ke bagal me bane arrow (`▼`) par click karein.
4. **Restore (पुनर्स्थापित करें)** select karein (ya **Edit HTML** me jaakar poora code paste karein).
5. File choose karte waqt is folder se **`msbtescholar-theme.xml`** select karein.
6. **Save** par click karein.

---

## How CMS Works in this Theme:
1. **Homepage (`/`):**  
   - Full MSBTE Scholar 2.0 interactive portal load hota hai (Dashboard, Study Material with Branch/Semester filter, Mock Tests quiz engine, Jobs, Capstone Projects, Community, Mobile Shell).
   - Real-time Blogger Feed sync: Jab aap Blogger par naye post likhenge, woh Homepage ke "Updates" aur "Study Material" me automatically show honge!
2. **Single Article / Post (`/2026/...html` ya `/p/...html`):**  
   - Blogger ka real post content (`<data:post.body/>`), title, date, author aur labels MSBTE Scholar 2.0 ke styled layout me display hota hai.
   - 1-Click WhatsApp share button aur Blogger threaded comments system active rehta hai.

---

## How to Re-build Theme:
Jab bhi aap `src/` me koi component ya styling change karein:
\`\`\`bash
npm run build:blogger
\`\`\`
Ye command Next.js export karega, Tailwind CSS compile karega, aur automatically `blogger-theme/msbtescholar-theme.xml` ko update kar dega!
