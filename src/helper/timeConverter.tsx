export default function getTimeAgo(createdAt: {
  seconds: number;
  nanoseconds: number;
}): string {
  if (createdAt) {
    const millisecondsAgo =
      Date.now() - createdAt.seconds * 1000 - createdAt.nanoseconds / 1e6;
    const secondsAgo = Math.floor(millisecondsAgo / 1000);

    if (secondsAgo < 60) {
      return "1m";
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo}m`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo}h`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo}d`;
    }
  } else {
    return "1m";
  }
}
