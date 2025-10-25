const formatDuration = (seconds) => {
    if (!seconds) return "N/A";
    const hours =Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor((seconds % 3600) % 60);
    // return `${hours}:${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    return {
      hours,minutes,seconds:remainingSeconds
    }
  };

export default formatDuration;