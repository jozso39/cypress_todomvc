# Work example

<p align="center">
<img src="https://www.productboard.com/wp-content/themes/productboard/public/images/logo-pb-small.svg">
</p>

This is an assignment result I was doing when applying to work at productboard. Unfortunately I didn't get the job but I think this work represents what I can do and how. 

The assignment was: create automated e2e tests for todoMVC app. I created 2 and a half of solutions. 2 being 2 different test specs. One is complex spec `todomvc_show-off_spec` to show off my skills and the second one is a robust solution `todomvc_solid_spec`.

## Cypress show-off test

This test is more flexible, you can play with its fixture data in `fixtures/data.json` by adding or removing tasks and setting how many tasks should get completed (`completedCount` has to be higher than total number of tasks minus 1). During the test, random tasks are chosen to get completed and 1 random task is deleted.

This test will run differently every time, but has always the same high test coverage.

Unfortunately, it goes against Cypress best practices by using backflips (creating variables on wider scope to change them on narrower scope, so it could be accessed again). Some of these backflips can be replaced by properly using aliases, but the tests would look less readable for me.

I also created some custom commands so I wouldnt repeat myself too often and make the tests again a bit more readable.

## Cypress solid test

This test is different from the show-off one, it will always run the same way and it has less logic in it. This test is a good candidate for applying visual testing using Applitools Eyes or Percy.io that would test the visual side of the app. I can do that as well, but I don't think it would be worth the time to do it on such a small app, so you just gonna have to trust me on that.

It doesnt use any backflips and I belive it is in line with Cypress best practices.

## In-browser conditional automation

I added some code into `src/index.js` to demonstrate this method of mine, that can make it easier to test a web app manually. It is very usefull for multi-step forms, login pages and multi-page applications.

It doesnt have much impact on this todoMVC app though. Here, it works more like a keyboard shortcut upgrade of the page. To see the avalible shortcuts, press `CTRL+ALT+F2` while you have focus anywhere on the page. (the shortcut is different for Mac, sorry, I dont know what it is...)

The code doesnt modify the page and it doesnt do anything until some of the keyboard shortcut are pressed. Also this can be used without changing `index.js` or any app files, the usual way is using a browser extention.

---

## Prerequisites

Install Node.js, instructions [here](https://nodejs.org/en/download/)

Install yarn, instructions [here](https://yarnpkg.com/lang/en/docs/install/)

## Available Scripts

In the project directory, you can run:

### `yarn`

Installs dependencies into your project

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn cypress:open`

Opens Cypress GUI app

### `yarn cypress:run`

Runs Cypress tests in headless mode

