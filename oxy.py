import json
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# Load the data from the JSON file
with open('oxy.json') as f:
    data = json.load(f)['OXY']

# Create dictionaries to store the start times for each user by date
louise_times = {}
marie_times = {}

# Loop through the data and extract the start times for each user by date
for user in data:
    for timestamp in data[user]:
        date_str = timestamp.split('T')[0]
        if user == 'Louise':
            if date_str in louise_times:
                louise_times[date_str] += 1
            else:
                louise_times[date_str] = 1
        elif user == 'Marie':
            if date_str in marie_times:
                marie_times[date_str] += 1
            else:
                marie_times[date_str] = 1

# Create lists to store the x-axis labels and the y-axis values for each user
dates = []
louise_values = []
marie_values = []

# Loop through the start times for each user by date and append the data to the lists
start_date = datetime.now().date()
end_date = start_date

for date_str in sorted(set(louise_times.keys()) | set(marie_times.keys())):
    date = datetime.strptime(date_str, '%Y-%m-%d').date()
    if date > end_date:
        end_date = date
    dates.append(date_str)
    louise_values.append(louise_times.get(date_str, 0))
    marie_values.append(marie_times.get(date_str, 0))

# Set the x-axis range to start from the first date and end at the maximum date
x_min = datetime.strptime(dates[0], '%Y-%m-%d').date()
x_max = end_date
x_range = x_max - x_min

# Plot the data as a bar chart
plt.bar(dates, louise_values, label='Louise')
plt.bar(dates, marie_values, bottom=louise_values, label='Marie')

# Set the x-axis and y-axis labels and the chart title
plt.xlabel('Date')
plt.ylabel('Number of System Starts')
plt.title('System Starts by Date')

# Set the x-axis ticks to show every day
plt.xticks(dates)

# Rotate the x-axis labels by 90 degrees to make them easier to read
plt.xticks(rotation=90)

# Set the y-axis range to start from 0 and end at the maximum value
y_max = max(louise_values) + max(marie_values)
plt.ylim(0, y_max)

# Display the legend and show the chart
plt.legend()

plt.savefig('plot.png')


