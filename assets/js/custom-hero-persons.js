window.osuny = window.osuny || {};

window.osuny.CustomHeroPersons = function (container) {
    this.list = container.querySelector('ul');
    this.persons = this.list.querySelectorAll('li');
    this.shuffle();
};

window.osuny.CustomHeroPersons.prototype.shuffle = function () {
    this.persons.forEach( person => {
        const randomPosition = Math.round((this.persons.length - 1) * Math.random());
        this.list.insertBefore(this.persons[randomPosition], person);
    });
};

window.osuny.page.registerComponent({
    name: 'customHeroPerson',
    selector: '.custom-hero-persons',
    klass: window.osuny.CustomHeroPersons
});
