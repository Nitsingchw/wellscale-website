import { LegalPage } from "./legal-page";
import type { Route } from "./router";

export function PrivacyPage({ currentRoute }: { currentRoute: Route }) {
  return (
    <LegalPage
      currentRoute={currentRoute}
      breadcrumbLabel="Privacy Policy"
      eyebrow="Privacy Policy"
      title={
        <>
          How we handle
          <br />
          <span className="text-lime">your data.</span>
        </>
      }
      subtitle="We collect the minimum information needed to run growth campaigns for your clinic — and we never sell it. This page explains exactly what we collect, why, and how to remove it."
      variant="privacy"
      lastUpdated="June 17, 2025"
      sections={[
        {
          id: "overview",
          title: "1. Overview",
          body: (
            <>
              <p>
                WellScale Media (&quot;WellScale&quot;, &quot;we&quot;, &quot;us&quot;)
                is a performance marketing agency that works exclusively with
                aesthetic clinics in India. This Privacy Policy explains how we
                collect, use, store, and protect information when you visit our
                website or work with us as a client.
              </p>
              <p>
                By submitting a strategy call request, signing a service
                agreement, or otherwise engaging with WellScale, you consent to
                the practices described in this policy. We may update this policy
                from time to time — the &quot;Last updated&quot; date above
                reflects the most recent revision.
              </p>
            </>
          ),
        },
        {
          id: "what-we-collect",
          title: "2. What We Collect",
          body: (
            <>
              <p>We collect three categories of information:</p>
              <p>
                <strong>Contact information:</strong> When you submit a strategy
                call request, we collect your name, WhatsApp number, clinic
                name, city, primary treatment category, and any details you
                share in the &quot;biggest problem&quot; field.
              </p>
              <p>
                <strong>Business information:</strong> If you become a client,
                we collect additional business details including your clinic&apos;s
                ad account access, lead data, consultation conversion data, and
                patient pipeline metrics. This information is provided by you
                directly or pulled from your connected marketing accounts.
              </p>
              <p>
                <strong>Usage data:</strong> Like most websites, we collect
                anonymised analytics data — pages visited, time on site, device
                type, and general geographic region. This data is aggregated and
                cannot be used to identify you personally.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use",
          title: "3. How We Use Your Information",
          body: (
            <>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Schedule and conduct your free strategy call.</li>
                <li>
                  Design, run, and optimise marketing campaigns on behalf of
                  your clinic (clients only).
                </li>
                <li>
                  Send you weekly performance reports, campaign
                  recommendations, and revenue insights (clients only).
                </li>
                <li>
                  Respond to your questions, support requests, and account
                  management needs.
                </li>
                <li>
                  Improve our services, internal analytics, and the overall
                  client experience.
                </li>
                <li>
                  Comply with applicable Indian laws and respond to legitimate
                  legal requests.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> use your information to send
                unsolicited marketing emails about other services. If we ever
                email you about a new offering, it will be related to clinic
                growth and you can opt out with one click.
              </p>
            </>
          ),
        },
        {
          id: "data-sharing",
          title: "4. Data Sharing & Sub-Processors",
          body: (
            <>
              <p>
                We never sell, rent, or trade your personal or business data.
                We share information only with the following categories of
                sub-processors, all of whom are bound by confidentiality and
                data protection terms:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Advertising platforms</strong> (Meta, Google) — to run
                  and measure campaigns on your behalf. You grant us permission
                  to access these accounts via your service agreement.
                </li>
                <li>
                  <strong>Communication tools</strong> (WhatsApp Business API,
                  email) — to send nurturing sequences and reports to your
                  leads, with your consent.
                </li>
                <li>
                  <strong>Analytics &amp; reporting tools</strong> — to generate
                  the weekly revenue reports we share with you.
                </li>
                <li>
                  <strong>Cloud infrastructure providers</strong> — for secure
                  storage of campaign assets and lead data.
                </li>
              </ul>
              <p>
                We may also disclose information if required by law, court
                order, or to protect our legal rights — but this has never
                happened in our operating history.
              </p>
            </>
          ),
        },
        {
          id: "data-retention",
          title: "5. Data Retention",
          body: (
            <>
              <p>
                We retain your information for as long as needed to provide
                services to you and to comply with legal obligations:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Strategy call requests:</strong> 12 months from
                  submission, then automatically deleted unless you become a
                  client.
                </li>
                <li>
                  <strong>Client data:</strong> Retained for the duration of
                  our engagement plus 24 months for audit and reporting
                  purposes. After that, campaign assets are deleted; aggregated
                  revenue metrics may be kept indefinitely in anonymised form.
                </li>
                <li>
                  <strong>Lead data (your patients):</strong> Retained only
                  while we are actively running campaigns for your clinic.
                  Removed within 30 days of contract termination unless you
                  request earlier deletion.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "your-rights",
          title: "6. Your Rights",
          body: (
            <>
              <p>Under Indian data protection regulations (DPDP Act, 2023), you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Access the personal data we hold about you.</li>
                <li>Correct inaccurate or outdated information.</li>
                <li>
                  Request deletion of your personal data, subject to legal
                  retention requirements.
                </li>
                <li>Withdraw consent for data processing at any time.</li>
                <li>
                  Receive a copy of your data in a portable, machine-readable
                  format.
                </li>
                <li>Lodge a complaint with the Data Protection Board of India.</li>
              </ul>
              <p>
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:privacy@wellscalemedia.com"
                  className="text-lime underline underline-offset-2"
                >
                  privacy@wellscalemedia.com
                </a>
                . We respond to all requests within 30 days.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "7. Data Security",
          body: (
            <>
              <p>
                We take reasonable technical and organisational measures to
                protect your data, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Encrypted transmission (TLS 1.3) for all data in transit
                  between your browser and our servers.
                </li>
                <li>Encrypted storage for sensitive client data at rest.</li>
                <li>
                  Role-based access controls — only the team members working on
                  your account can access your data.
                </li>
                <li>
                  Quarterly access reviews and immediate offboarding when team
                  members leave WellScale.
                </li>
                <li>
                  Annual security audits of our sub-processors and
                  infrastructure.
                </li>
              </ul>
              <p>
                Despite these measures, no system is 100% secure. If we ever
                become aware of a data breach affecting your information, we
                will notify you within 72 hours in accordance with DPDP Act
                requirements.
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "8. Cookies & Tracking",
          body: (
            <>
              <p>
                Our website uses essential cookies to function correctly and
                optional analytics cookies to understand how visitors use the
                site. We do not use advertising cookies on our own website — we
                run ads on other platforms, not on ours.
              </p>
              <p>
                You can disable cookies in your browser settings without
                affecting your ability to read our content or submit a strategy
                call request. Disabling analytics cookies will not affect any
                feature — we simply won&apos;t be able to count your visit in
                our aggregate metrics.
              </p>
            </>
          ),
        },
        {
          id: "children",
          title: "9. Children&apos;s Privacy",
          body: (
            <>
              <p>
                Our services are designed exclusively for licensed aesthetic
                clinics and the professionals who run them. We do not knowingly
                collect information from anyone under the age of 18. If you
                believe a minor has submitted information to us, please contact
                us immediately and we will delete it.
              </p>
              <p>
                Our marketing campaigns on behalf of client clinics are also
                targeted at adult audiences only, and we explicitly exclude
                under-18 audience segments in our Meta and Google ad targeting
                configurations.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "10. Changes to This Policy",
          body: (
            <>
              <p>
                We may update this Privacy Policy periodically to reflect
                changes in our practices, technologies, or legal requirements.
                When we make material changes, we will:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Update the &quot;Last updated&quot; date at the top of this page.</li>
                <li>
                  Notify active clients via email at least 14 days before
                  changes take effect.
                </li>
                <li>
                  Maintain a versioned archive of previous policies available
                  on request.
                </li>
              </ul>
              <p>
                We encourage you to review this page periodically to stay
                informed about how we protect your data.
              </p>
            </>
          ),
        },
        {
          id: "contact",
          title: "11. Contact Us",
          body: (
            <>
              <p>
                If you have any questions, concerns, or requests related to
                this Privacy Policy or your personal data, please contact our
                Data Protection Officer:
              </p>
              <p>
                <strong>WellScale Media — Privacy Team</strong>
                <br />
                Email:{" "}
                <a
                  href="mailto:privacy@wellscalemedia.com"
                  className="text-lime underline underline-offset-2"
                >
                  privacy@wellscalemedia.com
                </a>
                <br />
                Phone: +91 72229 99342
              </p>
              <p>
                We aim to respond to all privacy-related inquiries within 5
                business days.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
