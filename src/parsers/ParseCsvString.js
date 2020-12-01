

//---------------------------------------------------------------------
exports.ParseCsvString =
	function ParseCsvString( LibTokenizer, Text )
	{
		// Tokenize the text.
		let tokenizer = LibTokenizer.NewTokenizer();
		tokenizer.symbols = `,`; // Comma seperated values.
		tokenizer.literal_delimiters = `"`; // Use double quotes around values.
		tokenizer.literal_escape_chars = `\\`; // Allow an escape character.
		tokenizer.self_escape_literal_delimiters = true; // Allow self-delimiting double quotes.
		tokenizer.resolve_literal_values = true;
		let tokens = tokenizer.tokenize( Text );

		// Convert to an array of values (literals, identifiers, and numerics only)
		let values = [];
		tokens.forEach(
			( token ) =>
			{
				if (
					( token.type === LibTokenizer.TokenTypes.literal )
					|| ( token.type === LibTokenizer.TokenTypes.identifier )
					|| ( token.type === LibTokenizer.TokenTypes.numeric )
				)
				{
					values.push( token.token );
				}
			}
		);

		// Return the array of values.
		return values;
	};
