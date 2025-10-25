const showLength = (length) => {
  if (length?.hours == 0) {
    return `${length?.minutes}m : ${length?.seconds}s`;
  } else {
    return `${length?.hours}h : ${length?.minutes}m`;
  }
};

export default showLength;
