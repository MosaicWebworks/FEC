# GIT Collaborative Workflow:
## Working on a Single Repository (No Forks):

### Initial Setup:
1. Clone the Repository:
Clone the main repository to your local machine.

### Sync with the Main Repository:
1. Checkout the Main Branch:
- git checkout main
This ensures you're working off the latest version.

2. Pull the Latest Changes:
- git pull
Always pull the latest changes from the main branch before starting new work to avoid conflicts later.

### Feature Development:
1. Create a Feature Branch:
- git checkout -b feature/FEATURE_NAME
Always work on a new branch for each feature or module(A feature per ticket). This keeps work isolated and organized.

2. Coding:
- git add .
- git commit -m "Detailed description of the changes made."
Make your code changes. Remember to frequently commit your changes with meaningful commit messages.

3. Push the Feature Branch to the Main Repository:
- git push -u origin feature/FEATURE_NAME
Once the feature is complete and tested locally, push your branch to the main repository.

### Create a Pull Request (PR):
1. Navigate to the Main Repository on GitHub
2. Initiate a Pull Request
3. Request Reviews by inviting reviewers

### Code Review & Merging:
1. Reviewing
2. Merging:
Once the PR is approved, it gets merged into the main branch.

### Syncing Post-Merge:
1. Checkout Main & Pull:
- git checkout main
- git pull
After your feature has been merged, or when any other feature is merged, ensure you sync your local main branch.


