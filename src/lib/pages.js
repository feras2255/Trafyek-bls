export const getPageContent = (page, isAr) => ({
  title: isAr ? page.title_ar : page.title_en,
  content: isAr ? page.content_ar : page.content_en,
});
