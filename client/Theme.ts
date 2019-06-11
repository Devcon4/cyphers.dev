
type color = {R: number, G: number, B: number};

export default class Theme {
  
  colors: color[] = [{R: 251, G: 240, B: 219},
    {R: 229, G: 218, B: 196},
    {R: 158, G: 171, B: 124},
    {R: 63, G: 127, B: 138},
    {R: 38, G: 45, B: 61}];

  constructor() {
    // Uncomment for color!
    // this.fetchTheme();
    setTimeout(() => this.setCSS());
  }
  async fetchTheme() {
    let data = await fetch('http://colormind.io/api/', {method: 'POST', body: '{"model":"default","input":[[249, 237, 220],"N","N","N","N"]}'});
    //{"result":[[64,63,78],[124,154,160],[248,245,247],[200,188,175],[125,119,88]]}

    let res = await data.json();

    this.colors = res.result.map(l => ({R:l[0], G: l[1], B: l[2] }));
    setTimeout(() => this.setCSS());

    console.log(this);
  }

  setCSS() {
      let format = (c: color) => `rgb(${c.R}, ${c.G}, ${c.B})`;
      document.body.style.setProperty('--LightShade', format(this.colors[0]));
      document.body.style.setProperty('--LightAccent', format(this.colors[1]));
      document.body.style.setProperty('--Main', format(this.colors[2]));
      document.body.style.setProperty('--DarkAccent', format(this.colors[3]));
      document.body.style.setProperty('--DarkShade', format(this.colors[4]));
    }
}
