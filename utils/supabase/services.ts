import { supabase } from "./init";

export async function getAllProduct() {
   const { data, error } = await supabase.rpc("get_allproducts");
   if (error) {
      throw new Error(error.message);
   }
   return data;
}

export async function getProduct(productID: string) {
   const { data, error } = await supabase.rpc("get_product", {
      o_productid: productID,
   });
   if (error) {
      throw new Error(error.message);
   }
   return data;
}

export async function updateProduct(productID: string, price: number, availability: boolean) {
   console.log("Updating product:", productID, price, availability);
   const { error } = await supabase.rpc("update_product", {
      o_productid: productID,
      o_price: price,
      o_availability: availability,
   });
   if (error) {
      throw new Error(error.message);
   }
}
