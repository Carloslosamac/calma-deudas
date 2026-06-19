## Goal

Lock in ONE reusable prompt formula that reproduces the look of the reference selfie (Noemí), then generate each case portrait with it — one at a time, waiting for your OK before the next.

## What makes the reference work (the style we're codifying)

- True arm's-length **front-camera selfie**, close crop, face fills most of the frame
- **No phone or arm shown** in frame (held out of view)
- Real lived-in home background, softly out of focus
- Natural daylight from a window, slightly warm, uneven — no studio lighting
- Authentic skin: pores, fine lines, no retouching, no makeup glam
- Relaxed half-smile, looking straight into the lens
- Looks like a genuine iPhone selfie someone would send on WhatsApp
- Square-ish / vertical framing, head-and-shoulders

## Master prompt template (reusable)

> Authentic arm's-length selfie of a Spanish {GENDER}, {AGE} years old, {HAIR}, {DISTINGUISHING FEATURES}, no makeup / natural look. Real iPhone front-camera selfie taken at home, close head-and-shoulders crop, face filling most of the frame, phone and arm NOT visible. Sitting or standing in a lived-in {ROOM} with a softly blurred everyday background. Warm natural window daylight, slightly uneven, no studio lighting, no professional setup. Authentic skin texture with pores and fine lines, no retouching, no beauty filter. Relaxed, genuine half-smile, calm and relieved expression, looking directly into the camera. Casual everyday clothes ({CLOTHES}). Looks exactly like a real selfie someone would send on WhatsApp. Slight phone-camera grain, neutral-to-warm natural color tones. Vertical portrait.

Only the bracketed fields change per case (gender, age, hair, features, room, clothes). Everything else stays fixed to keep the set consistent.

## Per-case variable sheet (proposed)

```text
Case            Gender  Age    Setting / notes
--------------  ------  -----  -----------------------------
andres-madrid   M       ~50    living room, plain shirt  (redo in selfie style)
carmen-murcia   F       ~44    kitchen/home  (redo in selfie style)
hugo-malaga     M       ~40    home/car  (redo in selfie style)
lorena-valencia F       35-38  kitchen  (redo in selfie style)
antonio-sabadell M      50-55  home  (redo in selfie style)
gonzalo-sevilla M       ~45    living room
manuel-granada  M       ~50    home
marina-bilbao   F       ~40    home
patricia-vallad F       ~38    home
pilar-valencia  F       ~45    home
ruben-madrid    M       ~35    home
sergio-alicante M       ~40    home
sonia-valencia  F       ~45    home
victor-madrid   M       ~50    home
noemi-barcelona F       —      REFERENCE, already perfect, leave as is
```

## Workflow

1. Generate ONE case using the master template with that case's variables (premium Gemini image model, vertical 2:3).
2. Show it to you for approval.
3. On your OK, overwrite that case's existing `src/assets/casos/{slug}.jpg` (filename unchanged, so imports keep working) and move to the next.
4. Repeat down the list.

## Open questions before I start

- Do you want me to **redo the 5 already-generated ones** (andres, carmen, hugo, lorena, antonio) in this unified selfie style too, or keep those and only do the remaining 9?
- Any cases that should NOT be a selfie (e.g. someone outside a shop/workshop), or should the whole set be consistent selfies?

## Technical notes

- Images saved to existing paths in `src/assets/casos/`; no code/import changes needed since filenames stay the same.
- Model: `premium.gemini` (Nano Banana 2) at 832x1248 (2:3).
