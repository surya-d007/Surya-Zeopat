# Projects Overview

This repository contains two applications:

1. **Rule Engine Application**: A 3-tier rule engine to determine user eligibility based on attributes using an Abstract Syntax Tree (AST).
2. **Weather Monitoring System**: A real-time data processing system that monitors weather conditions and provides summarized insights.


---

## Rule Engine Application

### Objective
Develop a rule engine to determine user eligibility based on various attributes. The system utilizes an Abstract Syntax Tree (AST) to represent and manage rules dynamically.

### Data Structure
- **Node**: Represents the components of the AST.
  - `type`: String indicating node type ("operator" or "operand").
  - `left`: Reference to the left child node.
  - `right`: Reference to the right child node.
  - `value`: Optional value for operand nodes.

### Sample Rules
- `rule1`: `"((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"`
- `rule2`: `"((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"`

### API Design
1. **create_rule(rule_string)**: Creates a Node object from a rule string.
2. **combine_rules(rules)**: Combines multiple rules into a single AST.
3. **evaluate_rule(data)**: Evaluates the AST against provided user attributes.

### Test Cases
- Validate individual rules and their AST representations.
- Combine rules and check resulting AST.
- Evaluate rules against sample JSON data.

### Bonus Features
- Error handling for invalid rule strings.
- Validation for attributes.
- Modifications of existing rules.
- Support for user-defined functions.

---

## Weather Monitoring System

### Objective
Develop a system to continuously monitor weather conditions and provide summarized insights using rollups and aggregates, utilizing data from the OpenWeatherMap API.

### Data Source
Continuous retrieval of weather data for metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad) via the OpenWeatherMap API.

### Processing and Analysis
- Retrieve real-time weather data at configurable intervals.
- Convert temperatures from Kelvin to Celsius.

### Rollups and Aggregates
1. **Daily Weather Summary**: Calculate averages, maximums, minimums, and dominant conditions for daily weather.
2. **Alerting Thresholds**: User-defined thresholds for alerts based on temperature or conditions.
3. **Visualizations**: Display daily summaries, historical trends, and alerts.

### Test Cases
- Verify system connectivity to OpenWeatherMap API.
- Simulate API calls and ensure data retrieval.
- Validate daily weather summaries and alerts.

### Bonus Features
- Support for additional weather parameters (humidity, wind speed).
- Implement weather forecasts and summaries.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version X.X.X)
- [OpenWeatherMap API Key](https://openweathermap.org/api)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

For Rule Engine Application:

Navigate to the backend folder:

bash
Copy code
cd rule-engine-app/backend
Install dependencies:

bash
Copy code
npm install
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
For Weather Monitoring System:

Navigate to the backend folder:

bash
Copy code
cd weather-monitoring-system/backend
Install dependencies:

bash
Copy code
npm install
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Running the Applications
Rule Engine Application:

Start the backend:
bash
Copy code
cd rule-engine-app/backend
npm start
Start the frontend:
bash
Copy code
cd ../frontend
npm start
Weather Monitoring System:

Start the backend:
bash
Copy code
cd weather-monitoring-system/backend
npm start
Start the frontend:
bash
Copy code
cd ../frontend
npm start
Contributing
Contributions are welcome! Please create an issue or submit a pull request for improvements or new features.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
OpenWeatherMap API for weather data.
Any other libraries, frameworks, or tools used in the project.
markdown
Copy code

### How to Use This Template
1. **Copy and Paste**: Copy the entire code block above and paste it into your `README.md` file.
2. **Modify as Necessary**: Replace placeholders (like `<repository-url>`, `<repository-folder>`, etc.) with actual values relevant to your projects.
3. **Save the File**: Once you've made any necessary modifications, save the `README.md` file.

This should maintain the formatting when viewed on GitHub or any Markdown viewer!


