import React, { Component } from "react";

import "./MagicLine.css";



class MagicLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      magicLineStyle: {},
      activeItem: null
    };

    this.magicLine = React.createRef();
    this.firstListItem = React.createRef();

    this.updateMagicLine = this.updateMagicLine.bind(this);
  }

  componentDidMount() {
    this.setState({
      magicLineStyle: {
        left: this.firstListItem.current.offsetLeft,
        width: this.firstListItem.current.offsetWidth
      },
      activeItem: this.firstListItem.current.index
    });
  }

  updateMagicLine(e) {
    e.persist();

    const anchor = e.target;
    const activeItem = this.state.activeItem;
    const nextItem = anchor.parentNode.getAttribute("index");
    const direction = activeItem > nextItem ? "left" : "right";
    const magicLine = this.magicLine.current;
    const longerWidth =
      direction === "left"
        ? magicLine.offsetLeft - anchor.offsetLeft + magicLine.offsetWidth
        : anchor.offsetLeft - magicLine.offsetLeft + anchor.offsetWidth;
    const newScale = longerWidth / magicLine.offsetWidth;

    // Make magic line reach out to
    // the clicked anchor via horizontal
    // scaling
    this.setState(state => {
      return {
        magicLineStyle: {
          ...state.magicLineStyle,
          transform: "scaleX(" + newScale + ")",
          transformOrigin: direction === "left" ? "right" : "left"
        },
        activeItem: anchor.parentNode.getAttribute("index")
      };
    });

    // Re-position magic line, hange direction
    // in which scaling down will happen,
    // scale down to 1
    setTimeout(() => {
      this.setState(state => {
        return {
          magicLineStyle: {
            ...state.magicLineStyle,
            transform: "scaleX(1)",
            transformOrigin: direction,
            left: direction === "left" ? anchor.offsetLeft : "initial",
            right:
              direction === "right"
                ? window.innerWidth - (anchor.offsetLeft + anchor.offsetWidth)
                : "initial"
          }
        };
      });
    }, 300);
  }

  render() {
    const items = ["Item 1", "Item 2", "Item 3"];

    return (
      <div className="magic-navbar">
        <ul>
          {items.map((item, index) => {
            return (
              <li
                key={index}
                index={index}
                onClick={this.updateMagicLine}
                ref={index === 0 ? this.firstListItem : ""}
              >
                <a href="#">{item}</a>
              </li>
            );
          })}
        </ul>
        <div
          ref={this.magicLine}
          className="magic-line"
          style={this.state.magicLineStyle}
        />
      </div>
    );
  }
}

export default MagicLine;
