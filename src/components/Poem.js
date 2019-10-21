import React from 'react';
import PoemInfo from './PoemInfo';
import {Link} from 'react-router-dom';

export default class Poem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
    this.expand=this.expand.bind(this);
  }

  expand() {
    this.setState({isExpanded: true});
  }

  render() {
    const {hotness, author, title, body, preview, date, shouldShowEditButton, visibility} = this.props;
    const {isExpanded} = this.state;

    return <div class="My(50px)">
      <div class="C(lightgrey) Fz(14dpx)">
        <i class="fas fa-fire"></i> {hotness}°
      </div>
      <div>
        {visibility &&
        <span class="Bgc(lightgray) D(ib) Px(4px) Py(0) Fz(10px) Bdrs(2px) Mend(10px)">{visibility}</span>}

        {shouldShowEditButton &&
         <button class="Bgc(black) C(white) Py(0) Bdw(0) Fz(10px) Bdrs(2px)"><Link class="Bgc(black) C(white) C(white):h"to="/edit">edit</Link></button>}
      </div>
      <div>
        {author} • {date}
      </div>
      <h3 class="Fz(24px)">
        {title}
      </h3>
      <p class="Whs(pw)">
        {!isExpanded ? (preview || body) : body}
      </p>
      {!isExpanded &&
         <span class="Cur(p) C(skyblue) Td(u):h" onClick={this.expand}>Continue reading...</span>}
      <PoemInfo author={author} likes="4" views="80" comments="1"/>
    </div>;
  }
}
