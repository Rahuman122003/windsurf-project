// Module declarations for binary assets imported via Next.js webpack.
// Next.js handles the actual loading; TypeScript only needs the URL shape.
declare module "*.mp4" {
  const src: string;
  export default src;
}
declare module "*.webm" {
  const src: string;
  export default src;
}
declare module "*.mov" {
  const src: string;
  export default src;
}
