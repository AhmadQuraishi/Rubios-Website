export function getUtensilsProductId(menu: any) {
  let utensilsChainProductId: any =
    process.env.REACT_APP_UTENSILS_CHAIN_PRODUCT_ID;

  let utensilsProductId = null;

  if (
    utensilsChainProductId &&
    utensilsChainProductId !== '' &&
    menu &&
    menu.categories &&
    menu.categories.length
  ) {
    menu.categories.forEach((cat: any) => {
      if (cat.products && cat.products.length) {
        const filterProduct = cat.products.filter(
          (prod: any) => prod.chainproductid === utensilsChainProductId,
        );
        console.log('filterProduct', filterProduct)
        if (filterProduct && filterProduct.length) {
          utensilsProductId = filterProduct[0].productId;
        }
      }
    });
  }
  return utensilsProductId;
}
