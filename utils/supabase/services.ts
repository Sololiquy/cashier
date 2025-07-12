import { supabase } from "./init";

export async function getAllProduct() {
   const { data, error } = await supabase.rpc("getall_products");
   if (error) {
      throw new Error(error.message);
   }
   return data;
}

export async function getAllReceipt() {
   const { data, error } = await supabase.rpc("getall_receipt");
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
   const { error } = await supabase.rpc("update_product", {
      o_productid: productID,
      o_price: price,
      o_availability: availability,
   });
   if (error) {
      throw new Error(error.message);
   }
}

export async function addCheckout(checkout: any[], total: number) {
   const { error } = await supabase.rpc("add_checkout", {
      o_receipt_data: checkout,
      o_total: total,
   });
   if (error) {
      throw new Error(error.message);
   }
}

export async function paymentManual(checkout_date: string, payTotal: number) {
   const { error } = await supabase.rpc("payment_manual", {
      o_checkout_date: checkout_date,
      o_paytotal: payTotal,
   });
   if (error) {
      throw new Error(error.message);
   }

   return { success: true };
}
