import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailAdapter } from './ext-api/email.adapter';
import { fetchBody } from './templates/templates';

describe('AppController', () => {
  let appController: AppController;
  let mockEmailAdapter;
  beforeEach(async () => {
    mockEmailAdapter = {
      sendMail: jest.fn(() => ({ sent: true })),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: EmailAdapter,
          useValue: mockEmailAdapter,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(
        await appController.sendEmail({
          templateId: 'login',
          subject: 'login',
          to: '2@a.com',
          dictionary: {
            userName: 'tony stark',
            validationUrl: 'https://domain.com/validate?token=3423423432',
          },
        }),
      ).toEqual({
        sent: true,
      });
      expect(mockEmailAdapter.sendMail).toHaveBeenCalledWith({
        from: 'noreply@bitbank.com',
        subject: 'login',
        to: '2@a.com',
        emailBody: fetchBody({
          templateId: 'login',
          dictionary: {
            userName: 'tony stark',
            validationUrl: 'https://domain.com/validate?token=3423423432',
          },
        }),
      });
    });
  });
});
