/**
 * يرجع قيمة الحقل حسب اللغة الحالية مع التراجع الآمن.
 * مثال: localized(product, "title", isAr) -> title_ar أو title_en
 * الجداول تخزن نسختين فقط (ar / en)، لذلك أي لغة أخرى تعود للإنجليزية ثم العربية.
 */
export function localized(row, field, isAr) {
  if (!row) return "";
  const ar = row[`${field}_ar`];
  const en = row[`${field}_en`];
  return (isAr ? ar || en : en || ar) || "";
}
