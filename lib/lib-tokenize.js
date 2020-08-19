"use strict";


exports.TokenTypes =
{
	whitespace: 'ws',
	symbol: 'sy',
	literal: 'sl',
	identifier: 'id',
	number: 'nu',
	keyword: 'kw',
};


exports.NewTokenizer =
	function NewTokenizer()
	{

		//---------------------------------------------------------------------
		// Create a new Tokenizer Object.
		let tokenizer = {};
		tokenizer.whitespace_chars = ` \t\r\n`;
		tokenizer.symbol_chars = `,:;=<>+-*/^()[]{}`;
		tokenizer.literal_delimiters = `'"`;
		tokenizer.literal_escape_char = `\\`;
		tokenizer.keywords = [];

		//---------------------------------------------------------------------
		let tokenizer_state =
		{
			uninitialized: 0,
			scanning_literal: 1,
			scanning_identifier: 1,
		};


		//---------------------------------------------------------------------
		tokenizer.tokenize =
			function tokenize( Text )
			{
				let tokens = [];

				// Json = Json.replace( '\t', ' ' );
				// Json = Json.replace( '\n', ' ' );
				// while ( Json.includes( '  ' ) ) { Json = Json.replace( '  ', ' ' ); }
			
				let whitespace = ' \t\n';
				let delimiters = '[]{}:,';
				let quotes = `'"`;
			
				let ichar = 0;
				while ( ichar < Json.length )
				{
					let ch = Json.charAt( ichar );
					if ( whitespace.includes( ch ) )
					{
						ichar++;
					}
					else if ( delimiters.includes( ch ) )
					{
						tokens.push( {
							token: ch,
							type: 'delimiter',
							at: ichar,
						} );
						ichar++;
					}
					else if ( quotes.includes( ch ) )
					{
						let iat = ichar;
						ichar++;
						let s = '';
						while ( ichar < Json.length )
						{
							let ch2 = Json.charAt( ichar );
							if ( ch2 === ch )
							{
								ichar++;
								break;
							}
							if ( ch2 === '\\' )
							{
								ichar++;
								if ( ichar < Json.length )
								{
									ch2 = Json.charAt( ichar );
								}
								else
								{
									ch2 = '';
								}
							}
							s += ch2;
							ichar++;
						}
						tokens.push( {
							token: s,
							type: 'string',
							at: iat,
						} );
					}
					else
					{
						let iat = ichar;
						ichar++;
						let s = ch;
						while ( ichar < Json.length )
						{
							let ch2 = Json.charAt( ichar );
							if (
								whitespace.includes( ch2 )
								|| delimiters.includes( ch2 )
								|| quotes.includes( ch2 )
							)
							{
								break;
							}
							s += ch2;
							ichar++;
						}
						tokens.push( {
							token: s,
							type: 'literal',
							at: iat,
						} );
					}
				}
			
				return tokens;
			};


		// Return the Tokenizer Object.
		return tokenizer;
	};
