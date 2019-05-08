// En este ejercicio devuelvo en función del path recibido o bien una función que acepta el path, o bien el resultado
// de dicha función. Se realiza una copia del objeto, para lo que he usado distintos approaches, de manera que los accesos al objeto no modifiquen en manera alguna las propiedades del objeto original,
// ya que uso un método destructivo para facilitar la implementación. Para recorrer el objeto simplemente uso un forEach, 
// y si no existe la propiedad, seteo el objetoa null, de manera que luego se sepa si devolver ese objeto,
// o bien el defaultvalue.

// Como approaches que he seguido para la copia profunda, los siguientes comentarios:
// JSON.parse(JSON.stringify(obj)) tiene problemas con estructuras circulares en el json, y no es capaz de copiar fechas ni funciones
// Object.assign({}, obj) tiene problemas con subobjetos
// {...obj} tiene problemas con funciones y subobjetos
// El método implementado deepCopy copia todos los subobjetos correctamente, necesita soporte ES6, y lo he encontrado en https://stackoverflow.com/questions/40291987/javascript-deep-clone-object-with-circular-references

function accesor(obj, def, path) {
	// var recObj = JSON.parse(JSON.stringify(obj)); Método con problemas para JSON circulares
	// var recObj = Object.assign({}, obj); Método con problemas para subobjetos
	// var recObj = {...obj}; Método con problemas para funciones
	var recObj = deepClone(obj);
	function safeAccesor(path) {
		var splittedPath = path.split('.');
		splittedPath.forEach((segment) => {
			if (recObj.hasOwnProperty(segment)) {
				recObj = recObj[segment];
			} else {
				recObj = null;
				return;
			}
		});
		return recObj || def;
	}
	if (path) {
		return safeAccesor(path);
	} else {
		return safeAccesor;
	}
}

// Obtenido de https://stackoverflow.com/questions/40291987/javascript-deep-clone-object-with-circular-references
function deepClone(obj, hash = new WeakMap()) {
    // Do not try to clone primitives or functions
    if (Object(obj) !== obj || obj instanceof Function) return obj;
    if (hash.has(obj)) return hash.get(obj); // Cyclic reference
    try { // Try to run constructor (without arguments, as we don't know them)
        var result = new obj.constructor();
    } catch(e) { // Constructor failed, create object without running the constructor
        result = Object.create(Object.getPrototypeOf(obj));
    }
    // Optional: support for some standard constructors (extend as desired)
    if (obj instanceof Map)
        Array.from(obj, ([key, val]) => result.set(deepClone(key, hash), 
                                                   deepClone(val, hash)) );
    else if (obj instanceof Set)
        Array.from(obj, (key) => result.add(deepClone(key, hash)) );
    // Register in hash    
    hash.set(obj, result);
    // Clone and assign enumerable own properties recursively
    return Object.assign(result, ...Object.keys(obj).map (
        key => ({ [key]: deepClone(obj[key], hash) }) ));
}
