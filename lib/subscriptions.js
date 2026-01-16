"use client";

import { supabase } from "./supabase";

// Create a new subscription
export async function createSubscription(email) {
  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return { success: false, message: "Email already subscribed" };
    }

    const { data, error } = await supabase
      .from("subscriptions")
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      // If it's a unique constraint error, email already exists
      if (error.code === "23505") {
        return { success: false, message: "Email already subscribed" };
      }
      console.error("Error creating subscription:", error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}

// Get all subscriptions
export async function getSubscriptions() {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
}

// Delete a subscription
export async function deleteSubscription(subscriptionId) {
  try {
    const { error } = await supabase
      .from("subscriptions")
      .delete()
      .eq("id", subscriptionId);

    if (error) {
      console.error("Error deleting subscription:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deleting subscription:", error);
    throw error;
  }
}
