code = r'''import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const TABS = [{ id: "profile", label: "PLAYER PROFILE" },{ id: "status", label: "STATUS" },{ id: "ability", label: "ABILITY SCORES" },{ id: "training", label: "TRAINING" },{ id: "biography", label: "BIOGRAPHY" }] as const;
type TabId = typeof TABS[number]["id"];
const STATS = [{ label: "FRONTEND", value: 92, color: "#6b7cff" },{ label: "BACKEND", value: 85, color: "#2dd4bf" },{ lab