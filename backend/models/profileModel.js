import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../../database/farmer.db");
const schemaPath = path.resolve(__dirname, "../../database/schema.sql");

// Initialize Database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    // Run schema
    try {
      const schemaSql = fs.readFileSync(schemaPath, "utf8");
      db.exec(schemaSql, (err) => {
          if (err) {
              console.error("Error creating tables: " + err.message);
          } else {
              console.log("Database initialized successfully!");
          }
      });
    } catch (e) {
      console.error("Could not read schema file", e);
    }
  }
});

// Model to get profile by email
export const getProfileByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM farmers WHERE email = ?`, [email], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

// Model to upsert profile
export const updateProfile = (profile) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM farmers WHERE email = ?`, [profile.email], (err, row) => {
      if (err) return reject(err);
      
      if (row) {
        // Update user
        const sql = `UPDATE farmers SET 
            full_name = ?, phone = ?, farm_name = ?, address = ?, land_area = ?, crop_type = ?
            WHERE email = ?`;
        db.run(sql, [
          profile.full_name, profile.phone, profile.farm_name, profile.address, profile.land_area, profile.crop_type, profile.email
        ], function(err) {
          if (err) return reject(err);
          resolve({ updated: true, changes: this.changes });
        });
      } else {
        // Insert new user
        const sql = `INSERT INTO farmers (full_name, email, phone, farm_name, address, land_area, crop_type)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [
          profile.full_name, profile.email, profile.phone, profile.farm_name, profile.address, profile.land_area, profile.crop_type
        ], function(err) {
          if (err) return reject(err);
          resolve({ inserted: true, id: this.lastID });
        });
      }
    });
  });
};
