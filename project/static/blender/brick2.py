__author__ = 'CaptainWhale'

import bpy
import random
import sys

D = bpy.data

#mage_object = D.images.new(name='picOut', width=width, height=height)
file_name = 'picInput'
image_object = D.images[file_name]

# work on a copy instead, it's much faster 
rgba_list = list(image_object.pixels)
num_pixels = len(image_object.pixels)

# function for drawing a pixel in a specific x, y position using rgba value
def drawPixel(image, x, y, rgba):
    width = image.size[0]
    height = image.size[1]
    # multiplied by four because of r, g, b, a pattern
    index_pixel = (x + width * y) * 4
    
    # datatype of rgba is tuple
    image_object.pixels[index_pixel] = rgba[0]
    image_object.pixels[index_pixel + 1] = rgba[1]
    image_object.pixels[index_pixel + 2] = rgba[2]
    image_object.pixels[index_pixel + 3] = rgba[3]
    
#drawPixel(image_object, 0, 0, (1, 1, 1, 1))


def resetImage(image):
    width = image.size[0]
    height = image.size[1]
    for x in range (0, width, 1):
        for y in range (0, height, 1):
            value = random.random()
            drawPixel(image, x, y, (0, 0, 0, 1))

def randomImage(image):
    width = image.size[0]
    height = image.size[1]
    for x in range (0, width, 1):
        for y in range (0, height, 2):
            value = random.random()
            drawPixel(image, x, y, (value, value, value, 1))

#resetImage(image_object)
randomImage(image_object)

hsv_h = 0

try:
    args = list(reversed(sys.argv))
    idx = args.index("--")

except ValueError:
    params = []

else:
    params = args[:idx][::-1]

print("Script params:", params)

if params[0] == '-hsv_h':
	hsv_h = float(params[1]) / 360.0


brick = bpy.data.objects["Brick"];
mat = bpy.data.materials["Material"]
nodes = mat.node_tree.nodes
hsv_h_node = nodes.get("hsv_h")

hsv_h_node.outputs[0].default_value = hsv_h