import json
import random
from faker import Faker

# Initialize Faker to generate fake data
fake = Faker()

# Function to generate a uniform US phone number
def generate_us_phone_number():
    return random.randint(1000000000, 9999999999)

# Function to generate a username based on first initial and last name
def generate_username(name):
    parts = name.split()
    if len(parts) >= 2:
        first_initial = parts[0][0].lower()
        last_name = parts[-1].lower()
        return f"{first_initial}{last_name}"
    return name.lower()

# Generate a list of random employees
def generate_employees(num_employees):
    employees = []
    for i in range(num_employees):
        is_male = random.choice([True, False])
        phone_number = generate_us_phone_number()
        name = fake.name_male() if is_male else fake.name_female()
        username = generate_username(name)
        employee = {
            "employee_id": i + 1,  # ID starts from 1
            "name": name,
            "phone": phone_number,
            "job_role": random.choice(['Software Engineer', 'Data Analyst', 'Product Manager', 'Designer', 'HR Specialist']),
            "work_location": random.choice(['New York', 'San Francisco', 'Chicago', 'Austin']),
            "salary": round(random.uniform(50000, 120000)),  # Rounded to the nearest whole number
            "managed_by": None,  # Initially set to None
            "gender": 'male' if is_male else 'female',
            "username": username,
            "password": "mongomonkey"
        }
        employees.append(employee)
    return employees

# Number of employees to generate
num_employees = 50  # Adjust this number as needed

# Generate the employee data
employees = generate_employees(num_employees)

# Initialize lists and dictionary for managing employees
product_managers = [e["employee_id"] for e in employees if e["job_role"] == "Product Manager"]
hr_specialists = {e["employee_id"] for e in employees if e["job_role"] == "HR Specialist"}
manages_map = {pm_id: [] for pm_id in product_managers}

# Assign management relationships
for employee in employees:
    if employee["job_role"] in ['Software Engineer', 'Data Analyst', 'Designer']:
        if product_managers:
            manager_id = random.choice(product_managers)
            employee["managed_by"] = manager_id
            manages_map[manager_id].append(employee["employee_id"])
    elif employee["job_role"] == 'HR Specialist':
        employee["managed_by"] = None

# Update each Product Manager's 'manages' field
for employee in employees:
    if employee["job_role"] == "Product Manager":
        employee["manages"] = manages_map[employee["employee_id"]]
    else:
        employee["manages"] = []

# Save the employee data to a JSON file
with open('employees.json', 'w') as file:
    json.dump(employees, file, indent=4)

print("Employee data has been generated and saved to 'employees.json'.")
