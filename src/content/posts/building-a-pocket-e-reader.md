---
title: Building a Pocket E-Reader
date: 2026-08-14
description: Building a tiny e-paper reader from scratch.
tags: hardware, esp32, e-paper
---

I wanted to build myself a tiny e-reader.

Not a Kindle replacement. Just something small, simple and a little bit personal that could hold a handful of books and remember where he left off.

## The idea

The original requirements were pretty minimal:

- an e-paper display
- physical buttons
- a small enough case to carry around
- no unnecessary apps or distractions
- books stored directly on the device

I also wanted it to feel like a finished object rather than a development board with a screen attached to it.

## The hardware

I'm currently using:

- Seeed XIAO ESP32-S3
- 4.2" Waveshare e-paper display
- three physical buttons
- rechargeable battery

I originally prototyped everything with an Arduino Uno, which was useful for proving the display and controls worked, but memory became a limitation pretty quickly.

Moving to the ESP32-S3 gives me much more room for the actual reader UI, Wi-Fi and book storage.

## The software

The reader is deliberately simple.

The current screens are:

1. Main menu
2. My books
3. Add books
4. Reader

Books are plain text for now.

That means I don't need to solve EPUB rendering, CSS layouts or DRM. The device only needs to paginate text and remember the current page.

## What I'm figuring out

The interesting part has been discovering that building the physical object isn't really separate from building the software.

Changing the number of buttons changes the navigation model.

The refresh behaviour of e-paper changes how I design the UI.

Limited power changes how often the device should wake up.

Every little hardware constraint ends up becoming a software design decision.

That's probably the part I've enjoyed most.
