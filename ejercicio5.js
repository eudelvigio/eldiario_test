// Aunque probablemente usando quicksort y strings para la generación del número el código es más claro,
// he preferido realizar una implementación más eficiente, aprovechando los objetos de javascript, los cuales
// tienen ordenadas sus keys. Simplemente descompongo el número recibido dividiéndolo por 10 y obteniendo el resto,
// con lo cual saco el número de ocurrencias de cada dígito y las almaceno en un objeto, para posteriormente
// recorrerlo e ir generando el número a devolver. De esta manera no se pierde rendimiento por casteo ni por ordenación

function orderNumbers(number) {
	var orderedNumbersObj = {};
	while (number > 0) {
		var digit = number % 10;
		if (!orderedNumbersObj[digit]) {
			orderedNumbersObj[digit] = 0;
		}
		orderedNumbersObj[digit]++;
		number = Math.floor(number / 10);
	}
	
	console.log(orderedNumbersObj);
	var allDigits = Object.keys(orderedNumbersObj);
	var returnNumber = 0;
	var acc = 0;
	for (var i = 0; i < allDigits.length; i++) {
		for (j= 0; j < orderedNumbersObj[allDigits[i]]; j++) {
			returnNumber += allDigits[i] * (10 ** acc);
			acc++;
		}
	}
	
	return returnNumber;
}