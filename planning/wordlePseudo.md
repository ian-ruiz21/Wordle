# Game Overview

## 1. Word List and Game Setup

### Word List:
- The game has a list of possible words.
- One of these is randomly selected as the secret word for you to guess.

### Max Attempts:
- You get 6 tries to guess the word.

### Word Length:
- All words are 5 letters long.

## 2. Game States

### States:
The game has different phases:
- **Waiting for Input:** You need to enter your guess.
- **Checking Input:** The game evaluates your guess.
- **Game Won:** You've guessed the word correctly.
- **Game Lost:** You've used all attempts without guessing correctly.

### Keyboard States:
The virtual keyboard will show:
- **Correct (Green):** The letter is in the correct spot.
- **Present (Yellow):** The letter is in the word but in the wrong spot.
- **Absent (Gray):** The letter isn't in the word at all.

## 3. Game Variables

### Current Game State:
- Initially set to waiting for your input.

### Target Word:
- This is the secret word you need to guess, chosen randomly.

### Attempt Count:
- Tracks how many guesses you've made so far.

### Guess History:
- Keeps a list of all the guesses you've made.

### Game Over Status:
- Indicates whether the game has ended.

### Keyboard State:
- Tracks the current status of each letter on the keyboard.

## User Interface

### 1. Elements on the Screen

#### Word Grid:
- Displays your guesses and the feedback for each letter.

#### Input Field:
- Where you type your guess.

#### Buttons:
- **Submit Button:** To submit your guess.
- **Restart Button:** To start a new game.

#### Message Area:
- Displays messages like your current attempt number, winning, or losing notifications.

#### Virtual Keyboard:
- Shows letters with feedback colors based on your guesses.

## How the Game Works

### 1. Initialization (Starting the Game)

#### Setup:
- Pick a secret word.
- Reset the attempt count and guess history.
- Set the game status to waiting for input.
- Initialize the virtual keyboard with all letters uncolored (blank).

#### Clear the Display:
- Reset the word grid and keyboard colors to their initial states.
- Display a message prompting you to start guessing.

### 2. Game Flow

#### Rendering the Game:
- Update the display to show guesses, feedback, and messages based on the current state.

#### Making a Guess:
- Enter a 5-letter word and click the submit button.
- The game checks if your guess is valid and compares it with the secret word.
- If your guess is correct, you win. If you've used all attempts, you lose.
- Otherwise, you'll receive feedback on your guess.

#### Providing Feedback:
- The game marks each letter:
  - **Green (Correct):** Correct letter in the correct position.
  - **Yellow (Present):** Correct letter in the wrong position.
  - **Gray (Absent):** Letter not in the word.
- Update the keyboard with these colors to help you plan your next guess.

#### Checking and Switching States:
- If your guess is correct, switch to the "Game Won" state.
- If all attempts are used, switch to the "Game Lost" state.
- If neither, continue waiting for more input.

### 3. Functions to Manage the Game

#### Choose Random Word:
- Pick a word from the list randomly.

#### Validate Guess:
- Ensure your guess is exactly 5 letters and is a valid word.

#### Check Guess:
- Compare each letter of your guess with the secret word and update feedback.

#### Update the Display:
- Show the current guesses and update the keyboard and message area.

#### Handle Keyboard Input:
- The virtual keyboard allows you to click letters, which adds them to your guess input field.

#### Restart Game:
- Reset everything to start a new game.

## Event Listeners

### Submit Button:
- Click to submit your guess, which triggers the checking process.

### Restart Button:
- Click to reset the game and start over.

### Input Field (Enter Key):
- Press Enter to submit your guess.

### Virtual Keyboard Clicks:
- Click a letter on the virtual keyboard to add it to your guess.
