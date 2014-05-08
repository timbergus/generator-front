describe('E2E: login page', function() {
    var ptor;

    beforeEach(function() {
        browser.get('http://localhost/m2m/');
        ptor = protractor.getInstance();
    });

    it('when accessing, the login page should be load.', function() {
        var ele = by.id('login-form');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    it('when submitting the credentials we must go to the main page', function() {
        element(by.input('userData.email')).sendKeys('timbergus@gmail.com');
        element(by.input('userData.password')).sendKeys('12345\n');
        expect(ptor.isElementPresent(by.id('login-form'))).toBe(false);
    });

    it('when clicking in forget password we must go to forgot page.', function() {
        element(by.id('forget-password')).click();
        expect(ptor.getCurrentUrl()).toMatch(/\/forgot/);
    });

    it('when clicking in the register we must go to the register page.', function() {
        element(by.id('register-btn')).click();
        expect(ptor.getCurrentUrl()).toMatch(/\/register/);
    });
});

describe('E2E: forgot password page', function() {
    beforeEach(function() {
        browser.get('http://localhost/m2m/');
        element(by.id('forget-password')).click();
        ptor = protractor.getInstance();
    });

    it('when submitting the email the forgot page must disappear.', function() {
        element(by.input('recoverEmail.email')).sendKeys('timbergus@gmail.com\n');
        expect(ptor.isElementPresent(by.id('forgetForm'))).toBe(false);
        expect(ptor.getCurrentUrl()).toMatch(/\/advise/);
    });
});

describe('E2E: register page', function() {
    beforeEach(function() {
        browser.get('http://localhost/m2m/');
        element(by.id('register-btn')).click();
        ptor = protractor.getInstance();
    });

    it('when register with the same mail we must stay on the page.', function() {
        element(by.input('userData.name')).sendKeys('Gustavo');
        element(by.input('userData.surname')).sendKeys('Muñoz');
        element(by.input('userData.email')).sendKeys('timbergus@gmail.com');
        element(by.input('password')).sendKeys('12345');
        element(by.input('rpassword')).sendKeys('12345\n');

        expect(ptor.isElementPresent(by.id('registerForm'))).toBe(true);
    });
});

describe('E2E: recover password page', function() {
    beforeEach(function() {
        browser.get('http://localhost/m2m/#/recover');
        ptor = protractor.getInstance();
    });

    it('when submitting the new password we must stay because the link is not active.', function() {
        element(by.input('password')).sendKeys('12345');
        element(by.input('rpassword')).sendKeys('12345\n');

        expect(ptor.isElementPresent(by.id('recover-form'))).toBe(true);
    });
});

describe('E2E: resend link page', function() {
    beforeEach(function() {
        browser.get('http://localhost/m2m/#/resend');
        ptor = protractor.getInstance();
    });

    it('when submitting the email we must stay because the link is not active.', function() {
        element(by.input('emailToActivate')).sendKeys('timbergus@gmail.com\n');

        expect(ptor.isElementPresent(by.id('resendForm'))).toBe(true);
    });
});

describe('E2E: dashboard page', function() {
    var ptor;

    beforeEach(function() {
        browser.get('http://localhost/m2m/app');
        ptor = protractor.getInstance();
    });

    it('the dashboard page must have a graphic.', function() {
        var ele = by.id('devicesLink');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    it('when clicking on devices we must go to devices page.', function() {
        element(by.id('devicesLink')).click();
        expect(ptor.getCurrentUrl()).toMatch(/\/devices/);
    });
});