
# lib-tokenize (v0.1.5)

A library for tokenizing strings.

`lib-tokenize` can identify keywords, symbols, string literals,
numerics, and whitespace within a string.
The `tokenize` function will parse a given string and return an
array of `Token` objects which detail each token, it's type, and
location within the string.


## Getting Started

Install via NPM:
```bash
npm install @liquicode/lib-tokenize
```


## Quick Overview

Include the tokenize library in your source code:
```javascript
let LIB_TOKENIZE = require( '@liquicode/lib-tokenize' );
```

Instantiate a new `Tokenizer` object:
```javascript
let tokenizer = LIB_TOKENIZE.NewTokenizer();
```

Configure the `Tokenizer` object:
```javascript
tokenizer.whitespace = ` \t\r\n`;
tokenizer.symbols = `,;=`;
tokenizer.literal_delimiters = `'"`;
tokenizer.literal_escape_chars = `\\`;
tokenizer.keywords = [ 'set', 'get' ];
```

Tokenize some text into an array of `Token` objects:
```javascript
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


## Configuration Settings

The `Tokenizer` object has a number of properties to control the tokenization process:

- `whitespace`: string of characters constituting whitespace.
- `symbols`: string of symbol characters.
- `literal_delimiters`: quote characters (e.g. `'` and `"`)
- `literal_escape_chars`: characters allowed as escape characters within a string literal.
- `self_escape_literal_delimiters`: (boolean) Allow self escaping literal delimiters (e.g. "Hello ""World""!").
- `keywords`: array of keywords.
- `keywords_are_case_sensitive`: (boolean) Keyword matching is case sesnsitive.
- `discard_whitespace`: (boolean) Discard any whitespace tokens found in the text. Defaults to `false`.
- `resolve_literal_values`: (boolean) When `true`, stores the text of the string without the surrounding quotes. (i.e. `Hello` and not `"Hello"`). Defaults to `false`.
- `resolve_numeric_values`: (boolean) When `true`, stores the value of the numeric rather than the text representation. (i.e. `42` and not `"42"`). Defaults to `false`.


## Tokenizer Function

The `Tokenizer` object has a single function used to tokenize text:

- `function Tokenize( Text )`: Tokenize a text string into an array of tokens.
- `function tokenize( Text )`: Precisely the same as the `Tokenize` function.
	Kept for backward compatibility.


## Token Object

The `tokenize` function takes a string and returns an array of `Token` objects:

- `type`: (string) The type of the token. See `Token Types` below.
- `token`:  (string) The actual text of the token.
- `at`: (integer) The index at which the token begins within the given string.


## Token Types

The `lib-tokenize` library also exports a `TokenTypes` object which provides more
programmatic access to values of the `Token.type` field:
```javascript
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


## Parsing Functions

A couple of general purpose parsing functions are also included in the library.
Use these as-is or copy them as a starting point for your own parsing needs.

- `ParseCommandLine( Text )`: Parse a command line into an arguments object.
- `ParseCsvString( Text )`: Parse a CSV string into an array of values.

