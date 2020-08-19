"use strict";


const LIB_TOKENIZE = require( '../lib/lib-tokenize.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `Tokenize Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `should tokenize simple strings`,
			async function ()
			{
				let tokenizer = LIB_TOKENIZE.NewTokenizer();
				LIB_ASSERT.notEqual( tokenizer, null );
				return;
			} );


	} );
