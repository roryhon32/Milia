import type { ComponentProps } from "react";

// Each portfolio demo is served as a static site inside the institutional app.
// Use document navigation so it does not depend on the host app's RSC router.
export default function PortfolioLink({ href = "/", ...props }: ComponentProps<"a">) {
  const destination = href.startsWith("/") && !href.startsWith("//")
    ? `/portfolio/lumiere${href}`
    : href;
  return <a {...props} href={destination} />;
}
