"use client";

import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

/* ── Fonts ── */
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7SUc.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa4ZL7SUc.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa25L7SUc.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa0pL7SUc.ttf",
      fontWeight: 700,
    },
  ],
});

/* ── Colours ── */
const C = {
  black: "#000000",
  gray900: "#111827",
  gray700: "#374151",
  gray600: "#4b5563",
  gray500: "#6b7280",
  gray400: "#9ca3af",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  emerald: "#059669",
  white: "#ffffff",
};

/* ── Styles ── */
const s = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 40,
    fontFamily: "Inter",
    fontSize: 9.5,
    color: C.black,
    backgroundColor: C.white,
    lineHeight: 1.4,
  },
  /* Header */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: C.gray900,
    paddingBottom: 6,
    marginBottom: 10,
  },
  name: { fontSize: 20, fontWeight: 700, color: C.gray900, marginBottom: 2 },
  subtitle: {
    fontSize: 9,
    fontWeight: 700,
    color: C.gray700,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 8,
    color: C.gray600,
  },
  contactLink: { color: C.gray600, textDecoration: "none" },
  /* Sections */
  sectionTitle: {
    fontSize: 7.5,
    fontWeight: 700,
    color: C.gray900,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: C.gray200,
    paddingBottom: 2,
    marginBottom: 5,
    marginTop: 10,
  },
  sectionTitleFirst: {
    fontSize: 7.5,
    fontWeight: 700,
    color: C.gray900,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: C.gray200,
    paddingBottom: 2,
    marginBottom: 5,
    marginTop: 0,
  },
  /* Body text */
  bodyText: { fontSize: 9, color: C.gray700, lineHeight: 1.4 },
  bodyTextJustify: {
    fontSize: 9,
    color: C.gray700,
    lineHeight: 1.4,
    textAlign: "justify",
  },
  /* Bullet list */
  bulletRow: {
    flexDirection: "row",
    marginBottom: 1.5,
    paddingLeft: 2,
  },
  bullet: { width: 8, fontSize: 9, color: C.gray400 },
  bulletText: { flex: 1, fontSize: 9, color: C.gray700, lineHeight: 1.4 },
  /* Experience role */
  roleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 1,
  },
  roleTitle: { fontSize: 10.5, fontWeight: 700, color: C.gray900 },
  roleDate: {
    fontSize: 8,
    fontWeight: 600,
    color: C.gray500,
    textTransform: "uppercase",
  },
  companyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 3,
  },
  companyName: { fontSize: 9.5, fontWeight: 600, color: C.emerald },
  companyLocation: {
    fontSize: 7.5,
    color: C.gray400,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  companyDesc: {
    fontSize: 7.5,
    color: C.gray500,
    fontStyle: "italic",
    marginBottom: 3,
  },
  roleBlock: { marginBottom: 8 },
  /* Projects */
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 2,
  },
  projectTitle: { fontSize: 10, fontWeight: 700, color: C.gray900 },
  projectLabel: {
    fontSize: 7,
    fontWeight: 600,
    color: C.emerald,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  projectBlock: { marginBottom: 8 },
  /* Education */
  eduRow: { flexDirection: "row", gap: 30, marginBottom: 3 },
  eduSchool: { fontSize: 10, fontWeight: 700, color: C.gray900 },
  eduDegree: { fontSize: 9, fontWeight: 600, color: C.emerald },
  eduDetail: {
    fontSize: 7.5,
    color: C.gray400,
    textTransform: "uppercase",
    marginTop: 1,
  },
  /* Skills */
  skillsGrid: { flexDirection: "row", gap: 12, marginTop: 2 },
  skillCol: { flex: 1 },
  skillCategory: {
    fontSize: 7,
    fontWeight: 700,
    color: C.emerald,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 3,
  },
  skillItem: { fontSize: 8.5, color: C.gray700, marginBottom: 1.5 },
  /* Certifications */
  certItem: { fontSize: 9, color: C.gray700, marginBottom: 1.5 },
  interestText: {
    fontSize: 8.5,
    color: C.gray500,
    fontStyle: "italic",
    marginTop: 4,
  },
  /* Footer */
  footer: {
    borderTopWidth: 1,
    borderTopColor: C.gray200,
    paddingTop: 8,
    marginTop: "auto",
    textAlign: "center",
  },
  footerText: {
    fontSize: 7,
    color: C.gray400,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});

/* ── Helpers ── */
const Bullet = ({ children }: { children: string }) => (
  <View style={s.bulletRow}>
    <Text style={s.bullet}>•</Text>
    <Text style={s.bulletText}>{children}</Text>
  </View>
);

/* ── Document ── */
export const ResumePDFDocument = () => (
  <Document
    title="Rizwanul Islam Afraim — CV"
    author="Rizwanul Islam Afraim"
    subject="Marketing Operations | Brand Execution | Digital Product"
    keywords="Marketing, Operations, Digital Product, Brand Execution, CV"
  >
    {/* ════════ PAGE 1 ════════ */}
    <Page size="A4" style={s.page}>
      {/* Header */}
      <View style={s.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={s.name}>Rizwanul Islam Afraim</Text>
          <Text style={s.subtitle}>
            Marketing Operations | Brand Execution | Digital Product
          </Text>
          <View style={s.contactRow}>
            <Link src="https://www.rizwanulafraim.com" style={s.contactLink}>
              rizwanulafraim.com
            </Link>
            <Link src="mailto:afraim.afraim99@gmail.com" style={s.contactLink}>
              afraim.afraim99@gmail.com
            </Link>
            <Link src="tel:+8801751299259" style={s.contactLink}>
              01751-299259
            </Link>
            <Text style={{ fontSize: 8, color: C.gray600 }}>
              Bashundhara R/A, Dhaka
            </Text>
          </View>
        </View>
      </View>

      {/* Profile */}
      <View>
        <Text style={s.sectionTitleFirst}>Profile</Text>
        <Text style={s.bodyTextJustify}>
          Marketing and operations professional with a BBA in Marketing and
          hands-on experience across market research, sales operations, campaign
          support, data operations, event coordination, and digital product
          development. Strong at connecting customer insight, execution planning,
          reporting, and digital systems to support business and brand growth.
          Experienced in company research, competitor analysis, lead generation,
          social media execution, backend data operations, and large-scale event
          coordination. Also has a working foundation in Next.js, React,
          Supabase/PostgreSQL, CMS systems, SEO, analytics, and full-stack
          digital platforms, helping bridge marketing execution with modern
          digital customer journeys.
        </Text>
      </View>

      {/* Highlights */}
      <View>
        <Text style={s.sectionTitle}>Highlights</Text>
        <Bullet>
          2x Employee of the Month at PrimeSync for competitor analysis, AI
          product launch research, and organized industry lead support.
        </Bullet>
        <Bullet>
          Processed and managed 1M+ data points with accuracy across backend
          data operations at Quantanite.
        </Bullet>
        <Bullet>
          Coordinated 200+ people across major NSU cultural events including
          Boishakh, Boshonto, NSUSS Unplugged 2024, and Annual Cultural Evening
          of NSU.
        </Bullet>
        <Bullet>
          Supported high-crowd university event operations, including NSU
          Boishakh and Boshonto with 25,000+ audience scale.
        </Bullet>
        <Bullet>
          Built founder-led digital platforms involving CMS workflows, SEO,
          analytics, customer journeys, and AI-assisted support logic.
        </Bullet>
      </View>

      {/* Professional Experience */}
      <View>
        <Text style={s.sectionTitle}>Professional Experience</Text>

        {/* PrimeSync */}
        <View style={s.roleBlock}>
          <View style={s.roleHeader}>
            <Text style={s.roleTitle}>Operations Associate</Text>
            <Text style={s.roleDate}>May 2024 – Present</Text>
          </View>
          <View style={s.companyRow}>
            <Text style={s.companyName}>PrimeSync Solutions</Text>
            <Text style={s.companyLocation}>Dhaka, Bangladesh</Text>
          </View>
          <Text style={s.companyDesc}>
            PrimeSync Solutions provides outsourcing services including AI voice
            agents to reduce costs and improve productivity.
          </Text>
          <Bullet>
            Generate leads and research companies to identify qualified sales
            prospects.
          </Bullet>
          <Bullet>
            Conduct industry research, competitor tracking, and market analysis
            for sales and AI product initiatives.
          </Bullet>
          <Bullet>
            Organize industry leads and support outreach preparation for
            business development.
          </Bullet>
          <Bullet>
            Coordinate meeting slots and support sales operations workflows.
          </Bullet>
          <Bullet>
            Track weekly and monthly performance metrics for reporting and
            execution follow-up.
          </Bullet>
        </View>

        {/* Quantanite */}
        <View style={s.roleBlock}>
          <View style={s.roleHeader}>
            <Text style={s.roleTitle}>Associate</Text>
            <Text style={s.roleDate}>Feb 2022 – Apr 2024</Text>
          </View>
          <View style={s.companyRow}>
            <Text style={s.companyName}>Quantanite</Text>
            <Text style={s.companyLocation}>Remote</Text>
          </View>
          <Text style={s.companyDesc}>
            CX and digital outsourcing solutions provider for fast-growing
            companies.
          </Text>
          <Bullet>
            Processed, scraped, and entered 1M+ data points with high accuracy.
          </Bullet>
          <Bullet>
            Uploaded and managed backend content including photos and structured
            data.
          </Bullet>
          <Bullet>
            Corrected data entry errors and maintained quality across repetitive
            operational workflows.
          </Bullet>
          <Bullet>
            Identified training needs and supported process improvement for
            better team efficiency.
          </Bullet>
        </View>

        {/* Serial Griller */}
        <View style={s.roleBlock}>
          <View style={s.roleHeader}>
            <Text style={s.roleTitle}>Organic Social Media Marketer</Text>
            <Text style={s.roleDate}>Jul 2018 – Sep 2018</Text>
          </View>
          <View style={s.companyRow}>
            <Text style={s.companyName}>The Serial Griller</Text>
            <Text style={s.companyLocation}>Chattogram</Text>
          </View>
          <Bullet>
            Managed food content posting, customer reviews, and story/rating
            updates in food communities.
          </Bullet>
          <Bullet>
            Tracked competitor social media activity and adjusted posting
            strategy accordingly.
          </Bullet>
          <Bullet>
            Supported local customer engagement through organic social media
            activity.
          </Bullet>
        </View>
      </View>
      
      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerText}>
          Rizwanul Islam Afraim • Marketing Operations • Page 1 of 2
        </Text>
      </View>
    </Page>

    {/* ════════ PAGE 2 ════════ */}
    <Page size="A4" style={s.page}>
      {/* Leadership */}
      <View>
        <Text style={s.sectionTitleFirst}>
          Leadership &amp; Event Coordination
        </Text>
        <View style={s.roleHeader}>
          <Text style={{ fontSize: 10, fontWeight: 700, color: C.gray900 }}>
            NSU Shangskritik Shangathan (NSUSS)
          </Text>
          <Text style={s.roleDate}>Vice President of Programs</Text>
        </View>
        <View style={{ marginTop: 4 }}>
          <Bullet>
            Coordinated teams, volunteers, artists, vendors, logistics, and
            event flow across major university cultural events.
          </Bullet>
          <Bullet>
            Worked across NSU Boishakh, Boshonto, NSUSS Unplugged 2024, and
            Annual Cultural Evening of NSU.
          </Bullet>
          <Bullet>
            Supported execution for high-crowd university events including NSU
            Boishakh and Boshonto, which reached 25,000+ audience scale.
          </Bullet>
          <Bullet>
            Built practical experience relevant to BTL activation, product
            launch support, field coordination, and stakeholder communication.
          </Bullet>
        </View>
      </View>

      {/* Key Projects */}
      <View>
        <Text style={s.sectionTitle}>Key Projects</Text>

        <View style={s.projectBlock}>
          <View style={s.projectHeader}>
            <Text style={s.projectTitle}>Gaari</Text>
            <Text style={s.projectLabel}>
              gaaribd.com — Premium Mobility Platform
            </Text>
          </View>
          <Bullet>
            Built and managed a digital mobility platform involving customer
            journey planning, booking flow, service presentation, and payment
            logic.
          </Bullet>
          <Bullet>
            Engineered &quot;Gaariwala,&quot; an AI customer support agent using
            NLP to reduce repetitive support workload.
          </Bullet>
          <Bullet>
            Applied SEO, digital service positioning, and operational planning to
            support growth of the platform.
          </Bullet>
        </View>

        <View style={s.projectBlock}>
          <View style={s.projectHeader}>
            <Text style={s.projectTitle}>The Trail / Content Systems</Text>
            <Text style={s.projectLabel}>
              trailheadlines.com — Intelligent News Platform
            </Text>
          </View>
          <Bullet>
            Built a content platform with CMS workflows, SEO, analytics,
            editorial structure, and performance-focused publishing.
          </Bullet>
          <Bullet>
            Designed digital content systems to support high-volume
            communication and audience engagement.
          </Bullet>
          <Bullet>
            Improved understanding of content strategy, digital publishing,
            brand consistency, and real-time topic tracking.
          </Bullet>
        </View>

        <View style={s.projectBlock}>
          <View style={s.projectHeader}>
            <Text style={s.projectTitle}>Yagacalls</Text>
            <Text style={s.projectLabel}>
              Digital Communication / Community Platform
            </Text>
          </View>
          <Bullet>
            Worked on platform structure, customer communication logic, content
            architecture, and digital growth systems.
          </Bullet>
          <Bullet>
            Applied SEO/AEO/GEO thinking, landing page structure, and user
            journey planning.
          </Bullet>
        </View>
      </View>

      {/* Education */}
      <View>
        <Text style={s.sectionTitle}>Education</Text>
        <View style={s.eduRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.eduSchool}>North South University</Text>
            <Text style={s.eduDegree}>
              BBA, Major in Marketing (2019 – 2025)
            </Text>
            <Text style={s.eduDetail}>
              Consumer Behavior, Market Research, Strategy
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.eduSchool}>
              Halishahar Cantonment Public
            </Text>
            <Text style={{ fontSize: 9, fontWeight: 600, color: C.gray700 }}>
              Higher Secondary Certificate (2018)
            </Text>
          </View>
        </View>
      </View>

      {/* Skills */}
      <View>
        <Text style={s.sectionTitle}>Skills</Text>
        <View style={s.skillsGrid}>
          <View style={s.skillCol}>
            <Text style={s.skillCategory}>Marketing &amp; Brand</Text>
            <Text style={s.skillItem}>• Market Research</Text>
            <Text style={s.skillItem}>• Competitor Analysis</Text>
            <Text style={s.skillItem}>• Brand Support</Text>
            <Text style={s.skillItem}>• Campaign Execution</Text>
          </View>
          <View style={s.skillCol}>
            <Text style={s.skillCategory}>Operations</Text>
            <Text style={s.skillItem}>• Lead Generation</Text>
            <Text style={s.skillItem}>• Sales Operations</Text>
            <Text style={s.skillItem}>• Performance Tracking</Text>
            <Text style={s.skillItem}>• Reporting &amp; CRM</Text>
          </View>
          <View style={s.skillCol}>
            <Text style={s.skillCategory}>Digital &amp; Tech</Text>
            <Text style={s.skillItem}>• Next.js / React</Text>
            <Text style={s.skillItem}>• SEO &amp; Analytics</Text>
            <Text style={s.skillItem}>• CMS Systems</Text>
            <Text style={s.skillItem}>• AI-Assisted Tools</Text>
          </View>
          <View style={s.skillCol}>
            <Text style={s.skillCategory}>Execution</Text>
            <Text style={s.skillItem}>• Event Operations</Text>
            <Text style={s.skillItem}>• Team Coordination</Text>
            <Text style={s.skillItem}>• Logistics Support</Text>
            <Text style={s.skillItem}>• Stakeholder Mgmt</Text>
          </View>
        </View>
      </View>

      {/* Certifications */}
      <View>
        <Text style={s.sectionTitle}>Certifications &amp; Interests</Text>
        <Text style={s.certItem}>
          • Search Engine Optimization (SEO) Assessment — LinkedIn
        </Text>
        <Text style={s.certItem}>
          • Microsoft PowerPoint Assessment — LinkedIn
        </Text>
        <Text style={s.certItem}>• Excel Bootcamp — NSU CPC</Text>
        <Text style={s.interestText}>
          Interest: Building digital products, AI-assisted workflows, and
          scalable digital systems.
        </Text>
      </View>

      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerText}>
          Rizwanul Islam Afraim • Marketing Operations • Page 2 of 2
        </Text>
      </View>
    </Page>
  </Document>
);
