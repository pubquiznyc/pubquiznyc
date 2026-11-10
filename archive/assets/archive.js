/* Archive keyboard navigation: Left/Right arrows follow Previous/Next links. */
document.addEventListener("keydown", function (e) {
  if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
    return;
  }
  var t = e.target;
  if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/i.test(t.tagName))) {
    return;
  }
  var sel = e.key === "ArrowLeft" ? "a.post-nav-prev"
          : e.key === "ArrowRight" ? "a.post-nav-next" : null;
  if (!sel) {
    return;
  }
  var link = document.querySelector(sel);
  if (link && link.href) {
    e.preventDefault();
    window.location.href = link.href;
  }
});
