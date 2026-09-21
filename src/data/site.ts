export const site = {
  name: "Dreemy AI Guide",
  domain: "dreemyai.fun",
  url: "https://dreemyai.fun",
  description: "An independent Dreemy AI guide to character roleplay, bot creation, AI images and video, privacy, credits, safety, and leading alternatives.",
  author: "Dreemy AI Guide editorial team",
  officialUrl: "https://www.dreemy.ai/",
};

export const formatDate = (date: Date) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date);
export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);
