import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import characterImg from "../assets/jeevanbg.png";

const TABS = [{ id: "profile", label: "DEVELOPER PROFILE" },{ id: "status", label: "STATUS" },{ id: "ability", label: "ABILITY SCORES" },{ id: "training", label: "TRAINING" },{ id: "biography", label: "OVERVIEW" }] as const;
type TabId = typeof TABS[number]["id"];
const STATS = [{ label: "FRONTEND", value: 92, color: "#6b7cff" },{ label: "BACKEND", value: 85, color: "#2dd4bf" },{ label: "AI/ML", value: 82, color: "#a855f7" },{ label: "DATA SCIENCE", value: 80, color: "#ec4899" },{ label: "PROBLEM SOLVING", value: 88, color: "#ff6b1a" },{ label: "DSA", value: 75, color: "#6366f1" }];

function useCountUp(target: number, decimals: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const start = performance.now(); const dur = 1500;
    const tick = (now: number) => { const p = Math.min((now-start)/dur,1); const e=1-Math.pow(1-p,3); setVal(parseFloat((e*target).toFixed(decimals))); if(p<1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [active, target, decimals]);
  return decimals > 0 ? val.toFixed(decimals) : Math.floor(val);
}

const RJ = { fontFamily: "Rajdhani,sans-serif" } as const;
const IN = { fontFamily: "Inter,sans-serif" } as const;
const HDR = (t: string) => <p style={{ ...RJ, fontSize:11, letterSpacing:"0.28em", color:"#6b7cff", marginBottom:24, textTransform:"uppercase" as const }}>{t}</p>;
const TabProfile = () => (<div><h2 style={{ ...IN, fontWeight:800, fontSize:"clamp(2rem,3.5vw,3rem)", color:"#fff", lineHeight:1.05, marginBottom:6 }}>Jeevan K G</h2><p style={{ ...IN, fontSize:"1rem", color:"#6b7cff", marginBottom:36 }}>Full Stack AI Engineer</p><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px 40px", marginBottom:28 }}>{[["NAME","Jeevan K G"],["TITLE","Full Stack Engineer"],["JOB CLASS","Full Stack AI Engineer"],["LOCATION","Shivamogga, India"]].map(([k,v]) => (<div key={k}><p style={{ ...RJ, textTransform:"uppercase" as const, fontSize:10, letterSpacing:"0.28em", color:"#6060a0", marginBottom:5 }}>{k}</p><p style={{ ...IN, fontSize:"0.95rem", color:"#c8caf0" }}>{v}</p></div>))}</div><div style={{ display:"flex", alignItems:"center", gap:14 }}><span style={{ ...RJ, textTransform:"uppercase" as const, fontSize:10, letterSpacing:"0.28em", color:"#6060a0" }}>RANK</span><motion.span animate={{ boxShadow:["0 0 10px rgba(255,107,26,0.4)","0 0 28px rgba(255,107,26,0.8)","0 0 10px rgba(255,107,26,0.4)"] }} transition={{ duration:2, repeat:Infinity }} style={{ ...RJ, fontWeight:800, fontSize:13, letterSpacing:"0.2em", background:"#ff6b1a", color:"#000", padding:"5px 18px", borderRadius:4, display:"inline-block" }}>S-RANK</motion.span></div></div>);
const TabStatus = () => (<div>{HDR("\u25c8 DEVELOPER STATUS")}<div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px 40px" }}>{[["LOCATION","Shivamogga, India"],["AVAILABILITY","Open to Work"],["TITLE","Full Stack Engineer"],["JOB CLASS","Full Stack AI Engineer"]].map(([k,v]) => (<div key={k}><p style={{ ...RJ, textTransform:"uppercase" as const, fontSize:10, letterSpacing:"0.28em", color:"#6060a0", marginBottom:5 }}>{k}</p><p style={{ ...IN, fontSize:"0.95rem", color:"#c8caf0" }}>{v}</p></div>))}<div><p style={{ ...RJ, textTransform:"uppercase" as const, fontSize:10, letterSpacing:"0.28em", color:"#6060a0", marginBottom:5 }}>RANK</p><motion.span animate={{ boxShadow:["0 0 10px rgba(255,107,26,0.4)","0 0 28px rgba(255,107,26,0.8)","0 0 10px rgba(255,107,26,0.4)"] }} transition={{ duration:2, repeat:Infinity }} style={{ ...RJ, fontWeight:800, fontSize:12, letterSpacing:"0.2em", background:"#ff6b1a", color:"#000", padding:"4px 14px", borderRadius:4, display:"inline-block" }}>S-RANK</motion.span></div><div><p style={{ ...RJ, textTransform:"uppercase" as const, fontSize:10, letterSpacing:"0.28em", color:"#6060a0", marginBottom:5 }}>STATUS</p><div style={{ display:"flex", alignItems:"center", gap:8 }}><motion.span animate={{ boxShadow:["0 0 4px #4ade80","0 0 12px #4ade80","0 0 4px #4ade80"] }} transition={{ duration:2, repeat:Infinity }} style={{ width:9, height:9, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} /><span style={{ ...RJ, fontWeight:700, fontSize:13, color:"#4ade80" }}>ACTIVE</span></div></div></div></div>);
const TabAbility = ({ active }: { active: boolean }) => (<div>{HDR("\u25c8 ABILITY SCORES")}{STATS.map((s,i) => (<div key={s.label} style={{ marginBottom:14 }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ ...RJ, textTransform:"uppercase" as const, fontSize:11, letterSpacing:"0.15em", color:"#6060a0" }}>{s.label}</span><span style={{ ...RJ, fontSize:12, fontWeight:700, color:s.color }}>{s.value}</span></div><div style={{ height:4, background:"#1a1a35", borderRadius:2, overflow:"hidden" }}><motion.div style={{ height:"100%", background:s.color, borderRadius:2, boxShadow:`0 0 8px ${s.color}` }} initial={{ width:"0%" }} animate={{ width:active?`${s.value}%`:"0%" }} transition={{ duration:1.0, delay:i*0.08, ease:[0.16,1,0.3,1] }} /></div></div>))}</div>);
const TabTraining = () => (<div>{HDR("\u25c8 TRAINING RECORDS")}{[{ degree:"B.E. Computer Science (Data Science)", school:"PESITM, Shivamogga", info:"2023 \u25c6 Expected May 2027 \u25c6 CGPA 8.2", border:"#a855f7" },{ degree:"Pre-University Course (PCMB)", school:"Sri Vidyabharathi PU College, Shivamogga", info:"Completed 2023 \u25c6 81%", border:"#6b7cff" },{ degree:"SSLC (10th Standard)", school:"Sri Ramakrishna School, Shivamogga", info:"Completed 2021 \u25c6 85%", border:"#6b7cff" }].map(c => (<div key={c.degree} style={{ background:"rgba(17,17,48,0.8)", border:"1px solid #1a1a35", borderLeft:`3px solid ${c.border}`, borderRadius:4, padding:"18px 22px", marginBottom:14 }}><p style={{ ...IN, fontWeight:700, fontSize:"0.92rem", color:"#fff", marginBottom:4 }}>{c.degree}</p><p style={{ ...IN, fontSize:"0.8rem", color:"#6060a0", marginBottom:8 }}>{c.school}</p><p style={{ ...RJ, fontSize:"0.72rem", color:c.border }}>{c.info}</p></div>))}</div>);
const LEARNING_ITEMS = [
  { label: "LangChain",      color: "#a855f7" },
  { label: "System Design",  color: "#6b7cff" },
  { label: "Rust",           color: "#ff6b1a" },
];

const TabBiography = ({ active }: { active: boolean }) => { const n1=useCountUp(5,0,active); const n2=useCountUp(2,0,active); const n3=useCountUp(8.2,1,active); return (<div>{HDR("\u25c8 OVERVIEW")}<div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>{[{val:`${n1}+`,label:"PROJECTS BUILT"},{val:`${n2}x`,label:"HACKATHON FINALIST"},{val:n3,label:"CGPA"}].map(it => (<div key={it.label} style={{ background:"rgba(17,17,48,0.8)", border:"1px solid #1a1a35", borderRadius:4, padding:"18px 12px", textAlign:"center" as const }}><p style={{ ...RJ, fontWeight:800, fontSize:"2rem", color:"#6b7cff", lineHeight:1 }}>{it.val}</p><p style={{ ...RJ, fontSize:9, letterSpacing:"0.15em", color:"#6060a0", marginTop:7 }}>{it.label}</p></div>))}</div><p style={{ ...IN, fontSize:"0.85rem", color:"#6060a0", lineHeight:1.8, marginBottom:20 }}>Final-year CS (Data Science) student passionate about building AI-powered products and full-stack systems. SIH 2024 Finalist. Hackfest Top 10. Always leveling up.</p>

  {/* Currently Learning */}
  <div style={{ marginBottom: 20 }}>
    <p style={{ ...RJ, fontSize: 10, letterSpacing: "0.28em", color: "#6b7cff", textTransform: "uppercase" as const, marginBottom: 10, textAlign: "center" as const }}>◈ CURRENTLY LEARNING ◈</p>
    <div style={{ height: 1, background: "rgba(107,124,255,0.15)", marginBottom: 14 }} />
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
      {LEARNING_ITEMS.map(item => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7, background: `${item.color}14`, border: `1px solid ${item.color}4d`, borderRadius: 20, padding: "6px 16px" }}>
          <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, display: "inline-block", boxShadow: `0 0 5px ${item.color}` }} />
          <span style={{ ...RJ, fontSize: "0.7rem", letterSpacing: "0.15em", color: item.color, textTransform: "uppercase" as const }}>{item.label}</span>
        </div>
      ))}
    </div>
  </div>

  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>{[{rank:"A-RANK",rc:"#ff6b1a",rt:"#000",title:"Full Stack Development",tags:"React \u00b7 Next.js \u00b7 Node.js \u00b7 FastAPI"},{rank:"A-RANK",rc:"#ff6b1a",rt:"#000",title:"AI & Machine Learning",tags:"ML \u00b7 NLP \u00b7 Generative AI \u00b7 Azure ML"},{rank:"B-RANK",rc:"#6b7cff",rt:"#fff",title:"Data Science & Analytics",tags:"Pandas \u00b7 NumPy \u00b7 Power BI \u00b7 Tableau"},{rank:"B-RANK",rc:"#6b7cff",rt:"#fff",title:"Blockchain & Security",tags:"MongoDB \u00b7 Blockchain \u00b7 Azure Pipeline"}].map(c => (<div key={c.title} style={{ background:"rgba(17,17,48,0.8)", border:"1px solid #1a1a35", borderRadius:4, padding:"14px 16px" }} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=c.rc;}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#1a1a35";}}><span style={{ display:"inline-block", background:c.rc, color:c.rt, ...RJ, fontWeight:700, fontSize:9, letterSpacing:"0.15em", padding:"2px 8px", borderRadius:3, marginBottom:8 }}>{c.rank}</span><p style={{ ...IN, fontWeight:700, fontSize:"0.82rem", color:"#fff", marginBottom:5 }}>{c.title}</p><p style={{ ...IN, fontSize:"0.72rem", color:"#6060a0" }}>{c.tags}</p></div>))}</div></div>); };

const cornerStyles: React.CSSProperties[] = [
  { top:0, left:0, borderTop:"2px solid #6b7cff", borderLeft:"2px solid #6b7cff" },
  { top:0, right:0, borderTop:"2px solid #6b7cff", borderRight:"2px solid #6b7cff" },
  { bottom:0, left:0, borderBottom:"2px solid #6b7cff", borderLeft:"2px solid #6b7cff" },
  { bottom:0, right:0, borderBottom:"2px solid #6b7cff", borderRight:"2px solid #6b7cff" },
];

const EASE_CURVE: [number,number,number,number] = [0.22, 1, 0.36, 1];

const frameVariants = {
  closed: { scaleX: 0.08, scaleY: 0, opacity: 0 },
  open: {
    scaleX: 1, scaleY: 1, opacity: 1,
    transition: {
      scaleX: { duration: 0.25, ease: EASE_CURVE },
      scaleY: { duration: 0.45, ease: EASE_CURVE, delay: 0.2 },
      opacity: { duration: 0.1 },
    },
  },
  hovered: {
    y: -4,
    boxShadow: "0 20px 60px rgba(107,124,255,0.12), 0 0 30px rgba(107,124,255,0.1), inset 0 0 30px rgba(107,124,255,0.03)",
    borderColor: "rgba(107,124,255,0.35)",
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function StatusWindow() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [frameHovered, setFrameHovered] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const frameRef = useRef(null);
  const isInView = useInView(frameRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setShowFlash(true);
      const t = setTimeout(() => setShowFlash(false), 500);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return <TabProfile />;
      case "status": return <TabStatus />;
      case "ability": return <TabAbility active={true} />;
      case "training": return <TabTraining />;
      case "biography": return <TabBiography active={true} />;
      default: return null;
    }
  };

  return (
    <section style={{ background:"#0a0a14", padding:"60px 40px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto 24px" }}>
        <p style={{ ...RJ, fontSize:11, letterSpacing:"0.35em", color:"#6b7cff", textTransform:"uppercase" as const }}>\u25c8 DEVELOPER PROFILE</p>
      </div>

      <motion.div
        ref={frameRef}
        className="group"
        variants={frameVariants}
        initial="closed"
        animate={isInView ? "open" : "closed"}
        whileHover="hovered"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          height: "75vh",
          minHeight: 560,
          borderRadius: 12,
          overflow: "hidden",
          background: "#080510",
          border: frameHovered ? "1px solid rgba(107,124,255,0.55)" : "1px solid rgba(107,124,255,0.15)",
          boxShadow: frameHovered
            ? "0 32px 80px rgba(0,0,0,0.6), 0 16px 40px rgba(0,0,0,0.4), 0 0 40px rgba(107,124,255,0.18), 0 0 12px rgba(107,124,255,0.10)"
            : "0 4px 20px rgba(0,0,0,0.3)",
          transform: frameHovered ? "translateY(-10px)" : "translateY(0px)",
          transition: "border 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)",
          transformOrigin: "center center",
        }}
        onMouseEnter={() => setFrameHovered(true)}
        onMouseLeave={() => setFrameHovered(false)}
      >
        {/* Corner ornaments */}
        {cornerStyles.map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5 }}
            transition={{ duration: 0.3, delay: 0.65 }}
            className="group-hover:w-8 group-hover:h-8 group-hover:border-[#ff6b1a] transition-all duration-300"
            style={{
              position: "absolute", width: 20, height: 20, ...s, zIndex: 20, opacity: 0.7,
              transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
            }}
          />
        ))}

        {/* Scan lines */}
        <div
          className="group-hover:opacity-[0.025]"
          style={{
            position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
            background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 4px)",
            opacity: 0.012, transition: "opacity 0.3s ease",
          }}
        />

        {/* Hover scan overlay */}
        <motion.div
          animate={{ opacity: frameHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none",
            background: "linear-gradient(180deg, transparent 0%, rgba(107,124,255,0.02) 50%, transparent 100%)",
          }}
        />



        {/* Open flash */}
        {showFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(107,124,255,0.06)",
              zIndex: 50, pointerEvents: "none",
            }}
          />
        )}

        {/* Inner content — fades in after frame opens */}
        <motion.div
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          style={{ position: "absolute", inset: 0 }}
        >
          {/* Character image */}
          <img
            src={characterImg}
            alt="Jeevan K G"
            style={{
              position: "absolute", left: "50%", transform: "translateX(-65%)",
              bottom: "-5%", height: "115%", width: "auto", maxWidth: "none",
              objectFit: "contain", objectPosition: "bottom center", zIndex: 2, display: "block",
            }}
          />

          {/* Atmospheric glow — reacts to hover */}
          <motion.div
            animate={{ opacity: frameHovered ? 1 : 0.6, scale: frameHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
              background: "radial-gradient(ellipse at 50% 65%, rgba(107,124,255,0.10) 0%, rgba(168,85,247,0.06) 40%, transparent 68%)",
            }}
          />

          {/* Edge fade overlays */}
          <div style={{ position:"absolute", left:0, top:0, width:220, height:"100%", zIndex:4, pointerEvents:"none", background:"linear-gradient(to right, rgba(8,5,20,0.88) 0%, rgba(8,5,20,0.55) 55%, transparent 100%)" }} />
          <div style={{ position:"absolute", right:0, top:0, width:"52%", height:"100%", zIndex:4, pointerEvents:"none", background:"linear-gradient(to left, rgba(8,5,20,0.97) 0%, rgba(8,5,20,0.93) 55%, rgba(8,5,20,0.55) 85%, transparent 100%)" }} />

          {/* Left nav */}
          <div style={{ position:"absolute", left:0, top:0, width:200, height:"100%", zIndex:10, padding:"48px 0 48px 36px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <span style={{ ...IN, fontWeight:800, fontSize:"1.7rem", color:"#fff", display:"block", marginBottom:32 }}>ABOUT</span>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  ...RJ, textTransform:"uppercase" as const, fontSize:12, letterSpacing:"0.18em",
                  padding:"9px 0 9px 14px",
                  borderLeft: activeTab === t.id ? "2px solid #ff6b1a" : "2px solid transparent",
                  color: activeTab === t.id ? "#ffffff" : "rgba(255,255,255,0.38)",
                  background:"transparent", border:"none",
                  cursor:"pointer", display:"block", width:"100%", textAlign:"left" as const,
                  marginBottom:4, transition:"all 0.2s ease", whiteSpace:"nowrap" as const,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; if (activeTab !== t.id) { el.style.color = "rgba(255,255,255,0.72)"; el.style.borderLeftColor = "rgba(255,107,26,0.35)"; } }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if (activeTab !== t.id) { el.style.color = "rgba(255,255,255,0.38)"; el.style.borderLeftColor = "transparent"; } }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Right content panel */}
          <div style={{ position:"absolute", right:0, top:0, width:"48%", height:"100%", zIndex:10, padding:"48px 52px", overflowY:"auto", display:"flex", flexDirection:"column", justifyContent:"center", background:"transparent" }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.28 }}>
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
