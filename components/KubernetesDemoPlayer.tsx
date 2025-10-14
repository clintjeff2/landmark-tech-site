"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface KubernetesDemoPlayerProps {
  height?: string;
  speed?: number;
  theme?: "dark" | "light";
}

export default function KubernetesDemoPlayer({
  height = "500px",
  speed = 30,
  theme = "dark",
}: KubernetesDemoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  const terminalContent = [
    { type: "command", text: "$ kubectl cluster-info" },
    {
      type: "output",
      text: "Kubernetes control plane is running at https://10.0.0.1:6443",
    },
    {
      type: "output",
      text: "CoreDNS is running at https://10.0.0.1:6443/api/v1",
    },
    { type: "spacing", text: "" },
    { type: "command", text: "$ kubectl get nodes" },
    {
      type: "output",
      text: "NAME        STATUS   ROLES           AGE   VERSION",
    },
    {
      type: "output",
      text: "node-01     Ready    control-plane   5d    v1.28.1",
    },
    {
      type: "output",
      text: "node-02     Ready    <none>          5d    v1.28.1",
    },
    {
      type: "output",
      text: "node-03     Ready    <none>          5d    v1.28.1",
    },
    { type: "spacing", text: "" },
    { type: "command", text: "$ kubectl get pods --namespace=production" },
    {
      type: "output",
      text: "NAME                    READY   STATUS    RESTARTS   AGE",
    },
    {
      type: "output",
      text: "api-v1-abcde-12345      1/1     Running   0          2h",
    },
    {
      type: "output",
      text: "web-app-fghij-67890     1/1     Running   0          1h",
    },
    {
      type: "output",
      text: "db-server-klmno-24680   1/1     Running   0          3h",
    },
    {
      type: "output",
      text: "cache-redis-pqrst-13579 1/1     Running   0          45m",
    },
    { type: "spacing", text: "" },
    { type: "command", text: "$ kubectl get services" },
    {
      type: "output",
      text: "NAME         TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)",
    },
    {
      type: "output",
      text: "api-service  LoadBalancer   10.96.0.15      34.123.45.67    80:30001/TCP",
    },
    {
      type: "output",
      text: "web-service  LoadBalancer   10.96.0.22      34.123.45.68    443:30002/TCP",
    },
    { type: "spacing", text: "" },
    {
      type: "command",
      text: "$ kubectl scale deployment web-app --replicas=5",
    },
    { type: "success", text: "deployment.apps/web-app scaled" },
    { type: "spacing", text: "" },
    { type: "command", text: "$ kubectl get deployments" },
    {
      type: "output",
      text: "NAME      READY   UP-TO-DATE   AVAILABLE   AGE",
    },
    { type: "output", text: "api-v1    3/3     3            3           5d" },
    { type: "output", text: "web-app   5/5     5            5           5d" },
    { type: "output", text: "db-server 1/1     1            1           5d" },
    { type: "spacing", text: "" },
    { type: "command", text: "$ kubectl describe pod api-v1-abcde-12345" },
    { type: "output", text: "Name:         api-v1-abcde-12345" },
    { type: "output", text: "Namespace:    production" },
    { type: "output", text: "Priority:     0" },
    { type: "output", text: "Node:         node-02/10.0.0.12" },
    { type: "output", text: "Start Time:   Mon, 14 Oct 2025 10:30:00 -0400" },
    { type: "output", text: "Labels:       app=api-v1" },
    { type: "output", text: "Status:       Running" },
    { type: "output", text: "IP:           192.168.1.45" },
    { type: "spacing", text: "" },
    { type: "command", text: "$ kubectl logs api-v1-abcde-12345 --tail=5" },
    {
      type: "log",
      text: "[2025-10-14 14:25:30] INFO: Server started on port 8080",
    },
    {
      type: "log",
      text: "[2025-10-14 14:25:35] INFO: Database connection established",
    },
    {
      type: "log",
      text: "[2025-10-14 14:25:40] INFO: Ready to accept requests",
    },
    {
      type: "log",
      text: "[2025-10-14 14:26:15] INFO: Processed 1,234 requests",
    },
    {
      type: "log",
      text: "[2025-10-14 14:27:00] INFO: Health check passed ✓",
    },
    { type: "spacing", text: "" },
    {
      type: "command",
      text: "$ kubectl top nodes",
    },
    {
      type: "output",
      text: "NAME      CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%",
    },
    {
      type: "output",
      text: "node-01   850m         42%    3200Mi          65%",
    },
    {
      type: "output",
      text: "node-02   720m         36%    2800Mi          56%",
    },
    {
      type: "output",
      text: "node-03   650m         32%    2600Mi          52%",
    },
    { type: "spacing", text: "" },
    {
      type: "command",
      text: "$ kubectl apply -f deployment.yaml",
    },
    { type: "success", text: "deployment.apps/new-service created" },
    { type: "success", text: "service/new-service created" },
    { type: "success", text: "configmap/new-service-config created" },
    { type: "spacing", text: "" },
  ];

  // Duplicate content for seamless loop
  const duplicatedContent = [...terminalContent, ...terminalContent];

  useEffect(() => {
    if (!isPlaying || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const contentHeight = container.scrollHeight / 2; // Half because we duplicated

    const animate = () => {
      scrollPositionRef.current += speed / 60; // Smooth 60fps

      if (scrollPositionRef.current >= contentHeight) {
        scrollPositionRef.current = 0; // Reset for seamless loop
      }

      container.scrollTop = scrollPositionRef.current;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
    setTimeout(() => setShowControls(!isPlaying), 2000);
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case "command":
        return "text-teal-400";
      case "output":
        return "text-gray-300";
      case "success":
        return "text-green-400";
      case "log":
        return "text-purple-300";
      case "spacing":
        return "";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Floating Badges */}
      <div className="absolute -top-4 -left-4 z-20 animate-float">
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white text-xs font-bold shadow-lg border border-white/20">
          ✨ 100% Hands-on Labs
        </div>
      </div>
      <div className="absolute -top-4 -right-4 z-20 animate-float-delayed">
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/90 to-blue-500/90 backdrop-blur-sm text-white text-xs font-bold shadow-lg border border-white/20">
          🎓 Expert-Led Sessions
        </div>
      </div>

      {/* Main Container */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => !isPlaying && setShowControls(true)}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Bokeh Dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-500/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-pink-500/10 blur-2xl animate-pulse delay-2000" />
        </div>

        {/* Terminal Content */}
        <div
          ref={scrollContainerRef}
          className="relative h-full overflow-hidden font-mono text-sm leading-relaxed p-6 terminal-scroll"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {duplicatedContent.map((line, index) => (
            <div
              key={index}
              className={`${getLineColor(line.type)} ${
                line.type === "command" ? "font-bold" : ""
              } ${line.type === "spacing" ? "h-4" : ""} whitespace-pre`}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Gradient Overlays for Fade Effect */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-10" />

        {/* Play/Pause Control */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-20 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={togglePlay}
            className="group relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/90 to-teal-500/90 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-white/30"
            aria-label={isPlaying ? "Pause demo" : "Play demo"}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-primary/50 blur-xl group-hover:bg-primary/70 transition-all duration-300 animate-pulse" />

            {/* Icon */}
            <div className="relative z-10">
              {isPlaying ? (
                <Pause size={32} className="text-white" fill="white" />
              ) : (
                <Play size={32} className="text-white ml-1" fill="white" />
              )}
            </div>
          </button>
        </div>

        {/* Bottom Progress Bar (Decorative) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 z-10">
          <div
            className={`h-full bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 ${
              isPlaying ? "animate-progress" : ""
            }`}
            style={{ width: isPlaying ? "100%" : "0%" }}
          />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .terminal-scroll::-webkit-scrollbar {
          display: none;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-progress {
          animation: progress 60s linear infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
