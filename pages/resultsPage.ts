import { Page } from "@playwright/test";
export default class ResultsPage {

    constructor(public page: Page) {
    }

    //Locators
    readonly themeSwitch = this.page.locator('[data-test-id="switch"] span').first();
    readonly nightThemeOn = this.page.locator('.--night');
    readonly fromCityField = this.page.locator("//*[@data-test-id='origin-autocomplete-field']");
    readonly toCityField = this.page.locator('[data-test-id="destination-autocomplete-field"]');
    readonly departDateField = this.page.locator("//*[@data-test-id='departure-date-field']//*[@data-test-id='departure-date-input']");
    readonly noReturnTicketBtn = this.page.locator('[data-test-id="no-return-ticket"]');
    readonly searchFlightBtn = this.page.locator('.form-submit');
    readonly newTabChkbx = this.page.getByText('Open Booking.com in a new tab');

    readonly passengersLabel = this.page.locator("//*[@class='additional-fields__label']");
    readonly classLabel = this.page.locator("//*[@class='additional-fields__label --is-gray']");
    readonly firstResultDepCityLabel = this.page.locator('.segment-route__city').first();
    readonly firstResultDepAirportLabel = this.page.locator('.segment-route__path-endpoint-iata').first();
    readonly firstResultDestAirportLabel = this.page.locator('div:nth-child(5) > .segment-route__path-endpoint-iata').first();

}