import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BugsFormPage } from '../page/BugFormPage';
import { pageFixture } from '../../hooks/pageFixture';

let bugsForm: BugsFormPage;

Given('the user is on the bugs form page', async function () {
  
  bugsForm = new BugsFormPage(pageFixture.page);
  bugsForm.navigate();
  //bugsForm = new BugsFormPage(pageFixture.page);
});


When('the user enters {string} as First Name', async function (firstName: string) {
  bugsForm.enterFirstName(firstName);
});


When('the user enters {string} as Last Name', async function (lastName: string) {
  bugsForm.enterLastName(lastName);
});


When('the user enters {string} as Phone number', async function (phoneNumber: string) {
  bugsForm.enterPhone(phoneNumber);
});

When('the user selects {string} as Country', async function (country: string) {
  bugsForm.selectCountry(country);
});


When('the user enters {string} as Email', async function (email: string) {
  bugsForm.enterEmail(email);
});



When('the user enters {string} as Password', async function (password: string) {
  bugsForm.enterPassword(password);
});


When('the user accepts the terms and conditions', async function () {
  bugsForm.acceptTerms();
});

When('the user does not accept the terms and conditions', async function () {
  console.log('User did not accept terms and conditions');
});


When('the user clicks the Register button', async function () {
  bugsForm.submitForm();
});


Then('the registration should be successful', async function () {

  const successMessage = await bugsForm.getAlertMessage();
  expect(successMessage).toContain('Successfully registered the following information');
});




Then('validation messages should be displayed for required fields', async function () {

  const successMessage = await bugsForm.getAlertMessage();
  expect(successMessage).toContain('The email address is not valid');
  expect(successMessage).toContain('The password should contain between [6,20] characters');
  expect(successMessage).toContain('The phone number should contain at least 10 characters');
  expect(successMessage).toContain('The last name should contain at least 1 characters');
  expect(successMessage).toContain('Please Select a Country');
});





Then('an error message for invalid phone number should be displayed', async function () {

  const successMessage = await bugsForm.getAlertMessage();
  expect(successMessage).toContain('The phone number should contain at least 10 characters');
});


Then('an error message for invalid email address should be displayed', async function () {
  bugsForm.waitForAlert();
  const successMessage = await bugsForm.getAlertMessage();
  expect(successMessage).toContain('The email address is not valid');
});


Then('an error message for invalid password should be displayed', async function () {

  const successMessage = await bugsForm.getAlertMessage();
  expect(successMessage).toContain('The password should contain between [6,20] characters');
});


When('the user fills all valid fields except Country', async function () {

  bugsForm.enterFirstName("Adam");
  bugsForm.enterLastName("Smith");
  bugsForm.enterPhone("0212345678");
  // Country not selected
  bugsForm.enterEmail("adam.smith@test.com");
  bugsForm.enterPassword("1234567890");

});



Then('an error message prompting country selection should be displayed', async function () {

  const successMessage = await bugsForm.getAlertMessage();
  expect(successMessage).toContain('Please Select a Country');

});



When('the user fills all valid fields', async function () {
  await bugsForm.fillValidForm({
    firstName: 'Adam',
    lastName: 'Smith',
    phone: '0212345678',
    country: 'New Zealand',
    email: 'Adam.Smith@test.com',
    password: '1234567890',

  });
});



Then('an error message for terms and conditions should be displayed', async function () {
  const successMessage = await bugsForm.getAlertMessage();
  expect(successMessage).toContain('The Terms and Conditions should be accepted');
});




When('the user enters an invalid Email', async function (email: string) {

  bugsForm.enterEmail(email);
});

When('the user enters a short Password', async function (password: string) {
  bugsForm.enterPassword(password);
});

When('the user leaves mandatory fields empty', async function () {
  await bugsForm.fillValidForm({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    email: '',
    password: '',

  });
});

const expectedErrors = [
  'The email address is not valid',
  'The password should contain between [6,20] characters',
  'The phone number should contain at least 10 characters',
  'Please Select a Country',
  'First name is required.',
  'Last name is required.'
];

Then('multiple validation error messages should be displayed', async function () {
  const successMessage = await bugsForm.getAlertMessage();
  await expectedErrors.forEach(async (error) => {
    expect(successMessage).toContain(error);
  });
});

Then('the registration should not be successful', async function () {
  const successMessage = await bugsForm.getAlertMessage();
  expect(successMessage).not.toContain('Successfully registered');
});

