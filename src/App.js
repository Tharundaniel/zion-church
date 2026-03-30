import { useState, useEffect, useRef } from "react";

const SERVICES = [
  { icon: "sunrise", group: "Sunday Worship", items: [{ time: "06:30 AM", label: "Service 1 - Morning Worship" }, { time: "09:30 AM", label: "Service 2 - Main Worship" }] },
  { icon: "lightning", group: "Zion Royal Youth", items: [{ time: "12:00 PM", label: "Youth Service - Sunday" }] },
  { icon: "star", group: "Zion Royal Kids", items: [{ time: "07:30 AM", label: "Kids Church - with Service 1" }, { time: "10:30 AM", label: "Kids Church - with Service 2" }] },
  { icon: "pray", group: "Daily Prayer - 365 Days", items: [{ time: "10:00 AM", label: "Church Prayer - Every Single Day" }] },
  { icon: "sword", group: "Deliverance Prayer", items: [{ time: "06:30 PM", label: "2nd Week - Saturday and Sunday" }] },
  { icon: "sparkle", group: "Special Fasting Prayer", items: [{ time: "05:00 AM", label: "Last Week Mon-Sun - Morning" }, { time: "10:30 AM", label: "Last Week Mon-Sun - Midday" }, { time: "06:00 PM", label: "Last Week Mon-Sun - Evening" }] },
];

const EVENTS = [
  { month: "APR", day: "18", label: "Good Friday", title: "Good Friday Combined Service", time: "09:00 AM", desc: "A solemn united service commemorating the sacrifice of our Lord Jesus. All congregations worship as one.", featured: true },
  { month: "APR", day: "20", label: "Easter", title: "Easter Sunday Celebration", time: "06:30 AM and 09:30 AM", desc: "He is Risen! Celebrate the resurrection of King Jesus with praise and worship.", featured: false },
  { month: "MON", day: "2WK", label: "Monthly", title: "Deliverance Prayer Meeting", time: "06:30 PM - Sat and Sun", desc: "Monthly second-week evening of deliverance, intercession and breakthrough prayer.", featured: false },
  { month: "WK", day: "LST", label: "Fasting", title: "Special Fasting Prayer Week", time: "5am - 10:30am - 6pm", desc: "Last week of every month - a full week of fasting, prayer and seeking the face of God.", featured: false },
];

const SERMONS = [
  { series: "Jesus Is Lord", title: "Every Knee Shall Bow", speaker: "Pastor Philip Raj Kumar", date: "Mar 23, 2026", dur: "42 min" },
  { series: "Jesus Is Lord", title: "The Name Above All Names", speaker: "Pastor Philip Raj Kumar", date: "Mar 16, 2026", dur: "38 min" },
  { series: "Power of the Cross", title: "It Is Finished", speaker: "Asst. Pastor Betty Suzana", date: "Mar 9, 2026", dur: "35 min" },
  { series: "Power of the Cross", title: "Resurrection and Life", speaker: "Pastor Philip Raj Kumar", date: "Mar 2, 2026", dur: "44 min" },
];

const TESTIMONIALS = [
  { name: "Priya R.", text: "Zion Church transformed my life. The daily prayer at 10am kept me grounded through my darkest season. Pastor Philip sermons speak straight to the heart.", role: "Member since 2019" },
  { name: "Samuel K.", text: "My entire family came to Christ through this church. The Zion Royal Kids ministry is extraordinary - my children love every Sunday.", role: "Family Ministry" },
  { name: "Anitha M.", text: "The fasting prayer week changed everything for me. I came broken and left restored. This church truly believes in the power of prayer.", role: "Youth Leader" },
  { name: "David J.", text: "Moving to Ooty was scary, but Zion became our home in weeks. The love and warmth here is unlike any church I have known.", role: "New Member" },
];

const GALLERY = [
  { emoji: "church", label: "Main Sanctuary" },
  { emoji: "hands", label: "Sunday Worship" },
  { emoji: "child", label: "Kids Ministry" },
  { emoji: "fire", label: "Youth Service" },
  { emoji: "candle", label: "Prayer Night" },
  { emoji: "music", label: "Praise and Worship" },
];

const VISION = [
    { icon: "eye", title: "Our Vision", text: "To be a lighthouse of Gods glory in the Nilgiri hills - transforming lives, families, and communities through the power of Jesus Christ." },
    { icon: "target", title: "Our Mission", text: "Proclaiming the full Gospel, equipping believers, and reaching the unreached in Ooty and beyond through prayer, worship, and service." },
    { icon: "book", title: "Our Values", text: "Spirit-filled worship - Unceasing prayer - Scripture-based teaching - Radical generosity - Community and family." },
];

const NAV = ["About", "Vision", "Services", "Events", "Sermons", "Gallery", "Contact", "Give"];

const P = "#4a0080";
const PL = "#6b21a8";
const PM = "#7c3aed";
const G = "#d4a017";
const GL = "#f5c842";
const W = "#fdf8ff";

const css = "@import url(\"https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap\"); * { box-sizing: border-box; margin:0; padding:0; } html { scroll-behavior: smooth; } @keyframes fadeUp { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} } @keyframes fadeIn { from{opacity:0}to{opacity:1} } @keyframes shimmer { 0%,100%{opacity:.6}50%{opacity:1} } @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} } @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(212,160,23,0.3)}50%{box-shadow:0 0 0 12px transparent} } .fu { animation: fadeUp .8s ease forwards; opacity:0; } .d1{animation-delay:.15s} .d2{animation-delay:.3s} .d3{animation-delay:.45s} .d4{animation-delay:.6s} .fi { animation: fadeIn .6s ease forwards; opacity:0; } .float { animation: float 4s ease-in-out infinite; } .pulse { animation: pulse 2s ease infinite; } .shimmer { animation: shimmer 2.5s ease-in-out infinite; } .card:hover { transform:translateY(-5px)!important; } input:focus, textarea:focus { outline:none; border-color:#7c3aed!important; box-shadow:0 0 0 3px rgba(124,58,237,0.2)!important; } @media(max-width:768px){ .desktop-nav{display:none!important} .hamburger{display:flex!important} .hero-title{font-size:clamp(2.2rem,10vw,4rem)!important} .two-col{grid-template-columns:1fr!important;gap:2rem!important} .three-col{grid-template-columns:1fr!important;gap:1.25rem!important} .serv-grid{grid-template-columns:1fr!important} .evt-grid{grid-template-columns:1fr!important} .give-amounts{grid-template-columns:1fr 1fr!important} }";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [playing, setPlaying] = useState(null);
  const [tIdx, setTIdx] = useState(0);
  const [giving, setGiving] = useState({ amount: 500, custom: "", type: "one-time" });
  const [prayer, setPrayer] = useState({ name: "", phone: "", request: "", sent: false });
  const timerRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const sendPrayer = async () => {
    if (!prayer.name || !prayer.request) return;
    try {
      const res = await fetch("https://formspree.io/f/xkoprnpk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: prayer.name, phone: prayer.phone, request: prayer.request }),
      });
      if (res.ok) {
        setPrayer({ name: "", phone: "", request: "", sent: true });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (e) {
      alert("Network error. Please try again.");
    }
  };

  const navBg = scrolled ? "rgba(30,0,60,0.97)" : "transparent";
  const navBorder = scrolled ? "1px solid rgba(212,160,23,0.2)" : "none";

  return (
    <div style={{ fontFamily: "'Palatino Linotype', Georgia, serif", background: W, color: "#1a0030", overflowX: "hidden" }}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, padding: "0.8rem 1.5rem", transition: "all .3s", background: navBg, backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: navBorder }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }} onClick={() => go("about")}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#4a0080,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", border: "2px solid rgba(212,160,23,0.4)" }}>+</div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", letterSpacing: "0.04em", fontFamily: "Cinzel, Georgia, serif" }}>Zion AOG</div>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: G }}>Ooty - Jesus Is Lord</div>
            </div>
          </div>
          <div className="desktop-nav" style={{ display: "flex", gap: "0.1rem" }}>
            {NAV.map(n => (
              <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.4rem 0.65rem", color: activeSection === n ? GL : "#c4a8e0", fontFamily: "inherit", transition: "color .2s", fontWeight: activeSection === n ? 700 : 400 }}>{n}</button>
            ))}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 24, height: 1.5, background: "#fff", transition: "all .3s", opacity: i === 1 && menuOpen ? 0 : 1, transform: i === 0 && menuOpen ? "translateY(6.5px) rotate(45deg)" : i === 2 && menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />)}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "rgba(20,0,40,0.98)", borderTop: "1px solid rgba(212,160,23,0.2)", padding: "1rem 0" }}>
            {NAV.map(n => <button key={n} onClick={() => go(n)} style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.7rem 1.5rem", color: "#d4b8f0", fontFamily: "inherit", textAlign: "left" }}>{n}</button>)}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0d0020 0%, #1e0040 40%, #2d0060 70%, #180030 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "7rem 1.5rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "-10%", top: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(124,58,237,0.12)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "80%", top: "60%", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(74,0,128,0.15)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", fontSize: "32rem", color: "rgba(212,160,23,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "serif" }}>+</div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
          <div className="fu" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1px solid rgba(212,160,23,0.35)", borderRadius: 100, padding: "0.4rem 1.2rem", marginBottom: "1.75rem", background: "rgba(212,160,23,0.08)" }}>
            <span style={{ color: G, fontSize: "0.75rem" }}>*</span>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: GL }}>Zion Assemblies of God - Ooty</span>
          </div>
          <h1 className="fu d1 hero-title" style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(2.8rem,8vw,6.5rem)", fontWeight: 900, lineHeight: 1, color: "#fff", marginBottom: "0.5rem", letterSpacing: "0.06em" }}>JESUS</h1>
          <h1 className="fu d2 hero-title" style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(2.8rem,8vw,6.5rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "0.06em", marginBottom: "1.5rem", color: G }}>IS LORD</h1>
          <div className="fu d2" style={{ width: 60, height: 2, background: "linear-gradient(to right,transparent,#d4a017,transparent)", margin: "0 auto 1.5rem" }} />
          <p className="fu d3" style={{ fontSize: "0.85rem", fontStyle: "italic", color: "rgba(212,160,23,0.8)", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
            "Therefore God exalted him to the highest place and gave him the name above every name"
          </p>
          <p className="fu d3" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,200,66,0.5)", marginBottom: "2rem" }}>Philippians 2:9</p>
          <p className="fu d3" style={{ fontSize: "1rem", color: "#b899d8", lineHeight: 1.75, marginBottom: "2.5rem" }}>
            Fernhill, Near GEL Memorial School, Ooty, Tamil Nadu<br />
            365 days of prayer - worship - community
          </p>
          <div className="fu d4" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("Services")} style={{ background: "linear-gradient(135deg,#d4a017,#b8800a)", color: "#1a0030", border: "none", borderRadius: 8, padding: "0.9rem 2rem", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>Join Us Sunday</button>
            <button onClick={() => go("Events")} style={{ background: "transparent", color: GL, border: "1px solid rgba(212,160,23,0.35)", borderRadius: 8, padding: "0.9rem 2rem", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>Good Friday Service</button>
            <button onClick={() => window.open("https://www.youtube.com", "_blank")} style={{ background: "rgba(124,58,237,0.2)", color: "#e0c8ff", border: "1px solid rgba(124,58,237,0.35)", borderRadius: 8, padding: "0.9rem 2rem", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>Live Stream</button>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" style={{ padding: "5rem 1.5rem", background: "rgba(74,0,128,0.04)", borderTop: "1px solid rgba(124,58,237,0.1)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: PM, marginBottom: "0.6rem", fontWeight: 700 }}>Our Foundation</p>
            <h2 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: P }}>Vision - Mission - Values</h2>
          </div>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {VISION.map((v, i) => (
              <div key={i} className="card" style={{ background: "#fff", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 16, padding: "2.5rem 2rem", textAlign: "center", boxShadow: "0 4px 24px rgba(74,0,128,0.05)", transition: "transform .25s, box-shadow .25s", borderTop: "3px solid #d4a017" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{v.icon === "eye" ? "eye" : v.icon === "target" ? "target" : "book"}</div>
                <h3 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "1.05rem", fontWeight: 700, color: P, marginBottom: "0.85rem", letterSpacing: "0.05em" }}>{v.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "#5a406a", lineHeight: 1.8 }}>{v.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3.5rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[{ name: "Pastor Philip Raj Kumar", role: "Senior Pastor", initial: "P" }, { name: "Asst. Pastor Betty Suzana", role: "Assistant Pastor", initial: "B" }].map(p => (
              <div key={p.name} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#fff", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 14, padding: "1.25rem 2rem", boxShadow: "0 2px 16px rgba(212,160,23,0.08)", transition: "transform .25s", minWidth: 260 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#4a0080,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2rem", fontWeight: 900, flexShrink: 0, border: "2px solid #d4a017" }}>{p.initial}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: P }}>{p.name}</div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: G, marginTop: "0.2rem" }}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "5rem 1.5rem", background: "linear-gradient(160deg,#0d0020,#1e0040,#0d0020)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: G, marginBottom: "0.6rem", fontWeight: 700 }}>Come and Worship</p>
            <h2 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff" }}>Service Times</h2>
            <p style={{ fontSize: "0.9rem", color: "#8a6aaa", marginTop: "0.75rem" }}>Every service is a fresh encounter with the Living God</p>
          </div>
          <div className="serv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem" }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 14, padding: "1.75rem", transition: "transform .25s, border-color .25s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(212,160,23,0.15)" }}>
                  <span style={{ fontSize: "1.4rem" }}>"pray"</span>
                  <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: G }}>{s.group}</span>
                </div>
                {s.items.map((it, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "1.05rem", fontWeight: 900, color: "#fff", minWidth: 84, fontFamily: "Cinzel, Georgia, serif" }}>{it.time}</span>
                    <span style={{ fontSize: "0.8rem", color: "#8a6aaa", lineHeight: 1.4 }}>{it.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "0.85rem", color: "#6a4a8a" }}>
            Fernhill, Near GEL Memorial School, Ooty - +91 73393 26116
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" style={{ padding: "5rem 1.5rem", background: W }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: PM, marginBottom: "0.6rem", fontWeight: 700 }}>Mark Your Calendar</p>
            <h2 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: P }}>Upcoming Events</h2>
          </div>
          <div className="evt-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}>
            {EVENTS.map((e, i) => (
              <div key={i} className="card" style={{ borderRadius: 16, overflow: "hidden", boxShadow: e.featured ? "0 8px 40px rgba(212,160,23,0.2)" : "0 2px 16px rgba(74,0,128,0.05)", transition: "transform .25s, box-shadow .25s", border: e.featured ? "1px solid rgba(212,160,23,0.5)" : "1px solid rgba(124,58,237,0.15)" }}>
                <div style={{ background: e.featured ? "linear-gradient(135deg,#4a0080,#7c3aed)" : "linear-gradient(135deg,rgba(74,0,128,0.85),#6b21a8)", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 900, color: e.featured ? G : "#e0c8ff", fontFamily: "Cinzel, Georgia, serif", lineHeight: 1 }}>{e.day}</div>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: e.featured ? GL : "#b899d8", marginTop: "0.2rem" }}>{e.month} - {e.label}</div>
                  </div>
                  {e.featured && <span style={{ background: G, color: "#1a0030", fontSize: "0.58rem", fontWeight: 900, letterSpacing: "0.1em", padding: "0.25rem 0.6rem", borderRadius: 4 }}>FEATURED</span>}
                </div>
                <div style={{ padding: "1.5rem", background: "#fff" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: P, marginBottom: "0.5rem", lineHeight: 1.3 }}>{e.title}</div>
                  <div style={{ fontSize: "0.82rem", color: "#6a4a8a", lineHeight: 1.65, marginBottom: "0.85rem" }}>{e.desc}</div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: e.featured ? G : PM }}>Time: {e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERMONS */}
      <section id="sermons" style={{ padding: "5rem 1.5rem", background: "rgba(74,0,128,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: PM, marginBottom: "0.6rem", fontWeight: 700 }}>The Word of God</p>
            <h2 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: P }}>Recent Sermons</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.25rem" }}>
            {SERMONS.map((sr, i) => (
              <div key={i} className="card" style={{ background: "#fff", border: "1px solid rgba(124,58,237,0.12)", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(74,0,128,0.05)", transition: "transform .25s, box-shadow .25s" }}>
                <div style={{ height: 4, background: "linear-gradient(to right,#4a0080,#d4a017)" }} />
                <div style={{ padding: "1.75rem" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: G, marginBottom: "0.6rem" }}>{sr.series}</div>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: P, lineHeight: 1.3, marginBottom: "0.6rem" }}>{sr.title}</div>
                  <div style={{ fontSize: "0.8rem", color: PM, fontWeight: 600, marginBottom: "0.2rem" }}>{sr.speaker}</div>
                  <div style={{ fontSize: "0.72rem", color: "#9a7aaa", marginBottom: "1.25rem" }}>{sr.date} - {sr.dur}</div>
                  <button onClick={() => setPlaying(playing === i ? null : i)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: playing === i ? "linear-gradient(135deg,#4a0080,#7c3aed)" : "rgba(74,0,128,0.07)", border: "none", borderRadius: 8, padding: "0.55rem 1.2rem", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: playing === i ? "#fff" : P, transition: "all .2s" }}>
                    {playing === i ? "Pause" : "Listen"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "5rem 1.5rem", background: "linear-gradient(160deg,#0d0020,#1e0040)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: G, marginBottom: "0.6rem", fontWeight: 700 }}>Our Community</p>
            <h2 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff" }}>Church Gallery</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {GALLERY.map((g, i) => (
              <div key={i} className="card" style={{ aspectRatio: "4/3", borderRadius: 14, background: "linear-gradient(135deg,rgba(74,0,128,0.8),rgba(124,58,237,0.6))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem", cursor: "pointer", border: "1px solid rgba(212,160,23,0.15)", transition: "all .25s" }}>
                <div style={{ fontSize: "3rem" }}>"praise"</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c4a8e0" }}>{g.label}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#6a4a8a", marginTop: "1.5rem" }}>Add your actual church photos by replacing the placeholders above</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "5rem 1.5rem", background: W, overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: PM, marginBottom: "0.6rem", fontWeight: 700 }}>Stories of Grace</p>
            <h2 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: P }}>Testimonials</h2>
          </div>
          <div style={{ background: "linear-gradient(135deg,#4a0080,#7c3aed)", borderRadius: 20, padding: "3rem 2.5rem", textAlign: "center", marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
            <p style={{ fontSize: "1.05rem", fontStyle: "italic", color: "#f0e0ff", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 1.5rem", position: "relative" }}>
              {TESTIMONIALS[tIdx].text}
            </p>
            <div style={{ fontWeight: 800, color: G, fontSize: "0.9rem" }}>{TESTIMONIALS[tIdx].name}</div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c4a8e0", marginTop: "0.25rem" }}>{TESTIMONIALS[tIdx].role}</div>
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1.5rem" }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => { setTIdx(i); clearInterval(timerRef.current); }} style={{ width: i === tIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === tIdx ? G : "rgba(212,160,23,0.3)", border: "none", cursor: "pointer", transition: "all .3s", padding: 0 }} />
              ))}
            </div>
          </div>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} onClick={() => setTIdx(i)} className="card" style={{ background: tIdx === i ? "rgba(74,0,128,0.05)" : "#fff", border: tIdx === i ? "1px solid #7c3aed" : "1px solid rgba(124,58,237,0.1)", borderRadius: 14, padding: "1.5rem", cursor: "pointer", transition: "all .25s" }}>
                <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#5a406a", lineHeight: 1.7, marginBottom: "0.85rem" }}>"{t.text.slice(0, 90)}..."</p>
                <div style={{ fontWeight: 700, color: P, fontSize: "0.85rem" }}>{t.name}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: PM, marginTop: "0.15rem" }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "5rem 1.5rem", background: "rgba(74,0,128,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: PM, marginBottom: "0.6rem", fontWeight: 700 }}>Reach Out</p>
            <h2 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: P }}>Contact and Prayer Request</h2>
          </div>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
            <div>
              <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", border: "1px solid rgba(124,58,237,0.12)", boxShadow: "0 2px 20px rgba(74,0,128,0.04)", marginBottom: "1.25rem" }}>
                <h3 style={{ fontFamily: "Cinzel, Georgia, serif", fontWeight: 700, fontSize: "1rem", color: P, marginBottom: "1.25rem" }}>Find Us</h3>
                {[["Church", "Zion Assemblies of God Church, Ooty"], ["Address", "Fernhill, Near GEL Memorial School, Ooty, Tamil Nadu"], ["Phone", "+91 73393 26116"], ["Senior Pastor", "Pastor Philip Raj Kumar"], ["Asst. Pastor", "Asst. Pastor Betty Suzana"], ["Daily Prayer", "10:00 AM - Every Day - 365 Days"]].map(([lb, vl]) => (
                  <div key={lb} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.15rem" }}>{lb}</div>
                      <div style={{ fontSize: "0.88rem", color: "#2a0050", lineHeight: 1.5 }}>{vl}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button onClick={() => window.open("https://www.youtube.com", "_blank")} style={{ flex: 1, background: "linear-gradient(135deg,#c00,#e00)", color: "#fff", border: "none", borderRadius: 10, padding: "0.9rem 1rem", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.08em" }}>YouTube Live</button>
                <button onClick={() => window.open("https://wa.me/917339326116", "_blank")} style={{ flex: 1, background: "linear-gradient(135deg,#128c3e,#25d366)", color: "#fff", border: "none", borderRadius: 10, padding: "0.9rem 1rem", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.08em" }}>WhatsApp Us</button>
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", border: "1px solid rgba(124,58,237,0.12)", boxShadow: "0 2px 20px rgba(74,0,128,0.04)" }}>
              {prayer.sent ? (
                <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>"pray"</div>
                  <h3 style={{ fontFamily: "Cinzel, Georgia, serif", color: P, fontSize: "1.2rem", marginBottom: "0.75rem" }}>Prayer Received!</h3>
                  <p style={{ fontSize: "0.88rem", color: "#6a4a8a", lineHeight: 1.7 }}>Thank you, {prayer.name}. Our pastors will intercede on your behalf. God hears every prayer.</p>
                  <button onClick={() => setPrayer({ name: "", phone: "", request: "", sent: false })} style={{ marginTop: "1.5rem", background: "rgba(74,0,128,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 8, padding: "0.6rem 1.5rem", fontSize: "0.8rem", cursor: "pointer", color: P, fontFamily: "inherit", fontWeight: 700 }}>Submit Another</button>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontFamily: "Cinzel, Georgia, serif", fontWeight: 700, fontSize: "1rem", color: P, marginBottom: "0.5rem" }}>Prayer Request</h3>
                  <p style={{ fontSize: "0.8rem", color: "#8a6aaa", marginBottom: "1.5rem" }}>Share your need - our pastors pray for every request.</p>
                  {[["Full Name", "name", "text"], ["Phone Number", "phone", "tel"]].map(([ph, field, type]) => (
                    <input key={field} type={type} placeholder={ph} value={prayer[field]} onChange={e => setPrayer(p => Object.assign({}, p, { [field]: e.target.value }))} style={{ display: "block", width: "100%", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 8, padding: "0.8rem 1rem", fontSize: "0.88rem", fontFamily: "inherit", background: "#fdf8ff", color: "#1a0030", marginBottom: "0.85rem" }} />
                  ))}
                  <textarea placeholder="Share your prayer request here..." rows={5} value={prayer.request} onChange={e => setPrayer(p => Object.assign({}, p, { request: e.target.value }))} style={{ display: "block", width: "100%", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 8, padding: "0.8rem 1rem", fontSize: "0.88rem", fontFamily: "inherit", background: "#fdf8ff", color: "#1a0030", resize: "vertical", marginBottom: "1rem" }} />
                  <button onClick={sendPrayer} style={{ width: "100%", background: "linear-gradient(135deg,#4a0080,#7c3aed)", color: "#fff", border: "none", borderRadius: 8, padding: "0.95rem", fontSize: "0.88rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.08em" }}>
                    Submit Prayer Request
                  </button>
                  <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#aaa", marginTop: "0.75rem" }}>Confidential - Prayed over by our pastoral team</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GIVE */}
      <section id="give" style={{ padding: "5rem 1.5rem", background: "linear-gradient(160deg,#0d0020,#1e0040,#0d0020)", textAlign: "center" }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ fontSize: "2.5rem", color: G, marginBottom: "0.75rem" }}>+</div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: G, marginBottom: "0.6rem", fontWeight: 700 }}>Support the Ministry</p>
          <h2 style={{ fontFamily: "Cinzel, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>Give to Gods Work</h2>
          <p style={{ fontSize: "0.82rem", fontStyle: "italic", color: "rgba(212,160,23,0.8)", marginBottom: "2rem" }}>Each of you should give what you have decided in your heart to give - 2 Cor 9:7</p>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 20, padding: "2rem" }}>
            <div className="give-amounts" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
              {[100, 500, 1000, 2500].map(a => (
                <button key={a} onClick={() => setGiving(g => Object.assign({}, g, { amount: a, custom: "" }))} style={{ background: giving.amount === a && !giving.custom ? "linear-gradient(135deg,#d4a017,#b8800a)" : "rgba(255,255,255,0.06)", border: giving.amount === a && !giving.custom ? "1px solid #d4a017" : "1px solid rgba(212,160,23,0.2)", borderRadius: 10, padding: "0.85rem 0.25rem", fontSize: "0.95rem", fontWeight: 800, color: giving.amount === a && !giving.custom ? "#1a0030" : "#c4a8e0", cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}>Rs.{a}</button>
              ))}
            </div>
            <input type="number" placeholder="Custom amount (Rs.)" value={giving.custom} onChange={e => setGiving(g => Object.assign({}, g, { custom: e.target.value, amount: null }))} style={{ display: "block", width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 10, padding: "0.8rem 1rem", fontSize: "0.9rem", fontFamily: "inherit", color: "#fff", marginBottom: "1rem", boxSizing: "border-box" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {["one-time", "monthly"].map(t => (
                <button key={t} onClick={() => setGiving(g => Object.assign({}, g, { type: t }))} style={{ background: giving.type === t ? "rgba(212,160,23,0.12)" : "rgba(255,255,255,0.04)", border: giving.type === t ? "1px solid rgba(212,160,23,0.4)" : "1px solid rgba(212,160,23,0.15)", borderRadius: 10, padding: "0.7rem", fontSize: "0.8rem", color: giving.type === t ? GL : "#8a6aaa", cursor: "pointer", fontFamily: "inherit", fontWeight: giving.type === t ? 700 : 400, transition: "all .2s" }}>
                  {t === "one-time" ? "One-Time Gift" : "Monthly Giving"}
                </button>
              ))}
            </div>
            <button className="pulse" style={{ width: "100%", background: "linear-gradient(135deg,#d4a017,#b8800a)", border: "none", borderRadius: 12, padding: "1.1rem", fontSize: "1rem", fontWeight: 900, color: "#1a0030", cursor: "pointer", fontFamily: "Cinzel, Georgia, serif", letterSpacing: "0.05em" }}>
              Give Rs.{giving.custom || giving.amount || "0"}{giving.type === "monthly" ? " per Month" : ""}
            </button>
            <p style={{ fontSize: "0.72rem", color: "#4a3a6a", marginTop: "0.75rem" }}>Secure - Blessed - Tax-deductible</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050010", padding: "3rem 1.5rem 2rem", borderTop: "1px solid rgba(212,160,23,0.15)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ fontSize: "1.8rem", color: G }}>+</div>
            <div>
              <div style={{ fontFamily: "Cinzel, Georgia, serif", fontWeight: 900, color: "#fff", fontSize: "1rem", letterSpacing: "0.06em" }}>ZION ASSEMBLIES OF GOD</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: G, textTransform: "uppercase", marginTop: "0.15rem" }}>Jesus Is Lord - Ooty, Tamil Nadu</div>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "#4a3a6a" }}>Fernhill, Near GEL Memorial School, Ooty - +91 73393 26116</p>
          <p style={{ fontSize: "0.7rem", color: "#2a2040" }}>Pastor Philip Raj Kumar - Asst. Pastor Betty Suzana</p>
          <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", justifyContent: "center" }}>
            {NAV.map(n => <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4a3a6a", fontFamily: "inherit", padding: "0.3rem 0.6rem" }}>{n}</button>)}
          </div>
          <p style={{ fontSize: "0.68rem", color: "#2a1a40" }}>2026 Zion Assemblies of God, Ooty. All rights reserved. Jesus Is Lord.</p>
        </div>
      </footer>
    </div>
  );
}