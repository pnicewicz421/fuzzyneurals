from flask import Flask, render_template, request, url_for, redirect
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', title='FuzzyNeurals - P. Nicewicz')

@app.route('/about')
def about():
    return render_template('about.html', title='About - P. Nicewicz')

@app.route('/projects')
def projects():
    # You could dynamically load project data from a database or JSON file
    projects_data = [
        {'title': 'Project 1', 'description': 'ML application in healthcare'},
        {'title': 'Project 2', 'description': 'GenAI for legal document analysis'},
        # Add more projects
    ]
    return render_template('projects.html', title='Projects', projects=projects_data)

@app.route('/blog')
def blog():
    # Similar to projects, blog posts could be loaded dynamically
    return render_template('blog.html', title='Thought Laboratory')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Process contact form submission
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        # Send email or store message
        return redirect(url_for('thank_you'))
    return render_template('contact.html', title='Neural Connections')

@app.route('/thank-you')
def thank_you():
    return render_template('thank_you.html', title='Message Received')
