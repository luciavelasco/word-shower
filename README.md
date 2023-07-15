# Word Shower

A zen little game where you stare at your screen and come up with words from a transient stream of letters.

Play it [here](https://luciavelasco.github.io/word-shower/).

## Rules

- letters tumble down the screen
- while a letter is on the screen you can type it to add it to your word
- you can backspace to remove a letter, but once you do you won't be able to get it back unless it comes back in the falling letters
- click enter to submit your word, if it's a valid word it'll be added to your score, at a point per letter

There's no timer and no pressure.

## Ideas

### Touchscreen/select support

Rather than typing, select from the letters falling on screen.

Add a backspace button so that the user doesn't need to use the keyboard/input, and remove the autofocus on the input.

Redo UI layout at the same time so there's more screen for letters.

### Badges

Collect awards (should persist in localStorage).

"Word beginning with QU", "mushroom". idk.

#### Collections

Add json files for, e.g.:

- lists of animals. "Garden explorer (4 animals)" badge! "Park warden (8 animals)". "Forest dweller (12 animals)". "Safari guide (20 animals)".
- archaic words. "Archaic word!", "Bookworm (3 archaic words)", "Etymologist (6 archaic words)", "Archaeolinguist(?) (10 archaic words)"
- flowers? foraging? swamp?

### Stats

Most found word (show number of times each word is found next to the word as you type).

Average word length.

~~Total amount of time played?~~ Nothing involving time. This is a silly little zen game. 

### Timed mode (tbc)

Try to get as many words before your time runs out!

### Life mode (tbc)

- you have three lives
- if you ~~type a letter that isn't on the screen or~~ submit a word that isn't recognised you'll lose a life

If you submit 4 invalid words, you lose!

_this probably isn't a great way to do it because my library might not be complete_

#### Wildcard mode

Gain a wildcard every time you complete a word, which you can use to add a letter that isn't on the screen.

Just type the letter and, if you have a wildcard, it will add it to your word. Just delete your wildcard letter (highlighted) to get it back if you change your mind. 

###### Game idea 2

Falling words, type in the whole word before it falls off the screen. Something about themes (related words = streak with x2/x3/xN pts? Or only type words related to a theme? Or only type words that are falling in a red bubble? Idk)
