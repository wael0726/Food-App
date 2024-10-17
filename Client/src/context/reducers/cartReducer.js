const cartReducer = (state = [], action) => { // Etat initial par défaut vide
  switch (action.type) {
    case "GET_CART_ITEMS":
      return state;

    case "SET_CART_ITEMS":
      return action.items || []; // Si aucun item, retourner un tableau vide

    case "CLEAR_CART_ITEMS":
      return [];

    default:
      return state;
  }
};

export default cartReducer;
