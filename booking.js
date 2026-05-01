(function loadCalEmbed(C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

const config = window.BPI_CAL_CONFIG || {};
const events = config.events || {};
const defaultEventKey = events.lesson ? 'lesson' : Object.keys(events)[0];
const calInline = document.querySelector('#my-cal-inline');
const setupAlert = document.querySelector('[data-cal-setup-alert]');
const title = document.querySelector('[data-selected-title]');
const description = document.querySelector('[data-selected-description]');
const cards = document.querySelectorAll('[data-booking-card]');
const buttons = document.querySelectorAll('[data-cal-event]');
const instagramLinks = document.querySelectorAll('[data-instagram-link]');

const isPlaceholder = !config.username || config.username === 'your-cal-username';
const instagramIsPlaceholder = !config.instagramUrl || config.instagramUrl.includes('YOUR_INSTAGRAM_USERNAME');

instagramLinks.forEach((link) => {
  if (!instagramIsPlaceholder) {
    link.href = config.instagramUrl;
  }
});

function getCalLink(eventKey) {
  const eventConfig = events[eventKey];
  if (!eventConfig) return '';
  return `${config.username}/${eventConfig.slug}`;
}

function setActiveCard(eventKey) {
  cards.forEach((card) => card.classList.toggle('is-active', card.dataset.bookingCard === eventKey));
}

function renderBooking(eventKey = defaultEventKey) {
  const eventConfig = events[eventKey] || events[defaultEventKey];
  if (!eventConfig || !calInline) return;

  setActiveCard(eventKey);
  if (title) title.textContent = eventConfig.label;
  if (description) description.textContent = eventConfig.description;

  if (isPlaceholder) {
    if (setupAlert) setupAlert.hidden = false;
    calInline.innerHTML = `
      <div class="cal-placeholder">
        <p class="eyebrow">Setup Required</p>
        <h3>Cal.comのURLを設定すると、ここに予約カレンダーが表示されます。</h3>
        <p><code>booking-config.js</code> の <code>username</code> と <code>slug</code> を、あなたのCal.comイベントURLに合わせて変更してください。</p>
      </div>
    `;
    return;
  }

  if (setupAlert) setupAlert.hidden = true;
  calInline.innerHTML = '';

  Cal('init', {
    origin: config.origin || 'https://cal.com'
  });

  Cal('inline', {
    elementOrSelector: '#my-cal-inline',
    calLink: getCalLink(eventKey),
    config: {
      theme: config.theme || 'light',
      layout: config.layout || 'month_view',
      'ui.color-scheme': config.theme || 'light',
      iframeAttrs: {
        title: `BPI JAPAN ${eventConfig.label}`
      }
    }
  });

  Cal('ui', {
    theme: config.theme || 'light',
    styles: {
      branding: {
        brandColor: config.brandColor || '#c89b52'
      }
    }
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const eventKey = button.dataset.calEvent || defaultEventKey;
    renderBooking(eventKey);
    document.querySelector('#cal-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

renderBooking(defaultEventKey);
