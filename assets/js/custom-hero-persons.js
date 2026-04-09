import { isReducedMotionPrefered } from './theme/utils/isReducedMotionPrefered';

window.osuny = window.osuny || {};

window.osuny.CustomHeroPersons = function (container) {
    this.intervalTimeout = 15000;
    this.container = container;
    this.list = container.querySelector('ul');
    this.persons = this.list.querySelectorAll('li');
    this.style = document.createElement('style');
    document.head.appendChild(this.style);
    this.resize();

    if (!isReducedMotionPrefered()) {
        this.start();
    }

    window.addEventListener('resize', this.resize.bind(this));
};

window.osuny.CustomHeroPersons.prototype.start = function () {
    let i = 0;
    for (i = 0; i < this.visibleQuantity; i += 1) {
        this.animatePosition(i);
    }
};

window.osuny.CustomHeroPersons.prototype.animatePosition = function (position) {
    const delay = Math.random() * this.intervalTimeout;

    // Shuffle visible positions
    this.swap(position, this.getRandomIndex());

    setTimeout(() => {
        this.fadeOut(position);
    }, delay)
};

window.osuny.CustomHeroPersons.prototype.resize = function () {
    const width = this.list.children[0].offsetWidth + 15;
    this.visibleQuantity = Math.ceil(this.container.offsetWidth / width) + 1;
    this.updateVisibility();
};

window.osuny.CustomHeroPersons.prototype.updateVisibility = function () {
    // Create style to hide offset persons
    this.style.textContent =`
        .custom-hero-persons ul li:nth-child(1n + ${this.visibleQuantity}) {
            display: none;
        }
    `;
};

window.osuny.CustomHeroPersons.prototype.swap = function (sourceIndex, targetIndex) {
    this.moveTo(sourceIndex, targetIndex);
    this.moveTo(targetIndex, sourceIndex);
};

window.osuny.CustomHeroPersons.prototype.moveTo = function (from, to) {
    this.list.insertBefore(this.list.children[from], this.list.children[to]);
};

window.osuny.CustomHeroPersons.prototype.fadeOut = function (index) {
    const person = this.list.children[index];
    person.classList.add('fade-out');
    person.addEventListener('transitionend', () => {
        person.classList.remove('fade-out');
        this.replace(index);
    }, { once: true });

    setTimeout(() => {
        this.fadeOut(index);
    }, this.intervalTimeout * (Math.random() * 0.1 + 0.9));
};

window.osuny.CustomHeroPersons.prototype.replace = function (index) {
    const targetIndex = this.getRandomIndex(),
        target = this.list.children[targetIndex];
    target.classList.add('fade-out');
    this.swap(index, targetIndex);
    setTimeout(() => {
        target.classList.remove('fade-out');
    }, 500);
};

window.osuny.CustomHeroPersons.prototype.getRandomIndex = function () {
    return Math.floor(Math.random() * (this.list.children.length - this.visibleQuantity)) +  this.visibleQuantity;
};

window.osuny.page.registerComponent({
    name: 'customHeroPerson',
    selector: '.custom-hero-persons',
    klass: window.osuny.CustomHeroPersons
});
