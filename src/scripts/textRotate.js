export function TextRotate(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.isDeleting = false;

  this.tick = () => {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    if (this.el.firstChild) {
      this.el.firstChild.textContent = this.txt;
    } else {
      const span = document.createElement("span");
      span.className = "wrap";
      span.textContent = this.txt;
      this.el.appendChild(span);
    }

    let delta = 180 - Math.random() * 50;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 600;
    }

    setTimeout(this.tick, delta);
  };

  this.tick();
}
