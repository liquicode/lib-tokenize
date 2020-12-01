"use strict";


const LIB_TOKENIZE = require( '../src/lib-tokenize.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `02) ParseCommandLine`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `should throw an error for illegal strings: "-"`,
			async function ()
			{
				LIB_ASSERT.throws( () => LIB_TOKENIZE.ParseCommandLine( `-` ), Error );
				return;
			} );


		//---------------------------------------------------------------------
		it( `returns an empty object for an empty string: ""`,
			async function ()
			{
				let result = LIB_TOKENIZE.ParseCommandLine( `` );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( JSON.stringify( result ), JSON.stringify( {} ) );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle a simple flag: "-f"`,
			async function ()
			{
				let result = LIB_TOKENIZE.ParseCommandLine( `-f` );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.f, true );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle several simple flags: "-a -b -c"`,
			async function ()
			{
				let text = `-a -b -c`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.a, true );
				LIB_ASSERT.strictEqual( result.b, true );
				LIB_ASSERT.strictEqual( result.c, true );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle a single key-value: "-f:42"`,
			async function ()
			{
				let text = `-f:42`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.f, 42 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle a single key-value: "-f=42"`,
			async function ()
			{
				let text = `-f=42`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.f, 42 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle a single key-value: "-f 42"`,
			async function ()
			{
				let text = `-f 42`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.f, 42 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle a multiple key-values: "-f 42 -x = foo -msg: 'Hello'"`,
			async function ()
			{
				let text = `-f 42 -x = foo -msg: 'Hello'`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.f, 42 );
				LIB_ASSERT.strictEqual( result.x, 'foo' );
				LIB_ASSERT.strictEqual( result.msg, 'Hello' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle flags and key-values: "-a -f 42 -b -x = foo -c -msg: 'Hello'"`,
			async function ()
			{
				let text = `-a -f 42 -b -x = foo -c -msg: 'Hello'`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.a, true );
				LIB_ASSERT.strictEqual( result.f, 42 );
				LIB_ASSERT.strictEqual( result.b, true );
				LIB_ASSERT.strictEqual( result.x, 'foo' );
				LIB_ASSERT.strictEqual( result.c, true );
				LIB_ASSERT.strictEqual( result.msg, 'Hello' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle optional leading '-': "f 42"`,
			async function ()
			{
				let text = `f 42`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.f, 42 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle optional leading '-': "a 1 b 2 c 3"`,
			async function ()
			{
				let text = `a 1 b 2 c 3`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.a, 1 );
				LIB_ASSERT.strictEqual( result.b, 2 );
				LIB_ASSERT.strictEqual( result.c, 3 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle optional leading '-': "a 1 b 2 c 3"`,
			async function ()
			{
				let text = `a 1 b 2 c 3`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.a, 1 );
				LIB_ASSERT.strictEqual( result.b, 2 );
				LIB_ASSERT.strictEqual( result.c, 3 );
				return;
			} );


		//---------------------------------------------------------------------
		it( `can handle multiple leading '-': "--f 42"`,
			async function ()
			{
				let text = `--f 42`;
				let result = LIB_TOKENIZE.ParseCommandLine( text );
				LIB_ASSERT.ok( result );
				LIB_ASSERT.strictEqual( result.f, 42 );
				return;
			} );


		return;
	} );
