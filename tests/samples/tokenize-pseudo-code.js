
// The string we are going to tokenize.
let text = `set X=3`;

// Get an instance of a tokenizer.
const LIB_TOKENIZE = require( '../../src/lib-tokenize.js' );
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
