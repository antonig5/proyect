// Esta es una función de creador de acción para una aplicación Redux.
export const setUser = (user) => {
  // La función toma un objeto de usuario como argumento y devuelve un objeto de acción
  // con un tipo de "SET_USER" y el objeto de usuario como la carga útil.
  return {
    type: "SET_USER",
    user: user,
  };
};
