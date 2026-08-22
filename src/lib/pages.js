// الجدول يخزّن نسختين فقط (ar / en) - نرجع للعربية عند غياب النص الإنجليزي
export const getPageContent = (page, isAr) => {
  if (!page) return { title: "", content: "" };

  return {
    title: (isAr ? page.title_ar : page.title_en || page.title_ar) || "",
    content: (isAr ? page.content_ar : page.content_en || page.content_ar) || "",
  };
};
