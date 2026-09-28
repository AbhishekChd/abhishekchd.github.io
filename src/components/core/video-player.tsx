import React from "react";
import * as Icon from "react-feather";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
}

interface PlayerControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  onExpand?: () => void;
  isModal?: boolean;
}

const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "00:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  isMuted,
  onTogglePlay,
  onToggleMute,
  onSeek,
  onExpand,
  isModal = false,
}) => {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-8 pb-3 px-4 z-30 transition-opacity duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Scrubber / Progress Bar */}
      <div
        className="w-full h-1.5 hover:h-2.5 transition-all bg-white/20 rounded-full cursor-pointer relative mb-3 group/scrubber flex items-center"
        onClick={onSeek}
      >
        <div
          className="bg-[var(--color-primary)] h-full rounded-full relative pointer-events-none"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="w-3 h-3 rounded-full bg-white shadow-md absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/scrubber:opacity-100 transition-opacity pointer-events-none" />
        </div>
      </div>

      {/* Control Buttons & Timestamp */}
      <div className="flex items-center justify-between text-white text-sm">
        <div className="flex items-center space-x-3">
          {/* Play / Pause Button */}
          <button
            type="button"
            onClick={onTogglePlay}
            className="p-1.5 rounded-md hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Icon.Pause size={18} className="fill-current" />
            ) : (
              <Icon.Play size={18} className="fill-current ml-0.5" />
            )}
          </button>

          {/* Mute / Unmute Button */}
          <button
            type="button"
            onClick={onToggleMute}
            className="p-1.5 rounded-md hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <Icon.VolumeX size={18} /> : <Icon.Volume2 size={18} />}
          </button>

          {/* Time Counter */}
          <span className="text-xs sm:text-sm font-mono text-white/80 select-none">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Right side: Expand / Fullscreen Modal Button */}
        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            className="p-1.5 rounded-md hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label={isModal ? "Exit full screen" : "Expand to modal"}
            title={isModal ? "Exit full screen" : "Expand to modal"}
          >
            {isModal ? <Icon.Minimize2 size={18} /> : <Icon.Maximize2 size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  caption = "Demo",
  className = "",
}) => {
  // Inline player state
  const inlineVideoRef = React.useRef<HTMLVideoElement>(null);
  const [inlineLoaded, setInlineLoaded] = React.useState(false);
  const [inlinePlaying, setInlinePlaying] = React.useState(false);
  const [inlineTime, setInlineTime] = React.useState(0);
  const [inlineDuration, setInlineDuration] = React.useState(0);
  const [inlineMuted, setInlineMuted] = React.useState(false);
  const [inlineHovered, setInlineHovered] = React.useState(false);

  // Modal player state
  const modalVideoRef = React.useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalLoaded, setModalLoaded] = React.useState(false);
  const [modalPlaying, setModalPlaying] = React.useState(false);
  const [modalTime, setModalTime] = React.useState(0);
  const [modalDuration, setModalDuration] = React.useState(0);
  const [modalMuted, setModalMuted] = React.useState(false);
  const [modalHovered, setModalHovered] = React.useState(false);

  // Handlers for Inline Player
  const toggleInlinePlay = () => {
    if (!inlineVideoRef.current) return;
    if (inlineVideoRef.current.paused) {
      inlineVideoRef.current.play().catch(() => {});
    } else {
      inlineVideoRef.current.pause();
    }
  };

  const toggleInlineMute = () => {
    if (!inlineVideoRef.current) return;
    inlineVideoRef.current.muted = !inlineVideoRef.current.muted;
    setInlineMuted(inlineVideoRef.current.muted);
  };

  const handleInlineSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!inlineVideoRef.current || !inlineDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = clickRatio * inlineDuration;
    inlineVideoRef.current.currentTime = newTime;
    setInlineTime(newTime);
  };

  // Open Modal Handler (sync from inline to modal)
  const handleOpenModal = () => {
    const currentTime = inlineVideoRef.current?.currentTime || 0;
    const wasPlaying = inlineVideoRef.current ? !inlineVideoRef.current.paused : false;
    const currentMuted = inlineVideoRef.current?.muted || false;

    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause();
    }

    setIsModalOpen(true);

    // Sync state after modal mounts
    setTimeout(() => {
      if (modalVideoRef.current) {
        modalVideoRef.current.currentTime = currentTime;
        modalVideoRef.current.muted = currentMuted;
        setModalMuted(currentMuted);
        if (wasPlaying) {
          modalVideoRef.current.play().catch(() => {});
        }
      }
    }, 50);
  };

  // Close Modal Handler (sync from modal back to inline)
  const handleCloseModal = () => {
    const currentTime = modalVideoRef.current?.currentTime || 0;
    const wasPlaying = modalVideoRef.current ? !modalVideoRef.current.paused : false;
    const currentMuted = modalVideoRef.current?.muted || false;

    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }

    setIsModalOpen(false);

    if (inlineVideoRef.current) {
      inlineVideoRef.current.currentTime = currentTime;
      inlineVideoRef.current.muted = currentMuted;
      setInlineMuted(currentMuted);
      if (wasPlaying) {
        inlineVideoRef.current.play().catch(() => {});
      }
    }
  };

  // Handlers for Modal Player
  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play().catch(() => {});
    } else {
      modalVideoRef.current.pause();
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setModalMuted(modalVideoRef.current.muted);
  };

  const handleModalSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalVideoRef.current || !modalDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = clickRatio * modalDuration;
    modalVideoRef.current.currentTime = newTime;
    setModalTime(newTime);
  };

  // Keyboard navigation & body overflow for modal
  React.useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      } else if (e.key === " " || e.key === "k") {
        e.preventDefault();
        toggleModalPlay();
      } else if (e.key === "m") {
        toggleModalMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Inline Styled Player Container */}
      <div
        className={`group relative rounded-xl overflow-hidden border border-gray-500/20 shadow-md bg-black aspect-video select-none ${className}`}
        onMouseEnter={() => setInlineHovered(true)}
        onMouseLeave={() => setInlineHovered(false)}
      >
        {/* Shimmer Placeholder while video data loads */}
        {!inlineLoaded && (
          <div className="absolute inset-0 z-20 overflow-hidden bg-neutral-900 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Icon.Play size={22} className="text-white/30 ml-0.5" />
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={inlineVideoRef}
          className="w-full h-full object-contain block cursor-pointer bg-black"
          playsInline
          preload="metadata"
          poster={poster}
          onClick={toggleInlinePlay}
          onLoadedData={() => setInlineLoaded(true)}
          onCanPlay={() => setInlineLoaded(true)}
          onTimeUpdate={() => setInlineTime(inlineVideoRef.current?.currentTime || 0)}
          onDurationChange={() => setInlineDuration(inlineVideoRef.current?.duration || 0)}
          onPlay={() => setInlinePlaying(true)}
          onPause={() => setInlinePlaying(false)}
          onEnded={() => setInlinePlaying(false)}
        >
          <source src={src} type="video/quicktime" />
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Center Big Play Button when paused */}
        {!inlinePlaying && inlineLoaded && (
          <div
            onClick={toggleInlinePlay}
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/25 transition-opacity"
          >
            <button
              type="button"
              className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-black/80 transition-all cursor-pointer"
              aria-label="Play video"
            >
              <Icon.Play size={24} className="ml-1 fill-white" />
            </button>
          </div>
        )}

        {/* Custom Styled Controls Bar */}
        <div
          className={`transition-opacity duration-200 ${
            inlineHovered || !inlinePlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <PlayerControls
            videoRef={inlineVideoRef}
            isPlaying={inlinePlaying}
            currentTime={inlineTime}
            duration={inlineDuration}
            isMuted={inlineMuted}
            onTogglePlay={toggleInlinePlay}
            onToggleMute={toggleInlineMute}
            onSeek={handleInlineSeek}
            onExpand={handleOpenModal}
          />
        </div>
      </div>

      {/* Full-Screen Modal (like image view) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button at top right */}
          <button
            type="button"
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-2 text-white hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Close"
          >
            <Icon.X size={28} />
          </button>

          <div
            className="flex flex-col items-center max-w-[95vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Video Container */}
            <div
              className="group relative w-[95vw] max-w-[calc(85vh*16/9)] max-h-[85vh] aspect-video rounded overflow-hidden shadow-2xl bg-black select-none"
              onMouseEnter={() => setModalHovered(true)}
              onMouseLeave={() => setModalHovered(false)}
            >
            {/* Modal Shimmer while buffering */}
            {!modalLoaded && (
              <div className="absolute inset-0 z-20 overflow-hidden bg-neutral-900 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon.Play size={26} className="text-white/30 ml-0.5" />
                </div>
              </div>
            )}

            <video
              ref={modalVideoRef}
              className="w-full h-full object-contain block cursor-pointer"
              playsInline
              preload="metadata"
              poster={poster}
              onClick={toggleModalPlay}
              onLoadedData={() => setModalLoaded(true)}
              onCanPlay={() => setModalLoaded(true)}
              onTimeUpdate={() => setModalTime(modalVideoRef.current?.currentTime || 0)}
              onDurationChange={() => setModalDuration(modalVideoRef.current?.duration || 0)}
              onPlay={() => setModalPlaying(true)}
              onPause={() => setModalPlaying(false)}
              onEnded={() => setModalPlaying(false)}
            >
              <source src={src} type="video/quicktime" />
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Modal Center Big Play Button when paused */}
            {!modalPlaying && modalLoaded && (
              <div
                onClick={toggleModalPlay}
                className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/25 transition-opacity"
              >
                <button
                  type="button"
                  className="w-18 h-18 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-black/80 transition-all cursor-pointer"
                  aria-label="Play video"
                >
                  <Icon.Play size={28} className="ml-1 fill-white" />
                </button>
              </div>
            )}

            {/* Modal Custom Controls Bar */}
            <div
              className={`transition-opacity duration-200 ${
                modalHovered || !modalPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <PlayerControls
                videoRef={modalVideoRef}
                isPlaying={modalPlaying}
                currentTime={modalTime}
                duration={modalDuration}
                isMuted={modalMuted}
                onTogglePlay={toggleModalPlay}
                onToggleMute={toggleModalMute}
                onSeek={handleModalSeek}
                onExpand={handleCloseModal}
                isModal={true}
              />
            </div>
          </div>

          {caption && (
            <p className="mt-3 text-sm text-neutral-300 text-center">
              {caption}
            </p>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default VideoPlayer;
