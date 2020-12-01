# Tokenize Pseudo-Code

**_Code_**
```javascript
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
$ node tests/samples/tokenize-pseudo-code.js 
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
