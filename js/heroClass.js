class Hero {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.icon = (name.split(" ")[0] + ".png").toLowerCase();
    this.createNode();
  }

  setDefaultPosition(pos) {
    gsap.set(this.$node, { x: 1665, y: 68 + 63 * pos });
  }

  createNode = function () {
    const _this = this;
    const heroTemplate = document
      .getElementById("hero-template")
      .innerHTML.replace(/%(\w*)%/g, function (m, key) {
        return _this.hasOwnProperty(key) ? _this[key] : "";
      });

    this.$node = $(heroTemplate).appendTo($(".remHerosWrapper"));
  };
}
