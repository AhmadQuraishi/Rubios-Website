import { useSelector } from "react-redux";
import { State } from "../../redux";

const Header = () => {
  const cart = useSelector((state: State) => state.cart);
  return (
    <header>
      <div style={{ display: "block", padding: "20px" }}>
        <img
          style={{ display: "inlineBlock", width: 200 + "px" }}
          src="https://www.rubios.com/sites/all/themes/rubios/images/global/logo-rubios_coastal.png"
          alt="Rubios Castal Grills"
        />
        {cart.cartItems.length > 0 && (
          <div style={{ fontWeight: 600 }}>
            Cart Items: {cart.cartItems.length} - Total: $
            {parseFloat(
              cart.cartItems.reduce(
                (total: any, item: any) => total + item.price,
                0
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
