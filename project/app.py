blender = "C:/Program Files/Blender Foundation/Blender/blender.exe"









from flask import Flask, render_template, jsonify, abort, make_response, url_for, request
from jinja2 import TemplateNotFound
from tasks import Tasks
from features import Features
from options import Options
import subprocess



app = Flask(__name__, template_folder='templates', static_folder='static')
app.config.update(
    threaded=True,
    DEBUG=True,
    SECRET_KEY='qwk4l32jtgnk;l12q3j42;1lrnjt245^&%*^#%$WERG'
)

# Make the WSGI interface available at the top level so wfastcgi can get it.
wsgi_app = app.wsgi_app


@app.route('/')
def index():
    return render_template('index.html')

def make_public_task(task):
    new_task = {}
    for field in task:
        if field == 'id':
            new_task[field] = task[field]
            new_task['uri'] = url_for('get_task', task_id=task['id'], _external=True)
        else:
            new_task[field] = task[field]
    return new_task

@app.route('/tasks', methods=['GET'])
def get_tasks():
    #return jsonify({'tasks': Tasks})
    return jsonify({'tasks': [make_public_task(task) for task in Tasks]})

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = [task for task in Tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({'task': task[0]})


@app.route('/task/<int:task_id>', methods=['PUT'])
def create_task(task_id):
    if not request.json:
        abort(400)
    render2(request);
    filename = 'static/render/' + str(request.json['name']) + '_1.PNG'
    #task[0]['result'] = url_for('static', filename=filename)
    return jsonify({'filename': filename})

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    #app.logger.warning(request.json)
    task = [task for task in Tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    if not request.json:
        abort(400)
    #if 'name' in request.json and type(request.json['name']) != unicode:
    #    abort(400)
    #if 'description' in request.json and type(request.json['description']) is not unicode:
#        abort(400)
    #if 'features' in request.json and type(request.json['features']) is not unicode:
    #    abort(400)
    #if 'done' in request.json and type(request.json['done']) is not bool:
    #    abort(400)

    #task[0]['name'] = request.json.get('name', task[0]['name'])
    #task[0]['description'] = request.json.get('description', task[0]['description'])
    task[0]['features'] = request.json.get('features', task[0]['features'])
    task[0]['status'] = request.json.get('status', task[0]['status'])
    task[0]['uri'] = request.json.get('uri', task[0]['uri'])
    #app.logger.warning(jsonify({'task': task[0]}))
    return jsonify({'task': task[0]})

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = [task for task in Tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    Tasks.remove(task[0])
    return jsonify({'result': True})

def make_public_feature(feature):
    new_feature = {}
    for field in feature:
        if field == 'id':
            new_feature[field] = feature[field]
            new_feature['uri'] = url_for('get_feature', feature_id=feature['id'], _external=True)
        else:
            new_feature[field] = feature[field]
    return new_feature

@app.route('/features', methods=['GET'])
def get_features():
    return jsonify({'features': [make_public_feature(feature) for feature in Features]})

@app.route('/features/<int:feature_id>', methods=['GET'])
def get_feature(feature_id):
    feature = [feature for feature in Features if feature['id'] == feature_id]
    if len(feature) == 0:
        abort(404)
    return jsonify({'feature': feature[0]})

def make_public_option(option):
    new_option = {}
    for field in option:
        if field == 'id':
            new_option[field] = option[field]
            new_option['uri'] = url_for('get_option', option_id=option['id'], _external=True)
        else:
            new_option[field] = option[field]
    return new_option

@app.route('/options', methods=['GET'])
def get_options():
    return jsonify({'options': [make_public_option(option) for option in Options]})
'''
@app.route('/option/<int:feature_id>', methods=['GET'])
    def get_options(feature_id):
        new_options = []
        for option in Options:
            if option['oid'] == feature_id:
                new_options.append(option)
        return jsonify({'options': [make_public_option(option) for option in new_options]})
'''
@app.route('/option/<int:option_id>', methods=['GET'])
def get_option(option_id):
    option = [option for option in Options if option['id'] == option_id]
    if len(option) == 0:
        abort(404)
    return jsonify({'option': option[0]})

@app.route('/option/<int:option_id>', methods=['PUT'])
def update_option(option_id):
    #app.logger.warning(request.json)
    option = [option for option in Options if option['id'] == option_id]
    if len(option) == 0:
        abort(404)
    if not request.json:
        abort(400)
    #if 'name' in request.json and type(request.json['name']) != unicode:
    #    abort(400)
    #if 'description' in request.json and type(request.json['description']) is not unicode:
#        abort(400)
    #if 'features' in request.json and type(request.json['features']) is not unicode:
    #    abort(400)
    #if 'done' in request.json and type(request.json['done']) is not bool:
    #    abort(400)
    option[0]['value'] = request.json.get('value', option[0]['value'])
    option[0]['uri'] = request.json.get('uri', option[0]['uri'])
    #app.logger.warning(jsonify({'option': option[0]}))
    return jsonify({'option': option[0]})

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

def render(filename, options):
    app.logger.warning(options)
    generic = 1
    hue = 0
    saturation = 95
    value = 25
    for option in options:
        if option['id'] == 1:
            generic = option['value']
        if option['id'] == 2:
            hue = option['value']
        if option['id'] == 3:
            saturation = option['value']
        if option['id'] == 4:
            value = option['value']

    app.logger.warning(generic)
    blender = 'blender'
    blend = url_for('static', filename='blender/masonry1.blend')

    #file = '-b project/static/blender/brick3.blend -P project/progress.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 '
    file = '-b project/static/blender/masonry1.blend -P project/static/blender/masonry.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 -- -hsv_h ' + hue + ' -hsv_s ' + saturation + ' -hsv_v ' + value
    if generic == 2:
        file = '-b project/static/blender/masonry2.blend -P project/static/blender/masonry.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 -- -hsv_h ' + hue
    elif generic == 3:
        file = '-b project/static/blender/masonry3.blend -P project/static/blender/masonry.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 -- -hsv_h ' + hue
    command = ' '.join([blender, file])
    ans = subprocess.call(command, stderr=subprocess.STDOUT)

def render2(request):
    generic = int(request.json['generic'])
    filename = request.json['name']
    hue = str(request.json['hval'])
    saturation = str(request.json['sval'])
    value = str(request.json['bval'])
    dsize = str(request.json['dsize'])
    ddensity = str(request.json['ddensity'])
    csize = str(request.json['csize'])
    cnoise = str(request.json['cnoise'])

    app.logger.warning(generic)

    # blend = url_for('static', filename='blender/masonry1.blend')

    # #file = '-b project/static/blender/brick3.blend -P project/progress.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 '
    # if generic == 1:
    #     file = '-b project/static/blender/masonry1.blend -P project/static/blender/masonry.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 -- -hsv_h ' + hue + ' -hsv_s ' + saturation + ' -hsv_v ' + value + ' -d_size ' + dsize + ' -d_density ' + ddensity + ' -c_size ' + csize + ' -c_noise ' + cnoise
    #     command = ' '.join([blender, file])
    #     ans = subprocess.call(command, stderr=subprocess.STDOUT)

    # elif generic == 2:
    #     file = '-b project/static/blender/masonry2.blend -P project/static/blender/masonry.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 -- -hsv_h ' + hue + ' -hsv_s ' + saturation + ' -hsv_v ' + value + ' -d_size ' + dsize + ' -d_density ' + ddensity + ' -c_size ' + csize + ' -c_noise ' + cnoise
    #     command = ' '.join([blender, file])
    #     ans = subprocess.call(command, stderr=subprocess.STDOUT)

    # elif generic == 3:
    #     file = '-b project/static/blender/masonry3.blend -P project/static/blender/masonry.py -o //../render/' + filename + '_#.PNG -x 1 -f 1 -- -hsv_h ' + hue + ' -hsv_s ' + saturation + ' -hsv_v ' + value + ' -d_size ' + dsize + ' -d_density ' + ddensity + ' -c_size ' + csize + ' -c_noise ' + cnoise
    #     command = ' '.join([blender, file])
    #     ans = subprocess.call(command, stderr=subprocess.STDOUT)




if __name__ == '__main__':
    import os
    HOST = os.environ.get('SERVER_HOST', '0.0.0.0')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '9000'))
    except ValueError:
        PORT = 80
    app.run(HOST, PORT, threaded=True)
