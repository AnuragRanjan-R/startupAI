export type Policy = {
  id: number;
  title: string;
  category: 'central' | 'state' | 'tax' | 'sector';
  state?: string;
  date: string;
  excerpt: string;
  description: string;
  keyBenefits: string[];
  eligibilityCriteria: string[];
  applicationProcess?: string;
  website?: string;
};

export const policies: Policy[] = [
  // Central Government Policies
  {
    id: 1,
    title: "Startup India Initiative",
    category: "central",
    date: "2025",
    excerpt: "Provides tax exemptions, compliance ease, IPR fast-tracking, and Fund of Funds (₹10,000 crore) for DPIIT-recognized startups.",
    description: "The Startup India Initiative is a flagship program by the Government of India designed to build a strong ecosystem for nurturing innovation and startups in the country. It aims to drive sustainable economic growth and generate large-scale employment opportunities.",
    keyBenefits: [
      "Tax exemption for first 3 years of operation",
      "Reduced compliance burden for startups",
      "Fast-track patent examination",
      "Self-certification for labor and environment laws",
      "Access to Fund of Funds with corpus of ₹10,000 crore"
    ],
    eligibilityCriteria: [
      "Entity incorporated as private limited company, registered partnership firm, or LLP",
      "Turnover should not exceed ₹100 crores in any financial year",
      "Entity should not be more than 10 years old",
      "Should be working towards innovation or improvement of products",
      "Must be recognized by DPIIT"
    ],
    applicationProcess: "Apply for DPIIT recognition through the Startup India portal (startupindia.gov.in). Submit required documents including incorporation certificate, business plan, and innovation details.",
    website: "www.startupindia.gov.in"
  },
  {
    id: 2,
    title: "Startup India Seed Fund Scheme (SISFS)",
    category: "central",
    date: "2025",
    excerpt: "Grants up to ₹50 lakh for early-stage startups for prototyping and market entry.",
    description: "The Startup India Seed Fund Scheme (SISFS) aims to provide financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
    keyBenefits: [
      "Financial assistance up to ₹50 lakh",
      "Support for proof of concept and prototype development",
      "Funding for market entry and commercialization",
      "Mentorship and guidance through incubators"
    ],
    eligibilityCriteria: [
      "DPIIT-recognized startup",
      "Incorporated not more than 2 years ago at the time of application",
      "Should not have received more than ₹10 lakh of monetary support from Government",
      "Must be incubated at a SISFS-approved incubator"
    ],
    applicationProcess: "Apply through a SISFS-approved incubator. The incubator will evaluate the startup and submit recommendations to the Seed Fund Scheme committee.",
    website: "www.startupindia.gov.in/sisfs"
  },
  {
    id: 3,
    title: "Credit Guarantee Scheme for Startups (CGSS)",
    category: "central",
    date: "2025",
    excerpt: "Offers collateral-free loans up to ₹10 crore with 80% guarantee cover.",
    description: "The Credit Guarantee Scheme for Startups (CGSS) provides credit guarantees to loans extended by member lending institutions (MLIs) to eligible borrowers in the startup ecosystem.",
    keyBenefits: [
      "Collateral-free loans up to ₹10 crore",
      "80% guarantee cover of the loan amount",
      "Reduced risk for lenders, increasing loan approval chances",
      "Simplified loan application process"
    ],
    eligibilityCriteria: [
      "DPIIT-recognized startup",
      "Startup should have a viable business model",
      "Startup should not be in default to any lending institution",
      "The loan should be for business development purposes"
    ],
    applicationProcess: "Apply through member lending institutions (MLIs) such as scheduled commercial banks, financial institutions, or NBFCs.",
    website: "www.startupindia.gov.in/cgss"
  },
  {
    id: 4,
    title: "Pradhan Mantri Mudra Yojana (PMMY)",
    category: "central",
    date: "2025",
    excerpt: "Collateral-free loans up to ₹20 lakh for micro/small enterprises with three categories: Shishu (up to ₹50,000), Kishor (₹50,001-₹5 lakh), and Tarun (₹5-20 lakh).",
    description: "Pradhan Mantri MUDRA Yojana aims to promote entrepreneurship among small businesses and first-generation entrepreneurs by providing collateral-free loans for income-generating activities in manufacturing, trading, and services sectors[2][3].",
    keyBenefits: [
      "Collateral-free loans with three categories",
      "Shishu loans up to ₹50,000",
      "Kishor loans from ₹50,001 to ₹5 lakh",
      "Tarun loans from ₹5 lakh to ₹20 lakh",
      "Support for manufacturing, trading, and services sectors"
    ],
    eligibilityCriteria: [
      "Income-generating micro enterprises in non-farm sector",
      "Manufacturing, trading, or service activities",
      "Should not have availed term loan from any bank/financial institution",
      "For existing businesses, annual turnover should not exceed ₹50 crore"
    ],
    applicationProcess: "Apply through participating banks, NBFCs, and MFIs. Submit business plan, identity proof, address proof, and activity-related documents.",
    website: "www.mudra.org.in"
  },
  {
    id: 5,
    title: "Atal Innovation Mission (AIM)",
    category: "central",
    date: "2025",
    excerpt: "Grants up to ₹10 crore via Atal Incubation Centers for innovative startups across various sectors with extended support until 2028.",
    description: "Atal Innovation Mission is NITI Aayog's flagship program launched in 2016 to promote innovation and entrepreneurship. AIM 2025 has been approved for continuation until March 2028 with a ₹2,750 crore budget, having established over 10,000 Atal Tinkering Labs and 102 Atal Incubation Centers[7][12].",
    keyBenefits: [
      "Grants up to ₹10 crore for Atal Incubation Centers over 5 years",
      "Up to ₹25 lakh funding through Atal New India Challenge (ANIC)",
      "Access to 8,500+ mentors via Mentor India program",
      "Support through Atal Community Innovation Centers (ACICs)",
      "Infrastructure support including co-working spaces and prototyping labs"
    ],
    eligibilityCriteria: [
      "DPIIT-recognized startups preferred for ANIC",
      "Universities, research institutes, or corporates for setting up AICs",
      "Startups with prototypes for 17 focus areas including agriculture, mobility, clean energy",
      "Valid registration (Udyam for MSMEs, DPIIT for startups)",
      "No conflicting government funding"
    ],
    applicationProcess: "Apply through AIM portal (aim.gov.in). Select appropriate program (AIC, ANIC, ACIC) and submit required documents including project proposal and innovation details.",
    website: "www.aim.gov.in"
  },
  {
    id: 6,
    title: "SAMRIDH (MeitY)",
    category: "sector",
    date: "2025",
    excerpt: "Provides up to ₹40 lakh and mentorship for product-based tech startups.",
    description: "SAMRIDH (Startup Accelerators of MeitY for pRoduct Innovation, Development and growth) is an initiative by the Ministry of Electronics and Information Technology to support tech startups through financial assistance and mentorship.",
    keyBenefits: [
      "Financial support up to ₹40 lakh",
      "Mentorship from industry experts",
      "Market access opportunities",
      "Technical infrastructure support",
      "Networking with potential investors"
    ],
    eligibilityCriteria: [
      "Product-based tech startup",
      "Working in areas relevant to MeitY's focus",
      "Prototype or MVP ready",
      "Registered as a company in India"
    ],
    applicationProcess: "Apply through the SAMRIDH portal with product details, business plan, and team information.",
    website: "samridh.meity.gov.in"
  },
  {
    id: 7,
    title: "Stand-Up India",
    category: "central",
    date: "2025",
    excerpt: "Loans from ₹10 lakh to ₹2 crore for women/SC/ST entrepreneurs for greenfield projects. New scheme launched with enhanced loan limits up to ₹2 crore.",
    description: "The revised Stand-Up India scheme launched in 2025 provides term loans to women, SC, and ST entrepreneurs for new businesses. The scheme has been revamped with doubled loan amounts compared to the previous version which ended in March 2025[8][13].",
    keyBenefits: [
      "Term loans from ₹10 lakh to ₹2 crore (revised from ₹1 crore)",
      "Collateral-free loans with CGFSIL guarantee",
      "Repayment period of 7 years with 18 months moratorium",
      "Handholding support and mentorship",
      "Online capacity building for entrepreneurship skills"
    ],
    eligibilityCriteria: [
      "SC/ST and/or women entrepreneurs above 18 years",
      "Only for greenfield projects (new enterprises)",
      "25% margin money required",
      "Should not be in default with any financial institution"
    ],
    applicationProcess: "Apply through scheduled commercial banks. Submit business plan, identity proof, project details, and financial projections.",
    website: "www.standupmitra.in"
  },
  {
    id: 8,
    title: "SIP-EIT (Support for International Patent Protection in E&IT)",
    category: "sector",
    date: "2025",
    excerpt: "Reimburses 50% of patent filing costs, up to ₹15 lakh.",
    description: "The SIP-EIT scheme provides financial support to MSMEs and technology startups for international patent filing to encourage innovation and protect intellectual property rights globally.",
    keyBenefits: [
      "Reimbursement of up to 50% of patent filing costs",
      "Maximum support of ₹15 lakh per application",
      "Coverage for multiple international jurisdictions",
      "Support for patent attorney fees",
      "Guidance on international patent filing process"
    ],
    eligibilityCriteria: [
      "MSME or technology startup registered in India",
      "Working in electronics, IT, or related fields",
      "Patent should be for an original innovation",
      "Must have filed for domestic patent first"
    ],
    applicationProcess: "Apply to the SIP-EIT implementing agency with patent details, cost estimates, and innovation description.",
    website: "www.meity.gov.in/sip-eit"
  },
  {
    id: 9,
    title: "Design Clinic Scheme",
    category: "central",
    date: "2025",
    excerpt: "Subsidies up to ₹15 lakh for innovative product design projects and ₹3 lakh for workshops/seminars to increase MSME competitiveness through design.",
    description: "The Design Clinic Scheme provides financial assistance to MSMEs for design awareness workshops, seminars, and implementing design projects to increase competitiveness through design innovation[9][14].",
    keyBenefits: [
      "₹60,000 per seminar with 75% subsidy up to ₹3 lakh per workshop",
      "60% of project cost up to ₹9 lakh for individual MSME or group of 1-3 MSMEs",
      "60% of project cost up to ₹15 lakh for group of 4+ MSMEs",
      "Handholding support and guidance for design implementation",
      "Access to design expertise and technical institutions"
    ],
    eligibilityCriteria: [
      "MSMEs or groups of MSMEs as prime applicants",
      "Expert agencies (industry associations, technical institutions) for seminars",
      "Academic institutes/design companies as co-applicants",
      "40% contribution required from applicant MSME(s)"
    ],
    applicationProcess: "Apply through MSME Centre of Excellence or designated implementing agencies with project proposal and design requirements.",
    website: "www.msme.gov.in"
  },
  {
    id: 10,
    title: "Credit Link Capital Subsidy Scheme (CLCSS)",
    category: "central",
    date: "2025",
    excerpt: "15% subsidy on technology upgrades up to ₹1 crore for MSMEs to modernize plant and machinery.",
    description: "The Credit Linked Capital Subsidy Scheme provides upfront capital subsidy to MSMEs for technology upgradation and modernization of production equipment under 51 approved sub-sectors[10][15][20].",
    keyBenefits: [
      "15% capital subsidy on eligible plant and machinery",
      "Maximum subsidy of ₹15 lakh on loans up to ₹1 crore",
      "Additional 10% subsidy for SC/ST entrepreneurs and North-East regions",
      "Support for technology upgradation without business expansion",
      "Managed by 12 nodal agencies including SBI, PNB, SIDBI"
    ],
    eligibilityCriteria: [
      "Micro and Small Enterprises with valid Udyam Registration",
      "Term loans sanctioned by eligible lending institutions",
      "Industries upgrading from small to medium scale eligible",
      "Export-oriented and labour-intensive sectors preferred",
      "Should be under approved 51 sub-sectors/products"
    ],
    applicationProcess: "Apply through Primary Lending Institutions (PLIs) after loan sanction. Submit Udyam certificate, loan documents, and machinery details.",
    website: "www.msme.gov.in/clcss"
  },
  {
    id: 11,
    title: "Research, Development & Innovation (RDI) Scheme",
    category: "sector",
    date: "2025",
    excerpt: "₹1 lakh crore for long-term, low-interest financing for deep tech and strategic sectors.",
    description: "The Research, Development & Innovation (RDI) Scheme provides long-term, low-interest financing for startups working in deep tech and strategic sectors to promote indigenous technology development.",
    keyBenefits: [
      "Access to financing from ₹1 lakh crore fund",
      "Low-interest rates for long-term projects",
      "Support for R&D infrastructure development",
      "Collaboration opportunities with research institutions",
      "Priority sector status for funding"
    ],
    eligibilityCriteria: [
      "Working in deep tech or strategic sectors",
      "Clear R&D roadmap and innovation potential",
      "Registered as a company in India",
      "Demonstrated technical capability"
    ],
    applicationProcess: "Apply through the designated nodal agencies with detailed project proposal, R&D plan, and expected outcomes.",
    website: "www.investindia.gov.in/rdi-scheme"
  },
  {
    id: 12,
    title: "Remission of Duties and Taxes on Exported Products (RoDTEP)",
    category: "central",
    date: "2025",
    excerpt: "Remits taxes/duties on exports with ₹15,070 crore allocation for 2024–25 to boost export competitiveness.",
    description: "RoDTEP scheme provides remission of duties and taxes paid on inputs used in exported products to enhance export competitiveness and support Make in India initiative.",
    keyBenefits: [
      "Remission of central and state duties/taxes on exported products",
      "₹15,070 crore allocation for 2024-25",
      "Electronic ledger for claim settlement",
      "Covers various sectors including textiles, chemicals, pharmaceuticals",
      "Replaces MEIS scheme with WTO compliant mechanism"
    ],
    eligibilityCriteria: [
      "Exporters of eligible products under RoDTEP schedule",
      "Valid export documentation required",
      "Goods should be manufactured in India",
      "Compliance with export regulations"
    ],
    applicationProcess: "Automatic credit to exporter's ledger upon export realization. No separate application required for eligible exports.",
    website: "www.dgft.gov.in"
  },

  // Tax Policies
  {
    id: 13,
    title: "Section 80-IAC Income Tax Exemption",
    category: "tax",
    date: "2025",
    excerpt: "100% income tax exemption for eligible startups for 3 consecutive years out of 10 years since incorporation.",
    description: "Under Section 80-IAC of the Income Tax Act, eligible startups can claim 100% tax exemption on profits for three consecutive years out of the first ten years since incorporation.",
    keyBenefits: [
      "100% income tax exemption on profits for 3 consecutive years",
      "Freedom to choose any 3 consecutive years out of first 10 years",
      "Reduced tax burden during early growth phase",
      "More capital available for business expansion"
    ],
    eligibilityCriteria: [
      "DPIIT-recognized startup",
      "Incorporated on or after April 1, 2016",
      "Total turnover not exceeding ₹100 crore since incorporation",
      "Working towards innovation, development, or improvement of products/processes/services"
    ],
    applicationProcess: "Apply for DPIIT recognition first, then claim the exemption while filing income tax returns using Form 10-IB.",
    website: "www.incometaxindia.gov.in"
  },

  // State Policies - Karnataka
  {
    id: 14,
    title: "Karnataka Startup Policy 2022-2027",
    category: "state",
    state: "Karnataka",
    date: "2022-2027",
    excerpt: "Offers ₹25 lakh grants, tax reimbursements, and incubation support for tech startups with ₹100 crore venture capital fund for deep tech startups.",
    description: "The Karnataka Startup Policy 2022-2027 aims to position Karnataka as the 'Champion State' for startups by creating 10,000+ additional startups and establishing a global innovation hub[22][24].",
    keyBenefits: [
      "Grants up to ₹25 lakh for innovative projects",
      "₹100 crore venture capital fund for deep tech startups",
      "Reimbursement of state GST paid",
      "Access to government-supported incubators",
      "Patent filing cost reimbursement",
      "₹15 crore for center of excellence development"
    ],
    eligibilityCriteria: [
      "Registered in Karnataka",
      "DPIIT recognition preferred",
      "Less than 10 years since incorporation",
      "Working in technology, AI, ML, EV, medtech, robotics, or drones"
    ],
    applicationProcess: "Apply through the Karnataka Startup Cell portal with required documents including business plan and innovation details.",
    website: "www.startup.karnataka.gov.in"
  },
  {
    id: 15,
    title: "ELEVATE Karnataka",
    category: "state",
    state: "Karnataka",
    date: "2025",
    excerpt: "Provides up to ₹50 lakh funding and comprehensive support for early-stage startups. Has funded 1,084+ startups with ₹249 crore disbursed across 21 rounds.",
    description: "ELEVATE is Karnataka's flagship grant-in-aid seed funding scheme that has conducted 21 rounds and supported over 1,000 startups across multiple sectors including sustainability, biotechnology, aerospace, and rural innovation[26][27][35].",
    keyBenefits: [
      "Grants ranging from ₹21 lakh to ₹50 lakh per startup",
      "Extensive incubation and mentorship support",
      "Access to venture capital networks",
      "Subsidized incubation through Centers of Excellence",
      "Gateway to Karnataka Startup Policy 2022-27 benefits",
      "Support for patent, marketing, GST, and quality certification costs"
    ],
    eligibilityCriteria: [
      "Early-stage startups in Karnataka",
      "Focus on emerging technologies: DeepTech, AI, ML, robotics, blockchain, 5G, IoT",
      "Startups in sustainability, biotechnology, aerospace sectors preferred",
      "Women-led and beyond Bengaluru startups encouraged"
    ],
    applicationProcess: "Apply through Karnataka's startup portal during open application periods. Submit detailed business plan, innovation details, and team information.",
    website: "www.startup.karnataka.gov.in/elevate"
  },
  {
    id: 16,
    title: "Karnataka Innovation and Technology Society (KITS)",
    category: "state",
    state: "Karnataka",
    date: "2025",
    excerpt: "Supports startups with seed funding, co-working spaces, and market access programs through various technology and innovation initiatives.",
    description: "KITS serves as Karnataka's nodal agency for promoting innovation and technology entrepreneurship, providing comprehensive support to startups through infrastructure, funding, and market linkage programs.",
    keyBenefits: [
      "Seed funding support for technology startups",
      "Access to co-working spaces and incubation facilities",
      "Market access and business development programs",
      "Technology transfer and commercialization support",
      "Networking opportunities with industry partners"
    ],
    eligibilityCriteria: [
      "Technology-based startups registered in Karnataka",
      "Innovation-driven business models",
      "Early to growth stage companies",
      "Alignment with state's technology priorities"
    ],
    applicationProcess: "Apply through KITS portal with business plan, technology details, and funding requirements.",
    website: "www.kitsindia.com"
  },
  {
    id: 17,
    title: "New Age Innovation Network (NAIN)",
    category: "state",
    state: "Karnataka",
    date: "2025",
    excerpt: "Grants up to ₹10 lakh for student-led startups in emerging technologies like AI, IoT, and other innovative sectors.",
    description: "NAIN focuses on nurturing student entrepreneurship and innovation in emerging technologies, providing early-stage support to convert academic ideas into viable startups.",
    keyBenefits: [
      "Grants up to ₹10 lakh for student startups",
      "Focus on AI, IoT, and emerging technologies",
      "Mentorship from industry experts",
      "Access to university resources and labs",
      "Pathway to other Karnataka startup schemes"
    ],
    eligibilityCriteria: [
      "Student-led startups or recent graduates",
      "Working on emerging technologies like AI, IoT",
      "Registered or willing to register in Karnataka",
      "Innovative business model with scalability potential"
    ],
    applicationProcess: "Apply through designated university incubators or NAIN portal with project proposal and team details.",
    website: "www.startup.karnataka.gov.in"
  },

  // State Policies - Haryana
  {
    id: 18,
    title: "Haryana Startup Policy 2021-2026",
    category: "state",
    state: "Haryana",
    date: "2021-2026",
    excerpt: "Provides ₹10 lakh seed grants, ₹15,000 monthly sustenance allowance, and comprehensive tax exemptions for startups with enhanced benefits in 2025.",
    description: "The Haryana Startup Policy aims to foster entrepreneurship and promote an innovation-based economy through financial incentives, infrastructure support, and regulatory simplification[28][36][37].",
    keyBenefits: [
      "Seed grant up to ₹10 lakh (enhanced from ₹5 lakh)",
      "Monthly sustenance allowance of ₹15,000 for one year",
      "50% Net SGST reimbursement for 7 years",
      "100% patent registration fee reimbursement up to ₹25 lakh",
      "Lease rental subsidy: 30% general, 45% women-led startups",
      "₹2.5 lakh annual support for national acceleration programs"
    ],
    eligibilityCriteria: [
      "DPIIT-recognized startup",
      "Registered in Haryana",
      "Less than 10 years since incorporation",
      "Annual turnover not exceeding ₹100 crore"
    ],
    applicationProcess: "Apply through the Haryana Enterprise and Employment portal with required documents and business plan.",
    website: "haryanaindustries.gov.in"
  },
  {
    id: 19,
    title: "Startup Haryana Catalyst Fund",
    category: "state",
    state: "Haryana",
    date: "2025",
    excerpt: "₹2,000 crore 'Fund of Funds' offering equity/debt support for early-stage startups in tech and agritech sectors to establish Haryana as innovation hub.",
    description: "The enhanced Haryana Catalyst Fund aims to create a ₹2,000 crore Fund of Funds with private investor participation to boost the state's startup ecosystem and establish Haryana as a major hub of innovation and entrepreneurship[29].",
    keyBenefits: [
      "Access to ₹2,000 crore Fund of Funds",
      "Equity and debt funding options",
      "Focus on tech and agritech startups",
      "Private investor collaboration",
      "Integration with Haryana Venture Capital Fund"
    ],
    eligibilityCriteria: [
      "Early to growth-stage startups",
      "Registered in Haryana or willing to relocate",
      "Technology or agriculture-focused business models",
      "Scalable and innovative solutions"
    ],
    applicationProcess: "Apply through Haryana Venture Capital Fund portal with detailed business plan, financial projections, and funding requirements.",
    website: "startupharyana.gov.in"
  },
  {
    id: 20,
    title: "Haryana Incubation Centre Support Scheme",
    category: "state",
    state: "Haryana",
    date: "2025",
    excerpt: "Grants up to ₹3 crore for incubators (₹2 crore government, ₹1 crore private) to support startups with mentorship and infrastructure development.",
    description: "This scheme supports the establishment and operation of incubation centers in Haryana to provide comprehensive startup support including mentorship, infrastructure, and capacity building programs[28].",
    keyBenefits: [
      "Capital grant up to ₹2 crore for government host institutes",
      "Capital grant up to ₹1 crore for private host institutes",
      "₹20 lakh per event for startup competitions",
      "3-year incubation support (enhanced from 1 year)",
      "Subsidized plug-and-play facilities"
    ],
    eligibilityCriteria: [
      "Government and private institutions in Haryana",
      "Capability to provide incubation services",
      "Infrastructure and mentorship capacity",
      "Alignment with state startup priorities"
    ],
    applicationProcess: "Apply through Haryana Startup Cell with institutional details, infrastructure plans, and proposed incubation programs.",
    website: "startupharyana.gov.in"
  },

  // State Policies - Other States
  {
    id: 21,
    title: "Uttar Pradesh Startup Policy 2020 (First Amendment 2022)",
    category: "state",
    state: "Uttar Pradesh",
    date: "2020-2025",
    excerpt: "Provides ₹5 lakh prototype grants, ₹7.5 lakh seed capital, and patent reimbursements with goal to create 10,000 startups and 100 incubators.",
    description: "The UP Startup Policy 2020 with 2022 amendments aims to establish UP among top 3 states in startup ranking, create ecosystem for 10,000 startups, and establish 100 incubators with one in each district[30][38].",
    keyBenefits: [
      "Prototype development grants up to ₹5 lakh",
      "Seed capital assistance up to ₹7.5 lakh",
      "Patent filing fee reimbursement",
      "100 incubators planned (minimum one per district)",
      "1 million sq ft incubation space development",
      "8 Centers of Excellence establishment"
    ],
    eligibilityCriteria: [
      "Registered in Uttar Pradesh",
      "DPIIT recognition preferred",
      "Working towards innovation and technology development",
      "Alignment with state's focus sectors"
    ],
    applicationProcess: "Apply through StartinUP portal (startinup.up.gov.in) with business plan, innovation details, and funding requirements.",
    website: "startinup.up.gov.in"
  },
  {
    id: 22,
    title: "Madhya Pradesh Startup Policy 2022",
    category: "state",
    state: "Madhya Pradesh",
    date: "2022-2027",
    excerpt: "Offers 18% financial support up to ₹18 lakh per funding stage, ₹5,000 monthly rent support, and comprehensive startup ecosystem development.",
    description: "MP Startup Policy 2022 provides comprehensive framework for startup establishment and growth with financial incentives up to 18% of total funding across four investment stages, targeting creation of 5,000+ recognized startups[31][39].",
    keyBenefits: [
      "Financial assistance up to 18% of funding or ₹18 lakh per stage",
      "Support for maximum 4 stages during startup lifecycle",
      "₹5,000 monthly rent support for new enterprises",
      "₹5,000 monthly salary allowance per employee (max 25 employees)",
      "Access to 300+ industrial parks and infrastructure"
    ],
    eligibilityCriteria: [
      "Registered in Madhya Pradesh",
      "DPIIT recognition preferred",
      "Product-based startups encouraged",
      "Innovation and entrepreneurship focus",
      "Alignment with Self-Reliant Madhya Pradesh objectives"
    ],
    applicationProcess: "Apply through MP government startup portal with detailed business plan, funding requirements, and innovation description.",
    website: "www.mp.gov.in"
  },
  {
    id: 23,
    title: "Gujarat Startup Policy 2022-2027",
    category: "state",
    state: "Gujarat",
    date: "2022-2027",
    excerpt: "Grants up to ₹10 lakh seed grants, ₹2.5 lakh IP filing support, and comprehensive student startup support through SSIP 2.0 program.",
    description: "Gujarat's Student Startup and Innovation Policy (SSIP 2.0) for 2022-2027 focuses on nurturing 50 lakh students across 1,000+ higher education institutes and 10,000 schools for innovation and entrepreneurship[32][40].",
    keyBenefits: [
      "Up to ₹10 lakh seed grant for startup innovations",
      "₹75,000 IP filing support locally, ₹1.5 lakh for international filing",
      "₹5 crore benefit for university incubation centers over 5 years",
      "₹2 crore support for innovation activities in institutions",
      "Support for 10,000 proof of concepts/prototypes"
    ],
    eligibilityCriteria: [
      "Student-led startups or educational institution-based",
      "Registered in Gujarat or willing to establish",
      "Innovation and technology focus",
      "Alignment with SSIP 2.0 guidelines"
    ],
    applicationProcess: "Apply through SSIP grantee institutions (186 universities and institutions) or Gujarat startup portal.",
    website: "www.ssip.gujarat.gov.in"
  },
  {
    id: 24,
    title: "Tamil Nadu Startup and Innovation Policy 2023-2028",
    category: "state",
    state: "Tamil Nadu",
    date: "2023-2028",
    excerpt: "Provides ₹15 lakh seed funding and incubation support with goal to create 5,000 technology startups and establish multiple innovation hubs.",
    description: "Tamil Nadu's sectoral startup policy aims to establish the state as a Global Innovation Hub and most preferred destination for startups by creating 5,000 startups including 10 global high-growth startups[33][41].",
    keyBenefits: [
      "Seed funding up to ₹15 lakh for technology startups",
      "Comprehensive incubation support and mentorship",
      "Focus on 11 thrust areas including AI, ML, IoT, SaaS",
      "Support for global high-growth startups with social impact",
      "Establishment of startup hubs in multiple cities"
    ],
    eligibilityCriteria: [
      "Registered in Tamil Nadu",
      "Technology and innovation focus",
      "Working in thrust areas: Transport, Electronics, Healthcare, Biotech, Agriculture, Renewable Energy, Fintech, Textiles, IT, AI/ML",
      "Potential for high growth and social impact"
    ],
    applicationProcess: "Apply through Tamil Nadu startup portal with detailed business plan, technology description, and innovation potential.",
    website: "www.startuptn.in"
  },
  {
    id: 25,
    title: "Maharashtra Startup Policy 2022-2027",
    category: "state",
    state: "Maharashtra",
    date: "2022-2027",
    excerpt: "Offers ₹25 lakh seed grants and tax exemptions for startups in emerging sectors with comprehensive ecosystem support.",
    description: "Maharashtra's startup policy focuses on creating a robust startup ecosystem with financial support, tax incentives, and infrastructure development for startups in emerging and traditional sectors.",
    keyBenefits: [
      "Seed grants up to ₹25 lakh",
      "Tax exemptions and reimbursements",
      "Support for emerging sector startups",
      "Infrastructure and incubation facilities",
      "Market access and investor connect programs"
    ],
    eligibilityCriteria: [
      "Registered in Maharashtra",
      "DPIIT recognition preferred",
      "Focus on emerging sectors and technologies",
      "Innovation-driven business models"
    ],
    applicationProcess: "Apply through Maharashtra startup portal with business plan, sector details, and funding requirements.",
    website: "www.startup.maharashtra.gov.in"
  }
];
