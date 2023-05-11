import axios from "axios";
import { Product } from "../../types/olo-api";

export const getMenuItem = (id: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || "";
    return axios
      .get(url + `/restaurants/${id}/menu?includedisabled=false`)
      .then((response) => {
        const data = response.data
        for (const category of data.categories) {
          category.products = category.products.map((product: Product) => {
            product.categoryInfo = {
              id: category.id,
              name: category.name
            };
            return product;
          })
        }
        return data;
      })
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
