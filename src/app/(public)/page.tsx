import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      <h1>{siteConfig.name}</h1>
      <p>Engineering foundation for the UK and Ukraine application.</p>
    </main>
  );
}
