(() => {
  // Gallery images & rotating captions (matching 4 service types)
  const images = [
    '16725_0.jpg', '16726_0.jpg', '16727_0.jpg', '16728_0.jpg', '16729_0.jpg',
    '16730_0.jpg', '16731_0.jpg', '16732_0.jpg', '16733_0.jpg', '16734_0.jpg',
    '16735_0.jpg', '16736_0.jpg', '16737_0.jpg', '16738_0.jpg', '16739_0.jpg',
    '16740_0.jpg', '16741_0.jpg', '16742_0.jpg', '16743_0.jpg', '16744_0.jpg',
    '16745_0.jpg', '16746_0.jpg', '16747.jpg'
  ];
  const tags = ['水電配管', '建築工程', '配電工程', '衛浴維修', '管線施工', '電氣設備', '結構工程', '室內配線'];

  const grid = document.getElementById('galleryGrid');
  const frag = document.createDocumentFragment();
  images.forEach((file, i) => {
    const fig = document.createElement('figure');
    fig.dataset.index = i;
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = `assets/images/${file}`;
    img.alt = `朝億水電工程行 — 工程實績 ${i + 1}`;
    const cap = document.createElement('figcaption');
    cap.textContent = `${tags[i % tags.length]}　·　CASE ${String(i + 1).padStart(2, '0')}`;
    fig.appendChild(img);
    fig.appendChild(cap);
    frag.appendChild(fig);
  });
  grid.appendChild(frag);

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');
  const close = document.getElementById('lightboxClose');
  const prev = document.getElementById('lightboxPrev');
  const next = document.getElementById('lightboxNext');
  let current = 0;

  const open = (idx) => {
    current = idx;
    lbImg.src = `assets/images/${images[current]}`;
    lbCap.textContent = `${tags[current % tags.length]}　·　${current + 1} / ${images.length}`;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const step = (d) => open((current + d + images.length) % images.length);

  grid.addEventListener('click', (e) => {
    const fig = e.target.closest('figure');
    if (fig) open(Number(fig.dataset.index));
  });
  close.addEventListener('click', closeLb);
  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
