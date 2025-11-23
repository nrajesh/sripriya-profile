import { GeometricBackground } from "@/components/geometric-background";

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden">
      <GeometricBackground />
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Your privacy is important to us.
          </p>
        </header>

        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <p>
            This Privacy Policy describes how your personal information is handled when you visit this website.
          </p>

          <h2>Data Collection and Usage</h2>
          <p>
            This website is a static portfolio and informational site. We are committed to minimizing data collection and respecting your privacy.
          </p>

          <h3>Personal Information</h3>
          <p>
            We do not collect any personally identifiable information (PII) such as names, email addresses, or physical addresses, as there are no user accounts, forms, or transactional features on this site.
          </p>

          <h3>Device Information and Tracking</h3>
          <p>
            We do not use third-party analytics services (like Google Analytics), tracking cookies, web beacons, or pixels to monitor your activity across the site or across different websites.
          </p>
          <p>
            When you visit the site, standard server logs may record non-personal technical information, such as your IP address, browser type, and the pages you access. This information is used solely for maintaining the security and operational integrity of the website and is not linked to any individual user.
          </p>

          <h3>Cookies</h3>
          <p>
            This website uses minimal or no cookies. Any cookies present are strictly necessary for the basic functionality of the site (e.g., managing theme preference between light and dark mode) and do not track personal data.
          </p>

          <h2>Data Sharing</h2>
          <p>
            Since we do not collect personal data, we do not share any personal information with third parties.
          </p>

          <h2>Changes to this Policy</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal or regulatory reasons.
          </p>

          <h2>Contact Us</h2>
          <p>
            For more information about our privacy practices or if you have questions, please contact us through the social media links provided on the website.
          </p>
        </div>
      </div>
    </div>
  );
}