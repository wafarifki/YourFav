const SIZES = [{
        s: 16,
        n: 'favicon-16x16.png',
        l: '16×16',
        u: 'Browser tab',
        e: 1
    },
    {
        s: 32,
        n: 'favicon-32x32.png',
        l: '32×32',
        u: 'Retina tab',
        e: 1
    },
    {
        s: 48,
        n: 'favicon-48x48.png',
        l: '48×48',
        u: 'Windows icon',
        e: 1
    },
    {
        s: 70,
        n: 'mstile-70x70.png',
        l: '70×70',
        u: 'MS small tile',
        e: 0
    },
    {
        s: 96,
        n: 'favicon-96x96.png',
        l: '96×96',
        u: 'Google TV',
        e: 0
    },
    {
        s: 128,
        n: 'favicon-128x128.png',
        l: '128×128',
        u: 'Chrome Store',
        e: 0
    },
    {
        s: 144,
        n: 'mstile-144x144.png',
        l: '144×144',
        u: 'Windows tile',
        e: 0
    },
    {
        s: 150,
        n: 'mstile-150x150.png',
        l: '150×150',
        u: 'MS medium tile',
        e: 0
    },
    {
        s: 152,
        n: 'apple-touch-icon-152x152.png',
        l: '152×152',
        u: 'iPad',
        e: 0
    },
    {
        s: 180,
        n: 'apple-touch-icon.png',
        l: '180×180',
        u: 'Apple Touch',
        e: 1
    },
    {
        s: 192,
        n: 'android-chrome-192x192.png',
        l: '192×192',
        u: 'Android',
        e: 1
    },
    {
        s: 310,
        n: 'mstile-310x310.png',
        l: '310×310',
        u: 'MS large tile',
        e: 0
    },
    {
        s: 512,
        n: 'android-chrome-512x512.png',
        l: '512×512',
        u: 'PWA splash',
        e: 1
    },
    {
        s: 0,
        n: 'favicon.svg',
        l: 'SVG',
        u: 'Scalable vector',
        e: 1
    }
];
let upFile = null,
    upImg = null,
    zipBlob = null,
    curSel = null;
const $ = s => document.querySelector(s);
const dropZone = $('#dropZone'),
    fileInput = $('#fileInput');
const procSec = $('#procSec'),
    procStep = $('#procStep');
const resSec = $('#resSec'),
    pvGrid = $('#pvGrid');
const btnDl = $('#btnDl'),
    btnCp = $('#btnCp'),
    codePre = $('#codePre');
const btnNew = $('#btnNew'),
    logoBtn = $('#logoBtn');
const thBtn = $('#thBtn');
const ov = $('#ov'),
    mx = $('#mx'),
    mCn = $('#mCn');
const mGn = $('#mGn'),
    mGt = $('#mGt'),
    szGrid = $('#szGrid');
const qAll = $('#qAll'),
    qEss = $('#qEss');
const mThumb = $('#mThumb'),
    mName = $('#mName'),
    mSz = $('#mSz'),
    mDim = $('#mDim');
const viewSizes = $('#viewSizes'),
    viewSettings = $('#viewSettings');
const mSettings = $('#mSettings'),
    setClose = $('#setClose'),
    setDone = $('#setDone');
const fAppName = $('#fAppName'),
    fShortName = $('#fShortName');
const fThemeColor = $('#fThemeColor'),
    fThemeHex = $('#fThemeHex');
const fBgColor = $('#fBgColor'),
    fBgHex = $('#fBgHex');
const fPath = $('#fPath');
fThemeColor.addEventListener('input', () => fThemeHex.value = fThemeColor.value);
fThemeHex.addEventListener('input', () => {
    if (/^#[0-9a-f]{6}$/i.test(fThemeHex.value)) fThemeColor.value = fThemeHex.value
});
fBgColor.addEventListener('input', () => fBgHex.value = fBgColor.value);
fBgHex.addEventListener('input', () => {
    if (/^#[0-9a-f]{6}$/i.test(fBgHex.value)) fBgColor.value = fBgHex.value
});

function showView(v) {
    viewSizes.classList.toggle('active', v === 'sizes');
    viewSettings.classList.toggle('active', v === 'settings')
}
mSettings.addEventListener('click', () => showView('settings'));
setClose.addEventListener('click', () => showView('sizes'));
setDone.addEventListener('click', () => showView('sizes'));

function setTh(m) {
    document.documentElement.setAttribute('data-theme', m);
    try {
        localStorage.setItem('yf-t', m)
    } catch {}
    thBtn.querySelectorAll('.th-dot').forEach(d => d.classList.toggle('on', d.dataset.m === m));
}
thBtn.addEventListener('click', () => setTh(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));
(function () {
    try {
        if (localStorage.getItem('yf-t') === 'dark') {
            setTh('dark');
            return
        }
    } catch {}
    setTh('light')
})();
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('over')
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('over'));
dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('over');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
});
fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0])
});
async function handleFile(f) {
    const ext = f.name.split('.').pop().toLowerCase();
    const ok = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'tiff', 'tif', 'svg', 'heic', 'heif', 'ico'];
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml', 'image/heic', 'image/heif'].includes(f.type) && !ok.includes(ext)) {
        alert('Please upload an image file.');
        return
    }
    upFile = f;
    let blob = f;
    if (['heic', 'heif'].includes(ext) || ['image/heic', 'image/heif'].includes(f.type)) {
        try {
            blob = await heic2any({
                blob: f,
                toType: 'image/png'
            });
            if (Array.isArray(blob)) blob = blob[0]
        } catch {
            alert('Failed to convert HEIC.');
            return
        }
    }
    const url = URL.createObjectURL(blob),
        img = new Image();
    img.onload = () => {
        upImg = img;
        mThumb.src = url;
        mName.textContent = f.name;
        mSz.textContent = fmtB(f.size);
        const chk = () => {
            if (img.naturalWidth && img.naturalHeight) mDim.textContent = img.naturalWidth + '×' + img.naturalHeight + 'px';
            else requestAnimationFrame(chk)
        };
        chk();
        openModal()
    };
    img.src = url;
}

function openModal() {
    buildGrid();
    showView('sizes');
    ov.classList.remove('hiding');
    ov.classList.add('show');
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    ov.classList.add('hiding');
    setTimeout(() => {
        ov.classList.remove('show', 'hiding');
        document.body.style.overflow = ''
    }, 180)
}
mx.addEventListener('click', () => {
    closeModal();
    resetUp()
});
mCn.addEventListener('click', () => {
    closeModal();
    resetUp()
});
ov.addEventListener('click', e => {
    if (e.target === ov) {
        closeModal();
        resetUp()
    }
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && ov.classList.contains('show')) {
        closeModal();
        resetUp()
    }
});

function buildGrid() {
    szGrid.innerHTML = '';
    SIZES.forEach((f, i) => {
        const el = document.createElement('label');
        el.className = 'sz' + (f.e ? ' on' : '');
        el.innerHTML = `<input type="checkbox" data-i="${i}" ${f.e?'checked':''}><div class="sz-ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><div class="sz-info"><div class="sz-lbl">${f.l}</div><div class="sz-use">${f.u}</div></div>`;
        const cb = el.querySelector('input');
        cb.addEventListener('change', () => {
            el.classList.toggle('on', cb.checked);
            updBtn()
        });
        szGrid.appendChild(el);
    });
    updBtn();
}

function getSel() {
    return Array.from(szGrid.querySelectorAll('input:checked')).map(c => SIZES[+c.dataset.i])
}

function updBtn() {
    const s = getSel();
    mGn.disabled = !s.length;
    mGt.textContent = s.length ? `Generate Favicon${s.length>1?'s':''}` : 'Select at least one'
}
qAll.addEventListener('click', () => {
    szGrid.querySelectorAll('input').forEach(c => {
        c.checked = true;
        c.closest('.sz').classList.add('on')
    });
    updBtn()
});
qEss.addEventListener('click', () => {
    szGrid.querySelectorAll('input').forEach((c, i) => {
        c.checked = SIZES[i].e;
        c.closest('.sz').classList.toggle('on', !!SIZES[i].e)
    });
    updBtn()
});
mGn.addEventListener('click', () => {
    const s = getSel();
    if (!s.length) return;
    closeModal();
    gen(s)
});

function getSettings() {
    return {
        appName: fAppName.value.trim() || 'My Website',
        shortName: fShortName.value.trim() || 'Website',
        themeColor: fThemeHex.value || '#2563eb',
        bgColor: fBgHex.value || '#ffffff',
        path: (fPath.value.trim() || 'favicon/').replace(/\/?$/, '/')
    }
}
async function gen(sel) {
    if (!upImg) return;
    procSec.classList.add('show');
    procSec.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    const cfg = getSettings();
    const z = new JSZip(),
    folder = z.folder(cfg.path.replace(/\/$/, ''));
    try {
        procStep.textContent = 'Resizing images…';
        const blobs = {};
        const ext = upFile?.name?.split('.').pop().toLowerCase();
        for (const f of sel) {
            let b;
            if (f.s === 0) {
                if (ext === 'svg' && upFile) {
                    b = upFile;
                } else {
                    const c = resize(upImg, 512);
                    const pngBlob = await c2b(c, 'image/png');
                    const base64 = await blobToBase64(pngBlob);
                    b = new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><image href="${base64}" width="512" height="512"/></svg>`], { type: 'image/svg+xml' });
                }
            } else {
                const c = resize(upImg, f.s);
                b = await c2b(c, 'image/png');
            }
            blobs[f.n] = b;
            folder.file(f.n, b);
            await sl(25)
        }
        procStep.textContent = 'Generating ICO…';
        const icoS = [16, 32, 48].filter(sz => sel.some(s => s.s === sz));
        if (icoS.length) folder.file('favicon.ico', await mkIco(icoS.map(s => resize(upImg, s))));
        procStep.textContent = 'Creating manifest…';
        const ai = sel.filter(s => s.n.startsWith('android-chrome')),
            mi = [];
        ai.forEach(s => {
            mi.push({
                src: s.n,
                sizes: `${s.s}x${s.s}`,
                type: 'image/png',
                purpose: 'any'
            });
            mi.push({
                src: s.n,
                sizes: `${s.s}x${s.s}`,
                type: 'image/png',
                purpose: 'maskable'
            })
        });
        if (!mi.length) sel.forEach(s => mi.push({
            src: s.n,
            sizes: `${s.s}x${s.s}`,
            type: 'image/png'
        }));
        folder.file('site.webmanifest', JSON.stringify({
            name: cfg.appName,
            short_name: cfg.shortName,
            start_url: '/',
            display: 'standalone',
            background_color: cfg.bgColor,
            theme_color: cfg.themeColor,
            icons: mi
        }, null, 2));
        const ms = sel.filter(s => s.n.startsWith('mstile'));
        if (ms.length) {
            const t = ms.map(s => `      <square${s.s}x${s.s}logo src="${s.n}"/>`).join('\n');
            folder.file('browserconfig.xml', `<?xml version="1.0" encoding="utf-8"?>\n<browserconfig>\n  <msapplication>\n    <tile>\n${t}\n      <TileColor>${cfg.themeColor}</TileColor>\n    </tile>\n  </msapplication>\n</browserconfig>`)
        }
        procStep.textContent = 'Bundling ZIP…';
        zipBlob = await z.generateAsync({
            type: 'blob'
        });
        procSec.classList.remove('show');
        showRes(blobs, sel);
    } catch (e) {
        console.error(e);
        procSec.classList.remove('show');
        alert('Something went wrong.')
    }
}

function showRes(blobs, sel) {
    curSel = sel;
    resSec.classList.add('show');
    pvGrid.innerHTML = '';
    sel.forEach((f, i) => {
        const d = document.createElement('div');
        d.className = 'pv';
        d.style.animationDelay = `${i*.035}s`;
        d.innerHTML = `<div class="th"><img src="${URL.createObjectURL(blobs[f.n])}" alt="${f.l}"></div><div class="lb">${f.l}</div><div class="ul">${f.u}</div>`;
        pvGrid.appendChild(d)
    });
    codePre.innerHTML = codeHTML();
    resSec.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
btnDl.addEventListener('click', () => {
    if (zipBlob) saveAs(zipBlob, 'YourFav.zip')
});
btnCp.addEventListener('click', () => {
    navigator.clipboard.writeText(codePlain()).then(() => {
        btnCp.classList.add('done');
        btnCp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Copied!';
        setTimeout(() => {
            btnCp.classList.remove('done');
            btnCp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy'
        }, 2000)
    })
});
btnNew.addEventListener('click', resetApp);
logoBtn.addEventListener('click', e => {
    e.preventDefault();
    resetApp()
});

function resetUp() {
    upFile = null;
    upImg = null;
    fileInput.value = ''
}

function resetApp() {
    resetUp();
    resSec.classList.remove('show');
    procSec.classList.remove('show');
    zipBlob = null;
    curSel = null;
    pvGrid.innerHTML = '';
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function resize(img, t) {
    const c = document.createElement('canvas');
    c.width = t;
    c.height = t;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const r = Math.max(t / img.naturalWidth, t / img.naturalHeight);
    const w = img.naturalWidth * r,
        h = img.naturalHeight * r;
    ctx.drawImage(img, (t - w) / 2, (t - h) / 2, w, h);
    return c
}

function c2b(c, t) {
    return new Promise(r => c.toBlob(r, t))
}
async function mkIco(canvases) {
    const imgs = [];
    for (const c of canvases) {
        const buf = await (await c2b(c, 'image/png')).arrayBuffer();
        imgs.push({
            w: c.width,
            h: c.height,
            data: new Uint8Array(buf)
        })
    }
    const hdr = 6,
        dir = 16 * imgs.length,
        tot = imgs.reduce((s, i) => s + i.data.length, 0);
    const buf = new ArrayBuffer(hdr + dir + tot),
        dv = new DataView(buf),
        u8 = new Uint8Array(buf);
    dv.setUint16(0, 0, true);
    dv.setUint16(2, 1, true);
    dv.setUint16(4, imgs.length, true);
    let off = hdr + dir;
    imgs.forEach((img, i) => {
        const o = hdr + i * 16;
        u8[o] = img.w === 256 ? 0 : img.w;
        u8[o + 1] = img.h === 256 ? 0 : img.h;
        dv.setUint16(o + 4, 1, true);
        dv.setUint16(o + 6, 32, true);
        dv.setUint32(o + 8, img.data.length, true);
        dv.setUint32(o + 12, off, true);
        off += img.data.length
    });
    off = hdr + dir;
    imgs.forEach(img => {
        u8.set(img.data, off);
        off += img.data.length
    });
    return new Blob([buf], {
        type: 'image/x-icon'
    })
}

function has(n) {
    return curSel?.some(s => s.n === n)
}

function sel() {
    return curSel || []
}

function fil(fn) {
    return sel().filter(fn)
}

function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function codeHTML() {
    const cfg = getSettings(),
        p = cfg.path;
    const tg = t => `<span class="t">${t}</span>`,
        at = (n, v) => `<span class="a">${n}=</span><span class="v">"${esc(v)}"</span>`,
        cm = t => `<span class="cm">${t}</span>`;
    const L = [];
    L.push(cm('&lt;!-- Favicons --&gt;'));
    if (fil(s => s.n === 'favicon.svg').length) L.push(`${tg('&lt;link')} ${at('rel','icon')} ${at('type','image/svg+xml')} ${at('href',p+'favicon.svg')}${tg('&gt;')}`);
    if (fil(s => ['favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png'].includes(s.n)).length) L.push(`${tg('&lt;link')} ${at('rel','shortcut icon')} ${at('href',p+'favicon.ico')} ${at('type','image/x-icon')}${tg('&gt;')}`);
    fil(s => s.n.startsWith('favicon-') && s.n.endsWith('.png')).forEach(f => L.push(`${tg('&lt;link')} ${at('rel','icon')} ${at('type','image/png')} ${at('sizes',f.l)} ${at('href',p+f.n)}${tg('&gt;')}`));
    const ap = fil(s => s.n.startsWith('apple-touch'));
    if (ap.length) {
        L.push('');
        L.push(cm('&lt;!-- Apple Touch --&gt;'));
        ap.forEach(f => L.push(`${tg('&lt;link')} ${at('rel','apple-touch-icon')} ${at('sizes',f.l)} ${at('href',p+f.n)}${tg('&gt;')}`))
    }
    const an = fil(s => s.n.startsWith('android-chrome'));
    if (an.length) {
        L.push('');
        L.push(cm('&lt;!-- Android / PWA --&gt;'));
        an.forEach(f => L.push(`${tg('&lt;link')} ${at('rel','icon')} ${at('type','image/png')} ${at('sizes',f.l)} ${at('href',p+f.n)}${tg('&gt;')}`));
        L.push(`${tg('&lt;link')} ${at('rel','manifest')} ${at('href',p+'site.webmanifest')}${tg('&gt;')}`)
    }
    const ms = fil(s => s.n.startsWith('mstile'));
    if (ms.length) {
        L.push('');
        L.push(cm('&lt;!-- Microsoft Tiles --&gt;'));
        L.push(`${tg('&lt;meta')} ${at('name','msapplication-TileColor')} ${at('content',cfg.themeColor)}${tg('&gt;')}`);
        L.push(`${tg('&lt;meta')} ${at('name','msapplication-config')} ${at('content',p+'browserconfig.xml')}${tg('&gt;')}`)
    }
    L.push('');
    L.push(cm('&lt;!-- Theme --&gt;'), `${tg('&lt;meta')} ${at('name','theme-color')} ${at('content','#ffffff')} ${at('media','(prefers-color-scheme: light)')}${tg('&gt;')}`, `${tg('&lt;meta')} ${at('name','theme-color')} ${at('content','#0c1222')} ${at('media','(prefers-color-scheme: dark)')}${tg('&gt;')}`);
    return L.join('\n');
}

function codePlain() {
    const cfg = getSettings(),
        p = cfg.path;
    const L = ['<!-- Favicons -->'];
    if (fil(s => s.n === 'favicon.svg').length) L.push(`<link rel="icon" type="image/svg+xml" href="${p}favicon.svg">`);
    if (fil(s => ['favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png'].includes(s.n)).length) L.push(`<link rel="shortcut icon" href="${p}favicon.ico" type="image/x-icon">`);
    fil(s => s.n.startsWith('favicon-') && s.n.endsWith('.png')).forEach(f => L.push(`<link rel="icon" type="image/png" sizes="${f.l}" href="${p}${f.n}">`));
    const ap = fil(s => s.n.startsWith('apple-touch'));
    if (ap.length) {
        L.push('', '<!-- Apple Touch -->');
        ap.forEach(f => L.push(`<link rel="apple-touch-icon" sizes="${f.l}" href="${p}${f.n}">`))
    }
    const an = fil(s => s.n.startsWith('android-chrome'));
    if (an.length) {
        L.push('', '<!-- Android / PWA -->');
        an.forEach(f => L.push(`<link rel="icon" type="image/png" sizes="${f.l}" href="${p}${f.n}">`));
        L.push(`<link rel="manifest" href="${p}site.webmanifest">`)
    }
    const ms = fil(s => s.n.startsWith('mstile'));
    if (ms.length) {
        L.push('', '<!-- Microsoft Tiles -->', `<meta name="msapplication-TileColor" content="${cfg.themeColor}">`, `<meta name="msapplication-config" content="${p}browserconfig.xml">`)
    }
    L.push('', '<!-- Theme -->', '<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">', '<meta name="theme-color" content="#0c1222" media="(prefers-color-scheme: dark)">');
    return L.join('\n');
}

function fmtB(b) {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB'
}

function sl(ms) {
    return new Promise(r => setTimeout(r, ms))
}

function blobToBase64(blob) {
    return new Promise(r => {
        const reader = new FileReader();
        reader.onloadend = () => r(reader.result);
        reader.readAsDataURL(blob);
    })
}