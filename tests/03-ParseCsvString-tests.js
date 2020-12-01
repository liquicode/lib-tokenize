"use strict";


const LIB_TOKENIZE = require( '../src/lib-tokenize.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `03) ParseCsvString`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `can parse a string: 0001,"John","O'Malley","The ""Boss""","ABC-1234"`,
			async function ()
			{
				let text = `0001,"John","O'Malley","The ""Boss""","ABC-1234"`;
				let result = LIB_TOKENIZE.ParseCsvString( text );
				LIB_ASSERT.strictEqual( result.length, 5 );
				LIB_ASSERT.strictEqual( result[ 0 ], `0001` );
				LIB_ASSERT.strictEqual( result[ 1 ], `John` );
				LIB_ASSERT.strictEqual( result[ 2 ], `O'Malley` );
				LIB_ASSERT.strictEqual( result[ 3 ], `The ""Boss""` ); //NOTE: This is not really what we want.
				LIB_ASSERT.strictEqual( result[ 4 ], `ABC-1234` );
				return;
			} );


		return;
	} );
