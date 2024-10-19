# ParkMate

A parking management system designed to track and manage vehicle parking operations efficiently. The system supports data persistence using either Firebase (for advanced use) or Local Storage (for basic use). It allows users to input vehicle information, track parking status, calculate charges, and visualize data via a dashboard.

## Tech Stack

- **Frontend**: HTML, TailwindCSS, TypeScript, NextJS, Redux.
- **Database**: JSON server.

## UI
![image](https://github.com/user-attachments/assets/1827455c-0fa1-47f5-bdd2-463f3aae12a6)
![image](https://github.com/user-attachments/assets/77fe433d-ae8c-464c-a9da-169cb676fb6f)
![image](https://github.com/user-attachments/assets/5d6294a2-65ad-4a96-ab56-40623917dd9e)


## Features

- **Vehicle Information Form**: Capture details including:

  - Vehicle License Number
  - Vehicle Type (Microbus, Car, Truck)
  - Vehicle Owner Name
  - Vehicle Owner Phone
  - Status (In/Out)
  - Car Owner Address
  - Time and Date of Entry
  - Time and Date of Exit
  - Parking Charges (based on vehicle type)

- **Data Table**: Displays a list of parked vehicles with the following columns:

  - Owner Name
  - Vehicle Type
  - License Number
  - Entry Time
  - Exit Time
  - Status
  - Edit option to update vehicle exit details

- **Dashboard**:
  - Date filter (default to today's information)
  - Total Cars Parked
  - Total Empty Slots
  - Vehicle Type Breakdown (number of each type of vehicle)
  - A card showing vehicles parked for more than two hours

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/parkmate.git
   cd parkmate
   ```
