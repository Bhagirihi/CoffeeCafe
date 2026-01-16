"use client";

import { supabase } from "./supabase";

// Create a new booking
export async function createBooking(bookingData) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          date: bookingData.date,
          time: bookingData.time,
          guests: parseInt(bookingData.guests) || 1,
          special_requests: bookingData.message || null,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating booking:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

// Get all bookings
export async function getBookings() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

// Update booking status
export async function updateBookingStatus(bookingId, status) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId)
      .select()
      .single();

    if (error) {
      console.error("Error updating booking:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

// Delete a booking
export async function deleteBooking(bookingId) {
  try {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);

    if (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}
