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

5. Open [PROJECT_DIR]/project/app.py file with any text editor. In line #1, put / change the location of Blender executable file. 
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
