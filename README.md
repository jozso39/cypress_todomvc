# Assignment complete!

<p align="center">
<img src="https://www.productboard.com/wp-content/themes/productboard/public/images/logo-pb-small.svg">
</p>

Since you asked to get impressed, I made two tests using Cypress and worked with the index.js file of the page to lightly demonstrate my in-browser conditional automation method.

I don't know the practices you use in ProductBoard about using Cypress, so I created one complex spec `todomvc_show-off_spec` to show off and one robust test `todomvc_solid_spec`.

## Cypress show-off test

This test is more flexible, you can play with its fixture data in `fixtures/data.json` by adding or removing tasks and setting how many tasks should get completed (`completedCount` has to be higher than total number of tasks minus 1). During the test, random tasks are chosen to get completed and 1 random task is deleted.

This test will run differently every time, but has always the same high test coverage.

Unfortunately, it goes against Cypress best practices by using backflips (creating variables on wider scope to change them on narrower scope, so it could be accessed again). Some of these backflips can be replaced by properly using aliases, but the tests would look less readable for me.

I also created some custom commands so I wouldnt repeat myself too often and make the tests again a bit more readable.

## Cypress solid test

This test is different from the show-off one, it will always run the same way and it has less logic in it. This test is a good candidate for applying visual testing using Applitools Eyes or Percy.io that would test the visual side of the app. I can do that as well, but I dont think it would be worth the time to do it on such a small app, so you just gonna have to trust me on that.

It doesnt use any backflips and I belive it is in line with Cypress best practices.

## In-browser conditional automation

I added some code into `src/index.js` to demonstrate this method of mine, that can make it easier to test a web app manually. It is very usefull for multi-step forms, login pages and multi-page applications.

It doesnt have much impact on this todoMVC app though. Here, it works more like a keyboard shortcut upgrade of the page. To see the avalible shortcuts, press `CTRL+ALT+F1` while you have focus anywhere on the page. (the shortcut is different for Mac, sorry, I dont know what it is...)

The code doesnt modify the page and it doesnt do anything until some of the keyboard shortcut are pressed. Also this can be used without changing `index.js` or any app files, the usual way is using a browser extention.

---

I hope you can give me feedback on these tests and find errors I made. I would like to know the differences between ProductBoard test-writing metodologies and mine.

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
