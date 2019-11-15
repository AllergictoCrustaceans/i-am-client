export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: 'Global',
      BUCKET: 's3-test-bucketname'
    },
    apiGateway: {
      REGION: 'us-west-2',
      URL: 'https://g0lz39q0ig.execute-api.us-west-2.amazonaws.com/dev'
    },
    cognito: {
      REGION: 'us-west-2',
      USER_POOL_ID: 'us-west-2_DiRBNYqcZ',
      APP_CLIENT_ID: '3n6nh5mrjn12mdjq1plq7536om',
      IDENTITY_POOL_ID: 'us-west-2:6d560606-abea-4db9-abbe-54eea2a84350'
    }
  };