import React from "react";
import RadialOrbitalTimeline from "./RadialOrbitalTimeline";
import { PROJECTS } from "../constants";
import { Zap } from "lucide-react";

// Convert PROJECTS to timeline format
const convertProjectsToTimeline = () => {
  return PROJECTS.map((project, index) => ({
    id: project.id,
    title: project.title,
    date: `2024 Q${Math.floor(index / 2) + 1}`, // Placeholder dates
    content: project.description,
    category: project.category,
    icon: project.icon || Zap,
    relatedIds: project.relatedIds || [],
    status: (project.status || "completed") as "completed" | "in-progress" | "pending",
    energy: project.energy || 85,
    previewImage: project.previewImage || project.image,
    result: project.result,
  }));
};

const SignatureWork: React.FC = () => {
  const timelineData = convertProjectsToTimeline();

  return <RadialOrbitalTimeline timelineData={timelineData} />;
};

export default SignatureWork;
