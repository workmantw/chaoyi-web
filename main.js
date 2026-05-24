(() => {
  // ===== Service data (含分類圖片) =====
  const SERVICES = {
    emergency: {
      title: '居家水電急修',
      tag: '配電 · 燈具 · 急修',
      items: ['跳電查修', '電路走火檢測', '水管漏水', '燈具更換', '插座開關配置'],
      images: ['16727_0.jpg', '16732_0.jpg', '16736_0.jpg', '16745_0.jpg', '16746_0.jpg']
    },
    bathroom: {
      title: '衛浴設備汰換',
      tag: '衛浴 · 防水 · 改道',
      items: ['馬桶安裝', '洗手面盆更換', '熱水器安裝', '浴室整體防水', '水管改道'],
      images: ['16728_0.jpg', '16730_0.jpg', '16738_0.jpg']
    },
    renovation: {
      title: '裝修統包工程',
      tag: '統包 · 大樓 · 新建',
      items: ['舊屋翻修水電重新佈線配管', '大樓全棟管線更新', '新建案水電工程承包'],
      images: [
        '16725_0.jpg', '16726_0.jpg', '16729_0.jpg', '16731_0.jpg', '16733_0.jpg',
        '16734_0.jpg', '16735_0.jpg', '16737_0.jpg', '16739_0.jpg', '16740_0.jpg',
        '16741_0.jpg', '16742_0.jpg', '16743_0.jpg', '16744_0.jpg', '16747.jpg'
      ]
    }
  };

  // ===== Build combined gallery list =====
  const galleryItems = [];
  Object.entries(SERVICES).forEach(([key, svc]) => {
    svc.images.forEach(file => {
      galleryItems.push({ src: `assets/images/${key}/${file}`, tag: svc.tag, category: svc.title });
    });
  });

  // ===== Image preview dialog (服務範圍地圖 + gallery / service modal 內的圖) =====
  const imgModal = document.getElementById('imgModal');
  const imgModalImg = document.getElementById('imgModalImg');
  const imgModalCaption = document.getElementById('imgModalCaption');
  const imgModalClose = document.getElementById('imgModalClose');

  const openImgModal = (src, alt, caption) => {
    if (!imgModal) return;
    imgModalImg.src = src;
    imgModalImg.alt = alt || '';
    imgModalCaption.textContent = caption || '';
    if (typeof imgModal.showModal === 'function') imgModal.showModal();
  };

  const mapImg = document.querySelector('.hero__area__map img');
  if (mapImg) {
    mapImg.addEventListener('click', () => {
      openImgModal(mapImg.src, mapImg.alt, '台南服務範圍');
    });
  }

  if (imgModal) {
    imgModalClose.addEventListener('click', () => imgModal.close());
    imgModal.addEventListener('click', (e) => {
      if (e.target === imgModal) imgModal.close();
    });
  }

  // ===== Service detail dialog (左：項目 / 右：工程參考圖) =====
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('serviceModalTitle');
  const modalList = document.getElementById('serviceModalList');
  const modalGallery = document.getElementById('serviceModalGallery');
  const modalClose = document.getElementById('serviceModalClose');

  const openService = (key) => {
    const data = SERVICES[key];
    if (!data || !modal) return;
    modalTitle.textContent = data.title;

    modalList.innerHTML = '';
    data.items.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      modalList.appendChild(li);
    });

    modalGallery.innerHTML = '';
    data.images.forEach(file => {
      const src = `assets/images/${key}/${file}`;
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${data.title} - 工程參考`;
      img.loading = 'lazy';
      fig.appendChild(img);
      fig.addEventListener('click', () => openImgModal(src, img.alt, data.title));
      modalGallery.appendChild(fig);
    });

    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
  };

  document.querySelectorAll('[data-service-key]').forEach(card => {
    card.addEventListener('click', () => openService(card.dataset.serviceKey));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openService(card.dataset.serviceKey);
      }
    });
  });

  if (modal) {
    modalClose.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }

  // ===== Gallery modal (所有工程實績) =====
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalGrid = document.getElementById('galleryModalGrid');
  const galleryModalClose = document.getElementById('galleryModalClose');
  const openGalleryBtn = document.getElementById('openGalleryBtn');

  const populateGallery = () => {
    if (!galleryModalGrid || galleryModalGrid.children.length) return;
    const frag = document.createDocumentFragment();
    galleryItems.forEach((item, idx) => {
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = `${item.category} - 工程實績 ${idx + 1}`;
      img.loading = 'lazy';
      const cap = document.createElement('figcaption');
      cap.textContent = `${item.tag}　·　CASE ${String(idx + 1).padStart(2, '0')}`;
      fig.appendChild(img);
      fig.appendChild(cap);
      fig.addEventListener('click', () => openImgModal(item.src, img.alt, `${item.tag}　·　CASE ${String(idx + 1).padStart(2, '0')}`));
      frag.appendChild(fig);
    });
    galleryModalGrid.appendChild(frag);
  };

  const openGallery = () => {
    if (!galleryModal) return;
    populateGallery();
    if (typeof galleryModal.showModal === 'function') galleryModal.showModal();
    else galleryModal.setAttribute('open', '');
  };

  if (openGalleryBtn) openGalleryBtn.addEventListener('click', openGallery);
  document.querySelectorAll('[data-nav="gallery"]').forEach(a => {
    a.addEventListener('click', (e) => { e.preventDefault(); openGallery(); });
  });

  if (galleryModal) {
    galleryModalClose.addEventListener('click', () => galleryModal.close());
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) galleryModal.close();
    });
  }

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
