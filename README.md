
# lib-tokenize

A library for tokenizing strings.

`lib-tokenize` can identify keywords, symbols, string literals,
numerics, and whitespace within a string.
The `tokenize` function will parse a given string and return an
array of `Token` objects which detail each token, it's type, and
location within the string.


## Getting Started

Install via NPM:
```bash
npm install @liquicode/lib-tokenizer
```


## Quick Overview

Include the tokenizer library in your source code:
```js
let LIB_TOKENIZE = require( '@liquicode/lib-tokenizer' );
```

Instantiate a new `Tokenizer` object:
```js
let tokenizer = LIB_TOKENIZE.NewTokenizer();
```

Configure the `Tokenizer` object:
```js
tokenizer.whitespace = ` \t\r\n`;
tokenizer.symbols = `,;=`;
tokenizer.literal_delimiters = `'"`;
tokenizer.literal_escape_chars = `\\`;
tokenizer.keywords = [ 'set', 'get' ];
```

Tokenize some text into an array of `Token` objects:
```js
let tokens = tokenizer.tokenize( "set X=3" )
// tokens array =
// ┌─────────┬───────┬───────┬────┐
// │ (index) │ type  │ token │ at │
// ├─────────┼───────┼───────┼────┤
// │    0    │ 'kwd' │ 'set' │ 0  │
// │    1    │ 'wsp' │  ' '  │ 3  │
// │    2    │ 'idf' │  'X'  │ 4  │
// │    3    │ 'sym' │  '='  │ 5  │
// │    4    │ 'num' │  '3'  │ 6  │
// └─────────┴───────┴───────┴────┘
```

### Structure of a Token Object

The `tokenize` function takes a string and returns an array of `Token` objects:

- `type`: (string) The type of the token. See `Token Types` below.
- `token`:  (string) The actual text of the token.
- `at`: (integer) The index at which the token begins within the given string.

### Token Types

The `lib-tokenize` library also exports a `TokenTypes` object which provides more
programmatic access to values of the `Token.type` field:
```js
let LIB_TOKENIZE = require( '@liquicode/lib-tokenizer' );
LIB_TOKENIZE.TokenTypes =
{
	whitespace: 'wsp',
	symbol: 'sym',
	delimiter: 'del',
	literal: 'lit',
	identifier: 'idf',
	numeric: 'num',
	keyword: 'kwd',
};
```

## Configuration Settings

The `Tokenizer` object has a number of properties to control the tokenization process:

- `whitespace`: string of characters constituting whitespace.
- `symbols`: string of symbol characters.
- `literal_delimiters`: quote characters (e.g. `'` and `"`)
- `literal_escape_chars`: characters allowed as escape characters within a string literal.
- `self_escape_literal_delimiters`: (boolean) Allow self escaping literal delimiters (e.g. "Hello ""World""!").
- `keywords`: array of keywords.
- `discard_whitespace`: (boolean) Discard any whitespace tokens found in the text.
- `keywords_are_case_sensitive`: (boolean) Keyword matching is case sesnsitive.


## Functions

The `Tokenizer` object has a single function used to tokenize text:

- `function tokenize( Text )`: Tokenize a text string into an array of tokens.


## Samples

### Tokenize a CSV String

**_Code_**
```js
// The string we are going to tokenize.
let text = `0001,"John","O'Malley","The ""Boss""","ABC-1234"`;

// Get an instance of a tokenizer.
const LIB_TOKENIZE = require( '@liquicode/lib-tokenizer' );
let tokenizer = LIB_TOKENIZE.NewTokenizer();

// Configure the tokenizer to handle csv text.
tokenizer.symbols = [ `,` ]; // Comma seperated values.
tokenizer.literal_delimiters = `"`; // Use double quotes around values.
tokenizer.literal_escape_chars = `\\`; // Allow an escape character.
tokenizer.self_escape_literal_delimiters = true; // Allow self-delimiting double quotes.

// Break the text up into an array of tokens.
let tokens = tokenizer.tokenize( text );
console.table( tokens );
```

**_Output_**
```
$ node samples/tokenize-csv.js
┌─────────┬───────┬──────────────────┬────┐
│ (index) │ type  │      token       │ at │
├─────────┼───────┼──────────────────┼────┤
│    0    │ 'num' │      '0001'      │ 0  │
│    1    │ 'sym' │       ','        │ 4  │
│    2    │ 'lit' │     '"John"'     │ 5  │
│    3    │ 'sym' │       ','        │ 11 │
│    4    │ 'lit' │  '"O\'Malley"'   │ 12 │
│    5    │ 'sym' │       ','        │ 22 │
│    6    │ 'lit' │ '"The ""Boss"""' │ 23 │
│    7    │ 'sym' │       ','        │ 37 │
│    8    │ 'lit' │   '"ABC-1234"'   │ 38 │
└─────────┴───────┴──────────────────┴────┘
```


### Tokenize Pseudo-Code

**_Code_**
```js
// The string we are going to tokenize.
let text = `set X=3`;

// Get an instance of a tokenizer.
const LIB_TOKENIZE = require( '@liquicode/lib-tokenizer' );
let tokenizer = LIB_TOKENIZE.NewTokenizer();

// Configure the tokenizer to handle the pseudo-code.
tokenizer.whitespace = ` \t\r\n`;
tokenizer.symbols = `,;=`;
tokenizer.literal_delimiters = `'"`;
tokenizer.literal_escape_chars = `\\`;
tokenizer.keywords = [ 'set', 'get' ];

// Break the text up into an array of tokens.
let tokens = tokenizer.tokenize( text );
console.table( tokens );
```

**_Output_**
```bash
$ node samples/tokenize-pseudo-code-1.js 
┌─────────┬───────┬───────┬────┐
│ (index) │ type  │ token │ at │
├─────────┼───────┼───────┼────┤
│    0    │ 'kwd' │ 'set' │ 0  │
│    1    │ 'wsp' │  ' '  │ 3  │
│    2    │ 'idf' │  'X'  │ 4  │
│    3    │ 'sym' │  '='  │ 5  │
│    4    │ 'num' │  '3'  │ 6  │
└─────────┴───────┴───────┴────┘
```


### Tokenize Simple Words

**_Code_**
```js
// The string we are going to tokenize.
let text = `The dog chased the cat because dogs chase cats!`;

// Get an instance of a tokenizer.
const LIB_TOKENIZE = require( '@liquicode/lib-tokenizer' );
let tokenizer = LIB_TOKENIZE.NewTokenizer();

// Configure the tokenizer to handle the pseudo-code.
tokenizer.whitespace = ` \t\r\n`;
tokenizer.discard_whitespace = true;
tokenizer.symbols = `.!?`;
tokenizer.literal_delimiters = `'"`;
tokenizer.literal_escape_chars = `\\`;
tokenizer.keywords = [ 'Dog', 'Dogs', 'Cat', 'Cats' ];
tokenizer.keywords_are_case_sensitive = false;

// Break the text up into an array of tokens.
let tokens = tokenizer.tokenize( text );
console.table( tokens );
```

**_Output_**
```bash
$ node samples/tokenize-simple-words.js 
┌─────────┬───────┬───────────┬────┐
│ (index) │ type  │   token   │ at │
├─────────┼───────┼───────────┼────┤
│    0    │ 'idf' │   'The'   │ 0  │
│    1    │ 'kwd' │   'dog'   │ 4  │
│    2    │ 'idf' │ 'chased'  │ 8  │
│    3    │ 'idf' │   'the'   │ 15 │
│    4    │ 'kwd' │   'cat'   │ 19 │
│    5    │ 'idf' │ 'because' │ 23 │
│    6    │ 'kwd' │  'dogs'   │ 31 │
│    7    │ 'idf' │  'chase'  │ 36 │
│    8    │ 'kwd' │  'cats'   │ 42 │
│    9    │ 'sym' │    '!'    │ 46 │
└─────────┴───────┴───────────┴────┘
```
