import { frontendRole } from "./roles/frontend";
import { backendRole } from "./roles/backend";
import { fullstackRole } from "./roles/fullstack";
import { aiRole } from "./roles/ai";
import { devopsRole } from "./roles/devops";

const roleMap = {
  frontend: frontendRole,
  backend: backendRole,
  fullstack: fullstackRole,
  ai: aiRole,
  devops: devopsRole,
};

export function analyzeResume(text, roleKey) {
  const role = roleMap[roleKey];
  if (!role) return null;

  const lower = text.toLowerCase();

  // Skill Detection
  function matchSkills(text, skills) {
    return skills.filter(skill => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      return regex.test(text);
    });
  }

  // Detect skills
  const detectedCore = matchSkills(text, role.coreSkills);
  const detectedOptional = matchSkills(text, role.optionalSkills);

  const missingCore = role.coreSkills.filter(
    skill => !detectedCore.includes(skill)
  );

  const missingOptional = role.optionalSkills.filter(
    skill => !detectedOptional.includes(skill)
  );

  const coreAlignment =(detectedCore.length / role.coreSkills.length) * 100;

  const optionalAlignment =(detectedOptional.length / role.optionalSkills.length) * 100;

  // Weighted scoring
  const coreScore =(detectedCore.length / role.coreSkills.length) * 3;

  const optionalScore =(detectedOptional.length / role.optionalSkills.length) * 1;

  const skillScore = coreScore + optionalScore;

  // Strong Verb Check
  const strongVerbFound = role.strongVerbs.some(v =>
    lower.includes(v)
  );

  const verbScore = strongVerbFound ? 2 : 0;

  // Impact Word Check
  const impactFound = role.impactWords.some(w =>
    lower.includes(w)
  );

  const impactScore = impactFound ? 2 : 0;

  // Metric Check
  const hasMetrics = /\d/.test(text);
  const metricScore = hasMetrics ? 2 : 0;

  let totalScore = skillScore + verbScore + impactScore + metricScore;
  if (totalScore > 10) totalScore = 10;

  const suggestions = [];

  if (!hasMetrics) {
    suggestions.push("Add measurable metrics (%, time, cost impact).");
  }

  if (!strongVerbFound) {
    suggestions.push("Use stronger action verbs (e.g., built, optimized, engineered).");
  }

  if (missingCore.length > 0) {
    suggestions.push("Include core skills relevant to the selected role.");
  }

  const rewrite =
    "Built scalable application using modern stack, improving performance and reliability.";

  return {
  score: Math.round(totalScore),
  coreAlignment: Math.round(coreAlignment),
  optionalAlignment: Math.round(optionalAlignment),
  detectedCore,
  detectedOptional,
  missingCore,
  missingOptional,
  hasMetrics,
  strongVerbFound,
  impactFound,
  suggestions,
  rewrite,
  };
}