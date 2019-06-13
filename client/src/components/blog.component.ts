import { LitElement, html, customElement } from 'lit-element';

import './banner-title.component';
import './paragraph.component';
import './sub-heading.component';
import './code-block.component';

@customElement('dev-blog')
export default class BlogComponent extends LitElement {

  componentSnippet = `
  import {
    LitElement,
    customElement,
    property,
    html
  } from 'lit-element';

  @customElement('dev-paragraph')
  export default class ParagraphComponent extends LitElement {
      @property() content: string;
  
      render() {
          return html\`<p>\${this.content}</p>\`;
      }
  }`;

  styleSnippet = `
  .background {
    --line-swaps: '150,1850';
    background-image: paint(linePattern);
  }
  `;

  render() {
    return html`
      <style>
      .wrapper {
        height: 100%;
      }

      .spacer {
        content: '&nbsp';
        margin-bottom: 150px;
      }

      .background {
        padding-top:5vh;
      }

      .LightShade {background-color: var(--LightShade); }
      .LightAccent {background-color: var(--LightAccent); }
      .Main {background-color: var(--Main); }
      .DarkAccent {background-color: var(--DarkAccent); }
      .DarkShade {background-color: var(--DarkShade); }

      .styling {
      }

      </style>
      <div class="background">
        <div class="wrapper">
          <dev-banner-title class="banner" text="About this blog"></dev-banner-title>
          <div class="spacer"></div>
          <dev-sub-heading title="Introduction"></dev-sub-heading>
          <dev-paragraph content="This site was created as part of a coding challenge to build dead simple blog in two weeks. Everyone always says they need to make a blog and start posting about what they are learning but never get around to it or they blow the scope until it will never actually get done. By time-boxing to two weeks and having other people involved you're more likely to actually build something that you can later work off of."></dev-paragraph>
          <dev-sub-heading title="The stack"></dev-sub-heading>
          <dev-paragraph content="lately I have been playing around with a little library called Lit-Element. It's small and unknown but is make by the Polymer team at Google. Basically it is a Web Component wrapper built around Lit-Html, also created by the Polymer team. "></dev-paragraph>
          <dev-paragraph content="So in most modern frameworks you will have a VirtualDOM. If your unfamiliar with VDOM the basic idea is that instead of directly changing the DOM you change a Javascript representation of the DOM. Then you find the difference between your fake DOM and the real DOM, then only change the parts of the real DOM that are different."></dev-paragraph>
          <dev-paragraph content="Lit-Html doesn't have that, instead it uses a fancy Javascript feature called Tagged Template Literals! 🙌 Besides ' and &quot; Javascript has a third string syntax using ticks ( \` ). With these strings you can embed content like \`My name is \${this.name}\`. pretty cool huh, but even cooler is that you can "tag" this string literal with a Javascript function. That is exactly what Lit-Html does to track changes to the DOM. By watching ever set of \${} it knows when the expression changes to update the DOM around it, without diffing and other stuff."></dev-paragraph>
          <dev-paragraph content="Lit-Element builds ontop of this idea by adding some fancy decorators to easily create Web Components powered by Lit-Html rendering. Here is an example component called "dev-paragraph" that has an input attribute called "content"."></dev-paragraph>
          <dev-code-block code="${this.componentSnippet}" language="${'typescript'}"></dev-code-block>
          <dev-paragraph content="🎉 What a perfect small component! 🎉"></dev-paragraph>
          <dev-paragraph content="Of course no app is complete until you have Typescript. It's Javascript but better. It's flexible yet helps you know what a function is suppose to do/return. I always use it when I can."></dev-paragraph>
          <dev-paragraph content="To bundle and compile my Typescript/Lit-Element I used the awesome zero-config bundler Parcel. Basically it's smart and opinionated webpack that tries to take your code and figure out how you want to build it, perfect for small stuff where you don't care about the nitty gritty of configuring webpack."></dev-paragraph>
          <dev-paragraph content="Lastly I used Prism.js to render code block highlighting. The tool is good but it's old so it is a pain get bundled and added to your project properly. I used a wrapper called Reprism so I have an actual module to import instead of loose Javascript files."></dev-paragraph>
          <dev-sub-heading title="Styling" class="styling"></dev-sub-heading>
          <dev-paragraph content="No pig is complete without some lipstick and this one has plenty. It has shadows, colors and even fonts! 🙌 I like to use CSS variables wherever I can, all of the colors (except for prism) are hooked to five theme colors (LightShade, LightAccent, Main, DarkAccent, DarkShade). Besides being clean this lets me dynamically change the theming of the site! This is normally a pain, most of the time you would using a css post-proccessor like SASS where you can't dynamically change variables. Even if you aren't you would have to dynamically change colors with gross Javascript. Now with CSS variables I can do whatever I want!"></dev-paragraph>
          <dev-paragraph content="I looked into getting a random color theme from colormind.io but I would need to do some caching so i'm not spamming their api and so I don't have startup delay/flicker, maybe I'll come back to it in the future."></dev-paragraph>
          <dev-sub-heading title="Magic"></dev-sub-heading>
          <dev-paragraph content="The last peice of the pie is that background, just look at those sexy lines! There is some special sauce used to make that background, if you look you may have seen this line."></dev-paragraph>
          <dev-code-block code="${this.styleSnippet}" language="${'css'}"></dev-code-block>
          <dev-paragraph content="There is a whole new suite of API's coming out under the name Houdini (ishoudinireadyyet.com). The goal of these API's is to let you hook into the browsers lifecycle. The main one I am using is the CSS Paint Api. It is the perfect blend of drawing on a canvas but still using DOM elements. I will probably go more indepth into this in the future but basically I am telling the browser how I want it to draw the background div, pretty cool huh."></dev-paragraph>
          <dev-sub-heading title="Conclusion"></dev-sub-heading>
          <dev-paragraph content="That is basically everything I used. The app is hosted on Digital Ocean but I am in the middle of reworking that and will have another post on it. It's super fun to make these small pretty sites and do these code challenges. I plan on doing more of these in the future, any ideas/feedback would be great!"></dev-paragraph>
          <dev-paragraph content="-Devyn"></dev-paragraph>
        </div>
      </div>`;
  }
}
