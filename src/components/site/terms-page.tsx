import { LegalPage } from "./legal-page";
import type { Route } from "./router";

export function TermsPage({ currentRoute }: { currentRoute: Route }) {
  return (
    <LegalPage
      currentRoute={currentRoute}
      breadcrumbLabel="Terms & Conditions"
      eyebrow="Terms & Conditions"
      title={
        <>
          The rules of
          <br />
          <span className="text-lime">working together.</span>
        </>
      }
      subtitle="These terms govern your use of the WellScale website and our marketing services. They're written in plain language — no fine print, no hidden clauses. If anything is unclear, we're happy to walk you through it."
      variant="terms"
      lastUpdated="June 17, 2025"
      sections={[
        {
          id: "acceptance",
          title: "1. Acceptance of Terms",
          body: (
            <>
              <p>
                By accessing the WellScale website, submitting a strategy call
                request, or signing a service agreement with us, you agree to
                be bound by these Terms &amp; Conditions (&quot;Terms&quot;). If
                you do not agree with any part of these Terms, please do not
                use our website or engage our services.
              </p>
              <p>
                These Terms form a legally binding agreement between you
                (&quot;Client&quot;, &quot;you&quot;) and WellScale Media
                (&quot;WellScale&quot;, &quot;we&quot;, &quot;us&quot;). If
                you are signing on behalf of a clinic or company, you represent
                that you have the authority to bind that entity.
              </p>
            </>
          ),
        },
        {
          id: "services",
          title: "2. Our Services",
          body: (
            <>
              <p>
                WellScale provides performance marketing services exclusively
                for aesthetic clinics in India. Our core offering includes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Meta (Facebook/Instagram) ad strategy and management.</li>
                <li>Walk-in campaign planning and execution.</li>
                <li>WhatsApp lead nurturing and reactivation flows.</li>
                <li>Google My Business optimisation and local SEO.</li>
                <li>Social media content strategy and brand building.</li>
                <li>Influencer marketing partnerships.</li>
                <li>Front-desk counselling and sales training.</li>
                <li>Weekly performance reporting and revenue analytics.</li>
              </ul>
              <p>
                The exact scope of services for your engagement will be defined
                in a separate service agreement signed before work begins. These
                Terms govern that agreement and any future work between us.
              </p>
            </>
          ),
        },
        {
          id: "guarantee",
          title: "3. The 3X-in-30-Days Guarantee",
          body: (
            <>
              <p>
                Our flagship offer is a performance-based guarantee: if we do
                not scale your clinic&apos;s revenue by 3X within 30 days of
                campaign launch, we waive our service fees for that
                period. The following conditions apply:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  The 30-day period begins on the date your first paid
                  campaign goes live, not the date of contract signing.
                </li>
                <li>
                  &quot;Revenue&quot; is defined as confirmed patient payments
                  for treatments performed at your clinic during the 30-day
                  window, as reported by your point-of-sale system.
                </li>
                <li>
                  The baseline for comparison is your average monthly revenue
                  over the 60 days prior to campaign launch.
                </li>
                <li>
                  The guarantee applies only to clinics with at least 6 months
                  of operating history and a monthly ad budget of ₹1,00,000 or
                  more.
                </li>
                <li>
                  To claim the guarantee, you must provide us with verifiable
                  revenue data within 14 days of the 30-day window closing.
                </li>
                <li>
                  The guarantee covers our service fees only — ad spend paid to
                  Meta, Google, or other platforms is not refundable.
                </li>
              </ul>
              <p>
                We have honoured this guarantee for every eligible client who
                has claimed it since 2023. We do not intend to make claiming it
                difficult.
              </p>
            </>
          ),
        },
        {
          id: "payment",
          title: "4. Fees & Payment Terms",
          body: (
            <>
              <p>
                Our fee structure is defined in your service agreement.
                Typically, fees include a monthly retainer plus a
                performance-based component tied to revenue milestones. All fees
                are exclusive of applicable taxes (GST at 18%) unless stated
                otherwise.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Invoices are issued on the 1st of each month and due within 7
                  days.
                </li>
                <li>
                  Late payments incur a 2% monthly interest charge on the
                  outstanding amount.
                </li>
                <li>
                  Ad spend on Meta, Google, and other platforms is billed
                  directly to your account — we do not manage or hold your ad
                  budget.
                </li>
                <li>
                  Performance-based fees are calculated based on revenue
                  reported by your POS system and reconciled monthly.
                </li>
                <li>
                  Refunds, where applicable under the 3X guarantee, are
                  processed within 14 days of approval.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "client-responsibilities",
          title: "5. Client Responsibilities",
          body: (
            <>
              <p>
                To enable us to deliver results, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Provide timely access to your Meta Business Manager, Google
                  Ads, and Google My Business accounts within 5 business days
                  of contract signing.
                </li>
                <li>
                  Share accurate monthly revenue data within 7 days of
                  month-end for performance calculation.
                </li>
                <li>
                  Respond to campaign-related requests (creative approvals,
                  offer finalisation, lead follow-up) within 48 hours.
                </li>
                <li>
                  Maintain the operational capacity to handle increased patient
                  volume — if your front-desk cannot convert leads we deliver,
                  the 3X guarantee may be voided.
                </li>
                <li>
                  Not engage competing agencies to run parallel campaigns for
                  the same clinic during our engagement period.
                </li>
                <li>
                  Ensure all marketing claims about treatments you offer are
                  accurate and compliant with local medical advertising
                  regulations.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "intellectual-property",
          title: "6. Intellectual Property",
          body: (
            <>
              <p>
                All marketing materials created by WellScale for your clinic —
                including ad creatives, copy, landing pages, WhatsApp scripts,
                and content calendars — remain the property of WellScale until
                full payment is received. Upon full payment, ownership
                transfers to you for use within your clinic only.
              </p>
              <p>
                You grant WellScale a perpetual, royalty-free licence to use
                your clinic&apos;s name, logo, before/after photos, and
                testimonials in our marketing materials, case studies, and
                portfolio — both during and after our engagement. You may revoke
                this licence for future use at any time by written request.
              </p>
              <p>
                WellScale&apos;s methodologies, frameworks, training materials,
                and proprietary tools remain our exclusive intellectual
                property. You may not reproduce, resell, or transfer these to
                third parties.
              </p>
            </>
          ),
        },
        {
          id: "confidentiality",
          title: "7. Confidentiality",
          body: (
            <>
              <p>
                Both parties agree to keep confidential any non-public
                information shared during the engagement, including but not
                limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Revenue data, patient lists, and conversion metrics.</li>
                <li>Marketing strategies, ad spend, and campaign performance.</li>
                <li>Pricing, contract terms, and business operations.</li>
                <li>WellScale&apos;s proprietary methodologies and tools.</li>
              </ul>
              <p>
                This confidentiality obligation survives the termination of our
                engagement for a period of 3 years. We do not sign NDAs that
                restrict our ability to mention your clinic in our portfolio —
                case studies are how we win new business.
              </p>
            </>
          ),
        },
        {
          id: "termination",
          title: "8. Termination",
          body: (
            <>
              <p>
                Either party may terminate the engagement with 30 days&apos;
                written notice. Upon termination:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  All outstanding invoices become immediately due and payable.
                </li>
                <li>
                  We will hand over all campaign assets, creative files, and
                  performance reports within 14 days.
                </li>
                <li>
                  Access to your ad accounts, GMB, and WhatsApp Business API
                  will be transferred back to you or your next agency.
                </li>
                <li>
                  Active campaigns will be paused unless you instruct us to
                  keep them running at standard management rates.
                </li>
                <li>
                  The 3X guarantee does not apply to partial-month periods
                  during termination.
                </li>
              </ul>
              <p>
                We may terminate the engagement immediately for material
                breach, non-payment exceeding 30 days, or any unlawful use of
                our services.
              </p>
            </>
          ),
        },
        {
          id: "liability",
          title: "9. Limitation of Liability",
          body: (
            <>
              <p>
                WellScale provides marketing services on a &quot;best efforts&quot;
                basis. While we stand behind our 3X guarantee, we cannot
                guarantee specific outcomes beyond the terms of that guarantee,
                as results depend on factors partially outside our control
                (market conditions, treatment quality, front-desk performance,
                etc.).
              </p>
              <p>
                To the maximum extent permitted by law, our total liability for
                any claim arising from our services is limited to the total
                fees paid by you to WellScale in the 3 months preceding the
                event giving rise to the claim. We are not liable for indirect,
                incidental, or consequential damages including lost profits,
                lost data, or business interruption.
              </p>
              <p>
                We are not liable for actions taken by third-party platforms
                (Meta, Google) including account suspensions, policy changes,
                or ad rejections. We will, however, assist you in resolving
                such issues as part of our service.
              </p>
            </>
          ),
        },
        {
          id: "indemnity",
          title: "10. Indemnification",
          body: (
            <>
              <p>
                You agree to indemnify and hold WellScale harmless from any
                claims, damages, or expenses (including legal fees) arising
                from:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Inaccurate or misleading claims about treatments you offer.
                </li>
                <li>
                  Use of before/after photos, testimonials, or patient data
                  without proper consent.
                </li>
                <li>
                  Violations of medical advertising regulations by your clinic.
                </li>
                <li>
                  Infringement of third-party intellectual property in
                  materials you provide to us.
                </li>
                <li>
                  Breach of any representations made in your service agreement.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "governing-law",
          title: "11. Governing Law & Disputes",
          body: (
            <>
              <p>
                These Terms are governed by the laws of India. Any disputes
                arising from our engagement will be subject to the exclusive
                jurisdiction of the courts of Mumbai, Maharashtra.
              </p>
              <p>
                Before initiating legal proceedings, both parties agree to
                attempt good-faith resolution through mediation. If mediation
                fails within 60 days, either party may approach the courts. We
                have resolved every client dispute in our history through
                direct conversation — we expect to keep that record.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "12. Changes to These Terms",
          body: (
            <>
              <p>
                We may update these Terms from time to time. When we make
                material changes, we will:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Update the &quot;Last updated&quot; date at the top of this page.</li>
                <li>
                  Notify active clients via email at least 30 days before
                  changes take effect.
                </li>
                <li>
                  Allow active clients to terminate their engagement without
                  penalty if they do not accept the new terms.
                </li>
              </ul>
              <p>
                Continued use of our services after the effective date of any
                changes constitutes acceptance of the updated Terms.
              </p>
            </>
          ),
        },
        {
          id: "contact",
          title: "13. Contact Us",
          body: (
            <>
              <p>
                If you have any questions about these Terms &amp; Conditions,
                please contact us:
              </p>
              <p>
                <strong>WellScale Media — Legal</strong>
                <br />
                Email:{" "}
                <a
                  href="mailto:legal@wellscalemedia.com"
                  className="text-lime underline underline-offset-2"
                >
                  legal@wellscalemedia.com
                </a>
                <br />
                Phone: +91 72229 99342
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
