---
title: Building a Pocket E-Reader
date: 2026-08-14
description: Building a tiny e-paper reader from scratch.
tags: hardware, esp32, e-paper
---

One day I woke up and decided I wanted to build a tiny e-reader.

I feel like at this stage people usually ask why I don't just buy one and the answer for me is simple: I love to make my life as challenging as possible. 

In all seriousness, there's nothing I love more than a challenge and second to that I love learning how to build things. Theres no better feeling than when you're learning something completely new to you and suddenly things start to click.

## Proof of Concept

I like to start all my electronics projects by stripping the idea down to as few components as possible.

For most (if not all) electronics projects, you need a brain — a processor. I already had an Arduino Uno laying around, so the next things I figured I'd need were a small display and some buttons.

After some Googling and chats with ChatGPT, I settled on a very simple POC:

- an Arduino Uno
- some wires
- some buttons
- a 4.2" e-paper display

I had everything except the e-paper display.

I decided to save on costs by buying the display I was planning to use in the final product anyway. I'd eventually need a battery, some way to download e-books and a case for the whole thing, but all of that was beyond the POC.

The goal at this point was simple: can I display text on an e-paper screen and navigate through it using buttons?

I wasn't trying to build the finished e-reader yet. I just wanted to prove that the basic reading experience was possible with a handful of cheap components.

## Software

While I waited for the display to arrive, I started thinking about what the finished device would need to do.

Once I'd stripped the hardware down to its bare components, I did the same with the software. I started listing the features I definitely wanted in the end product:

- a way to download books
  - plugging the device or SD card into a computer
  - downloading over Wi-Fi
- reading books offline
- deleting books to free up space
- tracking progress across several books
- tracking the last opened book

I decided that downloading over Wi-Fi made the most sense.

For the UI, I wanted to follow some of the principles I'm used to from React. Rather than putting everything into one enormous C++ file, I wanted components, pages and views to be separate.

Before diving into the code, I decided to plan the UI in Figma.

## Design Demo

*Insert Figma/design demo here.*

## Hardware Testing

Once the display arrived, I started testing it with the Arduino Uno.

Getting simple text onto the screen was surprisingly straightforward. I could position text in different places, change the orientation and generally get the display doing what I expected.

Then I decided to try something slightly more useful.

I wanted to display an extract from *The Hobbit*.

That's when the POC started doing what I wanted it to do: tell me what I couldn't build with the hardware I had chosen.

## Roadblock 1: The limitations of the Uno

The Arduino Uno was good enough to prove that I could put text on an e-paper display, but it quickly became clear that it wasn't going to be the brain of the finished e-reader.

The biggest problem was memory. The Uno only has **2 KB of SRAM** to work with. To put that into perspective, a plain-text version of *The Hobbit* is roughly **300 KB** — around 150 times the size of the Uno's entire SRAM.

Obviously, I didn't need to load an entire book into memory at once (more on this later), but it gave me a good idea of just how constrained the Uno was. As soon as I started trying to work with larger amounts of text, I ran into problems.

The processor was another limitation. The Uno's ATmega328P runs at **16 MHz**. That's perfectly fine for simple things like reading buttons and drawing a few lines of text, but I wanted the finished e-reader to handle larger amounts of text, navigation and eventually Wi-Fi without feeling sluggish.

At this point, the POC had done its job.

I'd proved that I could display text on the e-paper screen and navigate through it. But trying to use longer pieces of text had also exposed the limitations of the Uno.

That meant I now had to make a decision about the hardware I wanted to build the actual e-reader around.

## Moving from POC to the real device

I eventually landed on the **Seeed Studio XIAO ESP32-S3**.

This was the point where the project started to become more than a POC. I still wasn't building the finished e-reader — there was no case, battery or custom PCB — but I was now building the software and hardware around the same architecture I intended to use in the final product.

The difference was pretty significant:

- **8 MB Flash** — persistent storage for the software and downloaded books. A plain-text copy of *The Hobbit* is roughly **300 KB**, so that's theoretically enough for around **25–27 books of that size**, before accounting for the space needed by the firmware and filesystem.
- **8 MB PSRAM** — additional working memory for the device while it's running.
- **240 MHz dual-core processor** — considerably more processing headroom than the Uno.
- **2.4 GHz Wi-Fi** — for downloading books.
- **USB-C** — for programming and eventually charging.
- **21 × 17.5 mm** — small enough to make the final device considerably more compact.

The Uno had answered the question: can I display text on an e-paper screen and navigate through it?

The ESP32-S3 let me start answering the much more interesting question:

Can I actually turn this into an e-reader?

While I waited for it to arrive, I continued building the UI on the Uno. I already had the header and footer working and was using `/16` in the layout code to divide the display into sections.

Once the ESP32-S3 arrived, the project could finally move forward using the hardware that would eventually become the basis of the finished device.

## Roadblock 2: The ESP32-S3

After making some decent progress with the UI, I hit another roadblock.

I needed to solder header wires onto the ESP32-S3.

Normally this wouldn't be much of an issue, except I'd lent my soldering kit to someone and had to wait a couple of days to get it back.

Not exactly a technical blocker, but it stopped the project in its tracks anyway.

## Getting the ESP32-S3 working

When I finally got my soldering kit back, I was determined not to rush things.

I'd had such a hard time getting the ESP32-S3 working previously that I wanted to make sure I didn't cut any corners this time.

I worked through it step by step:

- tested every pin
- checked adjacent connections
- tested uploading code to the ESP32
- tested it with some buttons
- tested it with the e-paper display
- displayed simple text
- finally uploaded the e-reader code

And then it worked.

The display turned on, the buttons worked and the ESP32 was running the e-reader.

I immediately tried uploading the extract of *The Hobbit* again.

It worked perfectly.

That was probably the most satisfying moment of the project so far. I'd gone from a few buttons and some text on an Arduino Uno to actually reading a book on a device I'd built myself.

## Feature development

Now that I'd gotten the ESP32 working, it was time to actually build the software.

This was a massive chunk of the entire project. I'd put together a simple design, but implementing all of the features while following good architectural practices as I built out the software would take some time.

I used ChatGPT to plan the development out in stages based on my MVP, then implemented each stage with Codex.

As a reminder, my MVP was:

- download books over Wi-Fi
- read books offline
- delete books to free up space
- track progress across several books
- track the last opened book

When developing with an AI agent, it becomes pretty foolish to ask it to build everything in one go. Codex still required some babysitting, and I wanted to keep track of the changes it was making before committing them.

This ultimately involved a lot of refactoring, but was still a lot easier than developing it all myself.

The development stages went roughly like this:

- build the base components: header, footer and content
- build the pages: startup, main menu and its sub-pages
- add button functionality: lists of options and the ability to navigate between pages by selecting them

That was the basics done. I then moved on to the more complex features:

- display a book from a `.txt` file stored locally
- navigate pages, track reading progress and remember the last opened book
- connect to Wi-Fi using a development file containing network details and remember known networks
- connect to Wi-Fi through a server hosted by the ESP32, using another device to enter the network details — avoiding the nightmare of typing a Wi-Fi password with three e-reader buttons
- start a local development server to serve `.txt` files
- fetch a manifest from the server and download books
- improve diagnostics and feedback to the user

Once I'd tested everything with a `.txt` file roughly the size of a medium-to-long book, feature development was done!

I've also been trying to keep track of roughly how long this project is taking me. So far:

- Arduino Uno and e-paper POC: ~4–8 hours
- ESP32-S3 setup and testing: ~3–5 hours
- Feature development: ~16 hours
- **Total so far: ~23–29 hours**

The earlier stages are very rough estimates, but I'm curious to see how much time I've spent on the entire thing once it's finished.

I still didn't love the design, but it was good enough to be functional. After fiddling with it for a while, I'd decided it was taking up more time than I was willing to spend on it for now. I'd come back to it once I had the basic functional product in a production-ready state.

That got me thinking about software updates.

It'd be a pain to connect the e-reader to my PC every time I wanted to update the code. Then it hit me: with Wi-Fi already configured, I could have the e-reader fetch its own updates.

For now, though, I'd come back to that as a nice extra.

## What's left

At this point, the actual feature development is basically complete. There are only a couple of software decisions left:

- [ ] Figure out how I want to host the book server
- [ ] Implement a way to configure the server URL and other settings in case they change

With my recent interest in home servers, I already knew I wanted to run a private book server. I just had to figure out exactly how.

Most of the remaining work is now hardware:

- [ ] Buy and connect a battery
- [ ] Test charging and switching the device on and off
- [ ] Implement hold Select to sleep/power
- [ ] Figure out the final e-paper display wiring without the development module
- [ ] Decide whether I actually need a custom PCB
- [ ] Design and print the enclosure

The project has changed quite a bit since I first wrote my "next steps". The software I thought was still far away is now mostly done, and I've reached the point where I need to turn the collection of boards, wires and buttons on my desk into an actual e-reader.

For now, though, I have a working e-reader that can download books over Wi-Fi, store them locally and remember where I left off.

That's a pretty good place to be.
