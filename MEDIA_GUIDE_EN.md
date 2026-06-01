# Media Guide for Content Managers

This document describes which images to upload through the admin panel and with what parameters.

---

## 1. Company Logo

| Parameter | Value |
|---|---|
| Recommended size | **300×300 px** |
| Minimum size | 170×170 px |
| Format | PNG (with transparent background) or JPG |
| Maximum file size | 200 KB |

**How it looks:** displayed in the header and footer as a circle. The image is automatically cropped to a circular mask.

> The logo must be **square** (equal width and height), otherwise it will be distorted.

---

## 2. Product Photo

| Parameter | Value |
|---|---|
| Recommended size | **900×600 px** |
| Minimum size | 610×406 px |
| Aspect ratio | **3:2** (landscape) |
| Format | JPG or WebP |
| Maximum file size | 500 KB |

**Where it appears:**
- Product card in the catalog (305×203 px, fills the container)
- Individual product page (large full-width photo)
- Product modal window (cropped by height using `object-cover`)
- Cart thumbnail (85×56 px, cropped using `object-cover`)

> Avoid excessive whitespace around the dish — fill as much of the frame as possible.

---

## 3. Ingredient / Component Icons

| Parameter | Value |
|---|---|
| Recommended size | **110×76 px** |
| Minimum size | 55×38 px |
| Aspect ratio | **~3:2** (landscape) |
| Format | PNG (with transparent background) or WebP |
| Maximum file size | 50 KB |

**Where it appears:**
- Below the product photo in the card (small ingredient icons with labels)
- On the product page (ingredient list)
- In the product modal window (tooltip)

> Background must be transparent. The image should look good on both dark and light backgrounds.

---

## 4. Slider Banner (Home Page)

### 4a. Banner Background Image

| Parameter | Value |
|---|---|
| Recommended size | **1440×330 px** |
| Minimum size | 1024×330 px |
| Aspect ratio | Wide format (approx. 4:1) |
| Format | JPG or WebP |
| Maximum file size | 800 KB |

> The image stretches to the full banner width and is cropped to a height of 330 px. Keep the key content in the center so it is not cropped on narrow screens.

### 4b. Banner Overlay Image (dish on top of background)

| Parameter | Value |
|---|---|
| Recommended size | **600×460 px** |
| Minimum size | 300×230 px |
| Format | PNG (with transparent background) |
| Maximum file size | 300 KB |

> This image is layered on top of the background banner. A transparent PNG background is required — otherwise a white rectangle will cover the background image.

---

## 5. Category Icons (Navigation Menu)

| Parameter | Value |
|---|---|
| Recommended size | **120×96 px** |
| Minimum size | 60×48 px |
| Aspect ratio | **5:4** |
| Format | PNG (with transparent background) or WebP |
| Maximum file size | 80 KB |

**Where it appears:** horizontal navigation below the header — icon + category name.

---

## General Recommendations

### Formats
| Format | When to use |
|---|---|
| **JPG** | Food photos, banners (no transparent background needed) |
| **PNG** | Logo, ingredient icons, overlay images (transparent background required) |
| **WebP** | Best choice for anything — smaller file size at the same quality |
| **SVG** | Only for simple icons and category icons (not for photos) |

### Quality & Optimisation
- Save JPG at **80–85% quality** — optimal balance of quality and file size
- Do not upload images larger than **1 MB** — it slows down page loading
- Use Latin characters without spaces in file names: `chicken-noodles.jpg`, not `Chicken Noodles.jpg`

### Colour Space
- Use **sRGB** (web standard)

---

## Quick Reference

| What to upload | Size | Format |
|---|---|---|
| Logo | 300×300 | PNG |
| Product photo | 900×600 | JPG / WebP |
| Ingredient icon | 110×76 | PNG (transparent background) |
| Banner — background | 1440×330 | JPG / WebP |
| Banner — overlay photo | 600×460 | PNG (transparent background) |
| Category icon | 120×96 | PNG / WebP |
