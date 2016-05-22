# The Kiln - Parametric Brick Texture Generator
_Masonry_ is an application that generates realistic and parametric brick textures through web browsers, including desktop and mobile devices. This application utilizes a server-client connection to render through Blender, an open source 3d rendering program. For this reason, it requires server side setup to deploy the application, but it is hard to explain every detail since setup process can vary depending on the server environment. In this document, I will explain one of the developing mode setups, mainly used for developing purposes, but can also be extended to setup a production server.

## Dependencies

### Python
Python is a language that can be run in the same manner across operating systems as long as a python interpreter is installed. Using python for handling server side operations is a good choice if developers don’t know the specifications of a server environment during the developing stage. One disadvantage is that a python server is more expensive than a normal apache server. I haven’t researched many options for python servers, but AWS (Amazon Web Service) is one possible option. An apache server cannot be used since this application requires Blender, which uses python script language to generate textures from the server side.
You can use either python version 2.x or 3.x, but I recommend to use the latest 3.x version. You can download the python library from https://www.python.org/.

### Node.js
Node.js has been established as a standard for developing web-based applications, both server side and client side. Node.js comes with a package ecosystem, called npm, which we will use to install dependency packages automatically through our package installation process.
	You can download Node.js from https://nodejs.org/.

### Flask
Flask is a micro-framework based on a python language. There are other options for python server languages, such as Django, but Django requires many dependency add-ons. On the other hand, Flask only requires 2 add-ons to be executed since it only provides essential functionalities to run a server through python language.
	Flask will be installed automatically through our package installation process, but you can look at documentation and tutorials from http://flask.pocoo.org/.

### Blender
Blender is a 3d rendering software, like Maya, or Cinema4D. It provides a comparable render result to that of Maya or Cinema4D, and it is open source software so it doesn’t require an expensive fee to use the program. Another advantage of using Blender is that it exposes “commands” to render textures in a background processor without launching the program. Through the command lines, we can execute rendering process from a python server, and return the result back to a client.
	You can find more information about blender command lines from https://www.blender.org/manual/render/workflows/command_line.html. You can download Blender from https://www.blender.org/download/.

### React
React is a client side framework developed by Facebook. It utilizes state machines to update the client side application, which is beneficial for the Masonry application because it updates a client’s browser whenever a rendering process finishes without the need to refresh it.
React will also be installed automatically through our package installation process, but you can look at documentation and tutorials from https://facebook.github.io/react/.

## 10 Steps Installation
_*{} is variable that can be different based on your environment._

1.  Install Python interpreter from https://www.python.org/ (either 3.x or 2.x).

2. Install Node.js from https://nodejs.org/ (latest version should be fine).

3. Install Blender from https://www.blender.org/download/ (choose a right version based on your operating system).

4. Download or clone the Masonry package from https://github.com/captainwhale52/ Masonry, and extract any desired location on your machine.

5. Open {app-root-folder}/project/app.py file with any text editor. In line #1, put / change the location of Blender executable file. 
Ex> blender = "C:/Program Files/Blender Foundation/Blender/blender.exe" (default location of Blender executable file for windows).

6. Open command prompt or terminal, and check some command lines to check whether dependency libraries are installed correctly. If it shows an error message, go back to previous step and re-install libraries.
1) python –V (should show a version of python interpreter correctly)
```
2) pip –V (should show a version of pip library)
3) npm –V (should show a version of npm library)
```

7. Open command prompt or terminal, and move to a directory that the Masonry package is located. And execute `“npm install”` (for windows), `“sudo npm install”` (for Linux or Mac). This command will install all extra dependency libraries for the application.

8. In command prompt or terminal (still in a directory that the Masonry package), execute `“npm run dev”` command. This command will compile the application and launch a local server for developing purpose.

9. Once the command prompt shows the message “Waiting for the change…” you can open the browser and type “localhost:8000” in address box. If it shows the UI without error, the application is ready to use.
	
10. Even the server that we setup is for local server, you can still open the hotspot of your machine so that other devices within a range of Wi-Fi can access the application. Once you open the hotspot of your machine, open command prompt or terminal, and execute “ipconfig”. This command will show the list of IPs that your machine is using. Usually local server address starts from “192.168.*.*”. After finding the address, type the address + port number 8000, Ex> 192.168.173.1:8000 into the browser of a connected device.

## Architecture of the Application
Following image is the software architecture of the Masonry application. Understanding this architecture will be helpful to edit or develop the program as your own purpose.
![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/system-diagram.png)

## Texture Generation Algorithm
### Blender Command Line Execution
Blender command line execution requires a few parameters, such as blender file name, python file name to link a server with the Blender, and parameters.
If you open {app-root-directory}/project/app.py file, and go to line 221, you will see below code.

```“-b project/static/blender/masonry1.blend -P project/static/blender/masonry.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 -- -hsv_h ' + hue + ' -hsv_s ' + saturation + ' -hsv_v ' + value + ' -d_size ' + dsize + ' -d_density ' + ddensity + ' -c_size ' + csize + ' -c_noise ' + cnoise”```

1. -b blender file name to render
2. -P python file name to pass parameter values to Blender
3. -- specific parameters set of (-parameter name parameter value)

You can change or add parameters by editing this line of code. More information can be found from https://www.blender.org/manual/render/workflows/command_line.html.

### Blender Python file
{app-root-directory}/project/static/blender/masonry.py is a file to pass parameters from a python server to the Blender. Below is the basic structure of the masonry.py file.

```python
# try to get parameters from command line 
try:				 
    args = list(reversed(sys.argv))
    idx = args.index("--")
except ValueError:
    params = []
else:
    params = args[:idx][::-1]

# parse parameters and assign into specific variables
if params[0] == '-hsv_h':	
	hsv_h = float(params[1]) / 360.0
if params[2] == '-hsv_s':
	hsv_s = float(params[3]) / 100.0
if params[4] == '-hsv_v':
    hsv_v = float(params[5]) / 100.0
if params[6] == '-d_size':
    d_size = float(params[7]) / 100.0
if params[8] == '-d_density':
    d_density = float(params[9]) / 100.0
if params[10] == '-c_size':
    c_size = float(params[11]) / 100.0
if params[12] == '-c_noise':
    c_noise = float(params[13]) / 100.0

# Find a brick material and assign each value into designated material nodes.
brick = bpy.data.objects["Brick"];
mat = bpy.data.materials["Material"]
nodes = mat.node_tree.nodes
hsv_h_node = nodes.get("hsv_h")
hsv_h_node.outputs[0].default_value = hsv_h
hsv_s_node = nodes.get("hsv_s")
hsv_s_node.outputs[0].default_value = hsv_s
hsv_v_node = nodes.get("hsv_v")
hsv_v_node.outputs[0].default_value = hsv_v
hsv_v_node = nodes.get("d_size")
hsv_v_node.outputs[0].default_value = d_size
hsv_v_node = nodes.get("d_density")
hsv_v_node.outputs[0].default_value = d_density
hsv_v_node = nodes.get("c_size")
hsv_v_node.outputs[0].default_value = c_size
hsv_v_node = nodes.get("c_noise")
hsv_v_node.outputs[0].default_value = c_noise
```

If you open one of the blend file {app-root-directory}/project/static/blender/masonry.blend, and change the layout into a compositing mode, you can see the node structure of the brick material. You can also check the same value node names that you see in a masonry.py file, such as hsv_h, hsv_s, hsv_v. That’s the way python file pass values into the blender rendering engine.

By understanding this connection between server and Blender, you can add / edit / delete parameters to generate your own style of brick textures.

![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/compositing.png)
![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/hsv-node.png)

### Blender Material
Blender material uses node based structure to create a texture. The flow of direction is left to right until it reach the “Material Output” node. Figure 4. More information about using Blender node based material can be found from https://youtu.be/Heg89K3ZMDo, https:// cgcookie.com/course/shader-forge/, http://blenderdiplom.com/en/tutorials/all-tutorials.html, and http://www.blenderguru.com/tutorials/.

![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/flow-of-nodes.png)

### Color Algorithm
Applying color is straight forward. Either you can connect RGB color picker node to Diffuse BSDF node or Combined HSV node to Diffuse BSDF node by getting each Hue, Saturation, Value values from python code.

![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/diffuse-node.png)
![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/feed-diffuse.png)

### Dragging Mark Algorithm
The core idea of dragging mark is to create a randomly sized and randomly distributed dotted texture, and use the texture to create a displacement map to create a mole effect. Figure 7 shows a basic structure of dragging mark effect. The highlighted node is a DragMark node which has a functionality to create a gray texture.

![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/dragging-mark.png)
![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/dragging-mark-bump-map.png)

DragMark node is not just a single node, it is a group of node contains other node structure. If you click the right upper corner of DragMark node, it will show what is inside. The basic idea of DragMark node is to create n noise texture and apply black and white color scale to generate random dotted texture.

![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/dargging-mark-node.png)

In actual blender files, you will see a node called, DragMarkComposition. It is another node combining multiple DragMark nodes to create different sizes / distributions of dragging marks.

![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/dragging-mark-composition.png)
![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/color-and-dragging-mark.png)

### Crack Algorithm
Sometimes, people want to see how it looks like when bricks get ages. As time passes, bricks tend to get a crack from weathering. Using Voronoi texture algorithm, we can create crack effect on a brick texture. Figure 12 shows a basic structure of the crack algorithm.

![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/crack-structure.png)
![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/crack-inside.png)

To make a complicated story simple, it create a two slightly different size of Voronoi texture and substract one from the other, remaining edges of Voronoi texture. You can do experiment by changing values on the node, such as CrackScale, CrackThickness, NoiseScale, etc.

![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/different-crack-style.png)
![Masonry] (https://github.com/captainwhale52/Masonry/blob/master/manual/combined-result.png)
