import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage';
import ResultsPage from '../pages/resultsPage';


test.describe('Avia Sales testing excercise', () => {

  test('New search page page is opened and entered data is retained', async ({ page }) => {
    let homePage = new HomePage(page);
    let resultsPage = new ResultsPage(page);

    await test.step('Navigate to home page', async () => {
      await homePage.goToHomePage();
    });

    await test.step('Switch to night theme', async () => {
      await homePage.switchTheme();
    });

    await test.step('Search for a no-return ticket from NYC to Berlin, date: 30 of October, 2 passengers, economy class', async () => {
      await homePage.setParams("JFK", 'BER', '3010', '2', '', '');
      await homePage.submitSearch(); // also disables checkbox that opens a new tab
    });
    await test.step('Validate results page is correctly opened and entered data is retained and displayed on the results', async () => {
      await page.waitForLoadState('load'); // waits for page to be loaded
      await expect(page.url()).toContain('/search/'); // validate results page is correctly opened
      await expect(await resultsPage.fromCityField.getAttribute('value')).toContain('John F. Kennedy International Airport');
      await expect(await resultsPage.toCityField.getAttribute('value')).toContain('Berlin');
      await expect(await resultsPage.departDateField.getAttribute('value')).toContain('Mon');
      await expect(resultsPage.passengersLabel).toHaveText("2 passengers");
      await expect(resultsPage.classLabel).toHaveText("economy");
      await expect(resultsPage.firstResultDepCityLabel).toHaveText("New York");
      await expect(resultsPage.firstResultDestAirportLabel).toHaveText("BER");
      await expect(resultsPage.firstResultDepAirportLabel).toHaveText("JFK");
      await expect(resultsPage.nightThemeOn).toBeEnabled(); // validate night theme is still enabled
    });
  })
});