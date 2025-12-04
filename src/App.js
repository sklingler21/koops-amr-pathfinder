import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  BarChart2,
  Check,
  Download,
  ChevronRight,
} from "lucide-react";

// --- Brand Colors from PDF ---
const COLORS = {
  primaryBlue: "#146084", // Pantone 7700C
  accentRed: "#E1513B", // Pantone 7625C
  secondaryBlue: "#7BCFDE", // Pantone 630C
  darkGrey: "#424242",
  lightGrey: "#DEDEDE",
  white: "#FFFFFF",
  bg: "#F8FAFC", // Slightly cooler grey for app background
  blueprintGrid: "rgba(20, 96, 132, 0.05)",
};

// --- Mock Data ---
const questions = {
  step1: {
    title: "IT & Data Infrastructure",
    subtitle: "Connectivity is the backbone of AMR fleets.",
    items: [
      "Do you have a stable, facility-wide Wi-Fi or industrial network?",
      "Is there a centralized system (WMS / ERP / MES) tracking inventory?",
      "Do you have IT resources to support integration and cybersecurity?",
    ],
  },
  step2: {
    title: "Layout & Material Flow",
    subtitle: "AMRs need predictable paths and clear environments.",
    items: [
      "How well-documented is your current material flow?",
      "Is your floor layout structured with consistent paths?",
      "How predictable are your material flow volumes?",
    ],
  },
  step3: {
    title: "Safety & Change Management",
    subtitle: "Technology succeeds when people and safety come first.",
    items: [
      "Do you have an established safety program for mobile equipment?",
      "Is there a structured process for training operators on new tech?",
      "How open are frontline leaders and operators to automation?",
    ],
  },
  step4: {
    title: "KPIs, ROI & Leadership Alignment",
    subtitle: "Define success before you deploy.",
    items: [
      "Do you currently track key KPIs relevant to AMRs?",
      "Do you have a clear target for what AMRs should achieve?",
      "Is there leadership support to explore AMRs?",
    ],
  },
};

const KoopsLogo = () => (
  <div className="flex items-center gap-3 select-none">
    <div
      className="text-white flex items-center justify-center font-bold text-lg rounded-sm shadow-sm"
      style={{
        backgroundColor: COLORS.primaryBlue,
        width: "32px",
        height: "32px",
      }}
    >
      K
    </div>
    <div className="flex flex-col leading-none">
      <span
        className="font-extrabold tracking-wide text-lg"
        style={{ color: COLORS.primaryBlue }}
      >
        KOOPS
      </span>
      <span
        className="uppercase font-bold"
        style={{
          color: COLORS.darkGrey,
          fontSize: "10px",
          letterSpacing: "0.2em",
        }}
      >
        Automation Systems
      </span>
    </div>
  </div>
);

// --- Reusable Components ---

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}
  >
    {children}
  </div>
);

const BlueprintBackground = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `linear-gradient(${COLORS.blueprintGrid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.blueprintGrid} 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }}
  />
);

export default function KoopsPrototype() {
  const [currentScreen, setCurrentScreen] = useState("landing");
  const [hoveredRating, setHoveredRating] = useState(null);

  // Initialize state with default 3s for all 12 questions (3 questions * 4 steps)
  // Format: 'stepX-questionIndex': value
  const [selections, setSelections] = useState({
    "step1-0": 3,
    "step1-1": 3,
    "step1-2": 3,
    "step2-0": 3,
    "step2-1": 3,
    "step2-2": 3,
    "step3-0": 3,
    "step3-1": 3,
    "step3-2": 3,
    "step4-0": 3,
    "step4-1": 3,
    "step4-2": 3,
  });

  const handleSelection = (step, idx, val) => {
    setSelections((prev) => ({
      ...prev,
      [`step${step}-${idx}`]: val,
    }));
  };

  const calculateScore = () => {
    const values = Object.values(selections);
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const max = values.length * 5; // 60
    return {
      sum,
      percent: Math.round((sum / max) * 100),
    };
  };

  const scoreData = calculateScore();

  // --- Screen Components ---

  const LandingPage = () => (
    <div className="h-full flex flex-col bg-white overflow-hidden relative">
      <nav className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/90 backdrop-blur-sm z-20">
        <KoopsLogo />
        <div className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          FS25 PIM 804 – Session 3
        </div>
      </nav>

      <div className="flex-1 flex flex-col md:flex-row z-10">
        {/* Left Content */}
        <div className="flex-1 p-12 md:p-20 flex flex-col justify-center relative">
          <div className="max-w-xl">
            <div
              className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider uppercase text-white rounded-full"
              style={{ backgroundColor: COLORS.secondaryBlue }}
            >
              Assessment Tool
            </div>
            <h1
              className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
              style={{ color: COLORS.primaryBlue }}
            >
              Is Your Facility <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${COLORS.accentRed}, #FF7D66)`,
                }}
              >
                Ready for AMRs?
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 font-light leading-relaxed">
              Take our 8-minute diagnostic to understand your readiness across
              IT, layout, material flow, and safety.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <button
                onClick={() => setCurrentScreen("step1")}
                className="group px-8 py-4 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg"
                style={{ backgroundColor: COLORS.accentRed }}
              >
                Start Diagnostic
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <div className="text-xs text-gray-400 font-medium">
                <span className="block">NO LOGIN REQUIRED</span>
                <span className="block">INSTANT RESULTS</span>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 grid grid-cols-3 gap-6">
              <div>
                <h4
                  className="font-bold text-2xl"
                  style={{ color: COLORS.primaryBlue }}
                >
                  8m
                </h4>
                <p className="text-xs text-gray-500 font-medium">Avg. Time</p>
              </div>
              <div>
                <h4
                  className="font-bold text-2xl"
                  style={{ color: COLORS.primaryBlue }}
                >
                  4
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  Key Dimensions
                </p>
              </div>
              <div>
                <h4
                  className="font-bold text-2xl"
                  style={{ color: COLORS.primaryBlue }}
                >
                  ROI
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  Estimates Included
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="md:w-5/12 relative bg-gray-50 overflow-hidden flex items-center justify-center border-l border-gray-100">
          <BlueprintBackground />
          <div className="relative z-10 text-center p-8">
            <div className="w-80 h-80 mx-auto bg-white rounded-full flex flex-col items-center justify-center shadow-2xl mb-8 relative border-4 border-white">
              <div
                className="absolute inset-0 rounded-full opacity-10 animate-pulse"
                style={{ backgroundColor: COLORS.secondaryBlue }}
              ></div>
              <BarChart2
                size={80}
                style={{ color: COLORS.primaryBlue }}
                strokeWidth={1.5}
              />
              <div className="mt-4 text-center">
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">
                  Koops Automation
                </p>
                <p
                  className="font-bold text-xl"
                  style={{ color: COLORS.primaryBlue }}
                >
                  Pathfinder
                </p>
              </div>
            </div>

            {/* Floating Badges */}
            <div
              className="absolute top-1/4 right-10 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-xs font-bold text-gray-700">IT Ready</span>
            </div>
            <div
              className="absolute bottom-1/3 left-10 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            >
              <AlertTriangle size={16} className="text-yellow-500" />
              <span className="text-xs font-bold text-gray-700">
                Safety Check
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AssessmentScreen = ({ step, nextStep, prevStep, data, percent }) => (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* Top Bar */}
      <nav className="bg-white shadow-sm z-20 sticky top-0">
        <div className="px-6 py-4 flex justify-between items-center">
          <KoopsLogo />
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400 hidden md:block">
              PROGRESS
            </span>
            <div className="w-32 md:w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-700 ease-out rounded-full"
                style={{
                  width: `${percent}%`,
                  backgroundColor: COLORS.accentRed,
                }}
              ></div>
            </div>
            <span
              className="text-xs font-bold"
              style={{ color: COLORS.primaryBlue }}
            >
              {Math.round(percent)}%
            </span>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto relative">
        <BlueprintBackground />

        <div className="max-w-4xl mx-auto p-6 md:p-12 relative z-10">
          {/* Section Header */}
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              Phase {step} of 4
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold mt-4 mb-2"
              style={{ color: COLORS.primaryBlue }}
            >
              {data.title}
            </h2>
            <p className="text-lg text-gray-500 font-medium">{data.subtitle}</p>
          </div>

          {/* Question Cards */}
          <div className="space-y-6">
            {data.items.map((q, idx) => {
              const questionId = `step${step}-${idx}`;
              const currentVal = selections[questionId];

              return (
                <Card
                  key={idx}
                  className="p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-lg md:text-xl font-medium text-gray-800 mb-6 leading-snug">
                    {q}
                  </p>

                  {/* Rating Scale */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Not in place
                      </span>

                      <div className="flex gap-3 md:gap-6">
                        {[1, 2, 3, 4, 5].map((val) => {
                          const isSelected = val === currentVal;
                          return (
                            <button
                              key={val}
                              onClick={() => handleSelection(step, idx, val)}
                              onMouseEnter={() =>
                                setHoveredRating(`${idx}-${val}`)
                              }
                              onMouseLeave={() => setHoveredRating(null)}
                              className={`
                              w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200
                              ${
                                isSelected
                                  ? "shadow-lg scale-110 ring-4 ring-blue-50"
                                  : "bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300 hover:scale-105"
                              }
                            `}
                              style={{
                                backgroundColor: isSelected
                                  ? COLORS.primaryBlue
                                  : hoveredRating === `${idx}-${val}`
                                  ? "#F0F9FF"
                                  : "white",
                                color: isSelected ? "white" : undefined,
                                borderColor: isSelected
                                  ? "transparent"
                                  : undefined,
                              }}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>

                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Fully in place
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center mt-12 mb-20">
            {prevStep ? (
              <button
                onClick={() => setCurrentScreen(prevStep.screen)}
                className="group px-6 py-3 text-gray-500 font-bold hover:text-gray-800 transition-colors flex items-center gap-2"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />{" "}
                Back
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={() => setCurrentScreen(nextStep.screen)}
              className="px-10 py-4 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center gap-3 transform active:scale-95"
              style={{ backgroundColor: COLORS.accentRed }}
            >
              {nextStep.label || "Next Step"} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ResultsPage = () => {
    // Dynamic status based on score
    let status = {
      text: "Needs Preparation",
      color: "#EAB308",
      bg: "#FEF9C3",
      desc: "Foundation Building Required",
    };
    if (scoreData.percent >= 75)
      status = {
        text: "Pilot Ready",
        color: "#16A34A",
        bg: "#DCFCE7",
        desc: "Ready for Implementation",
      };
    if (scoreData.percent <= 40)
      status = {
        text: "Not Ready",
        color: "#DC2626",
        bg: "#FEE2E2",
        desc: "Significant Gaps Identified",
      };

    return (
      <div className="h-full flex flex-col bg-gray-50">
        <nav className="p-6 bg-white shadow-sm flex justify-between items-center z-20">
          <KoopsLogo />
          <button
            onClick={() => {
              // Reset logic could go here
              setCurrentScreen("landing");
            }}
            className="text-sm font-medium text-gray-500 hover:text-gray-800"
          >
            Start Over
          </button>
        </nav>

        <div className="flex-1 overflow-y-auto">
          <div className="bg-gray-800 text-white pt-12 pb-24 px-6 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle, ${COLORS.secondaryBlue} 2px, transparent 2px)`,
                backgroundSize: "30px 30px",
              }}
            ></div>
            <h1 className="text-3xl font-bold relative z-10 mb-2">
              Diagnostic Results
            </h1>
            <p className="text-gray-400 relative z-10">
              Analysis based on your inputs
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-6 -mt-16 pb-12 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Score Card */}
            <Card className="md:col-span-2 overflow-hidden flex flex-col shadow-xl border-0">
              <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row items-center gap-8">
                {/* Gauge Visual */}
                <div className="relative w-48 h-24 mt-4">
                  <div className="absolute bottom-0 w-full h-full bg-gray-100 rounded-t-full overflow-hidden">
                    {/* The Fill */}
                    <div
                      className="absolute bottom-0 left-0 w-full h-full origin-bottom transform transition-transform duration-1000 ease-out"
                      style={{
                        backgroundColor: status.color,
                        // Map 0-100% to -90deg to 90deg rotation approximately, simplified here:
                        // 0% = -180deg (invisible), 50% = -90deg (half), 100% = 0deg (full)
                        // Visual fix: The half circle gauge logic requires mapping percent to rotation.
                        // Let's assume -180deg is empty, 0deg is full.
                        // Actually easier: standard rotate(-180deg + (percent * 1.8)deg)
                        transform: `rotate(${
                          -180 + scoreData.percent * 1.8
                        }deg)`,
                        transformOrigin: "bottom center",
                      }}
                    ></div>
                  </div>
                  {/* Gauge Mask */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-white rounded-t-full flex items-end justify-center pb-2">
                    <span className="text-3xl font-extrabold text-gray-800">
                      {scoreData.sum}
                    </span>
                    <span className="text-xs font-bold text-gray-400 mb-1 ml-1">
                      /60
                    </span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide mb-3"
                    style={{
                      backgroundColor: status.bg,
                      color:
                        status.color === "#EAB308" ? "#854D0E" : status.color,
                    }} // visual fix for yellow text contrast
                  >
                    <AlertTriangle size={14} />
                    {status.text}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {status.desc}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Based on your score of <strong>{scoreData.percent}%</strong>
                    ,{" "}
                    {scoreData.percent < 75
                      ? "key fundamentals need work before piloting AMRs."
                      : "you are well-positioned for a successful pilot."}
                  </p>
                </div>
              </div>

              <div className="p-8 bg-gray-50 flex-1 flex flex-col justify-center">
                <div className="flex flex-col gap-3">
                  <button
                    className="w-full py-4 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 text-lg"
                    style={{ backgroundColor: COLORS.primaryBlue }}
                  >
                    <Download size={20} /> Download Prep Checklist
                  </button>
                  <button
                    onClick={() => setCurrentScreen("report")}
                    className="w-full py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-all flex justify-center items-center gap-2"
                  >
                    <FileText size={20} /> Preview Full Report
                  </button>
                </div>
              </div>
            </Card>

            {/* Breakdown Column */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">
                Score Breakdown
              </h3>

              <Card className="p-4 flex items-start gap-3 border-l-4 border-green-500">
                <div className="p-2 bg-green-50 rounded-full text-green-600">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">
                    Safety & Culture
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Strong leadership buy-in detected.
                  </p>
                </div>
              </Card>

              <Card className="p-4 flex items-start gap-3 border-l-4 border-red-500">
                <div className="p-2 bg-red-50 rounded-full text-red-600">
                  <XCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">
                    IT Infrastructure
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Wi-Fi gaps & siloed WMS data.
                  </p>
                </div>
              </Card>

              <Card className="p-4 flex items-start gap-3 border-l-4 border-yellow-500">
                <div className="p-2 bg-yellow-50 rounded-full text-yellow-600">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">
                    Material Flow
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Standardization needed.
                  </p>
                </div>
              </Card>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center mt-6">
                <p className="text-xs text-blue-800 font-medium mb-2">
                  Need an expert opinion?
                </p>
                <button
                  className="text-xs font-bold underline decoration-2"
                  style={{ color: COLORS.primaryBlue }}
                >
                  Contact Koops Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReportPreview = () => (
    <div className="h-full bg-gray-700 overflow-y-auto p-4 md:p-8 flex justify-center relative">
      <button
        onClick={() => setCurrentScreen("results")}
        className="fixed top-4 right-4 z-50 bg-white/10 text-white backdrop-blur-md px-4 py-2 text-sm rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2"
      >
        <XCircle size={16} /> Close Preview
      </button>

      {/* PDF Paper Container */}
      <div
        className="bg-white shadow-2xl relative text-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ width: "100%", maxWidth: "800px", minHeight: "1100px" }}
      >
        {/* Header */}
        <div
          className="p-12 pb-6 border-b-4"
          style={{ borderColor: COLORS.accentRed }}
        >
          <div className="flex justify-between items-end">
            <div>
              <h1
                className="text-4xl font-extrabold mb-1"
                style={{ color: COLORS.primaryBlue }}
              >
                AMR Readiness
              </h1>
              <p className="text-xl font-light text-gray-500">
                Facility Diagnostic Report
              </p>
            </div>
            <div className="opacity-80 scale-90 origin-bottom-right">
              <KoopsLogo />
            </div>
          </div>
          <div className="mt-8 flex gap-6 text-xs text-gray-400 font-mono">
            <span>DATE: OCT 24, 2025</span>
            <span>REF: KOOPS-AMR-25-X</span>
            <span>FACILITY: MANUFACTURING A</span>
          </div>
        </div>

        <div className="p-12">
          {/* Exec Summary */}
          <div className="bg-gray-50 p-8 rounded-lg mb-10 border border-gray-100">
            <h3
              className="font-bold text-lg mb-4 flex items-center gap-2"
              style={{ color: COLORS.primaryBlue }}
            >
              <FileText size={18} /> Executive Summary
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This diagnostic suggests your facility is currently in the{" "}
              <strong>"Needs Prep"</strong> range. While you exhibit strong
              safety protocols and leadership buy-in, significant gaps in IT
              infrastructure and material flow standardization present risks to
              a successful AMR deployment.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Overall Status
                </span>
                <span className="font-bold text-xl text-yellow-600">
                  Needs Prep
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Rec. Action
                </span>
                <span className="font-bold text-xl text-gray-800">
                  6-Wk Sprint
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Pilot Timing
                </span>
                <span className="font-bold text-xl text-gray-800">
                  3-6 Months
                </span>
              </div>
            </div>
          </div>

          {/* Assessment Table */}
          <div className="mb-12">
            <h3
              className="font-bold text-lg mb-5 border-l-4 pl-3"
              style={{
                borderColor: COLORS.secondaryBlue,
                color: COLORS.darkGrey,
              }}
            >
              Detailed Assessment
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                    <th className="p-4 border-b">Dimension</th>
                    <th className="p-4 border-b">Score</th>
                    <th className="p-4 border-b">Status</th>
                    <th className="p-4 border-b">Analyst Note</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-800">IT & Data</td>
                    <td className="p-4">2.5</td>
                    <td className="p-4">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                        CRITICAL
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      Wi-Fi coverage spotty in warehouse.
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-800">
                      Layout & Flow
                    </td>
                    <td className="p-4">3.0</td>
                    <td className="p-4">
                      <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                        EMERGING
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      Aisles clear, but paths vary by shift.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-800">
                      Safety & Change
                    </td>
                    <td className="p-4">4.0</td>
                    <td className="p-4">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        STRONG
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      Excellent safety culture observed.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ROI Section */}
          <div className="mb-12">
            <h3
              className="font-bold text-lg mb-5 border-l-4 pl-3"
              style={{
                borderColor: COLORS.secondaryBlue,
                color: COLORS.darkGrey,
              }}
            >
              Projected ROI Impact
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-600">
                    Labor Savings
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: COLORS.primaryBlue }}
                  >
                    25%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full w-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: COLORS.primaryBlue,
                      width: "75%",
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Reduction in manual material handling hours for targeted
                  tugger routes.
                </p>
              </div>
              <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-100">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-600">
                    Throughput
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: COLORS.secondaryBlue }}
                  >
                    15%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full w-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: COLORS.secondaryBlue,
                      width: "45%",
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Increase in line-side delivery consistency and uptime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-auto bg-gray-900 text-white p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-2">Take the Next Step</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
              Move from "Needs Prep" to "Pilot Ready" with our engineering team.
            </p>
            <button
              className="px-8 py-3 rounded font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
              style={{ backgroundColor: COLORS.accentRed }}
            >
              Schedule 60-Min Review
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen font-sans text-gray-800 overflow-hidden bg-gray-50">
      {currentScreen === "landing" && <LandingPage />}
      {currentScreen === "step1" && (
        <AssessmentScreen
          step={1}
          data={questions.step1}
          nextStep={{ screen: "step2", percent: 50 }}
          prevStep={{ screen: "landing", percent: 0 }}
          percent={25}
        />
      )}
      {currentScreen === "step2" && (
        <AssessmentScreen
          step={2}
          data={questions.step2}
          nextStep={{ screen: "step3", percent: 75 }}
          prevStep={{ screen: "step1", percent: 25 }}
          percent={50}
        />
      )}
      {currentScreen === "step3" && (
        <AssessmentScreen
          step={3}
          data={questions.step3}
          nextStep={{ screen: "step4", percent: 100 }}
          prevStep={{ screen: "step2", percent: 50 }}
          percent={75}
        />
      )}
      {currentScreen === "step4" && (
        <AssessmentScreen
          step={4}
          data={questions.step4}
          nextStep={{ screen: "results", percent: 100, label: "View Results" }}
          prevStep={{ screen: "step3", percent: 75 }}
          percent={100}
        />
      )}
      {currentScreen === "results" && <ResultsPage />}
      {currentScreen === "report" && <ReportPreview />}
    </div>
  );
}
