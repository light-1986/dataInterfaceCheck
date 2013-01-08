exports.each = function (source, iterator) {
    var returnValue, key, item;
    if ('function' == typeof iterator) {
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                item = source[key];
                returnValue = iterator.call(source, key, item );
         
                if (returnValue === false) {
                    break;
                }
            }
        }
    }
    return source;
};
exports.isArray = function(v){
	return typeof v == "object" && Object.prototype.toString.call(v) == "[object Array]";
};
exports.isPlainObject = function( obj ) {
	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well

	var core_hasOwn = Object.prototype.hasOwnProperty;
	
	if ( !obj || typeof obj !== "object" ) {
		return false;
	}

	try {
		// Not own constructor property must be Object
		if ( obj.constructor &&
			!core_hasOwn.call(obj, "constructor") &&
			!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
	} catch ( e ) {
		// IE8,9 Will throw exceptions on certain host objects #9897
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.

	var key;
	for ( key in obj ) {}

	return key === undefined || core_hasOwn.call( obj, key );
};

exports.inArray = function( elem, arr, i ) {
	var len, core_indexOf = Array.prototype.indexOf;

	if ( arr ) {
		if ( core_indexOf ) {
			return core_indexOf.call( arr, elem, i );
		}

		len = arr.length;
		i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

		for ( ; i < len; i++ ) {
			// Skip accessing in sparse arrays
			if ( i in arr && arr[ i ] === elem ) {
				return i;
			}
		}
	}

	return -1;
}