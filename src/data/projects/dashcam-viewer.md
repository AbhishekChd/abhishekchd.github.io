---
title: "Dashcam Viewer Pro"
subtitle: "Unified dashcam, GPS & telemetry viewer"
url: "/projects/dashcam-viewer"
slug: "/projects/dashcam-viewer"
date: "2024-06-01T00:00:00.000Z"
featuredImage: "dashcam/default.png"
description: "Analytical tool synchronizing high-frequency GPS telemetry, accelerometer logs, and dashcam footage with interactive speed heatmaps."
video: "/videos/dashcam-demo.mp4"
videoPoster: "/images/projects/dashcam/default.png"
videoCaption: "Demo"
isPrivate: true
badge: "Private"
show: true
type: "project"
tags:
  - React/Typescript
  - GPS
  - Telemetry Synchronization
layouts:
  - badge: "01 / UNIFIED VIEW"
    title: "Multi-Pane Dashboard"
    description: "Correlates video playback with real-time GPS coordinate plotting and vehicle telemetry gauges in a unified cockpit."
    image: "/images/projects/dashcam/default.png"
    highlights:
      - "Master video clock driving real-time map and speedometer updates"
      - "Interactive timeline scrubbing synchronized across all panels"
      - "Dual-camera support sharing a single telemetry timeline"
  - badge: "02 / VIDEO FOCUS"
    title: "Focused Dashcam Theater Mode"
    description: "Full-screen video workspace for detailed frame inspection and incident analysis."
    image: "/images/projects/dashcam/dashcam-only-view.png"
    highlights:
      - "Distraction-free high-resolution video frame for incident scrutiny"
      - "Variable playback rates (0.5x to 4.0x) with zero pitch distortion"
      - "Low-latency keyboard seek shortcuts for frame-by-frame navigation"
  - badge: "03 / GEOSPATIAL"
    title: "Speed & Route Heatmap"
    description: "Interactive geospatial visualization of vehicle telemetry with velocity-based route gradients."
    image: "/images/projects/dashcam/speed-map.png"
    highlights:
      - "Continuous velocity color spectrum (green to red) highlighting speed thresholds"
      - "Hardware-accelerated HTML5 Canvas handling 10,000+ telemetry coordinates"
      - "Direct click-on-route seeking to jump the video to any geospatial point"
  - badge: "04 / CALIBRATION"
    title: "Settings & Sensor Calibration"
    description: "Configuration interface for fine-tuning sensor latency offsets, unit preferences, and dataset exporting."
    image: "/images/projects/dashcam/settings.png"
    highlights:
      - "Millisecond timestamp offset calibration between video and GPS sensors"
      - "Dynamic toggle between metric (km/h) and imperial (mph) units"
      - "Built-in telemetry export for GPX, NMEA, and CSV formats"
challenges:
  - badge: "01 / TIME SYNCHRONIZATION"
    title: "Multi-Rate Time Synchronization Engine"
    highlights:
      - "<b>Challenge:</b> Dashcam video frames run at 30/60 FPS, while embedded GPS loggers sample at variable rates (typically 1Hz to 10Hz) and accelerometer/gyro sensors stream at 50Hz+. Direct index matching leads to drift and desynchronization during seeking."
      - "<b>Solution:</b> Engineered a unified timeline abstraction using linear interpolation (LERP) and binary search across monotonic epoch timestamps. The video playback clock serves as the master time source, dispatching high-frequency tick events to synchronize all geospatial and sensor layers."
  - badge: "02 / REAL-TIME CANVAS"
    title: "Real-Time Canvas Speed Heatmap"
    highlights:
      - "<b>Challenge:</b> Rendering hundreds of thousands of telemetry data points in DOM elements or standard SVG graphs causes severe frame drops during high-speed scrubbing."
      - "<b>Solution:</b> Developed a custom HTML5 Canvas rendering pipeline with offscreen buffering. The speed profile is colored dynamically using a multi-stop gradient (green → yellow → red) based on velocity thresholds, rendering over 60 FPS even during fast-forward (4x) playback."
  - badge: "03 / GEOSPATIAL PROJECTION"
    title: "Geospatial Route Projection"
    highlights:
      - "<b>Challenge:</b> Accurately mapping vehicle movement without lagging behind high-speed video or causing map tile re-render thrashing."
      - "<b>Solution:</b> Implemented a smoothed bounding-box viewport follower that batches map coordinate updates, updating the vehicle marker position continuously while debouncing full map camera recalculations."
---
