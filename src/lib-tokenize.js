"use strict";


const TokenTypes =
{
	whitespace: 'wsp',
	symbol: 'sym',
	delimiter: 'del',
	literal: 'lit',
	identifier: 'idf',
	numeric: 'num',
	keyword: 'kwd',
};
exports.TokenTypes = TokenTypes;


exports.NewTokenizer = NewTokenizer;
function NewTokenizer()
{

	//---------------------------------------------------------------------
	// Create a new Tokenizer Object.
	let tokenizer = {};
	tokenizer.whitespace = ` \t\r\n`;
	tokenizer.symbols = `,:;=<>+-*/^()[]{}`;
	tokenizer.literal_delimiters = `'"`;
	tokenizer.literal_escape_chars = `\\`;
	tokenizer.self_escape_literal_delimiters = false;
	tokenizer.keywords = [];
	tokenizer.keywords_are_case_sensitive = false;
	tokenizer.discard_whitespace = false;
	tokenizer.resolve_literal_values = false;
	tokenizer.resolve_numeric_values = false;


	//---------------------------------------------------------------------
	function read_whitespace( Tokenizer, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( Tokenizer.whitespace.includes( Text.charAt( ichar ) ) ) 
		{
			ichar++;
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.whitespace,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_symbol( Tokenizer, Text, StartAt )
	{
		if ( !Tokenizer.symbols.includes( Text.charAt( StartAt ) ) ) { return null; }
		let token = {
			type: TokenTypes.symbol,
			token: Text.charAt( StartAt ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_numeric( Tokenizer, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( true ) 
		{
			let ch = Text.charAt( ichar );
			if (
				( ( ch >= '0' ) && ( ch <= '9' ) )
				|| ( ch === '.' ) )
			{ ichar++; }
			else
			{ break; }
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.numeric,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}
	//---------------------------------------------------------------------
	function read_literal( Tokenizer, Text, StartAt )
	{
		if ( !Tokenizer.literal_delimiters.includes( Text.charAt( StartAt ) ) ) { return null; }
		let start_char = Text.charAt( StartAt );
		let ichar = StartAt + 1;
		let len = Text.length;
		while ( true ) 
		{
			if ( ichar >= len ) { break; }
			let ch = Text.charAt( ichar );
			// Check for self escaping delimiters (e.g. "Hello ""World""!").
			if ( Tokenizer.self_escape_literal_delimiters
				&& Tokenizer.literal_delimiters.includes( ch )
				&& ( ( ichar + 1 ) < len )
				&& ( ch === Text.charAt( ichar + 1 ) )
			) 
			{
				ichar++; // Take the first instance of the character.
				ichar++; // Take the second instance of the character.
				continue;
			}
			// Check for an escape character.
			if ( Tokenizer.literal_escape_chars.includes( ch ) )
			{
				ichar++; // Take the escape character.
				ichar++; // Take the escaped character.
				continue;
			}
			// Check if we found the closing delimiter for this literal.
			if ( ch === start_char )
			{
				// Found the end of the literal.
				ichar++; // Take the closing delimiter.
				break;
			}
			// Check for the end of the given string.
			ichar++;
			if ( ichar >= len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.literal,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_identifier( Tokenizer, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( true )
		{
			let ch = Text.charAt( ichar );
			if ( Tokenizer.whitespace.includes( ch ) ) { break; }
			if ( Tokenizer.symbols.includes( ch ) ) { break; }
			if ( Tokenizer.literal_delimiters.includes( ch ) ) { break; }
			ichar++;
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.identifier,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};

		// Detect keywords.
		let is_keyword = false;
		if ( Tokenizer.keywords_are_case_sensitive )
		{
			is_keyword = Tokenizer.keywords.find(
				keyword => ( keyword === token.token )
			);
		}
		else
		{
			is_keyword = Tokenizer.keywords.find(
				keyword => ( keyword.toLowerCase() === token.token.toLowerCase() )
			);
		}
		if ( is_keyword )
		{
			token.type = TokenTypes.keyword;
		}

		// Return the token.
		return token;
	}


	//---------------------------------------------------------------------
	function convert_values( Tokenizer, Tokens )
	{
		Tokens.forEach(
			( token ) =>
			{
				if ( token.type === TokenTypes.numeric )
				{
					if ( Tokenizer.resolve_numeric_values )
					{
						if ( token.token.indexOf( '.' ) >= 0 )
						{
							// Convert to float value.
							token.token = parseFloat( token.token );
						}
						else
						{
							// Convert to integer value.
							token.token = parseInt( token.token );
						}
					}
				}
				else if ( token.type === TokenTypes.literal )
				{
					if ( Tokenizer.resolve_literal_values )
					{
						// Remove the surrounding quote characters.
						token.token = token.token.substr( 1, token.token.length - 2 );
					}
				}
				return;
			} );
		return;
	}


	//---------------------------------------------------------------------
	function tokenize( Text )
	{
		let tokens = [];
		if ( !Text ) { return tokens; }

		let ichar = 0;
		let len = Text.length;
		while ( true )
		{
			// Exit loop when reached end of text string.
			if ( ichar === len ) { break; }
			// Parse the next token.
			let token = read_whitespace( this, Text, ichar );
			if ( !token ) { token = read_symbol( this, Text, ichar ); }
			if ( !token ) { token = read_literal( this, Text, ichar ); }
			if ( !token ) { token = read_numeric( this, Text, ichar ); }
			if ( !token ) { token = read_identifier( this, Text, ichar ); }
			if ( !token ) { throw new Error( `Unable to continue parsing at location ${ichar}.` ); }
			ichar += token.token.length;
			// Collect tokens.
			if (
				token
				&& ( token.type === 'wsp' )
				&& this.discard_whitespace
			) { continue; }
			tokens.push( token );
		}

		// Do required value conversions.
		convert_values( this, tokens );

		// Return the tokens.
		return tokens;
	};


	//---------------------------------------------------------------------
	tokenizer.tokenize = tokenize;
	tokenizer.Tokenize = tokenize;


	//---------------------------------------------------------------------
	// Return the Tokenizer Object.
	return tokenizer;
};


//---------------------------------------------------------------------
// Export some general purpose parsing functions.
exports.ParseCommandLine = ( Text ) => require( './parsers/ParseCommandLine.js' ).ParseCommandLine( this, Text );
exports.ParseCsvString = ( Text ) => require( './parsers/ParseCsvString.js' ).ParseCsvString( this, Text );


