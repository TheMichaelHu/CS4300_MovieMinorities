from . import *  
from app.irsystem.models.helpers import *
# from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder

project_name = "Chatalytics: Turn Your Friends into Numbers"
netids = [
    "Celine Choo: cc972",
    "Lavanya Aprameya: la334",
    "Lev Akabas: la286",
    "Michael Hu: mh2386",
    "Raghav Batra: rb698",
]

@irsystem.route('/', methods=['GET'])
def search():
	query = request.args.get('search')
	if not query:
		data = []
		output_message = ''
	else:
		output_message = "Your search: " + query
		data = range(5)
	return render_template('search.html', name=project_name, netids=netids, output_message=output_message, data=data)
