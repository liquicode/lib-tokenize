# Tokenize a CSV String

**_Code_**
```javascript
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
$ node tests/samples/tokenize-csv-string.js
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


