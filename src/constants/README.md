# Constants Folder

This folder contains constants and type definitions used throughout the application. It helps in managing and using fixed values and types consistently across the application.

## Overview

- **app.constants.ts**: This is the main file in this folder. It includes definitions for various entities such as skills and genders, along with their respective types and constant values.

### Details

#### Skills

- **Type**: `Skill`
  - `name`: string - The name of the skill.
  - `color`: string - A string representing the color associated with the skill.
  - `id`: number - A unique identifier for the skill.

- **Constant Array**: `SKILLS`
  - An array of `Skill` objects representing different skills like 'Alpha Caller', 'Collab Manager', etc.

- **Type**: `SkillNames`
  - Derived from `SKILLS`, it represents the type for skill names.

- **Type**: `SkillIds`
  - Derived from `SKILLS`, it represents the type for skill IDs.

#### Genders

- **Type**: `Gender`
  - `name`: string - The name of the gender.
  - `id`: number - A unique identifier for the gender.

- **Constant Array**: `GENDERS`
  - An array of `Gender` objects representing different genders like 'Male', 'Female', 'Other', etc.

- **Type**: `GenderNames`
  - Derived from `GENDERS`, it represents the type for gender names.

### Utility Constants

- **SEARCH_PAGE_SIZE**
  - Represents the number of items to be displayed per page in search results, set to 10.

## Usage

These constants and types are used throughout the application to ensure consistency in the data handling and UI representation. For example, skill and gender types are used in forms, filters, and display components.

## Maintenance

When updating or adding new constants:
1. Ensure that the type definitions are updated accordingly.
2. Maintain the naming convention and structure for readability and ease of use.
3. Update the README if the changes are significant to keep the documentation in sync with the codebase.