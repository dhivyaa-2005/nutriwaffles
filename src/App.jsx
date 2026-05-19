import { useState } from "react";

 
const PRODUCTS = [
  { id: 1, name: "Protein Power", emoji: "🧇", tag: "Best Seller", price: 299, protein: 35, carbs: 12, fat: 9, cal: 280, desc: "Classic high-protein waffle with whey isolate, almond butter and banana slices." },
  { id: 2, name: "Keto Crunch", emoji: "🥞", tag: "Keto", price: 329, protein: 28, carbs: 5, fat: 22, cal: 340, desc: "Zero-carb almond flour waffle with avocado cream and chia seeds." },
  { id: 3, name: "Tropical Vegan", emoji: "🌺", tag: "Vegan", price: 279, protein: 22, carbs: 18, fat: 7, cal: 230, desc: "Plant-based flaxseed waffle with mango, coconut flakes and passion fruit." },
  { id: 4, name: "Muscle Stack", emoji: "💪", tag: "High Protein", price: 359, protein: 42, carbs: 15, fat: 11, cal: 330, desc: "Double protein scoop, egg-white enriched, with Greek yogurt and berry compote." },
  { id: 5, name: "Choco Bliss", emoji: "🍫", tag: "Indulgent", price: 319, protein: 25, carbs: 22, fat: 13, cal: 310, desc: "Dark cocoa protein waffle with strawberries and dark chocolate drizzle." },
  { id: 6, name: "Fat Burner", emoji: "🔥", tag: "Cutting", price: 289, protein: 30, carbs: 8, fat: 6, cal: 210, desc: "Low-cal, high-fiber waffle with thermogenic spices, green apple and cinnamon." },
];
const BASES = [
  { id: "whey", name: "Whey Protein", icon: "🥛", price: 0, protein: 20, carbs: 15, fat: 5, cal: 180 },
  { id: "plant", name: "Plant Protein", icon: "🌱", price: 20, protein: 18, carbs: 16, fat: 4, cal: 170 },
  { id: "almond", name: "Almond Flour", icon: "🌰", price: 30, protein: 12, carbs: 6, fat: 14, cal: 200 },
  { id: "oat", name: "Oat Base", icon: "🌾", price: 10, protein: 14, carbs: 25, fat: 4, cal: 210 },
];
const TOPPINGS = [
  { id: "banana", name: "Banana", icon: "🍌", price: 30, protein: 1, carbs: 6, fat: 0, cal: 25 },
  { id: "berries", name: "Berries", icon: "🫐", price: 40, protein: 1, carbs: 5, fat: 0, cal: 20 },
  { id: "almondb", name: "Alm. Butter", icon: "🥜", price: 35, protein: 3, carbs: 2, fat: 9, cal: 80 },
  { id: "greek", name: "Greek Yogurt", icon: "🫙", price: 40, protein: 6, carbs: 3, fat: 2, cal: 50 },
  { id: "chia", name: "Chia Seeds", icon: "🌿", price: 20, protein: 2, carbs: 1, fat: 3, cal: 40 },
  { id: "mango", name: "Mango", icon: "🥭", price: 35, protein: 0, carbs: 8, fat: 0, cal: 30 },
  { id: "granola", name: "Granola", icon: "🥣", price: 25, protein: 2, carbs: 8, fat: 3, cal: 60 },
  { id: "strawb", name: "Strawberry", icon: "🍓", price: 30, protein: 0, carbs: 4, fat: 0, cal: 16 },
];
const SAUCES = [
  { id: "none", name: "No Sauce", icon: "🚫", price: 0 },
  { id: "honey", name: "Honey", icon: "🍯", price: 15 },
  { id: "chocolate", name: "Dark Choco", icon: "🍫", price: 20 },
  { id: "berry", name: "Berry Compote", icon: "🍇", price: 20 },
  { id: "peanut", name: "Peanut Drizzle", icon: "🥜", price: 15 },
  { id: "lemon", name: "Lemon Zest", icon: "🍋", price: 10 },
];
const CRISP = [
  { id: "soft", name: "Soft", icon: "☁️", sub: "Fluffy inside" },
  { id: "medium", name: "Medium", icon: "✨", sub: "Balanced" },
  { id: "crispy", name: "Crispy", icon: "🔥", sub: "Extra crunch" },
];
const TIMES = ["10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
const TAG_COLORS = {
  "Best Seller": { bg: "#C8102E", color: "#fff" },
  "Keto": { bg: "#1a4731", color: "#6FCF97" },
  "Vegan": { bg: "#1a4731", color: "#6FCF97" },
  "High Protein": { bg: "#3D2A00", color: "#FFD700" },
  "Indulgent": { bg: "#3D0A0A", color: "#FF8080" },
  "Cutting": { bg: "#C8102E", color: "#fff" },
};
 
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedBase, setSelectedBase] = useState("whey");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState("none");
  const [selectedCrisp, setSelectedCrisp] = useState("medium");
  const [selectedTime, setSelectedTime] = useState(TIMES[0]);
  const [qty, setQty] = useState(1);
  const [toggles, setToggles] = useState({ egg: false, protein: false, gf: false, vegan: false, sugar: false });
  const [notes, setNotes] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pin: "", payment: "upi" });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addedId, setAddedId] = useState(null);
 
  const tog = (key) => setToggles(t => ({ ...t, [key]: !t[key] }));
  const toggleTopping = (id) => setSelectedToppings(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
 
  const base = BASES.find(b => b.id === selectedBase);
  const activeToppings = selectedToppings.map(id => TOPPINGS.find(t => t.id === id));
  const sauce = SAUCES.find(s => s.id === selectedSauce);
 
  const calcPrice = () => {
    let p = 199 + base.price + sauce.price;
    activeToppings.forEach(t => p += t.price);
    if (toggles.egg) p += 30; if (toggles.protein) p += 50;
    return p * qty;
  };
  const nut = () => {
    let p = base.protein, c = base.carbs, f = base.fat, cal = base.cal;
    activeToppings.forEach(t => { p += t.protein; c += t.carbs; f += t.fat; cal += t.cal; });
    if (toggles.egg) p += 8; if (toggles.protein) p += 15;
    return { p, c, f, cal };
  };
  const n = nut();
 
  const addProductToCart = (prod) => {
    setCart(c => [...c, { id: Date.now(), name: prod.name, emoji: prod.emoji, price: prod.price, qty: 1, mods: "Standard recipe" }]);
    setAddedId(prod.id); setTimeout(() => setAddedId(null), 1500);
  };
  const addCustomToCart = () => {
    const mods = [base.name, ...activeToppings.map(t => t.name), sauce.id !== "none" ? sauce.name : "No Sauce", selectedCrisp + " crisp"];
    setCart(c => [...c, { id: Date.now(), name: "Custom Build", emoji: "🧇", price: calcPrice(), qty, mods: mods.join(" · ") + (notes ? " | " + notes : "") }]);
    setPage("cart");
  };
  const removeItem = (id) => setCart(c => c.filter(x => x.id !== id));
  const cartTotal = cart.reduce((a, x) => a + x.price, 0);
  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) { alert("Please fill in name, phone and address!"); return; }
    setOrderPlaced(true); setCart([]);
  };
 
  // Shared input style
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: 10, padding: "0.75rem 1rem", fontFamily: "inherit", fontSize: "0.9rem", color: "#F0E0C0", outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontSize: "0.78rem", fontWeight: 700, color: "#6A5040", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 };
 
  const NutriBar = ({ label, value, max, color }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: "#6A5040", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
        <span style={{ color: "#FFD700", fontWeight: 800 }}>{value}{label === "Calories" ? "" : "g"}</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
        <div style={{ height: "100%", width: Math.min((value / max) * 100, 100) + "%", background: color, borderRadius: 3, transition: "width 0.4s ease", boxShadow: `0 0 8px ${color}66` }} />
      </div>
    </div>
  );
 
  const Tog = ({ id, label, sub }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,215,0,0.06)" }}>
      <div><div style={{ fontSize: 13, color: "#E0C090" }}>{label}</div>{sub && <div style={{ fontSize: 11, color: "#5A4030", marginTop: 2 }}>{sub}</div>}</div>
      <div onClick={() => tog(id)} style={{ width: 44, height: 24, borderRadius: 24, background: toggles[id] ? "#C8102E" : "rgba(255,255,255,0.08)", position: "relative", cursor: "pointer", transition: "0.3s", flexShrink: 0, border: toggles[id] ? "1px solid #C8102E" : "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ position: "absolute", width: 18, height: 18, background: "#fff", borderRadius: "50%", top: 2, left: toggles[id] ? 22 : 2, transition: "left 0.3s", boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }} />
      </div>
    </div>
  );
 
  const Panel = ({ children }) => (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,215,0,0.1)", borderRadius: 18, padding: "1.4rem", marginBottom: "1rem" }}>
      {children}
    </div>
  );
  const PTitle = ({ children }) => (
    <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: "#FFD700", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255,215,0,0.1)", textTransform: "uppercase", letterSpacing: 2 }}>{children}</div>
  );
  const OptBtn = ({ selected, onClick, icon, name, price }) => (
    <div onClick={onClick} style={{ border: selected ? "2px solid #FFD700" : "1px solid rgba(255,215,0,0.1)", background: selected ? "rgba(255,215,0,0.09)" : "rgba(255,255,255,0.02)", borderRadius: 12, padding: "0.6rem 0.3rem", cursor: "pointer", textAlign: "center", transition: "all 0.2s", boxShadow: selected ? "0 0 14px rgba(255,215,0,0.18)" : "none" }}>
      <div style={{ fontSize: "1.4rem" }}>{icon}</div>
      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: selected ? "#FFD700" : "#9A7050", marginTop: 3 }}>{name}</div>
      <div style={{ fontSize: "0.62rem", color: "#5A3A20" }}>{price}</div>
    </div>
  );
 
  const ProductCard = ({ prod }) => {
    const tc = TAG_COLORS[prod.tag] || { bg: "#333", color: "#fff" };
    const isAdded = addedId === prod.id;
    return (
      <div onMouseOver={() => setHoveredProduct(prod.id)} onMouseOut={() => setHoveredProduct(null)}
        style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${hoveredProduct === prod.id ? "rgba(255,215,0,0.3)" : "rgba(255,215,0,0.08)"}`, borderRadius: 20, overflow: "hidden", transition: "all 0.3s", transform: hoveredProduct === prod.id ? "translateY(-6px)" : "translateY(0)", boxShadow: hoveredProduct === prod.id ? "0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(255,215,0,0.06)" : "none" }}>
        <div style={{ height: 155, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4.5rem", background: "linear-gradient(135deg,rgba(200,16,46,0.07),rgba(255,215,0,0.04))", position: "relative" }}>
          {prod.emoji}
          <span style={{ position: "absolute", top: 12, left: 12, background: tc.bg, color: tc.color, fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.8 }}>{prod.tag}</span>
        </div>
        <div style={{ padding: "1.2rem" }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: "1.15rem", fontWeight: 700, color: "#F0D8A0", marginBottom: "0.6rem" }}>{prod.name}</div>
          <div style={{ display: "flex", gap: 6, marginBottom: "0.75rem", flexWrap: "wrap" }}>
            {[["💪", prod.protein + "g", "Protein"], ["🌾", prod.carbs + "g", "Carbs"], ["💧", prod.fat + "g", "Fat"], ["⚡", prod.cal, "kcal"]].map(([ic, v, l]) => (
              <div key={l} style={{ background: "rgba(255,215,0,0.05)", padding: "4px 9px", borderRadius: 7, border: "1px solid rgba(255,215,0,0.08)", textAlign: "center" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#FFD700" }}>{v}</div>
                <div style={{ fontSize: "0.58rem", color: "#5A4030", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.8rem", color: "#5A4030", lineHeight: 1.6, marginBottom: "1.1rem" }}>{prod.desc}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "#FFD700" }}>₹{prod.price}</span>
            <button onClick={() => addProductToCart(prod)} style={{ background: isAdded ? "#1a4731" : "#C8102E", color: isAdded ? "#6FCF97" : "#fff", border: "none", padding: "0.55rem 1.1rem", borderRadius: 9, fontFamily: "inherit", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase", letterSpacing: 0.5 }}>
              {isAdded ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    );
  };
 
  return (
    <div style={{ background: "#0C0400", minHeight: "100vh", fontFamily: "'Segoe UI',sans-serif", color: "#E8D0A0" }}>
 
      {/* NAV */}
      <nav style={{ background: "rgba(10,3,0,0.96)", backdropFilter: "blur(20px)", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66, position: "sticky", top: 0, zIndex: 200, borderBottom: "1px solid rgba(255,215,0,0.08)" }}>
        <img src="/Screenshot 2026-05-17 205435.png" alt="WaffleLove" onClick={() => setPage("home")} style={{ height: 46, cursor: "pointer", filter: "drop-shadow(0 0 10px rgba(255,215,0,0.35))", borderRadius: 8, transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.06)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
        <div style={{ display: "flex", gap: 2 }}>
          {["home","menu","customize","cart","checkout"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ background: page === p ? "rgba(255,215,0,0.1)" : "none", border: page === p ? "1px solid rgba(255,215,0,0.25)" : "1px solid transparent", color: page === p ? "#FFD700" : "#6A5030", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer", padding: "6px 14px", borderRadius: 7, textTransform: "uppercase", letterSpacing: 0.8, transition: "all 0.2s" }}>
              {p}
            </button>
          ))}
        </div>
        <button onClick={() => setPage("cart")} style={{ background: cart.length > 0 ? "#C8102E" : "rgba(200,16,46,0.12)", border: "1px solid rgba(200,16,46,0.6)", color: "#fff", fontFamily: "inherit", fontWeight: 700, padding: "7px 18px", borderRadius: 9, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 8, boxShadow: cart.length > 0 ? "0 0 20px rgba(200,16,46,0.4)" : "none", transition: "all 0.2s" }}>
          🛒 <span style={{ background: "#FFD700", color: "#1A0800", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900 }}>{cart.length}</span>
        </button>
      </nav>
 
      {/* HOME */}
      {page === "home" && <>
        <div style={{ background: "linear-gradient(155deg,#140600 0%,#2A0800 50%,#0C0400 100%)", padding: "6rem 2rem 5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle,rgba(200,16,46,0.12) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 30, right: "8%", fontSize: "9rem", opacity: 0.05, transform: "rotate(25deg)" }}>🧇</div>
<div style={{ marginBottom: "2rem" }}><img src="/Screenshot 2026-05-17 205435.png" alt="NutriWaffles" style={{ height: 110, filter: "drop-shadow(0 0 24px rgba(255,215,0,0.5))", borderRadius: 16 }} /></div>
          <div style={{ position: "absolute", bottom: 30, left: "6%", fontSize: "7rem", opacity: 0.05, transform: "rotate(-18deg)" }}>🧇</div>
          <div style={{ display: "inline-block", background: "rgba(200,16,46,0.15)", border: "1px solid rgba(200,16,46,0.35)", borderRadius: 30, padding: "5px 18px", fontSize: 11, fontWeight: 800, color: "#C8102E", textTransform: "uppercase", letterSpacing: 3, marginBottom: "1.5rem" }}>Premium Nutrition · Est. 2024</div>
          <h1 style={{ fontFamily: "Georgia,serif", color: "#fff", fontSize: "clamp(2.2rem,5.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem" }}>
            Fuel Your <span style={{ color: "#FFD700", textShadow: "0 0 40px rgba(255,215,0,0.35)" }}>Beast Mode</span><br />One Waffle at a Time
          </h1>
          <p style={{ color: "#6A5030", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>High-protein, macro-precise Belgian waffles engineered for peak performance — fully customizable, made fresh, delivered hot.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("menu")} style={{ background: "#C8102E", color: "#fff", border: "none", padding: "0.95rem 2.5rem", borderRadius: 12, fontFamily: "inherit", fontSize: "0.95rem", fontWeight: 800, cursor: "pointer", letterSpacing: 1, boxShadow: "0 8px 30px rgba(200,16,46,0.45)", textTransform: "uppercase", transition: "all 0.2s" }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(200,16,46,0.65)"; }} onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,16,46,0.45)"; }}>Order Now</button>
            <button onClick={() => setPage("customize")} style={{ background: "transparent", color: "#FFD700", border: "2px solid rgba(255,215,0,0.35)", padding: "0.95rem 2.5rem", borderRadius: 12, fontFamily: "inherit", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s" }} onMouseOver={e => { e.currentTarget.style.borderColor = "#FFD700"; e.currentTarget.style.background = "rgba(255,215,0,0.07)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,215,0,0.35)"; e.currentTarget.style.background = "transparent"; }}>Build My Waffle</button>
          </div>
          <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap" }}>
            {[["35g","Protein per serving"],["12g","Net carbs avg"],["100%","Natural ingredients"],["4.9★","Customer rating"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#FFD700", textShadow: "0 0 20px rgba(255,215,0,0.25)" }}>{v}</div>
                <div style={{ fontSize: "0.7rem", color: "#4A3020", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#C8102E", textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>Why Choose Us</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2rem", color: "#FFD700", marginBottom: "0.5rem" }}>Built Different. Tastes Incredible.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "1.25rem" }}>
            {[["💪","High Protein","Up to 40g protein per serving with premium whey and plant blends.","#C8102E"],["🌿","All Natural","No artificial sweeteners, no fillers — just real food, real nutrients.","#1a4731"],["⚡","Made Fresh","Every waffle built from scratch at order time. Zero batch cooking.","#7A5500"],["🎯","Goal Aligned","Presets for muscle gain, fat loss, keto, or vegan lifestyles.","#C8102E"]].map(([ic,t,d,ac]) => (
              <div key={t} onMouseOver={e => { e.currentTarget.style.borderColor = ac + "55"; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = ac + "22"; e.currentTarget.style.transform = ""; }} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${ac}22`, borderRadius: 18, padding: "1.75rem 1.25rem", textAlign: "center", transition: "all 0.3s", cursor: "default" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>{ic}</div>
                <h3 style={{ fontFamily: "Georgia,serif", color: "#FFD700", marginBottom: "0.6rem", fontSize: "1rem" }}>{t}</h3>
                <p style={{ fontSize: "0.82rem", color: "#4A3020", lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "rgba(255,215,0,0.02)", borderTop: "1px solid rgba(255,215,0,0.06)", padding: "5rem 2rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#C8102E", textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>Fan Favourites</div>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2rem", color: "#FFD700" }}>Signature Waffles</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
              {PRODUCTS.slice(0,3).map(p => <ProductCard key={p.id} prod={p} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <button onClick={() => setPage("menu")} style={{ background: "transparent", color: "#FFD700", border: "2px solid rgba(255,215,0,0.25)", padding: "0.8rem 2rem", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1, transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "#FFD700"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,215,0,0.25)"}>View Full Menu →</button>
            </div>
          </div>
        </div>
      </>}
 
      {/* MENU */}
      {page === "menu" && <div style={{ padding: "4rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#C8102E", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>Our Menu</div>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2rem", color: "#FFD700", marginBottom: "0.4rem" }}>Signature Waffles</h2>
          <p style={{ color: "#4A3020" }}>Every recipe nutritionist-designed for your goals.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "1.5rem" }}>
          {PRODUCTS.map(p => <ProductCard key={p.id} prod={p} />)}
        </div>
        <div style={{ marginTop: "3rem", background: "linear-gradient(135deg,rgba(200,16,46,0.08),rgba(255,215,0,0.03))", border: "1px solid rgba(255,215,0,0.12)", borderRadius: 18, padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>✨</div>
          <h3 style={{ fontFamily: "Georgia,serif", color: "#FFD700", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Want something unique?</h3>
          <p style={{ color: "#4A3020", marginBottom: "1.25rem", fontSize: "0.88rem" }}>Build your own from scratch — pick base, toppings, sauce and cooking style.</p>
          <button onClick={() => setPage("customize")} style={{ background: "#C8102E", color: "#fff", border: "none", padding: "0.8rem 2rem", borderRadius: 10, fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>Build Custom Waffle →</button>
        </div>
      </div>}
 
      {/* CUSTOMIZE */}
      {page === "customize" && <div style={{ padding: "4rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#C8102E", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>Custom Order</div>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2rem", color: "#FFD700", marginBottom: "0.4rem" }}>Build Your Perfect Waffle</h2>
          <p style={{ color: "#4A3020" }}>Every ingredient. Every detail. Your way.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 310px", gap: "2rem", alignItems: "start" }}>
          <div>
            <Panel><PTitle>1 · Choose Your Base</PTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {BASES.map(b => <OptBtn key={b.id} selected={selectedBase===b.id} onClick={()=>setSelectedBase(b.id)} icon={b.icon} name={b.name} price={b.price?"+₹"+b.price:"Included"} />)}
              </div>
            </Panel>
            <Panel><PTitle>2 · Add Toppings</PTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {TOPPINGS.map(t => <OptBtn key={t.id} selected={selectedToppings.includes(t.id)} onClick={()=>toggleTopping(t.id)} icon={t.icon} name={t.name} price={"+₹"+t.price} />)}
              </div>
            </Panel>
            <Panel><PTitle>3 · Choose Sauce</PTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {SAUCES.map(s => <OptBtn key={s.id} selected={selectedSauce===s.id} onClick={()=>setSelectedSauce(s.id)} icon={s.icon} name={s.name} price={s.price?"+₹"+s.price:"Free"} />)}
              </div>
            </Panel>
            <Panel>
              <PTitle>4 · Cooking Style</PTitle>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#6A5030", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Crispiness</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: "1.25rem" }}>
                {CRISP.map(c => (
                  <div key={c.id} onClick={()=>setSelectedCrisp(c.id)} style={{ border: selectedCrisp===c.id?"2px solid #FFD700":"1px solid rgba(255,215,0,0.1)", background: selectedCrisp===c.id?"rgba(255,215,0,0.09)":"rgba(255,255,255,0.02)", borderRadius: 12, padding: "0.65rem", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                    <div style={{ fontSize: "1.4rem" }}>{c.icon}</div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: selectedCrisp===c.id?"#FFD700":"#8A6030" }}>{c.name}</div>
                    <div style={{ fontSize: "0.62rem", color: "#4A3020" }}>{c.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#6A5030", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Protein Boosters</div>
              <Tog id="egg" label="Extra Egg White" sub="+₹30 | +8g protein" />
              <Tog id="protein" label="Double Protein Scoop" sub="+₹50 | +15g protein" />
              <div style={{ marginTop: "1.1rem", fontSize: 10, fontWeight: 700, color: "#6A5030", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Dietary Flags</div>
              <Tog id="gf" label="Gluten Free" sub="Oat flour base" />
              <Tog id="vegan" label="Vegan" sub="Replaces eggs & dairy" />
              <Tog id="sugar" label="No Added Sugar" sub="Uses stevia" />
              <div style={{ marginTop: "1.1rem", fontSize: 10, fontWeight: 700, color: "#6A5030", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Special Instructions</div>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Extra crispy edges, no butter, allergic to nuts..." style={{ ...inputStyle, resize: "none" }} />
            </Panel>
            <Panel>
              <PTitle>Quantity</PTitle>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width: 38, height: 38, border: "1px solid rgba(255,215,0,0.2)", background: "rgba(255,215,0,0.05)", borderRadius: 9, cursor: "pointer", fontSize: "1.3rem", fontWeight: 700, color: "#FFD700", transition: "all 0.2s" }}>−</button>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#FFD700", width: 30, textAlign: "center" }}>{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} style={{ width: 38, height: 38, border: "1px solid rgba(255,215,0,0.2)", background: "rgba(255,215,0,0.05)", borderRadius: 9, cursor: "pointer", fontSize: "1.3rem", fontWeight: 700, color: "#FFD700", transition: "all 0.2s" }}>+</button>
                <span style={{ fontSize: "0.85rem", color: "#4A3020" }}>serving(s)</span>
              </div>
            </Panel>
          </div>
 
          {/* SIDEBAR */}
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,215,0,0.18)", borderRadius: 18, padding: "1.4rem", position: "sticky", top: 78 }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: "#FFD700", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 2 }}>Your Build</div>
            <div style={{ background: "linear-gradient(135deg,rgba(200,16,46,0.08),rgba(255,215,0,0.03))", borderRadius: 12, padding: "1.1rem", textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "3rem" }}>🧇</div>
              <div style={{ fontFamily: "Georgia,serif", fontWeight: 700, color: "#E8D090", marginTop: 6, fontSize: "0.95rem" }}>Custom Build</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginTop: 8 }}>
                {toggles.gf && <span style={{ background: "rgba(26,71,49,0.4)", color: "#6FCF97", fontSize: "0.62rem", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>Gluten Free</span>}
                {toggles.vegan && <span style={{ background: "rgba(26,71,49,0.4)", color: "#6FCF97", fontSize: "0.62rem", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>Vegan</span>}
                {toggles.sugar && <span style={{ background: "rgba(26,71,49,0.4)", color: "#6FCF97", fontSize: "0.62rem", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>No Added Sugar</span>}
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4A3020", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Nutrition Estimate</div>
              <NutriBar label="Protein" value={n.p} max={60} color="#C8102E" />
              <NutriBar label="Carbs" value={n.c} max={60} color="#4A90E2" />
              <NutriBar label="Fat" value={n.f} max={40} color="#27AE60" />
              <NutriBar label="Calories" value={n.cal} max={600} color="#E8A020" />
            </div>
            <div style={{ borderTop: "1px solid rgba(255,215,0,0.08)", paddingTop: "0.75rem" }}>
              {[["Base","₹"+(199+base.price)],["Toppings + Sauce","₹"+(activeToppings.reduce((a,t)=>a+t.price,0)+sauce.price)],["Extras","₹"+((toggles.egg?30:0)+(toggles.protein?50:0))],["× Qty","×"+qty]].map(([l,v])=>(
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: "0.82rem", color: "#4A3020" }}><span>{l}</span><span style={{ color: "#8A6030" }}>{v}</span></div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", borderTop: "1px solid rgba(255,215,0,0.1)", marginTop: 8, fontWeight: 900, fontSize: "1.1rem", color: "#FFD700" }}><span>Total</span><span>₹{calcPrice()}</span></div>
            </div>
            <button onClick={addCustomToCart} style={{ background: "#C8102E", color: "#fff", border: "none", padding: "0.95rem", borderRadius: 11, fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 800, cursor: "pointer", width: "100%", marginTop: "1rem", textTransform: "uppercase", letterSpacing: 1, boxShadow: "0 6px 20px rgba(200,16,46,0.4)", transition: "all 0.2s" }} onMouseOver={e=>e.currentTarget.style.boxShadow="0 10px 30px rgba(200,16,46,0.6)"} onMouseOut={e=>e.currentTarget.style.boxShadow="0 6px 20px rgba(200,16,46,0.4)"}>
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>}
 
      {/* CART */}
      {page === "cart" && <div style={{ padding: "4rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#C8102E", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>Your Order</div>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2rem", color: "#FFD700" }}>Cart</h2>
        </div>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.08)", borderRadius: 18 }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🧇</div>
            <p style={{ fontSize: "1.1rem", color: "#4A3020", marginBottom: "1.5rem" }}>Your cart is empty!</p>
            <button onClick={()=>setPage("menu")} style={{ background: "#C8102E", color: "#fff", border: "none", padding: "0.8rem 2rem", borderRadius: 10, fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", textTransform: "uppercase" }}>Browse Menu</button>
          </div>
        ) : (<>
          {cart.map(item => (
            <div key={item.id} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,215,0,0.09)", borderRadius: 15, padding: "1.1rem", marginBottom: "0.75rem", display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ fontSize: "2.2rem", width: 58, height: 58, background: "linear-gradient(135deg,rgba(200,16,46,0.1),rgba(255,215,0,0.04))", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Georgia,serif", fontWeight: 700, color: "#E8D090", marginBottom: 3 }}>{item.name} ×{item.qty}</div>
                <div style={{ fontSize: "0.78rem", color: "#4A3020" }}>{item.mods}</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#FFD700" }}>₹{item.price}</div>
              <button onClick={()=>removeItem(item.id)} style={{ background: "none", border: "1px solid rgba(200,16,46,0.25)", cursor: "pointer", color: "#C8102E", fontSize: "0.9rem", width: 30, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseOver={e=>e.currentTarget.style.background="rgba(200,16,46,0.15)"} onMouseOut={e=>e.currentTarget.style.background="none"}>✕</button>
            </div>
          ))}
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,215,0,0.14)", borderRadius: 18, padding: "1.4rem", maxWidth: 400, margin: "2rem auto 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", color: "#4A3020", fontSize: "0.88rem" }}><span>Subtotal</span><span style={{ color: "#8A6030" }}>₹{cartTotal}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", color: "#4A3020", fontSize: "0.88rem" }}><span>Delivery</span><span style={{ color: "#27AE60" }}>Free 🎉</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", borderTop: "1px solid rgba(255,215,0,0.12)", marginTop: 8, fontWeight: 900, fontSize: "1.15rem", color: "#FFD700" }}><span>Grand Total</span><span>₹{cartTotal}</span></div>
            <button onClick={()=>setPage("checkout")} style={{ background: "#C8102E", color: "#fff", border: "none", padding: "0.95rem", borderRadius: 11, fontFamily: "inherit", fontSize: "0.9rem", fontWeight: 800, cursor: "pointer", width: "100%", marginTop: "1rem", textTransform: "uppercase", letterSpacing: 1, boxShadow: "0 6px 20px rgba(200,16,46,0.4)" }}>Proceed to Checkout →</button>
          </div>
        </>)}
      </div>}
 
      {/* CHECKOUT */}
      {page === "checkout" && <div style={{ padding: "4rem 2rem", maxWidth: 780, margin: "0 auto" }}>
        {!orderPlaced ? (<>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#C8102E", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>Almost There</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2rem", color: "#FFD700" }}>Place Your Order</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[["Full Name","text","name","Priya Sharma"],["Phone","tel","phone","+91 99999 00000"]].map(([l,t,k,ph])=>(
              <div key={k}><label style={labelStyle}>{l}</label><input type={t} placeholder={ph} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={inputStyle} /></div>
            ))}
            <div style={{ gridColumn:"1/-1" }}><label style={labelStyle}>Delivery Address</label><input type="text" placeholder="Flat, Building, Street, Area" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} style={inputStyle} /></div>
            {[["City","city","Chennai"],["Pincode","pin","600001"]].map(([l,k,ph])=>(
              <div key={k}><label style={labelStyle}>{l}</label><input type="text" placeholder={ph} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={inputStyle} /></div>
            ))}
            <div style={{ gridColumn:"1/-1" }}>
              <label style={labelStyle}>Preferred Delivery Time</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {TIMES.map(t=>(
                  <div key={t} onClick={()=>setSelectedTime(t)} style={{ border: selectedTime===t?"2px solid #FFD700":"1px solid rgba(255,215,0,0.12)", background: selectedTime===t?"rgba(255,215,0,0.09)":"rgba(255,255,255,0.02)", borderRadius: 8, padding: "0.5rem", cursor: "pointer", textAlign: "center", fontSize: "0.78rem", fontWeight: 700, color: selectedTime===t?"#FFD700":"#4A3020", transition: "all 0.2s" }}>{t}</div>
                ))}
              </div>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={labelStyle}>Payment Method</label>
              <select value={form.payment} onChange={e=>setForm(f=>({...f,payment:e.target.value}))} style={{ ...inputStyle }}>
                <option value="upi" style={{ background:"#0C0400" }}>UPI (Google Pay / PhonePe)</option>
                <option value="card" style={{ background:"#0C0400" }}>Credit / Debit Card</option>
                <option value="cod" style={{ background:"#0C0400" }}>Cash on Delivery</option>
                <option value="netbanking" style={{ background:"#0C0400" }}>Net Banking</option>
              </select>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <button onClick={placeOrder} style={{ background:"#C8102E", color:"#fff", border:"none", padding:"1.05rem", borderRadius:12, fontFamily:"inherit", fontSize:"1rem", fontWeight:800, cursor:"pointer", width:"100%", textTransform:"uppercase", letterSpacing:1.5, boxShadow:"0 8px 30px rgba(200,16,46,0.45)", transition:"all 0.2s" }} onMouseOver={e=>e.currentTarget.style.boxShadow="0 12px 40px rgba(200,16,46,0.65)"} onMouseOut={e=>e.currentTarget.style.boxShadow="0 8px 30px rgba(200,16,46,0.45)"}>
                🧇 Place Order
              </button>
            </div>
          </div>
        </>) : (
          <div style={{ textAlign:"center", padding:"5rem 2rem" }}>
            <div style={{ fontSize:"5rem", marginBottom:"1.5rem" }}>🎉</div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"2.5rem", fontWeight:900, color:"#FFD700", marginBottom:"1rem", textShadow:"0 0 30px rgba(255,215,0,0.3)" }}>Order Placed!</h2>
            <p style={{ fontSize:"1.05rem", color:"#6A5030", marginBottom:"0.5rem" }}>Your NutriWaffles are being made fresh!</p>
            <p style={{ fontSize:"0.88rem", color:"#4A3020", marginBottom:"2.5rem" }}>Estimated delivery: <strong style={{ color:"#FFD700" }}>30–45 minutes</strong></p>
            <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,215,0,0.12)", borderRadius:18, padding:"1.5rem", maxWidth:340, margin:"0 auto 2rem" }}>
              {["Order Received ✓","Batter being mixed 🥣","Waffle being cooked 🧇","Quality check ✅","Out for delivery 🛵"].map(s=>(
                <div key={s} style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:"#C8102E", flexShrink:0, boxShadow:"0 0 8px rgba(200,16,46,0.7)" }} />
                  <span style={{ fontSize:"0.85rem", color:"#8A6030" }}>{s}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>{setOrderPlaced(false);setPage("home");}} style={{ background:"#C8102E", color:"#fff", border:"none", padding:"0.95rem 2.5rem", borderRadius:12, fontFamily:"inherit", fontSize:"0.9rem", fontWeight:800, cursor:"pointer", textTransform:"uppercase", letterSpacing:1 }}>Order More Waffles 🧇</button>
          </div>
        )}
      </div>}
 
    </div>
  );
}