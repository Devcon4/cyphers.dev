
type color = {R: number, G: number, B: number};

export default class Theme {
  
  colors: color[] = [];

  constructor() {
    this.fetchTheme();
  }
  async fetchTheme() {
    let data = await fetch('http://colormind.io/api/', {method: 'POST', body: '{"model":"default","input":["N","N",[249, 237, 220],"N","N"]}'});
    //{"result":[[64,63,78],[124,154,160],[248,245,247],[200,188,175],[125,119,88]]}

    let res = await data.json();

    this.colors = res.result.map(l => ({R:l[0], G: l[1], B: l[2] }));
    this.setCSS();

    console.log(this);
  }

  setCSS() {
      let format = (c: color) => `rgb(${c.R}, ${c.G}, ${c.B})`;
      document.body.style.setProperty('--theme1', format(this.colors[0]));
      document.body.style.setProperty('--theme2', format(this.colors[1]));
      document.body.style.setProperty('--theme3', format(this.colors[2]));
      document.body.style.setProperty('--theme4', format(this.colors[3]));
      document.body.style.setProperty('--theme5', format(this.colors[4]));
    }
}
