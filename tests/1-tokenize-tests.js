"use strict";


const LIB_TOKENIZE = require( '../src/lib-tokenize.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `Tokenize Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `should tokenize an undefined string`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				let tokens = tokenizer.tokenize();
				LIB_ASSERT.notStrictEqual( tokens, null );
				LIB_ASSERT.equal( tokens.length, 0 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize an empty string`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				let tokens = tokenizer.tokenize( "" );
				LIB_ASSERT.notStrictEqual( tokens, null );
				LIB_ASSERT.equal( tokens.length, 0 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize a simple string`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				let tokens = tokenizer.tokenize( "Abracadabra" );
				LIB_ASSERT.notStrictEqual( tokens, null );
				LIB_ASSERT.equal( tokens.length, 1 );
				LIB_ASSERT.equal( tokens[ 0 ].token, "Abracadabra" );
				LIB_ASSERT.equal( tokens[ 0 ].type, LIB_TOKENIZE.TokenTypes.identifier );
				LIB_ASSERT.equal( tokens[ 0 ].at, 0 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize a more complex string`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				tokenizer.keywords.push( 'let' );
				let tokens = tokenizer.tokenize( "let X = 3.14;" );
				LIB_ASSERT.notStrictEqual( tokens, null );
				// console.log( tokens );
				let expected_tokens =
					[
						{ token: "let", type: LIB_TOKENIZE.TokenTypes.keyword, at: 0 },
						{ token: " ", type: LIB_TOKENIZE.TokenTypes.whitespace, at: 3 },
						{ token: "X", type: LIB_TOKENIZE.TokenTypes.identifier, at: 4 },
						{ token: " ", type: LIB_TOKENIZE.TokenTypes.whitespace, at: 5 },
						{ token: "=", type: LIB_TOKENIZE.TokenTypes.symbol, at: 6 },
						{ token: " ", type: LIB_TOKENIZE.TokenTypes.whitespace, at: 7 },
						{ token: "3.14", type: LIB_TOKENIZE.TokenTypes.numeric, at: 8 },
						{ token: ";", type: LIB_TOKENIZE.TokenTypes.symbol, at: 12 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize a symbol`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				let tokens = tokenizer.tokenize( "=" );
				LIB_ASSERT.notStrictEqual( tokens, null );
				let expected_tokens =
					[
						{ token: "=", type: LIB_TOKENIZE.TokenTypes.symbol, at: 0 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize whitespace`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				let tokens = tokenizer.tokenize( "\t \n" );
				LIB_ASSERT.notStrictEqual( tokens, null );
				let expected_tokens =
					[
						{ token: "\t \n", type: LIB_TOKENIZE.TokenTypes.whitespace, at: 0 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize a literal`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				let tokens = tokenizer.tokenize( `"What is the answer?"` );
				LIB_ASSERT.notStrictEqual( tokens, null );
				let expected_tokens =
					[
						{ token: `"What is the answer?"`, type: LIB_TOKENIZE.TokenTypes.literal, at: 0 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize a literal with an apostrophe`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				let tokens = tokenizer.tokenize( `"What's the answer?"` );
				LIB_ASSERT.notStrictEqual( tokens, null );
				let expected_tokens =
					[
						{ token: `"What's the answer?"`, type: LIB_TOKENIZE.TokenTypes.literal, at: 0 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize a literal with an escape character`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				let tokens = tokenizer.tokenize( `'What\\'s the answer?'` );
				LIB_ASSERT.notStrictEqual( tokens, null );
				let expected_tokens =
					[
						{ token: `'What\\'s the answer?'`, type: LIB_TOKENIZE.TokenTypes.literal, at: 0 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize a literal with an alternate escape character`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				tokenizer.literal_escape_chars += '~';
				let tokens = tokenizer.tokenize( `'What~'s the answer?'` );
				LIB_ASSERT.notStrictEqual( tokens, null );
				let expected_tokens =
					[
						{ token: `'What~'s the answer?'`, type: LIB_TOKENIZE.TokenTypes.literal, at: 0 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should tokenize a literal with a self escaping duplicate character`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				tokenizer.self_escape_literal_delimiters = true;
				let tokens = tokenizer.tokenize( `"What's ""the"" answer?"` );
				LIB_ASSERT.notStrictEqual( tokens, null );
				let expected_tokens =
					[
						{ token: `"What's ""the"" answer?"`, type: LIB_TOKENIZE.TokenTypes.literal, at: 0 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should discard whitespace`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				tokenizer.discard_whitespace = true;
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				tokenizer.keywords.push( 'let' );
				let tokens = tokenizer.tokenize( "let X = 3.14;" );
				LIB_ASSERT.notStrictEqual( tokens, null );
				// console.log( tokens );
				let expected_tokens =
					[
						{ token: "let", type: LIB_TOKENIZE.TokenTypes.keyword, at: 0 },
						{ token: "X", type: LIB_TOKENIZE.TokenTypes.identifier, at: 4 },
						{ token: "=", type: LIB_TOKENIZE.TokenTypes.symbol, at: 6 },
						{ token: "3.14", type: LIB_TOKENIZE.TokenTypes.numeric, at: 8 },
						{ token: ";", type: LIB_TOKENIZE.TokenTypes.symbol, at: 12 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should detect keywords, case sensitive`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				tokenizer.discard_whitespace = true;
				tokenizer.keywords_are_case_sensitive = true;
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				tokenizer.keywords.push( 'Let' );
				let tokens = tokenizer.tokenize( "let X = 3.14;" );
				LIB_ASSERT.notStrictEqual( tokens, null );
				// console.log( tokens );
				let expected_tokens =
					[
						{ token: "let", type: LIB_TOKENIZE.TokenTypes.identifier, at: 0 },
						{ token: "X", type: LIB_TOKENIZE.TokenTypes.identifier, at: 4 },
						{ token: "=", type: LIB_TOKENIZE.TokenTypes.symbol, at: 6 },
						{ token: "3.14", type: LIB_TOKENIZE.TokenTypes.numeric, at: 8 },
						{ token: ";", type: LIB_TOKENIZE.TokenTypes.symbol, at: 12 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should detect keywords, case insensitive`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				tokenizer.discard_whitespace = true;
				tokenizer.keywords_are_case_sensitive = false;
				LIB_ASSERT.notStrictEqual( tokenizer, null );
				tokenizer.keywords.push( 'Let' );
				let tokens = tokenizer.tokenize( "let X = 3.14;" );
				LIB_ASSERT.notStrictEqual( tokens, null );
				// console.log( tokens );
				let expected_tokens =
					[
						{ token: "let", type: LIB_TOKENIZE.TokenTypes.keyword, at: 0 },
						{ token: "X", type: LIB_TOKENIZE.TokenTypes.identifier, at: 4 },
						{ token: "=", type: LIB_TOKENIZE.TokenTypes.symbol, at: 6 },
						{ token: "3.14", type: LIB_TOKENIZE.TokenTypes.numeric, at: 8 },
						{ token: ";", type: LIB_TOKENIZE.TokenTypes.symbol, at: 12 },
					];
				LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
				return;
			} );


	} );
