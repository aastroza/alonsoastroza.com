---
title: "How Codex helped me build a combo deck for a new Magic: The Gathering card"
description: "A Magic deckbuilding story that doubles as a practical Codex workflow: skills, Scryfall, subagents, and a deterministic Shang-Chi combo."
draft: false
pubDatetime: 2026-06-21T00:00:00Z
tags:
  - ai
  - codex
  - magic-the-gathering
  - scryfall
---

This weekend, Magic: The Gathering's new Marvel Super Heroes set came out. A friend sent me [Shang-Chi, Master of Kung Fu](https://scryfall.com/card/msh/187/shang-chi-master-of-kung-fu) and told me, "Alonso, you should play a combo deck with this. I do not know what the combo is, but you should find one."

I love creature-based combo decks, and green is my favorite color in Magic. Shang-Chi also has the kind of text that gets deckbuilders thinking. He lets you activate creature abilities as though those creatures had haste, and he taps for two mana that can be spent on creature-source abilities.

That was enough to start digging.

<figure>
  <a href="https://scryfall.com/card/msh/187/shang-chi-master-of-kung-fu">
    <img src="https://cards.scryfall.io/normal/front/2/e/2edbb62f-ad45-4422-850b-68dcc18b4c73.jpg?1780920091" alt="Shang-Chi, Master of Kung Fu Magic card" loading="lazy" style="max-width: 360px; width: 100%; margin: 0 auto; border-radius: 12px;" />
  </a>
  <figcaption>Shang-Chi was the starting point. The question was whether his text had a real deterministic combo behind it.</figcaption>
</figure>

I have also been away from competitive Magic tournaments for years, so I did not trust myself to start from memory. Instead, I used Codex and forced the process to start with evidence.

## The Scryfall skill

[Codex](https://developers.openai.com/codex/quickstart) is OpenAI's agent tool. It can use AI models like ChatGPT, but it can also work with files, tools, commands, and reusable instructions. If you want to try it, start with the official Codex quickstart.

In Codex, a [skill](https://developers.openai.com/codex/skills) is a small playbook for a specific kind of work. It can tell Codex how to use a tool, what assumptions to avoid, and what workflow to follow.

For this project, I created and used a [Scryfall API skill](https://github.com/aastroza/codex-skills/tree/main/mtg/scryfall-api).

If you do not play Magic, [Scryfall](https://scryfall.com/) is an online database for Magic cards. It has exact card text, card types, format legality, printings, and other details. That matters because Magic is a game where one word can change whether a combo works.

Codex needed Scryfall as its source of truth.

The easiest way to install the skill is to give Codex the link and ask it to install it:

```text
Install this Codex skill and verify that it works:
https://github.com/aastroza/codex-skills/tree/main/mtg/scryfall-api
```

In Codex, I selected it by typing the at sign, `@`, and choosing the Scryfall skill before writing the prompt.

## Do not build the deck first

My first prompt was narrower: prove that a combo exists before building the deck.

A decklist can hide weak thinking. It can look plausible while being built around an interaction that does not actually work, costs too much mana, or needs too many pieces.

So I gave Codex this prompt:

```text
Use Scryfall as the source of truth.

I want to investigate Shang-Chi, Master of Kung Fu as a possible Standard combo card. Do not build a decklist yet.

Search Standard and future-legal cards for deterministic or near-deterministic combo routes involving Shang-Chi. Look for creatures, artifacts, Equipment, enchantments, activated abilities, untap effects, cost reducers, and payoff cards.

For each route:
- list the exact cards
- explain the rules interaction
- check format legality
- identify what makes the route win or fail
- reject lines that do not actually work

Return the strongest routes first and include Scryfall links for every card.
```

Codex searched Standard and future-legal cards. It looked at creatures, artifacts, Equipment, enchantments, activated abilities, untap effects, cost reducers, and payoff cards.

The best output was the filtering: Codex separated real routes from cards that only looked related.

## The loop

The card that made the loop possible was [Agatha's Soul Cauldron](https://scryfall.com/card/woe/242/agathas-soul-cauldron).

With [Sleep-Cursed Faerie](https://scryfall.com/card/woe/66/sleep-cursed-faerie) in the graveyard, Agatha's Soul Cauldron can exile it and put a +1/+1 counter on Shang-Chi. Because Shang-Chi now has a +1/+1 counter, the Cauldron gives him the Faerie's activated ability:

> `{1}{U}: Untap this creature.`

Shang-Chi can tap for two mana of any one color. That mana can only be spent on activated abilities of creature sources, but the untap ability is now on Shang-Chi himself. Agatha's Soul Cauldron also lets you spend mana as though it were mana of any color to activate abilities of creatures you control.

That gives you the first loop:

1. Tap Shang-Chi for two mana.
2. Spend that mana to untap Shang-Chi.
3. Tap him again.

By itself, that loop only breaks even on mana. It does not win the game.

The payoff is [Hawkeye's Bow](https://scryfall.com/card/msh/132/hawkeyes-bow).

Hawkeye's Bow says that whenever the equipped creature becomes tapped, it deals 1 damage to each opponent. If the Bow is equipped to Shang-Chi, the loop becomes lethal:

1. Tap Shang-Chi.
2. Hawkeye's Bow deals 1 damage.
3. Use Shang-Chi's mana to untap him.
4. Repeat.

<figure>
  <img src="/images/blog/shang-chi-codex/bow-discovery.png" alt="Codex identifying Hawkeye's Bow as the strongest Shang-Chi combo route" loading="lazy" style="border-radius: 12px; width: 100%;" />
  <figcaption>Codex caught the important detail: the loop breaks even on mana, but Hawkeye's Bow turns every tap into damage.</figcaption>
</figure>

Here are the core pieces visually:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(155px, 1fr)); gap: 0.9rem; margin: 1.5rem 0; align-items: start;">
  <a href="https://scryfall.com/card/msh/187/shang-chi-master-of-kung-fu"><img src="https://cards.scryfall.io/normal/front/2/e/2edbb62f-ad45-4422-850b-68dcc18b4c73.jpg?1780920091" alt="Shang-Chi, Master of Kung Fu" loading="lazy" style="border-radius: 10px; width: 100%;" /></a>
  <a href="https://scryfall.com/card/woe/242/agathas-soul-cauldron"><img src="https://cards.scryfall.io/normal/front/0/1/019b51b0-e5c6-4208-922b-7736686dddcd.jpg?1692939838" alt="Agatha's Soul Cauldron" loading="lazy" style="border-radius: 10px; width: 100%;" /></a>
  <a href="https://scryfall.com/card/woe/66/sleep-cursed-faerie"><img src="https://cards.scryfall.io/normal/front/3/1/31051436-68f2-457e-8293-2b10ccf7684e.jpg?1692937247" alt="Sleep-Cursed Faerie" loading="lazy" style="border-radius: 10px; width: 100%;" /></a>
  <a href="https://scryfall.com/card/msh/132/hawkeyes-bow"><img src="https://cards.scryfall.io/normal/front/4/8/485be72b-d784-4886-bb3a-48cff8f781c6.jpg?1780919849" alt="Hawkeye's Bow" loading="lazy" style="border-radius: 10px; width: 100%;" /></a>
</div>

That is the result I wanted: a rules-based loop instead of cards that merely shared words.

## Compare routes before choosing one

After the first search, I asked Codex to compare the surviving routes before writing a list.

I used this prompt:

```text
Use Scryfall as the source of truth.

Compare the surviving Shang-Chi combo routes competitively. Do not write a 60-card decklist yet.

Score each route on:
- startup mana
- likely goldfish turn
- number of required cards
- resilience to removal
- vulnerability to graveyard hate, artifact hate, and counterspells
- card quality when drawn alone
- findability
- mana-base difficulty

Pick the best route for a first Standard build and explain why.
```

Finding a combo is one job. Choosing a tournament plan is another. A route can be clever and still be a bad plan for a tournament deck.

For this comparison, I asked Codex to care about startup mana, goldfish turn, resilience to removal, hate cards, card quality, findability, and mana-base difficulty.

That is where the Hawkeye's Bow route won. It has a direct kill, uses relatively few pieces, and gives the deck clear support-card targets: find artifacts, put Faerie in the graveyard, protect the permanents, and keep the mana fast.

## The goals and subagents trick

Some of the prompts also include a weird-looking instruction. It leans on Codex's [subagents](https://developers.openai.com/codex/concepts/subagents): separate agents that can investigate different parts of the same problem before the main thread synthesizes the result.

The fuller prompt looked like this:

```text
For this task, write yourself a new goal and spawn agents in parallel.
Split the work into independent pieces, dispatch them concurrently,
and synthesize the results as they return.
Give each agent its own dedicated /goal.

Evaluate the chosen Shang-Chi combo route from separate angles:
- speed and goldfish turn
- resilience to removal and disruption
- findability and setup consistency
- mana base
- sideboard and metagame pressure

Return the synthesis, the biggest risks, and the strongest build direction.
```

I picked up this trick from a tweet by [Pietro Schirano](https://x.com/skirano/status/2066225908202053818?s=20).

{% twitter https://x.com/skirano/status/2066225908202053818 %}

The point is simple: when the problem has several plausible paths, I do not want Codex to fall in love with the first one it sees.

For this deck, I used that pattern to split the analysis into independent questions: speed, resilience, findability, mana base, and sideboard pressure. Then Codex synthesized the results.

## The support shell

Once the combo existed, I moved to the shell: which cards help this plan happen in real games?

I used this prompt to ask for the shell:

```text
Use Scryfall as the source of truth.

Build a first Standard deck shell around this combo:
- Shang-Chi, Master of Kung Fu
- Agatha's Soul Cauldron
- Sleep-Cursed Faerie
- Hawkeye's Bow

Prioritize cards that find artifacts, put Sleep-Cursed Faerie in the graveyard, protect the combo, interact with the opponent, and keep the mana fast.

Give me a first maindeck and sideboard, then explain the flex slots and the cards most likely to change after testing.
```

A combo deck needs more than combo pieces. It needs cards that find the pieces, put the right cards in the graveyard, protect the setup, and make the mana work.

Codex searched for those categories separately. That gave the shell a clearer direction.

[Casey Jones, Jury-Rig Justiciar](https://scryfall.com/card/tmt/87/casey-jones-jury-rig-justiciar) can help find an artifact from the top four cards of the library. That matters when the combo needs Agatha's Soul Cauldron and Hawkeye's Bow.

[Commune with Beavers](https://scryfall.com/card/fin/182/commune-with-beavers) can dig for artifacts, creatures, or lands.

[Dredger's Insight](https://scryfall.com/card/dft/159/dredgers-insight) can mill cards, help set up the graveyard, and still find an artifact, creature, or land from the milled cards.

[Does Machines](https://scryfall.com/card/tmt/34/does-machines) gives the deck more graveyard setup and can recover artifact pieces later.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(155px, 1fr)); gap: 0.9rem; margin: 1.5rem 0; align-items: start;">
  <a href="https://scryfall.com/card/tmt/87/casey-jones-jury-rig-justiciar"><img src="https://cards.scryfall.io/normal/front/8/0/808a5bc0-0999-47cf-854c-30db6277efe5.jpg?1760114588" alt="Casey Jones, Jury-Rig Justiciar" loading="lazy" style="border-radius: 10px; width: 100%;" /></a>
  <a href="https://scryfall.com/card/fin/182/commune-with-beavers"><img src="https://cards.scryfall.io/normal/front/7/8/784287c2-43c5-4210-93ae-cdd33b9acb1b.jpg?1748706441" alt="Commune with Beavers" loading="lazy" style="border-radius: 10px; width: 100%;" /></a>
  <a href="https://scryfall.com/card/dft/159/dredgers-insight"><img src="https://cards.scryfall.io/normal/front/1/4/148400a0-7819-4551-9815-9357eed1db4d.jpg?1738356493" alt="Dredger's Insight" loading="lazy" style="border-radius: 10px; width: 100%;" /></a>
  <a href="https://scryfall.com/card/tmt/34/does-machines"><img src="https://cards.scryfall.io/normal/front/9/8/989da63a-2cbd-41a9-9bbb-99f4ad1c6a25.jpg?1774102268" alt="Does Machines" loading="lazy" style="border-radius: 10px; width: 100%;" /></a>
</div>

These are not combo pieces. They are the cards that make the combo less imaginary.

## The current list

The first shell Codex proposed was [Temur](https://mtg.fandom.com/wiki/Temur_Frontier), Magic shorthand for a blue-red-green deck.

Green is required for Shang-Chi and many of the setup cards. Red gives access to Hawkeye's Bow and other interaction. Blue makes Sleep-Cursed Faerie castable and opens up better card selection and permission. If you do not play Magic, the important part is that the deck can cast all four combo pieces without stretching into a fourth color.

The core kill is:

- [Shang-Chi, Master of Kung Fu](https://scryfall.com/card/msh/187/shang-chi-master-of-kung-fu)
- [Agatha's Soul Cauldron](https://scryfall.com/card/woe/242/agathas-soul-cauldron)
- [Sleep-Cursed Faerie](https://scryfall.com/card/woe/66/sleep-cursed-faerie)
- [Hawkeye's Bow](https://scryfall.com/card/msh/132/hawkeyes-bow)

The rest of the deck should support that plan with artifact finding, graveyard setup, protection, removal, and a fast mana base.

I published the current test list on MTGGoldfish as [Codex Shang-chi Combo](https://www.mtggoldfish.com/deck/7839976#paper). Treat it as a starting point, not a tuned recommendation.

The numbers need testing. The sideboard depends on the Standard metagame. The deck can lose to removal, graveyard hate, artifact hate, counterspells, or faster decks.

But as a starting point, it is much better than guessing.

## What worked about the process

The most useful part of this experiment was the order of operations.

I made Codex search for combo routes, check card text, reject broken lines, compare the survivors, and then look for support cards.

That order matters.

If you ask an AI tool for a decklist too early, it can give you something that looks like a deck but rests on a weak premise. If you first ask it to prove the premise, you get a much better conversation.

In this case, the premise was simple:

> Can Shang-Chi become part of a deterministic Standard combo?

For now, yes.

Now the real work starts: testing the deck and finding out whether the combo is fast and resilient enough to survive actual games.
