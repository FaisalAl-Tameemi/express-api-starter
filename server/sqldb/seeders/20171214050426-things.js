

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('things', [
      {
        id: '5521ea22-de2e-4e1f-abd3-43d67ccf0796',
        name: 'Development Tools',
        info: 'Integration with popular tools such as Grunt, Babel, Karma, ' +
                  'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
                  'Stylus, Sass, and Less.',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 'c83e63b6-c308-4acf-987a-b4002f22c29c',
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: Postgres, Express, ' +
                  'ReactJS, and Node.',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 'c6fad357-d4d1-4ce5-a94a-b6d570676ab8',
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep ' +
                  'tests alongside code. Automatic injection of scripts and ' +
                  'styles into your index.html',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: '56135e90-93a7-41cd-b55a-4263d77e3070',
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more ' +
                  'code reusability and maximum scalability',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 'c84bb4c7-191d-4328-a91a-98d49792c8c4',
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript ' +
                  'payload, minifies your scripts/css/images, and rewrites asset ' +
                  'names for caching.',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: '1da54061-6517-476d-ab44-0e856a7b2f2f',
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
                  'and openshift subgenerators',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {})
    .catch(console.error),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('things', null, {}),
};
