import json
import random
from faker import Faker

# Initialize Faker to generate fake data
fake = Faker()

# Function to generate a uniform US phone number
def generate_us_phone_number():
    return random.randint(1000000000, 9999999999)

# Function to generate salary based on job role and work location
def generate_salary(job_role, work_location):
    # Define base salaries for each job role
    base_salaries = {
        'Software Engineer': 110000,
        'Data Analyst': 80000,
        'Product Manager': 120000,
        'Designer': 90000,
        'HR Specialist': 60000
    }
    
    # Define location factors (multipliers) for adjusting base salaries
    location_factors = {
        'New York': 1.2,
        'San Francisco': 1.15,
        'Chicago': 0.9,
        'Austin': 0.95
    }
    
    # Apply location factor to adjust base salary based on work location
    base_salary = base_salaries.get(job_role, 80000)  # Default to 80000 if job_role not found
    location_factor = location_factors.get(work_location, 1.0)  # Default to 1.0 if work_location not found
    
    adjusted_salary = base_salary * location_factor
    
    # Add some variability to the salary to make it more realistic
    variability = random.uniform(-2000, 2000)  # Randomly adjust by ±$5000
    final_salary = round(adjusted_salary + variability)
    
    return max(final_salary, 50000)  # Ensure salary is not below $50,000

# Generate a list of random employees
def generate_employees(num_employees):
    employees = []
    job_roles = ['Software Engineer', 'Data Analyst', 'Product Manager', 'Designer', 'HR Specialist']
    work_locations = ['New York', 'San Francisco', 'Chicago', 'Austin']
    
    for i in range(num_employees):
        phone_number = generate_us_phone_number()
        job_role = random.choice(job_roles)
        work_location = random.choice(work_locations)
        salary = generate_salary(job_role, work_location)
        
        employee = {
            "employee_id": i + 1,  # ID starts from 1
            "name": fake.name(),
            "phone": phone_number,
            "job_role": job_role,
            "work_location": work_location,
            "salary": salary,
            "managed_by": None,  # Initially set to None, will be updated by the manager script
        }
        employees.append(employee)
    
    return employees

# Number of employees to generate
num_employees = 1000  # Adjust this number as needed

# Generate the employee data
employees = generate_employees(num_employees)

# Save the employee data to a JSON file
with open('employees.json', 'w') as file:
    json.dump(employees, file, indent=4)

print("Employee data has been generated and saved to 'employees.json'.")
