import { DevoritePage } from './app.po';

describe('devorite App', function() {
  let page: DevoritePage;

  beforeEach(() => {
    page = new DevoritePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
