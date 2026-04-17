export const FALLBACK_IMAGE = "https://placehold.co/600x400?text=no+image";

export const calculateCartTotals = (cart, shippingPercentage = 0.10) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = subtotal * shippingPercentage;
  const total = subtotal + shippingCost;

  return { subtotal, shippingCost, total };
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')     // Reemplaza espacios por guiones
    .replace(/[^\w-]+/g, '')  // Elimina caracteres no permitidos
    .replace(/--+/g, '_');    // Evita guiones dobles
};

