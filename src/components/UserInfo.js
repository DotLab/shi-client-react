import React from 'react';

export default class UserInfo extends React.Component {
  render() {
    const {name, gender, nationality, born, death} = this.props;

    return <div>
      <div class="D(f) W(100%) Bgc(whitesmoke) P(10px) Mb(16px) Bdrs($bdrs-control) Ta(s)">
        <img class="Bdrs(100%) Mend(20px) D(b)" src="https://hellopoetry.s3.amazonaws.com/static/cache/0a/b7/0ab77aba9927aa7eaf46917bcab83c12.jpg" alt=""/>
        <div class="W(100%)">
          <span class="C(darkred)">{name}</span><br/>
          <span class="Fz(14px) C($gray-500)">{born} - {death}/{gender}/{nationality}</span>
        </div>
        <div class="As(c)">
          <button class="Bdc(t) Px(12px) Fz(12px) Mend(8px) Bgc(lightgray) Bgc(darkred):h C(white):h Bdrs($control)">Follow</button>

        </div>
      </div>
    </div>;
  }
}
