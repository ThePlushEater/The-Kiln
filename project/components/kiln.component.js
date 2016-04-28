import React from 'react';
import ReactDOM from 'react-dom';

import styles from './kiln.component.css';

import 'react-colors-picker/assets/index.css';
import {Panel as ColorPickerPanel} from 'react-colors-picker';

var KilnComponent = React.createClass({
  getInitialState: function() {
    return {
      item0:  {
        id: 0,
        name: "Brick1",
        preset: 0,
        hval: 5,
        sval: 79,
        bval: 16,
        color: "#210101",
        image: "",
        dsize: 0,
        ddensity: 0,
        csize: 0,
        cnoise: 0,
        status: 0,
        tag: "QUEUE 1"
      },
      item1:  {
        id: 1,
        name: "Brick2",
        preset: 0,
        hval: 5,
        sval: 79,
        bval: 16,
        color: "#210101",
        image: "",
        dsize: 0,
        ddensity: 0,
        csize: 0,
        cnoise: 0,
        status: 0,
        tag: "QUEUE 2"
      },
      item2:  {
        id: 2,
        name: "Brick3",
        preset: 0,
        hval: 5,
        sval: 79,
        bval: 16,
        color: "#210101",
        image: "",
        dsize: 0,
        ddensity: 0,
        csize: 0,
        cnoise: 0,
        status: 0,
        tag: "QUEUE 3"
      },
      selected: 0
    };
  },

  componentDidMount: function() {
    let self = this;
    $("#dragSizeVariation").slider({
      min: 1,
      change: function(event, ui) {
        if (self.state.selected == 0) {
          self.state.item0.dsize = ui.value;
        } else if (self.state.selected == 1) {
          self.state.item1.dsize = ui.value;
        } else if (self.state.selected == 2) {
          self.state.item2.dsize = ui.value;
        } else if (self.state.selected == 3) {
          self.state.item3.dsize = ui.value;
        } else if (self.state.selected == 4) {
          self.state.item4.dsize = ui.value;
        }
      }
    });
    $("#dragDesityVariation").slider({
      min: 1,
      change: function(event, ui) {
        if (self.state.selected == 0) {
          self.state.item0.ddensity = ui.value;
        } else if (self.state.selected == 1) {
          self.state.item1.ddensity = ui.value;
        } else if (self.state.selected == 2) {
          self.state.item2.ddensity = ui.value;
        } else if (self.state.selected == 3) {
          self.state.item3.ddensity = ui.value;
        } else if (self.state.selected == 4) {
          self.state.item4.ddensity = ui.value;
        }
      }
    });
    $("#crackSizeVariation").slider({
      min: 1,
      change: function(event, ui) {
        if (self.state.selected == 0) {
          self.state.item0.csize = ui.value;
        } else if (self.state.selected == 1) {
          self.state.item1.csize = ui.value;
        } else if (self.state.selected == 2) {
          self.state.item2.csize = ui.value;
        } else if (self.state.selected == 3) {
          self.state.item3.csize = ui.value;
        } else if (self.state.selected == 4) {
          self.state.item4.csize = ui.value;
        }
      }
    });
    $("#crackNoiseVariation").slider({
      min: 1,
      change: function(event, ui) {
        if (self.state.selected == 0) {
          self.state.item0.cnoise = ui.value;
        } else if (self.state.selected == 1) {
          self.state.item1.cnoise = ui.value;
        } else if (self.state.selected == 2) {
          self.state.item2.cnoise = ui.value;
        } else if (self.state.selected == 3) {
          self.state.item3.cnoise = ui.value;
        } else if (self.state.selected == 4) {
          self.state.item4.cnoise = ui.value;
        }
      }
    });

    if (self.props.generic == 1) {
      self.state.item0.image = "/static/images/GeometryImages-04.png";
      self.state.item1.image = "/static/images/GeometryImages-04.png";
      self.state.item2.image = "/static/images/GeometryImages-04.png";
    } else if (self.props.generic == 2) {
      self.state.item0.image = "/static/images/GeometryImages-05.png";
      self.state.item1.image = "/static/images/GeometryImages-05.png";
      self.state.item2.image = "/static/images/GeometryImages-05.png";
    } else if (self.props.generic == 3) {
      self.state.item0.image = "/static/images/GeometryImages-06.png";
      self.state.item1.image = "/static/images/GeometryImages-06.png";
      self.state.item2.image = "/static/images/GeometryImages-06.png";
    }
    self.setState({generic: self.props.generic, selected: 0});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({generic: nextProps.generic});
    /*
    if (nextProps.task != null && nextProps.task.length == 1) {
      this.setState({task: nextProps.task});
    }
    */
  },

  onChangeName: function(item, event) {
    item.name = event.target.value;
    this.setState({item: item});
  },

  onChangePreset: function(item, event) {
    item.preset = event.target.value;
    this.setState({item: item});
  },

  onSelect: function(id: number) {
    this.setState({selected: id});
  },

  onBake: function(item) {
    item.status = 1;
    console.log(item);
    let self = this;
    item.tag = "RENDERING";
    if (item.id == 0) {
      self.state.item0.image = "/static/images/loading.gif";
    } else if (item.id == 1) {
      self.state.item1.image = "/static/images/loading.gif";
    } else if (item.id == 2) {
      self.state.item2.image = "/static/images/loading.gif";
    }
    self.setState({selected: self.state.selected});
    $.ajax({
      url: "/task/" + item.id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        id: item.id,
        name: item.name,
        hval: item.hval,
        sval: item.sval,
        bval: item.bval,
        dsize: item.dsize,
        ddensity: item.ddensity,
        csize: item.csize,
        cnoise: item.cnoise,
        generic: self.state.generic,
      }),
      dataType: "json",
      success: function(data) {
        item.image = data.filename;
        item.status = 0;
        if (item.id == 0) {
          self.state.item0.tag = "QUEUE 1";
        } else if (item.id == 1) {
          self.state.item1.tag = "QUEUE 2";
        } else if (item.id == 2) {
          self.state.item2.tag = "QUEUE 3";
        }
        self.setState({selected: self.state.selected});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/tasks", status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    let self = this;
    var time = new Date().getTime();
    if (self.state.selected == 0) {
      $("#dragSizeVariation").slider('value', self.state.item0.dsize);
      $("#dragDesityVariation").slider('value', self.state.item0.ddensity);
      $("#crackSizeVariation").slider('value', self.state.item0.csize);
      $("#crackNoiseVariation").slider('value', self.state.item0.cnoise);
      if (self.state.item0.status == 0) {
        return (
          <div className={styles.wrapper}>
            <div className={styles.leftPanel}>
              <div className={styles.inputBrickName}>
                Rendering Queue 1 Setup
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Base Color:
                </div>
                <div>
                  <ColorPickerPanel color={self.state.item0.color} onChange={(obj)=> {
                    self.state.item0.color = obj.color;
                    self.state.item0.hval = parseFloat(obj.hsv.h);
                    self.state.item0.sval = parseFloat(obj.hsv.s);
                    self.state.item0.bval = parseFloat(obj.hsv.v);
                  }} mode="HSL"/>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Size Variation:
                </div>
                <div id="dragSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Density Variation:
                </div>
                <div id="dragDesityVariation"></div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Size Variation:
                </div>
                <div id="crackSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Noise Variation:
                </div>
                <div id="crackNoiseVariation"></div>
              </div>
              <hr className={styles.hr} />
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.slider2}>
                <div className={styles.inputBrickName}>
                  Rendering Queue 1 Result
                </div>
              </div>
              <div className={styles.resultPanel}>
                <div className={styles.thumbnail_image} >
                  <img src={self.state.item0.image + "?ver=" + time}/>
                </div>
                <div className={styles.button} onClick={()=> {
                  if (self.state.item0.status == 0) {
                    self.onBake(self.state.item0);
                  }
                }}>
                  <div>
                    fire me up
                  </div>
                </div>
              </div>
              <div className={styles.queuePanel}>
                <div id="queue1" className={styles.selected} onClick={()=> {self.onSelect(0);}}>
                  {self.state.item0.tag}
                </div>
                <div id="queue2" onClick={()=> {self.onSelect(1);}}>
                  {self.state.item1.tag}
                </div>
                <div id="queue3" onClick={()=> {self.onSelect(2);}}>
                  {self.state.item2.tag}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.wrapper}>
            <div className={styles.leftPanel}>
              <div className={styles.inputBrickName}>
                Rendering Queue 1 Setup
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Base Color:
                </div>
                <div>
                  <ColorPickerPanel color={self.state.item0.color} onChange={(obj)=> {
                    self.state.item0.color = obj.color;
                    self.state.item0.hval = parseFloat(obj.hsv.h);
                    self.state.item0.sval = parseFloat(obj.hsv.s);
                    self.state.item0.bval = parseFloat(obj.hsv.v);
                  }} mode="HSL"/>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Size Variation:
                </div>
                <div id="dragSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Density Variation:
                </div>
                <div id="dragDesityVariation"></div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Size Variation:
                </div>
                <div id="crackSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Noise Variation:
                </div>
                <div id="crackNoiseVariation"></div>
              </div>
              <hr className={styles.hr} />
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.slider2}>
                <div className={styles.inputBrickName}>
                  Rendering Queue 1 Result
                </div>
              </div>
              <div className={styles.resultPanel}>
                <div className={styles.thumbnail_image} >
                  <img src={self.state.item0.image + "?ver=" + time}/>
                </div>
                <div className={styles.button} onClick={()=> {
                  if (self.state.item0.status == 0) {
                    self.onBake(self.state.item0);
                  }
                }}>
                  <div>
                    Firing...
                  </div>
                </div>
              </div>
              <div className={styles.queuePanel}>
                <div id="queue1" className={styles.selected} onClick={()=> {self.onSelect(0);}}>
                  {self.state.item0.tag}
                </div>
                <div id="queue2" onClick={()=> {self.onSelect(1);}}>
                  {self.state.item1.tag}
                </div>
                <div id="queue3" onClick={()=> {self.onSelect(2);}}>
                  {self.state.item2.tag}
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else if (self.state.selected == 1) {
      $("#dragSizeVariation").slider('value', self.state.item1.dsize);
      $("#dragDesityVariation").slider('value', self.state.item1.ddensity);
      $("#crackSizeVariation").slider('value', self.state.item1.csize);
      $("#crackNoiseVariation").slider('value', self.state.item1.cnoise);
      if (self.state.item1.status == 0) {
        return (
          <div className={styles.wrapper}>
            <div className={styles.leftPanel}>
              <div className={styles.inputBrickName}>
                Rendering Queue 2 Setup
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Base Color:
                </div>
                <div>
                  <ColorPickerPanel color={self.state.item1.color} onChange={(obj)=> {
                    self.state.item1.color = obj.color;
                    self.state.item1.hval = parseFloat(obj.hsv.h);
                    self.state.item1.sval = parseFloat(obj.hsv.s);
                    self.state.item1.bval = parseFloat(obj.hsv.v);
                  }} mode="HSL"/>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Size Variation:
                </div>
                <div id="dragSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Density Variation:
                </div>
                <div id="dragDesityVariation"></div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Size Variation:
                </div>
                <div id="crackSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Noise Variation:
                </div>
                <div id="crackNoiseVariation"></div>
              </div>
              <hr className={styles.hr} />
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.slider2}>
                <div className={styles.inputBrickName}>
                  Rendering Queue 2 Result
                </div>
              </div>
              <div className={styles.resultPanel}>
                <div className={styles.thumbnail_image} >
                  <img src={self.state.item1.image + "?ver=" + time}/>
                </div>
                <div className={styles.button} onClick={()=> {
                  if (self.state.item1.status == 0) {
                    self.onBake(self.state.item1);
                  }
                }}>
                  <div>
                    fire me up
                  </div>
                </div>
              </div>
              <div className={styles.queuePanel}>
                <div id="queue1" onClick={()=> {self.onSelect(0);}}>
                  {self.state.item0.tag}
                </div>
                <div id="queue2" className={styles.selected} onClick={()=> {self.onSelect(1);}}>
                  {self.state.item1.tag}
                </div>
                <div id="queue3" onClick={()=> {self.onSelect(2);}}>
                  {self.state.item2.tag}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.wrapper}>
            <div className={styles.leftPanel}>
              <div className={styles.inputBrickName}>
                Rendering Queue 2 Setup
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Base Color:
                </div>
                <div>
                  <ColorPickerPanel color={self.state.item1.color} onChange={(obj)=> {
                    self.state.item1.color = obj.color;
                    self.state.item1.hval = parseFloat(obj.hsv.h);
                    self.state.item1.sval = parseFloat(obj.hsv.s);
                    self.state.item1.bval = parseFloat(obj.hsv.v);
                  }} mode="HSL"/>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Size Variation:
                </div>
                <div id="dragSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Density Variation:
                </div>
                <div id="dragDesityVariation"></div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Size Variation:
                </div>
                <div id="crackSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Noise Variation:
                </div>
                <div id="crackNoiseVariation"></div>
              </div>
              <hr className={styles.hr} />
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.slider2}>
                <div className={styles.inputBrickName}>
                  Rendering Queue 2 Result
                </div>
              </div>
              <div className={styles.resultPanel}>
                <div className={styles.thumbnail_image} >
                  <img src={self.state.item1.image + "?ver=" + time}/>
                </div>
                <div className={styles.button} onClick={()=> {
                  if (self.state.item1.status == 0) {
                    self.onBake(self.state.item1);
                  }
                }}>
                  <div>
                    Firing...
                  </div>
                </div>
              </div>
              <div className={styles.queuePanel}>
                <div id="queue1" onClick={()=> {self.onSelect(0);}}>
                  {self.state.item0.tag}
                </div>
                <div id="queue2" className={styles.selected} onClick={()=> {self.onSelect(1);}}>
                  {self.state.item1.tag}
                </div>
                <div id="queue3" onClick={()=> {self.onSelect(2);}}>
                  {self.state.item2.tag}
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else if (self.state.selected == 2) {
      $("#dragSizeVariation").slider('value', self.state.item2.dsize);
      $("#dragDesityVariation").slider('value', self.state.item2.ddensity);
      $("#crackSizeVariation").slider('value', self.state.item2.csize);
      $("#crackNoiseVariation").slider('value', self.state.item2.cnoise);
      if (self.state.item2.status == 0) {
        return (
          <div className={styles.wrapper}>
            <div className={styles.leftPanel}>
              <div className={styles.inputBrickName}>
                Rendering Queue 3 Setup
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Base Color:
                </div>
                <div>
                  <ColorPickerPanel color={self.state.item1.color} onChange={(obj)=> {
                    self.state.item2.color = obj.color;
                    self.state.item2.hval = parseFloat(obj.hsv.h);
                    self.state.item2.sval = parseFloat(obj.hsv.s);
                    self.state.item2.bval = parseFloat(obj.hsv.v);
                  }} mode="HSL"/>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Size Variation:
                </div>
                <div id="dragSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Density Variation:
                </div>
                <div id="dragDesityVariation"></div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Size Variation:
                </div>
                <div id="crackSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Noise Variation:
                </div>
                <div id="crackNoiseVariation"></div>
              </div>
              <hr className={styles.hr} />
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.slider2}>
                <div className={styles.inputBrickName}>
                  Rendering Queue 3 Result
                </div>
              </div>
              <div className={styles.resultPanel}>
                <div className={styles.thumbnail_image} >
                  <img src={self.state.item2.image + "?ver=" + time}/>
                </div>
                <div className={styles.button} onClick={()=> {
                  if (self.state.item2.status == 0) {
                    self.onBake(self.state.item2);
                  }
                }}>
                  <div>
                    fire me up
                  </div>
                </div>
              </div>
              <div className={styles.queuePanel}>
                <div id="queue1" onClick={()=> {self.onSelect(0);}}>
                  {self.state.item0.tag}
                </div>
                <div id="queue2" onClick={()=> {self.onSelect(1);}}>
                  {self.state.item1.tag}
                </div>
                <div id="queue3" className={styles.selected} onClick={()=> {self.onSelect(2);}}>
                  {self.state.item2.tag}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.wrapper}>
            <div className={styles.leftPanel}>
              <div className={styles.inputBrickName}>
                Rendering Queue 3 Setup
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Base Color:
                </div>
                <div>
                  <ColorPickerPanel color={self.state.item1.color} onChange={(obj)=> {
                    self.state.item2.color = obj.color;
                    self.state.item2.hval = parseFloat(obj.hsv.h);
                    self.state.item2.sval = parseFloat(obj.hsv.s);
                    self.state.item2.bval = parseFloat(obj.hsv.v);
                  }} mode="HSL"/>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Size Variation:
                </div>
                <div id="dragSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Drag Mark Density Variation:
                </div>
                <div id="dragDesityVariation"></div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Size Variation:
                </div>
                <div id="crackSizeVariation"></div>
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderText}>
                  Crack Noise Variation:
                </div>
                <div id="crackNoiseVariation"></div>
              </div>
              <hr className={styles.hr} />
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.slider2}>
                <div className={styles.inputBrickName}>
                  Rendering Queue 2 Result
                </div>
              </div>
              <div className={styles.resultPanel}>
                <div className={styles.thumbnail_image} >
                  <img src={self.state.item2.image + "?ver=" + time}/>
                </div>
                <div className={styles.button} onClick={()=> {
                  if (self.state.item2.status == 0) {
                    self.onBake(self.state.item2);
                  }
                }}>
                  <div>
                    Firing...
                  </div>
                </div>
              </div>
              <div className={styles.queuePanel}>
                <div id="queue1" onClick={()=> {self.onSelect(0);}}>
                  {self.state.item0.tag}
                </div>
                <div id="queue2" onClick={()=> {self.onSelect(1);}}>
                  {self.state.item1.tag}
                </div>
                <div id="queue3" className={styles.selected} onClick={()=> {self.onSelect(2);}}>
                  {self.state.item2.tag}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
});


module.exports = KilnComponent;
