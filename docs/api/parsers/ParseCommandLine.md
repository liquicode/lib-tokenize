# ParseCommandLine( Text )

Parses a command line string and returns an object containing the flags and key-value pairs found in the string.

This function is available from the library itself, not the `Tokenizer` object.


**_Usage_**

```javascript
// Get the tokenizer library.
const LIB_TOKENIZE = require( '@liquicode/lib-tokenizer' );

// The string we are going to parse.
let text = `-debug -config "my config.json" x=42`;

// Parse the string into an arguments object.
let arguments = LIB_TOKENIZE.ParseCommandLine( text );

// arguments =
// {
// 	debug: true,
// 	config: 'my config.json',
// 	x: 42
// }
```
