# المخ التقني — المرحلة ٢: Architecture

> معمارية النظام المطلوب في البنود ١–٢٢. لم يُنفَّذ منها شيء بعد؛ هذا هو المستند الذي طلبت مراجعته قبل البدء.
> اقرأ [`01-deep-audit.md`](./01-deep-audit.md) أولاً — المعمارية هنا مبنية على نتائجه، وأهمها أن **١٧٪ فقط** من المحركات المطلوبة لديها بيانات اليوم.

---

## ١. المبادئ الحاكمة

| # | المبدأ | لماذا |
|---|---|---|
| ١ | **لا رأي بلا حقيقة مخزّنة** | كل Insight مربوط بصفوف قياس لها مصدر وتاريخ. لا رقم بلا أصل |
| ٢ | **الحساب في SQL، السرد فقط في الذكاء الاصطناعي** | النموذج لا يجمع ولا يقسم ولا يقدّر نسبة. يقرأ أرقاماً محسوبة ويشرحها |
| ٣ | **Hypothesis نوع مستقل عن Insight** | تنفيذ حرفي للبند ٢٠ — الفرضية تُوسم فرضية في قاعدة البيانات لا في النص فقط |
| ٤ | **نقص البيانات يُخزَّن ويُعرض** | جدول `bi_data_gaps` هو مخرَج من مخرجات النظام، لا عيب يُخفى |
| ٥ | **مصدر البيانات = محوّل (Adapter)** | تبديل المصدر بين ترافيك بلس وتشييك و GSC تغييرُ إعداد، لا إعادة بناء |
| ٦ | **الحلقة مغلقة** | كل توصية تُقاس بعد التنفيذ، والنتيجة تعدّل ثقة المحلّل الذي أنتجها (البند ٢١) |
| ٧ | **لا يُكسر شيء قائم** | كل ما يلي **إضافة**: جداول جديدة، مسارات جديدة، مساحة `/dashboard/brain` جديدة. لا تعديل على جدول أو مسار قائم |

---

## ٢. الطبقات

```
┌──────────────────────────────────────────────────────────────────┐
│ L7  Dashboard  /dashboard/brain     + AI Advisor (بند ١٦، ١٨)    │
├──────────────────────────────────────────────────────────────────┤
│ L6  Experiment & Learning Loop                        (بند ٢١)    │
├──────────────────────────────────────────────────────────────────┤
│ L5  Narrative Layer — Claude       (بند ١٣ صياغة، ١٦)            │
├──────────────────────────────────────────────────────────────────┤
│ L4  Decision Engine  Impact × Confidence ÷ Effort → P0..P3 (١٤)  │
├──────────────────────────────────────────────────────────────────┤
│ L3  Analyzers — دوال حتمية، مُختبرة، مُصدَّرة  (٤–١٢، ١٥، ١٧)     │
├──────────────────────────────────────────────────────────────────┤
│ L2  Fact Store — Postgres append-only                            │
├──────────────────────────────────────────────────────────────────┤
│ L1  Connectors / Adapters — GSC · GA4 · Supabase · Tashyik · …   │
├──────────────────────────────────────────────────────────────────┤
│ L0  Instrumentation — الحواس. غير موجودة اليوم. تُبنى أولاً.      │
└──────────────────────────────────────────────────────────────────┘
```

---

## L0 — طبقة الاستشعار (Instrumentation)

**هذه أهم طبقة في المستند كله، ولا وجود لها اليوم.** بدونها تبقى ٧ محركات فارغة إلى الأبد.

### أ. مخطط الأحداث (Event Schema)

عقد ثابت، مُعرَّف مرة واحدة في `src/lib/brain/events.js`، يُستخدم من الموقع ومن GTM معاً:

| الحدث | متى | الحقول |
|---|---|---|
| `page_view` | كل صفحة | `path, locale, referrer, device, is_bot` |
| `view_service` | صفحة خدمة | `service_id, service_slug` |
| `view_city` | صفحة مدينة | `city_slug` |
| `read_depth` | ٢٥/٥٠/٧٥/١٠٠٪ | `path, depth` |
| `click_whatsapp` | زر واتساب | `path, placement` |
| `click_phone` | رقم الهاتف | `path` |
| `form_start` | أول لمسة في النموذج | `form_id, path` |
| `form_field_error` | فشل تحقق | `form_id, field` |
| `form_abandon` | مغادرة بعد البدء بلا إرسال | `form_id, last_field` |
| `form_submit` | إرسال ناجح | `form_id, service_type, budget_range` |
| `assistant_open` / `assistant_message` / `assistant_lead` | المساعد | `conversation_id, topic` |
| `web_vital` | CLS/LCP/INP/TTFB | `metric, value, path, device` |
| `client_error` | خطأ JS | `message, path` |

`form_abandon` و`form_field_error` هما تحديداً ما يجيب على سؤال البند ٣ «أين يخسر المشروع العملاء» — ولا يمكن استنتاجهما من GA4.

### ب. نقطة التجميع الأولى (First-party sink)

`POST /api/collect` — Route Handler يكتب في `bi_events` بصلاحية الخدمة.

**لماذا لا نكتفي بـ GA4:**
- GA4 يُحجب لدى ٢٠–٤٠٪ من الزوار (مانعات الإعلانات)
- GA4 يعيّن العينات على الاستعلامات الكبيرة
- GA4 لا يمكن ضمّه (JOIN) مع `contact_messages` في SQL — وهذا بالضبط ما يحتاجه ربط Traffic → Lead في البند ١٢

GA4 يبقى للتسويق؛ المخ يعتمد على المصدر الأول.

### ج. الخصوصية — قرار مطلوب منك

- عنوان IP **لا يُخزَّن أبداً**؛ يُخزَّن `sha256(ip + salt يومي)` فقط ⇒ لا يمكن عكسه ولا ربطه بين الأيام.
- لا تُخزَّن أسماء ولا إيميلات في `bi_events` — الربط بالعميل يتم عبر `contact_messages` فقط عند إرساله النموذج بإرادته.
- **مطلوب قرارك:** هل نضيف لافتة موافقة (Consent Banner) امتثالاً لنظام حماية البيانات الشخصية السعودي (PDPL)؟ هذا يؤثر على حجم البيانات المجمّعة، ولن أقرره نيابةً عنك.

---

## L1 — الموصلات (Connectors)

كل موصل يطبّق نفس الواجهة:

```js
// src/lib/brain/connectors/<name>.js
export const meta = { key, kind, requires: ["ENV_VAR", ...] };
export async function health();                  // متصل؟ آخر مزامنة؟
export async function ingest({ since, until });  // → BiMetric[]
```

| الموصل | يغذّي البنود | الحالة اليوم |
|---|---|---|
| `internal` — جداول Supabase الخاصة | ٩ (جزئي)، ١٥ | ✅ جاهز |
| `firstparty` — `bi_events` | ٢، ٣، ٦، ١٧ | ⏳ يُبنى في L0 |
| `gsc` — Search Console | ٦، ٧، ٨، ٤ | ⚠️ **النطاق غير مربوط** |
| `ga4` | ٢، ١٢ | ⚠️ غير مربوط |
| `gbp` — Google Business Profile | ٧ | ⚠️ غير مربوط |
| `crux` — Core Web Vitals | ١٥ | ✅ عام، متاح |
| `competitors` — زحف مُنظّم | ٥، ١٠ | 🔨 يُبنى · **يقرأ بنية وخدمات فقط، لا ينسخ محتوى** |
| `semrush` | ٤، ٦ | ⚠️ الوحدات مستنفدة |
| `tashyik` — طلبات/إيرادات/مزودين | ٩، ١٠، ١١، ١٢ | ❓ **يحتاج قرارك** (انظر §٨) |

كل موصل يسجّل نفسه في `bi_sources` بحالته، والـ Dashboard يعرض الحالة صراحة. **موصل غير متصل = لوحة تقول «لا توجد بيانات»، لا لوحة تعرض أصفاراً تبدو كنتائج.**

---

## L2 — مخزن الحقائق (Fact Store)

هجرة `009_brain_core.sql` — جداول جديدة فقط، RLS مغلقة، لا سياسة لأحد غير `service_role`.

```sql
bi_sources      (key, kind, status, last_sync_at, last_error, notes)

bi_entities     (type, external_ref, name_ar, name_en, attrs jsonb)
                -- type ∈ service | city | page | keyword | competitor
                --        | channel | segment | route

bi_metrics      (metric_key, entity_type, entity_id, dimension jsonb,
                 value numeric, unit, period_start, period_end,
                 source_key, ingested_at)
                -- append-only. فريد على
                -- (metric_key, entity_id, dimension, period_start, source_key)

bi_events       (event, path, locale, device, visitor_hash, session_hash,
                 props jsonb, occurred_at)
                -- خام. تُلخَّص ليلياً إلى bi_metrics ثم تُقلَّم بعد ٩٠ يوماً

bi_findings     (analyzer_key, analyzer_version, entity_type, entity_id,
                 kind, severity, confidence, evidence jsonb,
                 -- kind ∈ 'insight' | 'hypothesis'   ← البند ٢٠
                 computed_at, resolved_at)

bi_data_gaps    (domain, missing, why_it_matters, how_to_obtain,
                 blocked_by, owner, status)         ← البند ٢٠

bi_recommendations (title_ar, title_en, category, finding_ids[],
                 impact, effort, confidence, business_value, seo_value,
                 revenue_potential, priority,   -- P0..P3
                 problem_ar, cause_ar, opportunity_ar, action_ar,
                 expected_impact_ar, measurement_ar,
                 status, created_at)

bi_actions      (recommendation_id, status, executed_at, executed_by,
                 change_description)                ← البند ٢١

bi_experiments  (action_id, metric_key, entity_id,
                 baseline_start, baseline_end, baseline_value,
                 measure_start, measure_end, result_value,
                 delta_pct, verdict, measured_at)   ← البند ٢١

bi_analyzer_scores (analyzer_key, wins, losses, avg_delta, updated_at)
                -- الثقة التالية تُشتق من هنا، لا من تقدير بشري
```

`bi_metrics` جدول ضيّق وطويل عمداً: إضافة مقياس جديد لا تتطلب هجرة.

---

## L3 — المحلّلات (Analyzers)

**هنا يكمن ذكاء النظام الحقيقي — وليس في النموذج اللغوي.** كل محلّل دالة حتمية قابلة للاختبار:

```js
// src/lib/brain/analyzers/seo.lowCtr.js
export const meta = {
  key: "seo.low_ctr_high_impressions",
  version: 3,
  requires: ["gsc"],           // لا يعمل إن لم يكن المصدر متصلاً
  produces: "insight",
};
export async function run(ctx) { /* → Finding[] */ }
```

| المفتاح | يجيب على | البند | متاح متى |
|---|---|---|---|
| `seo.low_ctr_high_impressions` | كلمات ٤–٢٠ بانطباعات عالية و CTR منخفض | ٦ | GSC |
| `seo.cannibalization` | صفحتان تتنافسان على نفس الاستعلام | ٦ | GSC |
| `seo.orphan_pages` | صفحات بلا روابط داخلية | ٦ | ✅ الآن |
| `seo.thin_content` | صفحات دون عتبة محتوى | ٦ | ✅ الآن |
| `seo.index_gap` | في Sitemap وليست في الفهرس | ٦ | GSC |
| `geo.service_city_gap` | طلب على خدمة×مدينة بلا صفحة | ٧، ٨ | GSC |
| `journey.step_dropoff` | خطوة يهبط تحويلها عن خط الأساس | ٣ | L0 |
| `journey.form_friction` | الحقل الذي يُهجر عنده النموذج | ٣ | L0 |
| `market.demand_trend` | ميل الطلب المتحرك صعوداً/هبوطاً | ٤، ١١ | GSC + تاريخ |
| `competitor.service_gap` | خدمات يقدمونها ولا نقدمها | ٥ | زحف |
| `competitor.absence` | **ما لا يفعله أحد منهم** ← Blue Ocean | ٥ | زحف |
| `service.quadrant` | Star / Growth / Hidden / Weak | ٩ | ❌ يحتاج إيرادات |
| `pricing.position` | موقعنا السعري | ١٠ | ❌ يحتاج أسعاراً |
| `tech.slow_route` | مسارات بطيئة + ربطها بالتحويل | ١٥ | ✅ الآن |
| `tech.error_rate` | ٥٠٠ / أخطاء عميل | ١٥ | ✅ الآن |
| `tech.broken_links` | روابط مكسورة و ٤٠٤ | ١٥ | ✅ الآن |
| `tech.core_web_vitals` | CWV لكل مسار وجهاز | ١٥ | ✅ الآن |
| `opportunity.cross_sell` | عميل خدمة A لم يأخذ B | ١٧ | ❌ يحتاج طلبات |

**قاعدة صارمة:** محلّل مصدرُه غير متصل **لا يُنتج مخرجات فارغة** — يُنتج صفاً في `bi_data_gaps`. أي أن نقص البيانات يظهر كعمل مطلوب، لا كسكوت.

كل Finding يحمل `evidence: [metric_id, …]` ⇒ كل رقم على الشاشة يمكن تتبّعه إلى مصدره بضغطة.

---

## L4 — محرك القرار (البند ١٤)

```
score = (Impact × Confidence) ÷ Effort
```

- **Impact** يُشتق من الحقائق، لا يُقدَّر: مثلاً `impressions × (CTR المتوقع للمركز − CTR الحالي)` = نقرات إضافية شهرياً.
- **Confidence** تبدأ من ثقة المحلّل وتُعدَّل بسجلّه في `bi_analyzer_scores` (البند ٢١).
- **Effort** لا يُخمَّن. توصية بلا تقدير جهد تبقى `needs_scoping` وتظهر في اللوحة بهذه الصفة.

| P0 | نفّذ فوراً | نتيجة عالية · ثقة عالية · جهد منخفض، أو عطل تقني يمسّ الإيراد |
| P1 | مهم | نتيجة عالية · جهد متوسط |
| P2 | تحسين | نتيجة متوسطة |
| P3 | تجربة | ثقة منخفضة، يُختبر أولاً |

---

## L5 — الطبقة السردية (Claude)

هنا فقط يدخل النموذج اللغوي، وبصلاحيات ضيقة عمداً.

- **النموذج:** `claude-opus-5` · `thinking: { type: "adaptive" }` · بث للإجابات الطويلة.
- **أدواته لا تقبل نصاً حراً — تستعلم مخزن الحقائق فقط:**
  `query_metrics(metric_key, entity, period)` · `list_findings(domain, severity)` · `get_entity(type, ref)` · `list_data_gaps()` · `record_gap(domain, missing, why)`
- **المخرَج المُلزَم** لكل توصية، بالضبط كما طلبت في البند ١:
  ما المشكلة؟ · لماذا حدثت؟ · ما الفرصة؟ · ماذا نفعل؟ · ما الأولوية؟ · ما التأثير المتوقع؟ · كيف نقيس؟
- **قيد لا يُخترق:** كل رقم في النص يجب أن يأتي من نتيجة أداة. سؤال بلا حقائق ⇒ يقول «لا توجد بيانات كافية» **ويكتب صف `bi_data_gaps`**. هذا تنفيذ هندسي للبند ٢٠، لا وعد في تعليمات.
- كل مخرَج مسرود يُحفظ مع `finding_ids` التي بُني عليها ⇒ قابل للتدقيق لاحقاً.

**AI Strategic Advisor (البند ١٦)** هو نفس الطبقة بواجهة سؤال/جواب داخل اللوحة، وبنفس القيود.

---

## L6 — حلقة التعلّم (البند ٢١)

```
Recommendation → (تنفيذ) → bi_actions → (نافذة قياس) → bi_experiments → verdict
                                                              ↓
                                              bi_analyzer_scores → ثقة L4
```

عند تعليم توصية كـ «نُفِّذت»، يلتقط النظام تلقائياً:
1. المقياس المستهدف وخط أساسه (نافذة ٢٨ يوماً قبل التنفيذ)
2. يجدول قياساً بعد ٢٨ يوماً
3. يكتب `delta_pct` و`verdict ∈ improved | no_change | worse`
4. يحدّث سجل المحلّل الذي أنتج التوصية

بعد ~٣ أشهر، محلّل توصياته لا تنجح تنخفض ثقته تلقائياً وتهبط أولوياته. **هذا هو «التعلّم» فعلياً — إحصاء، لا مجاز.**

---

## L7 — اللوحة والوظائف المجدولة

### `/dashboard/brain`

الصف الأول — لا أكثر من ذلك أولاً (البند ١٨: «أهم المعلومات أولاً بدون إغراق»):

```
┌───────────────────────────────────────────────────────────┐
│  أهم ٣ إجراءات هذا الأسبوع        [P0]  [P0]  [P1]        │
├───────────────────────────────────────────────────────────┤
│ Market │Customer│  SEO  │  GEO  │Revenue│Service│Technical │
│  ⚪    │  ⚪    │  ⚪   │  ⚪   │  ⚪   │  ⚪   │   🟢     │
│ لا     │ لا     │ يحتاج │ يحتاج │ لا    │ جزئي  │  كامل    │
│بيانات  │بيانات  │ ربط   │ ربط   │بيانات │       │          │
└───────────────────────────────────────────────────────────┘
```

كل بطاقة تحمل **شارة تغطية بيانات**: 🟢 كامل · 🟡 جزئي · ⚪ لا توجد بيانات. الضغط على ⚪ يفتح `bi_data_gaps` — أي ما يجب فعله لتشغيل هذا المحرك.

ثم تبويبات: Opportunities · Recommendations · Alerts · Forecast · Experiments · Data Gaps.

### الوظائف المجدولة

| المسار | التكرار | الوظيفة |
|---|---|---|
| `POST /api/brain/ingest/[source]` | ليلياً ٠٣:٠٠ | سحب من الموصلات |
| `POST /api/brain/rollup` | ليلياً ٠٣:٣٠ | تلخيص `bi_events` → `bi_metrics` |
| `POST /api/brain/analyze` | ليلياً ٠٤:٠٠ | تشغيل المحلّلات → Findings → Recommendations |
| `POST /api/brain/measure` | يومياً ٠٥:٠٠ | إغلاق التجارب المستحقة |
| `GET /api/brain/health` | عند الطلب | حالة كل مصدر |

محميّة بـ `CRON_SECRET`. عبر Vercel Cron أو `pg_cron`.

---

## ٣. الملفات المتأثرة (بند ٢٢: «وضّح ما الملفات التي ستتأثر»)

### جديدة بالكامل
```
supabase/migrations/009_brain_core.sql
supabase/migrations/010_brain_events.sql
src/lib/brain/{events,registry,score,facts}.js
src/lib/brain/connectors/*.js
src/lib/brain/analyzers/*.js
src/lib/brain/advisor/{client,prompt,tools}.js
src/app/api/collect/route.js
src/app/api/brain/**/route.js
src/components/brain/*
src/app/[locale]/(admin)/dashboard/brain/**
```

### تُعدَّل (تعديلات صغيرة ومحدودة)
| الملف | التعديل | الخطر |
|---|---|---|
| `src/app/[locale]/layout.js` | إضافة مُرسل الأحداث | منخفض — إضافة مكوّن واحد |
| `src/app/[locale]/(website)/contact/actions.js` | استخراج التحقق إلى `lib/leads.js` + أحداث النموذج | منخفض — سلوك مطابق |
| `next.config.mjs` | `connect-src 'self'` (مسموح أصلاً) + مراجعة CSP | منخفض |
| `.env.example` + `README.md` | توثيق المتغيرات الجديدة | لا خطر |
| `package.json` | `@anthropic-ai/sdk` | منخفض |

### لا تُمسّ إطلاقاً
كل الجداول القائمة · كل المسارات العامة · كل صفحات لوحة التحكم الحالية · `seo.js` · `sanitize.js` · `siteSettings.js` · التصميم المعتمد.

---

## ٤. خطة المراحل

| المرحلة | المحتوى | محجوبة؟ |
|---|---|---|
| **٠ — عليك أنت** | ربط GSC + GA4 لـ trafyekbls.com · تشغيل هجرات ٠٠١–٠٠٨ · قرار Tashyik · قرار PDPL · وحدات Semrush · مفتاح `ANTHROPIC_API_KEY` | — |
| **١ — الأساس** | مخزن الحقائق · `/api/collect` · مخطط الأحداث · محلّلات البند ١٥ كاملة · `bi_data_gaps` مُعبّأ · هيكل اللوحة بشارات التغطية | ✅ **لا حواجز — يبدأ فوراً** |
| **٢ — SEO / GEO** | موصلات GSC/GA4/GBP · محلّلات `seo.*` و`geo.*` · محرك الصفحات (البند ٨) بنفس قيد مقاومة الصفحات الرقيقة في هجرة ٠٠٨ | ⚠️ المرحلة ٠ |
| **٣ — العميل والرحلة** | القمع من الأحداث الأولى · تصنيف الشرائح على بيانات حقيقية · المساعد الذكي داخل الموقع (يفهم العميل ويؤهّل العميل المحتمل) | يحتاج ٤ أسابيع تجميع أحداث بعد المرحلة ١ |
| **٤ — المستشار والحلقة** | البند ١٦ + البند ٢١ | بعد ٢ و٣ |
| **٥ — الإيراد والتسعير والتنبؤ** | البنود ٩، ١٠، ١١، ١٢ | ❌ **مستحيل بلا مصدر طلبات وإيرادات** |

> المرحلة ٥ ليست صعبة — هي **غير قابلة للتنفيذ** على `Trafyek-bls` كما هو، لأن البيانات غير موجودة. تصبح ممكنة فوراً إذا كان النطاق يشمل تشييك.

---

## ٥. Innovation Opportunities (اكتشافات لم تطلبها)

| # | الفرصة | القيمة | الأولوية |
|---|---|---|---|
| I1 | **الموقع يبيع «نربط مؤسستك بالذكاء الاصطناعي» بينما لا يحتوي ذكاءً اصطناعياً واحداً.** المخ والمساعد هما البرهان على وعدك التسويقي — أقوى Case Study تملكه | مصداقية البيع | **P0** |
| I2 | **`bi_data_gaps` نفسه منتج قابل للبيع:** «Data Readiness Audit» — التدقيق الذي تجريه على نفسك الآن يصلح خدمة مستقلة للعملاء | خط خدمة جديد | P1 |
| I3 | **قيد مقاومة الصفحات الرقيقة (هجرة ٠٠٨) يُحوَّل إلى منتج:** «SEO Guardrails» يمنع عملاءك من نشر محتوى يعاقبه جوجل | تمييز تنافسي | P1 |
| I4 | **سجل محادثات المساعد = أفضل بحث كلمات مفتاحية ستملكه**، بلغة العميل الحقيقية لا بمخرجات Semrush. مصدر مجاني لا يملكه منافسوك | SEO + محتوى | P1 |
| I5 | **`competitor.absence`** — البحث عمّا **لا يفعله** أي منافس، لا عمّا يفعلونه. هذا هو Blue Ocean الذي طلبته في البند ٥، ونادراً ما تبنيه أي أداة تجارية | استراتيجي | P2 |
| I6 | **ربط `form_abandon` بالواتساب:** من يبدأ النموذج ويهجره هو أعلى نية شراء لديك، وتفقده اليوم صامتاً بلا أثر | تحويل مباشر | P1 |
| I7 | **صفحة حالة عامة للأداء التقني** (CWV، زمن الاستجابة) تُظهر التزامك بالجودة — دليل بيعي لوكالة تقنية | ثقة | P3 |

---

## ٦. ما لن أبنيه — وأسبابه

| المطلوب | لماذا لا |
|---|---|
| لوحة Revenue Intelligence على `Trafyek-bls` | لا يوجد مصدر إيراد. أي رقم فيها مُختلق ⇒ يخالف البند ٢٠ وقائمة ممنوعاتك («بيانات وهمية») |
| Demand Forecasting اليوم | التنبؤ يحتاج ≥ ١٢ شهر تاريخ. لا يوجد شهر واحد محفوظ |
| شرائح Churn Risk / High Value | تحتاج تكرار شراء وقيمة طلب. غير موجودين |
| توليد آلاف صفحات خدمة×مدينة×حي | صفحات Doorway — جوجل يصنّفها Scaled Content Abuse، وقد استبعدتها أنت صراحة. المحرك سيقترح الصفحة، والقيد في القاعدة سيمنع نشرها رقيقة |
| Pricing Intelligence | لا الموقع ينشر أسعاراً ولا توجد بيانات تكلفة أو هامش |

كل بند منها له صف جاهز في `bi_data_gaps` يشرح ما يلزم لتفعيله.

---

## ٧. ما سأبنيه فور موافقتك — المرحلة ١ بالتفصيل

1. `009_brain_core.sql` + `010_brain_events.sql` — RLS مغلقة، لا يمسّان أي جدول قائم
2. `src/lib/brain/events.js` — عقد الأحداث المشترك
3. `src/app/api/collect/route.js` — تجميع أول، IP مُجزّأ، حد معدل، رفض البوتات
4. مُرسل الأحداث في الواجهة + قياس Web Vitals
5. محلّلات البند ١٥ كاملة: روابط مكسورة · ٤٠٤/٥٠٠ · مسارات بطيئة · CWV · أخطاء العميل — **وربط كل منها بأثره التجاري**
6. `bi_data_gaps` مُعبّأ بكل نقص ورد في هذا المستند
7. `/dashboard/brain` بشارات التغطية والبطاقات الفارغة الصادقة
8. اختبارات للمحلّلات (دوال حتمية ⇒ قابلة للاختبار فعلاً)

بلا حواجز. ولا يمسّ شيئاً يعمل.

---

## ٨. قراران مطلوبان منك قبل التنفيذ

**الأول — نطاق المخ:** هل يخدم `trafyekbls.com` فقط، أم يشمل بيانات تشييك (طلبات، مزودين، إيرادات)؟ هذا يحدد إن كانت المرحلة ٥ موجودة أصلاً.

**الثاني — التتبع والخصوصية:** هل نجمع أحداثاً أولية بـ IP مُجزَّأ بلا لافتة موافقة، أم نضيف لافتة PDPL؟

الباقي سأقرره بنفسي وأمضي.
