# Testing Output


```


  Tokenize Tests
    ✓ should tokenize an undefined string
    ✓ should tokenize an empty string
    ✓ should tokenize a simple string
    ✓ should tokenize a more complex string
    ✓ should tokenize a symbol
    ✓ should tokenize whitespace
    ✓ should tokenize a literal
    ✓ should tokenize a literal with an apostrophe
    ✓ should tokenize a literal with an escape character
    ✓ should tokenize a literal with an alternate escape character
    ✓ should tokenize a literal with a self escaping duplicate character
    ✓ should discard whitespace
    ✓ should detect keywords, case sensitive
    ✓ should detect keywords, case insensitive

  02) ParseCommandLine
    ✓ should throw an error for illegal strings: "-"
    ✓ returns an empty object for an empty string: ""
    ✓ can handle a simple flag: "-f"
    ✓ can handle several simple flags: "-a -b -c"
    ✓ can handle a single key-value: "-f:42"
    ✓ can handle a single key-value: "-f=42"
    ✓ can handle a single key-value: "-f 42"
    ✓ can handle a multiple key-values: "-f 42 -x = foo -msg: 'Hello'"
    ✓ can handle flags and key-values: "-a -f 42 -b -x = foo -c -msg: 'Hello'"
    ✓ can handle optional leading '-': "f 42"
    ✓ can handle optional leading '-': "a 1 b 2 c 3"
    ✓ can handle optional leading '-': "a 1 b 2 c 3"
    ✓ can handle multiple leading '-': "--f 42"

  03) ParseCsvString
    ✓ can parse a string: 0001,"John","O'Malley","The ""Boss""","ABC-1234"


  28 passing (9ms)


```


