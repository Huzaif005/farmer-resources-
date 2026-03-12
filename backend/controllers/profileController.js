import { getProfileByEmail, updateProfile } from "../models/profileModel.js";

// Fetch farmer profile
export const getProfile = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    const profile = await getProfileByEmail(email);
    if (!profile) {
      // It's possible the farmer hasn't submitted their extended info set to SQLite yet.
      return res.json({});
    }
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Insert or update a farmer profile
export const saveProfile = async (req, res) => {
  try {
    const { full_name, email, phone, farm_name, address, land_area, crop_type } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    await updateProfile({
      full_name: full_name || "",
      email: email,
      phone: phone || "",
      farm_name: farm_name || "",
      address: address || "",
      land_area: land_area || 0,
      crop_type: crop_type || ""
    });
    
    res.json({ success: true, message: "Profile saved successfully to Database!" });
  } catch (error) {
    console.error("Error saving profile", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
