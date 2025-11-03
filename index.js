const icons = [
    'eraser', 'stopwatch', 'verified', 'delete-left', 'hourglass', 'truck', 'wrench', 'microphone', 'megaphone',
    'arrow-right-arrow-left', 'bitcoin', 'file-edit', 'language', 'file-export', 'file-import', 'file-word',
    'gift', 'cart-plus', 'thumbs-down-fill', 'thumbs-up-fill', 'arrows-alt', 'calculator', 'sort-alt-slash',
    'arrows-h', 'arrows-v', 'pound', 'prime', 'chart-pie', 'reddit', 'code', 'sync', 'shopping-bag', 'server',
    'database', 'hashtag', 'bookmark-fill', 'filter-fill', 'heart-fill', 'flag-fill', 'circle', 'circle-fill',
    'bolt', 'history', 'box', 'at', 'arrow-up-right', 'arrow-up-left', 'arrow-down-left', 'arrow-down-right',
    'telegram', 'stop-circle', 'stop', 'whatsapp', 'building', 'qrcode', 'car', 'instagram', 'linkedin', 'send',
    'slack', 'sun', 'moon', 'vimeo', 'youtube', 'flag', 'wallet', 'map', 'link', 'credit-card', 'discord',
    'percentage', 'euro', 'book', 'shield', 'paypal', 'amazon', 'phone', 'filter-slash', 'facebook', 'github',
    'twitter', 'step-backward-alt', 'step-forward-alt', 'forward', 'backward', 'fast-backward', 'fast-forward',
    'pause', 'play', 'compass', 'id-card', 'ticket', 'file-o', 'reply', 'directions-alt', 'directions',
    'thumbs-up', 'thumbs-down', 'sort-numeric-down-alt', 'sort-numeric-up-alt', 'sort-alpha-down-alt',
    'sort-alpha-up-alt', 'sort-numeric-down', 'sort-numeric-up', 'sort-alpha-down', 'sort-alpha-up', 'sort-alt',
    'sort-amount-up', 'sort-amount-down', 'sort-amount-down-alt', 'sort-amount-up-alt', 'palette', 'undo',
    'desktop', 'sliders-v', 'sliders-h', 'search-plus', 'search-minus', 'file-excel', 'file-pdf', 'check-square',
    'chart-line', 'user-edit', 'exclamation-circle', 'android', 'google', 'apple', 'microsoft', 'heart', 'mobile',
    'tablet', 'key', 'shopping-cart', 'comments', 'comment', 'briefcase', 'bell', 'paperclip', 'share-alt',
    'envelope', 'volume-down', 'volume-up', 'volume-off', 'eject', 'money-bill', 'images', 'image', 'sign-in',
    'sign-out', 'wifi', 'sitemap', 'chart-bar', 'camera', 'dollar', 'lock-open', 'table', 'map-marker', 'list',
    'eye-slash', 'eye', 'folder-open', 'folder', 'video', 'inbox', 'lock', 'unlock', 'tags', 'tag', 'power-off',
    'save', 'question-circle', 'question', 'copy', 'file', 'clone', 'calendar-times', 'calendar-minus',
    'calendar-plus', 'ellipsis-v', 'ellipsis-h', 'bookmark', 'globe', 'replay', 'filter', 'print', 'align-right',
    'align-left', 'align-center', 'align-justify', 'cog', 'cloud-download', 'cloud-upload', 'cloud', 'pencil',
    'users', 'clock', 'user-minus', 'user-plus', 'trash', 'external-link', 'window-maximize', 'window-minimize',
    'refresh', 'user', 'exclamation-triangle', 'calendar', 'chevron-circle-left', 'chevron-circle-down',
    'chevron-circle-right', 'chevron-circle-up', 'angle-double-down', 'angle-double-left', 'angle-double-right',
    'angle-double-up', 'angle-down', 'angle-left', 'angle-right', 'angle-up', 'upload', 'download', 'ban',
    'star-fill', 'star', 'chevron-left', 'chevron-right', 'chevron-down', 'chevron-up', 'caret-left', 'caret-right',
    'caret-down', 'caret-up', 'search', 'check', 'check-circle', 'times', 'times-circle', 'plus', 'plus-circle',
    'minus', 'minus-circle', 'circle-on', 'circle-off', 'sort-down', 'sort-up', 'sort', 'step-backward',
    'step-forward', 'th-large', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'bars', 'arrow-circle-down',
    'arrow-circle-left', 'arrow-circle-right', 'arrow-circle-up', 'info', 'info-circle', 'home', 'spinner'
];

const iconGrid = document.getElementById('iconGrid');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.querySelectorAll('.filter-tab');
const noResults = document.getElementById('noResults');
const copiedNotification = document.getElementById('copiedNotification');
const themeToggle = document.getElementById('themeToggle');
const themeOptions = document.querySelectorAll('.theme-option');

let currentFilter = 'all';

// Theme Toggle
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        document.body.setAttribute('data-theme', theme);
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        localStorage.setItem('theme', theme);
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
themeOptions.forEach(opt => {
    if (opt.dataset.theme === savedTheme) {
        opt.classList.add('active');
    } else {
        opt.classList.remove('active');
    }
});

function renderIcons(filter = '') {
    const filtered = icons.filter(icon =>
        icon.toLowerCase().includes(filter.toLowerCase()) &&
        matchesCategory(icon, currentFilter)
    );

    iconGrid.innerHTML = '';

    if (filtered.length === 0) {
        iconGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    iconGrid.style.display = 'grid';
    noResults.style.display = 'none';

    filtered.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'icon-card';
        card.style.animationDelay = `${index * 0.02}s`;
        card.innerHTML = `
                    <div class="icon-display">
                        <i class="pi pi-${icon}"></i>
                    </div>
                    <div class="icon-name">pi-${icon}</div>
                `;
        card.addEventListener('click', () => copyToClipboard(`pi-${icon}`));
        iconGrid.appendChild(card);
    });
}

function matchesCategory(icon, category) {
    if (category === 'all') return true;

    const categories = {
        arrow: ['arrow', 'chevron', 'caret', 'angle'],
        social: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'github', 'reddit', 'discord', 'slack', 'telegram', 'whatsapp'],
        file: ['file', 'folder', 'document'],
        ui: ['home', 'search', 'menu', 'bars', 'cog', 'user', 'bell', 'star', 'heart', 'bookmark'],
        media: ['play', 'pause', 'stop', 'video', 'image', 'camera', 'volume']
    };

    return categories[category]?.some(term => icon.includes(term)) || false;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        copiedNotification.classList.add('show');
        setTimeout(() => {
            copiedNotification.classList.remove('show');
        }, 2000);
    });
}

searchInput.addEventListener('input', (e) => {
    renderIcons(e.target.value);
});

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        renderIcons(searchInput.value);
    });
});

renderIcons();