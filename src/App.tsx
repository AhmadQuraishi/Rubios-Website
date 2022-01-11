import "./App.css";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header/header";

function App(props: any) {
  const dispatch = useDispatch();

  const { SetCartItem } = bindActionCreators(actionCreators, dispatch);

  const cart = useSelector((state: State) => state.cart);

  return (
    <div id="wapper">
      <Header />
      <section>
        <div className="product-container">
          <div>
            <button
              type="submit"
              className="buttonicon"
              onClick={() =>
                onClickData(cart, SetCartItem, {
                  id: 1,
                  name: "Avocado Corn Taco Salad with Grilled Shrimp",
                  image:
                    "https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/CaliBowl_671x537.jpg?itok=RJaZDwWb",
                  price: 60.0,
                })
              }
            >
              Add To Cart
            </button>
            <img
              src="https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/AvocadoCorn_671x537%20%283%29.jpg?itok=CcVZ4Xlu"
              alt=""
            />
            <h3>Avocado Corn Taco Salad with Grilled Shrimp</h3>
          </div>
          <div>
            <button
              type="submit"
              className="buttonicon"
              onClick={() =>
                onClickData(cart, SetCartItem, {
                  id: 2,
                  name: "Avocado Corn Taco Salad with Grilled Shrimp",
                  image:
                    "https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/CaliBowl_671x537.jpg?itok=RJaZDwWb",
                  price: 120.0,
                })
              }
            >
              Add To Cart
            </button>
            <img
              src="https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/CaliBowl_671x537.jpg?itok=RJaZDwWb"
              alt=""
            />
            <h3>Avocado Corn Taco Salad with Grilled Shrimp</h3>
          </div>
          <div>
            <button
              type="submit"
              className="buttonicon"
              onClick={() =>
                onClickData(cart, SetCartItem, {
                  id: 3,
                  name: "Chopped Salad with Grilled Chicken",
                  image:
                    "https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/Mahi_671x537.jpg?itok=nJGY9X1o",
                  price: 50.0,
                })
              }
            >
              Add To Cart
            </button>
            <img
              src="https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/Mahi_671x537.jpg?itok=nJGY9X1o"
              alt=""
            />
            <h3>Chopped Salad with Grilled Chicken</h3>
          </div>
          <div>
            <button
              type="submit"
              onClick={() =>
                onClickData(cart, SetCartItem, {
                  id: 4,
                  name: "Chopped Salad with Grilled Chicken",
                  image:
                    "https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/Chopped_671x537.jpg?itok=Ic0iOm4K",
                  price: 100.0,
                })
              }
              className="buttonicon"
            >
              Add To Cart
            </button>
            <img
              src="https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/Chopped_671x537.jpg?itok=Ic0iOm4K"
              alt=""
            />
            <h3>California Bowl with Cauliflower Rice and Grilled Chicken</h3>
          </div>
        </div>
      </section>
      <footer></footer>
    </div>
  );
}
const onClickData = (cart: any, SetCartItem: any, data: any) => {
  var Data = [...cart.cartItems];
  Data.push(data);
  SetCartItem(Data);
};
export default App;
