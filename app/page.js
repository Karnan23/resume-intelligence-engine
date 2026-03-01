"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [role, setRole] = useState("frontend");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
    alert("Please enter resume content before analyzing.");
    return;
    }

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, role }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <main className="flex flex-col items-center p-6 min-h-screen bg-neutral-800">
      <h1 className="text-3xl font-bold mb-6">
        Role-Aware Resume Intelligence Engine
      </h1>

      <select
        className="mb-4 p-2 border rounded bg-gray-300 text-black"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="frontend">Frontend Developer</option>
        <option value="backend">Backend Developer</option>
        <option value="fullstack">Full Stack Developer</option>
        <option value="ai">AI / ML Engineer</option>
        <option value="devops">DevOps / Cloud Engineer</option>
      </select>

      <textarea
        className="w-full max-w-xl p-3 border rounded-md bg-black text-white"
        rows="6"
        placeholder="Paste your resume bullet..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="mt-4 px-6 py-2 bg-black text-white rounded-md"
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6 bg-black p-6 rounded-md shadow w-full max-w-xl space-y-3">
          <p><strong className="text-yellow-400">Overall Score:</strong> {result.score}/10</p>

          <p><strong className="text-green-400">Core Skills Detected:</strong>{" "}{result.detectedCore?.join(", ") || "None"}</p>
          
          <p><strong className="text-green-400">Optional Skills Detected:</strong>{" "}{result.detectedOptional?.join(", ") || "None"}</p>
          
          <p><strong className="text-orange-300">Core Alignment:</strong>{" "}{result.coreAlignment}%</p>
          
          <p><strong className="text-red-400">Missing Core Skills:</strong>{" "}{result.missingCore?.join(", ") || "None"}</p>
          
          <p><strong className="text-orange-300">Optional Alignment:</strong>{" "}{result.optionalAlignment}%</p>
          
          <p><strong className="text-red-400">Missing Optional Skills:</strong>{" "}{result.missingOptional?.join(", ") || "None"}</p>

          <p><strong className="text-blue-400">Metrics Present:</strong> {result.hasMetrics ? "Yes" : "No"}</p>

          <p><strong className="text-purple-400">Strong Verb Used:</strong> {result.strongVerbFound ? "Yes" : "No"}</p>

          <p><strong className="text-pink-400">Impact Word Used:</strong> {result.impactFound ? "Yes" : "No"}</p>

          {result.suggestions?.length > 0 && (
            <div>
              <strong className="text-green-400">Suggestions:</strong>
              <ul className="list-disc ml-6">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
    
          {result.rewrite && (
            <div>
              <strong className="text-green-400">Improvement Template:</strong>
              <pre className="bg-gray-800 p-3 rounded mt-2 whitespace-pre-wrap">
                {result.rewrite}
              </pre>
            </div>
          )}
        </div>
      )}
    </main>
  );
}