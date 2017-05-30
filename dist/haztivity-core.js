(function(FuseBox){FuseBox.$fuse$=FuseBox;
/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

FuseBox.pkg("@haztivity/core", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var jquery_1 = require("./jquery");
exports.$ = jquery_1.$;
var devTools_1 = require("./devTools");
exports.Logger = devTools_1.Logger;
var di_1 = require("./di");
exports.InjectorService = di_1.InjectorService;
exports.IInjectorService = di_1.IInjectorService;
exports.IInjectorRegisterService = di_1.IInjectorRegisterService;
exports.Service = di_1.Service;
exports.IServiceParams = di_1.IServiceParams;
exports.ServiceInstance = di_1.ServiceInstance;
exports.IServiceInstanceParams = di_1.IServiceInstanceParams;
exports.Module = di_1.Module;
exports.IModuleParams = di_1.IModuleParams;
exports.Sco = di_1.Sco;
exports.IScoParams = di_1.IScoParams;
exports.Dependencies = di_1.Dependencies;
exports.Page = di_1.Page;
exports.IPageParams = di_1.IPageParams;
exports.Resource = di_1.Resource;
exports.IResourceParams = di_1.IResourceParams;
exports.Component = di_1.Component;
exports.IComponentParams = di_1.IComponentParams;
var Injector_1 = require("./di/Injector");
var devTools_2 = require("./devTools");
Injector_1.Injector.getInstance().registerServiceInstance("Logger", devTools_2.Logger);
var utils_1 = require("./utils");
exports.EventEmitter = utils_1.EventEmitter;
exports.EventEmitterFactory = utils_1.EventEmitterFactory;
exports.DataOptions = utils_1.DataOptions;
exports.S = utils_1.S;
var sco_1 = require("./sco");
exports.ScoFactory = sco_1.ScoFactory;
exports.ISco = sco_1.ISco;
exports.IScoOptions = sco_1.IScoOptions;
exports.ScoController = sco_1.ScoController;
var page_1 = require("./page");
exports.PageController = page_1.PageController;
exports.PageRegister = page_1.PageRegister;
exports.IPageOptions = page_1.IPageOptions;
exports.PageFactory = page_1.PageFactory;
exports.PageManager = page_1.PageManager;
exports.GenericPageController = page_1.GenericPageController;
var resource_1 = require("./resource");
exports.ResourceInitializerService = resource_1.ResourceInitializerService;
exports.ResourceController = resource_1.ResourceController;
exports.ResourceManager = resource_1.ResourceManager;
exports.ResourceSequenceFactory = resource_1.ResourceSequenceFactory;
exports.ResourceSequence = resource_1.ResourceSequence;
var navigator_1 = require("./navigator");
exports.Navigator = navigator_1.Navigator;
exports.INavigatorPageData = navigator_1.INavigatorPageData;
exports.NavigatorService = navigator_1.NavigatorService;
var component_1 = require("./component");
exports.ComponentController = component_1.ComponentController;
exports.ComponentManager = component_1.ComponentManager;
exports.ComponentInitializer = component_1.ComponentInitializer;
var scorm_1 = require("./scorm");
exports.ScormService = scorm_1.ScormService;
__export(require("./global"));
//# sourceMappingURL=index.js.map
});
___scope___.file("jquery.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("./di");
var $ = require("jquery");
exports.$ = $;
di_1.Injector.getInstance().registerServiceInstance("$", $);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
//using global jquery
//# sourceMappingURL=jquery.js.map
});
___scope___.file("di.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Injector_1 = require("./di/Injector");
exports.Injector = Injector_1.Injector;
exports.TYPES = Injector_1.TYPES;
exports.IInjectorType = Injector_1.IInjectorType;
exports.InjectorRegisterService = Injector_1.InjectorRegisterService;
exports.IInjectorRegisterService = Injector_1.IInjectorRegisterService;
exports.InjectorService = Injector_1.InjectorService;
exports.IInjectorService = Injector_1.IInjectorService;
__export(require("./di/decorators"));
//# sourceMappingURL=di.js.map
});
___scope___.file("di/Injector.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Bottle = require("bottlejs");
var arrUnique = require("array-unique");
var Errors_1 = require("./Errors");
//Create readonly types
exports.TYPES = (function () {
    function sealProperty(val) {
        //Object.freeze(val);
        return {
            writable: false,
            configurable: false,
            value: val
        };
    }
    function registerType(types, name, allowAccess) {
        var obj = {};
        Object.defineProperties(obj, {
            "name": sealProperty(name),
            "allowAccess": sealProperty(allowAccess)
        });
        types[name] = obj;
    }
    var types = {};
    registerType(types, "Core", true);
    registerType(types, "CorePublic", true);
    registerType(types, "Module", [
        "Core",
        "CorePublic",
        "Service",
        "Page"
    ]);
    registerType(types, "Service", [
        "CorePublic",
        "Service",
        "Component",
        "Module"
    ]);
    registerType(types, "Sco", [
        "Core",
        "CorePublic",
        "Resource",
        "Component",
        "Service"
    ]);
    registerType(types, "Resource", [
        "Service"
    ]);
    registerType(types, "Component", [
        "CorePublic",
        "Service"
    ]);
    registerType(types, "Page", [
        "Service"
    ]);
    //Object.freeze(types);
    return types;
})();
/**
 * Inyector de dependencias. Api para la manipulación de contenedores y dependencias
 * @class
 */
var Injector = (function () {
    /**
     * Instancia el Inyector. Por defecto se genera un contenedor root
     * @constructor
     */
    function Injector() {
        this._registers = new Map();
        this._registersName = new Map();
        this._arrUnique = arrUnique;
        this._root = new Bottle();
    }
    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String}  name    Nombre registrado de la clase a comprobar
     * @returns {boolean}
     */
    Injector.prototype.exists = function (name) {
        return this._registersName.has(name);
    };
    Injector.prototype._getInjectorRegister = function (key) {
        var result;
        if (typeof key == "string") {
            result = this._registersName.get(key);
        }
        else {
            result = this._registers.get(key);
        }
        return result;
    };
    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object}  service    Dependencia a obtener. Puede ser el nombre con el que se ha registrado o la clase
     */
    Injector.prototype._getFromBottle = function (service) {
        return this._root.container[service];
    };
    /**
     * Obtiene el provider para una clase
     * @param {String}  name        Nombre de la clase para la cual obtener el provider
     * @returns {any}
     * @private
     */
    Injector.prototype._getProvider = function (name) {
        return this._root.container[name + "Provider"];
    };
    /**
     * Registra el nombre indicado para la dependencia
     * @param {Function|Object}         target      Dependencia en la cual registrar el nombre
     * @param {String}                  name        Nombre a registrar
     * @private
     */
    Injector.prototype._setName = function (target, name) {
        var save = target.prototype || target;
        Object.defineProperty(save, "_injectorName", {
            configurable: false,
            writable: false,
            value: name
        });
    };
    /**
     * Obtiene el nombre registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el nombre
     * @returns {String}
     * @private
     */
    Injector.prototype._getName = function (target) {
        return target.prototype
            ? target.prototype._injectorName
            : target._injectorName;
    };
    /**
     * Registra el tipo para la dependencia
     * @param {Function|Object}         target          Dependencia en la cual registrar el tipo
     * @param {String}                  type            Tipo a registrar
     * @private
     */
    Injector.prototype._setType = function (target, type) {
        var save = target.prototype || target;
        Object.defineProperty(save, "_injectorType", {
            configurable: false,
            writable: false,
            value: type
        });
    };
    /**
     * Obtiene el tipo registrado para una dependencia
     * @param {Function|Object}     target      Objeto en el cual buscar el tipo
     * @returns {String}
     * @private
     */
    Injector.prototype._getType = function (target) {
        return target.prototype
            ? target.prototype._injectorType
            : target._injectorType;
    };
    /**
     * Obtiene un conjunto de dependencias para un tipo concreto validando el acceso
     * @param {*}       target         Servicio para el cual obtener instancias de sus dependencias
     * @param {*}       [dependencies]  Dependencias concretas a obtener. En caso de no indicarse se obtienen todas
     * @returns {Array}
     * @protected
     */
    Injector.prototype._getFor = function (target, dependencies) {
        var serviceInjectorRegister = this._getInjectorRegister(target), resolvedDependencies = [], serviceName = serviceInjectorRegister.name;
        dependencies = dependencies || serviceInjectorRegister.dependencies;
        //each dependency to resolve
        for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
            var dependencyToResolve = dependencies_1[_i];
            //dependency must exists
            if (dependencyToResolve != undefined) {
                var dependencyToResolveInjectorRegister = this._getInjectorRegister(dependencyToResolve), dependencyToResolveName = void 0;
                if (dependencyToResolveInjectorRegister != undefined) {
                    dependencyToResolveName = dependencyToResolveInjectorRegister.name;
                    //try to get the provider
                    var serviceType = serviceInjectorRegister.type, dependencyType = dependencyToResolveInjectorRegister.type;
                    if (serviceType && dependencyType && (serviceType.allowAccess === true || serviceType.allowAccess.indexOf(dependencyType.name) !== -1)) {
                        var dependency = this._getFromBottle(dependencyToResolveName);
                        //If the dependency is the InjectorService, create de instance with the service
                        //For more info see InjectorService
                        if (dependencyToResolveName === "InjectorService") {
                            dependency = dependency.instance(serviceInjectorRegister.service);
                        }
                        resolvedDependencies.push(dependency);
                    }
                    else {
                        throw new Errors_1.HaztivityDependencyAccessDenied(serviceName, dependencyToResolveName);
                    }
                }
                else {
                    throw new Errors_1.HaztivityDependencyNotRegisteredError(dependencyToResolve, serviceName);
                }
            }
            else {
                throw new Errors_1.HaztivityDependencyNotValid(serviceName, dependencies);
            }
        }
        return resolvedDependencies;
    };
    /**
     * Registra un servicio
     * @param {IInjectorType}   type            Tipo de elemento de haztivity
     * @param {String}          name            Nombre del servicio. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @example
     * class MyService{
     *
     * }
     * let myServiceDependencies = [
     *      "SomeDependency"
     * ]
     * injector._registerService("MyService",MyService,myServiceDependencies,(service,dependencies,resolvedDependencies)=>{
     *      let instance = new service(...resolvedDependencies);
     *      instance.doSomething();
     *      return instance;
     * })
     * @protected
     * @throws HaztivityDependencyHasItsOwnAsDependency
     * @throws HaztivityDependencyAlreadyRegistered
     * @throws HaztivityDependencyOptionRequired
     */
    Injector.prototype._registerService = function (type, name, service, dependencies, factory) {
        var _this = this;
        if (this._validateName(name, dependencies)) {
            //store type in the constructor to manage permisions
            var injectorRegister = {
                name: name,
                type: type,
                dependencies: dependencies,
                service: service
            };
            this._addRegister(injectorRegister);
            var bottleInstance = this._root.factory(name, function (container) {
                var injectorRegister = _this._getInjectorRegister(name), service = injectorRegister.service;
                var resolvedDependencies = _this._getFor(service);
                //if a custom factory function is provided
                if (typeof factory === "function") {
                    return factory.call(null, service, injectorRegister.dependencies, resolvedDependencies);
                }
                else {
                    return new (service.bind.apply(service, [void 0].concat(resolvedDependencies)))();
                }
            });
        }
    };
    Injector.prototype._addRegister = function (register) {
        this._registers.set(register.service, register);
        this._registersName.set(register.name, register);
    };
    /**
     * Registra dependencias en una clase
     * @param {*}                   service         Servicio en el cual registrar las dependencias
     * @param {String[]}            dependencies    Dependencias a registrar
     * @private
     */
    Injector.prototype.registerDependencies = function (service, dependencies) {
        var registeredDependencies = this._getRegisteredDependencies(service);
        //if the element already has dependencies, concat
        dependencies = this._arrUnique(dependencies.concat(registeredDependencies));
        service.prototype.$inject = dependencies;
        return dependencies;
    };
    /**
     * Recupera las dependencias registradas en una clase
     * @param {*}   service     Servicio del cual recuperar las dependencias
     * @returns {Array<string>}
     * @private
     */
    Injector.prototype._getRegisteredDependencies = function (service) {
        return service.prototype.$inject || [];
    };
    /**
     * Registra una clase instanciable generando un factory. Funciona de forma similar a _registerService con la diferencia de que la función factory indicada se ejecutará cada vez
     * que se solicite la dependencia generando una instancia nueva de la clase.
     * @param {IInjectorType}   type            Tipo de elemento de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @example
     * class MyClass{
     *
     * }
     * let myClassDependencies = [
     *      "SomeDependency"
     * ]
     * injector._registerTransient("MyClass",MyClass,myClassDependencies,(service,dependencies,resolvedDependencies)=>{
     *      let instance = new service(...resolvedDependencies);
     *      instance.doSomething();
     *      return instance;
     * })
     * @protected
     * @throws HaztivityDependencyHasItsOwnAsDependency
     * @throws HaztivityDependencyAlreadyRegistered
     * @throws HaztivityDependencyOptionRequired
     */
    Injector.prototype._registerTransient = function (type, name, service, dependencies, factory) {
        if (this._validateName(name, dependencies)) {
            var injectorRegister = {
                name: name,
                type: type,
                dependencies: dependencies,
                service: service
            };
            this._addRegister(injectorRegister);
            var that_1 = this;
            //create factory func
            var GenericFactory = function (container, params) {
                var injectorRegister = that_1._getInjectorRegister(name), service = injectorRegister.service, dependenciesToInject = injectorRegister.dependencies, resolvedDependencies = that_1._getFor(service);
                //if a custom factory function is provided
                if (typeof factory === "function") {
                    return factory.call(null, service, dependenciesToInject, resolvedDependencies, params);
                }
                else {
                    return new (service.bind.apply(service, [void 0].concat(resolvedDependencies)))();
                }
            };
            this._root.instanceFactory(name, GenericFactory);
        }
    };
    /**
     * Valida la disponibilidad de un nombre y las dependencias. El nombre no debe estar registrado y el propio nombre no puede estar registrado como una dependencia
     * @param {String}      name                Nombre a validar
     * @param {Stirng[]}    dependencies        Dependencias
     * @returns {boolean}
     * @protected
     * @throws HaztivityDependencyHasItsOwnAsDependency
     * @throws HaztivityDependencyAlreadyRegistered
     * @throws HaztivityDependencyOptionRequired
     */
    Injector.prototype._validateName = function (name, dependencies) {
        if (!!name) {
            if (!this.exists(name)) {
                if (dependencies.indexOf(name) === -1) {
                    return true;
                }
                else {
                    throw new Errors_1.HaztivityDependencyHasItsOwnAsDependency(name);
                }
            }
            else {
                throw new Errors_1.HaztivityDependencyAlreadyRegistered(name);
            }
        }
        else {
            throw new Errors_1.HaztivityDependencyOptionRequired("name");
        }
    };
    /**
     * Registra un servicio de tipo Service de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerService = function (name, service, dependencies, factory) {
        this._registerService(exports.TYPES.Service, name, service, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo Service de haztivity instanciable.
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerServiceTransient = function (name, service, dependencies, factory) {
        this._registerTransient(exports.TYPES.Service, name, service, dependencies, factory);
    };
    /**
     * Registra una instancia. No resuelve dependencias.
     * @param {String}          name            Nombre del servicio.
     * @param {*}               instance        Servicio a registar
     * @example
     * injector.registerServiceInstance("$",$);
     */
    Injector.prototype.registerServiceInstance = function (name, instance) {
        var dependencies = [];
        if (this._validateName(name, dependencies)) {
            var injectorRegister = {
                name: name,
                type: exports.TYPES.Service,
                dependencies: dependencies,
                service: instance
            };
            this._addRegister(injectorRegister);
            this._root.constant(name, instance);
        }
        else {
            throw new Errors_1.HaztivityDependencyAlreadyRegistered(name);
        }
    };
    /**
     * Registra un servicio de tipo Core de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerCore = function (name, service, dependencies, factory) {
        this._registerService(exports.TYPES.Core, name, service, dependencies, factory);
    };
    /**
     * Registra una clase de tipo Core de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class          Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    Injector.prototype.registerCoreTransient = function (name, Class, dependencies, factory) {
        this._registerTransient(exports.TYPES.Core, name, Class, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo CorePublic de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerCorePublic = function (name, service, dependencies, factory) {
        this._registerService(exports.TYPES.CorePublic, name, service, dependencies, factory);
    };
    /**
     * Registra una clase de tipo CorePublic de haztivity instanciable
     * @param {String}              name            Nombre con el cual registrar la clase
     * @param {*}                   Class           Clase a registrar
     * @param {String[]}            dependencies    Dependencias de la clase a registrar
     * @param {Function}            [factory]       Función que aplique la lógica de instanciación
     * @see _registerTransient
     */
    Injector.prototype.registerCorePublicTransient = function (name, Class, dependencies, factory) {
        this._registerTransient(exports.TYPES.CorePublic, name, Class, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo Sco de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerSco = function (name, service, dependencies, factory) {
        this._registerTransient(exports.TYPES.Sco, name, service, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo Module de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerModule = function (name, service, dependencies, factory) {
        this._registerService(exports.TYPES.Module, name, service, dependencies, factory);
    };
    /**
     * Registra un servicio de tipo Component de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerService
     * @see TYPES
     */
    Injector.prototype.registerComponent = function (name, service, dependencies, factory) {
        if (service._componentName == undefined) {
            service._componentName = name;
        }
        this._registerService(exports.TYPES.Component, name, service, dependencies, factory);
    };
    /**
     * Registra una clase de tipo Page de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerTransient
     * @see TYPES
     */
    Injector.prototype.registerPage = function (name, service, dependencies, factory) {
        this._registerTransient(exports.TYPES.Page, name, service, dependencies, factory);
    };
    /**
     * Registra una clase de tipo Resource de haztivity
     * @param {String}          name            Nombre de la dependencia. Debe ser único
     * @param {*}               service         Clase a registrar
     * @param {String[]}        dependencies    Conjunto de nombre de dependencias a inyectar. Las dependencias que puede inyectar están restringidas por el tipo de elemento registrado
     * @param {Function}        [factory]       Función para la instanciación de la clase. Debe devolver un objeto
     * @see _registerTransient
     * @see TYPES
     */
    Injector.prototype.registerResource = function (name, service, dependencies, factory) {
        if (service._resourceName == undefined) {
            service._resourceName = name;
        }
        this._registerTransient(exports.TYPES.Resource, name, service, dependencies, factory);
    };
    /**
     * Obtiene una instancia del inyector. Si se indica el parámetro target se obtiene una instancia del servicio InjectorService para ese target indicado.
     * Si no se indica target se obtiene una instancia de InjectorRegisterService
     * @param   {*}         [target]            Target para el cual obtener el servicio
     * @returns {Injector}
     * @see InjectorService
     * @see InjectorRegisterService
     */
    Injector.getInstance = function (target) {
        var toReturn;
        if (!Injector._instance) {
            Injector._instance = new Injector();
            Injector._registerInstance = new InjectorRegisterService(Injector._instance);
        }
        //The injector has a internal permission resolver, this resolver requires an haztivity type to work because each type has access to different dependencies.
        //To get the InjectorService that could get dependencies is required tell what type of element is requiring the dependency, to prevent that anyone could get any dependency, is necessary pass the element that want to get dependencies
        if (target) {
            toReturn = new InjectorService(Injector._instance, target);
        }
        else {
            toReturn = Injector._registerInstance;
        }
        return toReturn;
    };
    return Injector;
}());
exports.Injector = Injector;
var InjectorService = (function () {
    function InjectorService(injector, target) {
        this.get = function (service) {
            var result;
            if (Array.isArray(service)) {
                result = injector._getFor(target, service);
            }
            else {
                result = injector._getFor(target, [service]);
                if (result.length > 0) {
                    result = result[0];
                }
            }
            return result;
        };
        this.exists = injector.exists.bind(injector);
    }
    /**
     * @description Comprueba si una clase se ha registrado en el contenedor root. Equivale a injector.getContainer("root").exists("Dependencia");
     * @param {String|Object|Function}  dependency    Clase a comprobar
     * @returns {boolean}
     */
    InjectorService.prototype.exists = function (dependency) {
        return undefined;
    };
    /**
     * @description Obtiene una clase mediante el nombre registrado del contenedor root. Equivale a injector.getContainer("root").get("Dependencia");
     * @param {String|Object|Function}  dependency      Dependencia a obtener
     */
    InjectorService.prototype.get = function (dependency) {
    };
    return InjectorService;
}());
exports.InjectorService = InjectorService;
//Map dynamically the methods
var InjectorRegisterService = (function () {
    function InjectorRegisterService(injector) {
        var publish = [
            "registerService",
            "registerServiceTransient",
            "registerCore",
            "registerCoreTransient",
            "registerCorePublic",
            "registerCorePublicTransient",
            "registerSco",
            "registerModule",
            "registerComponent",
            "registerServiceInstance",
            "registerPage",
            "registerResource",
            "registerDependencies"
        ];
        for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
            var method = publish_1[_i];
            this[method] = injector[method].bind(injector);
        }
    }
    return InjectorRegisterService;
}());
exports.InjectorRegisterService = InjectorRegisterService;
//Register Injector as a instantiable service.
Injector.getInstance().registerServiceTransient("InjectorService", InjectorService, [], function (service, dependencies, resolvedDependencies, requester) {
    return Injector.getInstance(requester);
});
//# sourceMappingURL=Injector.js.map
});
___scope___.file("di/Errors.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var BaseError_1 = require("../base/BaseError");
/**
 * Error al intentar obtener una dependencia no registrada
 */
var HaztivityDependencyNotRegisteredError = (function (_super) {
    __extends(HaztivityDependencyNotRegisteredError, _super);
    function HaztivityDependencyNotRegisteredError(dependency, target) {
        return _super.call(this, "HaztivityDependencyNotRegisteredError", target
            ? "could not inject " + dependency + " into " + target + " because is not registered"
            : dependency + " is not registered in the Injector.") || this;
    }
    return HaztivityDependencyNotRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityDependencyNotRegisteredError = HaztivityDependencyNotRegisteredError;
/**
 * Error al intentar registrar una dependencia ya registrada
 */
var HaztivityDependencyAlreadyRegistered = (function (_super) {
    __extends(HaztivityDependencyAlreadyRegistered, _super);
    function HaztivityDependencyAlreadyRegistered(dependency) {
        return _super.call(this, "HaztivityDependencyAlreadyRegistered", dependency + " is already registered") || this;
    }
    return HaztivityDependencyAlreadyRegistered;
}(BaseError_1.BaseError));
exports.HaztivityDependencyAlreadyRegistered = HaztivityDependencyAlreadyRegistered;
/**
 * Error al no indicarse un parámetro obligatorio
 */
var HaztivityDependencyOptionRequired = (function (_super) {
    __extends(HaztivityDependencyOptionRequired, _super);
    function HaztivityDependencyOptionRequired(parameterName) {
        return _super.call(this, "HaztivityDependencyOptionRequired", "The parameter '" + parameterName + "' is required") || this;
    }
    return HaztivityDependencyOptionRequired;
}(BaseError_1.BaseError));
exports.HaztivityDependencyOptionRequired = HaztivityDependencyOptionRequired;
/**
 * Error al definir una clase como dependencia de ella misma
 */
var HaztivityDependencyHasItsOwnAsDependency = (function (_super) {
    __extends(HaztivityDependencyHasItsOwnAsDependency, _super);
    function HaztivityDependencyHasItsOwnAsDependency(dependency) {
        return _super.call(this, "HaztivityDependencyHasItsOwnAsDependency", dependency + " has its own as dependency") || this;
    }
    return HaztivityDependencyHasItsOwnAsDependency;
}(BaseError_1.BaseError));
exports.HaztivityDependencyHasItsOwnAsDependency = HaztivityDependencyHasItsOwnAsDependency;
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
var HaztivityDependencyAccessDenied = (function (_super) {
    __extends(HaztivityDependencyAccessDenied, _super);
    function HaztivityDependencyAccessDenied(target, dependency) {
        return _super.call(this, "HaztivityDependencyAccessDenied", target + " has not access to " + dependency) || this;
    }
    return HaztivityDependencyAccessDenied;
}(BaseError_1.BaseError));
exports.HaztivityDependencyAccessDenied = HaztivityDependencyAccessDenied;
/**
 * Error al intentar inyectar una dependencia a la que no se tiene acceso
 */
var HaztivityDependencyNotValid = (function (_super) {
    __extends(HaztivityDependencyNotValid, _super);
    function HaztivityDependencyNotValid(target, dependencies) {
        return _super.call(this, "HaztivityDependencyNotValid", "Some dependency for " + target + " is undefined.") || this;
    }
    return HaztivityDependencyNotValid;
}(BaseError_1.BaseError));
exports.HaztivityDependencyNotValid = HaztivityDependencyNotValid;
//# sourceMappingURL=Errors.js.map
});
___scope___.file("base/BaseError.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var devTools_1 = require("../devTools");
devTools_1.Logger;
var BaseError = (function (_super) {
    __extends(BaseError, _super);
    function BaseError(name, message) {
        var _this = _super.call(this, message) || this;
        _this.name = name;
        _this.message = message;
        devTools_1.Logger.error(name, message);
        return _this;
    }
    return BaseError;
}(Error));
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map
});
___scope___.file("devTools.js", function(exports, require, module, __filename, __dirname){

/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
"use strict";
var Logger_1 = require("./devTools/Logger");
exports.Logger = Logger_1.Logger;
//# sourceMappingURL=devTools.js.map
});
___scope___.file("devTools/Logger.js", function(exports, require, module, __filename, __dirname){

"use strict";
var loglevel = require("loglevel");
//Create log
var log = loglevel.getLogger("haztivity-core");
exports.Logger = log;
//Log plugin. Prepend [METHOD_NAME] CONTEXT - messages
var originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
    var rawMethod = originalFactory(methodName, logLevel, loggerName);
    return function (name) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        messages.unshift("[" + methodName.toUpperCase() + "] " + name + " - ");
        rawMethod.apply(undefined, messages);
    };
};
log.setLevel(log.getLevel()); // Be sure to call setLevel method in order to apply plugin
//# sourceMappingURL=Logger.js.map
});
___scope___.file("di/decorators.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Injector_1 = require("./Injector");
var injectorInstance = Injector_1.Injector.getInstance();
/**
 * Decorador para registrar una clase como Core.
 * Si se indica el parámetro public se registrará la clase como CorePublic, en caso contrario como Core
 * Si se indica el parámetro instantiable se registrará la clase como transient, en caso contrario como service
 * @param {ICoreParams}     params
 * @static
 * @function
 */
function Core(params) {
    return function (target) {
        if (params.public) {
            if (params.instantiable) {
                injectorInstance.registerCorePublicTransient(params.name, target, params.dependencies, params.factory);
            }
            else {
                injectorInstance.registerCorePublic(params.name, target, params.dependencies, params.factory);
            }
        }
        else {
            if (params.instantiable) {
                injectorInstance.registerCoreTransient(params.name, target, params.dependencies, params.factory);
            }
            else {
                injectorInstance.registerCore(params.name, target, params.dependencies, params.factory);
            }
        }
    };
}
exports.Core = Core;
/**
 * Decorador para registrar una clase como Module
 * @param {IModuleParams}     params
 * @static
 * @function
 */
function Module(params) {
    return function (target) {
        injectorInstance.registerModule(params.name, target, params.dependencies, params.factory);
    };
}
exports.Module = Module;
/**
 * Decorador para registrar una clase como Service
 * @param {IServiceParams}     params
 * @static
 * @function
 */
function Service(params) {
    return function (target) {
        injectorInstance.registerService(params.name, target, params.dependencies, params.factory);
    };
}
exports.Service = Service;
/**
 * Decorador para registrar una clase como ServiceInstance
 * @param {IServiceInstanceParams}     params
 * @static
 * @function
 */
function ServiceInstance(params) {
    return function (target) {
        injectorInstance.registerServiceInstance(params.name, params.instance);
    };
}
exports.ServiceInstance = ServiceInstance;
/**
 * Decorador para registrar una clase como Sco
 * @param {IScoParams}     params
 * @static
 * @function
 */
function Sco(params) {
    return function (target) {
        injectorInstance.registerSco(params.name, target, params.dependencies, params.factory);
    };
}
exports.Sco = Sco;
/**
 * Decorador para registrar una clase como Page
 * @param {IPageParams}     params
 * @static
 * @function
 */
function Page(params) {
    return function (target) {
        injectorInstance.registerPage(params.name, target, params.dependencies, params.factory);
    };
}
exports.Page = Page;
/**
 * Decorador para registrar una clase como Recurso
 * @param {IResourceParams}     params
 * @static
 * @function
 */
function Resource(params) {
    return function (target) {
        injectorInstance.registerResource(params.name, target, params.dependencies, params.factory);
    };
}
exports.Resource = Resource;
/**
 * Decorador para registrar una clase como Recurso
 * @param {IResourceParams}     params
 * @static
 * @function
 */
function Component(params) {
    return function (target) {
        injectorInstance.registerComponent(params.name, target, params.dependencies, params.factory);
    };
}
exports.Component = Component;
/**
 * Decorador para registrar las dependencias sin registrar la clase como inyectable
 * @param {{dependencies:any[]}}     params
 * @static
 * @function
 */
function Dependencies(params) {
    return function (target) {
        injectorInstance.registerDependencies(target, params.dependencies);
    };
}
exports.Dependencies = Dependencies;
//# sourceMappingURL=decorators.js.map
});
___scope___.file("utils.js", function(exports, require, module, __filename, __dirname){

/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
"use strict";
/**
 * @module
 * @description
 * El módulo "utils" contiene utilidades para el desarrollo
 */
var EventEmitterFactory_1 = require("./utils/EventEmitterFactory");
exports.EventEmitterFactory = EventEmitterFactory_1.EventEmitterFactory;
var EventEmitter_1 = require("./utils/EventEmitter");
exports.IEventHandler = EventEmitter_1.IEventHandler;
exports.EventEmitter = EventEmitter_1.EventEmitter;
var String_1 = require("./utils/String");
exports.S = String_1.S;
var DataOptions_1 = require("./utils/DataOptions");
exports.DataOptions = DataOptions_1.DataOptions;
//# sourceMappingURL=utils.js.map
});
___scope___.file("utils/EventEmitterFactory.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var EventEmitter_1 = require("./EventEmitter");
var EventEmitterFactory = (function () {
    /**
     * Factoria de EventEmitter. Permite generar instancias de EventEmitter para manipular eventos
     * @requires _EventEmitter
     */
    function EventEmitterFactory(_EventEmitter) {
        this._EventEmitter = _EventEmitter;
        this._globalEmitter = this.createEmitter();
    }
    /**
     * Genera una instancia de EventEmitter2
     * @param {*}  bind     Object to be the context to bind and trigger events
     * @returns {EventEmitter}
     */
    EventEmitterFactory.prototype.createEmitter = function (bind) {
        var eventEmitter = this._EventEmitter.instance();
        eventEmitter.activate(this._globalEmitter, bind);
        return eventEmitter;
    };
    return EventEmitterFactory;
}());
EventEmitterFactory = __decorate([
    di_1.Service({
        name: "EventEmitterFactory",
        dependencies: [
            EventEmitter_1.EventEmitter
        ]
    })
], EventEmitterFactory);
exports.EventEmitterFactory = EventEmitterFactory;
//# sourceMappingURL=EventEmitterFactory.js.map
});
___scope___.file("utils/EventEmitter.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var jquery_1 = require("../jquery");
//Register EventEmitter in DI
var di_1 = require("../di");
var EventEmitter = (function () {
    function EventEmitter(_$) {
        this._$ = _$;
        this._namespace = ".eventEmitter" + new Date().getTime();
    }
    EventEmitter.prototype.activate = function (global, bind) {
        if (bind === void 0) { bind = {}; }
        this._$context = this._$(bind);
        this.globalEmitter = global;
    };
    EventEmitter.prototype.trigger = function (eventType) {
        var extraParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extraParameters[_i - 1] = arguments[_i];
        }
        return this._$context.triggerHandler.apply(this._$context, arguments);
    };
    EventEmitter.prototype._attachNamespace = function (events) {
        events = events + " ";
        return events.replace(/\s/g, this._namespace + " ");
    };
    /**
     * Añade un handler para un evento. Hace uso del sistema de eventos de JQuery, se dispone de todas sus
     * características, incluido el uso de namespaces
     * @param {String}                  events  Eventos a los que añadir el handler. Se pueden añadir varios eventos
     * separados por
     * espacios
     * @param {*}                       data    Datos a trasladar al callback. Se recupera mediante event.data
     * @param {Function}                handler Función ha invocar al emitirse el evento
     * @returns {EventEmitter}
     * @example
     * function callback(e){
     *      let data = e.data,
     *          someVar = data.someVar;//"example"
     *      //do something
     * }
     * eventEmitter.on("someEvent",{someVar:"example"},callback);
     * @see http://api.jquery.com/on/
     */
    EventEmitter.prototype.on = function (events, data, handler) {
        var validEvents = this._attachNamespace(events);
        if (typeof data === "function" && typeof handler !== "function") {
            this._$context.on(validEvents, handler);
        }
        else {
            this._$context.on(validEvents, data, handler);
        }
        return this;
    };
    /**
     * Elimina los handlers para un evento. Hace uso del sistema de eventos de JQuery, se dispone de todas sus
     * características, incluido el uso de namespaces
     * @param {String}                  events  Eventos a eliminar. Se pueden añadir varios eventos separados por
     * espacios
     * @param {Function}                handler Función ha invocar al emitirse el evento
     * @returns {EventEmitter}
     * @example
     * eventEmitter.off("someEvent");
     * @see http://api.jquery.com/off/
     */
    EventEmitter.prototype.off = function (events, handler) {
        var validEvents = this._attachNamespace(events);
        this._$context.off(validEvents, handler);
        return this;
    };
    /**
     * Añade un handler para un evento que se auto elimina al lanzarse la primera vez. Hace uso del sistema de
     * eventos de JQuery, se dispone de todas sus
     * características, incluido el uso de namespaces
     * @param {String}                  events  Eventos a los que añadir el handler. Se pueden añadir varios eventos
     * separados por
     * espacios
     * @param {*}                       data    Datos a trasladar al callback. Se recupera mediante event.data
     * @param {Function}                handler Función ha invocar al emitirse el evento
     * @returns {EventEmitter}
     * @example
     * function callback(e){
     *      let data = e.data,
     *          someVar = data.someVar;//"example"
     *      //do something
     * }
     * eventEmitter.on("someEvent",{someVar:"example"},callback);
     * @see http://api.jquery.com/one/
     */
    EventEmitter.prototype.one = function (events, data, handler) {
        if (typeof data === "function" && typeof handler !== "function") {
            this._$context.one(events, handler);
        }
        else {
            this._$context.one(events, data, handler);
        }
        return this;
    };
    EventEmitter.prototype.destroy = function () {
        this.globalEmitter.off(this._namespace);
    };
    /**
     * Crea un objeto JQueryEvent para utilizarse con EventEmitter
     * @param {String}  name    Nombre del evento
     * @returns {JQueryEventObject}
     */
    EventEmitter.prototype.createEvent = function (name) {
        return this._$.Event(name);
    };
    return EventEmitter;
}());
EventEmitter = __decorate([
    di_1.Core({
        name: "EventEmitter",
        instantiable: true,
        public: true,
        dependencies: [
            jquery_1.$
        ]
    })
], EventEmitter);
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map
});
___scope___.file("utils/String.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
/**
 * Exporta StringJS.
 */
//SystemJS al utilizar el formato es6 de módulos devuelve siempre un objeto, String.js exporta una función por lo que al importarse en System como un Object no es posible utilizarlo
//Ha sido necesario extraer String.js al proyecto y modificar la exportación
var String_1 = require("../libs/String");
exports.S = String_1.S;
var di_1 = require("../di");
di_1.Injector.getInstance().registerServiceInstance("S", String_1.S);
//# sourceMappingURL=String.js.map
});
___scope___.file("libs/String.js", function(exports, require, module, __filename, __dirname){

/* */
"format cjs";
"use strict";
!function (e) { if ("object" == typeof exports)
    module.exports = e();
else if ("function" == typeof define && define.amd)
    define(e);
else {
    var f;
    "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.S = e();
} }(function () {
    var define, module, exports;
    return (function e(t, n, r) { function s(o, u) { if (!n[o]) {
        if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a)
                return a(o, !0);
            if (i)
                return i(o, !0);
            throw new Error("Cannot find module '" + o + "'");
        }
        var f = n[o] = { exports: {} };
        t[o][0].call(f.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e); }, f, f.exports, e, t, n, r);
    } return n[o].exports; } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++)
        s(r[o]); return s; })({ 1: [function (_dereq_, module, exports) {
                function count(self, substr) {
                    var count = 0;
                    var pos = self.indexOf(substr);
                    while (pos >= 0) {
                        count += 1;
                        pos = self.indexOf(substr, pos + 1);
                    }
                    return count;
                }
                module.exports = count;
            }, {}], 2: [function (_dereq_, module, exports) {
                function splitLeft(self, sep, maxSplit, limit) {
                    if (typeof maxSplit === 'undefined') {
                        var maxSplit = -1;
                    }
                    var splitResult = self.split(sep);
                    var splitPart1 = splitResult.slice(0, maxSplit);
                    var splitPart2 = splitResult.slice(maxSplit);
                    if (splitPart2.length === 0) {
                        splitResult = splitPart1;
                    }
                    else {
                        splitResult = splitPart1.concat(splitPart2.join(sep));
                    }
                    if (typeof limit === 'undefined') {
                        return splitResult;
                    }
                    else if (limit < 0) {
                        return splitResult.slice(limit);
                    }
                    else {
                        return splitResult.slice(0, limit);
                    }
                }
                module.exports = splitLeft;
            }, {}], 3: [function (_dereq_, module, exports) {
                function splitRight(self, sep, maxSplit, limit) {
                    if (typeof maxSplit === 'undefined') {
                        var maxSplit = -1;
                    }
                    if (typeof limit === 'undefined') {
                        var limit = 0;
                    }
                    var splitResult = [self];
                    for (var i = self.length - 1; i >= 0; i--) {
                        if (splitResult[0].slice(i).indexOf(sep) === 0 &&
                            (splitResult.length <= maxSplit || maxSplit === -1)) {
                            splitResult.splice(1, 0, splitResult[0].slice(i + sep.length)); // insert
                            splitResult[0] = splitResult[0].slice(0, i);
                        }
                    }
                    if (limit >= 0) {
                        return splitResult.slice(-limit);
                    }
                    else {
                        return splitResult.slice(0, -limit);
                    }
                }
                module.exports = splitRight;
            }, {}], 4: [function (_dereq_, module, exports) {
                /*
                 string.js - Copyright (C) 2012-2014, JP Richardson <jprichardson@gmail.com>
                 */
                !(function () {
                    "use strict";
                    var VERSION = '3.3.3';
                    var ENTITIES = {};
                    // from http://semplicewebsites.com/removing-accents-javascript
                    var latin_map = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "ẞ": "SS", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ß": "ss", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
                    //******************************************************************************
                    // Added an initialize function which is essentially the code from the S
                    // constructor.  Now, the S constructor calls this and a new method named
                    // setValue calls it as well.  The setValue function allows constructors for
                    // modules that extend string.js to set the initial value of an object without
                    // knowing the internal workings of string.js.
                    //
                    // Also, all methods which return a new S object now call:
                    //
                    //      return new this.constructor(s);
                    //
                    // instead of:
                    //
                    //      return new S(s);
                    //
                    // This allows extended objects to keep their proper instanceOf and constructor.
                    //******************************************************************************
                    function initialize(object, s) {
                        if (s !== null && s !== undefined) {
                            if (typeof s === 'string')
                                object.s = s;
                            else
                                object.s = s.toString();
                        }
                        else {
                            object.s = s; //null or undefined
                        }
                        object.orig = s; //original object, currently only used by toCSV() and toBoolean()
                        if (s !== null && s !== undefined) {
                            if (object.__defineGetter__) {
                                object.__defineGetter__('length', function () {
                                    return object.s.length;
                                });
                            }
                            else {
                                object.length = s.length;
                            }
                        }
                        else {
                            object.length = -1;
                        }
                    }
                    function S(s) {
                        initialize(this, s);
                    }
                    var __nsp = String.prototype;
                    var __sp = S.prototype = {
                        between: function (left, right) {
                            var s = this.s;
                            var startPos = s.indexOf(left);
                            var endPos = s.indexOf(right, startPos + left.length);
                            if (endPos == -1 && right != null)
                                return new this.constructor('');
                            else if (endPos == -1 && right == null)
                                return new this.constructor(s.substring(startPos + left.length));
                            else
                                return new this.constructor(s.slice(startPos + left.length, endPos));
                        },
                        //# modified slightly from https://github.com/epeli/underscore.string
                        camelize: function () {
                            var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function (mathc, sep, c) {
                                return (c ? c.toUpperCase() : '');
                            });
                            return new this.constructor(s);
                        },
                        capitalize: function () {
                            return new this.constructor(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
                        },
                        charAt: function (index) {
                            return this.s.charAt(index);
                        },
                        chompLeft: function (prefix) {
                            var s = this.s;
                            if (s.indexOf(prefix) === 0) {
                                s = s.slice(prefix.length);
                                return new this.constructor(s);
                            }
                            else {
                                return this;
                            }
                        },
                        chompRight: function (suffix) {
                            if (this.endsWith(suffix)) {
                                var s = this.s;
                                s = s.slice(0, s.length - suffix.length);
                                return new this.constructor(s);
                            }
                            else {
                                return this;
                            }
                        },
                        //#thanks Google
                        collapseWhitespace: function () {
                            var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
                            return new this.constructor(s);
                        },
                        contains: function (ss) {
                            return this.s.indexOf(ss) >= 0;
                        },
                        count: function (ss) {
                            return _dereq_('./_count')(this.s, ss);
                        },
                        //#modified from https://github.com/epeli/underscore.string
                        dasherize: function () {
                            var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
                            return new this.constructor(s);
                        },
                        equalsIgnoreCase: function (prefix) {
                            var s = this.s;
                            return s.toLowerCase() == prefix.toLowerCase();
                        },
                        latinise: function () {
                            var s = this.replace(/[^A-Za-z0-9\[\] ]/g, function (x) { return latin_map[x] || x; });
                            return new this.constructor(s);
                        },
                        decodeHtmlEntities: function () {
                            var s = this.s;
                            s = s.replace(/&#(\d+);?/g, function (_, code) {
                                return String.fromCharCode(code);
                            })
                                .replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {
                                return String.fromCharCode(parseInt(hex, 16));
                            })
                                .replace(/&([^;\W]+;?)/g, function (m, e) {
                                var ee = e.replace(/;$/, '');
                                var target = ENTITIES[e] || (e.match(/;$/) && ENTITIES[ee]);
                                if (typeof target === 'number') {
                                    return String.fromCharCode(target);
                                }
                                else if (typeof target === 'string') {
                                    return target;
                                }
                                else {
                                    return m;
                                }
                            });
                            return new this.constructor(s);
                        },
                        endsWith: function () {
                            var suffixes = Array.prototype.slice.call(arguments, 0);
                            for (var i = 0; i < suffixes.length; ++i) {
                                var l = this.s.length - suffixes[i].length;
                                if (l >= 0 && this.s.indexOf(suffixes[i], l) === l)
                                    return true;
                            }
                            return false;
                        },
                        escapeHTML: function () {
                            return new this.constructor(this.s.replace(/[&<>"']/g, function (m) { return '&' + reversedEscapeChars[m] + ';'; }));
                        },
                        ensureLeft: function (prefix) {
                            var s = this.s;
                            if (s.indexOf(prefix) === 0) {
                                return this;
                            }
                            else {
                                return new this.constructor(prefix + s);
                            }
                        },
                        ensureRight: function (suffix) {
                            var s = this.s;
                            if (this.endsWith(suffix)) {
                                return this;
                            }
                            else {
                                return new this.constructor(s + suffix);
                            }
                        },
                        humanize: function () {
                            if (this.s === null || this.s === undefined)
                                return new this.constructor('');
                            var s = this.underscore().replace(/_id$/, '').replace(/_/g, ' ').trim().capitalize();
                            return new this.constructor(s);
                        },
                        isAlpha: function () {
                            return !/[^a-z\xDF-\xFF]|^$/.test(this.s.toLowerCase());
                        },
                        isAlphaNumeric: function () {
                            return !/[^0-9a-z\xDF-\xFF]/.test(this.s.toLowerCase());
                        },
                        isEmpty: function () {
                            return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
                        },
                        isLower: function () {
                            return this.isAlpha() && this.s.toLowerCase() === this.s;
                        },
                        isNumeric: function () {
                            return !/[^0-9]/.test(this.s);
                        },
                        isUpper: function () {
                            return this.isAlpha() && this.s.toUpperCase() === this.s;
                        },
                        left: function (N) {
                            if (N >= 0) {
                                var s = this.s.substr(0, N);
                                return new this.constructor(s);
                            }
                            else {
                                return this.right(-N);
                            }
                        },
                        lines: function () {
                            return this.replaceAll('\r\n', '\n').s.split('\n');
                        },
                        pad: function (len, ch) {
                            if (ch == null)
                                ch = ' ';
                            if (this.s.length >= len)
                                return new this.constructor(this.s);
                            len = len - this.s.length;
                            var left = Array(Math.ceil(len / 2) + 1).join(ch);
                            var right = Array(Math.floor(len / 2) + 1).join(ch);
                            return new this.constructor(left + this.s + right);
                        },
                        padLeft: function (len, ch) {
                            if (ch == null)
                                ch = ' ';
                            if (this.s.length >= len)
                                return new this.constructor(this.s);
                            return new this.constructor(Array(len - this.s.length + 1).join(ch) + this.s);
                        },
                        padRight: function (len, ch) {
                            if (ch == null)
                                ch = ' ';
                            if (this.s.length >= len)
                                return new this.constructor(this.s);
                            return new this.constructor(this.s + Array(len - this.s.length + 1).join(ch));
                        },
                        parseCSV: function (delimiter, qualifier, escape, lineDelimiter) {
                            delimiter = delimiter || ',';
                            escape = escape || '\\';
                            if (typeof qualifier == 'undefined')
                                qualifier = '"';
                            var i = 0, fieldBuffer = [], fields = [], len = this.s.length, inField = false, inUnqualifiedString = false, self = this;
                            var ca = function (i) { return self.s.charAt(i); };
                            if (typeof lineDelimiter !== 'undefined')
                                var rows = [];
                            if (!qualifier)
                                inField = true;
                            while (i < len) {
                                var current = ca(i);
                                switch (current) {
                                    case escape:
                                        //fix for issues #32 and #35
                                        if (inField && ((escape !== qualifier) || ca(i + 1) === qualifier)) {
                                            i += 1;
                                            fieldBuffer.push(ca(i));
                                            break;
                                        }
                                        if (escape !== qualifier)
                                            break;
                                    case qualifier:
                                        inField = !inField;
                                        break;
                                    case delimiter:
                                        if (inUnqualifiedString) {
                                            inField = false;
                                            inUnqualifiedString = false;
                                        }
                                        if (inField && qualifier)
                                            fieldBuffer.push(current);
                                        else {
                                            fields.push(fieldBuffer.join(''));
                                            fieldBuffer.length = 0;
                                        }
                                        break;
                                    case lineDelimiter:
                                        if (inUnqualifiedString) {
                                            inField = false;
                                            inUnqualifiedString = false;
                                            fields.push(fieldBuffer.join(''));
                                            rows.push(fields);
                                            fields = [];
                                            fieldBuffer.length = 0;
                                        }
                                        else if (inField) {
                                            fieldBuffer.push(current);
                                        }
                                        else {
                                            if (rows) {
                                                fields.push(fieldBuffer.join(''));
                                                rows.push(fields);
                                                fields = [];
                                                fieldBuffer.length = 0;
                                            }
                                        }
                                        break;
                                    case ' ':
                                        if (inField)
                                            fieldBuffer.push(current);
                                        break;
                                    default:
                                        if (inField)
                                            fieldBuffer.push(current);
                                        else if (current !== qualifier) {
                                            fieldBuffer.push(current);
                                            inField = true;
                                            inUnqualifiedString = true;
                                        }
                                        break;
                                }
                                i += 1;
                            }
                            fields.push(fieldBuffer.join(''));
                            if (rows) {
                                rows.push(fields);
                                return rows;
                            }
                            return fields;
                        },
                        replaceAll: function (ss, r) {
                            //var s = this.s.replace(new RegExp(ss, 'g'), r);
                            var s = this.s.split(ss).join(r);
                            return new this.constructor(s);
                        },
                        splitLeft: function (sep, maxSplit, limit) {
                            return _dereq_('./_splitLeft')(this.s, sep, maxSplit, limit);
                        },
                        splitRight: function (sep, maxSplit, limit) {
                            return _dereq_('./_splitRight')(this.s, sep, maxSplit, limit);
                        },
                        strip: function () {
                            var ss = this.s;
                            for (var i = 0, n = arguments.length; i < n; i++) {
                                ss = ss.split(arguments[i]).join('');
                            }
                            return new this.constructor(ss);
                        },
                        stripLeft: function (chars) {
                            var regex;
                            var pattern;
                            var ss = ensureString(this.s);
                            if (chars === undefined) {
                                pattern = /^\s+/g;
                            }
                            else {
                                regex = escapeRegExp(chars);
                                pattern = new RegExp("^[" + regex + "]+", "g");
                            }
                            return new this.constructor(ss.replace(pattern, ""));
                        },
                        stripRight: function (chars) {
                            var regex;
                            var pattern;
                            var ss = ensureString(this.s);
                            if (chars === undefined) {
                                pattern = /\s+$/g;
                            }
                            else {
                                regex = escapeRegExp(chars);
                                pattern = new RegExp("[" + regex + "]+$", "g");
                            }
                            return new this.constructor(ss.replace(pattern, ""));
                        },
                        right: function (N) {
                            if (N >= 0) {
                                var s = this.s.substr(this.s.length - N, N);
                                return new this.constructor(s);
                            }
                            else {
                                return this.left(-N);
                            }
                        },
                        setValue: function (s) {
                            initialize(this, s);
                            return this;
                        },
                        slugify: function () {
                            var sl = (new S(new S(this.s).latinise().s.replace(/[^\w\s-]/g, '').toLowerCase())).dasherize().s;
                            if (sl.charAt(0) === '-')
                                sl = sl.substr(1);
                            return new this.constructor(sl);
                        },
                        startsWith: function () {
                            var prefixes = Array.prototype.slice.call(arguments, 0);
                            for (var i = 0; i < prefixes.length; ++i) {
                                if (this.s.lastIndexOf(prefixes[i], 0) === 0)
                                    return true;
                            }
                            return false;
                        },
                        stripPunctuation: function () {
                            //return new this.constructor(this.s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""));
                            return new this.constructor(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
                        },
                        stripTags: function () {
                            var s = this.s, args = arguments.length > 0 ? arguments : [''];
                            multiArgs(args, function (tag) {
                                s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
                            });
                            return new this.constructor(s);
                        },
                        template: function (values, opening, closing) {
                            var s = this.s;
                            var opening = opening || Export.TMPL_OPEN;
                            var closing = closing || Export.TMPL_CLOSE;
                            var open = opening.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$');
                            var close = closing.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$');
                            var r = new RegExp(open + '(.+?)' + close, 'g');
                            //, r = /\{\{(.+?)\}\}/g
                            var matches = s.match(r) || [];
                            matches.forEach(function (match) {
                                var key = match.substring(opening.length, match.length - closing.length).trim(); //chop {{ and }}
                                var value = typeof values[key] == 'undefined' ? '' : values[key];
                                s = s.replace(match, value);
                            });
                            return new this.constructor(s);
                        },
                        times: function (n) {
                            return new this.constructor(new Array(n + 1).join(this.s));
                        },
                        titleCase: function () {
                            var s = this.s;
                            if (s) {
                                s = s.replace(/(^[a-z]| [a-z]|-[a-z]|_[a-z])/g, function ($1) {
                                    return $1.toUpperCase();
                                });
                            }
                            return new this.constructor(s);
                        },
                        toBoolean: function () {
                            if (typeof this.orig === 'string') {
                                var s = this.s.toLowerCase();
                                return s === 'true' || s === 'yes' || s === 'on' || s === '1';
                            }
                            else
                                return this.orig === true || this.orig === 1;
                        },
                        toFloat: function (precision) {
                            var num = parseFloat(this.s);
                            if (precision)
                                return parseFloat(num.toFixed(precision));
                            else
                                return num;
                        },
                        toInt: function () {
                            // If the string starts with '0x' or '-0x', parse as hex.
                            return /^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10);
                        },
                        trim: function () {
                            var s;
                            if (typeof __nsp.trim === 'undefined')
                                s = this.s.replace(/(^\s*|\s*$)/g, '');
                            else
                                s = this.s.trim();
                            return new this.constructor(s);
                        },
                        trimLeft: function () {
                            var s;
                            if (__nsp.trimLeft)
                                s = this.s.trimLeft();
                            else
                                s = this.s.replace(/(^\s*)/g, '');
                            return new this.constructor(s);
                        },
                        trimRight: function () {
                            var s;
                            if (__nsp.trimRight)
                                s = this.s.trimRight();
                            else
                                s = this.s.replace(/\s+$/, '');
                            return new this.constructor(s);
                        },
                        truncate: function (length, pruneStr) {
                            var str = this.s;
                            length = ~~length;
                            pruneStr = pruneStr || '...';
                            if (str.length <= length)
                                return new this.constructor(str);
                            var tmpl = function (c) { return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; }, template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'
                            if (template.slice(template.length - 2).match(/\w\w/))
                                template = template.replace(/\s*\S+$/, '');
                            else
                                template = new S(template.slice(0, template.length - 1)).trimRight().s;
                            return (template + pruneStr).length > str.length ? new S(str) : new S(str.slice(0, template.length) + pruneStr);
                        },
                        toCSV: function () {
                            var delim = ',', qualifier = '"', escape = '\\', encloseNumbers = true, keys = false;
                            var dataArray = [];
                            function hasVal(it) {
                                return it !== null && it !== '';
                            }
                            if (typeof arguments[0] === 'object') {
                                delim = arguments[0].delimiter || delim;
                                delim = arguments[0].separator || delim;
                                qualifier = arguments[0].qualifier || qualifier;
                                encloseNumbers = !!arguments[0].encloseNumbers;
                                escape = arguments[0].escape || escape;
                                keys = !!arguments[0].keys;
                            }
                            else if (typeof arguments[0] === 'string') {
                                delim = arguments[0];
                            }
                            if (typeof arguments[1] === 'string')
                                qualifier = arguments[1];
                            if (arguments[1] === null)
                                qualifier = null;
                            if (this.orig instanceof Array)
                                dataArray = this.orig;
                            else {
                                for (var key in this.orig)
                                    if (this.orig.hasOwnProperty(key))
                                        if (keys)
                                            dataArray.push(key);
                                        else
                                            dataArray.push(this.orig[key]);
                            }
                            var rep = escape + qualifier;
                            var buildString = [];
                            for (var i = 0; i < dataArray.length; ++i) {
                                var shouldQualify = hasVal(qualifier);
                                if (typeof dataArray[i] == 'number')
                                    shouldQualify &= encloseNumbers;
                                if (shouldQualify)
                                    buildString.push(qualifier);
                                if (dataArray[i] !== null && dataArray[i] !== undefined) {
                                    var d = new S(dataArray[i]).replaceAll(qualifier, rep).s;
                                    buildString.push(d);
                                }
                                else
                                    buildString.push('');
                                if (shouldQualify)
                                    buildString.push(qualifier);
                                if (delim)
                                    buildString.push(delim);
                            }
                            //chop last delim
                            //console.log(buildString.length)
                            buildString.length = buildString.length - 1;
                            return new this.constructor(buildString.join(''));
                        },
                        toString: function () {
                            return this.s;
                        },
                        //#modified from https://github.com/epeli/underscore.string
                        underscore: function () {
                            var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
                            return new this.constructor(s);
                        },
                        unescapeHTML: function () {
                            return new this.constructor(this.s.replace(/\&([^;]+);/g, function (entity, entityCode) {
                                var match;
                                if (entityCode in escapeChars) {
                                    return escapeChars[entityCode];
                                }
                                else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
                                    return String.fromCharCode(parseInt(match[1], 16));
                                }
                                else if (match = entityCode.match(/^#(\d+)$/)) {
                                    return String.fromCharCode(~~match[1]);
                                }
                                else {
                                    return entity;
                                }
                            }));
                        },
                        valueOf: function () {
                            return this.s.valueOf();
                        },
                        //#Added a New Function called wrapHTML.
                        wrapHTML: function (tagName, tagAttrs) {
                            var s = this.s, el = (tagName == null) ? 'span' : tagName, elAttr = '', wrapped = '';
                            if (typeof tagAttrs == 'object')
                                for (var prop in tagAttrs)
                                    elAttr += ' ' + prop + '="' + (new this.constructor(tagAttrs[prop])).escapeHTML() + '"';
                            s = wrapped.concat('<', el, elAttr, '>', this, '</', el, '>');
                            return new this.constructor(s);
                        }
                    };
                    var methodsAdded = [];
                    function extendPrototype() {
                        for (var name in __sp) {
                            (function (name) {
                                var func = __sp[name];
                                if (!__nsp.hasOwnProperty(name)) {
                                    methodsAdded.push(name);
                                    __nsp[name] = function () {
                                        String.prototype.s = this;
                                        return func.apply(this, arguments);
                                    };
                                }
                            })(name);
                        }
                    }
                    function restorePrototype() {
                        for (var i = 0; i < methodsAdded.length; ++i)
                            delete String.prototype[methodsAdded[i]];
                        methodsAdded.length = 0;
                    }
                    /*************************************
                     /* Attach Native JavaScript String Properties
                     /*************************************/
                    var nativeProperties = getNativeStringProperties();
                    for (var name in nativeProperties) {
                        (function (name) {
                            var stringProp = __nsp[name];
                            if (typeof stringProp == 'function') {
                                //console.log(stringProp)
                                if (!__sp[name]) {
                                    if (nativeProperties[name] === 'string') {
                                        __sp[name] = function () {
                                            //console.log(name)
                                            return new this.constructor(stringProp.apply(this, arguments));
                                        };
                                    }
                                    else {
                                        __sp[name] = stringProp;
                                    }
                                }
                            }
                        })(name);
                    }
                    /*************************************
                     /* Function Aliases
                     /*************************************/
                    __sp.repeat = __sp.times;
                    __sp.include = __sp.contains;
                    __sp.toInteger = __sp.toInt;
                    __sp.toBool = __sp.toBoolean;
                    __sp.decodeHTMLEntities = __sp.decodeHtmlEntities; //ensure consistent casing scheme of 'HTML'
                    //******************************************************************************
                    // Set the constructor.  Without this, string.js objects are instances of
                    // Object instead of S.
                    //******************************************************************************
                    __sp.constructor = S;
                    /*************************************
                     /* Private Functions
                     /*************************************/
                    function getNativeStringProperties() {
                        var names = getNativeStringPropertyNames();
                        var retObj = {};
                        for (var i = 0; i < names.length; ++i) {
                            var name = names[i];
                            if (name === 'to' || name === 'toEnd')
                                continue; // get rid of the shelljs prototype messup
                            var func = __nsp[name];
                            try {
                                var type = typeof func.apply('teststring');
                                retObj[name] = type;
                            }
                            catch (e) { }
                        }
                        return retObj;
                    }
                    function getNativeStringPropertyNames() {
                        var results = [];
                        if (Object.getOwnPropertyNames) {
                            results = Object.getOwnPropertyNames(__nsp);
                            results.splice(results.indexOf('valueOf'), 1);
                            results.splice(results.indexOf('toString'), 1);
                            return results;
                        }
                        else {
                            var stringNames = {};
                            var objectNames = [];
                            for (var name in String.prototype)
                                stringNames[name] = name;
                            for (var name in Object.prototype)
                                delete stringNames[name];
                            //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names
                            for (var name in stringNames) {
                                results.push(name);
                            }
                            return results;
                        }
                    }
                    function Export(str) {
                        return new S(str);
                    }
                    ;
                    //attach exports to StringJSWrapper
                    Export.extendPrototype = extendPrototype;
                    Export.restorePrototype = restorePrototype;
                    Export.VERSION = VERSION;
                    Export.TMPL_OPEN = '{{';
                    Export.TMPL_CLOSE = '}}';
                    Export.ENTITIES = ENTITIES;
                    /*************************************
                     /* Exports
                     /*************************************/
                    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
                        module.exports = { S: Export };
                    }
                    else {
                        if (typeof define === "function" && define.amd) {
                            define([], function () {
                                return Export;
                            });
                        }
                        else {
                            window.S = Export;
                        }
                    }
                    /*************************************
                     /* 3rd Party Private Functions
                     /*************************************/
                    //from sugar.js
                    function multiArgs(args, fn) {
                        var result = [], i;
                        for (i = 0; i < args.length; i++) {
                            result.push(args[i]);
                            if (fn)
                                fn.call(args, args[i], i);
                        }
                        return result;
                    }
                    //from underscore.string
                    var escapeChars = {
                        lt: '<',
                        gt: '>',
                        quot: '"',
                        apos: "'",
                        amp: '&'
                    };
                    function escapeRegExp(s) {
                        // most part from https://github.com/skulpt/skulpt/blob/ecaf75e69c2e539eff124b2ab45df0b01eaf2295/src/str.js#L242
                        var c;
                        var i;
                        var ret = [];
                        var re = /^[A-Za-z0-9]+$/;
                        s = ensureString(s);
                        for (i = 0; i < s.length; ++i) {
                            c = s.charAt(i);
                            if (re.test(c)) {
                                ret.push(c);
                            }
                            else {
                                if (c === "\\000") {
                                    ret.push("\\000");
                                }
                                else {
                                    ret.push("\\" + c);
                                }
                            }
                        }
                        return ret.join("");
                    }
                    function ensureString(string) {
                        return string == null ? '' : '' + string;
                    }
                    //from underscore.string
                    var reversedEscapeChars = {};
                    for (var key in escapeChars) {
                        reversedEscapeChars[escapeChars[key]] = key;
                    }
                    ENTITIES = {
                        "amp": "&",
                        "gt": ">",
                        "lt": "<",
                        "quot": "\"",
                        "apos": "'",
                        "AElig": 198,
                        "Aacute": 193,
                        "Acirc": 194,
                        "Agrave": 192,
                        "Aring": 197,
                        "Atilde": 195,
                        "Auml": 196,
                        "Ccedil": 199,
                        "ETH": 208,
                        "Eacute": 201,
                        "Ecirc": 202,
                        "Egrave": 200,
                        "Euml": 203,
                        "Iacute": 205,
                        "Icirc": 206,
                        "Igrave": 204,
                        "Iuml": 207,
                        "Ntilde": 209,
                        "Oacute": 211,
                        "Ocirc": 212,
                        "Ograve": 210,
                        "Oslash": 216,
                        "Otilde": 213,
                        "Ouml": 214,
                        "THORN": 222,
                        "Uacute": 218,
                        "Ucirc": 219,
                        "Ugrave": 217,
                        "Uuml": 220,
                        "Yacute": 221,
                        "aacute": 225,
                        "acirc": 226,
                        "aelig": 230,
                        "agrave": 224,
                        "aring": 229,
                        "atilde": 227,
                        "auml": 228,
                        "ccedil": 231,
                        "eacute": 233,
                        "ecirc": 234,
                        "egrave": 232,
                        "eth": 240,
                        "euml": 235,
                        "iacute": 237,
                        "icirc": 238,
                        "igrave": 236,
                        "iuml": 239,
                        "ntilde": 241,
                        "oacute": 243,
                        "ocirc": 244,
                        "ograve": 242,
                        "oslash": 248,
                        "otilde": 245,
                        "ouml": 246,
                        "szlig": 223,
                        "thorn": 254,
                        "uacute": 250,
                        "ucirc": 251,
                        "ugrave": 249,
                        "uuml": 252,
                        "yacute": 253,
                        "yuml": 255,
                        "copy": 169,
                        "reg": 174,
                        "nbsp": 160,
                        "iexcl": 161,
                        "cent": 162,
                        "pound": 163,
                        "curren": 164,
                        "yen": 165,
                        "brvbar": 166,
                        "sect": 167,
                        "uml": 168,
                        "ordf": 170,
                        "laquo": 171,
                        "not": 172,
                        "shy": 173,
                        "macr": 175,
                        "deg": 176,
                        "plusmn": 177,
                        "sup1": 185,
                        "sup2": 178,
                        "sup3": 179,
                        "acute": 180,
                        "micro": 181,
                        "para": 182,
                        "middot": 183,
                        "cedil": 184,
                        "ordm": 186,
                        "raquo": 187,
                        "frac14": 188,
                        "frac12": 189,
                        "frac34": 190,
                        "iquest": 191,
                        "times": 215,
                        "divide": 247,
                        "OElig;": 338,
                        "oelig;": 339,
                        "Scaron;": 352,
                        "scaron;": 353,
                        "Yuml;": 376,
                        "fnof;": 402,
                        "circ;": 710,
                        "tilde;": 732,
                        "Alpha;": 913,
                        "Beta;": 914,
                        "Gamma;": 915,
                        "Delta;": 916,
                        "Epsilon;": 917,
                        "Zeta;": 918,
                        "Eta;": 919,
                        "Theta;": 920,
                        "Iota;": 921,
                        "Kappa;": 922,
                        "Lambda;": 923,
                        "Mu;": 924,
                        "Nu;": 925,
                        "Xi;": 926,
                        "Omicron;": 927,
                        "Pi;": 928,
                        "Rho;": 929,
                        "Sigma;": 931,
                        "Tau;": 932,
                        "Upsilon;": 933,
                        "Phi;": 934,
                        "Chi;": 935,
                        "Psi;": 936,
                        "Omega;": 937,
                        "alpha;": 945,
                        "beta;": 946,
                        "gamma;": 947,
                        "delta;": 948,
                        "epsilon;": 949,
                        "zeta;": 950,
                        "eta;": 951,
                        "theta;": 952,
                        "iota;": 953,
                        "kappa;": 954,
                        "lambda;": 955,
                        "mu;": 956,
                        "nu;": 957,
                        "xi;": 958,
                        "omicron;": 959,
                        "pi;": 960,
                        "rho;": 961,
                        "sigmaf;": 962,
                        "sigma;": 963,
                        "tau;": 964,
                        "upsilon;": 965,
                        "phi;": 966,
                        "chi;": 967,
                        "psi;": 968,
                        "omega;": 969,
                        "thetasym;": 977,
                        "upsih;": 978,
                        "piv;": 982,
                        "ensp;": 8194,
                        "emsp;": 8195,
                        "thinsp;": 8201,
                        "zwnj;": 8204,
                        "zwj;": 8205,
                        "lrm;": 8206,
                        "rlm;": 8207,
                        "ndash;": 8211,
                        "mdash;": 8212,
                        "lsquo;": 8216,
                        "rsquo;": 8217,
                        "sbquo;": 8218,
                        "ldquo;": 8220,
                        "rdquo;": 8221,
                        "bdquo;": 8222,
                        "dagger;": 8224,
                        "Dagger;": 8225,
                        "bull;": 8226,
                        "hellip;": 8230,
                        "permil;": 8240,
                        "prime;": 8242,
                        "Prime;": 8243,
                        "lsaquo;": 8249,
                        "rsaquo;": 8250,
                        "oline;": 8254,
                        "frasl;": 8260,
                        "euro;": 8364,
                        "image;": 8465,
                        "weierp;": 8472,
                        "real;": 8476,
                        "trade;": 8482,
                        "alefsym;": 8501,
                        "larr;": 8592,
                        "uarr;": 8593,
                        "rarr;": 8594,
                        "darr;": 8595,
                        "harr;": 8596,
                        "crarr;": 8629,
                        "lArr;": 8656,
                        "uArr;": 8657,
                        "rArr;": 8658,
                        "dArr;": 8659,
                        "hArr;": 8660,
                        "forall;": 8704,
                        "part;": 8706,
                        "exist;": 8707,
                        "empty;": 8709,
                        "nabla;": 8711,
                        "isin;": 8712,
                        "notin;": 8713,
                        "ni;": 8715,
                        "prod;": 8719,
                        "sum;": 8721,
                        "minus;": 8722,
                        "lowast;": 8727,
                        "radic;": 8730,
                        "prop;": 8733,
                        "infin;": 8734,
                        "ang;": 8736,
                        "and;": 8743,
                        "or;": 8744,
                        "cap;": 8745,
                        "cup;": 8746,
                        "int;": 8747,
                        "there4;": 8756,
                        "sim;": 8764,
                        "cong;": 8773,
                        "asymp;": 8776,
                        "ne;": 8800,
                        "equiv;": 8801,
                        "le;": 8804,
                        "ge;": 8805,
                        "sub;": 8834,
                        "sup;": 8835,
                        "nsub;": 8836,
                        "sube;": 8838,
                        "supe;": 8839,
                        "oplus;": 8853,
                        "otimes;": 8855,
                        "perp;": 8869,
                        "sdot;": 8901,
                        "lceil;": 8968,
                        "rceil;": 8969,
                        "lfloor;": 8970,
                        "rfloor;": 8971,
                        "lang;": 9001,
                        "rang;": 9002,
                        "loz;": 9674,
                        "spades;": 9824,
                        "clubs;": 9827,
                        "hearts;": 9829,
                        "diams;": 9830
                    };
                }).call(this);
            }, { "./_count": 1, "./_splitLeft": 2, "./_splitRight": 3 }] }, {}, [4])(4);
});
//# sourceMappingURL=String.js.map
});
___scope___.file("utils/DataOptions.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var jquery_1 = require("../jquery");
var String_1 = require("./String");
var DataOptions = DataOptions_1 = (function () {
    function DataOptions(_$, _S) {
        this._$ = _$;
        this._S = _S;
    }
    DataOptions.prototype.getDataOptions = function (element, prefix, optPrefix, mode) {
        if (optPrefix === void 0) { optPrefix = "opt"; }
        //extract data-_attributes with jquery data
        var $element = this._$(element), params = $element.data(), parsedParams = {};
        optPrefix = String_1.S(optPrefix + "-" + prefix).camelize().s;
        mode = mode || $element.data("paramsMode");
        //each param: data-prefix-my-param is prefixMyParam
        for (var key in params) {
            //find prefix
            if (key.search(optPrefix) !== -1) {
                //remove prefix: prefixMyParam to myParam
                var parsedKey = key.replace(optPrefix, "");
                //some components require different nomenclatures
                switch (mode) {
                    case DataOptions_1.EXTRACT_DATA_MODE.underscore:
                        //myParam to my_param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        break;
                    case DataOptions_1.EXTRACT_DATA_MODE.hypen:
                        //myParam to my-param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                        break;
                    default:
                        //myParam
                        parsedKey = parsedKey.charAt(0).toLowerCase().concat(parsedKey.substring(1));
                        break;
                }
                var parsed = params[key];
                //try to parse to JSON
                try {
                    parsed = JSON.parse(parsed);
                }
                catch (e) {
                }
                parsedParams[parsedKey] = parsed;
            }
        }
        return parsedParams;
    };
    return DataOptions;
}());
DataOptions.EXTRACT_DATA_MODE = {
    underscore: "underscore",
    hypen: "hypen",
    camel: "camel"
};
DataOptions = DataOptions_1 = __decorate([
    di_1.Service({
        name: "DataOptions",
        dependencies: [
            jquery_1.$,
            String_1.S
        ]
    })
], DataOptions);
exports.DataOptions = DataOptions;
var DataOptions_1;
//# sourceMappingURL=DataOptions.js.map
});
___scope___.file("sco.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
__export(require("./sco/Errors"));
var Sco_1 = require("./sco/Sco");
exports.ScoController = Sco_1.ScoController;
exports.IScoOptions = Sco_1.IScoOptions;
exports.ISco = Sco_1.ISco;
var ScoFactory_1 = require("./sco/ScoFactory");
exports.ScoFactory = ScoFactory_1.ScoFactory;
//# sourceMappingURL=sco.js.map
});
___scope___.file("sco/Errors.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var BaseError_1 = require("../base/BaseError");
/**
 * Error al no indicarse contexto para la aplicación
 */
var HaztivityAppContextNotFound = (function (_super) {
    __extends(HaztivityAppContextNotFound, _super);
    function HaztivityAppContextNotFound() {
        return _super.call(this, "HaztivityAppContextNotFound", "not context found for the application. Please visit LINK TO HELP") || this;
    }
    return HaztivityAppContextNotFound;
}(BaseError_1.BaseError));
exports.HaztivityAppContextNotFound = HaztivityAppContextNotFound;
/**
 * Error al no indicarse contexto para las páginas
 */
var HaztivityPagesContextNotFound = (function (_super) {
    __extends(HaztivityPagesContextNotFound, _super);
    function HaztivityPagesContextNotFound() {
        return _super.call(this, "HaztivityPagesContextNotFound", "not context found for pages. Please visit LINK TO HELP") || this;
    }
    return HaztivityPagesContextNotFound;
}(BaseError_1.BaseError));
exports.HaztivityPagesContextNotFound = HaztivityPagesContextNotFound;
//# sourceMappingURL=Errors.js.map
});
___scope___.file("sco/Sco.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var utils_1 = require("../utils");
var di_1 = require("../di");
var page_1 = require("../page");
var navigator_1 = require("../navigator");
var Errors_1 = require("./Errors");
var resource_1 = require("../resource");
var component_1 = require("../component");
var jquery_1 = require("../jquery");
var ScoController = ScoController_1 = (function () {
    function ScoController(_Navigator, _PageManager, _ResourceManager, _EventEmitterFactory, _ComponentManager, _ComponentInitializer, _$) {
        this._Navigator = _Navigator;
        this._PageManager = _PageManager;
        this._ResourceManager = _ResourceManager;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._ComponentManager = _ComponentManager;
        this._ComponentInitializer = _ComponentInitializer;
        this._$ = _$;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }
    ScoController.prototype.activate = function (options) {
        this._options = options;
        this._ComponentManager.addAll(this._options.components || []);
        this._PageManager.addPages(this._options.pages);
        return this;
    };
    ScoController.prototype.on = function () {
        return this;
    };
    ScoController.prototype._init = function () {
        this._$context = this._$("[data-hz-app]");
        //context must exists
        if (this._$context.length > 0) {
            this._$context.prepend(this._options.template);
            this._$context.addClass(ScoController_1.CLASS_CONTEXT);
            this._$pagesContainer = this._$context.find("[data-hz-pages]");
            //page contexts must exists
            if (this._$pagesContainer.length > 0) {
                return true;
            }
            else {
                throw new Errors_1.HaztivityPagesContextNotFound();
            }
        }
        else {
            throw new Errors_1.HaztivityAppContextNotFound();
        }
    };
    ScoController.prototype.run = function () {
        this._init();
        this._Navigator.activate(this._$pagesContainer);
        this._$pagesContainer.addClass(ScoController_1.CLASS_PAGES);
        this._ComponentInitializer.initialize(this._$context);
        //init components
        this._Navigator.goTo(0);
        return this;
    };
    return ScoController;
}());
ScoController.CLASS_CONTEXT = "hz-container";
ScoController.CLASS_PAGES = "hz-pages-container";
ScoController = ScoController_1 = __decorate([
    di_1.Sco({
        name: "ScoController",
        dependencies: [
            navigator_1.Navigator,
            page_1.PageManager,
            resource_1.ResourceManager,
            utils_1.EventEmitterFactory,
            component_1.ComponentManager,
            component_1.ComponentInitializer,
            jquery_1.$
        ]
    })
], ScoController);
exports.ScoController = ScoController;
var ScoController_1;
//# sourceMappingURL=Sco.js.map
});
___scope___.file("page.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var PageRegister_1 = require("./page/PageRegister");
exports.PageRegister = PageRegister_1.PageRegister;
exports.IPageOptions = PageRegister_1.IPageOptions;
var PageController_1 = require("./page/PageController");
exports.PageController = PageController_1.PageController;
exports.IPageControllerOptions = PageController_1.IPageControllerOptions;
exports.IPageState = PageController_1.IPageState;
exports.IPageStore = PageController_1.IPageStore;
var GenericPageController_1 = require("./page/GenericPageController");
exports.IGenericPageControllerOptions = GenericPageController_1.IGenericPageControllerOptions;
exports.GenericPageController = GenericPageController_1.GenericPageController;
var PageFactory_1 = require("./page/PageFactory");
exports.PageFactory = PageFactory_1.PageFactory;
var PageImplementation_1 = require("./page/PageImplementation");
exports.PageImplementation = PageImplementation_1.PageImplementation;
var PageManager_1 = require("./page/PageManager");
exports.PageManager = PageManager_1.PageManager;
//# sourceMappingURL=page.js.map
});
___scope___.file("page/PageRegister.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var utils_1 = require("../utils");
var PageRegister = PageRegister_1 = (function () {
    /**
     * Almacena la información de una página.
     * Tipo Core
     * @class
     * @param EventEmitterFactory
     */
    function PageRegister(_EventEmitterFactory) {
        this._EventEmitterFactory = _EventEmitterFactory;
    }
    PageRegister.prototype.getResources = function () {
        return this._options.resources;
    };
    /**
     * Configura la clase nada más instanciarla
     * @param options
     */
    PageRegister.prototype.activate = function (options) {
        this._options = options;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    };
    PageRegister.prototype.on = function (events, data, handler) {
        this._eventEmitter.on(events + "." + PageRegister_1.NAMESPACE, data, handler);
        return this;
    };
    PageRegister.prototype.one = function (events, data, handler) {
        this._eventEmitter.one(events + "." + PageRegister_1.NAMESPACE, data, handler);
        return this;
    };
    PageRegister.prototype.off = function (events, handler) {
        this._eventEmitter.off(events + "." + PageRegister_1.NAMESPACE, handler);
        return this;
    };
    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    PageRegister.prototype.getName = function () {
        return this._options.name;
    };
    return PageRegister;
}());
PageRegister.NAMESPACE = "page";
PageRegister = PageRegister_1 = __decorate([
    di_1.Core({
        name: "PageRegister",
        instantiable: true,
        dependencies: [
            utils_1.EventEmitterFactory
        ]
    })
], PageRegister);
exports.PageRegister = PageRegister;
var PageRegister_1;
//# sourceMappingURL=PageRegister.js.map
});
___scope___.file("page/PageController.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var jquery_1 = require("../jquery");
var resource_1 = require("../resource");
var Errors_1 = require("./Errors");
var PageController = PageController_1 = (function () {
    /**
     * Controller base para todas las páginas.
     * Tipo Page
     * @class
     * @param {JQueryStatic}    _$                   Objeto JQuery
     * @param {InjectorService} InjectorService     Servicio del inyector
     * @see Injector.TYPES
     */
    function PageController(_$, InjectorService, _ResourceInitializerService) {
        this._$ = _$;
        this.InjectorService = InjectorService;
        this._ResourceInitializerService = _ResourceInitializerService;
        this._resources = [];
    }
    /**
     * Configura la clase nada más instanciarla
     * @param {IPageControllerOptions}  options         Opciones para el controlador
     * @param {EventEmitter}            eventEmitter    Contexto para el manejo de eventos
     * @param {IPageState}              state           Estado del controlador. Se comparte entre instancias de un mismo controlador permitiendo almacenar el estado de los elementos internos
     * @param {IPageStore}              store           Almacén de datos. Se comparte entre instancias de un mismo controlador. Permite compartir información con otros controladores.
     */
    PageController.prototype.activate = function (options, eventEmitter, state, store) {
        this.options = options;
        this.state = state;
        this.store = store;
        this.state.visited = true;
        this.eventEmitter = eventEmitter;
    };
    PageController.prototype._getNumCompletedResources = function () {
        var completed = 0;
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            completed += resource.isCompleted()
                ? 1
                : 0;
        }
        return completed;
    };
    PageController.prototype.isCompleted = function (forceCheck) {
        var result = this.state.completed, current = this.state.completed;
        if (forceCheck || this.state.completed != true) {
            result = this._getNumCompletedResources() === this._resources.length;
            //if the state changes, trigger event
            this.state.completed = result;
            if (current !== result) {
                this.eventEmitter.trigger(PageController_1.ON_COMPLETE_CHANGE, [result, this.$element, this]);
            }
        }
        return result;
    };
    PageController.prototype.render = function () {
        var event = this.eventEmitter.createEvent(PageController_1.ON_RENDERING), $element, 
        //allow to user to custom render the template
        result = this.eventEmitter.trigger(event, [this.options.template, this]);
        //if a result is provided, ignore the default render function
        if (result instanceof this._$) {
            $element = result;
        }
        else {
            $element = this._render(this.options.template);
        }
        if ($element == undefined || $element.length === 0) {
            throw new Errors_1.HaztivityPageElementError(this.options.name);
        }
        $element.addClass(PageController_1.CLASS_PAGE + " " + PageController_1.CLASS_PAGE + "-" + this.options.name);
        this.$element = $element;
        return $element;
    };
    PageController.prototype._render = function (template) {
        var $element = this._$(template);
        return $element;
    };
    PageController.prototype._initializeResources = function () {
        this._resources = this._ResourceInitializerService.initialize(this.$element);
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            resource.on(resource_1.ResourceController.ON_COMPLETED, { instance: this, resource: resource }, this._onResourceCompleted);
        }
        return this._resources;
    };
    PageController.prototype._onResourceCompleted = function (e) {
        var instance = e.data.instance;
        instance.eventEmitter.trigger(PageController_1.ON_RESOURCE_COMPLETED, [instance.$element, instance, e.data.resource]);
        instance.isCompleted(true);
    };
    /**
     * Gestiona la transición entre la página anterior y la nueva
     * @param {JQuery}          $oldPage                    Página anterior
     * @param {number}          oldPageRelativePosition     Posición de la página desactivada en relación con la actual. -1 si la pagina anterior es inferior a la actual, 1 si la pagina anterior es posterior a la actual
     * @return {JQueryPromise}  Promesa resulta al finalizarse la animación
     */
    PageController.prototype.show = function ($oldPage, oldPageRelativePosition) {
        var deferred = this._$.Deferred(), promise = deferred.promise(), event = this.eventEmitter.createEvent(PageController_1.ON_SHOW), result = this.eventEmitter.trigger(event, [this.$element, $oldPage, oldPageRelativePosition, this]);
        if (!event.isDefaultPrevented()) {
            //if the user doesn't prevent default
            this._show($oldPage, oldPageRelativePosition).then(function () {
                if (typeof result === "function") {
                    //call the event's function
                    result(deferred);
                }
                else {
                    deferred.resolve();
                }
            });
        }
        else {
            //if is default prevented, check if the user returns a function
            if (typeof result === "function") {
                result(deferred); //call the event's function
            }
            else {
                //if not, return a resolved promise
                deferred.resolve();
            }
        }
        promise.then(this._onShowEnd.bind(this, $oldPage, oldPageRelativePosition));
        return promise;
    };
    /**
     * Invocado al finalizar el proceso de animación
     * @protected
     */
    PageController.prototype._onShowEnd = function ($oldPage, oldPageRelativePosition) {
        this.eventEmitter.trigger(PageController_1.ON_SHOWN, [this.$element, $oldPage, oldPageRelativePosition, this]);
    };
    /**
     * Realiza la animación correspondiente
     * @param {JQuery}              $oldPage                Página anterior.
     * @param {number}              oldPageRelativePosition Indica la posición de la página anterior en relación a la nueva. -1 si es anterior. 1 si es posterior
     * @returns {JQueryPromise<T>}  Promesa que se resuelve al finalizar la animación
     * @protected
     */
    PageController.prototype._show = function ($oldPage, oldPageRelativePosition) {
        var defer = this._$.Deferred();
        defer.resolve();
        return defer.promise();
    };
    /**
     * Obtiene el DOM de la página
     * @returns {JQuery}
     */
    PageController.prototype.getElement = function () {
        return this.$element;
    };
    /**
     * Invocado al finalizar la renderización. Inicializa los recursos.
     * @private
     */
    PageController.prototype._postRender = function () {
        this._initializeResources();
        this.eventEmitter.trigger(PageController_1.ON_RENDERED, [this.$element, this]);
    };
    /**
     * Invocado al solicitarse la destruccion de la página
     */
    PageController.prototype._destroy = function () {
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            resource.destroy();
        }
        this.eventEmitter.trigger(PageController_1.ON_DESTROY, [this.$element, this]);
    };
    return PageController;
}());
PageController.NAMESPACE = "pageController";
PageController.ON_RENDERING = PageController_1.NAMESPACE + ":rendering";
PageController.ON_RENDERED = PageController_1.NAMESPACE + ":rendered";
PageController.ON_APPENDED = PageController_1.NAMESPACE + ":appended";
PageController.ON_SHOW = PageController_1.NAMESPACE + ":show";
PageController.ON_SHOWN = PageController_1.NAMESPACE + ":shown";
PageController.ON_COMPLETE_CHANGE = PageController_1.NAMESPACE + ":completechange";
PageController.ON_RESOURCE_COMPLETED = PageController_1.NAMESPACE + ":resourcecomplete";
PageController.ON_DESTROY = PageController_1.NAMESPACE + ":destroy";
PageController.CLASS_PAGE = "hz-page";
PageController = PageController_1 = __decorate([
    di_1.Dependencies({
        dependencies: [
            jquery_1.$,
            di_1.InjectorService,
            resource_1.ResourceInitializerService
        ]
    })
], PageController);
exports.PageController = PageController;
var PageController_1;
//# sourceMappingURL=PageController.js.map
});
___scope___.file("resource.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var ResourceController_1 = require("./resource/ResourceController");
exports.ResourceController = ResourceController_1.ResourceController;
var ResourceManager_1 = require("./resource/ResourceManager");
exports.ResourceManager = ResourceManager_1.ResourceManager;
var ResourceInitializerService_1 = require("./resource/ResourceInitializerService");
exports.ResourceInitializerService = ResourceInitializerService_1.ResourceInitializerService;
var ResourceSequenceFactory_1 = require("./resource/ResourceSequenceFactory");
exports.ResourceSequenceFactory = ResourceSequenceFactory_1.ResourceSequenceFactory;
var ResourceSequence_1 = require("./resource/ResourceSequence");
exports.ResourceSequence = ResourceSequence_1.ResourceSequence;
//# sourceMappingURL=resource.js.map
});
___scope___.file("resource/ResourceController.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var jquery_1 = require("../jquery");
var utils_1 = require("../utils");
var ResourceController = ResourceController_1 = (function () {
    /**
     * Controlador base para los recursos
     * @param {JQueryStatic}            _$
     * @param {EventEmitterFactory}     _EventEmitterFactory
     */
    function ResourceController(_$, _EventEmitterFactory) {
        this._$ = _$;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._destroyed = false;
        this._completed = false;
        this._options = {};
        this._completeDeferred = this._$.Deferred();
        this._disabled = false;
        this._locked = false;
    }
    /**
     * Marca el recurso como completado
     * @private
     */
    ResourceController.prototype._markAsCompleted = function () {
        if (!this.isCompleted()) {
            this._completed = true;
            this._$element.removeClass(ResourceController_1.CLASS_UNCOMPLETED);
            this._$element.addClass(ResourceController_1.CLASS_COMPLETED);
            this._completeDeferred.resolve(this);
            this._eventEmitter.trigger(ResourceController_1.ON_COMPLETED);
        }
    };
    /**
     * Bloquea el recurso impidiendo realizar ciertas acciones
     * @private
     */
    ResourceController.prototype._lock = function () {
        this._locked = true;
    };
    /**
     * Desbloquea el recurso
     * @private
     */
    ResourceController.prototype._unlock = function () {
        this._locked = false;
    };
    /**
     * Indica si el recurso está bloqueado
     * @returns {any}
     */
    ResourceController.prototype.isLocked = function () {
        return this._locked;
    };
    /**
     * Indica si el recurso está deshabilitado
     * @returns {any}
     */
    ResourceController.prototype.isDisabled = function () {
        return this._disabled;
    };
    /**
     * Invocado al obtenerse el factory del DI para establecer las opciones
     * @param {JQuery}  $element        Elemento del recurso
     */
    ResourceController.prototype.activate = function ($element) {
        this._$element = $element;
        this._$element.addClass(ResourceController_1.CLASS_UNCOMPLETED);
        this._eventEmitter = this._EventEmitterFactory.createEmitter(this._$element);
    };
    /**
     * Deshabilita el recurso si no está bloquead
     * return {boolean} True si se ha realizado la operación
     */
    ResourceController.prototype.disable = function () {
        if (!this.isLocked()) {
            this._disabled = true;
            this._$element.addClass(ResourceController_1.CLASS_DISABLED);
            return true;
        }
        return false;
    };
    /**
     * Habilita el recurso si no está bloquead
     * return {boolean} True si se ha realizado la operación
     */
    ResourceController.prototype.enable = function () {
        if (!this.isLocked()) {
            this._disabled = false;
            this._$element.removeClass(ResourceController_1.CLASS_DISABLED);
            return true;
        }
        return false;
    };
    /**
     * Indica si se ha invocado al método destroy
     * @returns {boolean}
     */
    ResourceController.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    /**
     * Realiza la comprobación de objetivo completado
     * @returns {boolean}
     */
    ResourceController.prototype.isCompleted = function () {
        return this._completed;
    };
    /**
     * Obtiene una opción del recurso
     * @param name
     * @returns {any}
     */
    ResourceController.prototype.getOption = function (name) {
        return this._options[name];
    };
    /**
     * Destruye el componente. Se ha de extender en cada recurso con las acciones pertinentes
     */
    ResourceController.prototype.destroy = function () {
        this._destroyed = true;
    };
    ResourceController.prototype.on = function (events, data, handler) {
        this._eventEmitter.on(events, data, handler);
        return this;
    };
    ;
    ResourceController.prototype.one = function (events, data, handler) {
        this._eventEmitter.one(events, data, handler);
        return this;
    };
    ;
    ResourceController.prototype.off = function (events, handler) {
        this._eventEmitter.off(events, handler);
        return this;
    };
    ;
    /**
     * Devuelve la promesa del recurso. La promesa se resuelve al completarse
     * @returns {JQueryPromise<T>}
     */
    ResourceController.prototype.getCompletePromise = function () {
        return this._completeDeferred.promise();
    };
    /**
     * Devuelve el elemento del recurso
     * @returns {JQuery}
     */
    ResourceController.prototype.getElement = function () {
        return this._$element;
    };
    return ResourceController;
}());
ResourceController.NAMESPACE = "resourceController";
ResourceController.ON_COMPLETED = ResourceController_1.NAMESPACE + ":completed";
ResourceController.CLASS_UNCOMPLETED = "hz-resource--uncompleted";
ResourceController.CLASS_COMPLETED = "hz-resource--completed";
ResourceController.CLASS_DISABLED = "hz-resource--disabled";
ResourceController = ResourceController_1 = __decorate([
    di_1.Dependencies({
        dependencies: [
            jquery_1.$,
            utils_1.EventEmitterFactory
        ]
    })
], ResourceController);
exports.ResourceController = ResourceController;
var ResourceController_1;
//# sourceMappingURL=ResourceController.js.map
});
___scope___.file("resource/ResourceManager.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var di_2 = require("../di");
var Errors_1 = require("./Errors");
var utils_1 = require("../utils");
var ResourceManager = (function () {
    function ResourceManager(_Injector, _S) {
        this._Injector = _Injector;
        this._S = _S;
        //store available resources
        this._resources = new Map();
    }
    /**
     * Añade un recurso para poder ser usado en las páginas. El controlador debe extender de ResourceController
     * @param {ResourceController}  resource        Controlador del recurso. Debe extender de ResourceController y estar registrado en el DI con el tipo Resource
     * @see Injector.registerResource
     */
    ResourceManager.prototype.add = function (resource) {
        //resource must exists
        if (resource) {
            //resource must have a name registered by the injector
            var name = resource._resourceName;
            if (!!name) {
                if (this.nameIsValid(name)) {
                    //check if already exists
                    var current = this._resources.get(name);
                    //if exists, should be equal
                    if (current != undefined) {
                        if (current != resource) {
                            throw new Errors_1.HaztivityResourceAlreadyRegisteredError(name);
                        }
                    }
                    else {
                        //if not exists, register
                        this._resources.set(name, resource);
                    }
                }
                else {
                    throw new Errors_1.HaztivityResourceNameInvalidError(name);
                }
            }
            else {
                throw new Errors_1.HaztivityResourceInvalidError();
            }
        }
        else {
            throw new Errors_1.HaztivityResourceInvalidError();
        }
    };
    ResourceManager.prototype.nameIsValid = function (name) {
        return this._S(name).camelize().s === name;
    };
    ResourceManager.prototype.exists = function (name) {
        return this._resources.get(name) != undefined;
    };
    /**
     * Añade un conjunto de recursos.
     * @see ResourceManager#add
     * @param {ResourceController[]}    resources       Recursos a añadir
     */
    ResourceManager.prototype.addAll = function (resources) {
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var resource = resources_1[_i];
            this.add(resource);
        }
    };
    return ResourceManager;
}());
ResourceManager = __decorate([
    di_1.Core({
        name: "ResourceManager",
        dependencies: [
            di_2.InjectorService,
            utils_1.S
        ]
    })
], ResourceManager);
exports.ResourceManager = ResourceManager;
//# sourceMappingURL=ResourceManager.js.map
});
___scope___.file("resource/Errors.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var BaseError_1 = require("../base/BaseError");
/**
 * Error al intentar registrar un recurso inválido
 */
var HaztivityResourceInvalidError = (function (_super) {
    __extends(HaztivityResourceInvalidError, _super);
    function HaztivityResourceInvalidError() {
        return _super.call(this, "HaztivityResourceInvalidError", "Invalid resource") || this;
    }
    return HaztivityResourceInvalidError;
}(BaseError_1.BaseError));
exports.HaztivityResourceInvalidError = HaztivityResourceInvalidError;
/**
 * Error al intentar registrar un recurso inválido
 */
var HaztivityResourceAlreadyRegisteredError = (function (_super) {
    __extends(HaztivityResourceAlreadyRegisteredError, _super);
    function HaztivityResourceAlreadyRegisteredError(resource) {
        return _super.call(this, "HaztivityResourceInvalidError", "Resource '" + resource + "' already registered with another controller.") || this;
    }
    return HaztivityResourceAlreadyRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityResourceAlreadyRegisteredError = HaztivityResourceAlreadyRegisteredError;
/**
 * Error al intentar registrar un recurso inválido
 */
var HaztivityResourceNameInvalidError = (function (_super) {
    __extends(HaztivityResourceNameInvalidError, _super);
    function HaztivityResourceNameInvalidError(resource) {
        //todo LINK
        return _super.call(this, "HaztivityResourceNameInvalidError", "Invalid name '" + resource + "'. Please use camelCase nomenclature.") || this;
    }
    return HaztivityResourceNameInvalidError;
}(BaseError_1.BaseError));
exports.HaztivityResourceNameInvalidError = HaztivityResourceNameInvalidError;
/**
 * Error al intentar inicializar un recurso sin indicar el nombre del recurso a inicializar
 */
var HaztivityResourceNameRequiredError = (function (_super) {
    __extends(HaztivityResourceNameRequiredError, _super);
    function HaztivityResourceNameRequiredError($element) {
        return _super.call(this, "HaztivityResourceNameRequiredError", "Resource name not provider in data-* attribute. " + $element) || this;
    }
    return HaztivityResourceNameRequiredError;
}(BaseError_1.BaseError));
exports.HaztivityResourceNameRequiredError = HaztivityResourceNameRequiredError;
/**
 * Error al intentar inicializar un recurso no registrado
 */
var HaztivityResourceNotRegisteredError = (function (_super) {
    __extends(HaztivityResourceNotRegisteredError, _super);
    function HaztivityResourceNotRegisteredError(resource) {
        return _super.call(this, "HaztivityResourceNotRegisteredError", "Attempt to initialize " + resource + " but is not registered") || this;
    }
    return HaztivityResourceNotRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityResourceNotRegisteredError = HaztivityResourceNotRegisteredError;
/**
 * Error de controlador invalido
 */
var HaztivityInvalidResourceControllerError = (function (_super) {
    __extends(HaztivityInvalidResourceControllerError, _super);
    function HaztivityInvalidResourceControllerError(resource) {
        return _super.call(this, "HaztivityInvalidResourceControllerError", "Invalid controller for " + resource + " resource") || this;
    }
    return HaztivityInvalidResourceControllerError;
}(BaseError_1.BaseError));
exports.HaztivityInvalidResourceControllerError = HaztivityInvalidResourceControllerError;
//# sourceMappingURL=Errors.js.map
});
___scope___.file("resource/ResourceInitializerService.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var ResourceInitializer_1 = require("./ResourceInitializer");
var di_1 = require("../di");
var ResourceInitializerService = (function () {
    /**
     * Servicio del inicializador de recursos
     * @class
     * @param ResourceInitializer
     */
    function ResourceInitializerService(ResourceInitializer) {
        var publish = [
            "initialize",
            "initializeOne",
            "getResources",
            "getResourcesControllers"
        ];
        for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
            var method = publish_1[_i];
            this[method] = ResourceInitializer[method].bind(ResourceInitializer);
        }
    }
    ResourceInitializerService.prototype.initialize = function ($context) {
        return undefined;
    };
    ResourceInitializerService.prototype.getResources = function ($context, initState) {
        return undefined;
    };
    ResourceInitializerService.prototype.getResourcesControllers = function ($context) {
        return undefined;
    };
    /**
     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el recurso
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
     */
    ResourceInitializerService.prototype.initializeOne = function ($element, config) {
        if (config === void 0) { config = {}; }
        return undefined;
    };
    return ResourceInitializerService;
}());
ResourceInitializerService = __decorate([
    di_1.Service({
        name: "ResourceInitializerService",
        dependencies: [
            ResourceInitializer_1.ResourceInitializer
        ]
    })
], ResourceInitializerService);
exports.ResourceInitializerService = ResourceInitializerService;
//# sourceMappingURL=ResourceInitializerService.js.map
});
___scope___.file("resource/ResourceInitializer.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var ResourceManager_1 = require("./ResourceManager");
var utils_1 = require("../utils");
var jquery_1 = require("../jquery");
var Errors_1 = require("./Errors");
var ResourceInitializer = ResourceInitializer_1 = (function () {
    function ResourceInitializer(_$, _ResourceManager, _InjectorService, _DataOptions) {
        this._$ = _$;
        this._ResourceManager = _ResourceManager;
        this._InjectorService = _InjectorService;
        this._DataOptions = _DataOptions;
    }
    /**
     * Inicializa todos los recursos en un contexto en concreto
     * @param {JQuery}  $context    Contexto en el cual buscar recursos a inicializar
     */
    ResourceInitializer.prototype.initialize = function ($context) {
        var $elements = this._findElementsInContext($context), results = [];
        for (var _i = 0, _a = $elements; _i < _a.length; _i++) {
            var element = _a[_i];
            var result = this.initializeOne(jquery_1.$(element));
            if (result != undefined) {
                results.push(result);
            }
        }
        return results;
    };
    /**
     * Inicializa un recurso en un elemento en concreto. El elemento ha de tener un recurso válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el recurso
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del recurso
     */
    ResourceInitializer.prototype.initializeOne = function ($element, config) {
        if (config === void 0) { config = {}; }
        //get name
        var name = $element.data(ResourceInitializer_1.CAMEL_PREFIX), result;
        if (!!name) {
            //check if exists
            if (!!this._ResourceManager.exists(name)) {
                //get from DI
                var factory = this._InjectorService.get(name);
                if (factory) {
                    //check if is already instanciated
                    var controllerInstance = $element.data(ResourceInitializer_1.PREFIX_INSTANCE);
                    if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                        //extract options
                        var options = this._DataOptions.getDataOptions($element, name);
                        options = this._$.extend({}, options, config.options);
                        //get controller instance
                        controllerInstance = factory.instance();
                        controllerInstance.activate($element);
                        $element.data(ResourceInitializer_1.PREFIX_INSTANCE, controllerInstance);
                        //init controller
                        controllerInstance.init(options, config.data);
                    }
                    else {
                    }
                    result = controllerInstance;
                }
                else {
                    throw new Errors_1.HaztivityInvalidResourceControllerError(name);
                }
            }
            else {
                throw new Errors_1.HaztivityResourceNotRegisteredError(name);
            }
        }
        else {
            throw new Errors_1.HaztivityResourceNameRequiredError($element);
        }
        return result;
    };
    /**
     * Obtiene los elementos DOM indicados como recursos
     * @param {JQuery}      $context            Contexto en el cual buscar los recursos
     * @param {number}      [initState=2]       Establece que recursos obtener. Se puede indicar:
     *                                          0   se obtienen los recursos sin inicializar
     *                                          1   se obtienen los recursos inicializados
     *                                          2   se obtienen los recursos sin inicializar e inicializados
     * @returns {JQuery}
     */
    ResourceInitializer.prototype.getResources = function ($context, initState) {
        if (initState === void 0) { initState = 2; }
        var result = [], $elements = this._findElementsInContext($context);
        switch (initState) {
            case 0:
                for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    var $element = this._$($elements[elementIndex]);
                    if ($element.data(ResourceInitializer_1.PREFIX_INSTANCE) == undefined) {
                        result.push($element);
                    }
                }
                break;
            case 1:
                for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    var $element = this._$($elements[elementIndex]);
                    if ($element.data(ResourceInitializer_1.PREFIX_INSTANCE) != undefined) {
                        result.push($element);
                    }
                }
                break;
            default:
                for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    var $element = this._$($elements[elementIndex]);
                    result.push($element);
                }
                break;
        }
        return this._$(result);
    };
    /**
     * Obtiene los controladores de recursos
     * @param {JQuery}      $context            Contexto en el cual buscar.
     * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
     * @returns {Array}
     */
    ResourceInitializer.prototype.getResourcesControllers = function ($context, recursive) {
        if (recursive === void 0) { recursive = true; }
        var result = [], $elements = recursive === true
            ? this._findElementsInContext($context)
            : $context;
        for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
            var $element = this._$($elements[elementIndex]), controller = $element.data(ResourceInitializer_1.PREFIX_INSTANCE);
            if (controller != undefined) {
                result.push(controller);
            }
        }
        return result;
    };
    ResourceInitializer.prototype._findElementsInContext = function ($context) {
        var _this = this;
        var $elements, parents = [];
        //check if context is also a resource
        if ($context.length === 1) {
            if ($context.is("[" + ResourceInitializer_1.PREFIX + "],[data-" + ResourceInitializer_1.PREFIX + "]")) {
                parents = $context.toArray();
            }
        }
        else {
            $context.each(function (index, element) {
                var $element = _this._$(element);
                if ($element.is("[" + ResourceInitializer_1.PREFIX + "],[data-" + ResourceInitializer_1.PREFIX + "]")) {
                    parents.push($element);
                }
            });
        }
        $elements = parents.concat($context.find("[" + ResourceInitializer_1.PREFIX + "],[data-" + ResourceInitializer_1.PREFIX + "]").toArray()); //get elements with the prefix
        return this._$($elements);
    };
    return ResourceInitializer;
}());
ResourceInitializer.PREFIX = "hz-resource";
ResourceInitializer.CAMEL_PREFIX = "hzResource";
ResourceInitializer.PREFIX_INSTANCE = "hzResourceInstance";
ResourceInitializer = ResourceInitializer_1 = __decorate([
    di_1.Core({
        name: "ResourceInitializer",
        dependencies: [
            jquery_1.$,
            ResourceManager_1.ResourceManager,
            di_1.InjectorService,
            utils_1.DataOptions
        ],
        public: true
    })
], ResourceInitializer);
exports.ResourceInitializer = ResourceInitializer;
var ResourceInitializer_1;
//# sourceMappingURL=ResourceInitializer.js.map
});
___scope___.file("resource/ResourceSequenceFactory.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var ResourceSequence_1 = require("./ResourceSequence");
var ResourceSequenceFactory = (function () {
    function ResourceSequenceFactory(_ResourceSequence) {
        this._ResourceSequence = _ResourceSequence;
    }
    /**
     * Crea una secuencia
     * @param {ResourceController[]|ResourceSequence[]} items   Conjunto de Recursos o Secuencias a
     * @param id
     * @returns {ResourceSequence}
     */
    ResourceSequenceFactory.prototype.createSequence = function (items, id) {
        var sequence = this._ResourceSequence.instance();
        sequence.activate(items, id);
        return sequence;
    };
    return ResourceSequenceFactory;
}());
ResourceSequenceFactory = __decorate([
    di_1.Service({
        name: "ResourceSequenceFactory",
        dependencies: [
            ResourceSequence_1.ResourceSequence
        ]
    })
], ResourceSequenceFactory);
exports.ResourceSequenceFactory = ResourceSequenceFactory;
//# sourceMappingURL=ResourceSequenceFactory.js.map
});
___scope___.file("resource/ResourceSequence.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var jquery_1 = require("../jquery");
var utils_1 = require("../utils");
var ResourceController_1 = require("./ResourceController");
var ResourceInitializer_1 = require("./ResourceInitializer");
var ResourceSequence = ResourceSequence_1 = (function () {
    function ResourceSequence(_$, _EventEmitterFactory) {
        this._items = [];
        this._itemsPromises = [];
        this._$ = _$;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
        this._state = ResourceSequence_1.STATES.waiting;
        this._completeDeferred = this._$.Deferred();
        this._locked = false;
    }
    /**
     * Activa la secuencia
     * @param {JQuery | ResourceController[] | ResourceSequence[]}  items       Conjunto de items a incluir en la secuencia.
     * @param {String}                                              [id]        Id a asignar a la secuencia
     */
    ResourceSequence.prototype.activate = function (items, id) {
        this._id = id != undefined ? id : new Date().getTime();
        this._addItems(items);
    };
    ResourceSequence.prototype._addItems = function (items) {
        for (var itemIndex = 0, itemsLength = items.length; itemIndex < itemsLength; itemIndex++) {
            var currentItem = items[itemIndex];
            this._addItem(currentItem);
        }
    };
    ResourceSequence.prototype._addItem = function (item) {
        if (item instanceof Element) {
            this._addItem(this._$(item).data(ResourceInitializer_1.ResourceInitializer.PREFIX_INSTANCE));
        }
        else {
            if (item) {
                //if is a resource, add a class to indicate state and an attr to indicate the secuence
                if (item instanceof ResourceController_1.ResourceController) {
                    item.disable();
                    this._setResourceState(item, ResourceSequence_1.STATES.waiting);
                    item.getElement().attr(ResourceSequence_1.ATTR_SEQUENCE, this._id);
                }
                //lock item to prevent manual interaction
                item._lock();
                this._itemsPromises.push(item.getCompletePromise());
                this._items.push(item);
            }
        }
    };
    /**
     * Actualiza el estado de un recurso. Comprueba si el item es una instancia de ResourceController
     * @param {*}       item    Elemento a comprobar y actualizar
     * @param {number}  state   Estado a establecer
     * @private
     */
    ResourceSequence.prototype._setResourceState = function (item, state) {
        if (item instanceof ResourceController_1.ResourceController) {
            var $element = item.getElement();
            $element.removeClass(ResourceSequence_1.CLASS_RUNNING + " " + ResourceSequence_1.CLASS_COMPLETED + " " + ResourceSequence_1.CLASS_WAITING);
            switch (state) {
                case ResourceSequence_1.STATES.completed:
                    $element.addClass(ResourceSequence_1.CLASS_COMPLETED);
                    break;
                case ResourceSequence_1.STATES.running:
                    $element.addClass(ResourceSequence_1.CLASS_RUNNING);
                    break;
                case ResourceSequence_1.STATES.waiting:
                    $element.addClass(ResourceSequence_1.CLASS_WAITING);
                    break;
            }
            item._eventEmitter.trigger(ResourceSequence_1.ON_RESOURCE_STATE_CHANGE, [item, state]);
            this._eventEmitter.trigger(ResourceSequence_1.ON_RESOURCE_STATE_CHANGE, [item, state]);
        }
    };
    /**
     * Invocado al completarse un item. Avanza la secuencia
     * @private
     */
    ResourceSequence.prototype._onItemComplete = function () {
        this._setResourceState(this._currentItem, ResourceSequence_1.STATES.completed);
        this._next();
    };
    /**
     * Avanza la secuencia.
     * @private
     */
    ResourceSequence.prototype._next = function () {
        if (this.isRunning()) {
            if (this._currentItemIndex < this._items.length) {
                var item = this._items[this._currentItemIndex], promise = void 0;
                this._currentItem = item;
                this._currentItemIndex++;
                item._unlock();
                //if item is a sequence, unlock it to run
                if (item instanceof ResourceSequence_1) {
                    item.run();
                }
                else {
                    this._setResourceState(item, ResourceSequence_1.STATES.running);
                    item.enable();
                }
                promise = item.getCompletePromise();
                promise.then(this._onItemComplete.bind(this));
            }
            else {
                this._markAsComplete();
            }
        }
    };
    /**
     * Indica si la secuencia está en ejecución
     * @returns {boolean}
     */
    ResourceSequence.prototype.isRunning = function () {
        return this._state == ResourceSequence_1.STATES.running;
    };
    /**
     * Indica si la secuencia está bloqueada
     * @returns {any}
     */
    ResourceSequence.prototype.isLocked = function () {
        return this._locked;
    };
    /**
     * Bloquea la secuencia impidiendo que sea ejecutada
     * @returns {ResourceSequence}
     * @private
     */
    ResourceSequence.prototype._lock = function () {
        this._locked = true;
        return this;
    };
    /**
     * Desbloquea la secuencia
     * @returns {ResourceSequence}
     * @private
     */
    ResourceSequence.prototype._unlock = function () {
        this._locked = false;
        return this;
    };
    /**
     * Ejecuta la secuencia si no está bloqueada
     * @returns {JQueryPromise<T>}
     */
    ResourceSequence.prototype.run = function () {
        if (!this.isLocked()) {
            this._state = ResourceSequence_1.STATES.running;
            this._currentItemIndex = 0;
            this._next();
            return this.getCompletePromise();
        }
    };
    /**
     * Indica si la secuencia está completa
     * @returns {boolean}
     */
    ResourceSequence.prototype.isCompleted = function () {
        return this._state == ResourceSequence_1.STATES.completed;
    };
    /**
     * Marca la secuencia como completada
     * @private
     */
    ResourceSequence.prototype._markAsComplete = function () {
        if (!this.isCompleted()) {
            this._state = ResourceSequence_1.STATES.completed;
            this._completeDeferred.resolve(this._items);
            this._eventEmitter.trigger(ResourceSequence_1.ON_COMPLETED, [this._items]);
        }
    };
    /**
     * Devuelve la promesa de la sequencia. La promesa se resuelve al completarse
     * @returns {JQueryPromise<T>}
     */
    ResourceSequence.prototype.getCompletePromise = function () {
        return this._completeDeferred.promise();
    };
    ResourceSequence.prototype.on = function (events, data, handler) {
        this._eventEmitter.on(events, data, handler);
        return this;
    };
    ;
    ResourceSequence.prototype.one = function (events, data, handler) {
        this._eventEmitter.one(events, data, handler);
        return this;
    };
    ;
    ResourceSequence.prototype.off = function (events, handler) {
        this._eventEmitter.off(events, handler);
        return this;
    };
    ;
    return ResourceSequence;
}());
ResourceSequence.NAMESPACE = "resourceSequence";
ResourceSequence.ON_COMPLETED = ResourceSequence_1.NAMESPACE + ":completed";
ResourceSequence.ON_RESOURCE_STATE_CHANGE = ResourceSequence_1.NAMESPACE + ":resourcestatechange";
ResourceSequence.STATES = {
    waiting: 0,
    running: 1,
    completed: 2
};
ResourceSequence.CLASS_WAITING = "hz-resource-sequence--waiting";
ResourceSequence.CLASS_RUNNING = "hz-resource-sequence--current";
ResourceSequence.CLASS_COMPLETED = "hz-resource-sequence--completed";
ResourceSequence.ATTR_SEQUENCE = "data-hz-resource-sequence";
ResourceSequence = ResourceSequence_1 = __decorate([
    di_1.Core({
        name: "ResourceSequence",
        dependencies: [
            jquery_1.$,
            utils_1.EventEmitterFactory
        ],
        instantiable: true,
        public: true
    })
], ResourceSequence);
exports.ResourceSequence = ResourceSequence;
var ResourceSequence_1;
//# sourceMappingURL=ResourceSequence.js.map
});
___scope___.file("page/Errors.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var BaseError_1 = require("../base/BaseError");
/**
 * Error al tratar de registrar una página existente
 */
var HaztivityPageAlreadyRegistered = (function (_super) {
    __extends(HaztivityPageAlreadyRegistered, _super);
    function HaztivityPageAlreadyRegistered(pageName) {
        return _super.call(this, "HaztivityPageAlreadyRegistered", "'" + pageName + "' already exists. Pages must be uniques") || this;
    }
    return HaztivityPageAlreadyRegistered;
}(BaseError_1.BaseError));
exports.HaztivityPageAlreadyRegistered = HaztivityPageAlreadyRegistered;
/**
 * Error al indicarse un nombre de página inválido
 */
var HaztivityPageNameInvalid = (function (_super) {
    __extends(HaztivityPageNameInvalid, _super);
    function HaztivityPageNameInvalid(pageName) {
        return _super.call(this, "HaztivityPageNameInvalid", "The name '" + pageName + "' is invalid. Only allowed [a-zA-Z0-9_-]") || this;
    }
    return HaztivityPageNameInvalid;
}(BaseError_1.BaseError));
exports.HaztivityPageNameInvalid = HaztivityPageNameInvalid;
/**
 * Error al no generarse elemento en la página
 */
var HaztivityPageElementError = (function (_super) {
    __extends(HaztivityPageElementError, _super);
    function HaztivityPageElementError(pageName) {
        return _super.call(this, "HaztivityPageElementError", "The page '" + pageName + "' $element is invalid. The template could not be undefined") || this;
    }
    return HaztivityPageElementError;
}(BaseError_1.BaseError));
exports.HaztivityPageElementError = HaztivityPageElementError;
//# sourceMappingURL=Errors.js.map
});
___scope___.file("page/GenericPageController.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var jquery_1 = require("../jquery");
var PageController_1 = require("./PageController");
var resource_1 = require("../resource");
var GenericPageController = (function (_super) {
    __extends(GenericPageController, _super);
    function GenericPageController(_$, _InjectorService, _ResourceInitializerService, _ResourceSequenceFactory) {
        var _this = _super.call(this, _$, _InjectorService, _ResourceInitializerService) || this;
        _this._sequences = [];
        _this._ResourceSequenceFactory = _ResourceSequenceFactory;
        return _this;
    }
    /**
     * Crea una secuencia
     * @param items
     * @returns {ResourceSequence}
     * @see ResourceSequenceFactory
     */
    GenericPageController.prototype.createResourceSequence = function (items) {
        var sequence = this._ResourceSequenceFactory.createSequence(items);
        this._sequences.push(sequence);
        return sequence;
    };
    GenericPageController.prototype._render = function (template) {
        var render = _super.prototype._render.call(this, template);
        render.hide();
        return render;
    };
    GenericPageController.prototype._initializeResources = function () {
        _super.prototype._initializeResources.call(this);
        if (this.options.autoSequence != false) {
            this.createResourceSequence(this._resources).run();
        }
        return this._resources;
    };
    GenericPageController.prototype._show = function ($oldPage, oldPageRelativePosition) {
        var _this = this;
        var defer = this._$.Deferred();
        if ($oldPage) {
            $oldPage.fadeOut(400, function () {
                _this.$element.fadeIn(400, function () {
                    defer.resolve();
                });
            });
        }
        else {
            this.$element.fadeIn(400, function () {
                defer.resolve();
            });
        }
        return defer.promise();
    };
    return GenericPageController;
}(PageController_1.PageController));
GenericPageController = __decorate([
    di_1.Page({
        name: "GenericPageController",
        dependencies: [
            jquery_1.$,
            di_1.InjectorService,
            resource_1.ResourceInitializerService,
            resource_1.ResourceSequenceFactory
        ]
    })
], GenericPageController);
exports.GenericPageController = GenericPageController;
//# sourceMappingURL=GenericPageController.js.map
});
___scope___.file("page/PageFactory.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var PageRegister_1 = require("./PageRegister");
var GenericPageController_1 = require("./GenericPageController");
/**
 * Factory para crear páginas genéricas
 * @class PageFactory
 */
var PageFactory = PageFactory_1 = (function () {
    function PageFactory() {
    }
    /**
     * Genera una página genérica
     * @static
     * @param {IPageOptions}    options     Opciones para la creación de la página
     * @returns {Page}
     */
    PageFactory.createPage = function (options) {
        var PageDIFactory = di_1.Injector.getInstance(PageFactory_1).get(PageRegister_1.PageRegister);
        var page = PageDIFactory.instance();
        //Set PageController as default
        if (!options.controller) {
            options.controller = "GenericPageController";
        }
        page.activate(options);
        return page;
    };
    return PageFactory;
}());
PageFactory = PageFactory_1 = __decorate([
    di_1.Core({
        name: "PageFactory",
        dependencies: [
            GenericPageController_1.GenericPageController
        ]
    })
], PageFactory);
exports.PageFactory = PageFactory;
var PageFactory_1;
//# sourceMappingURL=PageFactory.js.map
});
___scope___.file("page/PageImplementation.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var di_2 = require("../di");
var jquery_1 = require("../jquery");
var resource_1 = require("../resource");
var PageImplementation = (function () {
    /**
     * Gestiona el ciclo de vida de una página una vez registrada en el PageManager. Almacena el estado y el store y gestiona el ciclo de vida del controlador.
     * @class
     * @param Injector
     */
    function PageImplementation(_$, _ResourceManager, _Injector) {
        this._$ = _$;
        this._ResourceManager = _ResourceManager;
        this._Injector = _Injector;
        this.store = {
            public: {},
            private: {}
        };
        this._state = { completed: false, visited: false };
    }
    /**
     * Configura la clase nada más instanciarla
     * @param {PageRegister}    page    Página registrada en el PageManager.
     */
    PageImplementation.prototype.activate = function (page) {
        this._resources = page.getResources();
        this._page = page;
    };
    /**
     * Obtiene el PageRegister asociado
     * @returns {PageRegister}
     */
    PageImplementation.prototype.getPage = function () {
        return this._page;
    };
    /**
     * Obtiene el estado actual
     * @returns {IPageState}
     */
    PageImplementation.prototype.getState = function () {
        return this._state;
    };
    /**
     * Actualiza el estado
     * @param {IPageState}  state       Estado a establecer
     */
    PageImplementation.prototype.setState = function (state) {
        this._state = state;
    };
    /**
     * Obtiene el nombre de la página
     * @returns {string}
     */
    PageImplementation.prototype.getPageName = function () {
        return this._page.getName();
    };
    /**
     * Obtiene una instancia del controlador.
     * Si se solicita y no hay controlador actual se instancia uno nuevo iniciando el ciclo de vida.
     * @returns {PageController}
     * @see PageController
     */
    PageImplementation.prototype.getController = function () {
        if (!this._currentController) {
            var pageOptions = this._page._options;
            if (!this._controllerFactory) {
                this._controllerFactory = this._Injector.get(pageOptions.controller);
            }
            var controller = this._controllerFactory.instance();
            controller.activate(pageOptions, this._page._eventEmitter, this._state, this.store);
            this._currentController = controller;
        }
        return this._currentController;
    };
    PageImplementation.prototype.render = function () {
        if (this._currentController && !this._currentController.getElement()) {
            return this._currentController.render();
        }
    };
    PageImplementation.prototype.postRender = function () {
        if (this._currentController) {
            this._currentController._postRender();
        }
    };
    PageImplementation.prototype.getElement = function () {
        if (this._currentController) {
            return this._currentController.getElement();
        }
    };
    /**
     * Finaliza el ciclo de vida actual invocando al método "destroy" del controlador de la página y liberando la instancia del controlador
     */
    PageImplementation.prototype.detach = function () {
        this._currentController._destroy();
        this._currentController = null;
    };
    /**
     * Desecha la instancia del controlador actual
     */
    PageImplementation.prototype.stop = function () {
        this._currentController = null;
        return this;
    };
    return PageImplementation;
}());
PageImplementation = __decorate([
    di_1.Core({
        name: "PageImplementation",
        dependencies: [
            jquery_1.$,
            resource_1.ResourceManager,
            di_2.InjectorService
        ],
        instantiable: true
    })
], PageImplementation);
exports.PageImplementation = PageImplementation;
//# sourceMappingURL=PageImplementation.js.map
});
___scope___.file("page/PageManager.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var PageImplementation_1 = require("./PageImplementation");
var utils_1 = require("../utils");
var Errors_1 = require("./Errors");
var resource_1 = require("../resource");
var PageManager = (function () {
    function PageManager(_ResourceManager, _EventEmitterFactory, _PageImplementationFactory) {
        this._ResourceManager = _ResourceManager;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._PageImplementationFactory = _PageImplementationFactory;
        this._pages = [];
        this._pagesMap = new Map();
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    }
    /**
     * Indica el número de páginas registradas
     * @returns {number}
     */
    PageManager.prototype.count = function () {
        return this._pages.length;
    };
    /**
     * Añade un conjunto de páginas.
     * @param {PageRegister[]}          pages       Conjunto de páginas a añadir
     */
    PageManager.prototype.addPages = function (pages) {
        for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            var page = pages_1[_i];
            this.addPage(page);
        }
    };
    /**
     * Añade una página
     * @param {Page}    page        Página a añadir
     */
    PageManager.prototype.addPage = function (page) {
        var pageName = page.getName();
        if (this.getPageIndex(pageName) === -1) {
            if (this._validatePageName(pageName)) {
                this._ResourceManager.addAll(page.getResources());
                var pageImplementation = this._PageImplementationFactory.instance();
                pageImplementation.activate(page);
                this._pages.push(pageImplementation);
                this._pagesMap.set(pageName, this._pages.length - 1);
            }
            else {
                throw new Errors_1.HaztivityPageNameInvalid(pageName);
            }
        }
        else {
            throw new Errors_1.HaztivityPageAlreadyRegistered(pageName);
        }
    };
    PageManager.prototype._validatePageName = function (name) {
        return name.search(/[^\w|-]/g) == -1;
    };
    /**
     * Actualiza el mapa de nombre-índice de las páginas
     */
    PageManager.prototype.remapPages = function () {
        this._pagesMap.clear();
        var pages = this._pages;
        for (var pageIndex = 0, pagesLength = pages.length; pageIndex < pagesLength; pageIndex++) {
            var currentPage = pages[pageIndex];
            this._pagesMap.set(currentPage.getPageName(), pageIndex);
        }
    };
    /**
     * Obtiene el índice de una página en base al nombre registrado. Si no se encuentra la página se devuelve -1
     * @param {string}      name    Nombre de la página
     * @returns {number}
     */
    PageManager.prototype.getPageIndex = function (name) {
        var result = this._pagesMap.get(name);
        result = result != undefined
            ? result
            : -1;
        return result;
    };
    /**
     * Obtiene una página por su índice. Si no se encuentra se devuelve undefined
     * @param {number}  index   Índice de la página a obtener
     * @returns {PageImplementation}
     */
    PageManager.prototype.getPage = function (index) {
        return this._pages[index];
    };
    /**
     * Obtiene una página por el nombre registrado. Si no se encuentra se devuelve undefined
     * @param {string}  name    Nombre de la página a obtener
     * @returns {PageImplementation}
     * @see getPageIndex
     * @see getPage
     */
    PageManager.prototype.getPageByName = function (name) {
        return this.getPage(this.getPageIndex(name));
    };
    PageManager.prototype.on = function () {
    };
    PageManager.prototype.off = function () {
    };
    return PageManager;
}());
PageManager = __decorate([
    di_1.Core({
        name: "PageManager",
        public: true,
        dependencies: [
            resource_1.ResourceManager,
            utils_1.EventEmitterFactory,
            PageImplementation_1.PageImplementation
        ]
    })
], PageManager);
exports.PageManager = PageManager;
//# sourceMappingURL=PageManager.js.map
});
___scope___.file("navigator.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Navigator_1 = require("./navigator/Navigator");
exports.Navigator = Navigator_1.Navigator;
exports.INavigatorPageData = Navigator_1.INavigatorPageData;
var NavigatorService_1 = require("./navigator/NavigatorService");
exports.NavigatorService = NavigatorService_1.NavigatorService;
//# sourceMappingURL=navigator.js.map
});
___scope___.file("navigator/Navigator.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var jquery_1 = require("../jquery");
var di_1 = require("../di");
var page_1 = require("../page");
var utils_1 = require("../utils");
var Navigator = Navigator_1 = (function () {
    /**
     * Gestiona la transición entre páginas y el renderizado de las mismas en un contexto específico
     * @param {JQueryStatic}                _$
     * @param {PageManager}                 _PageManager
     * @param {EventEmitterFactory}         _EventEmitterFactory
     */
    function Navigator(_$, _PageManager, _EventEmitterFactory) {
        this._$ = _$;
        this._PageManager = _PageManager;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._development = false;
    }
    Navigator.prototype.activate = function ($context) {
        this._$context = $context;
        this._eventEmitter = this._EventEmitterFactory.createEmitter();
    };
    Navigator.prototype.enableDev = function () {
        this._development = true;
    };
    Navigator.prototype.disableDev = function () {
        this._development = false;
    };
    /**
     * Navega a la página solicitada.
     * Debe estar registrada en PageManager
     * @param {Number} index    Índice de la página a navegar
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    Navigator.prototype.goTo = function (index) {
        if (this.isDisabled() !== true) {
            //get the page requested
            var newPage = this._PageManager.getPage(index);
            //the page must be provided and different of the current page
            if (newPage) {
                if (newPage !== this._currentPage) {
                    var currentPage = this.getCurrentPage(), //get current page and index
                    currentPageIndex = this.getCurrentPageIndex(), currentPageIs = currentPageIndex - index < 0
                        ? -1
                        : 1; //check the position of the old page relative to the new page
                    //check if resources are completed to go to the next page
                    if (this._development === true || (currentPageIs === 1 || (currentPage == undefined || currentPage.getController().isCompleted()))) {
                        if (this._currentRenderProcess && this._currentRenderProcess.state() === "pending") {
                            this._currentRenderProcess.reject();
                        }
                        this._currentRenderProcess = this._$.Deferred();
                        this._currentPage = newPage; //set new page as current
                        this._currentPageIndex = index;
                        var newPageName = newPage.getPageName(), //get name of new controller
                        newPageData = {
                            index: index,
                            name: newPageName
                        }, currentPageData = void 0;
                        if (currentPage) {
                            currentPageData = {
                                index: currentPageIndex,
                                name: currentPage.getPageName()
                            };
                        }
                        //trigger event in navigator
                        this._eventEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_START, newPageData, currentPageData);
                        //trigger a global event that could be listened by anyone
                        this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_START, newPageData, currentPageData);
                        var currentPageElement = currentPage
                            ? currentPage.getController().getElement()
                            : null, //get current element
                        newPageController = newPage.getController(), //create a controller for new page
                        newPageElement = newPage.render(); //get the rendered element
                        //if the new page is before to the current page
                        if (currentPageIndex === -1) {
                            this._$context.prepend(newPageElement);
                        }
                        else {
                            this._$context.append(newPageElement);
                        }
                        //initialize resources and trigger rendered event
                        newPage.postRender();
                        this._$context.removeAttr(Navigator_1.ATTR_CURRENT);
                        this._$context.attr(Navigator_1.ATTR_TRANSITION_TO, newPageName);
                        //trigger event in navigator
                        this._eventEmitter.trigger(Navigator_1.ON_DRAW_PAGE, newPageName);
                        //trigger a global event that could be listened by anyone
                        this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_DRAW_PAGE, newPageName);
                        //request animations
                        var showPromise = newPageController.show(currentPageElement, currentPageIs);
                        //if the function returns a promise
                        if (typeof showPromise.then === "function") {
                            showPromise.then(this._onPageShowEnd.bind(this, newPage, newPageData, currentPage, currentPageData, this._currentRenderProcess));
                        }
                        else {
                            this._onPageShowEnd(newPage, newPageData, currentPage, currentPageData, this._currentRenderProcess);
                        }
                    }
                    return this._currentRenderProcess;
                }
            }
            else {
            }
        }
        return false;
    };
    /**
     * Devuelve un array con los índices de las páginas que hayan sido visitadas
     * @returns {Number[]}
     */
    Navigator.prototype.getVisitedPages = function () {
        var pagesLength = this._PageManager.count(), pages = [];
        for (var pageIndex = 0; pageIndex < pagesLength; pageIndex++) {
            var currentPage = this._PageManager.getPage(pageIndex), state = currentPage.getState();
            if (state.visited) {
                pages.push(pageIndex);
            }
        }
        return pages;
    };
    /**
     * Devuelve el estado actual de deshabilitado
     * @returns {boolean}
     */
    Navigator.prototype.isDisabled = function () {
        return this._disabled;
    };
    /**
     * Establece el estado de deshabilitado
     * @param {boolean}     disabled        Estado a establecer
     */
    Navigator.prototype.setDisabled = function (disabled) {
        if (this._disabled !== disabled) {
            this._disabled = disabled;
            if (disabled) {
                this._eventEmitter.trigger(Navigator_1.ON_ENABLE);
            }
            else {
                this._eventEmitter.trigger(Navigator_1.ON_DISABLE);
            }
        }
    };
    /**
     * Habilita la navegación
     */
    Navigator.prototype.enable = function () {
        this.setDisabled(false);
    };
    /**
     * Deshabilita la navegación
     */
    Navigator.prototype.disable = function () {
        this.setDisabled(true);
    };
    /**
     * Retrocede a la página posterior si existe.
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    Navigator.prototype.next = function () {
        var numPages = this._PageManager.count(), currentPageIndex = this.getCurrentPageIndex();
        if (currentPageIndex < numPages - 1) {
            return this.goTo(currentPageIndex + 1);
        }
        else {
            return false;
        }
    };
    /**
     * Retrocede a la página anterior si existe.
     * @returns {JQueryPromise|boolean} Promesa que es resuelta al finalizarse el proceso completo de cambio de
     * página. False si no se realiza el cambio
     */
    Navigator.prototype.prev = function () {
        var currentPageIndex = this.getCurrentPageIndex();
        if (currentPageIndex > 0) {
            return this.goTo(currentPageIndex - 1);
        }
        else {
            return false;
        }
    };
    /**
     * Invocado al finalizarse la animación del cambio de página
     * @param {PageImplementation}      newPage     Página activada
     * @param {INavigatorPageData}      newPageData Datos de la página activada
     * @param {PageImplementation}      oldPage     Página desactivada
     * @param {INavigatorPageData}      oldPageData Datos de la página desactivada
     * @param {JQueryDeferred}          defer       Deferred a resolver para indicar que el proceso ha finalizado
     * @private
     */
    Navigator.prototype._onPageShowEnd = function (newPage, newPageData, oldPage, oldPageData, defer) {
        if (oldPage) {
            var controller = oldPage.getController();
            oldPage.detach();
            controller.getElement().remove();
        }
        this._$context.removeAttr(Navigator_1.ATTR_TRANSITION_TO);
        this._$context.attr(Navigator_1.ATTR_CURRENT, newPageData.name);
        //trigger event in navigator
        this._eventEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
        //trigger a global event that could be listened by anyone
        this._eventEmitter.globalEmitter.trigger(Navigator_1.ON_CHANGE_PAGE_END, [newPageData, oldPageData]);
        defer.resolve(newPageData, oldPageData);
    };
    /**
     * Obtiene el índice de la página actual
     * @returns {number}
     */
    Navigator.prototype.getCurrentPageIndex = function () {
        return this._currentPageIndex;
    };
    /**
     * Obtiene la implementación de página actual
     * @returns {PageImplementation}
     */
    Navigator.prototype.getCurrentPage = function () {
        return this._currentPage;
    };
    /**
     * Devuelve los datos de la página actual
     * @returns {INavigatorPageData}
     */
    Navigator.prototype.getCurrentPageData = function () {
        return {
            index: this._currentPageIndex,
            name: this._currentPage.getPageName()
        };
    };
    /**
     * @see EventEmitter#on
     * @returns {Navigator}
     */
    Navigator.prototype.on = function (events, data, handler) {
        this._eventEmitter.on(events, data, handler);
        return this;
    };
    /**
     * @see EventEmitter#one
     * @returns {Navigator}
     */
    Navigator.prototype.one = function (events, data, handler) {
        this._eventEmitter.one(events, data, handler);
        return this;
    };
    /**
     * @see EventEmitter#off
     * @returns {Navigator}
     */
    Navigator.prototype.off = function (events, handler) {
        this._eventEmitter.off(events, handler);
        return this;
    };
    return Navigator;
}());
Navigator.NAMESPACE = "navigator";
Navigator.ON_DRAW_PAGE = Navigator_1.NAMESPACE + ":draw";
Navigator.ON_DISABLE = Navigator_1.NAMESPACE + ":disable";
Navigator.ON_ENABLE = Navigator_1.NAMESPACE + ":enable";
Navigator.ON_CHANGE_PAGE_END = Navigator_1.NAMESPACE + ":changeend";
Navigator.ON_CHANGE_PAGE_START = Navigator_1.NAMESPACE + ":changestart";
Navigator.ATTR_TRANSITION_TO = "data-hz-navigator-transition-to";
Navigator.ATTR_CURRENT = "data-hz-navigator-page";
Navigator = Navigator_1 = __decorate([
    di_1.Core({
        name: "Navigator",
        public: true,
        dependencies: [
            jquery_1.$,
            page_1.PageManager,
            utils_1.EventEmitterFactory
        ]
    })
], Navigator);
exports.Navigator = Navigator;
var Navigator_1;
//# sourceMappingURL=Navigator.js.map
});
___scope___.file("navigator/NavigatorService.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var Navigator_1 = require("./Navigator");
var NavigatorService = (function () {
    function NavigatorService(_Navigator) {
        var publish = [
            "goTo",
            "isDisabled",
            "setDisabled",
            "enable",
            "disable",
            "next",
            "prev",
            "getCurrentPageData",
            "on",
            "one",
            "off"
        ];
        for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
            var method = publish_1[_i];
            this[method] = _Navigator[method].bind(_Navigator);
        }
    }
    NavigatorService.prototype.goTo = function (index) {
        return undefined;
    };
    NavigatorService.prototype.isDisabled = function () {
        return undefined;
    };
    NavigatorService.prototype.setDisabled = function (disabled) {
    };
    NavigatorService.prototype.enable = function () {
    };
    NavigatorService.prototype.disable = function () {
    };
    NavigatorService.prototype.next = function () {
        return undefined;
    };
    NavigatorService.prototype.prev = function () {
        return undefined;
    };
    NavigatorService.prototype.getCurrentPageData = function () {
        return undefined;
    };
    /**
     * @see EventEmitter#on
     */
    NavigatorService.prototype.on = function (events, data, handler) {
        return undefined;
    };
    NavigatorService.prototype.one = function (events, data, handler) {
        return undefined;
    };
    NavigatorService.prototype.off = function (events, handler) {
        return undefined;
    };
    return NavigatorService;
}());
NavigatorService.ON_DRAW_PAGE = Navigator_1.Navigator.ON_DRAW_PAGE;
NavigatorService.ON_DISABLE = Navigator_1.Navigator.ON_DISABLE;
NavigatorService.ON_ENABLE = Navigator_1.Navigator.ON_ENABLE;
NavigatorService.ON_CHANGE_PAGE_END = Navigator_1.Navigator.ON_CHANGE_PAGE_END;
NavigatorService.ON_CHANGE_PAGE_START = Navigator_1.Navigator.ON_CHANGE_PAGE_START;
NavigatorService = __decorate([
    di_1.Service({
        name: "NavigatorService",
        dependencies: [
            Navigator_1.Navigator
        ]
    })
], NavigatorService);
exports.NavigatorService = NavigatorService;
//# sourceMappingURL=NavigatorService.js.map
});
___scope___.file("component.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var ComponentController_1 = require("./component/ComponentController");
exports.ComponentController = ComponentController_1.ComponentController;
var ComponentManager_1 = require("./component/ComponentManager");
exports.ComponentManager = ComponentManager_1.ComponentManager;
var ComponentInitializer_1 = require("./component/ComponentInitializer");
exports.ComponentInitializer = ComponentInitializer_1.ComponentInitializer;
//# sourceMappingURL=component.js.map
});
___scope___.file("component/ComponentController.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var jquery_1 = require("../jquery");
var utils_1 = require("../utils");
var ComponentController = (function () {
    /**
     * Controlador base para los recursos
     * @param {JQueryStatic}            _$
     * @param {EventEmitterFactory}     _EventEmitterFactory
     */
    function ComponentController(_$, _EventEmitterFactory) {
        this._$ = _$;
        this._EventEmitterFactory = _EventEmitterFactory;
        this._destroyed = false;
        this._options = {};
    }
    /**
     * Invocado al obtenerse el factory del DI para establecer las opciones
     * @param {JQuery}  $element        Elemento del componente
     */
    ComponentController.prototype.activate = function ($element) {
        this._$element = $element;
        this._eventEmitter = this._EventEmitterFactory.createEmitter(this._$element);
    };
    /**
     * Indica si se ha invocado al método destroy
     * @returns {boolean}
     */
    ComponentController.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    /**
     * Destruye el componente. Se ha de extender en cada componente con las acciones pertinentes
     */
    ComponentController.prototype.destroy = function () {
        this._destroyed = true;
    };
    ComponentController.prototype.on = function (events, data, handler) {
        this._eventEmitter.on(events, data, handler);
        return this;
    };
    ;
    ComponentController.prototype.one = function (events, data, handler) {
        this._eventEmitter.one(events, data, handler);
        return this;
    };
    ;
    ComponentController.prototype.off = function (events, handler) {
        this._eventEmitter.off(events, handler);
        return this;
    };
    ;
    return ComponentController;
}());
ComponentController = __decorate([
    di_1.Dependencies({
        dependencies: [
            jquery_1.default,
            utils_1.EventEmitterFactory
        ]
    })
], ComponentController);
exports.ComponentController = ComponentController;
//# sourceMappingURL=ComponentController.js.map
});
___scope___.file("component/ComponentManager.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var di_2 = require("../di");
var Errors_1 = require("./Errors");
var utils_1 = require("../utils");
var ComponentManager = (function () {
    function ComponentManager(_Injector, _S) {
        this._Injector = _Injector;
        this._S = _S;
        //store available components
        this._components = new Map();
    }
    /**
     * Añade un componente para poder ser usado en las páginas. El controlador debe extender de ComponentController
     * @param {ComponentController}  component        Controlador del componente. Debe extender de ComponentController y
     * estar registrado en el DI con el tipo Component
     * @see Injector.registerComponent
     */
    ComponentManager.prototype.add = function (component) {
        //component must exists
        if (component) {
            //component must have a name registered by the injector
            var name = component._componentName;
            if (!!name) {
                if (this.nameIsValid(name)) {
                    //check if already exists
                    var current = this._components.get(name);
                    //if exists, should be equal
                    if (current != undefined) {
                        if (current != component) {
                            throw new Errors_1.HaztivityComponentAlreadyRegisteredError(name);
                        }
                    }
                    else {
                        //if not exists, register
                        this._components.set(name, component);
                    }
                }
                else {
                    throw new Errors_1.HaztivityComponentNameInvalidError(name);
                }
            }
            else {
                throw new Errors_1.HaztivityComponentInvalidError();
            }
        }
        else {
            throw new Errors_1.HaztivityComponentInvalidError();
        }
    };
    ComponentManager.prototype.nameIsValid = function (name) {
        return this._S(name).camelize().s === name;
    };
    ComponentManager.prototype.exists = function (name) {
        return this._components.get(name) != undefined;
    };
    /**
     * Añade un conjunto de componentes.
     * @see ComponentManager#add
     * @param {ComponentController[]}    components       Componentes a añadir
     */
    ComponentManager.prototype.addAll = function (components) {
        for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
            var component = components_1[_i];
            this.add(component);
        }
    };
    return ComponentManager;
}());
ComponentManager = __decorate([
    di_1.Core({
        name: "ComponentManager",
        dependencies: [
            di_2.InjectorService,
            utils_1.S
        ]
    })
], ComponentManager);
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map
});
___scope___.file("component/Errors.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var BaseError_1 = require("../base/BaseError");
/**
 * Error al intentar registrar un componente inválido
 */
var HaztivityComponentInvalidError = (function (_super) {
    __extends(HaztivityComponentInvalidError, _super);
    function HaztivityComponentInvalidError() {
        return _super.call(this, "HaztivityComponentInvalidError", "Invalid component") || this;
    }
    return HaztivityComponentInvalidError;
}(BaseError_1.BaseError));
exports.HaztivityComponentInvalidError = HaztivityComponentInvalidError;
/**
 * Error al intentar registrar un componente inválido
 */
var HaztivityComponentAlreadyRegisteredError = (function (_super) {
    __extends(HaztivityComponentAlreadyRegisteredError, _super);
    function HaztivityComponentAlreadyRegisteredError(component) {
        return _super.call(this, "HaztivityComponentInvalidError", "Component '" + component + "' already registered with another controller.") || this;
    }
    return HaztivityComponentAlreadyRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityComponentAlreadyRegisteredError = HaztivityComponentAlreadyRegisteredError;
/**
 * Error al intentar registrar un componente inválido
 */
var HaztivityComponentNameInvalidError = (function (_super) {
    __extends(HaztivityComponentNameInvalidError, _super);
    function HaztivityComponentNameInvalidError(component) {
        //todo LINK
        return _super.call(this, "HaztivityComponentNameInvalidError", "Invalid component name '" + component + "'. Please use camelCase nomenclature.") || this;
    }
    return HaztivityComponentNameInvalidError;
}(BaseError_1.BaseError));
exports.HaztivityComponentNameInvalidError = HaztivityComponentNameInvalidError;
/**
 * Error al intentar inicializar un componente sin indicar el nombre del componente a inicializar
 */
var HaztivityComponentNameRequiredError = (function (_super) {
    __extends(HaztivityComponentNameRequiredError, _super);
    function HaztivityComponentNameRequiredError($element) {
        return _super.call(this, "HaztivityComponentNameRequiredError", "Component name not provider in data-* attribute. " + $element) || this;
    }
    return HaztivityComponentNameRequiredError;
}(BaseError_1.BaseError));
exports.HaztivityComponentNameRequiredError = HaztivityComponentNameRequiredError;
/**
 * Error al intentar inicializar un componente no registrado
 */
var HaztivityComponentNotRegisteredError = (function (_super) {
    __extends(HaztivityComponentNotRegisteredError, _super);
    function HaztivityComponentNotRegisteredError(component) {
        return _super.call(this, "HaztivityComponentNotRegisteredError", "Attempt to initialize " + component + " but is not registered") || this;
    }
    return HaztivityComponentNotRegisteredError;
}(BaseError_1.BaseError));
exports.HaztivityComponentNotRegisteredError = HaztivityComponentNotRegisteredError;
/**
 * Error de controlador invalido
 */
var HaztivityInvalidComponentControllerError = (function (_super) {
    __extends(HaztivityInvalidComponentControllerError, _super);
    function HaztivityInvalidComponentControllerError(component) {
        return _super.call(this, "HaztivityInvalidComponentControllerError", "Invalid controller for " + component + " component") || this;
    }
    return HaztivityInvalidComponentControllerError;
}(BaseError_1.BaseError));
exports.HaztivityInvalidComponentControllerError = HaztivityInvalidComponentControllerError;
//# sourceMappingURL=Errors.js.map
});
___scope___.file("component/ComponentInitializer.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var ComponentManager_1 = require("./ComponentManager");
var utils_1 = require("../utils");
var utils_2 = require("../utils");
var jquery_1 = require("../jquery");
var Errors_1 = require("./Errors");
var ComponentInitializer = (function () {
    /**
     * Inicializador de componentes.
     * @class
     * @param {JQueryStatic}                    _$
     * @param {ComponentManager}                _ComponentManager
     * @param {InjectorService}                 _InjectorService
     * @param {String.JS}                       _S
     * @param {DataOptions}                     _DataOptions
     */
    function ComponentInitializer(_$, _ComponentManager, _InjectorService, _S, _DataOptions) {
        this._$ = _$;
        this._ComponentManager = _ComponentManager;
        this._InjectorService = _InjectorService;
        this._S = _S;
        this._DataOptions = _DataOptions;
        this._prefix = "hz-component";
        this._camelPrefix = this._S(this._prefix).camelize().s;
        this._instanceDataName = this._camelPrefix + "Instance";
    }
    /**
     * Inicializa todos los componentes en un contexto en concreto
     * @param {JQuery}  $context    Contexto en el cual buscar componentes a inicializar
     */
    ComponentInitializer.prototype.initialize = function ($context) {
        var $elements = this._findElementsInContext($context), results = [];
        for (var _i = 0, $elements_1 = $elements; _i < $elements_1.length; _i++) {
            var $element = $elements_1[_i];
            var result = this.initializeOne(jquery_1.$($element));
            if (result != undefined) {
                results.push(result);
            }
        }
        return results;
    };
    /**
     * Inicializa un componente en un elemento en concreto. El elemento ha de tener un componente válido indicado
     * @param {JQuery}  $element            Elemento en el que inicializar el componente
     * @param {*}       [config]            Configuración para la inicialización. Acepta:
     * @param {*}       [config.options]    Opciones para el componente. Si una misma opción se indica a través de config.options y mediante un atributo data- predomina el indicado mediante config.options
     * @param {*}       [config.data]       Datos y configuración para el controlador del componente
     */
    ComponentInitializer.prototype.initializeOne = function ($element, config) {
        if (config === void 0) { config = {}; }
        //get name
        var name = $element.data(this._prefix), result;
        if (!!name) {
            //check if exists
            if (!!this._ComponentManager.exists(name)) {
                //get from DI
                var controllerInstance = $element.data(this._instanceDataName);
                if (controllerInstance == undefined || controllerInstance.isDestroyed()) {
                    controllerInstance = this._InjectorService.get(name);
                    if (controllerInstance) {
                        //check if is already instanciated
                        //extract options
                        var options = this._DataOptions.getDataOptions($element, name);
                        options = this._$.extend({}, options, config.options);
                        //get controller instance
                        controllerInstance.activate($element);
                        $element.data(this._instanceDataName, controllerInstance);
                        //init controller
                        controllerInstance.init(options, config.data);
                    }
                    else {
                    }
                    result = controllerInstance;
                }
                else {
                    throw new Errors_1.HaztivityInvalidComponentControllerError(name);
                }
            }
            else {
                throw new Errors_1.HaztivityComponentNotRegisteredError(name);
            }
        }
        else {
            throw new Errors_1.HaztivityComponentNameRequiredError($element);
        }
        return result;
    };
    /**
     * Obtiene los elementos DOM indicados como componentes
     * @param {JQuery}      $context            Contexto en el cual buscar los componentes
     * @param {number}      [initState=2]       Establece que componentes obtener. Se puede indicar:
     *                                          0   se obtienen los componentes sin inicializar
     *                                          1   se obtienen los componentes inicializados
     *                                          2   se obtienen los componentes sin inicializar e inicializados
     * @returns {JQuery}
     */
    ComponentInitializer.prototype.getComponents = function ($context, initState) {
        if (initState === void 0) { initState = 2; }
        var result = [], $elements = this._findElementsInContext($context);
        switch (initState) {
            case 0:
                for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    var $element = this._$($elements[elementIndex]);
                    if ($element.data(this._instanceDataName) == undefined) {
                        result.push($element);
                    }
                }
                break;
            case 1:
                for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    var $element = this._$($elements[elementIndex]);
                    if ($element.data(this._instanceDataName) != undefined) {
                        result.push($element);
                    }
                }
                break;
            default:
                for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
                    var $element = this._$($elements[elementIndex]);
                    result.push($element);
                }
                break;
        }
        return this._$(result);
    };
    /**
     * Obtiene los controladores de componentes
     * @param {JQuery}      $context            Contexto en el cual buscar.
     * @param {boolean}     [recursive=true]    Indica si buscar recursivamente
     * @returns {Array}
     */
    ComponentInitializer.prototype.getComponentsControllers = function ($context, recursive) {
        if (recursive === void 0) { recursive = true; }
        var result = [], $elements = recursive === true
            ? this._findElementsInContext($context)
            : $context;
        for (var elementIndex = 0, $elementsLength = $elements.length; elementIndex < $elementsLength; elementIndex++) {
            var $element = this._$($elements[elementIndex]), controller = $element.data(this._instanceDataName);
            if (controller != undefined) {
                result.push(controller);
            }
        }
        return result;
    };
    ComponentInitializer.prototype._findElementsInContext = function ($context) {
        var _this = this;
        var $elements, parents = [];
        //check if context is also a component
        if ($context.length === 1) {
            if ($context.is("[" + this._prefix + "],[data-" + this._prefix + "]")) {
                parents = $context.toArray();
            }
        }
        else {
            $context.each(function (index, element) {
                var $element = _this._$(element);
                if ($element.is("[" + _this._prefix + "],[data-" + _this._prefix + "]")) {
                    parents.push($element);
                }
            });
        }
        $elements = parents.concat($context.find("[" + this._prefix + "],[data-" + this._prefix + "]").toArray()); //get elements with the prefix
        return this._$($elements);
    };
    return ComponentInitializer;
}());
ComponentInitializer = __decorate([
    di_1.Core({
        name: "ComponentInitializer",
        dependencies: [
            jquery_1.$,
            ComponentManager_1.ComponentManager,
            di_1.InjectorService,
            utils_1.S,
            utils_2.DataOptions
        ]
    })
], ComponentInitializer);
exports.ComponentInitializer = ComponentInitializer;
//# sourceMappingURL=ComponentInitializer.js.map
});
___scope___.file("sco/ScoFactory.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Sco_1 = require("./Sco");
var di_1 = require("../di");
var ScoFactory = ScoFactory_1 = (function () {
    function ScoFactory() {
    }
    ScoFactory.createSco = function (options) {
        var ScoControllerFactory = di_1.Injector.getInstance(ScoFactory_1).get(Sco_1.ScoController);
        var sco = ScoControllerFactory.instance();
        sco.activate(options);
        return sco;
    };
    ScoFactory.registerSco = function (scoController, options) {
        var ScoControllerFactory = di_1.Injector.getInstance(ScoFactory_1).get(scoController);
        var sco = ScoControllerFactory.instance();
        sco.activate(options);
        return sco;
    };
    return ScoFactory;
}());
ScoFactory = ScoFactory_1 = __decorate([
    di_1.Core({
        name: "ScoFactory",
        dependencies: []
    })
], ScoFactory);
exports.ScoFactory = ScoFactory;
var ScoFactory_1;
//# sourceMappingURL=ScoFactory.js.map
});
___scope___.file("scorm.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var ScormService_1 = require("./scorm/ScormService");
exports.ScormService = ScormService_1.ScormService;
//# sourceMappingURL=scorm.js.map
});
___scope___.file("scorm/ScormService.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var devTools_1 = require("../devTools");
var ScormService = ScormService_1 = (function () {
    function ScormService(Logger) {
        this.Logger = Logger;
        this._version = ScormService_1.VERSIONS.auto;
    }
    ScormService.prototype.setVersion = function (version) {
        var versions = ScormService_1.VERSIONS, keys = Object.keys(versions);
        for (var versionIndex = 0, keysLength = keys.length; versionIndex < keysLength; versionIndex++) {
            var currentKey = keys[versionIndex], currentVersion = versions[currentKey];
            if (currentVersion === version) {
                this._version = version;
                versionIndex = keysLength;
            }
        }
        this._version = this._version || versions.auto;
    };
    ScormService.prototype.getAPIVersion = function () {
        return this._version;
    };
    ScormService.prototype.doLMSInitialize = function () {
        return this.cmiBooleanToJs(this._getAPICall("LMSInitialize", "Initialize")(""));
    };
    ScormService.prototype.doLMSFinish = function () {
        return this.cmiBooleanToJs(this._getAPICall("LMSFinish", "Terminate")(""));
    };
    ScormService.prototype.doLMSGetValue = function (parameter) {
        return this._getAPICall("LMSGetValue", "GetValue")(parameter);
    };
    ScormService.prototype.doLMSSetValue = function (parameter, value) {
        return this.cmiBooleanToJs(this._getAPICall("LMSSetValue", "SetValue")(parameter, value));
    };
    ScormService.prototype.doLMSCommit = function () {
        return this.cmiBooleanToJs(this._getAPICall("LMSCommit", "Commit")(""));
    };
    ScormService.prototype.doLMSGetLastError = function () {
        return this._getAPICall("LMSGetLastError", "GetLastError")();
    };
    ScormService.prototype.doLMSGetErrorString = function (errorCode) {
        return this._getAPICall("LMSGetErrorString", "GetErrorString")(errorCode.toString());
    };
    ScormService.prototype.doLMSGetDiagnostic = function (errorCode) {
        return this._getAPICall("LMSGetDiagnostic", "GetDiagnostic")(errorCode.toString());
    };
    ScormService.prototype.LMSIsInitialized = function () {
        return this._API;
    };
    ScormService.prototype.ErrorHandler = function () {
        return this._getAPICall("LMSGetLastError", "GetLastError")();
    };
    ScormService.prototype.cmiBooleanToJs = function (value) {
        return (value === "1" || value === 1 || value === "true" || value === true);
    };
    ScormService.prototype.getAPIHandle = function () {
        var win = window;
        if (win.parent && win.parent != win) {
            this._findAPI(win.parent);
        }
        if (!this._API && win.top.opener) {
            this._findAPI(win.top.opener);
        }
        else if (!this._API) {
            devTools_1.Logger.warn("ScormService", "Unable to find API adapter");
        }
    };
    ScormService.prototype._findAPI = function (win) {
        var findAttempts = 0, findAttemptLimit = 500;
        for (findAttempts; findAttempts < findAttemptLimit; findAttempts++) {
            if (win.API && (this._version === ScormService_1.VERSIONS.v12 || this._version === ScormService_1.VERSIONS.auto)) {
                this._API = win.API;
                this._version = ScormService_1.VERSIONS.v12;
                findAttempts = findAttemptLimit;
            }
            else if (win.API_1484_11 && (this._version === ScormService_1.VERSIONS.v2004 || this._version === ScormService_1.VERSIONS.auto)) {
                this._API = win.API_1484_11;
                this._version = "2004";
                findAttempts = findAttemptLimit;
            }
            else if (win.parent && win.parent != win) {
                findAttempts++;
                win = win.parent;
            }
        }
    };
    ScormService.prototype._getAPICall = function (funcname12, funcname2004) {
        var _this = this;
        if (!this._API) {
            this.getAPIHandle();
            if (!this._API) {
                return (function () {
                    devTools_1.Logger.error("ScormService", "No API found, unable to execute " + (_this.getAPIVersion() === ScormService_1.VERSIONS.v2004
                        ? funcname2004
                        : funcname12));
                });
            }
        }
        switch (this._version) {
            case ScormService_1.VERSIONS.v2004:
                return function () {
                    return _this._API[funcname2004].apply(_this._API, arguments);
                };
            default:
                return function () {
                    return _this._API[funcname12].apply(_this._API, arguments);
                };
        }
    };
    ;
    return ScormService;
}());
ScormService.VERSIONS = {
    auto: "Auto",
    v12: "1.2",
    v2004: "2004"
};
ScormService = ScormService_1 = __decorate([
    di_1.Service({
        name: "ScormService",
        dependencies: [
            devTools_1.Logger
        ]
    })
], ScormService);
exports.ScormService = ScormService;
var ScormService_1;
//# sourceMappingURL=ScormService.js.map
});
___scope___.file("global.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Haztivity_1 = require("./global/Haztivity");
var di_1 = require("./di");
exports.haztivity = di_1.Injector.getInstance(Haztivity_1.Haztivity).get("Haztivity");
//# sourceMappingURL=global.js.map
});
___scope___.file("global/Haztivity.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var Logger_1 = require("../devTools/Logger");
var DevTools_1 = require("../devTools/DevTools");
var di_1 = require("../di");
var Haztivity = Haztivity_1 = (function () {
    /**
     * @class Haztivity
     * @description Global object
     * @param _logger
     * @param _devTools
     */
    function Haztivity(_logger) {
        this._logger = _logger;
    }
    /**
     * Enables development mode
     * @see DevTools#enable
     */
    Haztivity.prototype.enableDev = function () {
        var devTools = di_1.Injector.getInstance(Haztivity_1).get(DevTools_1.DevTools);
        devTools.enable();
        return devTools;
    };
    return Haztivity;
}());
Haztivity = Haztivity_1 = __decorate([
    di_1.Core({
        name: "Haztivity",
        dependencies: [
            Logger_1.Logger
        ]
    })
], Haztivity);
exports.Haztivity = Haztivity;
var Haztivity_1;
//# sourceMappingURL=Haztivity.js.map
});
___scope___.file("devTools/DevTools.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var di_1 = require("../di");
var Logger_1 = require("./Logger");
var navigator_1 = require("../navigator");
var EventEmitterFactory_1 = require("../utils/EventEmitterFactory");
var DevTools = (function () {
    /**
     * Tools for development
     */
    function DevTools(_logger, _navigator, _eventEmitterFactory) {
        this._logger = _logger;
        this._navigator = _navigator;
        this._eventEmitterFactory = _eventEmitterFactory;
        this._isEnabled = false;
    }
    /**
     * Enables development mode.
     */
    DevTools.prototype.enable = function () {
        if (!this.isEnabled()) {
            this._isEnabled = true;
            this._navigator.enableDev();
            this._currentLoggerLevel = this._logger.getLevel();
            this._logger.setLevel(this._logger.levels.TRACE);
            this._logger.warn("DevTools", "Development mode enabled. Log level set to TRACE");
        }
    };
    /**
     * Disables development mode
     */
    DevTools.prototype.disable = function () {
        if (this.isEnabled()) {
            this._isEnabled = false;
            this._navigator.disableDev();
            this._logger.setLevel(this._currentLoggerLevel);
            this._currentLoggerLevel = null;
            this._logger.warn("DevTools", "Development mode disabled. Log level restored");
        }
    };
    /**
     * Return if the development mode is enabled
     * @returns {boolean}
     */
    DevTools.prototype.isEnabled = function () {
        return this._isEnabled;
    };
    /**
     * Force to go to a specific page
     * @param index
     */
    DevTools.prototype.goToPage = function (index) {
        if (this.isEnabled()) {
            this._navigator.goTo(index);
        }
    };
    /**
     * Get the name of the current page
     * @returns {string}
     */
    DevTools.prototype.getCurrentPageName = function () {
        if (this.isEnabled()) {
            return this._navigator.getCurrentPage().getPageName();
        }
    };
    /**
     * Create an event emitter
     */
    DevTools.prototype.createEventEmitter = function () {
        if (this.isEnabled()) {
            return this._eventEmitterFactory.create();
        }
    };
    return DevTools;
}());
DevTools = __decorate([
    di_1.Module({
        name: "DevTools",
        dependencies: [
            Logger_1.Logger,
            navigator_1.Navigator,
            EventEmitterFactory_1.EventEmitterFactory
        ]
    })
], DevTools);
exports.DevTools = DevTools;
//# sourceMappingURL=DevTools.js.map
});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("jquery", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

module.exports = $
});
return ___scope___.entry = "index.js";
});
FuseBox.expose([{"alias":{"haztivity":"haztivity"},"pkg":"@haztivity/core/index.js"}]);
FuseBox.main("@haztivity/core/index.js");
FuseBox.defaultPackageName = "@haztivity/core";
})
(FuseBox)
//# sourceMappingURL=haztivity-core.js.map