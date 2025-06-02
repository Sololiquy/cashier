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
