import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { AuthContext } from "./authContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = (product, quantity, color, size, discount, price) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!user && !token) {
        message.warning("Please log in to add products to your cart");
        navigate("/login", { state: { from: location.pathname } });
        return false;
      }

      if (!product || !product._id) {
        message.error("Product does not exist");
        return false;
      }

      const existingProduct = cart.find((item) => item._id === product._id);

      if (existingProduct) {
        const updatedCart = cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
        setCart(updatedCart);
        message.success(`${product.name || "Product"} quantity updated in cart`);
        return true;
      } else {
        const newItem = {
          _id: product._id,
          name: product.name,
          title: product.name,
          slug: product.slug,
          category: product.category?.name,
          thumbnail: product.thumbnail || product.images?.[0],
          images: product.images,
          quantity,
          color,
          size,
          discount,
          price,
        };

        setCart([...cart, newItem]);
        message.success(`${product.name || "Product"} added to cart`);
        return true;
      }
    } catch (error) {
      message.error("Failed to add product to cart");
      console.error(error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);
      message.success("Product removed from cart");
    } catch (error) {
      message.error("Failed to remove product from cart");
      console.error(error);
    }
  };

  const clearCart = async (showNotification = true) => {
    try {
      setCart([]);
      localStorage.removeItem("cart");
      if (showNotification) {
        message.success("Cart cleared successfully");
      }
    } catch (error) {
      message.error("Failed to clear cart");
      console.error(error);
    }
  };
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      const updatedCart = cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item,
      );
      setCart(updatedCart);
      message.success("Quantity updated successfully");
    } catch (error) {
      message.error("Failed to update quantity");
      console.error(error);
    }
  };

  const itemCount = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0,
  );
  const subTotal = cart.reduce((total, item) => {
    const discountedPrice = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return Number((total + discountedPrice * item.quantity).toFixed(2));
  }, 0);
  const totalDiscount = cart.reduce((total, item) => {
    const discount = Number(item.discount) || 0;
    const discountAmount = item.price * (discount / 100);

    return total + discountAmount * item.quantity;
  }, 0);

  const total = subTotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        itemCount,
        subTotal,
        totalDiscount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
