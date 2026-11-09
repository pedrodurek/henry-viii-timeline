(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const H = window.HENRY, W = window.WIVES, KIDS = window.CHILDREN, EV = window.EVENTS;
  const byKey = Object.fromEntries([H, ...W, ...KIDS].map(p => [p.key, p]));
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const CATS = {
    all: { label: 'Everything', c: '#f7dc95' },
    crown: { label: 'Crown', c: '#d8ad55' },
    wife: { label: 'Marriages', c: '#d4668a' },
    family: { label: 'Heirs', c: '#6fae63' },
    faith: { label: 'Faith', c: '#9b7fd1' },
    politics: { label: 'Politics', c: '#c98b4a' },
    war: { label: 'War', c: '#6c98c9' },
    death: { label: 'Deaths', c: '#c8303a' }
  };

  // ---------- dates ----------
  const parse = s => {
    const [y, m, d] = s.split('-').map(Number);
    return { y, m: m ? m - 1 : 6, d: d || 1 };
  };
  const ageAt = (person, dateStr) => {
    const b = parse(person.born), t = parse(dateStr);
    let a = t.y - b.y;
    if (t.m < b.m || (t.m === b.m && t.d < b.d)) a--;
    return a;
  };
  const ageTxt = (p, d) => (p.approx ? '~' : '') + ageAt(p, d);
  const frac = s => { const p = parse(s); return p.y + (p.m + (p.d - 1) / 31) / 12; };
  const fmt = s => { const p = s.split('-'); return p.length === 3 ? `${+p[2]} ${MONTHS[+p[1] - 1]} ${p[0]}` : p.length === 2 ? `${MONTHS[+p[1] - 1]} ${p[0]}` : `c. ${p[0]}`; };
  const born = p => (p.approx ? 'c. ' : '') + p.born.slice(0, 4);
  const span = (a, b) => {
    const A = parse(a), B = parse(b);
    let months = (B.y - A.y) * 12 + (B.m - A.m) - (B.d < A.d ? 1 : 0);
    const y = Math.floor(months / 12), m = months % 12;
    if (!y && !m) return `${Math.round((Date.UTC(B.y, B.m, B.d) - Date.UTC(A.y, A.m, A.d)) / 864e5)} days`;
    return [y && `${y} year${y > 1 ? 's' : ''}`, m && `${m} month${m > 1 ? 's' : ''}`].filter(Boolean).join(', ');
  };
  const KID_ICON = `<svg><use href="#rose"/></svg>`;
  const kidLife = k => {
    if (k.life) return k.life;
    if (k.fate === 'stillborn') return 'Stillborn';
    if (k.fate === 'miscarriage') return 'Miscarried';
    if (k.born && k.died) {
      const d = days(k.born, k.died);
      return d < 365 ? `Lived ${d} days` : `Died aged ${ageAt({ born: k.born }, k.died)}`;
    }
    return '';
  };
  const kidDates = k => {
    const b = k.born ? fmt(k.born) : k.bornLabel;
    if (k.fate === 'stillborn' || k.fate === 'miscarriage' || k.fate === 'lost') return b;
    const d = k.died ? fmt(k.died) : k.diedLabel;
    return d ? `${b} <i>to</i> ${d}` : b;
  };
  const kidsHTML = w => {
    if (!w.kids.length) return `<p class="nokids">${w.noKids}</p>`;
    return `<ol class="kids">${w.kids.map((k, j) => {
      const lost = k.fate !== 'adult' && k.fate !== 'unknown';
      const ages = k.born ? [`${w.name.split(' ')[0]} ${ageTxt(w, k.born)}`].concat(k.born <= H.died && !k.father ? [`Henry ${ageAt(H, k.born)}`] : []) : [];
      return `<li class="kid${lost ? ' lost' : ''}" style="--d:${.15 + j * .09}s">
        <span class="kav" ${k.img ? `style="background-image:url(${k.img})"` : ''}>${k.img ? '' : KID_ICON}</span>
        <div class="kmain">
          <div class="khead"><b>${k.name}</b><small>${k.sex === 'Unknown' ? '' : k.sex}${k.father ? ` of ${k.father}` : ''}</small><span class="klife">${kidLife(k)}</span></div>
          <div class="kdates">${kidDates(k)}${ages.length ? ` <span class="kages">${ages.length > 1 ? 'Parents\' ages' : 'Mother\'s age'}: ${ages.join(', ')}</span>` : ''}</div>
          ${k.reign ? `<div class="kreign">${k.reign}</div>` : ''}
          <p class="knote">${k.note}</p>
        </div>
      </li>`;
    }).join('')}</ol>`;
  };
  const days = (a, b) => { const A = parse(a), B = parse(b); return (Date.UTC(B.y, B.m, B.d) - Date.UTC(A.y, A.m, A.d)) / 864e5; };

  // ---------- reveal on scroll ----------
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  const watch = el => io.observe(el);

  // ---------- hero ----------
  $$('.title .split').forEach((el, wi) => {
    const txt = el.textContent; el.textContent = '';
    [...txt].forEach((ch, i) => {
      const s = document.createElement('span'); s.className = 'ch'; s.textContent = ch;
      s.style.animationDelay = `${.35 + wi * .45 + i * .08}s, 0s`; el.appendChild(s);
    });
  });
  const rhyme = $('#rhyme');
  W.forEach((w, i) => {
    const b = document.createElement('button');
    b.className = 'w'; b.style.setProperty('--c', w.color); b.style.animationDelay = `${1.9 + i * .18}s`;
    b.innerHTML = `${w.fate}<span class="tip"><img src="${w.img}" alt=""><span>${w.name}</span></span>`;
    b.addEventListener('click', () => openWife(i));
    rhyme.appendChild(b);
  });
  const orbit = $('#orbit');
  W.forEach((w, i) => {
    const s = document.createElement('div'); s.className = 'sat';
    s.style.setProperty('--a', `${i * 60}deg`); s.style.setProperty('--c', w.color);
    s.innerHTML = `<div class="sat-in"><button aria-label="${w.name}"><img src="${w.img}" alt=""><span class="n">${w.n}</span></button><span class="lbl">${w.name}</span></div>`;
    s.querySelector('button').addEventListener('click', () => openWife(i));
    orbit.appendChild(s);
  });

  // gold dust
  (() => {
    const cv = $('#dust'), cx = cv.getContext('2d'); let w, h, run = true; const mouse = { x: -999, y: -999 };
    const P = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2.2 + .4, v: Math.random() * .0009 + .0002, s: Math.random() * Math.PI * 2, dx: 0, dy: 0 }));
    const size = () => { const dpr = devicePixelRatio || 1; w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); addEventListener('resize', size);
    cv.parentElement.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run) requestAnimationFrame(tick); }).observe(cv);
    function tick(t) {
      if (!run) return;
      cx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.y -= p.v; p.x += Math.sin(t / 2000 + p.s) * .0003;
        if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
        let px = p.x * w + p.dx, py = p.y * h + p.dy;
        const ddx = px - mouse.x, ddy = py - mouse.y, dist = Math.hypot(ddx, ddy);
        if (dist < 120) { p.dx += ddx / dist * 2; p.dy += ddy / dist * 2; }
        p.dx *= .96; p.dy *= .96;
        const tw = .45 + .55 * Math.sin(t / 400 + p.s * 3);
        const g = cx.createRadialGradient(px, py, 0, px, py, p.r * 4);
        g.addColorStop(0, `rgba(255,226,150,${.9 * tw})`); g.addColorStop(1, 'rgba(216,173,85,0)');
        cx.fillStyle = g; cx.beginPath(); cx.arc(px, py, p.r * 4, 0, 7); cx.fill();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  // ---------- cards ----------
  const cards = $('#cards');
  W.forEach((w, i) => {
    const el = document.createElement('article');
    el.className = 'card'; el.style.setProperty('--c', w.color); el.style.setProperty('--d', `${(i % 3) * .12}s`);
    el.tabIndex = 0;
    el.innerHTML = `
      <div class="card-tilt"><div class="card-inner">
        <div class="face front">
          <img src="${w.img}" alt="${w.name}" loading="lazy">
          <div class="medal">${w.n}</div>
          <span class="flip-hint">Click to turn ↻</span>
          <div class="front-txt">
            <h3>${w.name}</h3>
            <div class="yrs">${born(w)} to ${w.died.slice(0, 4)} · Queen ${w.wed.slice(0, 4)} to ${w.end.slice(0, 4)}</div>
            <span class="fate-pill">${w.fate}</span>
          </div>
        </div>
        <div class="face back">
          <h3>${w.name}</h3>
          <dl>
            <dt>Married</dt><dd>${fmt(w.wed)}</dd>
            <dt>Ended</dt><dd>${w.endHow}, ${fmt(w.end)}</dd>
            <dt>Lasted</dt><dd>${span(w.wed, w.end)}</dd>
            <dt>Emblem</dt><dd>${w.emblem}</dd>
            <dt>Children</dt><dd>${w.kidsShort}</dd>
          </dl>
          <div class="vs">
            <div><b>${ageTxt(w, w.wed)}</b><small>Her age</small></div><i>and</i>
            <div><b>${ageAt(H, w.wed)}</b><small>Henry's</small></div>
          </div>
          <div class="stamp">${w.fate}</div>
          <p class="motto">"${w.motto}"</p>
          <button class="btn" data-open>Read her story →</button>
        </div>
      </div></div>`;
    const tilt = el.querySelector('.card-tilt');
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', `${(x - .5) * 18}deg`); el.style.setProperty('--rx', `${(.5 - y) * 14}deg`);
      el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`);
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    el.addEventListener('click', e => { if (e.target.closest('[data-open]')) { openWife(i); return; } el.classList.toggle('flipped'); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.classList.toggle('flipped'); } });
    cards.appendChild(el); watch(el);
  });

  // ---------- age chart ----------
  const chart = $('#agechart');
  const maxLen = Math.max(...W.map(w => days(w.wed, w.end)));
  W.forEach((w, i) => {
    const row = document.createElement('div');
    row.className = 'arow'; row.style.setProperty('--c', w.color); row.style.setProperty('--d', `${i * .12}s`);
    const hA = ageAt(H, w.wed), wA = ageAt(w, w.wed);
    row.innerHTML = `
      <div class="awho"><img src="${w.img}" alt=""><div><b>${w.name}</b><small>${fmt(w.wed)}</small></div></div>
      <div class="abars">
        <div class="abar h"><i data-age="${hA / 60}" data-len="0"></i><span>Henry · ${hA}</span></div>
        <div class="abar w"><i data-age="${wA / 60}" data-len="${days(w.wed, w.end) / maxLen}"></i><span data-age="${w.short} · ${ageTxt(w, w.wed)}" data-len="${span(w.wed, w.end)}">${w.short} · ${ageTxt(w, w.wed)}</span></div>
        <div class="abar gap" data-age="${hA - wA > 0 ? `He was ${w.approx ? 'about ' : ''}${hA - wA} years older` : `She was ${wA - hA} years older`}" data-len="${w.endHow} on ${fmt(w.end)}"></div>
      </div>`;
    row.querySelector('.awho').addEventListener('click', () => openWife(i));
    chart.appendChild(row);
  });
  const setMode = mode => {
    chart.dataset.mode = mode;
    $$('.abar i', chart).forEach(i => { i.style.width = chart.classList.contains('in') ? `${(+i.dataset[mode]) * 100}%` : 0; });
    $$('.abar.w span', chart).forEach(s => s.textContent = s.dataset[mode]);
    $$('.abar.gap', chart).forEach(s => s.textContent = s.dataset[mode]);
    $$('.toggle button').forEach(b => b.classList.toggle('on', b.dataset.mode === mode));
  };
  $$('.toggle button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { chart.classList.add('in'); setMode(chart.dataset.mode || 'age'); o.disconnect(); } }, { threshold: .25 }).observe(chart);
  chart.dataset.mode = 'age'; setMode('age');

  // ---------- odometers ----------
  const odo = (el, n) => {
    el.innerHTML = Array.from({ length: n }, () => `<span class="dg"><span class="strip">${[...'0123456789'].map(d => `<span>${d}</span>`).join('')}</span></span>`).join('');
    const strips = $$('.strip', el);
    return v => { String(v).padStart(n, '0').split('').forEach((d, i) => strips[i].style.transform = `translateY(${-d}em)`); };
  };
  const setYear = odo($('#odoYear'), 4), setAge = odo($('#odoAge'), 2);

  // ---------- timeline ----------
  const filters = $('#filters');
  Object.entries(CATS).forEach(([k, v]) => {
    const b = document.createElement('button'); b.className = 'chip' + (k === 'all' ? ' on' : ''); b.dataset.cat = k;
    b.style.setProperty('--c', v.c); b.innerHTML = `<i></i>${v.label}`;
    b.addEventListener('click', () => {
      $$('.chip', filters).forEach(c => c.classList.toggle('on', c === b));
      $$('.ev').forEach(ev => ev.classList.toggle('hide', k !== 'all' && ev.dataset.cat !== k));
      updateSpine();
    });
    filters.appendChild(b);
  });

  const list = $('#events');
  EV.forEach((e, i) => {
    const li = document.createElement('li');
    const c = CATS[e.cat].c, w = e.w && byKey[e.w];
    li.className = 'ev'; li.dataset.cat = e.cat; li.dataset.i = i; li.style.setProperty('--c', c);
    const [y] = e.d.split('-');
    const dm = (e.label || fmt(e.d)).replace(` ${y}`, '');
    const badges = [`<span class="badge" style="--c:${H.color}"><em style="background-image:url(${e.d < '1520' ? 'images/henry_1509.jpg' : e.d < '1536' ? 'images/henry_1530.jpg' : 'images/henry_holbein.jpg'})"></em>Henry, ${ageAt(H, e.d)}</span>`];
    if (w && e.d >= w.born) badges.push(`<span class="badge" style="--c:${w.color}"><em style="background-image:url(${w.img})"></em>${w.short}, ${ageTxt(w, e.d)}</span>`);
    badges.push(`<span class="badge cat">${CATS[e.cat].label}</span>`);
    if (e.place) badges.push(`<span class="badge plain">${e.place}</span>`);
    li.innerHTML = `
      <div class="ev-card${e.img ? ' has-img' : ''}">
        <div class="ev-body">
          <div class="ev-date"><span class="yr">${y}</span><span class="dm">${dm}</span></div>
          <h3>${e.t}</h3><p>${e.x}</p>
          <div class="ev-meta">${badges.join('')}</div>
        </div>
        ${e.img ? `<div class="ev-img"><img src="${e.img}" alt="" loading="lazy"></div>` : ''}
      </div>`;
    if (e.img) li.querySelector('.ev-img').addEventListener('click', () => lightbox(e.img, `${e.t}, ${fmt(e.d)}`));
    list.appendChild(li); watch(li);
  });

  // HUD
  const portraits = $$('#hudPortrait img');
  const caps = { 1491: 'Portrait c. 1509, unknown artist', 1520: 'Portrait c. 1530, Joos van Cleve', 1536: 'Portrait c. 1537, Hans Holbein', 1540: 'Portrait 1540s, after Holbein' };
  const heirs = $('#heirs');
  heirs.innerHTML = `<span class="none">None yet</span>` + KIDS.map(k => `<span class="h" data-k="${k.key}" data-n="${k.name}" title="${k.name}, born ${fmt(k.born)}, died ${fmt(k.died)}" style="--c:${k.color};background-image:url(${k.img})"></span>`).join('');
  const queenAt = d => { let q = null; W.forEach(w => { if (d >= w.wed && d <= w.end) q = w; }); return q; };
  const lastQueenBefore = d => { let q = null; W.forEach(w => { if (w.end < d) q = w; }); return q; };
  const waistAt = y => y < 1505 ? null : Math.round(y < 1512 ? 32 : Math.min(52, 32 + (y - 1512) * (20 / 33)));
  let curQueen = 'x', curPortrait = null, activeIdx = -1;
  const setHUD = i => {
    if (i === activeIdx) return; activeIdx = i;
    const e = EV[i], y = +e.d.slice(0, 4);
    $$('.ev.active').forEach(x => x.classList.remove('active'));
    $(`.ev[data-i="${i}"]`).classList.add('active');
    setYear(y); setAge(ageAt(H, e.d));
    const pf = [...portraits].reverse().find(p => y >= +p.dataset.from);
    if (pf !== curPortrait) { portraits.forEach(p => p.classList.toggle('on', p === pf)); $('#hudCap').textContent = caps[pf.dataset.from]; curPortrait = pf; }
    const q = queenAt(e.d), chip = $('#queenChip');
    const qk = q ? q.key : 'none';
    if (qk !== curQueen) {
      curQueen = qk;
      const prev = lastQueenBefore(e.d);
      chip.style.setProperty('--c', q ? q.color : '#6b5b45');
      $('.qc-img', chip).style.backgroundImage = q ? `url(${q.img})` : '';
      $('.qc-name', chip).innerHTML = q ? `${q.name}<small>Queen ${q.n} · age ${ageTxt(q, e.d)}</small>` : (prev ? `Between wives<small>after ${prev.name}</small>` : 'Unmarried<small>Prince Henry</small>');
      chip.classList.remove('bump'); void chip.offsetWidth; chip.classList.add('bump');
    } else if (q) { $('.qc-name small', chip).textContent = `Queen ${q.n} · age ${ageTxt(q, e.d)}`; }
    let any = false;
    $$('.h', heirs).forEach(h => { const k = byKey[h.dataset.k]; const on = e.d >= k.born; h.classList.toggle('on', on); any = any || on; });
    $('.none', heirs).style.display = any ? 'none' : '';
    const wv = waistAt(y + 0.5);
    $('#waistFill').style.width = wv ? `${(wv - 26) / 28 * 100}%` : '0%';
    $('#waistVal').textContent = wv ? `${wv}"` : 'Boy';
    if (e.cat === 'death') { const f = $('#hudFlash'); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
    // minimap
    const p = (frac(e.d) - 1491) / (1547.2 - 1491) * 100;
    $('#mmMarker').style.left = `${p}%`; $('#mmYear').textContent = y;
  };
  const evIO = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) setHUD(+en.target.dataset.i); }), { rootMargin: '-45% 0px -50% 0px' });
  $$('.ev').forEach(el => evIO.observe(el));
  setHUD(0);

  // spine fill
  const spineFill = $('#spineFill');
  function updateSpine() {
    const r = list.getBoundingClientRect(), vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh * .5 - r.top) / r.height));
    spineFill.style.height = `${p * 100}%`;
  }
  addEventListener('scroll', () => requestAnimationFrame(updateSpine), { passive: true }); updateSpine();

  // minimap segments
  const segs = $('#mmSegs'), toP = f => (f - 1491) / (1547.2 - 1491) * 100;
  W.forEach((w, i) => {
    const s = document.createElement('i'); s.style.setProperty('--c', w.color); s.dataset.n = w.n; s.title = `${w.name}, ${w.wed.slice(0, 4)} to ${w.end.slice(0, 4)}`;
    s.style.left = `${toP(frac(w.wed))}%`; s.style.width = `${Math.max(.6, toP(frac(w.end)) - toP(frac(w.wed)))}%`;
    s.addEventListener('click', ev => { ev.stopPropagation(); openWife(i); });
    segs.appendChild(s);
  });
  $('#mmTrack').addEventListener('click', e => {
    const r = e.currentTarget.getBoundingClientRect(), yr = 1491 + (e.clientX - r.left) / r.width * 56.2;
    let best = 0; EV.forEach((ev, i) => { if (Math.abs(frac(ev.d) - yr) < Math.abs(frac(EV[best].d) - yr)) best = i; });
    $$('.chip')[0].click();
    $(`.ev[data-i="${best}"]`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  const navIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('.mm-links a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === `#${e.target.id}`)); }), { rootMargin: '-50% 0px -50% 0px' });
  $$('section.sec').forEach(s => navIO.observe(s));

  // ---------- gantt ----------
  const G0 = 1485, G1 = 1560, gx = f => (Math.min(f, G1) - G0) / (G1 - G0) * 100;
  const axis = $('#gAxis');
  for (let y = 1490; y <= 1560; y += 10) axis.insertAdjacentHTML('beforeend', `<span style="left:${gx(y)}%">${y}</span>`);
  const rowsEl = $('#gRows');
  const people = [{ ...H, label: 'Henry VIII' }, ...W.map(w => ({ ...w, label: w.name })), ...KIDS.map(k => ({ ...k, label: k.name, kid: true }))];
  people.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'grow' + (i === 1 || i === 7 ? ' sep' : ''); row.style.setProperty('--c', p.color); row.dataset.k = p.key;
    const b = frac(p.born.length === 4 ? p.born + '-07-01' : p.born), d = frac(p.died);
    let inner = `<div class="gbar${d > G1 ? ' more' : ''}" data-more="${p.died.slice(0, 4)}" style="left:${gx(b)}%;width:${gx(d) - gx(b)}%"></div>`;
    if (p.key === 'henry') inner += `<div class="gmar reign" title="Reign" style="left:${gx(frac(H.reignStart))}%;width:${gx(d) - gx(frac(H.reignStart))}%"></div>`;
    if (p.wed) inner += `<div class="gmar" title="Married to Henry" style="left:${gx(frac(p.wed))}%;width:${gx(frac(p.end)) - gx(frac(p.wed))}%"></div>`;
    inner += `<span class="gage"></span>`;
    row.innerHTML = `<div class="glabel"><img src="${p.key === 'henry' ? 'images/henry_holbein.jpg' : p.img}" alt=""><b>${p.label}</b></div><div class="gtrack">${inner}</div>`;
    const wi = W.findIndex(w => w.key === p.key);
    if (wi >= 0) row.querySelector('.glabel').addEventListener('click', () => openWife(wi));
    row._b = b; row._d = d; row._p = p;
    rowsEl.appendChild(row);
  });
  const range = $('#yearRange'), scrub = $('#gScrub'), bigYear = $('#bigYear'), note = $('#yearNote');
  const yearNotes = EV.map(e => ({ f: frac(e.d), t: e.t }));
  const ageFrac = (p, Y) => { const b = p.born.length === 4 ? frac(p.born + '-07-01') : frac(p.born); return Math.floor(Y - b); };
  function renderYear(Y) {
    const yi = Math.floor(Y);
    bigYear.textContent = yi;
    const left = gx(Y);
    const rowsRect = $('.gtrack', rowsEl).getBoundingClientRect(), gRect = $('#gantt').getBoundingClientRect();
    scrub.style.left = `${rowsRect.left - gRect.left + rowsRect.width * left / 100}px`;
    $$('.grow', rowsEl).forEach(r => {
      const p = r._p, g = r.querySelector('.gage');
      g.style.left = `${left}%`;
      const alive = Y >= r._b && Y < r._d;
      r.classList.toggle('alive', alive);
      g.className = 'gage' + (Y < r._b ? ' unborn' : !alive ? ' dead' : '');
      if (alive) {
        const a = ageFrac(p, Y);
        const isQ = p.wed && Y >= frac(p.wed) && Y <= frac(p.end);
        const isK = p.key === 'henry' && Y >= frac(H.reignStart);
        g.textContent = `${p.approx ? '~' : ''}${a}${isQ ? ' · Queen' : isK ? ' · King' : ''}`;
      } else if (Y >= r._d) g.textContent = `† ${p.died.slice(0, 4)}`;
    });
    const near = yearNotes.filter(n => n.f >= yi && n.f < yi + 1);
    note.textContent = near.length ? near.slice(0, 3).map(n => n.t).join(' · ') + (near.length > 3 ? ` · and ${near.length - 3} more` : '') : '';
    if (Y >= 1491 && Y <= 1547.2) { $('#mmMarker').style.left = `${toP(Y)}%`; $('#mmYear').textContent = yi; }
  }
  range.addEventListener('input', () => { stopPlay(); renderYear(+range.value); });
  addEventListener('resize', () => renderYear(+range.value));
  let playing = false, raf;
  const playBtn = $('#playBtn');
  function stopPlay() { playing = false; playBtn.classList.remove('on'); cancelAnimationFrame(raf); }
  playBtn.addEventListener('click', () => {
    if (playing) return stopPlay();
    playing = true; playBtn.classList.add('on');
    if (+range.value >= 1559.9) range.value = G0;
    let last = performance.now();
    const step = t => {
      if (!playing) return;
      const v = Math.min(G1, +range.value + (t - last) / 1000 * 3.2); last = t;
      range.value = v; renderYear(v);
      if (v >= G1) return stopPlay();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  });
  requestAnimationFrame(() => renderYear(+range.value));

  // ---------- quiz ----------
  const box = $('#quizBox'); let qi = 0, score = 0, results = [];
  function renderQ() {
    if (qi >= QUIZ.length) return renderEnd();
    const q = QUIZ[qi];
    const prog = QUIZ.map((_, i) => `<i class="${results[i] === true ? 'ok' : results[i] === false ? 'bad' : i === qi ? 'cur' : ''}"></i>`).join('');
    const opts = q.type === 'wife'
      ? W.map((w, i) => `<button class="qopt" data-v="${w.key}" style="--c:${w.color};--d:${i * .06}s"><img src="${w.img}" alt=""><b>${w.name}</b></button>`).join('')
      : q.options.map((o, i) => `<button class="qopt" data-v="${o}" style="--d:${i * .06}s"><b>${o}</b></button>`).join('');
    box.innerHTML = `<div class="qprog">${prog}</div><div class="qq">${q.q}</div><div class="qopts ${q.type === 'wife' ? '' : 'txt'}">${opts}</div><div class="qfb"></div>`;
    $$('.qopt', box).forEach(b => b.addEventListener('click', () => answer(b, q)));
  }
  function answer(b, q) {
    const wrap = $('.qopts', box); if (wrap.classList.contains('done')) return;
    wrap.classList.add('done');
    const ok = b.dataset.v === q.a; results[qi] = ok; if (ok) score++;
    b.classList.add(ok ? 'right' : 'wrong');
    if (!ok) $(`.qopt[data-v="${q.a}"]`, box).classList.add('right');
    $('.qfb', box).innerHTML = (ok ? '<b style="color:#8fd18a">Correct.</b> ' : '<b style="color:#e06a6a">Not quite.</b> ') + q.why;
    if (ok) burst(b);
    setTimeout(() => { qi++; renderQ(); }, 2600);
  }
  function renderEnd() {
    const verdicts = ['Off to the Tower with you.', 'Banished from court.', 'A promising courtier.', 'The King is pleased.', 'Made a Knight of the Garter!'];
    const v = verdicts[Math.min(4, Math.floor(score / QUIZ.length * 5))];
    box.innerHTML = `<div class="qend"><h3>${score} / ${QUIZ.length}</h3><p>${v}</p><button class="btn primary" id="qAgain">Try again</button></div>`;
    if (score >= 5) burst(box, 40);
    $('#qAgain').addEventListener('click', () => { qi = 0; score = 0; results = []; renderQ(); });
  }
  renderQ();

  function burst(el, n = 18) {
    const r = el.getBoundingClientRect(), b = $('#burst');
    for (let i = 0; i < n; i++) {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.innerHTML = '<use href="#rose"/>';
      s.style.left = `${r.left + r.width / 2 - 15}px`; s.style.top = `${r.top + r.height / 2 - 15}px`;
      const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 220;
      s.style.setProperty('--tx', `${Math.cos(a) * d}px`); s.style.setProperty('--ty', `${Math.sin(a) * d - 80}px`); s.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      s.style.animationDelay = `${Math.random() * .15}s`;
      b.appendChild(s); setTimeout(() => s.remove(), 1700);
    }
  }

  // ---------- modal ----------
  const modal = $('#modal'), card = $('#modalCard'); let modalIdx = -1, lastFocus;
  function openModal() { lastFocus = document.activeElement; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; setTimeout(() => $('.m-close', card)?.focus(), 50); }
  function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; modalIdx = -1; lastFocus?.focus?.(); }
  function openWife(i) {
    i = (i + W.length) % W.length; modalIdx = i;
    const w = W[i], L0 = frac(w.born.length === 4 ? w.born + '-07-01' : w.born), L1 = frac(w.died), lp = f => (f - L0) / (L1 - L0) * 100;
    card.className = 'modal-card'; card.style.setProperty('--c', w.color);
    card.innerHTML = `
      <button class="m-close" aria-label="Close">×</button>
      <div class="m-img"><img src="${w.img}" alt="${w.name}"><div class="medal">${w.n}</div></div>
      <div class="m-body">
        <p class="kicker">Queen ${w.n} of VI</p>
        <h2>${w.name}</h2>
        <span class="fate-pill" style="--c:${w.color}">${w.fate}</span>
        <p class="blurb">${w.blurb}</p>
        <div class="m-grid">
          <div><label>Born</label><b>${born(w)}</b><small>${w.birthplace}</small></div>
          <div><label>Died</label><b>${w.died.slice(0, 4)}</b><small>${w.deathplace}, aged ${ageTxt(w, w.died)}</small></div>
          <div><label>Married</label><b>${w.wed.slice(0, 4)}</b><small>${fmt(w.wed)}</small></div>
          <div><label>Her age</label><b>${ageTxt(w, w.wed)}</b><small>on the wedding day</small></div>
          <div><label>Henry's age</label><b>${ageAt(H, w.wed)}</b><small>on the wedding day</small></div>
          <div><label>Lasted</label><b>${span(w.wed, w.end).split(',')[0]}</b><small>${w.endHow.toLowerCase()} ${fmt(w.end)}</small></div>
        </div>
        <div class="m-life">
          <div class="bar"></div>
          <div class="mar" style="left:${lp(frac(w.wed))}%" data-w="${Math.max(1, lp(frac(w.end)) - lp(frac(w.wed)))}"></div>
          <span class="tick" style="left:0;translate:0">${born(w)}</span>
          <span class="tick top" style="left:${lp(frac(w.wed))}%">Queen</span>
          <span class="tick" style="left:100%;translate:-100%">${w.died.slice(0, 4)}</span>
          ${w.kids.map((k, j) => { const at = k.born || k.at; return `<span class="kdot${k.fate === 'adult' || k.fate === 'unknown' ? '' : ' lost'}" style="left:${lp(frac(at))}%;--d:${.9 + j * .1}s" title="${k.name}, ${k.born ? fmt(k.born) : k.bornLabel}"></span>`; }).join('')}
        </div>
        ${w.story.map(p => `<p>${p}</p>`).join('')}
        <h3 class="m-sub">Children <small>${w.kids.length ? `${w.kids.length} recorded birth${w.kids.length > 1 ? 's and losses' : ''}` : ''}</small></h3>
        ${kidsHTML(w)}
        <div class="m-fact"><b>Did you know</b>${w.fact}</div>
        <div class="m-nav">
          <button class="btn" data-nav="-1">← ${W[(i + 5) % 6].name}</button>
          <button class="btn" data-nav="1">${W[(i + 1) % 6].name} →</button>
        </div>
      </div>`;
    card.scrollTop = 0;
    $('.m-close', card).addEventListener('click', closeModal);
    $$('[data-nav]', card).forEach(b => b.addEventListener('click', () => openWife(i + +b.dataset.nav)));
    if (!modal.classList.contains('open')) openModal();
    requestAnimationFrame(() => requestAnimationFrame(() => { const m = $('.mar', card); m.style.width = `${m.dataset.w}%`; }));
  }
  function lightbox(src, cap) {
    modalIdx = -1; card.className = 'modal-card lightbox'; card.style.setProperty('--c', '#d8ad55');
    card.innerHTML = `<button class="m-close" aria-label="Close">×</button><figure style="margin:0"><img src="${src}" alt=""><figcaption>${cap}</figcaption></figure>`;
    $('.m-close', card).addEventListener('click', closeModal);
    openModal();
  }
  modal.addEventListener('click', e => { if (e.target.hasAttribute('data-close')) closeModal(); });
  addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (modalIdx >= 0 && e.key === 'ArrowRight') openWife(modalIdx + 1);
    if (modalIdx >= 0 && e.key === 'ArrowLeft') openWife(modalIdx - 1);
  });
  window.openWife = openWife;

  $$('.reveal').forEach(watch);
})();
