// aquí hago uso de las expresiones regulares para dividir el objeto, y he decidido también comprobar
// si la fecha entrante es correcta, y no devuelvo nada en caso de que la fecha no sea válida.
// He procurado ser lo más defensivo posible, y hacer uso del objeto Date para la comprobación
// sobre si la fecha es correcta, lo cual me parece más elegante que simplemente comprobar si el mes
// y el día son correctos a mano.

function formatDate(userDate) {
  // format from M/D/YYYY to YYYYMMDD
  var pattern = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
  if (pattern.test(userDate)) {
	var match = pattern.exec(userDate);
	console.log(match);
	if (match.length === 4) {
		var dt = new Date(parseInt(match[3], 10), parseInt(match[1], 10) - 1, parseInt(match[2], 10));
		if (dt instanceof Date 
			&& !isNaN(dt)
			&& (dt.getMonth() + 1).toString() === match[1]
			&& dt.getDate().toString() === match[2]
		) {
			return `${dt.getFullYear()}${('00' + (dt.getMonth() + 1)).slice(-2)}${('00' + dt.getDate()).slice(-2)}`;
		}
	}
  }
}
