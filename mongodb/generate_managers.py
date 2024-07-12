import json

# Load the employees data
with open('employees.json', 'r') as file:
    employees = json.load(file)

# Function to create the manager data
def generate_managers(employees):
    managers = []
    employee_count = len(employees)
    for i, employee in enumerate(employees):
        if i % 3 == 0:  # Example: Every 3rd employee is a manager
            # Create a manager record
            manager = {
                "manager_id": employee["employee_id"],  # Manager's ID is the same as their employee ID
                "name": employee["name"],
                "phone": employee["phone"],
                "job_role": "Manager",
                "work_location": employee["work_location"],
                "salary": round(employee["salary"] * 1.5),  # Managers earn 50% more, rounded to the nearest whole number
                "managed_employees": []  # This will be populated later
            }
            managers.append(manager)
            # Update the employees' managed_by field and the manager's managed_employees field
            for j in range(i + 1, min(i + 4, employee_count)):  # Example: Each manager manages up to 3 employees
                if employees[j]["employee_id"] != manager["manager_id"]:  # Avoid assigning the manager to themselves
                    employees[j]["managed_by"] = manager["manager_id"]
                    manager["managed_employees"].append(employees[j]["employee_id"])
    return managers

# Generate the managers data
managers = generate_managers(employees)

# Save the updated employee data with managed_by fields
with open('employees.json', 'w') as file:
    json.dump(employees, file, indent=4)

# Save the managers data to a JSON file
with open('managers.json', 'w') as file:
    json.dump(managers, file, indent=4)

print("Managers data has been generated and saved to 'managers.json'.")
print("Employee data with 'managed_by' fields has been updated and saved to 'employees.json'.")
