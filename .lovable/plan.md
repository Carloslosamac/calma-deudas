# Make Andrés look as real as Noemi

## The real problem
Noemi's photo reads as authentic because it's a genuine front-camera selfie: **everything is in focus** (sharp background — mirror, coat rack, curtains), flat even selfie lighting, neutral phone-HDR color, square 1:1 framing, arm's-length angle.

Andrés's photo reads as AI/stock because it has **shallow depth of field (blurred bokeh background)** plus soft cinematic directional lighting and over-rendered micro-detail. Phone front cameras don't produce that bokeh. This is the giveaway — not the light quality we've been chasing.

## Fix
Regenerate `src/assets/casos/andres-madrid.jpg` to match Noemi's selfie aesthetic, keeping the same man, face, and home so it stays consistent with prior approvals.

Key prompt changes vs. previous attempts:
- **Deep depth of field — entire frame in sharp focus**, background NOT blurred, no bokeh, no shallow DOF (this is the #1 fix).
- Genuine arm's-length front-camera selfie, slight selfie wide-angle, one shoulder/arm slightly closer to camera.
- Flat, even, uniform front-camera lighting with phone HDR; no directional/cinematic falloff, no creamy skin gradients.
- Neutral/slightly cool flat phone color, ordinary auto white balance.
- Mid-range smartphone front-camera quality: a bit flat, mild noise, no DSLR rendering, no beauty filter, authentic skin texture.
- Lived-in but ordinary home background (sofa / room), naturally sharp like Noemi's.

## Format
- Aspect ratio **1:1 (square)** to mirror Noemi's framing — instead of the current tall 2:3.

## Technical detail
- Use `imagegen--edit_image` on the existing `src/assets/casos/andres-madrid.jpg` (or regenerate) with `aspect_ratio: "1:1"`, applying the deep-focus / flat-selfie prompt above. No code changes needed — the post already imports this path.
- After generating, visually compare side by side with `lso-1.jpg` (Noemi) and confirm the background is in focus before locking in.
