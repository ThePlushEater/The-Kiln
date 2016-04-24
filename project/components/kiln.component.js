import React from 'react';
import ReactDOM from 'react-dom';

import styles from './kiln.component.css';

var KilnComponent = React.createClass({
  getInitialState: function() {
    return {
      item0:  {
        id: 0,
        name: "",
        preset: 0,
        hval: 0,
        sval: 100,
        bval: 100,
        image: ""
      },
      item1:  {
        id: 1,
        name: "",
        preset: 0,
        hval: 0,
        sval: 100,
        bval: 100,
        image: ""
      },
      item2:  {
        id: 2,
        name: "",
        preset: 0,
        hval: 0,
        sval: 100,
        bval: 100,
        image: ""
      },
      item3:  {
        id: 3,
        name: "",
        preset: 0,
        hval: 0,
        sval: 100,
        bval: 100,
        image: ""
      },
      item4:  {
        id: 4,
        name: "",
        preset: 0,
        hval: 0,
        sval: 100,
        bval: 100,
        image: ""
      },
      selected: 0
    };
  },

  componentDidMount: function() {
    let self = this;
    $("#baseColorVariation").slider();
    $("#speckleSizeVariation").slider();
    $("#dragSizeVariation").slider();
    $("#dragDesityVariation").slider();
    $("#crackSizeVariation").slider();
    $("#crackNoiseVariation").slider();

    $('#baseColorSelector').ColorPicker({
      color: '#ff0000',
      flat: true,
      onChange: function (hsb, hex, rgb) {
        if (self.state.selected == 0) {
          self.state.item0.hval = hsb.h;
          self.state.item0.sval = hsb.s;
          self.state.item0.bval = hsb.b;
        } else if (self.state.selected == 1) {
          self.state.item1.hval = hsb.h;
          self.state.item1.sval = hsb.s;
          self.state.item1.bval = hsb.b;
        } else if (self.state.selected == 2) {
          self.state.item2.hval = hsb.h;
          self.state.item2.sval = hsb.s;
          self.state.item2.bval = hsb.b;
        } else if (self.state.selected == 3) {
          self.state.item3.hval = hsb.h;
          self.state.item3.sval = hsb.s;
          self.state.item3.bval = hsb.b;
        } else if (self.state.selected == 4) {
          self.state.item4.hval = hsb.h;
          self.state.item4.sval = hsb.s;
          self.state.item4.bval = hsb.b;
        }
      }
    });
    $('#speckleColorSelector').ColorPicker({
      color: '#ff0000',
      flat: true,
      onChange: function (hsb, hex, rgb) {
        console.log(hex);
      }
    });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({generic: nextProps.generic});
    console.log(this.state);
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
    console.log(this.state.item);
  },

  onSelect: function(id: number) {
    this.setState({selected: id});
  },

  onBake: function(item) {
    console.log(item);
    let self = this;
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
      }),
      dataType: "json",
      success: function(data) {
        item.image = data.filename;
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
      return (
        <div className={styles.wrapper}>
          <div className={styles.leftPanel}>
            <input className={styles.inputBrickName} type="text" key={self.state.item0.id} placeholder="Name your brick" value={self.state.item0.name} onChange={(event)=> {self.onChangeName(self.state.item0, event)}} />
            <select className={styles.inputPreset} onChange={(event)=> {self.onChangePreset(self.state.item0, event)}}>
              <option value="0">Choose from an existing brick</option>
              <option value="1">Standard Red Brick</option>
              <option value="2">Standard Green Brick</option>
              <option value="3">The Mason Special</option>
            </select>
            <div className={styles.dimension}>
              <input className={styles.inputBrickName} type="text" placeholder="Width (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Height (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Length (cm)" />
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color:
              </div>
              <div id="baseColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color Variation:
              </div>
              <div id="baseColorVariation"></div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Color:
              </div>
              <div id="speckleColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Size Variation:
              </div>
              <div id="speckleSizeVariation"></div>
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

          </div>
          <div className={styles.rightPanel}>
            <div className={styles.resultPanel}>
              <div className={styles.thumbnail_image} >
                <img src={self.state.item0.image + "?ver=" + time}/>
              </div>
              <div className={styles.button} onClick={()=> {self.onBake(self.state.item0);}}>
                <div>
                  fire me up
                </div>
              </div>
            </div>
            <div className={styles.queuePanel}>
              <div id="queue1" className={styles.selected} onClick={()=> {self.onSelect(0);}}>
                READY
              </div>
              <div id="queue2" onClick={()=> {self.onSelect(1);}}>
                READY
              </div>
              <div id="queue3" onClick={()=> {self.onSelect(2);}}>
                READY
              </div>
              <div id="queue4" onClick={()=> {self.onSelect(3);}}>
                READY
              </div>
              <div id="queue5" onClick={()=> {self.onSelect(4);}}>
                READY
              </div>
            </div>
          </div>
        </div>
      );
    } else if (self.state.selected == 1) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.leftPanel}>
            <input className={styles.inputBrickName} type="text" key={self.state.item1.id} placeholder="Name your brick" value={self.state.item1.name} onChange={(event)=> {self.onChangeName(self.state.item1, event)}} />
            <select className={styles.inputPreset} onChange={(event)=> {self.onChangePreset(self.state.item1, event)}}>
              <option value="0">Choose from an existing brick</option>
              <option value="1">Standard Red Brick</option>
              <option value="2">Standard Green Brick</option>
              <option value="3">The Mason Special</option>
            </select>
            <div className={styles.dimension}>
              <input className={styles.inputBrickName} type="text" placeholder="Width (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Height (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Length (cm)" />
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color:
              </div>
              <div id="baseColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color Variation:
              </div>
              <div id="baseColorVariation"></div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Color:
              </div>
              <div id="speckleColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Size Variation:
              </div>
              <div id="speckleSizeVariation"></div>
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

          </div>
          <div className={styles.rightPanel}>
            <div className={styles.resultPanel}>
              <div className={styles.thumbnail_image} >
                <img src={self.state.item1.image + "?ver=" + time}/>
              </div>
              <div className={styles.button} onClick={()=> {self.onBake(self.state.item1);}}>
                <div>
                  fire me up
                </div>
              </div>
            </div>
            <div className={styles.queuePanel}>
              <div id="queue1" onClick={()=> {self.onSelect(0);}}>
                READY
              </div>
              <div id="queue2" className={styles.selected} onClick={()=> {self.onSelect(1);}}>
                READY
              </div>
              <div id="queue3" onClick={()=> {self.onSelect(2);}}>
                READY
              </div>
              <div id="queue4" onClick={()=> {self.onSelect(3);}}>
                READY
              </div>
              <div id="queue5" onClick={()=> {self.onSelect(4);}}>
                READY
              </div>
            </div>
          </div>
        </div>
      );
    } else if (self.state.selected == 2) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.leftPanel}>
            <input className={styles.inputBrickName} type="text" key={self.state.item2.id} placeholder="Name your brick" value={self.state.item2.name} onChange={(event)=> {self.onChangeName(self.state.item2, event)}} />
            <select className={styles.inputPreset} onChange={(event)=> {self.onChangePreset(self.state.item2, event)}}>
              <option value="0">Choose from an existing brick</option>
              <option value="1">Standard Red Brick</option>
              <option value="2">Standard Green Brick</option>
              <option value="3">The Mason Special</option>
            </select>
            <div className={styles.dimension}>
              <input className={styles.inputBrickName} type="text" placeholder="Width (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Height (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Length (cm)" />
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color:
              </div>
              <div id="baseColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color Variation:
              </div>
              <div id="baseColorVariation"></div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Color:
              </div>
              <div id="speckleColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Size Variation:
              </div>
              <div id="speckleSizeVariation"></div>
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

          </div>
          <div className={styles.rightPanel}>
            <div className={styles.resultPanel}>
              <div className={styles.thumbnail_image} >
                <img src={self.state.item2.image + "?ver=" + time}/>
              </div>
              <div className={styles.button} onClick={()=> {self.onBake(self.state.item2);}}>
                <div>
                  fire me up
                </div>
              </div>
            </div>
            <div className={styles.queuePanel}>
              <div id="queue1" onClick={()=> {self.onSelect(0);}}>
                READY
              </div>
              <div id="queue2" onClick={()=> {self.onSelect(1);}}>
                READY
              </div>
              <div id="queue3" className={styles.selected} onClick={()=> {self.onSelect(2);}}>
                READY
              </div>
              <div id="queue4" onClick={()=> {self.onSelect(3);}}>
                READY
              </div>
              <div id="queue5" onClick={()=> {self.onSelect(4);}}>
                READY
              </div>
            </div>
          </div>
        </div>
      );
    } else if (self.state.selected == 3) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.leftPanel}>
            <input className={styles.inputBrickName} type="text" key={self.state.item3.id} placeholder="Name your brick" value={self.state.item3.name} onChange={(event)=> {self.onChangeName(self.state.item3, event)}} />
            <select className={styles.inputPreset} onChange={(event)=> {self.onChangePreset(self.state.item3, event)}}>
              <option value="0">Choose from an existing brick</option>
              <option value="1">Standard Red Brick</option>
              <option value="2">Standard Green Brick</option>
              <option value="3">The Mason Special</option>
            </select>
            <div className={styles.dimension}>
              <input className={styles.inputBrickName} type="text" placeholder="Width (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Height (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Length (cm)" />
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color:
              </div>
              <div id="baseColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color Variation:
              </div>
              <div id="baseColorVariation"></div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Color:
              </div>
              <div id="speckleColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Size Variation:
              </div>
              <div id="speckleSizeVariation"></div>
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

          </div>
          <div className={styles.rightPanel}>
            <div className={styles.resultPanel}>
              <div className={styles.thumbnail_image} >
                <img src={self.state.item3.image + "?ver=" + time}/>
              </div>
              <div className={styles.button} onClick={()=> {self.onBake(self.state.item3);}}>
                <div>
                  fire me up
                </div>
              </div>
            </div>
            <div className={styles.queuePanel}>
              <div id="queue1" onClick={()=> {self.onSelect(0);}}>
                READY
              </div>
              <div id="queue2" onClick={()=> {self.onSelect(1);}}>
                READY
              </div>
              <div id="queue3" onClick={()=> {self.onSelect(2);}}>
                READY
              </div>
              <div id="queue4" className={styles.selected} onClick={()=> {self.onSelect(3);}}>
                READY
              </div>
              <div id="queue5" onClick={()=> {self.onSelect(4);}}>
                READY
              </div>
            </div>
          </div>
        </div>
      );
    } else if (self.state.selected == 4) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.leftPanel}>
            <input className={styles.inputBrickName} type="text" key={self.state.item4.id} placeholder="Name your brick" value={self.state.item4.name} onChange={(event)=> {self.onChangeName(self.state.item4, event)}} />
            <select className={styles.inputPreset} onChange={(event)=> {self.onChangePreset(self.state.item4, event)}}>
              <option value="0">Choose from an existing brick</option>
              <option value="1">Standard Red Brick</option>
              <option value="2">Standard Green Brick</option>
              <option value="3">The Mason Special</option>
            </select>
            <div className={styles.dimension}>
              <input className={styles.inputBrickName} type="text" placeholder="Width (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Height (cm)" />
              <input className={styles.inputBrickName} type="text" placeholder="Length (cm)" />
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color:
              </div>
              <div id="baseColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Base Color Variation:
              </div>
              <div id="baseColorVariation"></div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Color:
              </div>
              <div id="speckleColorSelector" className={styles.picker}></div>
            </div>
            <div className={styles.slider}>
              <div className={styles.sliderText}>
                Speckle Size Variation:
              </div>
              <div id="speckleSizeVariation"></div>
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

          </div>
          <div className={styles.rightPanel}>
            <div className={styles.resultPanel}>
              <div className={styles.thumbnail_image} >
                <img src={self.state.item4.image + "?ver=" + time}/>
              </div>
              <div className={styles.button} onClick={()=> {self.onBake(self.state.item4);}}>
                <div>
                  fire me up
                </div>
              </div>
            </div>
            <div className={styles.queuePanel}>
              <div id="queue1" onClick={()=> {self.onSelect(0);}}>
                READY
              </div>
              <div id="queue2" onClick={()=> {self.onSelect(1);}}>
                READY
              </div>
              <div id="queue3" onClick={()=> {self.onSelect(2);}}>
                READY
              </div>
              <div id="queue4" onClick={()=> {self.onSelect(3);}}>
                READY
              </div>
              <div id="queue5" className={styles.selected} onClick={()=> {self.onSelect(4);}}>
                READY
              </div>
            </div>
          </div>
        </div>
      );
    }

  }
});


module.exports = KilnComponent;
