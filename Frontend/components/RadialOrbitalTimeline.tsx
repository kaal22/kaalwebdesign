import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link2, Zap, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PROJECTS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: string[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  previewImage: string;
  result: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<string, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Track window size for responsive radius
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
      setPreviewImage(null);
      setPreviewPosition(null);
    }
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (key !== id) {
          newState[key] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<string, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
        setPreviewImage(null);
        setPreviewPosition(null);
      }

      return newState;
    });
  };

  const handleNodeHover = (id: string, e: React.MouseEvent) => {
    // Don't show preview if this item is already expanded
    if (expandedItems[id]) {
      return;
    }
    
    const item = timelineData.find((i) => i.id === id);
    if (item && item.previewImage) {
      setPreviewImage(item.previewImage);
      const rect = e.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Position preview to the right, or left if near right edge
      let x = rect.right + 20;
      if (x + 256 > viewportWidth) {
        x = rect.left - 276; // 256 (width) + 20 (margin)
      }
      
      // Position vertically centered on node, but keep within viewport
      let y = rect.top - 80; // Center the preview on the node
      if (y < 20) y = 20;
      if (y + 160 > viewportHeight - 20) {
        y = viewportHeight - 180; // 160 (height) + 20 (margin)
      }
      
      setPreviewPosition({ x, y });
    }
  };

  const handleNodeLeave = () => {
    if (!expandedItems[activeNodeId || ""]) {
      setPreviewImage(null);
      setPreviewPosition(null);
    }
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: string) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // Circle radius (for the visible ring)
    const circleRadius = isDesktop ? 320 : 200;
    // Icon sizes: mobile w-10 h-10 (40px), desktop w-14 h-14 (56px)
    const iconSize = isDesktop ? 56 : 40;
    // Position icons outside the circle - add half icon size plus some padding
    const iconOffset = iconSize / 2 + 10; // 10px padding outside the circle
    const radius = circleRadius + iconOffset; // Icons sit outside the circle
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity, radius };
  };

  const getRelatedItems = (itemId: string): string[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: string): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-kaal-accent border-kaal-accent";
      case "in-progress":
        return "text-kaal-accent bg-transparent border-kaal-accent";
      case "pending":
        return "text-kaal-muted bg-transparent border-kaal-border";
      default:
        return "text-kaal-muted bg-transparent border-kaal-border";
    }
  };

  return (
    <section
      id="work"
      className="relative w-full min-h-screen bg-transparent overflow-hidden py-24 px-6 md:px-12"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 mb-16 md:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter">
            Signature <span className="text-kaal-accent">Work</span>
          </h2>
          <p className="text-kaal-muted text-xs sm:text-sm font-body uppercase tracking-widest mt-2 sm:mt-4">
            Explore our portfolio →
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-visible">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center Core */}
          <motion.div
            className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-kaal-accent via-orange-500 to-red-500 flex items-center justify-center z-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full border border-kaal-accent/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full border border-kaal-accent/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md"></div>
          </motion.div>

          {/* Orbital Ring - SVG for precise positioning through icon centers */}
          {/* Icons are centered at radius 200px (mobile) or 320px (desktop) */}
          <svg
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${isDesktop ? 640 : 400}px`,
              height: `${isDesktop ? 640 : 400}px`,
            }}
            viewBox={`0 0 ${isDesktop ? 640 : 400} ${isDesktop ? 640 : 400}`}
          >
            <circle
              cx={isDesktop ? 320 : 200}
              cy={isDesktop ? 320 : 200}
              r={isDesktop ? 320 : 200}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          </svg>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon || Zap;

            // Calculate icon size to center it properly
            const iconSize = isDesktop ? 56 : 40; // w-14 h-14 = 56px, w-10 h-10 = 40px
            const iconOffset = iconSize / 2;
            
            const nodeStyle = {
              transform: `translate(calc(50% + ${position.x}px - ${iconOffset}px), calc(50% + ${position.y}px - ${iconOffset}px))`,
              transformOrigin: 'center center',
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                onMouseEnter={(e) => handleNodeHover(item.id, e)}
                onMouseLeave={handleNodeLeave}
              >
                {/* Pulse Effect */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,77,26,0.2) 0%, rgba(255,77,26,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* Node Icon */}
                <motion.div
                  className={`
                  w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-kaal-accent text-white"
                      : isRelated
                      ? "bg-kaal-accent/50 text-white"
                      : "bg-transparent text-kaal-text border-2 border-white/40"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-kaal-accent shadow-lg shadow-kaal-accent/30"
                      : isRelated
                      ? "border-kaal-accent animate-pulse"
                      : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icon size={isDesktop ? 20 : 16} />
                </motion.div>

                {/* Node Title */}
                <div
                  className={`
                  absolute top-12 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-kaal-accent scale-125" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {/* Expanded Card */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-80 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-kaal-accent/10 overflow-visible z-[3]">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-kaal-accent/50"></div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <Badge
                              className={`px-2 text-xs ${getStatusStyles(
                                item.status
                              )}`}
                            >
                              {item.status === "completed"
                                ? "COMPLETE"
                                : item.status === "in-progress"
                                ? "IN PROGRESS"
                                : "PENDING"}
                            </Badge>
                            <span className="text-xs font-mono text-kaal-muted">
                              {item.date}
                            </span>
                          </div>
                          <CardTitle className="text-sm mt-2 text-white">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs text-white/80">
                          <p>{item.content}</p>

                          {/* Result Badge */}
                          <div className="mt-4 pt-3 border-t border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp size={12} className="text-kaal-success" />
                              <span className="text-xs font-bold text-kaal-success uppercase tracking-wider">
                                {item.result}
                              </span>
                            </div>
                          </div>

                          {/* Energy Level */}
                          <div className="mt-4 pt-3 border-t border-white/10">
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="flex items-center text-white/70">
                                <Zap size={10} className="mr-1 text-kaal-accent" />
                                Impact Level
                              </span>
                              <span className="font-mono text-kaal-accent">{item.energy}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-kaal-accent to-orange-500"
                                style={{ width: `${item.energy}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Related Projects */}
                          {item.relatedIds.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <div className="flex items-center mb-2">
                                <Link2 size={10} className="text-kaal-muted mr-1" />
                                <h4 className="text-xs uppercase tracking-wider font-medium text-kaal-muted">
                                  Related Projects
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {item.relatedIds.map((relatedId) => {
                                  const relatedItem = timelineData.find(
                                    (i) => i.id === relatedId
                                  );
                                  return (
                                    <Button
                                      key={relatedId}
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center h-6 px-2 py-0 text-xs rounded-sm border-white/20 bg-transparent hover:bg-kaal-accent/10 text-white/80 hover:text-white transition-all"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleItem(relatedId);
                                      }}
                                    >
                                      {relatedItem?.title}
                                      <ArrowRight
                                        size={8}
                                        className="ml-1 text-kaal-muted"
                                      />
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Website Preview on Hover - Only show when no item is expanded */}
      <AnimatePresence>
        {previewImage && previewPosition && !activeNodeId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-[150] pointer-events-none"
            style={{
              left: `${previewPosition.x}px`,
              top: `${previewPosition.y}px`,
            }}
          >
            <div className="w-64 h-40 rounded-lg overflow-hidden border-2 border-kaal-accent shadow-2xl shadow-kaal-accent/30">
              <img
                src={previewImage}
                alt="Website preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
