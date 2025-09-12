import React, { useMemo, useState, useEffect } from "react";
import { Plus, Utensils, Pencil, Trash2, Check, X, IndianRupee, Sun, Sandwich, Moon, Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import './MessOwnerDashboard.css';

const MEALS = [
  { key: "breakfast", label: "Breakfast", icon: Sun },
  { key: "lunch", label: "Lunch", icon: Sandwich },
  { key: "dinner", label: "Dinner", icon: Moon },
];

const defaultDish = () => ({
  id: crypto.randomUUID(),
  name: "",
  price: "",
  veg: true,
  available: true,
  description: "",
  image: "",
});

const currency = (v) => {
  if (v === "" || v === null || v === undefined) return "₹0";
  const n = Number(v);
  return `₹${isNaN(n) ? v : n.toFixed(2)}`;
};

const LS_KEY = "tastemate.mess.menu";
const LocalStore = {
  load(messId) {
    const raw = localStorage.getItem(`${LS_KEY}.${messId}`);
    if (!raw) return { breakfast: [], lunch: [], dinner: [] };
    try { return JSON.parse(raw); } catch { return { breakfast: [], lunch: [], dinner: [] }; }
  },
  save(messId, data) {
    localStorage.setItem(`${LS_KEY}.${messId}`, JSON.stringify(data));
  },
};

export default function MessOwnerDashboard({ messId = "demo-mess", messName = "TasteMate Mess", ownerProfile = { messName: "Demo Mess", location: "", email: "" } }) {
  const [meal, setMeal] = useState("breakfast");
  const [store, setStore] = useState(() => LocalStore.load(messId));
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultDish());

  useEffect(() => {
    LocalStore.save(messId, store);
  }, [messId, store]);

  const dishes = store[meal] || [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dishes;
    return dishes.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      String(d.price).includes(q)
    );
  }, [query, dishes]);

  const startCreate = () => {
    setEditingId(null);
    setForm(defaultDish());
  };

  const startEdit = (dish) => {
    setEditingId(dish.id);
    setForm({ ...dish });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultDish());
  };

  const upsertDish = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setStore(prev => {
      const next = { ...prev };
      const list = [...(next[meal] || [])];
      const idx = list.findIndex(d => d.id === form.id);
      if (idx >= 0) list[idx] = { ...form };
      else list.unshift({ ...form });
      next[meal] = list;
      return next;
    });
    cancelEdit();
  };

  const removeDish = (id) => {
    setStore(prev => {
      const next = { ...prev };
      next[meal] = (next[meal] || []).filter(d => d.id !== id);
      return next;
    });
    if (editingId === id) cancelEdit();
  };

  const toggleAvailability = (id) => {
    setStore(prev => {
      const next = { ...prev };
      next[meal] = (next[meal] || []).map(d => d.id === id ? { ...d, available: !d.available } : d);
      return next;
    });
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleOrder = (dish) => {
    alert(`Order placed for ${dish.name} at ${currency(dish.price)}. Payment integration coming soon!`);
  };

  return (
    <div className="mess-dashboard">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <Utensils className="icon-main" />
            <div>
              <h1 className="title">{ownerProfile.messName || messName}</h1>
              <p className="subtitle">Owner Dashboard · Manage menus and availability</p>
            </div>
          </div>
          <div className="header-profile">
            <User className="icon-user" />
            <div>
              <div className="profile-name">{ownerProfile.messName}</div>
              <div className="profile-info">{ownerProfile.email}</div>
              <div className="profile-info">{ownerProfile.location}</div>
            </div>
          </div>
        </div>

        {/* Meal Tabs */}
        <div className="meal-tabs">
          {MEALS.map(m => {
            const Icon = m.icon;
            const active = meal === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setMeal(m.key)}
                className={`tab-button ${active ? "tab-button-active" : ""}`}
              >
                <Icon className="tab-icon" />
                <span className="tab-label">{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-container">
            <Search className="search-icon" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search dishes..." className="search-input" />
          </div>
          <button onClick={startCreate} className="add-dish-button"><Plus className="add-dish-icon" /> Add Dish</button>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {form && (editingId === null || editingId) && (
            <motion.form
              key={editingId ? "edit" : "create"}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={upsertDish}
              className="form-card"
            >
              <div className="form-field form-field-name">
                <label className="form-label">Dish Name</label>
                <input className="form-input" value={form.name} onChange={(e)=>setForm(f=>({...f, name:e.target.value}))} required />
              </div>
              <div className="form-field form-field-price">
                <label className="form-label">Price</label>
                <input type="number" min="0" className="form-input" value={form.price} onChange={(e)=>setForm(f=>({...f, price:e.target.value}))} required />
              </div>
              <div className="form-field form-field-type">
                <label className="form-label">Type</label>
                <select className="form-select" value={form.veg ? "veg" : "nonveg"} onChange={(e)=>setForm(f=>({...f, veg: e.target.value === "veg"}))}>
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </div>
              <div className="form-field form-field-available">
                <label className="form-label">Available</label>
                <select className="form-select" value={form.available ? "yes" : "no"} onChange={(e)=>setForm(f=>({...f, available: e.target.value === "yes"}))}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="form-field form-field-description">
                <label className="form-label">Description</label>
                <textarea rows={2} className="form-textarea" value={form.description} onChange={(e)=>setForm(f=>({...f, description:e.target.value}))} placeholder="Short notes (optional)" />
              </div>
              <div className="form-field form-field-image">
                <label className="form-label">Dish Image</label>
                <input type="file" accept="image/*" onChange={(e)=> e.target.files && handleImageUpload(e.target.files[0])} className="form-file-input" />
                {form.image && <img src={form.image} alt="preview" className="form-image-preview" />}
              </div>
              <div className="form-actions">
                <button type="button" onClick={cancelEdit} className="btn btn-secondary"><X className="btn-icon" /> Cancel</button>
                <button type="submit" className="btn btn-primary"><Check className="btn-icon" /> {editingId ? "Update Dish" : "Add Dish"}</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Dish List */}
        <div className="dish-list">
          <AnimatePresence>
            {filtered.map(dish => (
              <motion.div key={dish.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={`dish-card ${dish.available ? "dish-available" : "dish-unavailable"}`}>
                <div className="dish-header">
                  <div>
                    <div className="dish-title-row">
                      <span className={`dish-type-dot ${dish.veg ? "dish-type-veg" : "dish-type-nonveg"}`} />
                      <h3 className="dish-name">{dish.name}</h3>
                    </div>
                    {dish.description && <p className="dish-description">{dish.description}</p>}
                  </div>
                  <div className="dish-price-info">
                    <div className="dish-price"><IndianRupee className="price-icon" /> {currency(dish.price)}</div>
                    <div className={`dish-availability ${dish.available ? "availability-available" : "availability-unavailable"}`}>{dish.available ? "Available" : "Unavailable"}</div>
                  </div>
                </div>
                {dish.image && <img src={dish.image} alt={dish.name} className="dish-image" />}
                <div className="dish-actions-bar">
                  <div className="dish-meal-type">{meal.charAt(0).toUpperCase() + meal.slice(1)}</div>
                  <div className="dish-actions">
                    <button onClick={() => handleOrder(dish)} className="dish-action-btn btn-order">Order</button>
                    <button onClick={() => toggleAvailability(dish.id)} className="dish-action-btn btn-toggle-availability">{dish.available ? "Mark Unavailable" : "Mark Available"}</button>
                    <button onClick={() => startEdit(dish)} className="dish-action-btn"><Pencil className="btn-icon" /> Edit</button>
                    <button onClick={() => removeDish(dish.id)} className="dish-action-btn btn-delete"><Trash2 className="btn-icon" /> Delete</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}