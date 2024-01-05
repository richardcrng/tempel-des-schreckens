# Rules

> 🇩🇪 [*Tempel des Schreckens*](https://tempel.rcr.dev/) has official rules that only exist in German - so my understanding of the game is significantly indebted to [this unofficial English translation](https://boardgamegeek.com/filepage/139993/tempel-des-schreckens-unofficial-rules-english) of the rules.

**Welcome to the [*Tempel des Schreckens*](https://tempel.rcr.dev/)!**

<img alt="Tempel des Schreckens box art" src="./client/public/assets/tds-box.png" width="250" />

- [Thematic setup](#thematic-setup)
- [Roles and win conditions](#roles-and-win-conditions)
- [Game mechanics](#game-mechanics)

## Thematic setup

For decades, rumours have spread about a hidden temple of great treasures... and grave terrors.

A foolhardy group of **Adventurers** have stumbled across it - and now they're ready to ransack it for all that it's worth.

However, some mysterious Temple **Guardians** have been awoken from their slumber, stirred to protect the treasures within.

Can the Adventurers find all the temple's gold in time? Or will they be led astray by the Guardians - into deadly traps of fire, or sealed within the temple for all eternity?

## Roles and win conditions

### Hidden roles and teams

In *Tempel des Schreckens*, **roles are always secret**. You know your role, but you don't know anybody else's role - and so you don't know who is, or who is not, on your team.

But, like a lot of hidden role games, there is a large *social deduction* element of trying to identify who is on which team.

There are exactly **two teams**: Adventurers and Guardians.
- *Teams are in direct competition* - every game always has a single winning team.
- *Teammates all win together* - you win alongside your fellow Adventurers/Guardians.

### Team win conditions

The two teams have different win conditions, which are directly opposed to each other.

The **Adventurer** team wins in only one way: if all of the temple's **Gold** is opened within four rounds.

The **Guardian** team wins in one of two ways:
1. If four rounds pass to completion *without* all of the Gold being located; or
2. If, at any time, all of the temple's **Fire** traps are opened.

The exact numbers on each team depends on the number of players, but there are almost always more Adventurers than Guardians.

Thus, the game ends in three ways:
1. *All Gold has been opened* - Adventurers win
2. *All Fire has been opened* - Guardians win
3. *Four rounds are complete* - Guardians win

There is always a winning team at the end of the game.

### Basic team dynamics

Adventurers are in a race against time to find all the Gold before the end of four rounds. They will try to cooperate with other Adventurers and share information to help them locate the Gold.

However, remember - roles are secret, and there are some Guardians in the midst!

Guardians will typically obstruct this by *pretending* to be Adventurers, so they can tactically spread misinformation, stop Gold from being opened, and potentially reveal the Fire.

However, if Guardians aren't subtle, Adventurers may be able to *deduce* their identity, discount their misinformation and thwart the Guardians' plans.

## Game mechanics

### Chamber cards

The *Tempel des Schreckens* is organised into distinct Chambers, each of which is represented by a **Chamber card**.

As the game progresses, the temple gets explored, and more chambers get *opened* - represented by flipping the card from face-down (unopened) to face-up (opened).

<div style="display: flex; justify-content: space-around;">
  <div style="width: 150">
    <img alt="Tempel des Schreckens - unopened chamber" src="./client/public/assets/tds-chamber.jpeg" width="150" />
    <p>Unknown chamber (unopened, back)</p>
  </div>
  <div style="width: 150">
    <img alt="Tempel des Schreckens - gold chamber" src="./client/public/assets/tds-gold.jpeg" width="150" />
    <p>Gold chamber (opened, front)</p>
  </div>
  <div style="width: 150">
    <img alt="Tempel des Schreckens - fire chamber" src="./client/public/assets/tds-fire.jpeg" width="150" />
    <p>Fire chamber (opened, front)</p>
  </div>
  <div style="width: 150">
    <img alt="Tempel des Schreckens - empty chamber" src="./client/public/assets/tds-empty.jpeg" width="150" />
    <p>Empty chamber (opened, front)</p>
  </div>
</div>

All unopened chambers look identical.

When chambers are opened (flipped), they have three possible things they might reveal:
- **Gold**: good news for Adventurers, that's one closer to victory!
- **Fire**: bad news for Adventurers, that's one closer to defeat...
- **Empty**: neutral-*ish* for Adventurers, at least it's not fire...

Whilst empty chambers don't count towards either gold or fire (and so they are neutral-*ish*), they *do* count towards the ticking time clock, as discussed in the next section.

The exact number of Gold, Fire and Empty chambers in the game depends on the number of players, but it is always the case that *the vast majority of chambers are Empty*, *there will be a minority of chambers with Gold*, and *there will be extremely few Fire* (even fewer than Gold).

### Round mechanics

Roles are randomly assigned before the first round, and then kept for the whole game.

Every round works in the same basic way:
- [*Setup*](#round-setup), where cards are dealt out to represent the temple's chambers; and
- [*Discussion*](#discussion), where players reveal information (truthfully or not...); and
- [*Opening cards*](#opening-cards), where cards are flipped over to represent exploring the temple.

For an *N* player game, a round involves opening *N* chambers. (For example, in a 6 player game, every round invovles flipping over 6 face-down chamber cards.)

Discussion and Opening cards can happen in parallel, until all cards have been opened from the round.

#### Round setup

Firstly, **un-opened Chamber cards are dealt out evenly** to each player. (Cards that are 'opened' in previous rounds are not dealt in subsequent rounds.)

Secondly, **each player sees their own Chamber card distribution**. For example, a player dealt 5 x Chamber cards might see their distribution such as:
- 2 Gold, 1 Fire, 2 Empty
- 3 Gold, 2 Empty (0 Fire)
- 5 Empty (0 Gold, 0 Fire)

Thirdly, **each player shuffles their Chamber cards and places them face-down**. This means that they know their card *distribution*, but not *placement*. For example, if they have 2 Gold cards amongst 5 unopened Chambers, they will know that each of these face-down Chamber cards has a 2/5 probability of being Gold - but they won't know *which* face-down Chamber cards *is actually* Gold.

#### Discussion

Adventurers will *generally* want to maximise the number of Gold chambers flipped, as this helps them towards their win condition. Guardians, however, have different incentives...

Before any chambers are opened, it is *typical play* for all players to share information about their distributions, to help input on which chamber should be opened. For example:
- "In my four cards, I have 3 Gold and 1 Empty - odds are good here!"
- "Ah, so in my four cards I have 1 Gold, 1 Fire and 2 Empty - probably best to look elsewhere."

*(There is no rule about declaring your cards in this way - it is simply common play. Adventurers have an interest in sharing information so that they can try to maximise the Gold cards they flip, and Guardians have an interest in pretending to be Adventurers, spreading misinformation and influencing the Adventurers.)*

However, just like role assignment, *individual chamber distributions are secret* - which means that there's an element of deduction, since some people may be bluffing about what they have.

(For example: a Guardian sitting on lots of Gold might artificially inflate their Fire count, to try to protect their Gold; conversely, a Guardian sitting on Fire might artificially inflate their Gold count, to try to draw the Adventurers towards the Fire. See [Strategy](STRATEGY.md) for more.)

So, in a game, there are two (related) types of deduction that happen:
1. *Chamber distribution* - e.g. where are the Fire cards in this round?
2. *Role distribution* - e.g. who are the Guardians in this game?

(Remember: **roles are kept between rounds**, so deducing that somebody is a Guardian in one round will help you in a future round.)

#### Opening cards

It is usual for there to be player discussion over which chambers to visit. For example:
- "So, Aaliya says she has three Gold in her five cards - which means odds are best there, let's open one of her chambers!"
- "Hmm, I'm not sure I trust Aaliya. However, Carlo has proved himself reliable - so I trust him when he says there are two Gold there."
- "No, don't chance it with Carlo, he says he has Fire, we can't risk that!"

*etcetera*

However, one player has the final say over which chamber to open - the **Keyholder**, a *temporary role* which passes between players (through a mechanic described below). The first Keyholder is randomly assigned at the start of the game.

The Keyholder ultimately has the final say on which Chamber to open (i.e. which card to flip) - they can choose to go with the discussion consensus, or they can choose to ignore it entirely.

(The Keyholder **cannot choose to open one of their own Chambers**, however.)

Once the Keyholder picks a Chamber to open, it is flipped, and everybody learns what it was - and **the key passes to the person whose Chamber was opened**, making them the next Keyholder.

This process of *discussion*, *opening cards* and *passing the key* continues until *N* cards have been flipped, where *N* is the number of players in the game.

(This need not be equally distributed between players - for example, the key might pass from Player A, to Player B, back to Player A, to Player C, then to Player D.)

The person who holds the key at the end of a round holds onto it for the start of the next round.

Play continues until one of the [team win conditions](#team-win-conditions) has been reached.

## Get started

So, are you ready to enter the [*Tempel des Schreckens*](https://tempel.rcr.dev/)?

The game is best played with the [official physical card set](https://www.spiel-des-jahres.de/en/games/tempel-des-schreckens/).

If you can't play with a physical set - e.g. for remote play on group video calls - you can use this web app implementation, which uses identical rules.

You can [**find the web app here**](https://tempel.rcr.dev/).