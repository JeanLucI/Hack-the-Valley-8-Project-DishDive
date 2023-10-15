from flask import Blueprint, request, jsonify

from .extensions import mongo

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return 'Connected to MongoDB!'

@main.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    user_id = data.get('user_id')
    preferences = data.get('preferences')
    filters = data.get('filters')
        # Insert a new user into the 'users' collection
    mongo.db.users.insert_one({'_id': user_id, 'preferences': preferences, 'filters': filters})
    return jsonify({'status': 'User added successfully!'})

@main.route('/check_user', methods=['POST'])
def check_user():
    data = request.json
    user_id = data.get('user_id')

    # Check if the user exists in the 'users' collection
    user_exists = bool(mongo.db.users.find_one({'_id': user_id}))

    return jsonify({'status': user_exists})

@main.route('/update_preferences', methods=['POST'])
def update_preferences():
    data = request.json
    user_id = data.get('user_id')
    preferences = data.get('preferences')

    # Update or insert user preferences into MongoDB
    mongo.db.users.update_one({'_id': user_id}, {'$set': {'preferences': preferences}}, upsert=True)

    return jsonify({'status': 'Preferences and filters updated successfully!'})

@main.route('/fetch_user', methods=['GET'])
def fetch_user():
    user_id = request.args.get('user_id', '')

    # Fetch user data from MongoDB
    user_data = mongo.db.users.find_one({'_id': user_id})

    return jsonify(user_data)

@main.route('/fetch_suggestion', methods=['GET'])
def fetch_suggestion():
    user_id = request.args.get('user_id', '')

    # Fetch user data from MongoDB
    user_data = mongo.db.users.find_one({'_id': user_id})

    # Use the fetched user data to generate a meal suggestion (you can integrate your existing code here)
    # For now, let's assume you have a function called generate_suggestion

    suggestion = generate_suggestion(user_data['preferences'], user_data['filters'])

    return jsonify({'suggestion': suggestion})


# Function to generate a meal suggestion (replace this with your actual logic)
def generate_suggestion(preferences, filters):
    # Your existing code for generating suggestions goes here
    # For simplicity, let's return a dummy suggestion
    return "Pasta with Tomato Sauce"
