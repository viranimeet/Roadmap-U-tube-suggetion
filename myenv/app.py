from flask import Flask, jsonify, request
from googleapiclient.discovery import build
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_wtf import FlaskForm
from wtforms import PasswordField, EmailField, validators
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load environment variables
load_dotenv()

# Set the secret key
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# MySQL configurations
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
mysql = MySQL(app)


# Disable CSRF for easier development (ensure it's not used in production without tokens)
app.config['WTF_CSRF_ENABLED'] = False

# Google API key for YouTube
API_KEY = os.getenv('GOOGLE_API_KEY')

# Initialize JWTManager
app.config['JWT_SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')
jwt = JWTManager(app)

# Form for sign-up
class SignUpForm(FlaskForm):
    email = EmailField('Email', [validators.Length(min=6, max=100), validators.Email()])
    password = PasswordField('Password', [validators.DataRequired()])

# YouTube video search function
def get_youtube_links(query, max_results=4):
    try:
        youtube = build('youtube', 'v3', developerKey=API_KEY)
        request = youtube.search().list(
            q=query,
            part='snippet',
            type='video',
            maxResults=max_results
        )
        response = request.execute()
        
        video_links = []
        for item in response['items']:
            video_id = item['id']['videoId']
            video_url = f"https://www.youtube.com/watch?v={video_id}"
            video_links.append(video_url)
        
        return video_links
    except Exception as e:
        return {"error": str(e)}

# Route to search YouTube videos
@app.route('/search', methods=['GET'])
def search_videos():
    topic = request.args.get('topic')
    if not topic:
        return jsonify({'error': 'Topic not provided'}), 400
    
    links = get_youtube_links(topic)
    return jsonify({'links': links})

# Route for sign-up
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        print(f"Received data: {data}")

        # Form validation
        form = SignUpForm(email=data.get('email'), password=data.get('password'))

        if form.validate():
            email = form.email.data
            password = form.password.data
            hashed_password = generate_password_hash(password)

            cursor = mysql.connection.cursor()
            cursor.execute('INSERT INTO users (email, password) VALUES (%s, %s)', (email, hashed_password))
            mysql.connection.commit()
            cursor.close()
            return jsonify({'message': 'User created successfully'}), 201
        else:
            print(f"Form errors: {form.errors}")
            return jsonify({'error': 'Invalid form data', 'details': form.errors}), 400
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, password FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
        user_id = user[0]
        stored_password_hash = user[1]

        if check_password_hash(stored_password_hash, password):
            # Generate token if using JWT
            token = create_access_token(identity={'id': user_id, 'email': email})
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'token': token,
                'user_id': user_id,
                'email': email
            }), 200
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    else:
        return jsonify({'success': False, 'message': 'User not found'}), 404



@app.route('/api/user_status/<int:user_id>', methods=['GET'])
def get_user_status(user_id):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT subtopic, status FROM user_status WHERE user_id = %s", (user_id,))
        results = cursor.fetchall()

        # Format results to match your desired format
        subtopics = []
        for subtopic, status in results:
            subtopics.append({'name': subtopic, 'status': status})

        return jsonify({'subtopics': subtopics}), 200 
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()





@app.route('/api/status', methods=['POST'])
def update_user_status():
    data = request.get_json()
    user_id = data.get('userId')
    subtopic = data.get('subtopic')
    status = data.get('status')

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO user_status (user_id, subtopic, status) VALUES (%s, %s, %s) "
                   "ON DUPLICATE KEY UPDATE status = %s", (user_id, subtopic, status, status))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Status updated successfully'}), 200

# Change one of the conflicting GET routes
@app.route('/api/status_by_tech', methods=['GET'])
def get_user_status_by_tech():
    user_id = request.args.get('userId')
    tech = request.args.get('tech')

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT subtopic, status FROM user_status WHERE user_id = %s AND tech = %s", (user_id, tech))
    statuses = cursor.fetchall()
    cursor.close()

    return jsonify(dict(statuses)), 200



if __name__ == '__main__':
    app.run(debug=True, port=5001)


