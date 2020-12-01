
// The string we are going to tokenize.
let text = `The dog chased the cat because dogs chase cats!`;

// Get an instance of a tokenizer.
const LIB_TOKENIZE = require( '../../src/lib-tokenize.js' );
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
// console.table( tokens );
console.table( LIB_TOKENIZE.TokenTypes );
