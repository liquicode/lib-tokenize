
# lib-tokenize

A library for tokenizing strings.


## Getting Started

Install via NPM:
```
npm install @liquicode/lib-tokenizer
```


## Usage

Include the tokenizer library in your source code:
```
let Tokenizer = require( '@liquicode/lib-tokenizer' );
```

Configure the Tokenizer object:
```
Tokenizer.whitespace = ` \t\r\n`;
Tokenizer.symbols = `,;=`;
Tokenizer.literal_delimiters = `'"`;
Tokenizer.literal_escape_chars = `\\`;
Tokenizer.keywords = [ 'set', 'get' ];
```

Tokenize some text:
```
let tokens = Tokenizer.tokenize( "set X=3" )
...
tokens = 
[
	{ token: "set", type: LIB_TOKENIZE.TokenTypes.keyword, at: 0 },
	{ token: " ", type: LIB_TOKENIZE.TokenTypes.whitespace, at: 3 },
	{ token: "X", type: LIB_TOKENIZE.TokenTypes.identifier, at: 4 },
	{ token: "=", type: LIB_TOKENIZE.TokenTypes.symbol, at: 5 },
	{ token: "3", type: LIB_TOKENIZE.TokenTypes.numeric, at: 6 },
]
```


## Settings

- `whitespace`: string of characters constituting whitespace.
- `symbols`: string of symbol characters.
- `literal_delimiters`: quote characters (e.g. `'` and `"`)
- `literal_escape_chars`: characters allowed as escape characters within a string literal.
- `keywords`: array of keywords.

## Functions

- `function tokenize( Text )`: Tokenize a text string into an array of tokens.

