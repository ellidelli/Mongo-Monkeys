from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load the saved model
with open('salary_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Endpoint to predict salary
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Extract job role and work location from JSON input
    job_role = data['job_role']
    work_location = data['work_location']

    setup = {'job_role_Data Analyst': [False], 'job_role_Designer': [False], 'job_role_HR Specialist': [False],
       'job_role_Product Manager': [False], 'job_role_Software Engineer': [False],
       'work_location_Austin': [False], 'work_location_Chicago': [False],
       'work_location_New York': [False], 'work_location_San Francisco': [False]}

    # Create a DataFrame with expected columns
    input_data = pd.DataFrame.from_dict(setup)

    # Set the values based on the JSON input
    input_data.loc[0, 'job_role_' + job_role] = True
    input_data.loc[0, 'work_location_' + work_location] = True

    # Perform prediction using the loaded model from pickle
    prediction = model.predict(input_data)
    print(prediction)

    # Return the predicted salary as JSON response
    return jsonify({'predicted_salary': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
