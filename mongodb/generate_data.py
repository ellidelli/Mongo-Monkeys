import json
import random
from faker import Faker

# Initialize Faker to generate fake data
fake = Faker()

# Function to generate a uniform US phone number
def generate_us_phone_number():
    return random.randint(1000000000, 9999999999)


# Generate a list of random employees
def generate_employees(num_employees):
    employees = []
    for i in range(num_employees):
        is_male = random.choice([True, False])
        phone_number = generate_us_phone_number()
        employee = {
            "employee_id": i + 1,  # ID starts from 1
            "name": fake.name_male() if is_male else fake.name_female(),
            "phone": generate_us_phone_number(),
            "job_role": random.choice(['Software Engineer', 'Data Analyst', 'Product Manager', 'Designer', 'HR Specialist']),
            "work_location": random.choice(['New York', 'San Francisco', 'Chicago', 'Austin']),
            "salary": round(random.uniform(50000, 120000)),  # Rounded to the nearest whole number
            "managed_by": None,  # Initially set to None, will be updated by the manager script
            "gender": 'male' if is_male else 'female'
        }
        employees.append(employee)
    return employees

# Number of employees to generate
num_employees = 50  # Adjust this number as needed

# Generate the employee data
employees = generate_employees(num_employees)

# Save the employee data to a JSON file
with open('employees.json', 'w') as file:
    json.dump(employees, file, indent=4)

print("Employee data has been generated and saved to 'employees.json'.")
