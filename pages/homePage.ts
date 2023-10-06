import { Page } from "@playwright/test";
export default class HomePage {

    constructor(public page: Page) {
    }

    //Locators
    readonly themeSwitch = this.page.locator('[data-test-id="switch"] span').first();
    readonly nightThemeOn = this.page.locator('.--night');
    readonly fromCityField = this.page.locator("//*[@data-test-id='origin-autocomplete-field']");
    readonly toCityField = this.page.locator('[data-test-id="destination-autocomplete-field"]');
    readonly departDateField = this.page.locator('[data-test-id="departure-date-field"]');
    readonly noReturnTicketBtn = this.page.locator('[data-test-id="no-return-ticket"]');
    readonly searchFlightBtn = this.page.locator('.form-submit');
    readonly newTabChkbx = this.page.getByText('Open Booking.com in a new tab');

    //Functions
    async goToHomePage() {
        await this.page.goto('https://www.aviasales.com/');
    }

    async switchTheme() {
        this.themeSwitch.click();
    }

    async setParams(departure, destination, departureDate, passengers, returnDate?, type?) {
        let param: String;
        param = `${departure}${departureDate}${destination}${returnDate}${type}${passengers}`;
        await this.page.goto(`https://www.aviasales.com/?params=${param}`);
    }

    async submitSearch() {
        let newTab = await this.newTabChkbx.isChecked();
        if (newTab) {
            await this.newTabChkbx.click();
        }
        await this.searchFlightBtn.click();
    }
}