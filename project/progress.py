import bpy
import sys
sys.path.append('C:/Users/Karl/OneDrive/Workspace/Web/Masonry/venv/Lib/site-packages')
sys.path.append('C:/Users/Karl/OneDrive/Workspace/Web/Masonry/project')
from app import app
from tasks import Tasks

def my_handler(scene):
    task = [task for task in Tasks if task['id'] == 1]
    task[0]['status'] = 'done'
    app.logger.warning("Blender Rendering Done.")
    #print("Blender Rendering Done.")

bpy.app.handlers.render_complete.append(my_handler)
