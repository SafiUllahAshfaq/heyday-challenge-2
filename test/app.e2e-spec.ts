import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getApolloServer } from '@nestjs/graphql';
import { gql } from '@apollo/client';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { ApolloServerBase } from 'apollo-server-core';

import { AppModule } from '@src/app.module';

describe('GraphQL', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let apolloServer: ApolloServerBase;
  let apolloClient: ApolloServerTestClient;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    apolloServer = getApolloServer(testingModule);
    apolloClient = createTestClient(apolloServer);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/graphql query.appInfo', () => {
    const query = gql`
      query AppInfo {
        appInfo
      }
    `;

    it('returns the app info', async () => {
      const expectedResult = {
        appInfo: 'heyday tech challenge starter',
      };

      const response = await apolloClient.query({ query });

      expect(response.data).toEqual(expectedResult);
    });
  });
});
