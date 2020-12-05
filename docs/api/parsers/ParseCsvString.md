# ParseCsvString( Text )

Converts a string of CSV text to an array of values.

This function is available from the library itself, not the `Tokenizer` object.


**_Usage_**

```javascript
// Get the tokenizer library.
const LIB_TOKENIZE = require( '@liquicode/lib-tokenizer' );

// The string we are going to parse.
let text = `0001,"John","O'Malley","The ""Boss""","ABC-1234"`;

// Parse the string into an array of values.
let values = LIB_TOKENIZE.ParseCsvString( text );

// values =
// [
// 	`0001`,
// 	`John`,
// 	`O'Malley`,
// 	`The ""Boss""`,
// 	`ABC-1234`
// ]
```
