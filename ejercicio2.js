// Este ejercicio me ha resultado sencillo, es posible que fuese mejor hacer un chequeo
// sobre las variables defensivamente, pero a entradas correctas resuelve el problema
// correctamente
function removeProperty(obj, prop) {
  if (obj.hasOwnProperty(prop)) {
	delete obj[prop];
	return true;
  }
  return false;
}
