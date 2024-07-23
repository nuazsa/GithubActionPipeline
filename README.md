# Github Action Pipline
Automate deploying websites and more with GitHub action.
![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://images.spiceworks.com/wp-content/uploads/2022/04/01113504/74-1.png)

## Commit change
- Any code changes made by the developer will be committed to a version control repository (for example, Git).
``` shell
git add .
git commit -m "Menambahkan fitur baru"
git push origin main
```
## Trigre build
- Set your workflow to run on push events to the main and release/* branches
``` yml
on:
  push:
    branches:
    - main
    - release/*
```
- Set your workflow to run on pull_request events that target the main branch
``` yml
on:
  pull_request:
    branches:
    - main
```
- Set your workflow to run every day of the week from Monday to Friday at 2:00 UTC
``` yml
on:
  schedule:
  - cron: "0 2 * * 1-5"
```
- Manually running a workflow
``` yml
on:
  workflow_dispatch:
```
For more information, see "[Events that trigger workflows.](https://docs.github.com/en/actions/using-workflows#manually-running-a-workflow)"
## Build
- The build process will compile, configure, or prepare the code to run.
  - Installing dependencies.
  - Compile code.
  - Create build artifacts.
``` yml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Build the project
      run: npm run build
```
## Notify of build outcome
``` yml
    - name: Notify build outcome
      if: failure()
      uses: rtCamp/action-slack-notify@v2.1.3
      with:
        webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
        message: "Build failed for commit ${{ github.sha }}."
```
``` yml
    - name: Notify build success
      if: success()
      uses: rtCamp/action-slack-notify@v2.1.3
      with:
        webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
        message: "Build succeeded for commit ${{ github.sha }}."
```
## Run test 
- Run a series of tests to ensure that the built code functions correctly.
``` yml
    - name: Run tests
      run: npm test
```
## Notify of test outcome
``` yml
    - name: Notify test outcome
      if: failure()
      uses: rtCamp/action-slack-notify@v2.1.3
      with:
        webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
        message: "Tests failed for commit ${{ github.sha }}."
```
``` yml
    - name: Notify test success
      if: success()
      uses: rtCamp/action-slack-notify@v2.1.3
      with:
        webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
        message: "Tests succeeded for commit ${{ github.sha }}."
```
## Delivery build to environment
- Send builds that have passed testing to a staging or production environment.
``` yml
    - name: Deploy to staging
      uses: easingthemes/ssh-deploy@v2.1.5
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        ARGS: "-rltgoDzvO --delete"
        SOURCE: "dist/"
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: "/var/www/html"
```
### FTP
``` yml
on: push
name: Deploy website on push
jobs:
  web-deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
    - name: Get latest code
      uses: actions/checkout@v4
    
    - name: Sync files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.5
      with:
        server: ftp.samkirkland.com
        username: myFtpUserName
        password: ${{ secrets.ftp_password }}
```
[View full Marketplace listing](https://github.com/marketplace/actions/ftp-deploy)

## Deploy where neccessary
- Run deployments to production servers or other environments as needed.
``` yml
    - name: Deploy to production
      if: github.ref == 'refs/heads/main'
      uses: easingthemes/ssh-deploy@v2.1.5
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        ARGS: "-rltgoDzvO --delete"
        SOURCE: "dist/"
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: "/var/www/html"
```

