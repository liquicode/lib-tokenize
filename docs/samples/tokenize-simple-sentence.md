# Tokenize a Simple Sentence

**_Code_**
```javascript
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
$ node tests/samples/tokenize-simple-sentence.js 
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
