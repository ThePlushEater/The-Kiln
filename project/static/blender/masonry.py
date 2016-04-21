__author__ = 'CaptainWhale'

import bpy
import random
import sys

hsv_h = 0
hsv_s = 0
hsv_v = 0

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
if params[2] == '-hsv_s':
	hsv_s = float(params[3]) / 100.0
if params[4] == '-hsv_v':
    hsv_v = float(params[5]) / 100.0


brick = bpy.data.objects["Brick"];
mat = bpy.data.materials["Material"]
nodes = mat.node_tree.nodes
hsv_h_node = nodes.get("hsv_h")
hsv_h_node.outputs[0].default_value = hsv_h
hsv_s_node = nodes.get("hsv_s")
hsv_s_node.outputs[0].default_value = hsv_s
hsv_v_node = nodes.get("hsv_v")
hsv_v_node.outputs[0].default_value = hsv_v

print("hsv_h", hsv_h)
print("hsv_s", hsv_s)
print("hsv_v", hsv_v)