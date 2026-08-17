import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitises rich-text HTML coming out of the CMS before it is injected with
 * dangerouslySetInnerHTML.
 *
 * The audit found ten injection sites rendering `blogs`, `projects`,
 * `categories` and `pages` HTML with no sanitisation at all. The editor stores
 * raw HTML, so anything that reaches those tables — through an RLS gap, a
 * compromised admin session, or a paste from an untrusted source — executed in
 * every visitor's browser.
 *
 * The allow-list covers what the TipTap editor in the dashboard can actually
 * produce, so legitimate content renders byte-identical to before. What gets
 * stripped is script, iframe, object, event handlers (onclick and friends),
 * javascript: URLs, and style attributes.
 */

const ALLOWED_TAGS = [
  // block
  "p", "div", "br", "hr", "blockquote", "pre",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  // inline
  "a", "strong", "b", "em", "i", "u", "s", "strike", "del", "ins",
  "span", "mark", "small", "sub", "sup", "code", "img", "figure", "figcaption",
];

const ALLOWED_ATTR = [
  "href", "target", "rel",
  "src", "alt", "title", "width", "height", "loading",
  "colspan", "rowspan",
  "class", "dir",
];

/**
 * @param  {string|null|undefined} html
 * @return {string} sanitised HTML, or "" for empty input
 */
export function sanitize(html) {
  if (!html || typeof html !== "string") return "";

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Blocks javascript:, data: and other scheme-based payloads in href/src
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
    // Never allow a form to be injected into editorial content
    FORBID_TAGS: ["form", "input", "button", "select", "textarea", "style", "svg"],
    FORBID_ATTR: ["style", "onerror", "onload", "onclick"],
    // Keep the text of a stripped tag rather than deleting the content too
    KEEP_CONTENT: true,
  });
}
