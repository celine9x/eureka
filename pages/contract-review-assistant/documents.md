# Prompt: generate the redlined export .docx

Copy everything below this line and give it to a fresh Claude Code session
(with access to this repo) as its task.

---

## Task

Generate a real Word `.docx` file with genuine tracked changes (Word's
`w:ins`/`w:del`, not just plain accepted text) and genuine Word comments,
and save it to:

```
pages/contract-review-assistant/Collaboration-License-Agreement-REDLINE.docx
```

This **overwrites the file already at that path**. Do not change any app
code — `pages/contract-review-assistant/review.jsx` already imports this
exact file and downloads it as-is when the user picks "Redlined version" in
the Export modal (see `redlinedContractFile` / `handleExportContract`), so
replacing the file's contents is the entire integration. The current file
at that path is an unrelated placeholder doc from earlier work; it does not
reflect this contract's content or these findings at all, so don't try to
preserve anything from it.

## Base document

Start from this repo's **`pages/contract-review-assistant/License_Agreement_DRAFT_Meridian_Helios.docx`**
— it's the real source contract (Helios Pharma / Meridian Bio license
agreement), already has correct Heading1/Heading2 styles, the 5 tables, and
Times New Roman throughout. Do not regenerate the document from scratch —
build the redline by editing this file's own OOXML directly, so all
existing content, formatting, and tables are preserved untouched except at
the 3 specific edit points below.

A `.docx` is a zip of XML parts. The practical approach:

1. Unzip the base file.
2. Edit `word/document.xml` to inject tracked-change markup at the 3
   locations below.
3. Add/update `word/comments.xml` with the 3 comments below, anchored at
   the same 3 locations via `w:commentRangeStart`/`w:commentRangeEnd`/
   `w:commentReference`.
4. If `word/comments.xml` doesn't already exist in the base file: add it,
   declare it in `[Content_Types].xml`
   (`<Override PartName="/word/comments.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml"/>`),
   and add the relationship in `word/_rels/document.xml.rels`
   (`Type=".../comments"`, `Target="comments.xml"`).
5. Rezip into a valid `.docx` at the output path above.

Most docx-generation libraries (python-docx, most npm `docx` packages)
don't support real tracked changes or comments well — hence editing the
OOXML directly rather than generating through a library.

**Good news on locating the 3 edits:** each one already sits in its own
single, isolated `<w:r>` run in `word/document.xml` — conveniently, all 3
were already highlighted yellow in the source document
(`<w:rPr><w:highlight w:val="yellow" /></w:rPr>`), immediately after a
small separate run containing just the clause number, e.g.:

```xml
<w:r><w:rPr /><w:t xml:space="preserve">17.1 </w:t></w:r><w:r w:rsidRPr="48167B0A" w:rsidR="007C7E8B"><w:rPr><w:highlight w:val="yellow" /></w:rPr><w:t>Assignment. LICENSEE may not assign...Change in Control.</w:t></w:r>
```

So for each edit: search `word/document.xml` for that one highlighted
run's text (`UNCHANGED_START` below is the start of it), and replace that
single `<w:r>` element with a sequence of sibling `<w:r>`/`<w:del>`/
`<w:ins>` elements splitting its text at the boundaries given below — you
do **not** need to hunt across multiple runs or paragraphs for these 3
specifically (other parts of the document do split sentences across
several runs; these 3 target clauses happen not to). Give the
unchanged-start and unchanged-end runs the same
`<w:rPr><w:highlight w:val="yellow" /></w:rPr>` as the original run, so the
surviving original text keeps its highlight. Whether the newly-inserted
`w:ins` text also carries that highlight or renders plain is your call —
just be consistent across all 3.

**Author/date for every tracked change and every comment:** author
`Julie Settipani`, date = the actual date you run this (ISO 8601 UTC, e.g.
`2026-09-16T00:00:00Z` — use today's real date, not this example). She's
the app's logged-in reviewer (see the `user` prop in
`pages/contract-review-assistant/review.jsx`'s `<SideMenu>`), and she's the
one who applied these suggestions in-app, so both the edits and the
comments should be attributed to her consistently.

## The 3 edits

Each one is a word-level diff already computed by the app itself (the same
algorithm the app uses to render its own redline preview — see
`tokenizeForRedline`/`createRedlineHtml` in
`library/organisms/document-viewer/document-viewer.jsx`), so these
boundaries are exact — don't recompute or rephrase them. For each: within
the single highlighted run identified above, split its text at the given
boundaries into (in order): a plain/highlighted run for `UNCHANGED_START`,
a `w:del` run for `REMOVED` (omit this element entirely if `REMOVED` is
empty — 2 of the 3 edits below are pure insertions with nothing removed),
a `w:ins` run for `ADDED`, and a plain/highlighted run for `UNCHANGED_END`.
Anchor a comment (`commentRangeStart`/`commentRangeEnd`/`commentReference`)
around the `w:ins` run in each case.

### Edit 1 — Section 5.2.1 (Milestone Payments notice)

- UNCHANGED_START: `"Milestone Payments. In further consideration of the licenses and rights granted to LICENSEE, "`
- REMOVED (wrap in `w:del`): `"within sixty (60) days after achievement of each Milestone set forth below (unless otherwise specified below), LICENSEE shall, subject to Section 1.6, pay to MERIDIAN the corresponding non-creditable and non-refundable milestone payment (each, a \"Milestone Payment\")"`
- ADDED (wrap in `w:ins`): `"LICENSEE shall notify MERIDIAN in writing within ten (10) business days after achievement of each Milestone, and within sixty (60) days after such achievement, LICENSEE shall, subject to Section 1.6, pay to MERIDIAN the corresponding non-creditable and non-refundable milestone payment (each, a \"Milestone Payment\"), together with reasonable supporting documentation evidencing such achievement"`
- UNCHANGED_END: `". For the avoidance of doubt each Milestone Payment shall be payable only once upon achievement of the applicable Milestone."`
- **Comment text** (attach to the `w:ins` above): "Confirm with the deal team whether ten business days is the right notice window, and whether MERIDIAN's finance/alliance management team should be a required notice recipient alongside the primary contract notice address."

Note: in the base file, the clause-number run is `<w:t xml:space="preserve">5.2.1 </w:t>`, and the highlighted run right after it starts with `Milestone Payments.` (not `5.2.1 Milestone Payments.`) — the `5.2.1 ` prefix is in the separate, earlier run and should be left untouched.

### Edit 2 — Section 4.1.1 (Development diligence standard)

- UNCHANGED_START: `"LICENSEE shall itself, or through its Affiliates or Sublicensees, use Commercially Reasonable Efforts"`
- REMOVED: *(empty — no `w:del` needed, this edit is a pure insertion)*
- ADDED (wrap in `w:ins`): `", including maintaining at least the equivalent of two (2) full-time employees dedicated to Development of the Products until the first Regulatory Approval,"`
- UNCHANGED_END: `" to Develop Products in the Major Markets in the Field, and LICENSEE shall undertake all Development activities relating to the Compounds and Products in the Field at its sole expense"` (this highlighted run ends here, immediately followed by a separate, unhighlighted run starting with `. Without limiting the foregoing...` — leave that next run untouched)
- **Comment text**: "Confirm with the deal team whether a minimum FTE commitment (or a defined spend floor) is the preferred way to make this diligence obligation measurable, given how easily a slowdown can go unreported internally, as in the ISS-2291 milestone-notice gap."

Note: same pattern as Edit 1 — the clause-number run `<w:t xml:space="preserve">4.1.1 </w:t>` is separate and comes right before this highlighted run; leave it untouched.

### Edit 3 — Section 17.1 (Assignment / Change of Control)

- UNCHANGED_START: `"Assignment. LICENSEE may not assign its rights and obligations under this Agreement without MERIDIAN' prior written consent, except that: (a) LICENSEE may assign its rights and obligations under this Agreement in whole or in part to one or more of its Affiliates without the consent of MERIDIAN; and (b) LICENSEE may assign this Agreement in the event of a Change in Control"`
  (note the literal `MERIDIAN'` — that's a typo in the source contract itself; reproduce it exactly, don't "fix" it)
- REMOVED: *(empty — pure insertion)*
- ADDED (wrap in `w:ins`): `", provided that the acquiring party is not a direct competitor of MERIDIAN in the Field; if the acquiring party is a direct competitor of MERIDIAN in the Field, such assignment shall require MERIDIAN's prior written consent, not to be unreasonably withheld"`
- UNCHANGED_END: `"."` (this highlighted run ends with that period, immediately followed by a separate, unhighlighted run starting with ` LICENSEE shall provide MERIDIAN with prompt written notice...` — leave that next run untouched)
- **Comment text**: "Confirm with the deal team how \"direct competitor\" should be defined for this carve-out, and whether MERIDIAN should also have a termination or renegotiation right rather than only a consent right."

Note: same pattern again — the clause-number run `<w:t xml:space="preserve">17.1 </w:t>` is separate and comes right before this highlighted run; leave it untouched.

## Verification (do this before finishing)

- Unzip the output file and confirm `word/document.xml` and
  `word/comments.xml` are well-formed XML (e.g. parse them with any XML
  parser — they should not error).
- Confirm exactly 3 `w:ins` elements, exactly 1 `w:del` element (Edit 1
  only), and exactly 3 comments in `word/comments.xml`, each attributed to
  `Julie Settipani`.
- Confirm `[Content_Types].xml` and `word/_rels/document.xml.rels`
  correctly reference `word/comments.xml` (skip if the base file already
  had a comments part).
- Confirm nothing else in the document changed — all other sections,
  headings, and all 5 tables (Development/Regulatory/Sales Milestones,
  Patent Schedule, IND Submission Log) should be byte-identical to the base
  file except for the 3 edits above.
- If Word, LibreOffice, or another OOXML-aware tool is available in your
  environment, actually open the result and confirm it loads without a
  "found unreadable content, repair?" prompt, and that Word's Review pane
  shows exactly 3 tracked changes and 3 comments authored by Julie
  Settipani. If no such tool is available, say so explicitly rather than
  claiming this was verified — XML well-formedness is necessary but not
  sufficient proof that Word will accept the file.
