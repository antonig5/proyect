import { createStore, combineReducers, compose } from "redux";
import reduxLocal from "redux-localstorage";
// Reductor para el estado de 'usuario'
function user(state = {}, action) {
  switch (action.type) {
    case "SET_USER": // Establece el estado de usuario al payload de la acción
      return action.user;
    case "CLEAR_USER": // Limpia el estado de usuario
      return {};

    default:
      return state;
  }
}

// Combina todos los reductores en un único reductor raíz
let rootReducer = combineReducers({
  user: user,
});
// Utiliza el mejorador redux-localstorage para persistir el estado en el almacenamiento local
let mainEnhacer = compose(reduxLocal());
// Crea la tienda con el reductor raíz y el mejorador
export default createStore(rootReducer, {}, mainEnhacer);
