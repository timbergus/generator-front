describe('Demo home page', function() {
    it('should be loaded.', function() {
        browser.get('http://localhost:9000/app/#/home');
        expect(element(by.id('home_contents')).isPresent()).toBe(true);
    });
});