import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from '@src/resolvers/app';

describe(AppResolver.name, () => {
  let appResolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppResolver],
    }).compile();

    appResolver = app.get<AppResolver>(AppResolver);
  });

  describe('appInfo', () => {
    it('should return the app info', () => {
      const expected = 'heyday tech challenge starter';
      expect(appResolver.appInfo()).toBe(expected);
    });
  });
});
