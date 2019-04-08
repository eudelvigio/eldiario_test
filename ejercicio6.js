// En este ejercicio devuelvo en función del path recibido o bien una función que acepta el path, o bien el resultado
// de dicha función. Se realiza una copia del objeto, con el método puede que un poco guarro de convertir con JSON.parse
// y JSON.stringify, de manera que los accesos al objeto no modifiquen en manera alguna las propiedades del objeto original,
// ya que uso un método destructivo para facilitar la implementación. Para recorrer el objeto simplemente uso un forEach, 
// y si no existe la propiedad, seteo el objetoa null, de manera que luego se sepa si devolver ese objeto,
// o bien el defaultvalue.

function accesor(obj, def, path) {
	var recObj = JSON.parse(JSON.stringify(obj));
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
