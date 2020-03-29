# More on Logging

Besides using morgan to log requests in general, you can also add your own log messages in your code.

For one, you can of course use the good old `console.log()` command to write logs.

For a more advanced/ detailed approach on logging (with higher control), see this article: https://blog.risingstack.com/node-js-logging-tutorial/

# Storing User-generated Files on Heroku

**Here's one important note about hosting our app on Heroku!**

The user-generated/ uploaded images, are saved and served as intended. But like all hosting providers that offer virtual servers, your file storage is **not persistent**!

Your source code is saved and re-deployed when you shut down the server (or when it goes to sleep, as it does automatically after some time in the Heroku free tier).

But your generated and uploaded files are not stored and re-created. They would be lost after a server restart!

Therefore, it's recommended that you use a **different storage place** when using such a hosting provider.

In cases where you run your own server, which you fully own/ manage, **that does of course not apply**.

**What would be alternatives?**

A popular and very efficient + affordable alternative is **AWS S3** (Simple Storage Service): https://aws.amazon.com/s3/

You can easily configure `multer` to store your files there with the help of another package: https://www.npmjs.com/package/multer-s3

To also serve your files, you can use packages like `s3-proxy`: https://www.npmjs.com/package/s3-proxy

For deleting the files (or interacting with them on your own in general), you'd use the AWS SDK: https://aws.amazon.com/sdk-for-node-js/

# Useful resources:

- Herokus Docs: https://devcenter.heroku.com/categories/reference

- Deploying SPAs (like our React App): https://medium.com/@baphemot/understanding-react-deployment-5a717d4378fd

- Alternative Hosting Providers:

    - Amazon Web Services: https://aws.amazon.com/getting-started/projects/deploy-nodejs-web-app/

    - DigitalOcean: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

    - And of course everything Google yields on "nodejs hosting"
