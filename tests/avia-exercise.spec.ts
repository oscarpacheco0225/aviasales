import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage';
import ResultsPage from '../pages/resultsPage';
import * as data from '../data/flight_data.json';


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
      await homePage.setParams(data.departureAirport, data.destinationAirport, data.departureDateInt, data.passengersAdults, data.returnDate, data.class);
      await homePage.submitSearch(); // also disables checkbox that opens a new tab
    });
    await test.step('Validate results page is correctly opened and entered data is retained and displayed on the results', async () => {
      await page.waitForLoadState('load'); // waits for page to be loaded
      await expect(page.url()).toContain('/search/'); // validate results page is correctly opened
      await expect(await resultsPage.fromCityField.getAttribute('value')).toContain(data.departureAirportFullName);
      await expect(await resultsPage.toCityField.getAttribute('value')).toContain(data.destinationAirportFullName);
      await expect(await resultsPage.departDateField.getAttribute('value')).toContain(data.fullDepartureDate);
      await expect(resultsPage.passengersLabel).toHaveText(data.passengersAdults + data.passengersChilden + data.passengersInfants + " passengers");
      await expect(resultsPage.classLabel).toHaveText(data.classEmpty);
      await expect(resultsPage.firstResultDepCityLabel).toHaveText(data.departureCity);
      await expect(resultsPage.firstResultDestAirportLabel).toHaveText(data.destinationAirport);
      await expect(resultsPage.firstResultDepAirportLabel).toHaveText(data.departureAirport);
      await expect(resultsPage.nightThemeOn).toBeEnabled(); // validate night theme is still enabled
    });
  })
});