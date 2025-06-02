async function loadChapters(mangaUrl) {
  const response = await fetch('https://vymanga.com' + mangaUrl);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const chapters = [];
  doc.querySelectorAll('.chapter-list li a').forEach(link => {
    chapters.push({
      title: link.textContent.trim(),
      url: link.getAttribute('href')
    });
  });
  return chapters;
}

async function loadPageImages(chapterUrl) {
  const response = await fetch('https://vymanga.com' + chapterUrl);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const pages = [];
  doc.querySelectorAll('.reader img.page-img').forEach(img => {
    pages.push(img.getAttribute('src'));
  });
  return pages;
}

export default {
  loadChapters,
  loadPageImages
};
