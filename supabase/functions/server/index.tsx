import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors());
app.use("*", logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Health check
app.get("/make-server-57ac035d/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// CROPS ENDPOINTS
app.get("/make-server-57ac035d/crops", async (c) => {
  try {
    const crops = await kv.getByPrefix("crop:");
    return c.json({ success: true, data: crops });
  } catch (error) {
    console.log("Error fetching crops:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-57ac035d/crops", async (c) => {
  try {
    const cropData = await c.req.json();
    const id = crypto.randomUUID();
    const crop = { ...cropData, id, createdAt: new Date().toISOString() };
    await kv.set(`crop:${id}`, crop);
    return c.json({ success: true, data: crop });
  } catch (error) {
    console.log("Error creating crop:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-57ac035d/crops/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const cropData = await c.req.json();
    const updated = { ...cropData, id, updatedAt: new Date().toISOString() };
    await kv.set(`crop:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating crop:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-57ac035d/crops/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`crop:${id}`);
    return c.json({ success: true, data: null });
  } catch (error) {
    console.log("Error deleting crop:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// RESOURCES ENDPOINTS
app.get("/make-server-57ac035d/resources", async (c) => {
  try {
    const resources = await kv.getByPrefix("resource:");
    return c.json({ success: true, data: resources });
  } catch (error) {
    console.log("Error fetching resources:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-57ac035d/resources", async (c) => {
  try {
    const resourceData = await c.req.json();
    const id = crypto.randomUUID();
    const resource = { ...resourceData, id, createdAt: new Date().toISOString() };
    await kv.set(`resource:${id}`, resource);
    return c.json({ success: true, data: resource });
  } catch (error) {
    console.log("Error creating resource:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-57ac035d/resources/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const resourceData = await c.req.json();
    const updated = { ...resourceData, id, updatedAt: new Date().toISOString() };
    await kv.set(`resource:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating resource:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-57ac035d/resources/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`resource:${id}`);
    return c.json({ success: true, data: null });
  } catch (error) {
    console.log("Error deleting resource:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// WORKERS ENDPOINTS
app.get("/make-server-57ac035d/workers", async (c) => {
  try {
    const workers = await kv.getByPrefix("worker:");
    return c.json({ success: true, data: workers });
  } catch (error) {
    console.log("Error fetching workers:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-57ac035d/workers", async (c) => {
  try {
    const workerData = await c.req.json();
    const id = crypto.randomUUID();
    const worker = { ...workerData, id, createdAt: new Date().toISOString() };
    await kv.set(`worker:${id}`, worker);
    return c.json({ success: true, data: worker });
  } catch (error) {
    console.log("Error creating worker:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-57ac035d/workers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const workerData = await c.req.json();
    const updated = { ...workerData, id, updatedAt: new Date().toISOString() };
    await kv.set(`worker:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating worker:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-57ac035d/workers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`worker:${id}`);
    return c.json({ success: true, data: null });
  } catch (error) {
    console.log("Error deleting worker:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// EXPENSES ENDPOINTS
app.get("/make-server-57ac035d/expenses", async (c) => {
  try {
    const expenses = await kv.getByPrefix("expense:");
    return c.json({ success: true, data: expenses });
  } catch (error) {
    console.log("Error fetching expenses:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-57ac035d/expenses", async (c) => {
  try {
    const expenseData = await c.req.json();
    const id = crypto.randomUUID();
    const expense = { ...expenseData, id, createdAt: new Date().toISOString() };
    await kv.set(`expense:${id}`, expense);
    return c.json({ success: true, data: expense });
  } catch (error) {
    console.log("Error creating expense:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-57ac035d/expenses/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const expenseData = await c.req.json();
    const updated = { ...expenseData, id, updatedAt: new Date().toISOString() };
    await kv.set(`expense:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating expense:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-57ac035d/expenses/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`expense:${id}`);
    return c.json({ success: true, data: null });
  } catch (error) {
    console.log("Error deleting expense:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
