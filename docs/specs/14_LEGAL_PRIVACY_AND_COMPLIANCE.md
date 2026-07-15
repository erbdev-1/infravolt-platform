# InfraVolt — Legal, Privacy and Compliance

> Document ID: INF-14  
> Version: 0.1.0  
> Status: Draft for Founder, UK Counsel, Ukraine Counsel, Privacy, Product and Technical Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Legal Owner: Founder-appointed UK/Ukraine Legal Counsel  
> Privacy Owner: Founder-appointed Privacy Lead  
> Technical Owner: Product Director / CTO / Head Agent  
> Content Compliance Owner: Technical Content Lead + Market Lead  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0, 06_DATABASE_SCHEMA.md v0.1.0, 07_BACKEND_API_AND_WORKFLOWS.md v0.1.0, 08_ADMIN_AND_SALES_OPERATIONS.md v0.1.0, 09_PARTNER_PORTAL.md v0.1.0, 10_AUTH_SECURITY_AND_PERMISSIONS.md v0.1.0, 11_CONTENT_SEO_AND_ANALYTICS.md v0.1.0, 12_TEST_QA_AND_ACCESSIBILITY.md v0.1.0, 13_DEVOPS_DEPLOYMENT_AND_OBSERVABILITY.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required public locales: en-GB + uk-UA  
> Domain model: separate UK and Ukraine domains, one shared application  
> Product model: B2B information, lead/quote request and partner portal; no self-service checkout or automatic contract acceptance in baseline  
> Accessibility policy: WCAG 2.2 Level AA product target; legal obligations reviewed separately  
> Last updated: 15 July 2026  
> Document language: Turkish; legal document, data, consent, event, route and policy identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt’un UK ve Ukraine dijital platformu için legal, privacy ve compliance mimarisini tanımlar.

Belge:

- applicable-law ve counsel review sınırlarını,
- controller/processor ve Gersan/partner ilişkilerini,
- public legal page setini,
- Terms of Use, Portal Terms, Privacy Notice ve Cookie Notice kapsamını,
- form ve workflow lawful-basis yaklaşımını,
- cookie/storage-access ve analytics kararını,
- operational ve marketing communication ayrımını,
- data inventory, minimisation, retention ve deletion modelini,
- data subject rights operasyonunu,
- processor contract ve international transfer governance’ını,
- privacy/security incident coordination’ını,
- Ukrainian language ve market disclosure kontrollerini,
- technical claim, certification ve product-compliance evidence modelini,
- intellectual property, document licensing ve user-content kurallarını,
- sanctions, export control, dealer due diligence ve anti-bribery sınırlarını,
- legal publication, audit, training ve launch gate’lerini

kesinleştirir.

Bu belge yayınlanabilir nihai hukuk metni değildir. Counsel tarafından onaylanacak ürün ve operasyon sözleşmesidir.

---

## 2. Hukuki Statü ve Uyarı

Bu doküman:

- legal advice değildir,
- bir avukat–müvekkil görüşü değildir,
- UK veya Ukraine hukukunun eksiksiz özeti değildir,
- ürün bazında CE/UKCA/Ukrainian conformity kararı değildir,
- tax, customs veya export licence görüşü değildir.

Amaç; hukukçunun inceleyebileceği açık data flow, karar, risk, owner ve acceptance kriterleri oluşturmaktır.

Production launch öncesi:

- exact legal entity,
- controller identity,
- legal pages,
- lawful basis,
- cookie/analytics mode,
- provider transfers,
- retention schedule,
- product claim/compliance language,
- Ukraine market structure

qualified counsel tarafından onaylanır.

---

## 3. Ana Karar

InfraVolt legal/privacy modeli şu ilkelere dayanacaktır:

- UK ve Ukraine için ayrı market-appropriate legal publication,
- tek shared data platform fakat explicit market/source context,
- privacy notice as transparency, not forced consent,
- optional marketing consent separated from requested service,
- no non-essential tracking before approved legal mode,
- purpose-specific minimum personal data,
- versioned legal documents and evidence,
- processor/subprocessor and transfer register,
- enforceable retention/deletion workflow,
- human-approved technical/compliance claims,
- no automatic legal/commercial/credit/dealer decision,
- counsel-approved breach and regulatory response.

---

## 4. Compliance Principles

### 4.1 Purpose before data

Her kişisel veri alanı belirli bir iş amacı ve dayanak taşır.

### 4.2 Consent is not a shortcut

Consent gerekmeyen veya uygun olmayan işlem için zorunlu checkbox oluşturulmaz.

### 4.3 Transparency at collection

Kullanıcı veri verirken controller, amaç, paylaşım, retention ve haklara erişebilir.

### 4.4 Separate markets, no false presence

Ukraine domain UK şirketini sahte Ukrainian legal entity/ofis gibi göstermez.

### 4.5 Evidence before claim

Objective technical, certification, environmental ve comparison claim evidence olmadan yayınlanmaz.

### 4.6 Human commercial accountability

Website acknowledgement, binding quote/offer/contract değildir.

### 4.7 Privacy by default

Optional analytics, marketing ve upload özellikleri approved değilse kapalıdır.

### 4.8 Rights are operational

Privacy right request yalnız policy metninde kalmaz; owner, SLA ve verified workflow alır.

### 4.9 Retain by rule, not fear

“Belki lazım olur” retention gerekçesi değildir.

### 4.10 Law changes, controls follow

Legal source ve provider behavior düzenli izlenir.

---

## 5. Kapsam

### 5.1 Dahil

- UK public site
- Ukraine public site
- Admin
- Partner Portal
- Quote/dealer/document/contact/support forms
- Authentication and invitations
- Transactional and marketing email
- Analytics/cookies/storage-access technologies
- Technical content/certificates/documents
- Application Map assets
- Providers and international data flows
- Data rights, retention, deletion and breach
- Dealer/partner onboarding and due diligence

### 5.2 Kapsam dışı veya ayrı uzmanlık gerektiren

- Employee HR privacy
- Payroll/accounting detail
- Formal tax/VAT/customs advice
- Product-by-product conformity assessment
- Export licence classification
- Construction design professional liability
- Consumer checkout/returns regime
- Payment card processing
- Full employment/agency/dealership agreement drafting
- Litigation strategy

---

## 6. Current Product Legal Boundary

Baseline platform:

- product/industry information,
- technical resource request,
- quote/project-support request,
- dealer application,
- approved partner access,
- controlled document delivery,
- operational communication

sunar.

Baseline platform:

- checkout yapmaz,
- payment almaz,
- kullanıcı adına purchase order oluşturmaz,
- website submission ile bağlayıcı fiyat/tedarik taahhüdü vermez,
- dealer approval’ı otomatik vermez,
- credit/compliance/eligibility kararını otomatik vermez.

Bu sınır değişirse legal architecture yeniden değerlendirilir.

---

## 7. Jurisdiction Model

| Context | Primary legal review |
|---|---|
| UK domain, UK company/customer contact | UK counsel |
| Ukraine domain and Ukrainian users/market activity | Ukraine counsel |
| Shared providers/international processing | UK + Ukraine privacy review |
| Product placement/conformity in Great Britain | UK product-regulatory specialist |
| Product placement/conformity in Ukraine | Ukraine product-regulatory specialist |
| Export/end-use/sanctions | UK trade-compliance specialist |
| Gersan content/brand/data sharing | Contract/IP/privacy review |

Domain tek başına bütün applicable-law analizini çözmez; entity, user, activity, data flow ve contract dikkate alınır.

---

## 8. UK Legal Baseline

Primary baseline includes, as applicable:

- UK GDPR
- Data Protection Act 2018
- Data (Use and Access) Act 2025 changes
- Privacy and Electronic Communications Regulations
- Companies Act/trading disclosure requirements
- Equality Act 2010
- Electronic Commerce rules if transaction scope introduced
- advertising/misleading marketing rules and CAP Code
- product-specific safety/conformity rules
- Copyright, Designs and Patents Act 1988
- Trade Marks Act 1994
- Bribery Act 2010
- sanctions/export control rules

Applicability and exact obligations counsel decides.

---

## 9. Ukraine Legal Baseline

Primary baseline includes, as applicable:

- Law of Ukraine “On Protection of Personal Data” № 2297-VI
- Law of Ukraine “On Supporting the Functioning of the Ukrainian Language as the State Language” № 2704-VIII
- Law of Ukraine “On Electronic Commerce” № 675-VIII if electronic transaction scope applies
- consumer/advertising/electronic communication rules as applicable
- product technical regulations and conformity rules
- IP/trademark rules
- anti-corruption, sanctions and trade requirements

Ukraine counsel launch tarihinde current edition ve InfraVolt entity/presence modeline göre doğrular.

---

## 10. Other Visitor Jurisdictions

Public internet farklı ülkelerden erişilebilir.

InfraVolt:

- UK ve Ukraine’i target market olarak tanımlar,
- başka ülkeye otomatik commercial availability claim yapmaz,
- unsupported market’e self-service binding sale sunmaz,
- new targeted market/campaign/domain açmadan legal review yapar,
- EU/EEA targeting oluşursa EU GDPR/representative/transfer scope’unu ayrıca değerlendirir.

---

## 11. Legal Entity Identity

Production’a çıkmadan exact values gerekir:

- full registered company name
- company number
- jurisdiction of registration
- registered office
- trading name/brand relationship
- VAT number if displayed/required
- privacy/controller contact
- customer/business contact
- Ukrainian local entity/branch/representative status if any

Placeholder company identity production’da yayınlanmaz.

---

## 12. Brand vs Legal Entity

`InfraVolt` brand olabilir; contract ve privacy controller gerçek legal entity olur.

Page/footer wording pattern:

```text
InfraVolt is a trading name/brand of [FULL LEGAL ENTITY],
registered in [JURISDICTION] under company number [NUMBER].
```

Exact wording counsel and company records ile onaylanır.

Gersan ile reseller/distributor/representative relationship yalnız signed agreement ölçüsünde tanımlanır.

---

## 13. Legal Governance Roles

| Role | Accountability |
|---|---|
| Founder/CEO | Entity, market, commercial risk and final business approval |
| UK Counsel | UK legal pages, data, marketing, product and contract review |
| Ukraine Counsel | Ukraine language, privacy, commerce, product and local obligations |
| Privacy Lead | Data map, rights, DPIA, provider and breach coordination |
| Technical Owner | Controls, evidence, deletion/export and security implementation |
| Content Compliance Owner | Claims, sources, certificate and expiry review |
| Sales/Dealer Owner | Marketing, due diligence and partner records |
| Security Lead | Incident containment/evidence; not sole legal notifier |

---

## 14. Legal Decision Hierarchy

Priority:

1. Applicable law/regulator/court obligation
2. Signed contract
3. Approved legal policy/document
4. Master/product specification
5. Technical implementation decision
6. Operational preference

Conflict hukukçu ve owner’a escalated edilir; code legal karar üretmez.

---

## 15. Compliance Register

Register fields:

- obligation/control ID
- jurisdiction
- source/reference
- applicability
- owner
- system/process
- evidence
- review cadence
- last review
- next review
- status/exception

Legal source link tek başına implemented control kanıtı değildir.

---

## 16. Required Legal Documents

### Public baseline

- UK Privacy Notice
- Ukraine Privacy Notice in Ukrainian
- UK Cookie Notice
- Ukraine Cookie/technology Notice in Ukrainian
- Terms of Use
- Accessibility Statement
- Legal/Company Information

### Protected/business baseline

- Partner Portal Terms
- Acceptable Use provisions
- Document/confidentiality terms
- Dealer application notice
- Provider Data Processing Agreements
- Internal privacy/retention/incident procedures

---

## 17. Legal Route Architecture

Public route keys remain stable per domain:

```text
/privacy
/cookies
/terms
/accessibility
/legal
```

Each canonical domain renders its approved market/locale publication.

English legal page UA domain’de Ukrainian legal page gibi sunulmaz.

---

## 18. Legal Content Storage

Legal document fields:

- `document_key`
- `market`
- `locale`
- `version`
- `status`
- `effective_at`
- `published_at`
- `approved_by`
- `approval_reference`
- `content_hash`
- `supersedes_version`
- `review_due_at`

MVP code-owned Markdown olabilir; version/audit aynı kalır.

---

## 19. Legal Versioning

Version change when:

- controller/entity changes
- purpose/lawful basis materially changes
- new provider/transfer class
- retention changes
- user rights/contact changes
- cookie/analytics mode changes
- portal terms change
- jurisdiction/law change

Typo correction major re-acknowledgement gerektirmeyebilir; change log yine tutulur.

---

## 20. Legal Publication Workflow

1. Draft
2. Internal product/data review
3. Qualified legal review
4. Market-language review
5. Approved
6. Scheduled/published
7. Technical verification
8. Review/renewal
9. Superseded/archive

Unapproved legal copy production publish edilemez.

---

## 21. UK Website Corporate Disclosures

UK limited company website/footer/legal page, current official requirements and counsel confirmation ile en az:

- full registered name,
- company number,
- registered office address,
- place/jurisdiction of registration,
- limited status

gösterir.

VAT/regulatory/trade details yalnız required/accurate ise eklenir.

---

## 22. Ukraine Website Disclosures

Ukraine domain için counsel şu bilgileri değerlendirir:

- seller/service-provider identity
- address/contact
- registration/tax details if applicable
- local entity/branch/representative
- activity/licence information if applicable
- complaint/user-rights channel
- contract/e-commerce disclosures if binding electronic transaction introduced

UK company details Ukrainian dilinde açıklanabilir; olmayan local entity iddia edilmez.

---

## 23. Contact Information Governance

- Legal contact ≠ general sales inbox
- Privacy contact named function/address
- Security contact route controlled
- Registered office accurate
- Market phone/email ownership verified
- Update triggers all legal pages/templates
- No personal founder home address unless it is approved public registered office

---

## 24. Terms of Use Purpose

Public Terms of Use:

- website access/use,
- information status,
- acceptable conduct,
- IP ownership/licence,
- technical disclaimer,
- external links,
- availability,
- liability limits subject to law,
- governing law/jurisdiction,
- contact/change process

tanımlar.

Terms, Privacy Notice’in yerine geçmez.

---

## 25. No Binding Offer

Website product page, availability statement, quote request acknowledgement veya automated email:

- binding offer değildir,
- price commitment değildir,
- stock guarantee değildir,
- delivery commitment değildir,
- product suitability approval değildir,
- dealership approval değildir.

Binding commercial position yalnız authorized human-issued proposal/order/contract terms ile oluşur.

---

## 26. Quote Request Legal Status

Public form copy:

- request/interest olduğunu açıklar,
- receipt acknowledgement verir,
- review/follow-up expectation belirtir,
- automatic acceptance dilinden kaçınır,
- mandatory marketing consent istemez,
- privacy link sunar.

`Your order is confirmed` kullanılmaz; ortada order yoktur.

---

## 27. Technical Information Disclaimer

Approved wording must explain:

- website summary may not contain all installation/design details,
- current official datasheet/manual/certificate controls,
- application suitability project-specific assessment may require,
- qualified professional and applicable rules/standards remain relevant,
- specification/version may change through controlled updates.

Disclaimer yanlış claim’i veya negligence’ı otomatik cure etmez.

---

## 28. Liability Limitations

Terms counsel-drafted limitations may address:

- permitted business-user scope,
- indirect loss categories,
- availability/interruption,
- third-party content/links,
- user misuse,
- maximum cap where lawful,
- exclusions that cannot legally be limited.

Generic internet template copy-paste edilmez.

---

## 29. Acceptable Use

Forbidden:

- unlawful access/testing without authorization
- credential sharing
- scraping/bulk extraction that harms service or violates rights
- malicious upload
- impersonation
- export/re-distribution of restricted documents
- removal of confidentiality/IP notices
- use for sanctioned/prohibited end-use
- interference with security/rate limits

Security research contact and good-faith reporting policy V1’de değerlendirilebilir.

---

## 30. Governing Law and Jurisdiction

Public Terms, Portal Terms ve commercial contract farklı governing-law decisions alabilir.

Decision factors:

- InfraVolt legal entity
- user/company location
- mandatory local law
- dealer agreement
- dispute practicality
- Ukraine local presence

Product team governing law uydurmaz; counsel yazar.

---

## 31. External Links

- destination clearly third party
- no endorsement implied unless approved
- current/safe links
- privacy/cookies third-party behavior disclosed where embedded
- link target does not waive responsibility for InfraVolt’s own claim
- no private/referrer-sensitive URL leakage

---

## 32. Privacy Notice Is Not Consent

Privacy Notice’in amacı kullanıcıyı bilgilendirmektir.

Public quote/dealer/contact/document formunda:

- notice link gösterilir,
- collection-time short notice sunulur,
- processing uygun lawful basis’e dayanır,
- “Privacy Policy’yi kabul etmeden teklif alamazsın” default değildir.

Marketing consent ayrı optional control’dür.

---

## 33. Consent Field Naming Correction

Existing generic `consent_terms_version` fields semantic risk taşır.

Recommended separation:

- `privacy_notice_version_shown`
- `form_terms_version_accepted` only if real terms acknowledgement
- `marketing_consent_status`
- `marketing_consent_version`
- `marketing_consent_at`
- `marketing_consent_withdrawn_at`

Privacy information shown olması “consent” olarak kaydedilmez.

---

## 34. Controller Role

Controller:

- personal data’nın why/how kararını verir,
- purposes/lawful bases belirler,
- transparency sağlar,
- rights/breach/retention/processor obligations taşır.

Exact InfraVolt controller legal entity LEG-001 açık kararıdır.

---

## 35. Processor Role

Provider/customer context’e göre processor:

- documented instructions ile işler,
- security/confidentiality sağlar,
- subprocessors yönetir,
- rights/breach/delete/return support’u verir,
- contract ve audit information sağlar.

Provider marketing amaçları için kendi controller rolü alıyorsa ayrıca değerlendirilir.

---

## 36. Gersan Relationship

Gersan ile ayrı ayrı belirlenir:

- product content licensor
- manufacturer/data source
- independent controller
- joint controller risk
- processor/recipient
- lead recipient
- warranty/compliance responsibility
- document owner

Public submission Gersan’a otomatik aktarılmaz unless purpose, role, contract, transfer and notice approved.

---

## 37. Partner/Dealer Data Roles

Portal company, InfraVolt ve manufacturer arasında:

- account/member data,
- quote/project data,
- document access,
- shared commercial contact,
- support communication

için role map tutulur.

“Partner” demek otomatik joint controller veya processor demek değildir.

---

## 38. Data Subject Categories

- Public visitors
- Quote/contact/document requesters
- Dealer applicants
- Customer/contractor contacts
- Consultant/specifier contacts
- Partner Portal users
- Internal users
- Supplier/manufacturer contacts
- Event/marketing contacts if approved
- Security researchers/complainants

Employee privacy ayrı policy olabilir.

---

## 39. Personal Data Categories

| Category | Examples |
|---|---|
| Identity/contact | Name, work email, phone, role |
| Company context | Company, department, business address |
| Commercial | Requested products, project need, quote history |
| Account | Auth identity, membership, language preference |
| Communication | Messages, support requests, email state |
| Technical | IP/security signals, request IDs, device/browser categories |
| Document activity | Grant/download/access event |
| Preference/consent | Marketing and cookie choices |
| Due diligence | Approved minimum dealer/sanctions checks |

---

## 40. Special Category and Highly Sensitive Data

InfraVolt baseline does not request:

- health data
- biometric data
- religion/politics/trade-union data
- sexual life/orientation
- criminal conviction data
- government ID/passport
- payment card data

Free-text guidance asks users not to submit sensitive personal data.

Unexpected sensitive data is restricted, assessed and minimized/deleted where lawful.

---

## 41. Children

InfraVolt is B2B and not directed at children.

- No child profiling
- No youth marketing
- No age-based personalisation
- No knowingly collected child account baseline

If education/training/community feature later targets minors, separate legal/DPIA/consent design required.

---

## 42. Data Inventory

Every processing activity records:

- purpose
- data subjects/categories
- source
- lawful basis per jurisdiction
- systems
- recipients/processors
- international transfers
- retention
- security controls
- rights impact
- owner
- DPIA/LIA need

This becomes Record of Processing Activities where required/appropriate.

---

## 43. Lawful-Basis Governance

Lawful basis:

- purpose-specific,
- determined before processing,
- documented,
- disclosed,
- not switched opportunistically after complaint,
- tested for necessity/minimisation.

UK ve Ukraine basis terminology/requirements separately mapped.

---

## 44. UK Lawful-Basis Candidate Matrix

| Processing | Candidate basis | Required evidence |
|---|---|---|
| Requested quote/contact response | Contract/pre-contract steps or legitimate interests depending requester/context | Purpose/necessity assessment |
| Dealer application review | Pre-contract steps and/or legitimate interests | Application notice + assessment |
| Portal account/service | Contract and legitimate interests | Terms/service need |
| Security/audit | Legitimate interests/legal obligation as applicable | LIA/security necessity |
| Record retention | Legal obligation/legitimate interests/contract | Schedule and limitation need |
| Optional marketing | Consent or legitimate interests with PECR analysis | Channel/audience analysis |
| Optional analytics | Consent or applicable storage-access exception + UK GDPR basis | Technology audit/decision record |

Counsel approves final mapping.

---

## 45. Ukraine Processing-Basis Candidate Matrix

Ukraine law recognizes multiple grounds including:

- informed voluntary consent,
- transaction/contract and requested pre-contract steps,
- legal obligation,
- legitimate interests subject to rights/freedoms balance,
- other grounds specified by law.

InfraVolt Ukraine processing map local counsel tarafından purpose bazında onaylanır.

UK lawful-basis label Ukraine notice’a otomatik copy edilmez.

---

## 46. Contract / Pre-Contract Basis

Quote request için candidate only when:

- individual asks InfraVolt to take steps,
- processing is genuinely necessary,
- fewer fields cannot achieve it,
- later unrelated marketing not bundled.

B2B company contract basis, individual contact verisinin her kullanımını otomatik kapsamaz; counsel relationship context’ini değerlendirir.

---

## 47. Legitimate Interests

Use requires documented:

1. Purpose test
2. Necessity test
3. Balancing test

LIA considers:

- reasonable expectations
- relationship
- data sensitivity
- impact
- opt-out/control
- safeguards
- children/vulnerability

High impact processing için “business needs it” yeterli değildir.

---

## 48. Consent Standard

When consent is used:

- specific
- informed
- freely given
- unambiguous affirmative action
- separate from unnecessary terms
- no pre-ticked box
- withdraw as easy as give
- evidence/version retained
- no detriment for optional refusal

Consent withdrawn after lawful earlier processing does not rewrite history; future consent-based processing stops.

---

## 49. Legal Obligation

Legal obligation basis:

- exact law/requirement documented,
- contract obligation alone not labelled statutory legal obligation,
- only necessary data retained,
- notice explains category/purpose,
- legal-hold decision controlled.

---

## 50. Purpose Limitation

Quote data:

- answer quote,
- related project support,
- fraud/security,
- necessary commercial record

için kullanılabilir according to approved basis.

It is not automatically:

- newsletter consent,
- advertising audience seed,
- unrelated profiling,
- public testimonial,
- partner-wide lead sharing.

---

## 51. Quote Form Privacy Contract

Collect minimum:

- name
- work email
- company
- country/market
- requested products/quantities/context
- phone only if justified/optional or required with reason

Show:

- controller short identity
- purpose
- privacy link
- expected response
- optional marketing separately
- no sensitive data guidance

---

## 52. Dealer Application Privacy Contract

Collect only review-relevant business data.

No baseline:

- passport upload
- criminal record
- unnecessary bank details
- personal family data
- broad social-media profiling

Due diligence expansion requires notice, basis, access, retention and security review.

---

## 53. Document Request Privacy Contract

- identity/company/business need as necessary
- requested document/version/classification
- access decision/audit
- no permanent signed URL
- marketing optional and separate
- retention tied to request/security need

Document download event may be security/compliance record; not hidden marketing tracking.

---

## 54. Portal Account Privacy Contract

- identity/work email
- company membership
- role/permissions
- language/notification preference
- security/audit events
- business records visible by company scope

Portal Terms acknowledgement and Privacy Notice visibility are separate evidence.

---

## 55. Support Request Privacy Contract

- request content may contain personal/company information
- user warned not to include secrets/sensitive data
- attachment disabled until scan/retention ready
- access restricted to support/owner roles
- internal note not exposed to partner
- closure/retention policy

---

## 56. Authentication Data

- Supabase Auth identity
- verification/session/security metadata
- invitation target/company/role
- recovery/MFA events
- session revocation

Security logs never contain password, token, recovery code or full cookie.

---

## 57. Security and Abuse Data

Possible:

- coarse IP/security signal
- request ID
- rate-limit key/hash
- user agent category
- failed auth/Turnstile events
- access denial

Rules:

- purpose limited
- raw IP retention minimized
- no fingerprinting for marketing
- no exact employee surveillance dashboard
- access restricted
- retention short/risk-based

---

## 58. Free-Text Data

- avoid asking broad “tell us everything”
- provide prompt boundaries
- do not send body to analytics/logs
- redact in support/debug exports
- delete/anonymize per record policy
- identify third-party personal data risk

---

## 59. File Upload Privacy

Before enabling:

- explicit purpose
- accepted file types/size
- malware scan
- private bucket
- retention
- user warning
- no unnecessary ID documents
- metadata/path no personal data
- deletion/quarantine
- processor/transfer review

Anonymous attachment baseline remains disabled until ready.

---

## 60. Internal Notes

- business-relevant only
- no discriminatory/speculative content
- no unnecessary sensitive data
- no copied passwords/tokens
- role restricted
- audit and retention
- potential SAR/disclosure/legal discovery awareness

“Internal” does not mean invisible to all legal processes.

---

## 61. Privacy Notice Content

As applicable:

- controller identity/contact
- data categories/sources
- purposes and lawful bases
- legitimate interests
- recipients/processors/categories
- international transfers/safeguards
- retention periods/criteria
- rights
- consent withdrawal
- complaint/regulator route
- automated decisions
- mandatory/optional fields and consequences
- children/target audience
- update/effective date

---

## 62. Collection-Time Short Notice

Pattern:

```text
We use the information you provide to review and respond to your request.
See our Privacy Notice for how we use, share and retain personal information
and how to exercise your rights.
```

Exact market wording and basis counsel-approved olur.

---

## 63. Indirectly Collected Data

If contact data comes from:

- company colleague
- public business source
- event/list provider
- Gersan/partner referral
- sanctions/due-diligence source

source, notice timing, expectation, lawful basis and rights are assessed.

Bought/referral data does not bypass transparency.

---

## 64. Data Minimisation Review

Every form field asks:

- Why now?
- Is it required?
- Can it be optional?
- Can company-level data replace personal data?
- Can category replace free text?
- Can it be collected later by authorized staff?
- What happens if omitted?
- How long retained?

---

## 65. Data Accuracy

- user self-service correction where safe
- operational correction workflow
- source and update timestamp
- no silent overwriting of business snapshots
- rectification propagates to relevant active systems
- historical/audit record preserved only where justified
- outdated contact suppressed from marketing

---

## 66. Privacy by Design Gate

Feature Definition of Ready includes:

- purpose/data map
- lawful basis candidate
- notice/consent impact
- processor/transfer
- retention/deletion
- rights/export
- security/access
- analytics/logging
- DPIA/LIA need
- market/legal review

---

## 67. Record of Processing Activities

RoPA-like register includes:

- processing activity
- controller/contact
- purpose
- categories of people/data
- recipients
- transfers
- retention
- security overview
- lawful basis
- owner
- systems

Small-company exemption, if any, is not assumed without counsel.

---

## 68. DPIA Screening

DPIA screening before:

- new AI/personal data processing
- systematic monitoring/profiling
- session recording/heatmap with identifiers
- large-scale sensitive data
- automated dealer/credit eligibility
- new cross-company data sharing
- public attachment/identity verification
- high-risk location/device/security tracking
- new vulnerable-user processing

High residual risk may require regulator consultation/legal action.

---

## 69. Legitimate Interests Assessment

LIA record:

- purpose/benefit
- necessity/alternatives
- nature/source of data
- expectation/relationship
- potential harm
- safeguards
- opt-out/rights
- conclusion/review date

Marketing and security may need separate LIAs.

---

## 70. Processor Inventory

Initial candidates:

| Provider | Function | Review |
|---|---|---|
| Vercel | Hosting/runtime/logs | DPA, region, subprocessor, transfer |
| Supabase | DB/Auth/Storage | DPA, region, backup, subprocessor |
| Resend | Transactional email | DPA, delivery data, webhook, transfer |
| Cloudflare | DNS/Turnstile/security | role, logs, transfer |
| Analytics provider | Web analytics | technology, DPA, consent, transfer |
| Error tracking provider | Optional | payload/redaction, DPA, transfer |
| Corporate email/helpdesk | Human communication | retention/access/DPA |

---

## 71. Processor Contract Requirements

Contract/DPA review:

- subject/duration
- nature/purpose
- data/people categories
- documented instructions
- confidentiality
- security
- subprocessors
- rights assistance
- breach assistance
- DPIA/regulator assistance
- deletion/return
- audit/information
- international transfer mechanism
- liability/termination

Provider click-through terms procurement record’ında saklanır.

---

## 72. Subprocessor Governance

- current list captured
- change notification route
- objection/exit feasibility
- countries/roles
- critical subprocessor risk
- DPA flow-down
- annual review
- incident/deprecation monitoring

Provider says “global” diye location review atlanmaz.

---

## 73. Data Flow Map

Minimum flows:

1. Browser → Vercel
2. Vercel → Supabase DB/Auth/Storage
3. Vercel/worker → Resend
4. Browser/server → Turnstile
5. Public site → approved analytics
6. Admin user → business/audit data
7. Portal user → company-scoped data/documents
8. InfraVolt → Gersan/partner if approved
9. Backup → secondary restricted store

Each flow includes region, purpose, data, role and transfer basis.

---

## 74. UK International Transfers

For each restricted transfer:

- identify exporter/importer and roles
- determine if transfer rules apply
- adequacy check
- if needed approved safeguard such as IDTA/Addendum/other mechanism
- transfer risk assessment where required
- supplementary measures
- notice/update
- contract/subprocessor evidence
- re-evaluation after change

Provider marketing statement is not transfer assessment.

---

## 75. Ukraine Cross-Border Transfers

Ukraine data flowing to UK/EU/US providers requires local review of:

- lawful ground
- transparency
- recipient/country
- contract/security
- subject rights
- restrictions/conditions under current law
- local representative/controller duties

Shared application location is disclosed accurately.

---

## 76. Data Residency Claims

Do not claim:

- “all data stays in UK”
- “all data stays in Ukraine”
- “GDPR compliant hosting”
- “zero international transfer”

unless provider/subprocessor/log/email/backup flows prove it.

Use precise region/processing language approved by counsel.

---

## 77. Provider Change Gate

Before new provider:

- necessity
- data fields
- controller/processor role
- DPA/terms
- subprocessors/regions
- transfer mechanism
- retention/deletion
- security
- consent/cookie behavior
- exit/export
- legal/technical approval

---

## 78. Cookie and Storage-Access Technology Audit

Inventory covers:

- HTTP cookies
- local/session storage
- IndexedDB
- pixels/tags
- SDK identifiers
- link decoration
- fingerprinting
- cache identifiers
- embedded media
- chat/widgets

“Cookie-free” provider can still use regulated storage/access or personal data.

---

## 79. UK Cookie/Technology Decision

Current UK rules/guidance changed through Data (Use and Access) Act 2025.

InfraVolt:

- does not auto-assume consent exemption,
- audits exact technology/purpose/config,
- documents necessary/statistical/other status,
- provides clear information,
- obtains prior consent where required,
- provides simple objection where an applicable exception requires it,
- rechecks after provider/config change.

---

## 80. Ukraine Cookie/Technology Decision

Ukraine domain:

- separate local legal review,
- Ukrainian notice,
- exact storage/analytics audit,
- consent/opt-out mode,
- provider/data transfer review,
- rights contact,
- no automatic copy of UK consent state

requires.

---

## 81. Cookie Categories

Potential UI categories:

- Strictly necessary
- Security
- Preferences
- Analytics/statistical
- Marketing
- Third-party media

Legal classification actual technology/purpose’a bağlıdır; design label kararı değildir.

---

## 82. Consent UX

- optional controls off by default
- accept/reject equivalent prominence where consent required
- granular choices
- no deceptive colour/wording
- accessible keyboard/screen reader
- language/market correct
- purpose/provider/duration information
- save without forced account
- change/withdraw link
- no consent wall for core B2B content unless legally justified

---

## 83. Consent Record

When required:

- consent/notice version
- category/purpose
- market/domain
- timestamp
- method/interface
- status
- withdrawal timestamp
- limited technical proof

No full IP long-term solely “just in case” without review.

---

## 84. Consent Expiry and Re-Prompt

Re-prompt when:

- material purpose/provider change
- legal requirement
- consent validity period policy
- stored state missing/invalid

Do not prompt on every page visit.

Exact duration legal/UX audit defines; six-month review candidate, not automatic legal rule.

---

## 85. Consent Withdrawal

- as easy as giving
- immediate future script/use stop where technically possible
- provider opt-out propagated
- evidence status updated
- core site remains usable
- previous lawful processing not falsified/deleted automatically
- marketing suppression retained as necessary

---

## 86. Third-Party Media

YouTube/maps/chat/social embeds:

- not baseline
- click-to-load/consent gate where required
- privacy/transfer review
- CSP allowlist
- accessible alternative
- no content dependence on tracking embed

---

## 87. Session Recording and Heatmaps

MVP default: disabled.

Before enablement:

- necessity/hypothesis
- form/PII masking proof
- consent/legal basis
- DPIA screening
- DPA/transfer
- retention/access
- UK/Ukraine review
- no protected Portal/Admin recording baseline

---

## 88. Analytics Privacy Contract

- typed minimal events
- no name/email/phone/message
- no document title/private URL
- market/domain separation
- IP handling reviewed
- consent/exception mode
- provider DPA/transfer
- retention
- deletion/export
- no cross-domain identity stitching baseline

Business database remains conversion source of truth.

---

## 89. Marketing Governance

Direct marketing starts only after:

- audience/channel classification
- lawful basis
- PECR/Ukraine rule review
- source/provenance
- opt-out/suppression
- sender identity
- content approval
- recordkeeping
- provider DPA

No marketing campaign in MVP merely because emails exist.

---

## 90. Operational vs Marketing Email

Operational examples:

- request receipt
- account/invitation/security
- quote/project follow-up requested by user
- document access
- service/status notification

Marketing examples:

- promotions/newsletters
- unrelated product campaigns
- re-engagement
- cross-sell not necessary to request

Operational email içine promotional content eklemek classification’ı değiştirebilir.

---

## 91. UK B2B Email Marketing

PECR corporate-subscriber rules and UK GDPR both considered.

- Corporate subscribers may differ from individual subscribers.
- Sole traders and some partnerships receive stricter treatment.
- Identity must not be concealed.
- Valid unsubscribe/opt-out address required.
- UK GDPR lawful basis and transparency still apply.
- Suppression list used.

InfraVolt default: legal status unverified contact’a consent/soft-opt-in analysis olmadan bulk marketing yok.

---

## 92. Soft Opt-In

Soft opt-in is not default shortcut.

Use only if counsel confirms all conditions, including:

- qualifying sale/negotiation context,
- own similar products/services,
- opt-out at collection,
- opt-out in every message,
- correct subscriber type.

Quote request alone automatically soft opt-in sayılmaz.

---

## 93. Marketing Consent Copy

Must specify:

- InfraVolt sender/controller
- channel
- content category/frequency where useful
- optional status
- withdrawal route
- privacy link

Bad:

```text
I agree to everything.
```

Better pattern, counsel-approved:

```text
Email me occasional InfraVolt product and project updates. I can unsubscribe at any time.
```

---

## 94. Unsubscribe and Suppression

- visible working link/address
- no login required
- prompt processing
- confirmation without marketing
- suppression across relevant campaigns/providers
- minimum suppression data retained
- no re-import bypass
- reason optional
- operational communication not disabled by marketing opt-out

---

## 95. Bought Lists

MVP: prohibited.

Future requires:

- source/licence/provenance
- notice evidence
- consent/lawful basis
- PECR audience analysis
- suppression screening
- age/accuracy
- transfer/provider review
- counsel approval

Vendor says “GDPR compliant” sufficient evidence değildir.

---

## 96. Public Sources and Sales Research

Business contact being public does not remove data protection duties.

- purpose/expectation
- source record
- minimum data
- transparency
- objection
- no sensitive/private enrichment
- no indiscriminate scraping
- retention/accuracy

---

## 97. Referral Leads

Referrer must not provide personal data without authority/expectation.

InfraVolt:

- records source,
- provides notice,
- confirms contact preference,
- avoids sensitive detail,
- does not add marketing consent by referral.

---

## 98. Phone Marketing

If outbound calls introduced:

- TPS/CTPS and PECR screening as applicable
- caller identity
- do-not-call list
- call purpose/lawful basis
- recording disclosure/consent if recording
- UK/Ukraine local rules
- time-zone/harassment controls

Call recording MVP baseline değildir.

---

## 99. Portal Notifications

- operational categories cannot be disabled if necessary for security/service, but clearly described
- optional product/marketing category separate
- user preferences respected
- company admin notification scope controlled
- no sensitive data in email subject/body beyond need
- deep links re-authorize

---

## 100. Data Subject Rights Intake

Channels:

- privacy email
- web/contact route
- written/verbal requests recognized by trained staff
- portal preference/account request where safe

Request does not need magic legal wording.

---

## 101. Internal Rights SLA

Recommended internal operational target:

- acknowledge within 3 business days
- identify jurisdiction/request type promptly
- complete within 30 calendar days target
- UK statutory one-calendar-month requirement tracked
- extension/refusal only counsel-approved conditions and timely notice
- Ukraine timing local counsel-verified

Internal 30-day target does not override a shorter applicable deadline.

---

## 102. Identity Verification for Rights

- proportionate to risk
- use existing authenticated account where safe
- request minimum additional evidence
- no routine passport upload
- verify representative authority
- do not disclose whether foreign account/data exists before verification
- delete verification evidence promptly

---

## 103. Rights Request Register

- request ID
- received date/channel
- requester/jurisdiction
- right/type
- identity status
- systems/owners
- deadline/extension
- actions
- exemptions/third-party review
- response date
- evidence
- complaint/escalation

Register access restricted.

---

## 104. Right to Be Informed

InfraVolt provides privacy information:

- at collection when direct,
- within applicable timing when indirect,
- concise/accessible language,
- layered short + full notice,
- market language,
- material-change communication where required.

---

## 105. Right of Access

Workflow:

1. Recognize and log.
2. Verify identity/scope.
3. Search relevant systems.
4. Review third-party/confidential/legal exemptions.
5. Export understandable data and supplementary information.
6. Secure delivery.
7. Record completion.

UK SAR ordinarily responded without delay and within one month.

---

## 106. Right to Rectification

- inaccurate active personal data corrected
- business snapshots/audit not falsified
- downstream provider/recipient correction considered
- disputed data marked/restricted where applicable
- requester informed
- action audited

---

## 107. Right to Erasure

Erasure is not unconditional.

Assess:

- purpose/basis ended
- consent withdrawal
- objection
- legal/contract/claim retention
- audit/security need
- backup behavior
- third-party data

Outcome may be delete, anonymize, restrict or lawful refusal with explanation.

---

## 108. Restriction and Objection

System supports:

- marketing immediate suppression
- processing restriction flag/workflow
- disputed accuracy review
- legitimate-interest objection assessment
- authorized override with reason
- communication to recipients where required

---

## 109. Data Portability

Where applicable:

- structured commonly used machine-readable format
- data provided by individual
- correct legal basis/automated processing scope
- secure delivery
- no third-party rights exposure

General business document export is not automatically statutory portability.

---

## 110. Automated Decision Rights

Baseline:

- no solely automated dealer approval/rejection
- no solely automated credit decision
- no solely automated binding commercial decision
- no AI eligibility scoring

Risk flags may assist humans but do not become hidden legal-significant decision engine.

---

## 111. Complaint and Regulator Contact

Privacy Notice:

- invites contact with InfraVolt privacy owner,
- gives UK ICO route for UK scope,
- gives competent Ukrainian authority/complaint route as counsel confirms,
- does not require internal complaint before statutory right unless law permits wording,
- maintains accessible contact channel.

---

## 112. Data Export Process

- permissioned internal job
- narrow subject scope
- redaction/third-party review
- private encrypted delivery path
- short expiry
- audit
- no export in public bucket
- purge temporary file
- no raw production database dump

---

## 113. Data Deletion Process

1. Eligibility/legal hold check.
2. Affected systems/relations identified.
3. Dry-run/report.
4. Authorized approval for sensitive deletion.
5. Bounded delete/anonymize/restrict.
6. Provider propagation.
7. Audit without retaining deleted content.
8. Verification.

---

## 114. Retention Principles

- purpose/legal basis aligned
- documented trigger
- shortest justified duration
- active vs restricted/archive separation
- automated review/deletion
- legal hold exception
- backup behavior
- owner/review
- UK/Ukraine counsel approval

---

## 115. Provisional Retention Schedule

Counsel/business approval required:

| Data class | Trigger | Recommended initial period/action |
|---|---|---|
| Unconverted contact/enquiry | Last meaningful interaction | 24 months, then delete/anonymize |
| Unconverted quote request | Closure/last activity | 24–36 months, counsel decides |
| Contract/project/accepted quote | Relationship/contract end | 6 years candidate for claims/accounting needs |
| Rejected/withdrawn dealer application | Final decision | 24 months candidate, then anonymize/delete |
| Active partner account | Relationship active | Active + limited post-termination period |
| Partner commercial records | Closure/relationship end | Contract/legal schedule, 6 years candidate |
| Public form attachment | Case closure | 30–90 days unless approved business record |
| Document access event | Event | 12–24 months security candidate |
| Auth/security logs | Event | 90–180 days candidate |
| Rate-limit data | Event/window | Hours/days, not long-term |
| Raw webhook payload | Receipt | Days/short diagnostic period then purge |
| Notification payload | Delivery/closure | Shorter than business record |
| Marketing consent evidence | Withdrawal/last use | Claims/compliance period candidate |
| Marketing suppression | Opt-out | Minimum identifier while marketing continues |
| Cookie consent state | Choice | 6 months candidate/re-prompt policy |
| Rights request record | Closure | 3–6 years candidate, minimized |
| Breach/incident record | Closure | 6 years candidate, restricted |
| Audit records | Event | 3–6 years by risk/class |
| Temporary export | Creation | Hours/days; auto-expire |

Exact values are not production law until approved.

---

## 116. Legal Hold

Legal hold:

- named authority/owner
- matter/reference
- data scope
- start/date/review
- normal deletion suspended only in scope
- access restricted
- no silent indefinite hold
- release instruction and resumed disposal

---

## 117. Anonymisation vs Pseudonymisation

- Pseudonymised data may remain personal data.
- True anonymisation must prevent reasonable re-identification.
- Hash of email can still be personal data/contextual identifier.
- Foreign keys/business counts preserved only if re-identification risk controlled.

Deletion policy “we hashed it” diyerek kapanmaz.

---

## 118. Backup Retention and Deletion

- active system deletion recorded
- backup copy not restored into active use without reapplying deletion ledger where feasible
- backup retention bounded
- backup access restricted
- restoration procedure includes rights/deletion reconciliation
- user notice explains backup limitations accurately where appropriate

---

## 119. Account Closure

Portal account closure:

- membership/session revoked promptly
- company/business record ownership separated
- personal profile minimized/anonymized where lawful
- audit/security record retained per schedule
- outstanding contractual/legal need assessed
- user informed of outcome

Deleting Auth user alone full erasure değildir.

---

## 120. Personal Data Breach Definition

Incident may involve:

- confidentiality loss
- integrity alteration
- availability/loss/destruction

Examples:

- cross-company quote/document access
- wrong recipient email
- public private-file link
- lost production records
- unauthorized admin access
- excessive export
- ransomware/provider incident

---

## 121. Internal Breach Timeline

InfraVolt internal target:

- staff/provider alert immediately
- privacy/security owner within 1 hour for suspected material incident
- breach register starts immediately
- facts/risk assessment continuously updated
- legal notification decision not delayed for perfect certainty

---

## 122. UK Breach Notification

For notifiable UK personal data breach:

- notify ICO without undue delay,
- no later than 72 hours after awareness,
- delay reasons recorded,
- phased information possible when incomplete,
- affected individuals informed without undue delay where high-risk threshold applies,
- all breaches documented even if not notified.

Counsel/privacy lead decides threshold and content; Security Lead does not act alone.

---

## 123. Ukraine Breach Response

Ukraine incident:

- current local law/authority guidance checked,
- controller/processor contract duties checked,
- affected people/data/location assessed,
- authority/individual/partner notice timing and threshold counsel decides,
- evidence and actions documented.

UK 72-hour rule is not blindly copied as the sole Ukraine rule; internal urgency remains immediate.

---

## 124. Processor Breach Contract

Provider/processor must:

- notify InfraVolt without undue delay under contract,
- provide facts/scope/timeline,
- support containment and rights/regulator response,
- preserve evidence,
- identify subprocessors,
- update findings,
- not notify InfraVolt customers publicly without coordination unless legally required.

---

## 125. Breach Risk Assessment

- data type/sensitivity
- volume/people
- identifiability
- confidentiality/integrity/availability
- encryption/protection
- recipient/threat actor
- likely harm
- vulnerable people
- duration/recovery
- market/jurisdiction
- ongoing exposure

---

## 126. Breach Communication

If individuals notified:

- plain language
- incident nature
- likely consequences
- actions taken
- actions individual can take
- contact
- no minimisation/speculation
- market language/accessibility

---

## 127. Technical and Marketing Claim Governance

Every objective claim has:

- exact wording
- product/model/version
- market
- source/evidence
- issuer/owner
- scope/conditions
- verified date
- expiry/review
- approver
- withdrawal trigger

---

## 128. Claim Substantiation

Objective claims require documentary evidence before publication.

Examples:

- dimensions/load/IP rating
- standards compliance
- certification
- durability/performance
- energy/environmental benefit
- “best/leading/number one”
- comparison
- project/application suitability

Manufacturer brochure alone may be evidence source but not automatically adequate for every InfraVolt interpretation.

---

## 129. Compliance Wording

Keep distinctions:

- `designed to meet`
- `tested to`
- `complies with`
- `certified to/by`
- `certificate available`
- `suitable for`, subject to conditions

These phrases are not interchangeable.

---

## 130. Certificate Publication

Before publish:

- genuine source
- issuer
- holder/legal entity
- product/model scope
- standard/version
- issue/expiry/withdrawal
- market relevance
- public sharing right
- redactions
- current file version
- technical/legal approval

---

## 131. Product Conformity — Great Britain

UKCA/CE and product-specific rules are assessed per product category, date and market.

- no blanket “all products UKCA/CE compliant”
- exact applicable product regulation identified
- manufacturer/importer/distributor duties mapped
- conformity evidence retained
- required marking/instructions/declaration checked
- Northern Ireland treated separately if targeted

Current government guidance allows different regimes by sector; specialist review controls.

---

## 132. Product Conformity — Ukraine

For each relevant product/category:

- Ukrainian technical regulation applicability
- conformity assessment/marking
- importer/authorized representative duties
- Ukrainian instructions/label needs
- declaration/certificate validity
- customs/product documentation
- market surveillance obligations

local specialist tarafından approved olur.

---

## 133. Product Availability and Territory

- UK availability does not imply UA availability
- UA availability does not imply local stock
- lead time/price subject to quote unless confirmed
- withdrawn/expired compliance product unpublished/flagged
- market restrictions explicit
- no unauthorized distributor/exclusivity claim

---

## 134. Comparative Claims

- comparison basis clear
- like-for-like
- current/verifiable
- no competitor trademark misuse
- no denigration
- supporting evidence retained
- market/legal review

---

## 135. Environmental Claims

Claims such as:

- sustainable
- green
- low carbon
- recyclable
- energy-saving
- environmentally friendly

need precise scope, lifecycle basis and strong evidence.

Absolute claims require especially high substantiation; vague greenwashing copy prohibited.

---

## 136. Warranty Claims

- exact warrantor
- product/territory
- duration/start
- conditions/exclusions
- claim route
- relation to commercial contract/statutory rights
- no website summary broader than actual warranty

No “lifetime warranty” without signed evidence and defined meaning.

---

## 137. Technical Document Use Terms

Controlled documents may state:

- authorized business purpose
- confidentiality
- no public redistribution
- no alteration/removal of notices
- version/current-document check
- no reverse engineering where lawful/appropriate
- expiry/revocation
- IP ownership
- liability/disclaimer

Access term cannot secretly override mandatory law.

---

## 138. Document Classification and Export Risk

Classify:

- public marketing
- request-only technical
- approved partner
- company-specific
- confidential/commercial
- export-controlled/restricted review required

CAD/DWG/test packages may require end-use/country screening before release.

---

## 139. Website vs Engineering Advice

- Application Map is product discovery, not final engineering design
- recommendations require project facts and competent review
- no safety-critical design generated automatically
- no compliance certificate inferred from hotspot selection
- user should use current official manuals/specification

---

## 140. Ukrainian Language Compliance

Ukraine State Language Law Article 27 applicability depends on business/entity presence and activity.

Product baseline regardless:

- Ukrainian public site exists,
- uk-UA loads by default on UA domain,
- core content/forms/legal/contact Ukrainian,
- foreign-language version not falsely fuller for applicable local entity model,
- local counsel confirms exact statutory scope.

---

## 141. Ukrainian Default Experience

UA domain:

- `lang="uk-UA"`
- Ukrainian navigation/UI
- Ukrainian privacy/cookie/terms
- Ukrainian form/error/email
- Ukrainian contact/business explanation
- user may choose English equivalent where available
- no forced geo-redirect from user choice

---

## 142. No Silent Legal Fallback

Missing Ukrainian legal page:

- blocks affected UA launch/function,
- does not silently render English as Ukrainian,
- may show explicit unavailable/contact state only if counsel/product approve,
- no `uk-UA` canonical/index claim for English placeholder.

---

## 143. Legal Translation

- qualified Ukrainian legal translation
- source version locked
- terminology glossary
- translation review
- clause/heading alignment
- effective date/version same logical identity
- local law adaptation, not word-for-word only
- future source changes tracked

Machine translation cannot publish legal text without qualified review.

---

## 144. Accessibility Legal Position

InfraVolt product target WCAG 2.2 AA’dır.

UK:

- Equality Act 2010 reasonable-adjustment/non-discrimination duties considered,
- private B2B site için public-sector regulations automatic claim edilmez,
- WCAG conformance evidence supports accessibility work but does not alone prove all legal compliance.

Ukraine accessibility obligations local counsel/target customer context ile review edilir.

---

## 145. Accessibility Statement

Statement includes:

- commitment and target
- covered domains/surfaces
- testing date/method
- known limitations
- alternative format/support contact
- response process
- update date

False “fully compliant” claim yapılmaz unless assessment supports it.

---

## 146. Reasonable Adjustment / Alternative Format

- accessible contact path
- document alternative request
- support for inaccessible legacy PDF
- no surcharge for reasonable accessible alternative
- request confidentiality
- owner/SLA
- outcome tracking

---

## 147. Intellectual Property Ownership

Asset register identifies:

- owner
- source
- licence/permission
- territory/media
- expiry
- attribution
- modification right
- redistribution right
- evidence file

No source evidence → no production publication.

---

## 148. Gersan Brand and Product Assets

Signed authority/contract should cover:

- trademark/logo use
- product imagery
- catalog/datasheet/certificate copy
- translation/adaptation
- website/social/print use
- territory UK/Ukraine
- document sharing
- termination/removal
- brand approval

Manufacturer website availability does not automatically grant republication rights.

---

## 149. Application Map Assets

Uploaded `airport`/application-map assets:

- original source/right verified
- legacy filenames renamed to structured project names
- embedded third-party marks/data reviewed
- derivative/edit permission checked
- author/source evidence recorded
- alt/accessible equivalent produced
- composite UI screenshot reused only if licensed and appropriate

Filename change does not create ownership.

---

## 150. User-Submitted Content Licence

Terms may grant InfraVolt limited licence necessary to:

- receive/store/review request content
- share with authorized staff/provider
- prepare response/proposal
- retain evidence as lawful

User does not grant broad public marketing licence by submitting quote.

---

## 151. Testimonials and Case Studies

Require:

- written permission
- person/company/brand scope
- exact quote/edit approval
- project confidentiality
- personal data notice/basis
- image rights
- territory/duration/withdrawal handling
- no fabricated or misleading result

---

## 152. Trademark and Domain Governance

- InfraVolt trademark/name availability review
- Gersan licence
- domain ownership
- no confusing competitor marks
- brand use guidelines
- social handle ownership
- infringement/takedown process

`.ua` purchase eligibility and registrant requirements counsel/registrar validates.

---

## 153. Open-Source Software Compliance

- dependency licence inventory
- notice/attribution obligations
- source-disclosure/copyleft risk
- no incompatible asset/font/icon licence
- modified code duties
- commercial-use permission
- periodic scan/review

Package installed olması licence approval değildir.

---

## 154. Font, Icon and Stock Media Rights

- licence source/version
- web embedding rights
- redistribution restrictions
- attribution
- Cyrillic support licence
- icon/logo confusion
- stock image model/property release where relevant

---

## 155. AI Use Policy

AI may assist draft/research only under controls.

- no automatic legal advice publication
- no technical claim without source/human approval
- no personal/confidential data to unapproved model
- provider DPA/transfer/DPIA review
- no automated dealer/credit/compliance decision
- output provenance and reviewer
- disclosure where required
- correction/takedown

---

## 156. AI-Generated Translation

- draft status only
- source locked
- no invented technical/legal meaning
- native/qualified review
- terminology check
- numbers/units/standards exact
- publish approver

---

## 157. Sanctions and Export-Control Governance

Before controlled document/product/export support:

- customer/company screening
- beneficial owner/counterparty as proportionate
- destination/end user/end use
- product classification
- diversion/re-export risk
- licences/restrictions
- recordkeeping
- escalation

Website country selector legal screening değildir.

---

## 158. Ukraine/Russia Diversion Risk

Supporting legitimate Ukraine projects does not remove sanctions/end-use obligations.

- no supply to sanctioned destination/person
- identify suspicious routing/intermediary
- enhanced due diligence for at-risk products
- document end use
- restrict sensitive technical package
- counsel/trade specialist decision

---

## 159. Dealer Due Diligence

Risk-based checks may cover:

- legal existence
- ownership/contact authority
- territory
- sanctions/adverse risk
- technical capability
- references
- conflicts
- anti-bribery acknowledgement
- data/privacy notice

No excessive personal documents without specific need/security.

---

## 160. Anti-Bribery and Corruption

- zero tolerance policy
- proportionate procedures
- top-level commitment
- risk assessment
- dealer/agent due diligence
- gifts/hospitality rules
- no facilitation payments
- public official escalation
- training/reporting
- contract clauses
- monitoring/audit

Portal/dealer application cannot approve high-risk intermediary automatically.

---

## 161. Competition and Dealer Terms

Counsel reviews:

- territory/exclusivity claims
- resale pricing
- customer allocation
- non-compete
- online sales restrictions
- competitor information
- tender conduct
- termination

Admin “territory” field signed exclusivity proof değildir.

---

## 162. Tax, VAT, Customs and Pricing

Website baseline:

- no tax-inclusive consumer checkout
- no automatic duty/VAT promise
- currency display informational unless quoted
- Incoterms/delivery/customs only in formal proposal/contract
- legal entity and invoice issuer correct

Future pricing/order module requires separate tax/customs review.

---

## 163. Electronic Contracting Future Gate

Before online order/acceptance/e-sign:

- offer/acceptance formation
- identity/authority
- terms incorporation
- order review/correction
- electronic signature validity
- timestamp/evidence
- cancellation/consumer rules if applicable
- tax/payment/security
- UK and Ukraine e-commerce disclosures
- retention/admissibility

Baseline acknowledgement is not e-signature.

---

## 164. Portal Terms Acknowledgement

Store:

- user
- company/membership
- document key/version
- presented locale
- accepted timestamp
- method
- IP only if justified/minimized

Material terms change may require re-acknowledgement before gated feature.

Privacy Notice update is not automatically “accept again” event.

---

## 165. Contract Authority

- Portal user account does not prove authority to bind company.
- Quote requester contact does not prove purchasing authority.
- Dealer applicant submitter authority verified during human review.
- Formal proposal/order states authorized signatory process.

---

## 166. Legal Evidence and Audit

Evidence examples:

- counsel approval
- legal document version/hash
- notice shown/version
- optional consent event
- terms acknowledgement
- DPA/transfer assessment
- LIA/DPIA
- certificate/source
- dealer due diligence
- rights response
- breach decision
- retention job report

---

## 167. Regulatory Request Handling

- verify authority/request
- legal owner leads
- preserve evidence
- narrow lawful disclosure
- document scope/basis
- protect third-party/confidential data
- no deletion/alteration after hold
- secure delivery
- audit
- user notice if permitted/required

---

## 168. Law-Enforcement Requests

- no informal disclosure based on email alone
- verify identity/legal authority/jurisdiction
- counsel review
- emergency process documented
- data minimization
- secure transfer
- request/response record
- transparency reporting future option

---

## 169. Complaints and Disputes

- central case owner
- preserve relevant records
- avoid retaliatory marketing/contact
- acknowledge promptly
- investigate fact/evidence
- legal escalation thresholds
- correction/remedy
- closeout and systemic action

---

## 170. Legal Change Monitoring

Quarterly and event-driven review:

- ICO/UK data law/PECR
- Ukrainian privacy/language/e-commerce law
- provider DPA/subprocessors
- UK product marking/safety rules
- Ukraine technical regulations
- sanctions/export controls
- advertising guidance
- accessibility law/guidance
- corporate disclosure/entity changes

---

## 171. Training

Role-based:

| Role | Minimum training |
|---|---|
| All staff | Privacy, phishing, breach reporting, secure handling |
| Sales | Marketing rules, suppression, notes, data minimisation |
| Dealer team | Due diligence, sanctions, anti-bribery, fair decisions |
| Content | Claims, certificates, copyright, localization |
| Engineering | Privacy by design, logs, deletion/export, cookies |
| Admin | Rights, access, exports, legal hold |
| Incident team | Breach timing, evidence, communications |

---

## 172. Compliance Testing

- legal route/content/version tests
- form short notice/link
- optional marketing not preselected
- submission works without marketing consent
- consent script gating/withdrawal
- UK/UA separate consent state
- suppression across provider
- rights export/redaction
- deletion/anonymization
- retention dry-run/job
- legal hold
- processor failure/no data leakage
- claim evidence/publication expiry
- terms re-acknowledgement
- breach drill

---

## 173. Privacy Metrics

- rights requests by type/age
- overdue rights requests
- retention/deletion job success
- data export expiry
- marketing opt-out processing time
- suppression errors
- consent script violations
- privacy incidents/breaches
- provider review overdue
- DPIA/LIA review overdue
- unauthorized export/access

No dashboard exposes requester personal detail broadly.

---

## 174. Compliance Metrics

- legal documents review due
- unapproved/expired claims
- certificates nearing expiry
- asset licence missing/expiring
- dealer due diligence age
- sanctions screening/escalations
- training completion
- open legal risk/exception age
- legal launch blockers

---

## 175. UK Launch Gate

- exact legal entity/controller
- corporate website disclosures
- Privacy/Cookie/Terms/Accessibility approved
- ICO fee assessment/registration if required
- RoPA/data map
- lawful basis/LIA
- cookie/analytics audit and mode
- provider DPA/transfers
- retention schedule
- rights and breach runbooks
- marketing/suppression policy
- product claim/conformity evidence
- IP/Gersan licence
- counsel sign-off

---

## 176. Ukraine Launch Gate

- `.ua` domain/entity/presence legal review
- Ukrainian legal pages
- language-law Article 27 applicability/default experience
- Ukraine privacy processing/rights/transfer review
- cookie/analytics mode
- e-commerce disclosure scope
- Ukrainian product conformity/label/document review
- local contact/complaint route
- sanctions/end-use process
- qualified legal/technical translation
- Ukraine counsel sign-off

---

## 177. Partner Portal Launch Gate

- Portal Terms
- Privacy Notice/account processing
- company/member role map
- terms acknowledgement evidence
- document use/confidentiality terms
- rights/account closure
- company isolation/security
- processor/transfer
- retention
- private document incident/breach runbook
- pilot partner agreement alignment

---

## 178. Dealer Programme Launch Gate

- application notice
- review criteria/fair human process
- due diligence scope
- sanctions/end-use
- anti-bribery
- data retention
- rejection/complaint
- contract authority
- territory/exclusivity language
- dealer agreement counsel review

---

## 179. Legal Definition of Ready

Feature ready when:

- jurisdiction/actor/purpose
- personal data fields
- lawful basis candidate
- notice/consent/terms impact
- processor/transfer
- retention/rights/deletion
- IP/claim/product compliance
- marketing classification
- counsel/DPIA/LIA trigger
- evidence owner

defined.

---

## 180. Legal Definition of Done

Feature done when:

- approved legal copy published
- controller/entity values real
- controls implemented/tested
- provider DPA/transfer complete
- retention/deletion/export works
- consent/notice semantics correct
- claims/assets have evidence
- UK/UA localization approved
- runbook/training updated
- no unresolved legal launch blocker

---

## 181. Risk Register

| Risk | Impact | Primary control |
|---|---|---|
| Forced privacy consent | Invalid/unfair consent | Notice vs consent separation |
| Marketing bundled into quote | PECR/privacy breach | Separate optional opt-in |
| Wrong controller details | Transparency/corporate breach | Entity gate |
| UA English fallback | Language/legal/trust failure | Separate approved publication |
| Provider transfer unknown | International transfer breach | DPA/subprocessor/transfer register |
| Indefinite lead retention | Data minimisation breach | Automated schedule |
| Cross-company disclosure | Severe privacy/security incident | RLS/authz/tests |
| Unsupported certification claim | Misleading/product risk | Evidence workflow |
| Unlicensed Gersan/map assets | IP infringement | Asset licence register |
| Soft opt-in misuse | Unlawful marketing | Counsel-approved conditions |
| Privacy notice treated as contract | Invalid evidence/UX | Separate event fields |
| Deleted data restored from backup | Rights failure | Deletion ledger/reconciliation |
| Ukraine→provider flow undisclosed | Privacy/transfer risk | Local notice/transfer review |
| Dealer bribery/sanctions risk | Legal/reputation | Due diligence/escalation |

---

## 182. Open Decisions

| ID | Decision | Recommendation | Deadline |
|---|---|---|---|
| LEG-001 | Exact InfraVolt legal entity/controller | Founder + UK counsel confirm | Before any production page |
| LEG-002 | Gersan legal/data/IP relationship | Signed distributor/licence/data-sharing review | Before product launch |
| LEG-003 | Ukraine entity/branch/representative model | Ukraine counsel decision | Before `.ua` launch |
| LEG-004 | UK ICO fee/registration | Complete official assessment/pay if required | Before UK production |
| LEG-005 | UK lawful basis map | Counsel-approved per purpose | Before forms |
| LEG-006 | Ukraine processing basis/rights map | Local counsel-approved | Before UA forms |
| LEG-007 | UK analytics/cookie mode | Technology audit under current rules | Before analytics production |
| LEG-008 | Ukraine analytics/cookie mode | Local review | Before UA analytics |
| LEG-009 | Provider transfer mechanisms | DPA + transfer register | Before live personal data |
| LEG-010 | Retention schedule | Adopt/adjust provisional table | Before production |
| LEG-011 | DPO requirement | Document decision; appoint Privacy Lead regardless | Before production |
| LEG-012 | Product regulatory matrix | Per product/category UK+UA | Before compliance claims |
| LEG-013 | Private document use terms | Counsel + Gersan/IP owner | Before gated download |
| LEG-014 | Marketing launch | Disabled until channel/audience policy approved | Before campaign |
| LEG-015 | Dealer due-diligence scope | Risk-based, no excessive personal docs | Before programme |
| LEG-016 | Accessibility Statement | Publish accurate limitations/contact | Before public launch |
| LEG-017 | Breach notification runbook | UK + Ukraine counsel-approved | Before production |
| LEG-018 | Application Map asset rights | Verify source/licence/derivatives | Before publication |

---

## 183. Founder Approval Checklist

- [ ] Legal entity/controller confirmed
- [ ] Gersan agreement/licences available
- [ ] UK and Ukraine counsel appointed
- [ ] No binding online sale baseline accepted
- [ ] Marketing disabled until approved
- [ ] Provider/transfer budget and contracts approved
- [ ] Retention schedule accepted
- [ ] Product conformity evidence ownership assigned
- [ ] Dealer sanctions/anti-bribery process accepted
- [ ] Legal launch blockers cannot be waived informally

---

## 184. Privacy Approval Checklist

- [ ] Privacy Notice not used as forced consent
- [ ] Purpose/lawful-basis map complete
- [ ] Data inventory/RoPA complete
- [ ] DPA/subprocessor/transfer review complete
- [ ] Cookie technology audit complete
- [ ] Rights workflow/30-day target ready
- [ ] Retention/deletion/legal hold ready
- [ ] DPIA/LIA screening ready
- [ ] Breach 72-hour UK clock/runbook ready
- [ ] Ukraine local rights/notice/transfer approved

---

## 185. Content/Product Compliance Checklist

- [ ] Objective claims evidence-backed
- [ ] `compliant`, `tested`, `certified` distinctions correct
- [ ] Certificate scope/current status
- [ ] Product-by-market regulatory matrix
- [ ] Environmental claims substantiated
- [ ] Availability/warranty wording accurate
- [ ] Technical disclaimer approved
- [ ] UA legal/technical translation approved
- [ ] IP/asset rights documented
- [ ] Expiry/withdrawal monitoring active

---

## 186. Official Reference Baseline

### United Kingdom

- ICO, Guide to lawful basis: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/
- ICO, Right to be informed: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/
- ICO, Subject access: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/subject-access-requests/a-guide-to-subject-access/
- ICO, Storage and access technologies: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/
- ICO, B2B marketing: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/
- ICO, Personal data breaches: https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/personal-data-breaches-a-guide/
- ICO, International transfers: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/a-guide-to-international-transfers/
- ICO, DPIAs: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/
- ICO, Data protection fee: https://ico.org.uk/for-organisations/data-protection-fee/
- GOV.UK, Company website disclosures: https://www.gov.uk/running-a-limited-company/signs-stationery-and-promotional-material
- UK Equality Act 2010: https://www.legislation.gov.uk/ukpga/2010/15/contents
- GOV.UK, Product marking: https://www.gov.uk/guidance/placing-ukca-or-ce-marked-products-on-the-market-in-great-britain
- ASA/CAP, Substantiation: https://www.asa.org.uk/advice-online/substantiation.html
- GOV.UK, Sanctions end-use controls: https://www.gov.uk/government/publications/sanctions-end-use-controls-guidance-for-businesses/sanctions-end-use-controls-guidance-for-businesses
- GOV.UK, Bribery Act guidance: https://www.gov.uk/government/publications/bribery-act-2010-guidance

### Ukraine

- Verkhovna Rada, Law “On Protection of Personal Data” № 2297-VI: https://zakon.rada.gov.ua/laws/show/en/2297-17
- Verkhovna Rada, Law “On Supporting the Functioning of the Ukrainian Language as the State Language” № 2704-VIII: https://zakon.rada.gov.ua/laws/show/en/2704-19
- Verkhovna Rada, Law “On Electronic Commerce” № 675-VIII: https://zakon.rada.gov.ua/laws/show/en/675-19
- Ukrainian Parliament Commissioner for Human Rights: https://ombudsman.gov.ua/

Current versions, commencement and InfraVolt applicability launch/review date’inde counsel tarafından tekrar doğrulanır.

---

## 187. Immediate Next Actions

1. LEG-001–018 founder/legal review’e alınır.
2. UK and Ukraine counsel appointments confirmed.
3. Exact entity/controller and Ukraine presence model recorded.
4. Data inventory/RoPA and provider transfer map completed.
5. UK/UA lawful-basis and retention schedules approved.
6. Privacy/Cookie/Terms/Accessibility document drafts created per market.
7. Consent field semantics database/API’da separated.
8. Gersan IP/data/claim authority documented.
9. Product-by-market conformity matrix started.
10. Rights, deletion, breach and marketing suppression runbooks tested.

---

## 188. Sonuç

InfraVolt legal/privacy yaklaşımı checkbox, footer link veya generic template seviyesinde bırakılmayacaktır.

Platform:

- real legal entity transparency,
- separate UK/Ukraine legal publication,
- purpose-specific lawful basis,
- notice/consent separation,
- privacy-safe analytics and marketing,
- provider/transfer governance,
- enforceable rights and retention,
- human-approved technical claims,
- licensed assets/documents,
- product-market compliance evidence,
- sanctions/dealer/anti-bribery controls,
- counsel-approved incident response

ile çalışacaktır.

En kritik kurallar:

1. Privacy Notice zorunlu consent checkbox değildir.
2. Marketing consent quote/dealer/document service’inin şartı olamaz.
3. Ukraine legal/content experience gerçek Ukrainian publication olmadan açılamaz.
4. Provider says “compliant” DPA/transfer assessmentinin yerine geçmez.
5. Rights ve retention uygulamada çalışmadan policy tamamlanmış sayılmaz.
6. Objective technical/compliance claim evidence olmadan yayınlanmaz.
7. Website submission binding quote/order/dealer approval değildir.
8. Gersan/map/document assets licence/authority olmadan yayınlanmaz.
9. UK 72-hour breach clock gerektiren olaylarda legal/privacy coordination gecikmez.
10. Product, sanctions, export ve Ukraine legal kararlarını software otomatik uydurmaz.

---

## 189. Document Control

### 189.1 Version history

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1.0 | 15 July 2026 | InfraVolt Product Team | Initial UK/Ukraine legal, privacy, consent, marketing, rights, retention, claims, IP, trade and compliance architecture |

### 189.2 Change control

Legal entity, controller, market, lawful basis, notice/consent, cookie/analytics, marketing, processor/transfer, retention, rights, breach, legal document, product claim/conformity, IP, sanctions/export, dealer due diligence veya accessibility legal kararındaki değişiklik bu belgenin version update’ini gerektirir.

