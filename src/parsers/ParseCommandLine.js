

//---------------------------------------------------------------------
exports.ParseCommandLine =
	function ParseCommandLine( LibTokenizer, Text )
	{
		// Tokenize the text.
		let tokenizer = LibTokenizer.NewTokenizer();
		tokenizer.whitespace = ` \t\r\n`;
		tokenizer.symbols = `-:=`;
		tokenizer.literal_delimiters = `'"`;
		tokenizer.literal_escape_chars = `\\`;
		tokenizer.keywords = [];
		tokenizer.discard_whitespace = true;
		tokenizer.resolve_literal_values = true;
		tokenizer.resolve_numeric_values = true;
		let tokens = tokenizer.tokenize( Text );

		// Parse the tokens into an arguments object.
		let args = {};
		while ( tokens.length > 0 )
		{
			// Remove all leading '-' characters.
			while ( tokens[ 0 ].token === `-` )
			{
				tokens.splice( 0, 1 );
				if ( !tokens.length ) { throw new Error( `Unexpected end of string. Expected an argument name after a '-'.` ); }
			}

			// At this point, we must have the argument name (an identifier).
			if ( tokens[ 0 ].type !== LibTokenizer.TokenTypes.identifier )
			{
				throw new Error( `No argument name was found after a '-' at position ${tokens[ 0 ].at}.` );
			}
			let arg_name = tokens[ 0 ].token;
			tokens.splice( 0, 1 );

			// Create a new entry in our args object and give it an initial value of `true`.
			args[ arg_name ] = true;
			if ( !tokens.length ) { break; }

			// Check fpr start of another argument.
			if ( tokens[ 0 ].token === `-` ) { continue; }

			// Get the key-value separator ':' or '='.
			if ( ( tokens[ 0 ].token === `:` ) || ( tokens[ 0 ].token === `=` ) ) 
			{
				tokens.splice( 0, 1 );
				if ( !tokens.length ) { throw new Error( `Unexpected end of string. Expected an value after a ':' or '='.` ); }
			}

			// Get the value. Must be an idenitifier, string literal, or numeric.
			if ( ( tokens[ 0 ].type !== LibTokenizer.TokenTypes.identifier )
				&& ( tokens[ 0 ].type !== LibTokenizer.TokenTypes.literal )
				&& ( tokens[ 0 ].type !== LibTokenizer.TokenTypes.numeric ) )
			{
				throw new Error( `Unexpected value at position ${tokens[ 0 ].at}. Expected an identifier, string literal, or numeric.` );
			}
			args[ arg_name ] = tokens[ 0 ].token;
			tokens.splice( 0, 1 );
		}

		// Return the arguments object.
		return args;
	};
