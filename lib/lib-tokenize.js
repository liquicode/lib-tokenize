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


exports.NewTokenizer =
	function NewTokenizer()
	{

		//---------------------------------------------------------------------
		// Create a new Tokenizer Object.
		let tokenizer = {};
		tokenizer.whitespace = ` \t\r\n`;
		tokenizer.symbols = `,:;=<>+-*/^()[]{}`;
		tokenizer.literal_delimiters = `'"`;
		tokenizer.literal_escape_chars = `\\`;
		tokenizer.keywords = [];
		// tokenizer.discard_whitespace = false;
		// tokenizer.keywords_are_case_sensitive = false;


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
				if ( ichar === len ) { break; }
				let ch = Text.charAt( ichar );
				if ( ch === start_char )
				{
					ichar++;
					break;
				}
				else
				{
					if ( Tokenizer.literal_escape_chars.includes( ch ) )
					{
						ichar++; // Take the escape character
						ichar++; // Take the next character
					}
					ichar++;
				}
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
			if ( Tokenizer.keywords.includes( token.token ) )
			{
				token.type = TokenTypes.keyword;
			}
			return token;
		}


		//---------------------------------------------------------------------
		tokenizer.tokenize =
			function tokenize( Text )
			{
				let tokens = [];
				if ( !Text ) { return tokens; }

				let ichar = 0;
				let len = Text.length;
				while ( true )
				{
					let token = read_whitespace( this, Text, ichar );
					if ( !token ) { token = read_symbol( this, Text, ichar ); }
					if ( !token ) { token = read_literal( this, Text, ichar ); }
					if ( !token ) { token = read_numeric( this, Text, ichar ); }
					if ( !token ) { token = read_identifier( this, Text, ichar ); }
					if ( !token ) { throw new Error( `Unable to continue parsing at location ${ichar}.` ); }
					ichar += token.token.length;
					tokens.push( token );
					if ( ichar === len ) { break; }
				}

				return tokens;
			};


		// Return the Tokenizer Object.
		return tokenizer;
	};
