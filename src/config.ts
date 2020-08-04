
const config = {
    server: {
      port: process.env.PORT || 3000,
      name: 'Hierarchy-Service',
    },
    db: {
      connectionString: `mongodb://${process.env.DB_SERVER || 'localhost:27017/'}${process.env.DB_NAME || 'HierarchyDB'}${
        process.env.DB_REPLICA_NAME ? `?replicaSet=${process.env.DB_REPLICA_NAME}` : ''
      }`,
      port: process.env.DB_PORT || 27017,
    },
    env: {
      prod: 'production',
      dev: 'development',
    },
    endpoints: {
      kartoffelAPI: {
        baseURL:
            process.env.KARTOFFEL_API ||
            'http://kartoffel-master.eastus.cloudapp.azure.com:3001/api'
      },
    },
  };
  
  export default config;